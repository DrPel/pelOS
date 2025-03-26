import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '个人聊天机器人',
  description: '欢迎与我的聊天机器人交流',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
} 