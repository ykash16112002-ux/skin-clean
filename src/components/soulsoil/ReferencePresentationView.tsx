import React, { useState } from 'react';

interface ReferencePresentationProps {
  children: React.ReactNode;
  viewMode: 'interactive' | 'reference-frame';
  onToggleViewMode: () => void;
  onOpenPngModal: () => void;
}

export const ReferencePresentationView: React.FC<ReferencePresentationProps> = ({
  children,
  viewMode,
  onToggleViewMode,
  onOpenPngModal,
}) => {
  return (
    <div className="min-h-screen w-full relative">
      {/* Floating View Switcher Bar */}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 flex items-center gap-2 bg-[#1C2814]/90 backdrop-blur-md border border-[#8EA654]/40 p-1.5 rounded-2xl shadow-2xl text-xs font-mono-custom text-white">
        <button
          type="button"
          onClick={onToggleViewMode}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            viewMode === 'reference-frame'
              ? 'bg-[#CAD86B] text-[#1C2814] shadow-xs'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
          title="Переключить в вид презентации как на референсе (по центру с листьями)"
        >
          <span>🌿</span>
          <span className="hidden sm:inline">Вид как на референсе</span>
          <span className="sm:hidden">Референс</span>
        </button>

        <button
          type="button"
          onClick={onToggleViewMode}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            viewMode === 'interactive'
              ? 'bg-[#CAD86B] text-[#1C2814] shadow-xs'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
          title="Переключить в полноэкранный рабочий режим"
        >
          <span>🖥️</span>
          <span className="hidden sm:inline">Полноэкранный сайт</span>
          <span className="sm:hidden">Сайт</span>
        </button>

        <button
          type="button"
          onClick={onOpenPngModal}
          className="px-3 py-1.5 bg-[#FFA800] hover:bg-[#F09C00] text-white font-bold rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          title="Открыть и скачать полный PNG всего сайта"
        >
          <span>📥</span>
          <span className="hidden md:inline">Скачать PNG целиком</span>
          <span className="md:hidden">PNG</span>
        </button>
      </div>

      {viewMode === 'reference-frame' ? (
        /* Reference Frame Mode: Centered mock-up over lush dark-green garden foliage */
        <div
          className="min-h-screen w-full py-8 sm:py-16 px-2 sm:px-6 flex flex-col items-center justify-center bg-[#152310]"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(28, 40, 20, 0.72) 0%, rgba(15, 24, 11, 0.94) 100%), url('assets/aistudio/image_e098d15d.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          {/* Framed Website Container matching reference layout exactly */}
          <div className="w-full max-w-[560px] sm:max-w-[620px] md:max-w-[680px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] rounded-none overflow-hidden border border-black/30 bg-[#FFFDF9]">
            {children}
          </div>

          {/* Social Studio Branding Tag as on reference */}
          <div className="mt-8 text-center select-none">
            <span className="font-mono-custom text-xs sm:text-sm font-bold tracking-[0.3em] text-[#FAF7F0] drop-shadow-md">
              @THESOCIALSTUDIO.CO
            </span>
          </div>
        </div>
      ) : (
        /* Full Width Interactive Mode */
        <div className="w-full bg-[#FFFDF9]">
          {children}
        </div>
      )}
    </div>
  );
};
