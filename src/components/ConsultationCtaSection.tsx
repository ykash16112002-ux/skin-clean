import React from 'react';

interface ConsultationCtaSectionProps {
  onOpenBooking: () => void;
}

export const ConsultationCtaSection: React.FC<ConsultationCtaSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#EBE3D7]/70 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-[0.06em] text-[#1C1917] font-medium leading-tight mb-5">
          БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ — ПЕРВЫЙ ШАГ К ПРЕОБРАЖЕНИЮ.
        </h2>
        <p className="font-sans text-sm sm:text-base md:text-lg text-[#5A5046] leading-relaxed max-w-2xl mx-auto mb-10">
          Наши специалисты проведут диагностику кожи и разработают персональную программу ухода, учитывая все особенности и пожелания.
        </p>
        <div>
          <button
            onClick={onOpenBooking}
            className="px-10 sm:px-14 py-4 sm:py-5 bg-[#2A2522] hover:bg-[#1C1917] text-[#FAF8F5] text-sm sm:text-base uppercase tracking-[0.16em] font-medium rounded-full shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            Записаться на консультацию
          </button>
        </div>
      </div>
    </section>
  );
};
