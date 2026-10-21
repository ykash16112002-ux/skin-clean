import test from 'node:test';
import assert from 'node:assert/strict';
import {
  imageSlotsConfig,
  getEffectiveImage,
  validateImageUpload,
} from './mediaStorage.ts';

test('imageSlotsConfig covers all key visual zones on the clinic site', () => {
  const keys = imageSlotsConfig.map((s) => s.key);
  assert.ok(keys.includes('hero'));
  assert.ok(keys.includes('philosophy_foam'));
  assert.ok(keys.includes('philosophy_glow'));
  assert.ok(keys.includes('philosophy_texture'));
  assert.ok(keys.includes('direction_antiage'));
  assert.ok(keys.includes('offer_lip'));
  assert.equal(imageSlotsConfig.length, 10);
});

test('getEffectiveImage returns default source when no custom image is saved in SSR/node environment', () => {
  const heroSrc = getEffectiveImage('hero');
  assert.ok(heroSrc.length > 0);
  assert.ok(heroSrc.includes('hero_face'));

  const foamSrc = getEffectiveImage('philosophy_foam');
  assert.ok(foamSrc.includes('foam_cleansing'));
});

test('validateImageUpload checks file type and limits', () => {
  const validFile = {
    name: 'photo.jpg',
    type: 'image/jpeg',
    size: 2 * 1024 * 1024,
  } as unknown as File;

  const validRes = validateImageUpload(validFile);
  assert.equal(validRes.valid, true);

  const invalidType = {
    name: 'document.pdf',
    type: 'application/pdf',
    size: 1024,
  } as unknown as File;

  const invalidRes = validateImageUpload(invalidType);
  assert.equal(invalidRes.valid, false);
  assert.ok(invalidRes.error?.includes('изображения'));

  const oversized = {
    name: 'huge.png',
    type: 'image/png',
    size: 40 * 1024 * 1024,
  } as unknown as File;

  const oversizedRes = validateImageUpload(oversized);
  assert.equal(oversizedRes.valid, false);
  assert.ok(oversizedRes.error?.includes('30 МБ'));
});
