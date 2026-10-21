import React, { useState } from 'react';
import {
  servicesCatalog,
  serviceCategories,
  DetailedService,
} from '../data/clinicData.ts';
import {
  filterServices,
  formatRubles,
  calculateDiscountedPrice,
} from '../utils/booking.ts';
import { ClockIcon, CheckIcon, CloseIcon } from '../components/Icons.tsx';

interface ServicesViewProps {
  initialCategoryId?: string;
  onBookService: (serviceId: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  initialCategoryId = 'all',
  onBookService,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryId);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedServiceModal, setSelectedServiceModal] = useState<DetailedService | null>(null);

  // Calculator state
  const [calcServiceId, setCalcServiceId] = useState<string>(servicesCatalog[0].id);
  const [calcSessions, setCalcSessions] = useState<number>(3);
  const [calcIsFirstVisit, setCalcIsFirstVisit] = useState<boolean>(true);

  const filteredServices = filterServices(servicesCatalog, selectedCategory, searchQuery);

  // Calculator computation
  const calcService = servicesCatalog.find((s) => s.id === calcServiceId) || servicesCatalog[0];
  const baseTotal = calcService.price * calcSessions;
  let packageDiscountPercent = calcSessions >= 5 ? 15 : calcSessions >= 3 ? 10 : 0;
  if (calcIsFirstVisit && calcSessions === 1) packageDiscountPercent = 20;
  const discountTotal = Math.round((baseTotal * packageDiscountPercent) / 100);
  const finalTotal = baseTotal - discountTotal;

  return (
    <div className="py-16 sm:py-20 md:py-24 bg-[#FBF9F5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Header with enlarged fonts */}
        <div className="max-w-4xl mb-14">
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8C8074] font-medium block mb-3">
            Прейскурант медицинских услуг
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1C1917] tracking-tight mb-5 font-semibold leading-tight">
            Услуги и программы преображения
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#554C43] leading-relaxed">
            Каждая методика назначается на основе доказательной диагностики. Мы работаем только с оригинальными сертифицированными препаратами и аппаратами последнего поколения.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-2 bg-[#F3EEE6] rounded-2xl border border-[#E8DEC8]">
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-white text-[#1C1917] shadow-xs font-semibold'
                    : 'text-[#6D635A] hover:text-[#1C1917]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск по названию или показанию (например: лифтинг, поры, морщины, овал)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3.5 bg-white border border-[#E8DEC8] rounded-xl text-sm sm:text-base text-[#1C1917] placeholder:text-[#A89C8F] focus:outline-hidden focus:border-[#1C1917]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-[#8C8074] hover:text-[#1C1917] cursor-pointer"
              >
                Очистить
              </button>
            )}
          </div>
        </div>

        {/* Services List / Cards with enlarged typography */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8DEC8] p-8">
            <h3 className="font-sans text-2xl text-[#1C1917] mb-2 font-semibold">Процедуры не найдены</h3>
            <p className="text-sm text-[#7A6E63] mb-4">
              Попробуйте изменить формулировку поискового запроса или выберите категорию «Все процедуры».
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-[#1C1917] text-white text-xs sm:text-sm rounded-xl font-medium"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
            {filteredServices.map((service) => {
              const discounted = calculateDiscountedPrice(service.price, true);
              return (
                <div
                  key={service.id}
                  className="bg-white border border-[#EBE3D7] rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-xs transition-all hover:border-[#D5B48A] hover:shadow-md"
                >
                  <div className="space-y-4">
                    {/* Top Meta Line */}
                    <div className="flex items-center justify-between text-xs sm:text-sm text-[#8C8073]">
                      <div className="flex items-center gap-2">
                        <ClockIcon size={15} />
                        <span>{service.durationMinutes} мин</span>
                        <span>·</span>
                        <span>
                          {service.downtimeDays === 0 ? 'Без реабилитации' : `Реабилитация: ${service.downtimeDays} дн.`}
                        </span>
                      </div>
                      {service.isPopular && (
                        <span className="text-xs font-mono uppercase tracking-wider text-[#A87F4A] font-medium">
                          Популярно
                        </span>
                      )}
                    </div>

                    {/* Title & Lead */}
                    <div>
                      <h3 className="font-sans text-2xl sm:text-3xl text-[#1C1917] mb-2 font-semibold leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#524941] leading-relaxed">
                        {service.lead}
                      </p>
                    </div>

                    {/* Indications Clean Unboxed List */}
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#9C8F82] font-semibold block mb-2">
                        Показания к процедуре:
                      </span>
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#3E362F]">
                        {service.indications.map((ind, iIdx) => (
                          <React.Fragment key={iIdx}>
                            <span>{ind}</span>
                            {iIdx < service.indications.length - 1 && (
                              <span aria-hidden="true" className="text-[#C8BBAA]">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Bottom Strip */}
                  <div className="pt-6 mt-6 border-t border-[#F0EBE3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-[#8C8074]">Стоимость сеанса:</div>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="font-sans text-2xl sm:text-3xl font-bold text-[#1C1917]">
                          {formatRubles(service.price)}
                        </span>
                        <span className="text-xs sm:text-sm text-[#A87F4A] font-medium">
                          ({formatRubles(discounted.finalPrice)} на 1-й визит)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => setSelectedServiceModal(service)}
                        className="px-4 py-2.5 text-xs sm:text-sm font-medium text-[#483F37] hover:text-[#1C1917] border border-[#E8DEC8] hover:border-[#1C1917] rounded-xl transition-colors cursor-pointer"
                      >
                        Подробнее
                      </button>
                      <button
                        onClick={() => onBookService(service.id)}
                        className="px-6 py-2.5 bg-[#1C1917] hover:bg-[#342D27] text-white text-xs sm:text-sm font-medium uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-xs"
                      >
                        Записаться
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Interactive Course Calculator */}
        <div className="bg-white border border-[#E8DEC8] rounded-2xl p-7 sm:p-9 shadow-xs">
          <div className="max-w-2xl mb-6">
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8C8074] font-medium block mb-1">
              Калькулятор выгоды курса
            </span>
            <h3 className="font-sans text-2xl sm:text-3xl text-[#1C1917] font-semibold">
              Рассчитайте стоимость курса процедур
            </h3>
            <p className="text-sm sm:text-base text-[#5E544B] mt-1">
              Курсовые программы закрепляют долгосрочный эффект неоколлагенеза и предоставляют фиксированную скидку до 15%.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div>
              <label className="text-xs sm:text-sm font-medium text-[#1C1917] block mb-2">
                Выберите процедуру
              </label>
              <select
                value={calcServiceId}
                onChange={(e) => setCalcServiceId(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD3C4] rounded-xl text-xs sm:text-sm text-[#1C1917] focus:outline-hidden"
              >
                {servicesCatalog.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({formatRubles(s.price)})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs sm:text-sm font-medium text-[#1C1917] block mb-2">
                Количество сеансов в курсе
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 5].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setCalcSessions(count)}
                    className={`py-2.5 text-center text-xs sm:text-sm font-medium rounded-xl border transition-all ${
                      calcSessions === count
                        ? 'bg-[#1C1917] text-white border-[#1C1917]'
                        : 'bg-[#FAF8F5] border-[#DDD3C4] text-[#342D27] hover:border-[#1C1917]'
                    }`}
                  >
                    {count} {count === 1 ? 'сеанс' : count < 5 ? 'сеанса' : 'сеансов'}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Result Box */}
            <div className="p-5 bg-[#FAF7F2] border border-[#E8DEC8] rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-[#7A6F64] block">Итоговая стоимость курса:</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-sans text-2xl sm:text-3xl font-bold text-[#1C1917]">
                    {formatRubles(finalTotal)}
                  </span>
                  {packageDiscountPercent > 0 && (
                    <span className="text-xs sm:text-sm text-[#A87F4A] font-medium">
                      -{packageDiscountPercent}%
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => onBookService(calcService.id)}
                className="px-5 py-2.5 bg-[#1C1917] text-white text-xs sm:text-sm font-medium rounded-xl hover:bg-[#342D27] transition-colors"
              >
                Записаться
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Service Info Modal */}
        {selectedServiceModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative w-full max-w-xl bg-white border border-[#E8DEC8] rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#8C8074]">
                    Детальный протокол процедуры
                  </span>
                  <h3 className="font-sans text-2xl sm:text-3xl text-[#1C1917] mt-1 font-semibold">
                    {selectedServiceModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedServiceModal(null)}
                  className="p-1 rounded-full text-[#7B7268] hover:text-[#1C1917] hover:bg-[#F3EEE6]"
                >
                  <CloseIcon size={20} />
                </button>
              </div>

              <p className="text-sm sm:text-base text-[#4E463F] leading-relaxed">
                {selectedServiceModal.description}
              </p>

              <div className="grid grid-cols-2 gap-3 p-4 bg-[#FAF7F2] rounded-xl text-xs sm:text-sm">
                <div>
                  <span className="font-medium text-[#1C1917] block">Регламент курса:</span>
                  <span className="text-[#6D635B]">{selectedServiceModal.courseRecommendation}</span>
                </div>
                <div>
                  <span className="font-medium text-[#1C1917] block">Оборудование / препараты:</span>
                  <span className="text-[#6D635B]">{selectedServiceModal.equipment || 'Сертифицированная линия'}</span>
                </div>
              </div>

              <div>
                <span className="text-xs sm:text-sm font-semibold text-[#1C1917] block mb-2">
                  Противопоказания:
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#7A6E63]">
                  {selectedServiceModal.contraindications.map((contra, cIdx) => (
                    <li key={cIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C4B5A0]" />
                      <span>{contra}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#EAE2D5] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#8C8074] block">Стоимость:</span>
                  <span className="font-sans text-2xl sm:text-3xl font-bold text-[#1C1917]">
                    {formatRubles(selectedServiceModal.price)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    const id = selectedServiceModal.id;
                    setSelectedServiceModal(null);
                    onBookService(id);
                  }}
                  className="px-6 py-3 bg-[#1C1917] text-white text-xs sm:text-sm font-medium uppercase tracking-wider rounded-xl"
                >
                  Записаться на приём
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
