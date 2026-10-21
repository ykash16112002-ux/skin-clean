import React from 'react';

export const TickerRibbon: React.FC = () => {
  const phrase = 'for da people. For da planet. For da culture. · ';
  const repeated = phrase.repeat(10);

  return (
    <div className="w-full bg-[#8EA654] text-[#1C2814] py-2.5 overflow-hidden border-y border-[#768C43] select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="font-mono-custom text-xs sm:text-sm font-bold tracking-widest uppercase">
          {repeated}
        </span>
        <span className="font-mono-custom text-xs sm:text-sm font-bold tracking-widest uppercase" aria-hidden="true">
          {repeated}
        </span>
      </div>
    </div>
  );
};
