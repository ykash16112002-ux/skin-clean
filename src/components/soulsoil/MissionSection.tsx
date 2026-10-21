import React from 'react';

interface MissionSectionProps {
  onOpenMeeting: () => void;
}

export const MissionSection: React.FC<MissionSectionProps> = ({ onOpenMeeting }) => {
  return (
    <section id="mission" className="relative w-full bg-[#FFFDF9] text-[#263514] py-14 sm:py-20 px-6 sm:px-10 overflow-hidden border-b border-[#EBE3D7]">
      {/* Playful Orange Worm on Left Border */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-4 w-12 sm:w-16 pointer-events-none opacity-90 select-none">
        <img
          src="assets/soulsoil/worm_left_2x.png"
          alt="Friendly composting earthworm"
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-5 relative z-10">
        {/* Section Heading */}
        <div className="space-y-1.5">
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#506D44] tracking-wide uppercase">
            GROWING WIT' A PURPOSE
          </h2>
          <p className="text-xs sm:text-sm font-mono-custom font-bold tracking-[0.25em] text-[#869F6B] uppercase">
            FOR DA PEOPLE. FOR DA PLANET. FOR DA CULTURE.
          </p>
        </div>

        {/* Narrative Paragraph */}
        <p className="font-mono-custom text-xs sm:text-sm md:text-base text-[#47433E] leading-relaxed max-w-2xl mx-auto pt-2">
          We are an innovative composting company in The Bahamas, transforming organic waste into valuable resources. Serving homes, restaurants, and schools, we provide sustainable waste solutions through our composting subscriptions.
        </p>

        {/* Call to Action Button */}
        <div className="pt-4">
          <button
            type="button"
            onClick={onOpenMeeting}
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#FFA800] hover:bg-[#F09C00] text-white font-mono-custom font-bold text-xs sm:text-sm uppercase tracking-widest rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            SCHEDULE A MEETING
          </button>
        </div>
      </div>
    </section>
  );
};
