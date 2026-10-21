import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateDiscountedPrice,
  filterServices,
  formatRubles,
  generateAvailableSlots,
  validatePhone,
  validateBookingData,
} from './booking.ts';
import type { ServiceItem } from './booking.ts';

test('formatRubles formats numbers as Russian rubles', () => {
  const formatted = formatRubles(15000);
  assert.ok(formatted.includes('15') && (formatted.includes('₽') || formatted.includes('RUB')));
});

test('calculateDiscountedPrice applies 20% first visit discount', () => {
  const result = calculateDiscountedPrice(10000, true);
  assert.equal(result.discountPercent, 20);
  assert.equal(result.discountAmount, 2000);
  assert.equal(result.finalPrice, 8000);
});

test('calculateDiscountedPrice handles standard price when not first visit', () => {
  const result = calculateDiscountedPrice(10000, false);
  assert.equal(result.discountPercent, 0);
  assert.equal(result.discountAmount, 0);
  assert.equal(result.finalPrice, 10000);
});

test('calculateDiscountedPrice applies promo code discount', () => {
  const result = calculateDiscountedPrice(20000, false, 'SKINCLEAN25');
  assert.equal(result.discountPercent, 25);
  assert.equal(result.discountAmount, 5000);
  assert.equal(result.finalPrice, 15000);
});

test('filterServices filters by category and search keyword', () => {
  const sampleServices: ServiceItem[] = [
    {
      id: 'smas',
      categoryId: 'hardware',
      title: 'SMAS-лифтинг Ultraformer MPT',
      lead: 'Безоперационная подтяжка глубоких слоёв лица',
      description: 'Фокусированный ультразвук высокой интенсивности',
      durationMinutes: 60,
      downtimeDays: 0,
      price: 45000,
      indications: ['гравитационный птоз', 'потеря четкости овала'],
      zones: ['лицо', 'шея'],
    },
    {
      id: 'biorev',
      categoryId: 'injection',
      title: 'Биоревитализация препаратами премиум-класса',
      lead: 'Глубокое увлажнение гиалуроновой кислотой',
      description: 'Восстановление гидробаланса и сияния',
      durationMinutes: 45,
      downtimeDays: 1,
      price: 18000,
      indications: ['сухость', 'мелкие морщины'],
      zones: ['лицо', 'декольте'],
    },
  ];

  // Category filter
  const hardwareOnly = filterServices(sampleServices, 'hardware', '');
  assert.equal(hardwareOnly.length, 1);
  assert.equal(hardwareOnly[0].id, 'smas');

  // Search filter
  const searchResult = filterServices(sampleServices, 'all', 'увлажнение');
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].id, 'biorev');
});

test('generateAvailableSlots creates morning to evening slots', () => {
  const slots = generateAvailableSlots('2026-10-25', ['2026-10-25 10:00']);
  assert.ok(!slots.includes('10:00'));
  assert.ok(slots.includes('10:30'));
  assert.ok(slots.includes('14:00'));
  assert.ok(slots.length > 10);
});

test('validatePhone validates Russian telephone numbers', () => {
  assert.equal(validatePhone('+7 (926) 123-45-67'), true);
  assert.equal(validatePhone('89161234567'), true);
  assert.equal(validatePhone('12345'), false);
  assert.equal(validatePhone(''), false);
});

test('validateBookingData checks form completeness', () => {
  const invalid = validateBookingData({
    name: 'A',
    phone: '123',
    serviceId: '',
    date: '',
    time: '',
    agreedToTerms: false,
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.serviceId);

  const valid = validateBookingData({
    name: 'Екатерина',
    phone: '+7 (999) 111-22-33',
    serviceId: 'smas',
    date: '2026-10-25',
    time: '12:00',
    agreedToTerms: true,
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
