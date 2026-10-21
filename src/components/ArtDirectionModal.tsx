import React, { useEffect } from 'react';
import { artDirectionStandards } from '../data/clinicData.ts';
import { CloseIcon, CheckIcon } from './Icons.tsx';

interface ArtDirectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArtDirectionModal: React.FC<ArtDirectionModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="art-direction-title"
    >
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E8DEC8] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBE3D7] bg-white">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#9A8D7E] font-medium block">
              Арт-дирекция & Editorial Guidelines
            </span>
            <h2 id="art-direction-title" className="text-xl font-sans text-[#1C1917]">
              {artDirectionStandards.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#7B7268] hover:text-[#1C1917] hover:bg-[#F3EEE6] transition-colors"
            aria-label="Закрыть модальное окно"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#3E3731] leading-relaxed">
          {/* Philosophy */}
          <div className="p-4 bg-white rounded-xl border border-[#E6DCC9]">
            <h3 className="font-sans text-sm font-semibold text-[#1C1917] mb-1">
              Философия Quiet Luxury & Медицинская Достоверность
            </h3>
            <p className="text-[#6D635B]">
              {artDirectionStandards.philosophy} Визуальный язык бренда исключает любой навязчивый AI-слоп,
              синтетические градиенты, пластиковую ретушь и пересвеченные кадры. Все материалы транслируют
              спокойную уверенность, высокую квалификацию врачей и премиальный уют.
            </p>
          </div>

          {/* Section by section specs */}
          <div className="space-y-4">
            <h3 className="font-sans text-base text-[#1C1917] border-b border-[#E8DFC8] pb-1">
              1. Спецификации по блокам интерфейса
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 bg-white rounded-lg border border-[#EBE3D7]">
                <div className="font-semibold text-[#1C1917] mb-1">Hero-экран (Первый экран)</div>
                <p className="text-[#685D53]">
                  <strong>Кадр:</strong> Крупный план лица (editorial beauty portrait) в профиль или 3/4. 
                  Фокус на чистой, сияющей, натуральной коже без плотного тонального слоя. 
                  Естественные губы, спокойный расслабленный взгляд, минималистичная серьга.
                  <strong> Свет:</strong> Большой мягкий софтбокс 45° с легким отражением от белой панели снизу.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-[#EBE3D7]">
                <div className="font-semibold text-[#1C1917] mb-1">Карточки направлений и процедур</div>
                <p className="text-[#685D53]">
                  <strong>Кадры:</strong> Макросъемка текстур косметических сывороток, легкой очищающей пены с микропузырьками, 
                  рельефа кожи в зоне скулы и шеи, шелковых фактур. Никаких шаблонных стоковых улыбок.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-[#EBE3D7]">
                <div className="font-semibold text-[#1C1917] mb-1">Портреты врачей-экспертов</div>
                <p className="text-[#685D53]">
                  <strong>Стиль:</strong> Индивидуальный студийный портрет в дизайнерской медицинской форме (молочный, 
                  глубокий мокко, графит). Интеллигентный, открытый взгляд, естественная укладка. 
                  Теплый нейтральный фон без клинического холодного кафеля.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-[#EBE3D7]">
                <div className="font-semibold text-[#1C1917] mb-1">Интерьеры и процедурные кабинеты</div>
                <p className="text-[#685D53]">
                  <strong>Архитектура:</strong> Теплый травертин, матовая латунь, тактильный лен, 
                  высокотехнологичное оригинальное оборудование (Ultraformer, Morpheus8, BBL) в идеальной чистоте.
                </p>
              </div>
            </div>
          </div>

          {/* Lighting & Retouching Rules */}
          <div className="space-y-3">
            <h3 className="font-sans text-base text-[#1C1917] border-b border-[#E8DFC8] pb-1">
              2. Правила освещения и ретуши кожи
            </h3>
            <ul className="space-y-2">
              {artDirectionStandards.lightingRequirements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckIcon size={14} className="text-[#BF9B6B] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
              {artDirectionStandards.skinAndRetouchGuidelines.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckIcon size={14} className="text-[#BF9B6B] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Color Tokens */}
          <div className="space-y-3">
            <h3 className="font-sans text-base text-[#1C1917] border-b border-[#E8DFC8] pb-1">
              3. Палитра бренда (60-30-10)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {artDirectionStandards.colorPaletteTokens.map((token, idx) => (
                <div key={idx} className="p-3 bg-white rounded-lg border border-[#EBE3D7] text-center">
                  <div
                    className="w-full h-8 rounded mb-2 border border-black/5"
                    style={{ backgroundColor: token.hex }}
                  />
                  <div className="font-medium text-[#1C1917]">{token.name}</div>
                  <div className="text-[10px] font-mono text-[#8C8074]">{token.hex}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#E8DEC8] bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1C1917] text-white rounded-lg text-xs font-medium hover:bg-[#342D27] transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
