import {
  ImageSlotKey,
  imageSlotsConfig,
  getStoredImage,
  setStoredImage,
} from './mediaStorage.ts';

export interface CustomPhotoItem {
  slotKey: ImageSlotKey;
  label: string;
  section: string;
  repoFilePath: string; // relative to public/ e.g. "assets/clinic/hero_face.png"
  dataUrl: string;
}

export const SLOT_TO_FILE_MAP: Record<ImageSlotKey, string> = {
  hero: 'assets/clinic/hero_face.png',
  philosophy_foam: 'assets/clinic/foam_cleansing.png',
  philosophy_glow: 'assets/clinic/droplet_glow.png',
  philosophy_texture: 'assets/clinic/serum_texture.png',
  direction_antiage: 'assets/clinic/antiage_face.png',
  direction_contour: 'assets/clinic/contour_jaw.png',
  direction_cream: 'assets/clinic/cream_swirl.png',
  offer_lip: 'assets/clinic/profile_lip.png',
  offer_wave: 'assets/clinic/cream_wave.png',
  offer_tone: 'assets/clinic/tone_texture.png',
};

// Default GitHub repository parameters
export const GITHUB_CONFIG = {
  owner: 'ykash16112002-ux',
  repo: 'skin-clean',
  getToken(): string {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('skinclean_github_token') || '';
  },
  setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('skinclean_github_token', token.trim());
  },
};

/**
 * Returns all photos that have been customized on the current device
 */
export function getCustomPhotosList(): CustomPhotoItem[] {
  const result: CustomPhotoItem[] = [];

  imageSlotsConfig.forEach((slot) => {
    const custom = getStoredImage(slot.key);
    if (custom && (custom.startsWith('data:') || custom.startsWith('blob:'))) {
      result.push({
        slotKey: slot.key,
        label: slot.label,
        section: slot.section,
        repoFilePath: SLOT_TO_FILE_MAP[slot.key] || `assets/clinic/${slot.key}.png`,
        dataUrl: custom,
      });
    }
  });

  return result;
}

/**
 * Check if the current browser session has any custom uploaded photos
 */
export function hasCustomPhotos(): boolean {
  return getCustomPhotosList().length > 0;
}

/**
 * Helper to fetch file SHA from GitHub contents API if it already exists
 */
async function getFileSha(path: string, branch: string, token: string): Promise<string | null> {
  try {
    const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${path}?ref=${branch}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data.sha || null;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Pushes or updates a single file in the GitHub repo via contents API
 */
async function uploadFileToGitHub(
  path: string,
  base64Content: string,
  commitMessage: string,
  branch: string,
  token: string
): Promise<boolean> {
  const sha = await getFileSha(path, branch, token);
  const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${path}`;

  const body: Record<string, unknown> = {
    message: commitMessage,
    content: base64Content,
    branch,
  };
  if (sha) {
    body.sha = sha;
  }

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`GitHub API upload failed for ${path} on branch ${branch}:`, errText);
    return false;
  }
  return true;
}

export interface SyncProgressCallback {
  (step: {
    status: 'starting' | 'uploading' | 'deploying' | 'completed' | 'error';
    message: string;
    current?: number;
    total?: number;
  }): void;
}

/**
 * Synchronizes all custom photos from this browser to GitHub so they appear
 * on ALL devices (other laptops, phones) without blurry fallbacks.
 */
export async function syncCustomPhotosToGitHub(
  onProgress?: SyncProgressCallback
): Promise<{ success: boolean; count: number; error?: string }> {
  const customPhotos = getCustomPhotosList();
  if (customPhotos.length === 0) {
    return { success: true, count: 0, error: 'Нет загруженных пользовательских фото' };
  }

  onProgress?.({
    status: 'starting',
    message: `Подготовка ${customPhotos.length} фото к отправке на GitHub...`,
    current: 0,
    total: customPhotos.length,
  });

  // 1. Try local dev server endpoint if running in AI Studio preview
  try {
    const devApiRes = await fetch('/api/sync-photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photos: customPhotos }),
    });

    if (devApiRes.ok) {
      const data = await devApiRes.json();
      if (data.success) {
        onProgress?.({
          status: 'completed',
          message: `Успешно сохранено ${customPhotos.length} фото в репозиторий через сервер!`,
          current: customPhotos.length,
          total: customPhotos.length,
        });
        return { success: true, count: customPhotos.length };
      }
    }
  } catch {
    // If not on local dev server or endpoint fails, proceed to direct GitHub REST API
  }

  // 2. Direct GitHub REST API fallback (works everywhere, including on live GitHub Pages)
  let token = GITHUB_CONFIG.getToken();
  if (!token && typeof window !== 'undefined') {
    const input = window.prompt(
      'Для синхронизации с GitHub Pages введите ваш GitHub Token (или воспользуйтесь кнопкой «Экспорт фото» для мгновенного переноса без токена):'
    );
    if (input && input.trim()) {
      token = input.trim();
      GITHUB_CONFIG.setToken(token);
    } else {
      onProgress?.({
        status: 'error',
        message: 'Токен не указан. Воспользуйтесь кнопкой «Экспорт фото» для переноса файлов.',
      });
      return { success: false, count: 0, error: 'Токен не указан' };
    }
  }
  let uploadedCount = 0;

  for (let i = 0; i < customPhotos.length; i++) {
    const item = customPhotos[i];
    const base64Pure = item.dataUrl.includes(',')
      ? item.dataUrl.split(',')[1]
      : item.dataUrl;

    onProgress?.({
      status: 'uploading',
      message: `Сохранение [${i + 1}/${customPhotos.length}]: ${item.label}...`,
      current: i + 1,
      total: customPhotos.length,
    });

    // Update main branch (public/assets/clinic/...)
    const mainPath = `public/${item.repoFilePath}`;
    const mainOk = await uploadFileToGitHub(
      mainPath,
      base64Pure,
      `feat(photos): update ${item.label} to crisp user photo`,
      'main',
      token
    );

    // Update gh-pages branch (assets/clinic/...) for INSTANT live reflection without waiting for build!
    const ghPagesPath = item.repoFilePath;
    const pagesOk = await uploadFileToGitHub(
      ghPagesPath,
      base64Pure,
      `deploy(photos): instant update ${item.label} for gh-pages`,
      'gh-pages',
      token
    );

    if (mainOk || pagesOk) {
      uploadedCount++;
    }
  }

  if (uploadedCount > 0) {
    onProgress?.({
      status: 'completed',
      message: `Готово! ${uploadedCount} фото успешно загружены в GitHub. На всех ноутбуках и телефонах теперь будут четкие фото!`,
      current: uploadedCount,
      total: customPhotos.length,
    });
    return { success: true, count: uploadedCount };
  } else {
    onProgress?.({
      status: 'error',
      message: 'Не удалось отправить фото в GitHub. Проверьте интернет-соединение.',
    });
    return { success: false, count: 0, error: 'Ошибка передачи данных в GitHub' };
  }
}

/**
 * Exports all custom photos to a JSON file for quick backup or migration
 */
export function exportCustomPhotosBackup(): void {
  const photos = getCustomPhotosList();
  if (photos.length === 0) {
    alert('Нет загруженных фото для экспорта');
    return;
  }
  const payload = {
    site: 'skin-clean',
    timestamp: new Date().toISOString(),
    photos,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `skinclean-photos-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Imports custom photos from a previously exported backup file
 */
export async function importCustomPhotosBackup(file: File): Promise<{ success: boolean; count: number }> {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!data.photos || !Array.isArray(data.photos)) {
      throw new Error('Неверный формат файла бэкапа');
    }
    let restored = 0;
    data.photos.forEach((p: { slotKey: ImageSlotKey; dataUrl: string }) => {
      if (p.slotKey && p.dataUrl) {
        setStoredImage(p.slotKey, p.dataUrl);
        restored++;
      }
    });
    return { success: true, count: restored };
  } catch (err) {
    console.error('Import backup failed:', err);
    return { success: false, count: 0 };
  }
}
