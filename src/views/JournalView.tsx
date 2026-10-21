import React, { useState } from 'react';
import { journalArticles, JournalArticle } from '../data/clinicData.ts';
import { CloseIcon, ArrowRightIcon, CheckIcon } from '../components/Icons.tsx';

interface JournalViewProps {
  onOpenBooking: () => void;
}

export const JournalView: React.FC<JournalViewProps> = ({ onOpenBooking }) => {
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);

  return (
    <div className="py-16 sm:py-20 md:py-24 bg-[#FBF9F5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8C8074] font-medium block mb-2">
            Экспертный журнал Skin Clean
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl text-[#1C1917] tracking-tight mb-4 font-semibold">
            Статьи о доказательной косметологии
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#554C43] leading-relaxed">
            Материалы подготовлены ведущими врачами-дерматологами клиники: разбор аппаратов, мифы об инъекциях, подготовка к сезонам и домашний уход.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {journalArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group bg-white border border-[#EBE3D7] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#D5B48A] hover:shadow-md transition-all cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs sm:text-sm text-[#8C8074] font-medium">
                  <span>{article.category}</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-sans text-xl sm:text-2xl text-[#1C1917] font-semibold group-hover:text-[#A67E48] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-sm sm:text-base text-[#524941] leading-relaxed line-clamp-3">
                  {article.lead}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F0EBE3] flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[#8C8074]">Автор: {article.author}</span>
                <span className="flex items-center gap-1.5 font-medium text-[#1C1917] group-hover:translate-x-1 transition-transform">
                  Читать <ArrowRightIcon size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Article Reader Modal */}
        {activeArticle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative w-full max-w-2xl bg-white border border-[#E8DEC8] rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[88vh] overflow-y-auto space-y-6">
              <div className="flex items-start justify-between border-b border-[#EBE3D7] pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#8C8074] mb-2 font-medium">
                    <span>{activeArticle.category}</span>
                    <span>·</span>
                    <span>{activeArticle.publishDate}</span>
                    <span>·</span>
                    <span>Автор: {activeArticle.author}</span>
                  </div>
                  <h2 className="font-sans text-2xl sm:text-3xl text-[#1C1917] font-semibold">
                    {activeArticle.title}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 rounded-full text-[#7B7268] hover:text-[#1C1917] hover:bg-[#F3EEE6] transition-colors cursor-pointer"
                  aria-label="Закрыть статью"
                >
                  <CloseIcon size={20} />
                </button>
              </div>

              <p className="text-sm sm:text-base text-[#4E463F] font-medium leading-relaxed italic bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFC8]">
                {activeArticle.lead}
              </p>

              <div className="space-y-4 text-sm sm:text-base text-[#3E3731] leading-relaxed">
                {activeArticle.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              <div className="p-5 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] space-y-3">
                <span className="text-xs sm:text-sm uppercase tracking-wider text-[#A67E48] font-bold block">
                  Главные выводы врача:
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-[#524A42]">
                  {activeArticle.takeaways.map((item, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2.5">
                      <CheckIcon size={16} className="text-[#A67E48] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#EAE2D5] flex items-center justify-between gap-4">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="text-xs sm:text-sm text-[#7A6F64] hover:text-[#1C1917] cursor-pointer"
                >
                  Закрыть статью
                </button>
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    onOpenBooking();
                  }}
                  className="px-6 py-3 bg-[#1C1917] text-white text-xs sm:text-sm uppercase tracking-wider rounded-xl hover:bg-[#342D27] cursor-pointer font-medium"
                >
                  Записаться на консультацию
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
