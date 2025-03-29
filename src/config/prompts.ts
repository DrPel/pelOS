import { defaultPrompt } from './prompts/default';

export const SYSTEM_PROMPTS = {
  default: defaultPrompt,
  // 可以添加更多预设的提示词
  // friendly: "你是一个友好的AI助手...",
  // technical: "你是一个技术专家...",
} as const;

export type SystemPromptKey = keyof typeof SYSTEM_PROMPTS; 