import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getMBTIPrompt } from '@/lib/mbti-prompts';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface ConversationMessage {
  text: string;
  sender: 'user' | 'ai';
  mbtiType?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { conversationHistory, currentPersonality, triggerType } = await req.json();

    if (!currentPersonality) {
      return NextResponse.json(
        { error: '缺少人格类型参数' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: '请在环境变量中配置GEMINI_API_KEY' },
        { status: 500 }
      );
    }

    const mbtiPrompt = getMBTIPrompt(currentPersonality);
    if (!mbtiPrompt) {
      return NextResponse.json(
        { error: '无效的MBTI类型' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Build conversation history string
    const historyString = conversationHistory
      .map((msg: ConversationMessage) => {
        if (msg.sender === 'user') {
          return `用户: ${msg.text}`;
        } else {
          return `${msg.mbtiType}: ${msg.text}`;
        }
      })
      .join('\n');

    const systemInstruction = `你正在一个多人聊天室中进行角色扮演。你的任务是完全沉浸并以特定的人格身份进行回应。

在这一轮发言中，你的人格是：${mbtiPrompt.code} (${mbtiPrompt.name})
以下是你在此次对话中必须严格遵守的核心沟通风格与行为模式：
${mbtiPrompt.systemPrompt}

重要指示：
1. 你必须严格按照 ${mbtiPrompt.code} 的人格特征来回应
2. 你的回应应该自然地接续上一条消息，并体现出你被分配到的人格特征
3. 保持对话的连贯性和真实感
4. 你的回答必须且仅包含你作为 ${mbtiPrompt.code} 所说的对话内容本身
5. 不要添加任何角色名称前缀、解释或元评论
6. 回应长度控制在1-3句话，保持自然对话的节奏

下方是到目前为止的完整对话历史：`;

    const result = await model.generateContent([
      { text: systemInstruction },
      { text: historyString || '对话开始' }
    ]);

    const response = await result.response;
    const aiResponse = response.text();

    return NextResponse.json({ 
      response: aiResponse.trim(),
      personality: currentPersonality
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