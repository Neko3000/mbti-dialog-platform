import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getMBTIPrompt } from '@/lib/mbti-prompts';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { inputText, targetType } = await req.json();

    if (!inputText || !targetType) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: '请在环境变量中配置GEMINI_API_KEY' },
        { status: 500 }
      );
    }

    const mbtiPrompt = getMBTIPrompt(targetType);
    if (!mbtiPrompt) {
      return NextResponse.json(
        { error: '无效的MBTI类型' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemInstruction = `你是一位精通MBTI人格框架的沟通专家。你的任务是根据特定的性格类型偏好，重写用户提供的信息，使其更易于被目标对象所接受。

目标人格类型：${mbtiPrompt.code} (${mbtiPrompt.name})
沟通风格指导：${mbtiPrompt.systemPrompt}

核心要求：
1. 保留原始信息的核心意义和意图
2. 调整语气、结构和措辞以符合目标人格类型的偏好
3. 不要添加原文中未包含的新信息，仅做转述和优化
4. 你的回答必须且仅包含重写后的文本，不要附加任何额外的评论、解释或前缀

请重写以下用户输入：`;

    const result = await model.generateContent([
      { text: systemInstruction },
      { text: `用户原文：${inputText}` }
    ]);

    const response = await result.response;
    const transformedText = response.text();

    return NextResponse.json({ 
      transformedText: transformedText.trim()
    });

  } catch (error) {
    console.error('API调用错误:', error);
    
    // 如果是API密钥问题，返回友好的错误信息
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'API密钥配置错误，请检查环境变量配置' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: '转换失败，请稍后重试' },
      { status: 500 }
    );
  }
}