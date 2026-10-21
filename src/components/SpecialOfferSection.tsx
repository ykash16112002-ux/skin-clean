import React from 'react';
import { EditableImageSlot } from './EditableImageSlot.tsx';

interface SpecialOfferSectionProps {
  onOpenBooking: () => void;
}

export const SpecialOfferSection: React.FC<SpecialOfferSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#EBE3D7]/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Header: stretched headline matching reference */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[42px] uppercase tracking-[0.05em] sm:tracking-[0.07em] text-[#1B1917] font-semibold leading-[1.22] mb-4 sm:mb-5">
            <span className="block">БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ - ПЕРВЫЙ ШАГ</span>
            <span className="block">К ПРЕОБРАЖЕНИЮ.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-[15px] text-[#63594F] leading-relaxed max-w-lg mx-auto">
            <span className="block sm:inline">Наши специалисты проведут диагностику кожи и разработают</span>{' '}
            <span className="block sm:inline">персональную программу ухода, учитывая все особенности и пожелания.</span>
          </p>
        </div>

        {/* 2. Full-width stretched button matching reference */}
        <div className="mb-12 sm:mb-16">
          <button
            onClick={onOpenBooking}
            className="w-full py-3.5 sm:py-4.5 bg-[#252220] hover:bg-[#151311] active:bg-[#000000] text-[#FFFFFF] text-xs sm:text-sm font-medium tracking-[0.18em] sm:tracking-[0.22em] uppercase rounded-full shadow-xs transition-all duration-200 cursor-pointer flex items-center justify-center text-center"
          >
            ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ
          </button>
        </div>

        {/* 3. 3 Preview Visuals Strip with EditableImageSlot */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5 md:gap-6 mb-12 sm:mb-16">
          <div className="h-36 sm:h-52 md:h-64 lg:h-72 rounded-[18px] sm:rounded-[24px] overflow-hidden shadow-xs border border-[#EBE3D7]/70 bg-[#F2EDE5]">
            <EditableImageSlot
              slotKey="offer_lip"
              alt="Деликатная коррекция губ и овала лица"
              label="Профиль губ"
              className="w-full h-full"
            />
          </div>
          <div className="h-36 sm:h-52 md:h-64 lg:h-72 rounded-[18px] sm:rounded-[24px] overflow-hidden shadow-xs border border-[#EBE3D7]/70 bg-[#F2EDE5]">
            <EditableImageSlot
              slotKey="offer_wave"
              alt="Премиальная космецевтика и чистые формулы"
              label="Волна крема"
              className="w-full h-full"
            />
          </div>
          <div className="h-36 sm:h-52 md:h-64 lg:h-72 rounded-[18px] sm:rounded-[24px] overflow-hidden shadow-xs border border-[#EBE3D7]/70 bg-[#F2EDE5]">
            <EditableImageSlot
              slotKey="offer_tone"
              alt="Естественная фактура кожи"
              label="Тон кожи"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* 4. Text & Action Grid strictly aligned with the 3 photos above */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6 items-baseline">
          {/* Label under Photo 1 */}
          <div className="md:col-span-1">
            <span className="text-xs sm:text-sm text-[#4E473F] font-normal block">
              Специальное предложение
            </span>
          </div>

          {/* Headline & Link under Photo 2 & Photo 3, strictly matching reference line breaks and extending to Photo 3 right edge */}
          <div className="md:col-span-2 space-y-6 sm:space-y-8">
            <h3 className="font-sans text-lg sm:text-2xl md:text-[28px] lg:text-[33px] xl:text-[35px] text-[#1A1816] font-normal leading-[1.26] tracking-[-0.01em]">
              <span className="block whitespace-nowrap">Скидка 20% при первом посещении</span>
              <span className="block whitespace-nowrap">на любую процедуру и бесплатная</span>
              <span className="block whitespace-nowrap">консультация ведущего специалиста.</span>
            </h3>

            <div>
              <button
                onClick={onOpenBooking}
                className="inline-block text-lg sm:text-xl md:text-[22px] font-semibold tracking-[0.14em] uppercase text-[#1A1816] hover:text-[#7A6B5D] transition-colors underline underline-offset-8 decoration-[1.5px] cursor-pointer"
              >
                ЗАПИСАТЬСЯ НА ПРИЕМ
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
