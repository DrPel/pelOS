import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'pelOS',
  description: 'I am pel, making tools',
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