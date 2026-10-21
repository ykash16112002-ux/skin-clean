import React, { useState } from 'react';
import { clinicInfo } from '../data/clinicData.ts';
import { MapPinIcon, PhoneIcon, ClockIcon, CheckIcon } from '../components/Icons.tsx';

interface ContactsViewProps {
  onOpenBooking: () => void;
}

export const ContactsView: React.FC<ContactsViewProps> = ({ onOpenBooking }) => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formQuestion, setFormQuestion] = useState('');
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;
    setFormSent(true);
  };

  return (
    <div className="py-16 sm:py-20 md:py-24 bg-[#FBF9F5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8C8074] font-medium block mb-2">
            Контакты клиники
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl text-[#1C1917] tracking-tight mb-4 font-semibold">
            Как нас найти и связаться
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#554C43] leading-relaxed">
            Клиника расположена на Кутузовском проспекте в историческом центре Москвы. Для гостей клиники предусмотрена бесплатная закрытая парковка.
          </p>
        </div>

        {/* 2-Column Info & Callback Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Coordinates & Transport Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border border-[#EBE3D7] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F3EEE6] text-[#A67E48] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPinIcon size={24} />
                </div>
                <div>
                  <h3 className="font-sans text-xl sm:text-2xl text-[#1C1917] font-semibold">
                    Адрес клиники
                  </h3>
                  <p className="text-sm sm:text-base text-[#4E443B] mt-1.5 leading-relaxed">
                    {clinicInfo.address}, {clinicInfo.city}
                  </p>
                  <p className="text-xs sm:text-sm text-[#8C8074] mt-1 font-medium">
                    {clinicInfo.metro}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F3EEE6] text-[#A67E48] flex items-center justify-center shrink-0 mt-0.5">
                  <ClockIcon size={24} />
                </div>
                <div>
                  <h3 className="font-sans text-xl sm:text-2xl text-[#1C1917] font-semibold">
                    Часы приёма
                  </h3>
                  <p className="text-sm sm:text-base text-[#4E443B] mt-1.5 leading-relaxed">
                    {clinicInfo.workingHours}
                  </p>
                  <p className="text-xs sm:text-sm text-[#8C8074] mt-1 font-medium">
                    Приём строго по предварительной записи
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F3EEE6] text-[#A67E48] flex items-center justify-center shrink-0 mt-0.5">
                  <PhoneIcon size={24} />
                </div>
                <div>
                  <h3 className="font-sans text-xl sm:text-2xl text-[#1C1917] font-semibold">
                    Телефон и мессенджеры
                  </h3>
                  <p className="text-base text-[#1C1917] font-mono mt-1.5">
                    <a href={`tel:${clinicInfo.phone}`} className="hover:underline font-semibold">
                      {clinicInfo.phoneDisplay}
                    </a>
                  </p>
                  <p className="text-xs sm:text-sm text-[#8C8074] mt-1">
                    {clinicInfo.email}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F0EAE1] flex flex-wrap items-center gap-3">
                <a
                  href={clinicInfo.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-[#FAF7F2] hover:bg-[#1C1917] hover:text-white text-xs sm:text-sm font-medium rounded-xl border border-[#DDD3C4] transition-colors"
                >
                  Написать в WhatsApp
                </a>
                <a
                  href={clinicInfo.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-[#FAF7F2] hover:bg-[#1C1917] hover:text-white text-xs sm:text-sm font-medium rounded-xl border border-[#DDD3C4] transition-colors"
                >
                  Чат в Telegram
                </a>
              </div>
            </div>

            {/* Parking & Directions Notice */}
            <div className="p-6 bg-[#FAF7F2] border border-[#E8DFC8] rounded-2xl space-y-2">
              <h4 className="font-sans text-base sm:text-lg text-[#1C1917] font-semibold">
                Парковка и въезд
              </h4>
              <p className="text-xs sm:text-sm text-[#5C5248] leading-relaxed">
                Для пациентов клиники предоставляется бесплатный въезд на охраняемую парковку под шлагбаум. 
                Пожалуйста, сообщите номер и марку автомобиля администратору при подтверждении записи за 30 минут до визита.
              </p>
            </div>
          </div>

          {/* Quick Callback / Question Form */}
          <div className="lg:col-span-6 bg-white border border-[#EBE3D7] rounded-2xl p-6 sm:p-8 shadow-xs">
            {formSent ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#1C1917] text-white flex items-center justify-center">
                  <CheckIcon size={24} />
                </div>
                <h3 className="font-sans text-2xl text-[#1C1917] font-semibold">
                  Спасибо, {formName}!
                </h3>
                <p className="text-sm text-[#5C5248] max-w-sm mx-auto leading-relaxed">
                  Администратор свяжется с вами по указанному телефону в течение 10 минут в рабочее время.
                </p>
                <button
                  onClick={() => setFormSent(false)}
                  className="text-xs sm:text-sm text-[#1C1917] underline pt-2 cursor-pointer font-medium"
                >
                  Отправить еще один вопрос
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.15em] text-[#8C8074] font-medium block mb-1">
                    Обратная связь
                  </span>
                  <h3 className="font-sans text-2xl text-[#1C1917] font-semibold">
                    Задать вопрос врачу или записаться
                  </h3>
                  <p className="text-sm text-[#5C5248] mt-1 leading-relaxed">
                    Оставьте контактные данные, и мы ответим на любые вопросы по противопоказаниям, реабилитации и стоимости.
                  </p>
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-medium text-[#1C1917] block mb-1.5">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Валерия"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD3C4] rounded-xl text-sm text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-medium text-[#1C1917] block mb-1.5">
                    Телефон для связи *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (999) 000-00-00"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD3C4] rounded-xl text-sm text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-medium text-[#1C1917] block mb-1.5">
                    Вопрос или желаемая процедура
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Хочу узнать про восстановление после SMAS-лифтинга..."
                    value={formQuestion}
                    onChange={(e) => setFormQuestion(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD3C4] rounded-xl text-sm text-[#1C1917] focus:outline-hidden focus:border-[#1C1917]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#1C1917] hover:bg-[#342D27] text-white text-xs sm:text-sm uppercase tracking-wider font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    Отправить запрос
                  </button>
                </div>

                <p className="text-xs text-[#8C8074] text-center">
                  Нажимая кнопку, вы соглашаетесь с Политикой конфиденциальности клиники
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Map / Location Showcase */}
        <div className="bg-white border border-[#E8DEC8] rounded-2xl overflow-hidden shadow-xs">
          <div className="p-6 sm:p-7 border-b border-[#EBE3D7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#8C8074] font-medium">Схема проезда</span>
              <h4 className="font-sans text-xl text-[#1C1917] font-semibold">
                Кутузовский проспект, 22с1, Москва
              </h4>
            </div>
            <div className="text-xs sm:text-sm text-[#7A6E63] font-mono">
              Координаты: 55.7483° N, 37.5451° E
            </div>
          </div>

          {/* Interactive Map Visual Schema */}
          <div className="relative h-64 sm:h-80 md:h-96 bg-[#ECE5DB] flex items-center justify-center p-6 overflow-hidden">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#CBBCA9_1px,transparent_1px)] [background-size:16px_16px]" />
            
            <div className="relative z-10 bg-white/95 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-[#D5B48A]/40 shadow-xl max-w-md text-center space-y-3.5">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#1C1917] text-[#D8B78A] flex items-center justify-center">
                <MapPinIcon size={26} />
              </div>
              <h5 className="font-sans text-2xl text-[#1C1917] font-semibold">
                Клиника Skin Clean
              </h5>
              <p className="text-xs sm:text-sm text-[#5C5248] leading-relaxed">
                Кутузовский проспект, 22, стр. 1. Парадный вход со стороны сквера, отдельная вывеска Skin Clean.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <a
                  href="https://yandex.ru/maps"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-[#FAF7F2] hover:bg-[#1C1917] hover:text-white text-xs sm:text-sm font-medium rounded-xl border border-[#DDD3C4] transition-colors"
                >
                  Яндекс Карты
                </a>
                <button
                  onClick={onOpenBooking}
                  className="px-5 py-2.5 bg-[#1C1917] text-white hover:bg-[#342D27] text-xs sm:text-sm font-medium rounded-xl transition-colors cursor-pointer"
                >
                  Записаться онлайн
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
