import React, { useState } from 'react';

export interface RRGBSLogoProps {
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  portalSubtitle?: string;
  textClassName?: string;
  theme?: 'light' | 'dark';
  onClick?: () => void;
}

const SIZE_MAP: Record<string, number> = {
  xs: 28,
  sm: 36,
  md: 44,
  lg: 52,
  xl: 68,
};

export const RRGBSLogo: React.FC<RRGBSLogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
  portalSubtitle = 'RR Group of Business Solutions',
  textClassName = '',
  theme = 'light',
  onClick,
}) => {
  const [isSwinging, setIsSwinging] = useState(false);

  const handleLogoClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsSwinging(false);
    requestAnimationFrame(() => setIsSwinging(true));
    window.setTimeout(() => setIsSwinging(false), 2400);
    onClick?.();
  };
  const pixelSize = typeof size === 'number' ? size : SIZE_MAP[size] || 44;

  const emblem = (
    <div
      style={{ width: `${pixelSize}px`, height: `${pixelSize}px` }}
      className={`relative shrink-0 rounded-xl overflow-hidden shadow-sm transition-transform duration-200 group-hover:scale-105 ${isSwinging ? 'rrgbs-logo-swing' : ''} rrgbs-logo-hover-swing ${className}`}
      onClick={handleLogoClick}
    >
      <img
        src="/rrgbs-logo.svg"
        alt="RR Group of Business Solutions Official Logo"
        width={pixelSize}
        height={pixelSize}
        className="w-full h-full object-contain block"
        referrerPolicy="no-referrer"
      />
    </div>
  );

  if (!showText) {
    return emblem;
  }

  const isDark = theme === 'dark';

  return (
    <div className="flex items-center gap-3 group">
      {emblem}
      <div className={`flex flex-col text-left ${textClassName}`}>
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-black text-xl tracking-tight ${
              isDark ? 'text-white' : 'text-[#111111]'
            }`}
          >
            RR<span className="text-[#d71920]">GBS</span>
          </span>
        </div>
        {portalSubtitle && (
          <span
            className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 line-clamp-1 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {portalSubtitle}
          </span>
        )}
      </div>
    </div>
  );
};
