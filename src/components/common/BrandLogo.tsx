import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  showScriptPriceList?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  showScriptPriceList = false,
  className = '',
  onClick,
}) => {
  const sizeMap = {
    sm: {
      text: 'text-lg',
      sub: 'text-[9px] tracking-[0.25em]',
      svgW: 24,
      svgH: 24,
      script: 'text-2xl',
      gap: 'gap-1',
    },
    md: {
      text: 'text-2xl md:text-3xl',
      sub: 'text-[11px] md:text-[12px] tracking-[0.3em]',
      svgW: 32,
      svgH: 32,
      script: 'text-3xl md:text-4xl',
      gap: 'gap-1.5',
    },
    lg: {
      text: 'text-4xl md:text-5xl',
      sub: 'text-[13px] md:text-[15px] tracking-[0.35em]',
      svgW: 46,
      svgH: 46,
      script: 'text-5xl md:text-6xl',
      gap: 'gap-2',
    },
    xl: {
      text: 'text-5xl md:text-6xl',
      sub: 'text-[16px] md:text-[18px] tracking-[0.4em]',
      svgW: 58,
      svgH: 58,
      script: 'text-6xl md:text-7xl',
      gap: 'gap-3',
    },
  };

  const current = sizeMap[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col items-center select-none ${onClick ? 'cursor-pointer transition-transform hover:scale-[1.02]' : ''} ${className}`}
    >
      {/* Upper Logo Area with Cocktail Icon */}
      <div className="relative flex items-center justify-center">
        {/* Cocktail glass with bubbling dots over Cocktales */}
        <div className="flex items-baseline font-bold tracking-tight">
          <span className={`${current.text} text-[#00A896] font-extrabold tracking-normal`}>
            Nail
          </span>

          <div className="relative inline-block ml-1">
            {/* Cocktail glass and olive SVG emblem */}
            <div className="absolute -top-6 left-1 flex items-end pointer-events-none">
              <svg
                width={current.svgW}
                height={current.svgH}
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
              >
                {/* 3 bubbles arching to the left */}
                <circle cx="12" cy="18" r="3.2" fill="#00A896" className="animate-pulse" />
                <circle cx="21" cy="11" r="2.6" fill="#00A896" />
                <circle cx="31" cy="11" r="2.2" fill="#00A896" />
                
                {/* Cocktail Glass Body & Stem */}
                <path
                  d="M14 22 C 14 34, 34 34, 34 22 Z"
                  fill="none"
                  stroke="#00A896"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
                <line x1="24" y1="32" x2="24" y2="44" stroke="#00A896" strokeWidth="2.8" strokeLinecap="round" />
                <line x1="16" y1="44" x2="32" y2="44" stroke="#00A896" strokeWidth="2.8" strokeLinecap="round" />

                {/* Cocktail Olive & Coral Dot */}
                <circle cx="24" cy="24" r="4.2" fill="#6C7A38" />
                <circle cx="24.5" cy="24" r="1.6" fill="#FF4D6D" />
                
                {/* Cocktail stirrer / straw toothpick */}
                <line x1="15" y1="16" x2="31" y2="30" stroke="#00A896" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>

            <span className={`${current.text} text-[#5C3D2E] font-bold`}>
              Cocktales
            </span>
          </div>
        </div>
      </div>

      {/* Hand and Foot Spa Subtitle */}
      {showSubtitle && (
        <span className={`text-[#00A896] font-semibold uppercase mt-0.5 ${current.sub}`}>
          Hand and Foot Spa
        </span>
      )}

      {/* Script "Price List" Calligraphy (Matching Image) */}
      {showScriptPriceList && (
        <div className="mt-2 text-center">
          <span className={`font-script-lux text-[#5C3D2E] ${current.script} drop-shadow-sm font-normal block leading-tight`}>
            Price List
          </span>
        </div>
      )}
    </div>
  );
};
