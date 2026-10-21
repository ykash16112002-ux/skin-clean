import React from 'react';
import { clinicInfo } from '../data/clinicData.ts';
import { ShieldCheckIcon } from './Icons.tsx';

export const SafetyLicensesSection: React.FC = () => {
  const safetyCards = [
    {
      title: 'Медицинская лицензия РФ',
      badge: 'Официальный статус',
      desc: `Лицензия на осуществление медицинской деятельности ${clinicInfo.licenseNumber} выдана Департаментом здравоохранения г. Москвы. Все специалисты имеют государственные сертификаты.`,
    },
    {
      title: '4-х ступенчатая стерилизация',
      badge: 'Стандарты СанПиН',
      desc: 'Полный цикл дезинфекции и автоклавирования в медицинских автоклавах B-класса (Melag, Германия). Индивидуальные крафт-пакеты со встроенными индикаторами стерильности вскрываются исключительно при пациенте.',
    },
    {
      title: 'Холодовая цепь 2–8°C',
      badge: 'Контроль препаратов',
      desc: 'Препараты ботулотоксина, полинуклеотидов и экзосом транспортируются в сертифицированных термоконтейнерах с непрерывными датчиками температурного режима на протяжении всего пути от завода до клиники.',
    },
    {
      title: '100% оригинальный парк аппаратов',
      badge: 'Аутентичность оборудования',
      desc: 'Клиника не использует реплики и серые манипулы. Все аппараты Ultraformer MPT, Morpheus 8 и Sciton BBL имеют регистрационные удостоверения Минздрава РФ и обслуживаются официальными дистрибьюторами.',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#FAF7F2] border-b border-[#EBE3D7]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto mb-14">
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8C8074] font-medium block mb-2 sm:mb-3">
            Безопасность и регламенты
          </span>
          <h2 className="font-sans text-lg sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] uppercase tracking-[0.06em] sm:tracking-[0.1em] text-[#1C1917] font-semibold leading-tight whitespace-nowrap overflow-x-auto sm:overflow-visible">
            СТАНДАРТЫ КЛИНИЧЕСКОЙ БЕЗОПАСНОСТИ
          </h2>
          <p className="text-sm sm:text-base text-[#52483E] mt-3 sm:mt-4 leading-relaxed max-w-2xl mx-auto">
            Красота не должна требовать неоправданных рисков. Мы соблюдаем строжайшие стандарты доказательной медицины.
          </p>
        </div>

        {/* 4 Cards strictly centered: icons and all text centered horizontally */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyCards.map((card, idx) => (
            <div
              key={idx}
              className="p-7 bg-white rounded-2xl border border-[#E8DFC8] shadow-xs flex flex-col items-center text-center justify-start transition-transform hover:-translate-y-0.5 duration-200"
            >
              {/* Centered Icon */}
              <div className="w-14 h-14 rounded-full bg-[#F3EEE6] text-[#A67E48] flex items-center justify-center mb-5 mx-auto shrink-0 shadow-2xs">
                <ShieldCheckIcon size={26} />
              </div>

              {/* Centered Badge */}
              <span className="text-xs uppercase font-mono tracking-wider text-[#8A7969] block mb-2 font-medium text-center">
                {card.badge}
              </span>

              {/* Centered Title */}
              <h3 className="font-sans text-lg sm:text-xl text-[#1C1917] mb-3 font-semibold text-center leading-snug">
                {card.title}
              </h3>

              {/* Centered Description */}
              <p className="text-sm text-[#4E443B] leading-relaxed text-center">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
