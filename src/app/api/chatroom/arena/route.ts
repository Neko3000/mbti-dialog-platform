import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getMBTIPrompt } from '@/lib/mbti-prompts';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface ArenaMessage {
  speaker: string;
  content: string;
  turn: number;
}

export async function POST(req: NextRequest) {
  try {
    const { speaker, listener, conversationHistory, turn, isFirstTurn } = await req.json();

    if (!speaker || !listener) {
      return NextResponse.json(
        { error: '缺少角色参数' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: '请在环境变量中配置GEMINI_API_KEY' },
        { status: 500 }
      );
    }

    const speakerPrompt = getMBTIPrompt(speaker);
    const listenerPrompt = getMBTIPrompt(listener);
    
    if (!speakerPrompt || !listenerPrompt) {
      return NextResponse.json(
        { error: '无效的MBTI类型' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Build conversation history string
    const historyString = conversationHistory
      .map((msg: ArenaMessage) => `${msg.speaker}: ${msg.content}`)
      .join('\n');

    let systemInstruction: string;
    
    if (isFirstTurn) {
      // First turn - speaker initiates conversation
      systemInstruction = `你是一个 MBTI 对话模拟器。现在 ${speaker} 人格和 ${listener} 人格正在进行对话。

你现在扮演 ${speaker} 人格，具有以下特点：
${speakerPrompt.systemPrompt}

你需要作为 ${speaker}，向 ${listener} 提出一个IT公司研发部门相关的问题或话题。

要求：
1. 严格按照 ${speaker} 人格特征来提问
2. 提出的话题应该能引发有趣的对话
3. 只输出对话内容本身，不要添加任何前缀或后缀
4. 控制在1-2句话
5. 话题应该围绕IT公司研发部门的工作场景，例如：
   - "最近我们的需求质量不佳，你觉得有什么好的改进建议吗？"
   - "产品刚提出了一个非常大的需求，你这边有人力支持吗？"
   - "这次的代码评审发现了不少问题，我们是否需要加强开发规范？"
   - "用户反馈系统性能有问题，你觉得我们应该从哪个角度优化？"
   - "团队最近加班比较多，大家的工作效率怎么样？"
   - "新来的实习生适应得怎么样？需要我们提供更多指导吗？"`;
    } else {
      // Continuing conversation
      systemInstruction = `你是一个 MBTI 对话模拟器。现在 ${speaker} 人格和 ${listener} 人格正在进行对话。

你现在扮演 ${speaker} 人格，具有以下特点：
${speakerPrompt.systemPrompt}

对话对象是 ${listener} 人格，特点：
${listenerPrompt.systemPrompt}

以下是 ${speaker} 和 ${listener} 之间的对话历史：
${historyString}

现在轮到 ${speaker} 发言。请根据其人格特点和对话上下文，生成下一句回应。

要求：
1. 严格按照 ${speaker} 人格特征来回应
2. 回应要自然承接之前的对话
3. 只输出对话内容本身，不要添加任何前缀或后缀
4. 控制在1-2句话
5. 体现人格差异和互动特点`;
    }

    const result = await model.generateContent(systemInstruction);

    const response = await result.response;
    const aiResponse = response.text();

    return NextResponse.json({ 
      response: aiResponse.trim(),
      speaker: speaker,
      listener: listener,
      turn: turn
    });

  } catch (error) {
    console.error('Arena API调用错误:', error);
    
    // 如果是API密钥问题，返回友好的错误信息
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'API密钥配置错误，请检查环境变量配置' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: '生成回应失败，请稍后重试' },
      { status: 500 }
    );
  }
}