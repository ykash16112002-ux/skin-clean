import React from 'react';
import { EditableImageSlot } from './EditableImageSlot.tsx';

interface PhilosophySectionProps {
  onLearnMore?: () => void;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = () => {
  const topPoints = [
    {
      num: '/01',
      text: 'Команда профессионалов с многолетним опытом работы и постоянным повышением квалификации',
    },
    {
      num: '/02',
      text: 'Инновационное оборудование последнего поколения',
    },
    {
      num: '/03',
      text: 'Индивидуальный подход к каждому клиенту',
    },
  ];

  const bottomPoints = [
    {
      num: '/04',
      text: 'Безопасность процедур подтверждена сертификатами качества',
    },
    {
      num: '/05',
      text: 'Широкий спектр процедур для решения различных эстетических задач. Комплексное воздействие на различные проблемы кожи',
    },
    {
      num: '/06',
      text: 'Безопасность процедур с минимальным риском побочных эффектов',
    },
  ];

  return (
    <section className="py-20 sm:py-28 md:py-32 bg-[#FBF9F5] border-b border-[#EBE3D7]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Parentheses Headline */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[44px] uppercase tracking-[0.04em] text-[#1C1917] font-medium max-w-5xl mx-auto leading-tight">
            <span className="font-light text-[#9E9284] mr-2 sm:mr-3">(</span>
            МЫ СОЗДАЕМ КРАСОТУ, КОТОРАЯ ПОДЧЕРКИВАЕТ ВАШУ ИНДИВИДУАЛЬНОСТЬ
            <span className="font-light text-[#9E9284] ml-2 sm:mr-3">)</span>
          </h2>
        </div>

        {/* 3-Photo Cards Composition strictly matching reference screenshot:
            Left: Tall prominent portrait card (foam face)
            Middle: Two staggered cards ("в разнобой" - top card and bottom card with editorial space between)
            Right: Numbered list /01-/03 at top, /04-/06 at bottom */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Card 1 (Far Left): Large tall portrait */}
          <div className="md:col-span-5 lg:col-span-4 min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] rounded-[26px] overflow-hidden shadow-xs bg-[#F3EEE6]">
            <EditableImageSlot
              slotKey="philosophy_foam"
              alt="Очищение кожи и детоксикация"
              label="Очищение кожи (пена)"
              className="w-full h-full relative group overflow-hidden bg-[#F3EEE6]"
            />
          </div>

          {/* Cards 2 & 3 (Middle Column): Staggered ("в разнобой") with empty space between */}
          <div className="md:col-span-3 lg:col-span-3 flex flex-col justify-between min-h-[480px] sm:min-h-[560px] lg:min-h-[640px]">
            {/* Top Staggered Card */}
            <div className="h-44 sm:h-52 lg:h-56 rounded-[24px] overflow-hidden shadow-xs bg-[#F3EEE6] shrink-0">
              <EditableImageSlot
                slotKey="philosophy_glow"
                alt="Сияние кожи"
                label="Сияние кожи"
                className="w-full h-full relative group overflow-hidden bg-[#F3EEE6]"
              />
            </div>

            {/* Bottom Staggered Card */}
            <div className="h-44 sm:h-52 lg:h-56 rounded-[24px] overflow-hidden shadow-xs bg-[#F3EEE6] shrink-0">
              <EditableImageSlot
                slotKey="philosophy_texture"
                alt="Текстура сыворотки"
                label="Текстура сыворотки"
                className="w-full h-full relative group overflow-hidden bg-[#F3EEE6]"
              />
            </div>
          </div>

          {/* Right Column: Numbered List /01 - /06 aligned with the staggered photo cards */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col justify-between min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] lg:pl-6">
            {/* Top Block: /01, /02, /03 aligned with top photo */}
            <div className="space-y-4 sm:space-y-5">
              {topPoints.map((point) => (
                <div key={point.num} className="group">
                  <span className="font-mono text-sm sm:text-base text-[#8C7E70] font-semibold block mb-0.5">
                    {point.num}
                  </span>
                  <p className="font-sans text-sm sm:text-[15px] lg:text-base text-[#2E2822] leading-relaxed">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Block: /04, /05, /06 aligned with bottom photo */}
            <div className="space-y-4 sm:space-y-5 pt-8 md:pt-12">
              {bottomPoints.map((point) => (
                <div key={point.num} className="group">
                  <span className="font-mono text-sm sm:text-base text-[#8C7E70] font-semibold block mb-0.5">
                    {point.num}
                  </span>
                  <p className="font-sans text-sm sm:text-[15px] lg:text-base text-[#2E2822] leading-relaxed">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-16 pt-8 border-t border-[#EAE2D5] flex flex-wrap items-center justify-between text-xs sm:text-sm text-[#7A6F64] font-medium gap-4">
          <span>Медицинская лицензия РФ</span>
          <span>·</span>
          <span>100% оригинальные аппараты</span>
          <span>·</span>
          <span>Врачи высшей категории</span>
          <span>·</span>
          <span>Премиальная безопасность</span>
        </div>
      </div>
    </section>
  );
};
