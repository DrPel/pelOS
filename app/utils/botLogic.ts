import { BotConfig } from '../types';

// 默认配置
export const defaultBotConfig: BotConfig = {
  allowedTopics: [
    {
      keywords: ['项目', '经验', '工作'],
      response: '我曾参与多个Web和移动应用开发项目，擅长使用React、Next.js和Node.js技术栈。'
    },
    {
      keywords: ['技能', '专长', '会什么'],
      response: '我擅长前端开发(React, Vue)，后端开发(Node.js, Express)，以及数据库设计。'
    },
    {
      keywords: ['联系', '联络', '邮箱', '电话'],
      response: '你可以通过example@email.com与我联系。'
    },
    {
      keywords: ['爱好', '兴趣'],
      response: '我喜欢编程、阅读和户外运动。'
    }
  ],
  forbiddenTopics: [
    {
      keywords: ['薪资', '收入', '工资'],
      response: '抱歉，我无法讨论薪资相关话题。'
    },
    {
      keywords: ['地址', '住址', '位置'],
      response: '出于隐私考虑，我不能分享具体地址信息。'
    },
    {
      keywords: ['政治', '宗教'],
      response: '我不讨论政治和宗教相关话题。'
    }
  ],
  defaultReply: '我不太理解你的问题，能否换个方式提问？',
  welcomeMessage: "yo what's up"
};

// 检查消息是否匹配某个话题
const matchesTopic = (message: string, keywords: string[]): boolean => {
  return keywords.some(keyword => message.toLowerCase().includes(keyword.toLowerCase()));
};

// 处理用户消息，返回机器人回复
export const processMessage = (message: string, config: BotConfig = defaultBotConfig): string => {
  // 检查是否为禁止话题
  for (const topic of config.forbiddenTopics) {
    if (matchesTopic(message, topic.keywords)) {
      return topic.response;
    }
  }

  // 检查是否为允许话题
  for (const topic of config.allowedTopics) {
    if (matchesTopic(message, topic.keywords)) {
      return topic.response;
    }
  }

  // 默认回复
  return config.defaultReply;
}; 