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

你需要作为 ${speaker}，向 ${listener} 提出一个随机的、开启对话的问题或话题。

要求：
1. 严格按照 ${speaker} 人格特征来提问
2. 提出的话题应该能引发有趣的对话
3. 只输出对话内容本身，不要添加任何前缀或后缀
4. 控制在1-2句话
5. 话题可以是工作、生活、兴趣爱好、价值观等任意方面`;
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