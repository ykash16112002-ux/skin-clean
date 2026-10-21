import React from 'react';

interface HowItWorksProps {
  onOpenSubscriptions: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({ onOpenSubscriptions }) => {
  const steps = [
    {
      title: 'CHOOSE A PLAN',
      icon: 'assets/soulsoil/icon_trowel_2x.png',
      alt: 'Trowel in garden soil',
      description: 'Odio aenean sed adipiscing diam donec adipiscing tristique risus nec.',
      details: 'Select weekly or bi-weekly bucket service for your household or commercial volume.',
    },
    {
      title: 'GET YOUR COMPOST BIN',
      icon: 'assets/soulsoil/icon_bin_2x.png',
      alt: 'Airtight compost bucket',
      description: 'Odio aenean sed adipiscing diam donec adipiscing tristique risus nec.',
      details: 'We deliver an airtight, odor-sealed bucket with plant-based liners directly to your door.',
    },
    {
      title: 'SCHEDULE A PICKUP',
      icon: 'assets/soulsoil/icon_truck_2x.png',
      alt: 'Compost collection pickup truck',
      description: 'Odio aenean sed adipiscing diam donec adipiscing tristique risus nec.',
      details: 'Leave your bucket out on your designated day. We swap it with a fresh bin and cure your scraps into soil.',
    },
  ];

  return (
    <section id="how-it-works" className="w-full bg-[#FFFDF9] text-[#263514] border-b border-[#EBE3D7]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#EBE3D7]">
          {steps.map((step, idx) => (
            <div
              key={idx}
              onClick={onOpenSubscriptions}
              className="p-8 sm:p-10 flex flex-col items-center text-center group cursor-pointer hover:bg-[#FAF7F0] transition-colors"
            >
              {/* Step Header */}
              <h3 className="font-mono-custom font-bold text-xs sm:text-sm tracking-wider text-[#263514] uppercase border-b border-[#263514]/30 pb-2.5 w-full">
                {step.title}
              </h3>

              {/* Step Icon */}
              <div className="my-8 sm:my-10 h-20 sm:h-24 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <img
                  src={step.icon}
                  alt={step.alt}
                  className="max-h-full max-w-full object-contain filter drop-shadow-xs"
                />
              </div>

              {/* Step Description */}
              <p className="font-mono-custom text-xs text-[#706B63] leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
