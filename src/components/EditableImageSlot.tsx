import React, { useRef, useState } from 'react';
import { ImageSlotKey, validateImageUpload } from '../utils/mediaStorage.ts';
import { useImageSlot } from '../hooks/useImageSlot.ts';
import { CameraIcon, RefreshIcon, CheckIcon } from './Icons.tsx';

interface EditableImageSlotProps {
  slotKey: ImageSlotKey;
  alt: string;
  className?: string;
  imgClassName?: string;
  label?: string;
  showOverlayButton?: boolean;
}

export const EditableImageSlot: React.FC<EditableImageSlotProps> = ({
  slotKey,
  alt,
  className = "w-full h-full relative group overflow-hidden bg-[#F3EEE6]",
  imgClassName = "w-full h-full object-cover",
  label,
  showOverlayButton = true,
}) => {
  const { src, isCustom, setCustomImage, removeCustomImage } = useImageSlot(slotKey);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageUpload(file);
    if (!validation.valid) {
      setNotification(validation.error || 'Ошибка загрузки файла');
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const ok = await setCustomImage(file);
    if (ok) {
      setNotification('Фото обновлено');
      setTimeout(() => setNotification(null), 2500);
    } else {
      setNotification('Ошибка при сохранении фото');
      setTimeout(() => setNotification(null), 3000);
    }

    // Reset input value so re-selecting same file triggers change
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    removeCustomImage();
    setNotification('Возвращено исходное фото');
    setTimeout(() => setNotification(null), 2500);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Underlying Image */}
      <img
        src={src}
        alt={alt}
        className={imgClassName}
        loading="lazy"
        referrerPolicy="no-referrer"
      />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label={`Загрузить фото для ${label || alt}`}
      />

      {/* Subtle overlay affordance */}
      {showOverlayButton && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              fileInputRef.current?.click();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/75 hover:bg-black text-white text-[11px] font-sans rounded-full shadow-md backdrop-blur-xs cursor-pointer transition-all hover:scale-105"
            title="Загрузить свою фотографию"
          >
            <CameraIcon size={13} />
            <span className="hidden sm:inline">Сменить фото</span>
          </button>

          {isCustom && (
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 bg-black/75 hover:bg-black text-white text-[11px] rounded-full shadow-md backdrop-blur-xs cursor-pointer transition-all hover:scale-105"
              title="Сбросить к исходному фото из референса"
            >
              <RefreshIcon size={12} />
            </button>
          )}
        </div>
      )}

      {/* Temporary toast notification */}
      {notification && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 px-3 py-1 bg-black/85 text-white text-[11px] font-medium rounded-full flex items-center gap-1.5 shadow-lg animate-in fade-in duration-150">
          <CheckIcon size={12} className="text-[#D8B78A]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Custom badge indicator */}
      {isCustom && (
        <div className="absolute bottom-2 left-2 z-10 px-2 py-0.5 bg-[#1C1917]/70 backdrop-blur-xs text-[10px] text-[#D8B78A] rounded tracking-wider uppercase font-mono pointer-events-none">
          Ваше фото
        </div>
      )}
    </div>
  );
};
