import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#506D44] text-[#FAF7F0] pt-6 pb-12 sm:pt-8 sm:pb-16 px-4 sm:px-6 md:px-10 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        
        {/* Left Card: Raw Organic Food Scraps + Sprout */}
        <div className="relative w-full max-w-[240px] sm:max-w-[270px] md:max-w-[290px] aspect-[1/0.92] shrink-0 group">
          <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/20 shadow-xl bg-[#3B5232]">
            <img
              src="assets/soulsoil/hero_compost_2x.png"
              alt="Organic kitchen scraps and food waste for composting"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {/* Sprout Icon Overlapping bottom left corner */}
          <div className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-4 w-12 sm:w-16 pointer-events-none filter drop-shadow-md">
            <img
              src="assets/soulsoil/sprout_graphic_2x.png"
              alt="Seedling sprout illustration"
              className="w-full h-auto object-contain animate-bounce"
              style={{ animationDuration: '3s' }}
            />
          </div>
        </div>

        {/* Center Headline: GROWERS MAKERS DOERS */}
        <div className="flex-1 text-center my-4 md:my-0">
          <h1 className="font-display font-black text-white leading-[0.92] tracking-tight flex flex-col items-center select-none">
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl block transform hover:scale-105 transition-transform">
              G<span className="inline-block transform -rotate-6">R</span>OWERS
            </span>
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl block my-1 transform hover:scale-105 transition-transform">
              MAK<span className="inline-block transform rotate-6">E</span>RS
            </span>
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl block transform hover:scale-105 transition-transform">
              DO<span className="inline-block transform -rotate-3">E</span>RS
            </span>
          </h1>
        </div>

        {/* Right Card: Dark Fertile Soil + Yellow Compost Bucket */}
        <div className="relative w-full max-w-[240px] sm:max-w-[270px] md:max-w-[290px] aspect-[1/0.92] shrink-0 group">
          <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/20 shadow-xl bg-[#3B5232]">
            <img
              src="assets/soulsoil/hero_soil_2x.png"
              alt="Rich dark cured compost soil ready for gardens"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {/* Yellow Bucket Overlapping top-right corner */}
          <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-3 w-14 sm:w-18 pointer-events-none filter drop-shadow-md">
            <img
              src="assets/soulsoil/yellow_bucket_2x.png"
              alt="Yellow Soul & Soil compost bucket"
              className="w-full h-auto object-contain transform hover:rotate-6 transition-transform"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
