import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
  tip: string;
  className?: string; // Allow custom class for wrapper
}

const Tooltip: React.FC<TooltipProps> = ({ children, tip, className = "inline-block" }) => {
  return (
    <div className={`group relative ${className}`}>
      {children}
      <div 
        role="tooltip"
        className="absolute bottom-full left-1/2 z-20 mb-3 w-max max-w-xs -translate-x-1/2 transform rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 border border-purple-500"
      >
        {tip}
        <div 
          className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-gray-900 transform rotate-45 border-r border-b border-purple-500"
          style={{ content: "''" }}
        ></div>
      </div>
    </div>
  );
};

export default Tooltip;
