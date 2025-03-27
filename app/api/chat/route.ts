import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();
    
    // 获取用户消息
    const userMessage = messages[0].content;
    console.log('用户消息:', userMessage);
    
    // 准备API请求消息数组
    const apiMessages = [
      // 系统消息 - 控制回答风格和行为
      {
        role: "system",
        content: "你的名字叫 pel, 是一个专业、简洁的助手。回答要点明确，使用友好的语气。基于提供的上下文资料回答问题，如果资料中没有相关信息，请诚实说明。"
      }
    ];
    
    // 如果提供了上下文，添加上下文消息
    if (context) {
      apiMessages.push({
        role: "user", 
        content: "以下是相关资料，请基于这些资料回答我接下来的问题：\n\n" + context
      });
    }
    
    // 添加用户问题
    apiMessages.push(...messages);
    
    // 调用 AiHubMix API
    const response = await fetch('https://aihubmix.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ANTHROPIC_API_KEY}`
      },
      body: JSON.stringify({
        model: "DeepSeek-R1",
        messages: [
          // 系统消息 - 控制回答风格和行为
          {
            role: "system",
            content: "你的名字叫 pel, 是一个专业、简洁的助手。回答要点明确，使用友好的语气。基于提供的上下文资料回答问题，如果资料中没有相关信息，请诚实说明。"
          },
          // 上下文资料消息
          {
            role: "user", 
            content: "以下是相关资料，请基于这些资料回答我接下来的问题：\n\n" 
          },
          // 用户的实际问题
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