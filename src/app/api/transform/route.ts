import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { inputText, targetType } = await req.json();

    if (!inputText || !targetType) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // TODO: 在后续步骤中实现Gemini API调用
    // 目前返回模拟数据用于测试
    const mockResponse = `[转换为${targetType}风格] ${inputText}`;
    
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({ 
      transformedText: mockResponse 
    });

  } catch (error) {
    console.error('API调用错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}