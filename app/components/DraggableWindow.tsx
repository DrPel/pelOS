'use client';

import { useState, useRef, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface DraggableWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  defaultPosition?: { x: number; y: number };
  isOpen: boolean;
}

export default function DraggableWindow({ 
  title, 
  children, 
  className = '', 
  onClose,
  defaultPosition = { x: 0, y: 0 },
  isOpen
}: DraggableWindowProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && windowRef.current) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        // 确保窗口不会被拖出屏幕
        const maxX = window.innerWidth - windowRef.current.offsetWidth;
        const maxY = window.innerHeight - windowRef.current.offsetHeight;
        
        setPosition({
          x: Math.min(Math.max(0, newX), maxX),
          y: Math.min(Math.max(0, newY), maxY)
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      className={`fixed bg-[#1a1a1a] border-2 border-[#333] rounded-lg shadow-lg ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDragging ? 'none' : 'transform 0.2s'
      }}
    >
      {/* Title Bar */}
      <div 
        className="bg-[#333] text-white px-4 py-2 flex items-center justify-between border-b-2 border-[#444] cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff4444] transition-colors"
          />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
        </div>
        <div className="text-[#00ff00] font-mono text-sm absolute left-1/2 transform -translate-x-1/2">
          {title}
        </div>
        <div className="w-12"></div>
      </div>
      
      {/* Content */}
      <div className="p-4 font-mono text-[#00ff00]">
        {children}
      </div>
    </div>
  );
} 