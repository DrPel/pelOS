import { NextResponse } from 'next/server';
import { SYSTEM_PROMPTS } from '@/config/prompts';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // 获取用户消息
    const userMessage = messages[0].content;
    console.log('用户消息:', userMessage);
    
    // 调用 AiHubMix API
    const response = await fetch('https://aihubmix.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ANTHROPIC_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: 'system', content: SYSTEM_PROMPTS.default },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API错误:', response.status, errorText);
      throw new Error(`API错误: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('API响应摘要:', data.choices?.[0]?.message);
    
    // 获取原始消息内容
    let content = data.choices[0].message.content;
    
    // 移除所有 <think>...</think> 标签内容
    content = content.replace(/<think>[\s\S]*?<\/think>/g, '');
    // 移除可能残留的空行
    content = content.replace(/\n\s*\n/g, '\n').trim();
    
    return NextResponse.json({
      message: content
    });
  } catch (error: any) {
    console.error('错误:', error);
    return NextResponse.json(
      { error: '请求处理失败', details: error.message },
      { status: 500 }
    );
  }
} 