'use client';

interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function RetroWindow({ title, children, className = '' }: RetroWindowProps) {
  return (
    <div className={`bg-[#1a1a1a] border-2 border-[#333] rounded-lg shadow-lg ${className}`}>
      {/* Title Bar */}
      <div className="bg-[#333] text-white px-4 py-2 flex items-center justify-between border-b-2 border-[#444]">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
        </div>
        <div className="text-[#00ff00] font-mono text-sm">{title}</div>
        <div className="w-12"></div>
      </div>
      
      {/* Content */}
      <div className="p-4 font-mono text-[#00ff00]">
        {children}
      </div>
    </div>
  );
} 