import React, { useState } from 'react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      highlight: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMODA.',
      body: 'Donec neque viverra justo nec ultrices dui sapien eget mi. Velit sed ullamcorper morbi tincidunt ornare. Pellentesque sit amet porttitor eget dolor morbi.',
      author: '— JOHN D.',
      location: 'Nassau, Bahamas',
    },
    {
      highlight: 'OUR KITCHEN WASTE HAS DROPPED BY 70%, AND OUR RESORT SOIL IS THRIVING!',
      body: 'Soul & Soil made composting an effortless daily habit for our restaurant crew. The collection buckets are completely airtight with zero odor, and the returned cured compost has revived our herb garden.',
      author: '— CHEF ALICIA M.',
      location: 'Paradise Island Bistro',
    },
    {
      highlight: 'BEST COMMUNITY SUSTAINABILITY INITIATIVE IN THE ENTIRE BAHAMAS.',
      body: 'Teaching our students the cycle of food scraps turning into black gold soil has been the highlight of our science curriculum. Reliable, friendly, and truly for da culture.',
      author: '— PRINCIPAL R. SANDS',
      location: 'Community Eco-Academy',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? testimonials.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === testimonials.length - 1 ? 0 : prevIdx + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 overflow-hidden bg-[#FFFDF9]">
      {/* Playful Colorful Background Pattern */}
      <div className="absolute inset-0 opacity-40 select-none pointer-events-none">
        <img
          src="assets/soulsoil/pattern_testimonials_2x.png"
          alt="Organic playful squiggles and worms pattern"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Testimonial Rounded Card */}
        <div className="bg-[#FFFDF9]/95 backdrop-blur-xs border-2 border-[#506D44]/40 rounded-3xl p-8 sm:p-12 shadow-xl text-center relative">
          
          {/* Card Title */}
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#263514] uppercase tracking-wide mb-8">
            WHAT DA' PEOPLE SAYIN'?
          </h2>

          <div className="flex items-center justify-between gap-4">
            {/* Prev Arrow */}
            <button
              type="button"
              onClick={prev}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#506D44] text-[#506D44] hover:bg-[#506D44] hover:text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Testimonial Content */}
            <div className="flex-1 px-2 sm:px-6 space-y-4">
              <p className="font-mono-custom font-bold text-xs sm:text-sm text-[#E7502B] uppercase tracking-wide leading-snug">
                "{current.highlight}"
              </p>
              <p className="font-mono-custom text-[11px] sm:text-xs text-[#6B6358] leading-relaxed max-w-lg mx-auto">
                {current.body}
              </p>
              <p className="font-mono-custom font-bold text-xs text-[#263514] pt-2">
                {current.author}
              </p>
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={next}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#506D44] text-[#506D44] hover:bg-[#506D44] hover:text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === i ? 'w-5 bg-[#506D44]' : 'bg-[#DCD4C6]'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
