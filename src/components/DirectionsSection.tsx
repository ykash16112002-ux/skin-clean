import React from 'react';
import { EditableImageSlot } from './EditableImageSlot.tsx';
import { PageId } from './Header.tsx';

interface DirectionsSectionProps {
  onSelectCategory: (categoryId: string) => void;
  onNavigate: (page: PageId) => void;
}

export const DirectionsSection: React.FC<DirectionsSectionProps> = ({
  onSelectCategory,
  onNavigate,
}) => {
  const directions = [
    {
      num: '( 01 )',
      title: 'АНТИВОЗРАСТНАЯ МЕДИЦИНА',
      categoryId: 'hardware',
      slotKey: 'direction_antiage' as const,
      description: 'SMAS-лифтинг Ultraformer MPT, фракционный игольчатый RF-лифтинг Morpheus 8, фотоомоложение BBL Hero',
    },
    {
      num: '( 02 )',
      title: 'ЭСТЕТИЧЕСКАЯ КОРРЕКЦИЯ',
      categoryId: 'injection',
      slotKey: 'direction_contour' as const,
      description: 'Гармонизация пропорций Full Face, контурная пластика губ и скул, ботулинотерапия высокой точности',
    },
    {
      num: '( 03 )',
      title: 'КОСМЕТОЛОГИЧЕСКИЕ ПРОГРАММЫ',
      categoryId: 'care',
      slotKey: 'direction_cream' as const,
      description: 'Атравматичные чистки, глубокий гидропилинг HydraFacial MD, энзимная ферментотерапия DMK, биоревитализация',
    },
  ];

  const handleCardClick = (categoryId: string) => {
    onSelectCategory(categoryId);
    onNavigate('services');
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#EBE3D7]/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with enlarged font */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.12em] text-[#1C1917] font-medium mb-4">
            НАШИ НАПРАВЛЕНИЯ
          </h2>
          <p className="font-sans text-sm sm:text-base md:text-lg text-[#524942] leading-relaxed">
            Клиника эстетической косметологии предлагает широкий спектр услуг, направленных на улучшение вашей внешности и качества жизни. Мы используем передовые технологии и методики, чтобы помочь вам достичь желаемого результата.
          </p>
        </div>

        {/* Bento Cards Grid strictly matching the reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card (01) */}
          <div
            onClick={() => handleCardClick(directions[0].categoryId)}
            className="group relative h-80 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden cursor-pointer shadow-xs border border-[#EBE3D7]"
            role="button"
            tabIndex={0}
            aria-label={`${directions[0].num} ${directions[0].title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCardClick(directions[0].categoryId);
              }
            }}
          >
            <EditableImageSlot
              slotKey={directions[0].slotKey}
              alt={directions[0].title}
              label={directions[0].title}
              className="w-full h-full"
              imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none" />

            {/* Typography Overlay with enlarged readability */}
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-white pointer-events-none">
              <span className="font-sans text-base sm:text-lg font-light tracking-widest text-white/95">
                {directions[0].num}
              </span>

              <div>
                <h3 className="font-sans text-xl sm:text-2xl md:text-3xl font-light uppercase tracking-wide text-white leading-tight mb-2.5">
                  {directions[0].title}
                </h3>
                <p className="text-sm sm:text-base text-white/90 line-clamp-2 max-w-md mb-4 leading-relaxed">
                  {directions[0].description}
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider text-[#D8B78A] group-hover:text-white transition-colors font-medium">
                  <span>Смотреть процедуры</span>
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card (02) */}
          <div
            onClick={() => handleCardClick(directions[1].categoryId)}
            className="group relative h-80 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden cursor-pointer shadow-xs border border-[#EBE3D7]"
            role="button"
            tabIndex={0}
            aria-label={`${directions[1].num} ${directions[1].title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCardClick(directions[1].categoryId);
              }
            }}
          >
            <EditableImageSlot
              slotKey={directions[1].slotKey}
              alt={directions[1].title}
              label={directions[1].title}
              className="w-full h-full"
              imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none" />

            {/* Typography Overlay */}
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-white pointer-events-none">
              <span className="font-sans text-base sm:text-lg font-light tracking-widest text-white/95">
                {directions[1].num}
              </span>

              <div>
                <h3 className="font-sans text-xl sm:text-2xl md:text-3xl font-light uppercase tracking-wide text-white leading-tight mb-2.5">
                  {directions[1].title}
                </h3>
                <p className="text-sm sm:text-base text-white/90 line-clamp-2 max-w-md mb-4 leading-relaxed">
                  {directions[1].description}
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider text-[#D8B78A] group-hover:text-white transition-colors font-medium">
                  <span>Смотреть процедуры</span>
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card (03) — Full Width */}
          <div
            onClick={() => handleCardClick(directions[2].categoryId)}
            className="md:col-span-2 group relative h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden cursor-pointer shadow-xs border border-[#EBE3D7]"
            role="button"
            tabIndex={0}
            aria-label={`${directions[2].num} ${directions[2].title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCardClick(directions[2].categoryId);
              }
            }}
          >
            <EditableImageSlot
              slotKey={directions[2].slotKey}
              alt={directions[2].title}
              label={directions[2].title}
              className="w-full h-full"
              imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none" />

            {/* Typography Overlay */}
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-white pointer-events-none">
              <span className="font-sans text-base sm:text-lg font-light tracking-widest text-white/95">
                {directions[2].num}
              </span>

              <div className="max-w-3xl">
                <h3 className="font-sans text-xl sm:text-2xl md:text-3xl font-light uppercase tracking-wide text-white leading-tight mb-2.5">
                  {directions[2].title}
                </h3>
                <p className="text-sm sm:text-base text-white/90 line-clamp-2 mb-4 leading-relaxed">
                  {directions[2].description}
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider text-[#D8B78A] group-hover:text-white transition-colors font-medium">
                  <span>Смотреть процедуры</span>
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
