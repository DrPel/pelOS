'use client';

interface DockItemProps {
  icon: string;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

function DockItem({ icon, label, onClick, isActive }: DockItemProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center"
    >
      <div className={`
        w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
        bg-[#1a1a1a] rounded-lg border-2 border-[#333]
        transition-all duration-200 group-hover:scale-110
        ${isActive ? 'border-[#00ff00]' : ''}
      `}>
        <span className="text-xl md:text-2xl">{icon}</span>
      </div>
      <div className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        <div className="px-2 py-1 bg-[#1a1a1a] rounded text-[#00ff00] text-xs font-mono border border-[#333]">
          {label}
        </div>
      </div>
    </button>
  );
}

interface DockProps {
  items: Array<{
    icon: string;
    label: string;
    onClick: () => void;
    isActive?: boolean;
  }>;
}

export default function Dock({ items }: DockProps) {
  return (
    <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center space-x-1 md:space-x-2 bg-[#1a1a1a]/50 backdrop-blur-md px-2 md:px-4 py-2 rounded-2xl border-2 border-[#333] overflow-x-auto max-w-[95vw] md:max-w-none">
        {items.map((item, index) => (
          <DockItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
} 