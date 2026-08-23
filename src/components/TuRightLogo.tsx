import React from 'react';

interface TuRightLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  subtitleText?: string;
  badgeStyle?: boolean;
  onClick?: () => void;
}

export const TuRightLogo: React.FC<TuRightLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = false,
  subtitleText = 'National Education Awards',
  badgeStyle = false,
  onClick,
}) => {
  // Height configurations
  const heightClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
  };

  const textSizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-6xl',
  };

  const regSizes = {
    sm: 'text-[9px] top-0 -right-3.5',
    md: 'text-[11px] top-0.5 -right-4',
    lg: 'text-[13px] top-1 -right-5',
    xl: 'text-[16px] top-1.5 -right-6',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Official TuRight Logo Container */}
      <div
        className={`relative flex items-center justify-center font-bold tracking-tight transition-transform duration-200 ${
          badgeStyle
            ? 'bg-black px-4 py-2 rounded-xl border border-white/10 shadow-lg shadow-black/50'
            : 'bg-black px-3.5 py-1.5 rounded-lg border border-white/15'
        } ${heightClasses[size]}`}
        style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
      >
        <div className="relative flex items-baseline tracking-normal font-black">
          {/* T in Orange */}
          <span className={`${textSizes[size]} text-[#F37021] font-black leading-none drop-shadow-[0_2px_8px_rgba(243,112,33,0.3)]`}>
            T
          </span>
          {/* u in White */}
          <span className={`${textSizes[size]} text-white font-extrabold leading-none`}>
            u
          </span>
          {/* R in Orange */}
          <span className={`${textSizes[size]} text-[#F37021] font-black leading-none drop-shadow-[0_2px_8px_rgba(243,112,33,0.3)] ml-[0.5px]`}>
            R
          </span>
          {/* ight in White */}
          <span className={`${textSizes[size]} text-white font-extrabold leading-none`}>
            ight
          </span>
          {/* Registered Symbol ® */}
          <span className={`absolute ${regSizes[size]} text-white/90 font-semibold border border-white/80 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] leading-none`}>
            ®
          </span>
        </div>
      </div>

      {/* Optional Awards Subtitle for full banner branding */}
      {showSubtitle && (
        <div className="flex flex-col justify-center text-left leading-tight border-l border-white/15 pl-3">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#F37021] font-bold">
            National
          </span>
          <span className="text-xs md:text-sm font-bold text-white font-display tracking-tight">
            {subtitleText}
          </span>
        </div>
      )}
    </div>
  );
};
