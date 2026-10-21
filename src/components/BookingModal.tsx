import React, { useState, useEffect } from 'react';
import { servicesCatalog, doctorsCatalog, clinicInfo } from '../data/clinicData.ts';
import {
  calculateDiscountedPrice,
  formatRubles,
  generateAvailableSlots,
  validateBookingData,
  BookingFormData,
} from '../utils/booking.ts';
import { CloseIcon, CheckIcon, CalendarIcon, ClockIcon, PhoneIcon } from './Icons.tsx';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialDoctorId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  initialDoctorId,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    serviceId: initialServiceId || servicesCatalog[0].id,
    doctorId: initialDoctorId || 'any',
    date: '2026-10-22',
    time: '11:00',
    notes: '',
    agreedToTerms: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Sync initial selections if modal opens with specific service or doctor
  useEffect(() => {
    if (initialServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: initialServiceId }));
    }
    if (initialDoctorId) {
      setFormData((prev) => ({ ...prev, doctorId: initialDoctorId }));
    }
  }, [initialServiceId, initialDoctorId]);

  // Handle escape key
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

  const selectedService = servicesCatalog.find((s) => s.id === formData.serviceId) || servicesCatalog[0];
  const selectedDoctor = doctorsCatalog.find((d) => d.id === formData.doctorId);
  const priceInfo = calculateDiscountedPrice(selectedService.price, isFirstVisit);
  const availableSlots = generateAvailableSlots(formData.date);

  const handleNext = () => {
    if (step === 1) {
      if (!formData.serviceId) {
        setErrors({ serviceId: 'Выберите процедуру' });
        return;
      }
      setErrors({});
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!formData.date || !formData.time) {
        setErrors({ time: 'Выберите дату и время' });
        return;
      }
      setErrors({});
      setStep(4);
    } else if (step === 4) {
      const validation = validateBookingData(formData);
      if (!validation.valid) {
        setErrors(validation.errors);
        return;
      }
      setErrors({});
      setIsSubmitted(true);
      setStep(5);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStep(1);
    setFormData({
      name: '',
      phone: '',
      serviceId: servicesCatalog[0].id,
      doctorId: 'any',
      date: '2026-10-22',
      time: '11:00',
      notes: '',
      agreedToTerms: true,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="relative w-full max-w-xl bg-[#FAF8F5] border border-[#E8DEC8] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBE3D7] bg-white">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#9A8D7E] font-medium block">
              Skin Clean · Клинический приём
            </span>
            <h2 id="booking-modal-title" className="text-xl font-sans text-[#1C1917]">
              {isSubmitted ? 'Запись подтверждена' : 'Онлайн-запись на консультацию и процедуры'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#7B7268] hover:text-[#1C1917] hover:bg-[#F3EEE6] transition-colors"
            aria-label="Закрыть окно записи"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Step Indicator (when not submitted) */}
        {!isSubmitted && (
          <div className="flex items-center px-6 py-2.5 bg-[#F6F1E8] border-b border-[#E8DEC8] text-xs text-[#7B7268] gap-4 overflow-x-auto">
            <span className={`font-medium whitespace-nowrap ${step >= 1 ? 'text-[#1C1917]' : ''}`}>
              1. Процедура
            </span>
            <span aria-hidden="true" className="text-[#C8BCAB]">/</span>
            <span className={`font-medium whitespace-nowrap ${step >= 2 ? 'text-[#1C1917]' : ''}`}>
              2. Специалист
            </span>
            <span aria-hidden="true" className="text-[#C8BCAB]">/</span>
            <span className={`font-medium whitespace-nowrap ${step >= 3 ? 'text-[#1C1917]' : ''}`}>
              3. Дата и время
            </span>
            <span aria-hidden="true" className="text-[#C8BCAB]">/</span>
            <span className={`font-medium whitespace-nowrap ${step >= 4 ? 'text-[#1C1917]' : ''}`}>
              4. Контакты
            </span>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-[#6F6459] leading-relaxed">
                Выберите процедуру из каталога или первичную консультацию с аппаратной диагностикой кожи.
              </p>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {servicesCatalog.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceId: service.id })}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-start justify-between gap-3 ${
                      formData.serviceId === service.id
                        ? 'bg-white border-[#1C1917] shadow-xs'
                        : 'bg-[#F9F6F0] border-[#E8DFC8] hover:border-[#BF9B6B]'
                    }`}
                  >
                    <div>
                      <div className="font-sans text-sm font-semibold text-[#1C1917]">
                        {service.title}
                      </div>
                      <div className="text-[11px] text-[#6E6358] mt-0.5 line-clamp-1">
                        {service.lead}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-[#8C8074]">
                        <span>{service.durationMinutes} мин</span>
                        <span>·</span>
                        <span>Реабилитация: {service.downtimeDays === 0 ? 'нет' : `${service.downtimeDays} дн.`}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-sans font-medium text-sm text-[#1C1917]">
                        {formatRubles(service.price)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* First Visit 20% discount reminder */}
              <div className="p-3 bg-white border border-[#E5DAC8] rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-medium text-[#1C1917] block">Первое посещение клиники?</span>
                  <span className="text-[#7A6F64] text-[11px]">Действует специальная скидка 20% на процедуру</span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={isFirstVisit}
                    onChange={(e) => setIsFirstVisit(e.target.checked)}
                    className="w-4 h-4 accent-[#1C1917] rounded"
                  />
                  <span className="text-[11px] text-[#1C1917] font-medium">Да, я впервые</span>
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-[#6F6459] leading-relaxed">
                Вы можете выбрать конкретного специалиста или доверить выбор дежурному врачу-эксперту.
              </p>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, doctorId: 'any' })}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs ${
                    formData.doctorId === 'any'
                      ? 'bg-white border-[#1C1917] shadow-xs'
                      : 'bg-[#F9F6F0] border-[#E8DFC8] hover:border-[#BF9B6B]'
                  }`}
                >
                  <div className="font-medium text-[#1C1917]">Любой свободный ведущий специалист</div>
                  <div className="text-[11px] text-[#7A6F64] mt-0.5">
                    Система подберет ближайшее удобное окно у врача высшей категории
                  </div>
                </button>

                {doctorsCatalog.map((doctor) => (
                  <button
                    key={doctor.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, doctorId: doctor.id })}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-center gap-3 ${
                      formData.doctorId === doctor.id
                        ? 'bg-white border-[#1C1917] shadow-xs'
                        : 'bg-[#F9F6F0] border-[#E8DFC8] hover:border-[#BF9B6B]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#EBE3D7] overflow-hidden shrink-0 flex items-center justify-center font-sans text-sm font-semibold text-[#5C5044]">
                      {doctor.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-sans text-sm font-semibold text-[#1C1917]">
                        {doctor.name}
                      </div>
                      <div className="text-[11px] text-[#6E6358]">{doctor.role}</div>
                      <div className="text-[10px] text-[#9A8D7E] mt-0.5">Опыт: {doctor.experienceYears} лет</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-[#1C1917] block mb-1">
                  Желаемая дата визита
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={formData.date}
                    min="2026-10-21"
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD3C4] rounded-lg text-xs text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#1C1917] block mb-1.5">
                  Свободные слоты приёма на {formData.date}:
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-48 overflow-y-auto">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData({ ...formData, time: slot })}
                      className={`py-2 px-1 text-center text-xs font-mono rounded-lg border transition-all ${
                        formData.time === slot
                          ? 'bg-[#1C1917] text-white border-[#1C1917]'
                          : 'bg-white border-[#E5DAC8] text-[#342D27] hover:border-[#1C1917]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3.5">
              <div>
                <label className="text-xs font-medium text-[#1C1917] block mb-1">
                  Ваше имя и фамилия *
                </label>
                <input
                  type="text"
                  placeholder="Екатерина"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD3C4] rounded-lg text-xs text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                />
                {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-xs font-medium text-[#1C1917] block mb-1">
                  Номер телефона для подтверждения *
                </label>
                <input
                  type="tel"
                  placeholder="+7 (999) 000-00-00"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD3C4] rounded-lg text-xs text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                />
                {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="text-xs font-medium text-[#1C1917] block mb-1">
                  Комментарий или пожелания (необязательно)
                </label>
                <textarea
                  rows={2}
                  placeholder="Удобно подтвердить в WhatsApp, интересует реабилитация..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-[#DDD3C4] rounded-lg text-xs text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                />
              </div>

              {/* Order Summary Strip */}
              <div className="p-3.5 bg-white border border-[#E5DAC8] rounded-xl text-xs space-y-1">
                <div className="flex justify-between text-[#6F6459]">
                  <span>Услуга:</span>
                  <span className="font-medium text-[#1C1917] text-right">{selectedService.title}</span>
                </div>
                <div className="flex justify-between text-[#6F6459]">
                  <span>Специалист:</span>
                  <span className="font-medium text-[#1C1917]">
                    {selectedDoctor ? selectedDoctor.name : 'Ведущий специалист'}
                  </span>
                </div>
                <div className="flex justify-between text-[#6F6459]">
                  <span>Дата и время:</span>
                  <span className="font-medium text-[#1C1917] font-mono">
                    {formData.date} в {formData.time}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#F0EAE1] flex justify-between items-baseline">
                  <span>К оплате на приёме:</span>
                  <div className="text-right">
                    {priceInfo.discountAmount > 0 && (
                      <span className="text-[11px] text-[#8F8376] line-through mr-2">
                        {formatRubles(selectedService.price)}
                      </span>
                    )}
                    <span className="font-sans text-base font-semibold text-[#1C1917]">
                      {formatRubles(priceInfo.finalPrice)}
                    </span>
                    {priceInfo.discountPercent > 0 && (
                      <span className="text-[10px] text-[#A67E48] ml-1.5 font-medium">
                        (-{priceInfo.discountPercent}%)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-2 cursor-pointer text-[11px] text-[#6F6459] pt-1">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  className="w-4 h-4 accent-[#1C1917] rounded mt-0.5"
                />
                <span>
                  Согласен(-на) на обработку персональных данных и получение сервисных напоминаний о визите
                </span>
              </label>
              {errors.agreedToTerms && (
                <p className="text-[11px] text-red-600">{errors.agreedToTerms}</p>
              )}
            </div>
          )}

          {step === 5 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#1C1917] text-white flex items-center justify-center shadow-md">
                <CheckIcon size={24} />
              </div>
              <div>
                <h3 className="font-sans text-2xl text-[#1C1917]">
                  {formData.name}, мы забронировали ваше время!
                </h3>
                <p className="text-xs text-[#6F6459] mt-1 max-w-sm mx-auto">
                  В ближайшие 5 минут администратор свяжется с вами по номеру{' '}
                  <span className="font-medium text-[#1C1917]">{formData.phone}</span> для подтверждения деталей.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E8DFC8] rounded-xl text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex items-center gap-2 text-[#6F6459]">
                  <CalendarIcon size={14} />
                  <span>{formData.date} в {formData.time}</span>
                </div>
                <div className="flex items-center gap-2 text-[#6F6459]">
                  <ClockIcon size={14} />
                  <span>{selectedService.title} ({selectedService.durationMinutes} мин)</span>
                </div>
                <div className="flex items-center gap-2 text-[#6F6459]">
                  <PhoneIcon size={14} />
                  <span>{clinicInfo.address} ({clinicInfo.metro})</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={`https://wa.me/74958223450?text=${encodeURIComponent(`Здравствуйте! Я оформил запись на ${selectedService.title} на ${formData.date} в ${formData.time}. Имя: ${formData.name}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-[#25D366] text-white rounded-lg text-xs font-medium hover:bg-[#20ba59] transition-colors"
                >
                  Написать администратору в WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 bg-[#1C1917] text-white rounded-lg text-xs font-medium hover:bg-[#342D27] transition-colors"
                >
                  Готово
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {!isSubmitted && (
          <div className="px-6 py-4 border-t border-[#E8DEC8] bg-white flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-medium text-[#5E544A] hover:text-[#1C1917] transition-colors"
              >
                Назад
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-[#1C1917] text-white rounded-lg text-xs font-medium hover:bg-[#342D27] transition-all"
            >
              {step === 4 ? 'Подтвердить запись' : 'Продолжить'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
