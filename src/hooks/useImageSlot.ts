import { useState, useEffect, useCallback } from 'react';
import {
  ImageSlotKey,
  getEffectiveImage,
  getStoredImage,
  setStoredImage,
  removeStoredImage,
} from '../utils/mediaStorage.ts';

export function useImageSlot(slotKey: ImageSlotKey) {
  const [src, setSrc] = useState<string>(() => getEffectiveImage(slotKey));
  const [isCustom, setIsCustom] = useState<boolean>(() => !!getStoredImage(slotKey));

  const updateState = useCallback(() => {
    setSrc(getEffectiveImage(slotKey));
    setIsCustom(!!getStoredImage(slotKey));
  }, [slotKey]);

  useEffect(() => {
    updateState();

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (
        !customEvent.detail ||
        customEvent.detail.all ||
        customEvent.detail.slotKey === slotKey
      ) {
        updateState();
      }
    };

    window.addEventListener('skinclean_image_updated', handleCustomEvent);
    window.addEventListener('storage', updateState);

    return () => {
      window.removeEventListener('skinclean_image_updated', handleCustomEvent);
      window.removeEventListener('storage', updateState);
    };
  }, [slotKey, updateState]);

  const setCustomImage = useCallback(
    async (fileOrDataUrl: File | string): Promise<boolean> => {
      try {
        if (typeof fileOrDataUrl === 'string') {
          const ok = setStoredImage(slotKey, fileOrDataUrl);
          updateState();
          return ok;
        } else {
          const { compressImage } = await import('../utils/mediaStorage.ts');
          const dataUrl = await compressImage(fileOrDataUrl);
          const ok = setStoredImage(slotKey, dataUrl);
          updateState();
          return ok;
        }
      } catch (err) {
        console.error('Failed to store image', err);
        return false;
      }
    },
    [slotKey, updateState]
  );

  const removeCustomImage = useCallback(() => {
    removeStoredImage(slotKey);
    updateState();
  }, [slotKey, updateState]);

  return {
    src,
    isCustom,
    setCustomImage,
    removeCustomImage,
  };
}
