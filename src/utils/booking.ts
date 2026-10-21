export interface ServiceItem {
  id: string;
  categoryId: string;
  title: string;
  lead: string;
  description: string;
  durationMinutes: number;
  downtimeDays: number;
  price: number;
  indications: string[];
  zones: string[];
  isPopular?: boolean;
}

export interface BookingFormData {
  name: string;
  phone: string;
  serviceId: string;
  doctorId?: string;
  date: string;
  time: string;
  notes?: string;
  agreedToTerms: boolean;
}

export function formatRubles(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateDiscountedPrice(
  price: number,
  isFirstVisit: boolean,
  promoCode?: string
): { finalPrice: number; discountAmount: number; discountPercent: number } {
  let discountPercent = 0;

  if (isFirstVisit) {
    discountPercent = Math.max(discountPercent, 20); // 20% discount on first visit
  }

  if (promoCode && promoCode.trim().toUpperCase() === 'SKINCLEAN25') {
    discountPercent = Math.max(discountPercent, 25);
  }

  const discountAmount = Math.round((price * discountPercent) / 100);
  const finalPrice = Math.max(0, price - discountAmount);

  return {
    finalPrice,
    discountAmount,
    discountPercent,
  };
}

export function filterServices<T extends ServiceItem>(
  services: T[],
  categoryId: string,
  searchQuery: string
): T[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return services.filter((service) => {
    const matchesCategory =
      categoryId === 'all' || service.categoryId === categoryId;

    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const matchesTitle = service.title.toLowerCase().includes(normalizedQuery);
    const matchesLead = service.lead.toLowerCase().includes(normalizedQuery);
    const matchesDesc = service.description.toLowerCase().includes(normalizedQuery);
    const matchesIndications = service.indications.some((ind) =>
      ind.toLowerCase().includes(normalizedQuery)
    );
    const matchesZones = service.zones.some((z) =>
      z.toLowerCase().includes(normalizedQuery)
    );

    return matchesTitle || matchesLead || matchesDesc || matchesIndications || matchesZones;
  });
}

export function generateAvailableSlots(dateStr: string, occupiedSlots: string[] = []): string[] {
  const slots: string[] = [];
  const startHour = 10;
  const endHour = 20;

  for (let h = startHour; h <= endHour; h++) {
    const hourStr = h.toString().padStart(2, '0');
    const slot1 = `${hourStr}:00`;
    const slot2 = `${hourStr}:30`;

    if (!occupiedSlots.includes(`${dateStr} ${slot1}`)) slots.push(slot1);
    if (h < endHour && !occupiedSlots.includes(`${dateStr} ${slot2}`)) slots.push(slot2);
  }

  return slots;
}

export function validatePhone(phone: string): boolean {
  // Accepts Russian format: +7 (999) 000-00-00, 89990000000, 79990000000, etc.
  const cleaned = phone.replace(/\D/g, '');
  return (cleaned.length === 11 && (cleaned.startsWith('7') || cleaned.startsWith('8')));
}

export function validateBookingData(data: Partial<BookingFormData>): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Пожалуйста, введите ваше имя (не менее 2 символов)';
  }

  if (!data.phone || !validatePhone(data.phone)) {
    errors.phone = 'Укажите корректный номер телефона РФ (+7 900 000-00-00)';
  }

  if (!data.serviceId || data.serviceId.trim() === '') {
    errors.serviceId = 'Выберите интересующую процедуру или консультацию';
  }

  if (!data.date || data.date.trim() === '') {
    errors.date = 'Выберите желаемую дату визита';
  }

  if (!data.time || data.time.trim() === '') {
    errors.time = 'Выберите удобное время приёма';
  }

  if (data.agreedToTerms === false) {
    errors.agreedToTerms = 'Необходимо подтвердить согласие на обработку данных';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
