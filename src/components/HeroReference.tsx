import React, { useRef } from 'react';
import { useImageSlot } from '../hooks/useImageSlot.ts';
import { validateImageUpload } from '../utils/mediaStorage.ts';
import { CameraIcon, RefreshIcon } from './Icons.tsx';

interface HeroReferenceProps {
  onOpenBooking: () => void;
  onExploreDirections: () => void;
  onOpenPhotoManager?: () => void;
}

export const HeroReference: React.FC<HeroReferenceProps> = ({
  onOpenBooking,
  onExploreDirections,
  onOpenPhotoManager,
}) => {
  const { src, isCustom, setCustomImage, removeCustomImage } = useImageSlot('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleHeroFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validation = validateImageUpload(file);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }
    await setCustomImage(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#1C1917] text-[#FAF8F5] group">
      {/* Background Media Container */}
      <div className="relative h-[560px] sm:h-[620px] md:h-[720px] lg:h-[800px] w-full overflow-hidden">
        <img
          src={src}
          alt="Skin Clean — эстетическая косметология"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />

        {/* Subtle Scrim without blurring the photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/90 via-transparent to-black/25 pointer-events-none" />

        {/* Hidden File Input for Direct Hero Upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleHeroFileChange}
          className="hidden"
          aria-label="Загрузить фото для главного экрана"
        />

        {/* Quick Upload Button on Hero Corner */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3.5 py-2 bg-black/60 hover:bg-black/90 text-white text-xs font-sans rounded-full backdrop-blur-md shadow-lg border border-white/20 transition-all hover:scale-105 cursor-pointer"
            title="Загрузить свою фотографию на главный экран"
          >
            <CameraIcon size={14} className="text-[#D8B78A]" />
            <span className="hidden sm:inline">Сменить фото на главном экране</span>
            <span className="sm:hidden">Сменить фото</span>
          </button>

          {isCustom && (
            <button
              type="button"
              onClick={removeCustomImage}
              className="p-2 bg-black/60 hover:bg-black/90 text-white rounded-full backdrop-blur-md shadow-lg border border-white/20 transition-all cursor-pointer"
              title="Вернуть оригинальное фото из референса"
            >
              <RefreshIcon size={13} />
            </button>
          )}
        </div>

        {/* Hero Top & Middle Typography Layer matching reference exactly - SHARP, NO BLUR */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-20 max-w-7xl mx-auto z-10 pointer-events-none">
          {/* Top Brand Headline: SKIN — clean (Crystal clear vector typography without drop shadow blur) */}
          <div className="pt-4 sm:pt-8">
            <h1 className="flex items-center gap-4 sm:gap-7 md:gap-10 text-white tracking-tight select-none">
              <span className="font-sans font-light tracking-[0.22em] text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase text-white antialiased">
                SKIN
              </span>
              <span className="w-12 sm:w-24 md:w-36 h-[2px] sm:h-[2.5px] bg-white inline-block shrink-0" />
              <span className="font-script italic font-normal text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-white antialiased">
                clean
              </span>
            </h1>
          </div>

          {/* Bottom Grid Overlay: Action on bottom-left, Tagline on bottom-right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end pb-4 sm:pb-8 pointer-events-auto">
            {/* Bottom-Left Action (strictly matching reference) */}
            <div>
              <button
                onClick={onOpenBooking}
                className="group inline-flex items-center gap-3 text-sm sm:text-base font-sans tracking-[0.22em] uppercase text-white pb-2 border-b-2 border-white hover:text-[#D8B78A] hover:border-[#D8B78A] transition-all cursor-pointer font-medium"
              >
                <span>Записаться на процедуру</span>
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </button>
            </div>

            {/* Bottom-Right Tagline (strictly matching reference text) */}
            <div className="md:text-right">
              <p className="font-sans text-sm sm:text-base md:text-lg text-white/95 font-light leading-relaxed max-w-lg md:ml-auto drop-shadow-xs">
                пространство, где современные технологии встречаются с индивидуальным подходом к каждому клиенту
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
