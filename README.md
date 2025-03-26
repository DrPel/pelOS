# 个人网站聊天机器人

基于Next.js和React开发的个人网站聊天机器人界面，让访客可以通过聊天形式了解关于你的信息。

## 功能特点

- 简洁现代的聊天界面
- 访客可通过聊天形式提问
- 支持关键词匹配回答预设问题
- 可配置允许回答和禁止回答的话题
- 响应式设计，支持移动端和桌面端

## 技术栈

- Next.js (React框架)
- TypeScript
- TailwindCSS (样式)
- 本地状态管理

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

### 启动生产服务

```bash
npm run start
```

## 项目结构

```
app/
  ├── components/          # 组件目录
  │   ├── ChatInput.tsx    # 聊天输入组件
  │   ├── ChatWindow.tsx   # 聊天窗口组件
  │   └── Message.tsx      # 消息组件
  ├── utils/
  │   └── botLogic.ts      # 聊天机器人逻辑
  ├── types/
  │   └── index.ts         # 类型定义
  ├── globals.css          # 全局样式
  ├── layout.tsx           # 页面布局
  └── page.tsx             # 主页
```

## 自定义配置

你可以在 `app/utils/botLogic.ts` 文件中修改 `defaultBotConfig` 对象来自定义机器人的回复规则：

- `allowedTopics`: 允许回答的话题及回复
- `forbiddenTopics`: 拒绝回答的话题及回复
- `defaultReply`: 默认回复
- `welcomeMessage`: 欢迎消息

## 许可证

MIT 