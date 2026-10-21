import React, { useState, useEffect, useRef } from 'react';
import {
  imageSlotsConfig,
  ImageSlotMeta,
  resetAllStoredImages,
  validateImageUpload,
} from '../utils/mediaStorage.ts';
import { useImageSlot } from '../hooks/useImageSlot.ts';
import { CloseIcon, UploadIcon, RefreshIcon, CheckIcon, CameraIcon } from './Icons.tsx';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PhotoSlotRow: React.FC<{ slot: ImageSlotMeta }> = ({ slot }) => {
  const { src, isCustom, setCustomImage, removeCustomImage } = useImageSlot(slot.key);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageUpload(file);
    if (!validation.valid) {
      setStatus({ type: 'error', message: validation.error || 'Ошибка файла' });
      setTimeout(() => setStatus(null), 3500);
      return;
    }

    const ok = await setCustomImage(file);
    if (ok) {
      setStatus({ type: 'success', message: 'Фото сохранено' });
      setTimeout(() => setStatus(null), 2500);
    } else {
      setStatus({ type: 'error', message: 'Не удалось сохранить фото' });
      setTimeout(() => setStatus(null), 3500);
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReset = () => {
    removeCustomImage();
    setStatus({ type: 'success', message: 'Сброшено к исходному' });
    setTimeout(() => setStatus(null), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white border border-[#E8DEC8] rounded-xl hover:border-[#1C1917]/30 transition-colors">
      <div className="flex items-center gap-4">
        {/* Thumbnail */}
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#F3EEE6] border border-[#DDD3C4] shrink-0 relative">
          <img
            src={src}
            alt={slot.label}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {isCustom && (
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#1C1917]" title="Установлено ваше фото" />
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-sans text-base sm:text-lg text-[#1C1917] font-semibold">
              {slot.label}
            </h4>
            {isCustom && (
              <span className="text-xs font-mono px-2 py-0.5 bg-[#FAF7F2] text-[#8C7E6F] rounded border border-[#E5DAC8] font-medium">
                Ваше фото
              </span>
            )}
          </div>
          <p className="text-sm text-[#5C5248] mt-1 leading-relaxed">
            {slot.description}
          </p>
          <div className="text-xs text-[#8F8275] mt-1 font-mono">
            Формат: {slot.recommendedRatio}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1C1917] hover:bg-[#342D27] text-white text-xs sm:text-sm font-medium rounded-xl transition-colors cursor-pointer shadow-xs"
        >
          <UploadIcon size={15} />
          <span>{isCustom ? 'Заменить' : 'Загрузить фото'}</span>
        </button>

        {isCustom && (
          <button
            type="button"
            onClick={handleReset}
            className="p-2.5 border border-[#DDD3C4] hover:border-[#1C1917] text-[#5C5248] hover:text-[#1C1917] rounded-xl transition-colors cursor-pointer"
            title="Вернуть исходное фото из референса"
          >
            <RefreshIcon size={15} />
          </button>
        )}

        {status && (
          <span
            className={`text-xs flex items-center gap-1 font-medium ${
              status.type === 'success' ? 'text-emerald-700' : 'text-amber-700'
            }`}
          >
            {status.type === 'success' && <CheckIcon size={14} />}
            <span>{status.message}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<string>('all');
  const [notification, setNotification] = useState<string | null>(null);

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

  const sections = ['all', 'Главный экран', 'Философия', 'Направления', 'Специальное предложение'];

  const filteredSlots = activeSection === 'all'
    ? imageSlotsConfig
    : imageSlotsConfig.filter((s) => s.section === activeSection);

  const handleResetAll = () => {
    resetAllStoredImages();
    setNotification('Все фото сброшены к оригинальному референсу');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-manager-title"
    >
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#E8DEC8] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EBE3D7] bg-white">
          <div>
            <div className="flex items-center gap-2">
              <CameraIcon size={18} className="text-[#A67E48]" />
              <span className="text-xs uppercase tracking-widest text-[#8A7C6E] font-medium block">
                Персонализация визуала клиники
              </span>
            </div>
            <h2 id="photo-manager-title" className="text-xl sm:text-2xl font-sans font-semibold text-[#1C1917] mt-1">
              Управление фотографиями на сайте
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#7B7268] hover:text-[#1C1917] hover:bg-[#F3EEE6] transition-colors"
            aria-label="Закрыть панель управления фотографиями"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Section Filter Tabs */}
        <div className="px-6 py-3.5 bg-[#F6F1E8] border-b border-[#E8DEC8] flex items-center gap-2 overflow-x-auto text-xs sm:text-sm">
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-colors cursor-pointer font-medium ${
                activeSection === sec
                  ? 'bg-white text-[#1C1917] shadow-xs'
                  : 'text-[#6D635B] hover:text-[#1C1917]'
              }`}
            >
              {sec === 'all' ? 'Все блоки сайта' : sec}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <p className="text-sm text-[#554C43] leading-relaxed">
            Вы можете загрузить свои собственные фотографии в любой блок сайта (главный экран Hero, философия и подход, направления процедур, специальное предложение). 
            Загруженные изображения сразу же появятся на страницах и сохраняются в памяти браузера без ограничений по размеру. 
            Также вы можете нажать прямо на кнопку с камерой поверх любого фото на сайте.
          </p>

          {notification && (
            <div className="p-3 bg-white border border-[#E8DFC8] rounded-xl text-xs text-[#1C1917] flex items-center gap-2 font-medium">
              <CheckIcon size={14} className="text-[#D8B78A]" />
              <span>{notification}</span>
            </div>
          )}

          <div className="space-y-3 pt-1">
            {filteredSlots.map((slot) => (
              <PhotoSlotRow key={slot.key} slot={slot} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E8DEC8] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetAll}
            className="text-xs text-[#8C7F72] hover:text-red-700 transition-colors underline cursor-pointer"
          >
            Сбросить все фото к оригинальному референсу
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#1C1917] hover:bg-[#342D27] text-white text-xs uppercase tracking-wider font-medium rounded-lg transition-colors cursor-pointer"
          >
            Готово / Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};
