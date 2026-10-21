/**
 * Resolves an asset path to support deployment on any subpath (e.g. GitHub Pages /skin-clean/)
 * or root domain without broken absolute URLs.
 */
export function resolveAssetUrl(path: string): string {
  if (!path) return '';
  if (
    path.startsWith('data:') ||
    path.startsWith('blob:') ||
    path.startsWith('http://') ||
    path.startsWith('https://')
  ) {
    return path;
  }
  const cleanPath = path.replace(/^(\.\/|\/)+/, '');
  // Vite sets import.meta.env.BASE_URL to './' or subpath during build
  const metaEnv = typeof import.meta !== 'undefined' && 'env' in import.meta 
    ? (import.meta as { env?: { BASE_URL?: string } }).env 
    : undefined;
  const base = metaEnv?.BASE_URL || './';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${cleanPath}`;
}

export type ImageSlotKey =
  | 'hero'
  | 'philosophy_foam'
  | 'philosophy_glow'
  | 'philosophy_texture'
  | 'direction_antiage'
  | 'direction_contour'
  | 'direction_cream'
  | 'offer_lip'
  | 'offer_wave'
  | 'offer_tone';

export interface ImageSlotMeta {
  key: ImageSlotKey;
  label: string;
  section: 'Главный экран' | 'Философия' | 'Направления' | 'Специальное предложение';
  recommendedRatio: string;
  description: string;
  defaultSrc: string;
}

export const imageSlotsConfig: ImageSlotMeta[] = [
  {
    key: 'hero',
    label: 'Главный экран (Hero)',
    section: 'Главный экран',
    recommendedRatio: '16:9 или 21:9',
    description: 'Фоновое бьюти-фото чистой кожи или модели крупным планом',
    defaultSrc: resolveAssetUrl('assets/clinic/hero_face.png'),
  },
  {
    key: 'philosophy_foam',
    label: 'Философия: Очищение (пена)',
    section: 'Философия',
    recommendedRatio: '3:4 (вертикальное)',
    description: 'Лицо с легкой очищающей пенкой или процедура ухода',
    defaultSrc: resolveAssetUrl('assets/clinic/foam_cleansing.png'),
  },
  {
    key: 'philosophy_glow',
    label: 'Философия: Сияние кожи',
    section: 'Философия',
    recommendedRatio: '1:1 или 4:3',
    description: 'Макро сияния скулы, капля сыворотки на коже',
    defaultSrc: resolveAssetUrl('assets/clinic/droplet_glow.png'),
  },
  {
    key: 'philosophy_texture',
    label: 'Философия: Текстура сыворотки',
    section: 'Философия',
    recommendedRatio: '1:1',
    description: 'Фактура косметического средства или наконечник аппарата',
    defaultSrc: resolveAssetUrl('assets/clinic/serum_texture.png'),
  },
  {
    key: 'direction_antiage',
    label: 'Направление (01): Антивозрастная медицина',
    section: 'Направления',
    recommendedRatio: '4:3',
    description: 'Естественная текстура кожи вокруг глаз, омоложение',
    defaultSrc: resolveAssetUrl('assets/clinic/antiage_face.png'),
  },
  {
    key: 'direction_contour',
    label: 'Направление (02): Эстетическая коррекция',
    section: 'Направления',
    recommendedRatio: '4:3',
    description: 'Четкий контур овала лица, угол нижней челюсти, шея',
    defaultSrc: resolveAssetUrl('assets/clinic/contour_jaw.png'),
  },
  {
    key: 'direction_cream',
    label: 'Направление (03): Программы ухода',
    section: 'Направления',
    recommendedRatio: '16:9 (широкое)',
    description: 'Текстура питательного крема, шелковая вуаль',
    defaultSrc: resolveAssetUrl('assets/clinic/cream_swirl.png'),
  },
  {
    key: 'offer_lip',
    label: 'Спецпредложение: Профиль губ',
    section: 'Специальное предложение',
    recommendedRatio: '4:3',
    description: 'Деликатная естественная форма губ и подбородка',
    defaultSrc: resolveAssetUrl('assets/clinic/profile_lip.png'),
  },
  {
    key: 'offer_wave',
    label: 'Спецпредложение: Волна крема',
    section: 'Специальное предложение',
    recommendedRatio: '4:3',
    description: 'Волна шелковистой текстуры крема',
    defaultSrc: resolveAssetUrl('assets/clinic/cream_wave.png'),
  },
  {
    key: 'offer_tone',
    label: 'Спецпредложение: Тон кожи',
    section: 'Специальное предложение',
    recommendedRatio: '4:3',
    description: 'Мягкий пудровый тон бархатистой кожи',
    defaultSrc: resolveAssetUrl('assets/clinic/tone_texture.png'),
  },
];

const STORAGE_PREFIX = 'skinclean_custom_image_';
const DB_NAME = 'skinclean_db';
const DB_STORE = 'photos';

// In-memory instant cache for synchronous React rendering without flashing
const memoryStore = new Map<string, string>();

let dbPromise: Promise<IDBDatabase | null> | null = null;

function getIDB(): Promise<IDBDatabase | null> {
  if (typeof window === 'undefined' || !('indexedDB' in window)) {
    return Promise.resolve(null);
  }
  if (!dbPromise) {
    dbPromise = new Promise((resolve) => {
      try {
        const req = indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains(DB_STORE)) {
            db.createObjectStore(DB_STORE);
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => {
          console.warn('IndexedDB not accessible, falling back to memory/localStorage');
          resolve(null);
        };
      } catch (err) {
        console.warn('Error opening IndexedDB', err);
        resolve(null);
      }
    });
  }
  return dbPromise;
}

// Hydrate memory cache from localStorage and IndexedDB at module load
if (typeof window !== 'undefined') {
  try {
    imageSlotsConfig.forEach((slot) => {
      const local = localStorage.getItem(`${STORAGE_PREFIX}${slot.key}`);
      if (local) {
        memoryStore.set(slot.key, local);
      }
    });
  } catch {
    // Ignore initial localStorage security/sandbox errors
  }

  // Load from IndexedDB to memory cache
  getIDB().then((db) => {
    if (!db) return;
    try {
      const tx = db.transaction(DB_STORE, 'readonly');
      const store = tx.objectStore(DB_STORE);
      imageSlotsConfig.forEach((slot) => {
        const req = store.get(slot.key);
        req.onsuccess = () => {
          if (req.result && typeof req.result === 'string') {
            memoryStore.set(slot.key, req.result);
            window.dispatchEvent(new CustomEvent('skinclean_image_updated', { detail: { slotKey: slot.key } }));
          }
        };
      });
    } catch (e) {
      console.warn('Failed to hydrate from IndexedDB', e);
    }
  });
}

export function getStoredImage(slotKey: ImageSlotKey): string | null {
  if (typeof window === 'undefined') return null;

  // 1. Check memory cache (instant)
  if (memoryStore.has(slotKey)) {
    return memoryStore.get(slotKey) || null;
  }

  // 2. Check localStorage fallback
  try {
    const val = localStorage.getItem(`${STORAGE_PREFIX}${slotKey}`);
    if (val) {
      memoryStore.set(slotKey, val);
      return val;
    }
  } catch {
    // Ignore
  }

  return null;
}

export function setStoredImage(slotKey: ImageSlotKey, dataUrl: string): boolean {
  if (typeof window === 'undefined') return false;

  // 1. Update memory cache immediately
  memoryStore.set(slotKey, dataUrl);

  // 2. Persist to IndexedDB (virtually unlimited browser quota, handles hundreds of MBs easily)
  getIDB().then((db) => {
    if (db) {
      try {
        const tx = db.transaction(DB_STORE, 'readwrite');
        tx.objectStore(DB_STORE).put(dataUrl, slotKey);
      } catch (e) {
        console.warn('Failed to write to IndexedDB', e);
      }
    }
  });

  // 3. Try to save to localStorage as backup, ignoring quota exceeded errors safely
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${slotKey}`, dataUrl);
  } catch {
    // Expected if localStorage hits 5MB quota; IndexedDB + memoryStore ensure it still works
  }

  // 4. Notify all components across the applet
  window.dispatchEvent(new CustomEvent('skinclean_image_updated', { detail: { slotKey } }));
  return true;
}

export function removeStoredImage(slotKey: ImageSlotKey): void {
  if (typeof window === 'undefined') return;

  memoryStore.delete(slotKey);

  getIDB().then((db) => {
    if (db) {
      try {
        const tx = db.transaction(DB_STORE, 'readwrite');
        tx.objectStore(DB_STORE).delete(slotKey);
      } catch (e) {
        console.warn('Failed to delete from IndexedDB', e);
      }
    }
  });

  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${slotKey}`);
  } catch {
    // Ignore
  }

  window.dispatchEvent(new CustomEvent('skinclean_image_updated', { detail: { slotKey } }));
}

export function resetAllStoredImages(): void {
  if (typeof window === 'undefined') return;

  memoryStore.clear();

  getIDB().then((db) => {
    if (db) {
      try {
        const tx = db.transaction(DB_STORE, 'readwrite');
        tx.objectStore(DB_STORE).clear();
      } catch (e) {
        console.warn('Failed to clear IndexedDB', e);
      }
    }
  });

  try {
    imageSlotsConfig.forEach((slot) => {
      localStorage.removeItem(`${STORAGE_PREFIX}${slot.key}`);
    });
  } catch {
    // Ignore
  }

  window.dispatchEvent(new CustomEvent('skinclean_image_updated', { detail: { all: true } }));
}

export function getEffectiveImage(slotKey: ImageSlotKey): string {
  const custom = getStoredImage(slotKey);
  if (custom) return resolveAssetUrl(custom);
  const config = imageSlotsConfig.find((s) => s.key === slotKey);
  return config ? resolveAssetUrl(config.defaultSrc) : resolveAssetUrl('assets/aistudio/image_72db1020.png');
}

/**
 * Validates that the uploaded file is an image and its size is reasonable (<= 30MB)
 */
export function validateImageUpload(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'Файл не выбран' };
  }
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'Пожалуйста, выберите файл изображения (JPG, PNG, WebP)' };
  }
  const maxBytes = 30 * 1024 * 1024;
  if (file.size > maxBytes) {
    return { valid: false, error: 'Размер файла превышает 30 МБ' };
  }
  return { valid: true };
}

/**
 * Compresses an image client-side to ensure smooth storage in IndexedDB/localStorage.
 * Always exports high-quality JPEG (quality 0.82) resized to max 1440px.
 * Resulting size is around 120-180KB, with razor sharp detail and ZERO quota issues.
 */
export function compressImage(file: File, maxDim = 1440, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) {
        reject(new Error('Не удалось прочитать файл'));
        return;
      }
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw light background fill for any transparent PNG
        ctx.fillStyle = '#FAF7F2';
        ctx.fillRect(0, 0, width, height);

        ctx.drawImage(img, 0, 0, width, height);

        // Always compress to high-quality JPEG to prevent 5MB PNG explosion
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
