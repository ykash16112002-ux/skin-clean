import React from 'react';
import { clinicInfo } from '../data/clinicData.ts';
import { RefVisual } from '../components/RefVisual.tsx';
import { ShieldCheckIcon, CheckIcon } from '../components/Icons.tsx';

interface AboutViewProps {
  onOpenBooking: () => void;
  onBookDoctor: (doctorId: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onOpenBooking,
}) => {

  const equipmentList = [
    {
      name: 'Ultraformer MPT (Classys, Южная Корея)',
      tech: 'Микро- и макрофокусированный ультразвук (HIFU) с режимом MP',
      purpose: 'Безоперационный SMAS-лифтинг лица, субментальной зоны и тела',
      maker: 'Classys Inc.',
      status: 'Оригинальный аппарат с РУ Минздрава РФ',
    },
    {
      name: 'InMode Morpheus 8 (InMode, Израиль)',
      tech: 'Фракционный игольчатый RF-термолиз с изолированными и неизолированными микроиглами',
      purpose: 'Ремоделирование дермы, уплотнение кожного лоскута, лечение постакне',
      maker: 'InMode Ltd.',
      status: 'Оригинальная платформа, одноразовые насадки',
    },
    {
      name: 'Sciton BBL Hero (Sciton, США)',
      tech: 'Высокоинтенсивный широкополосный импульсный свет высокой мощности Hero',
      purpose: 'Фотоомоложение Forever Young, терапия розацеа, пигментации и акне',
      maker: 'Sciton Medical USA',
      status: 'Официальная авторизация клиники',
    },
    {
      name: 'HydraFacial Tower MD (Edge Systems, США)',
      tech: 'Вакуумный гидропилинг с запатентованными спиральными насадками Vortex-Fusion',
      purpose: 'Атравматичное очищение, эксфолиация и глубокое безыгольное насыщение сыворотками',
      maker: 'Edge Systems LLC',
      status: 'Сертифицированная оригинальная система',
    },
  ];

  return (
    <div className="py-16 sm:py-20 md:py-24 bg-[#FBF9F5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8C8074] font-medium block">
              О клинике Skin Clean
            </span>
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl text-[#1C1917] tracking-tight font-semibold leading-tight">
              Интеллектуальная косметология и уважение к природной анатомии
            </h1>
            <p className="text-base sm:text-lg text-[#4E453D] leading-relaxed">
              Мы создали клинику Skin Clean как пространство, где передовые медицинские технологии сочетаются с эстетикой «тихой роскоши». 
              Наша философия проста: мы не меняем черты лица до неузнаваемости, а раскрываем и сохраняем вашу индивидуальную красоту, 
              добиваясь безупречного качества кожи и гармонии контуров.
            </p>
            <div className="flex items-center gap-8 pt-4 text-[#1C1917]">
              <div>
                <span className="font-sans text-3xl sm:text-4xl font-bold block text-[#1C1917]">14+</span>
                <span className="text-xs sm:text-sm text-[#706458]">лет клинического опыта</span>
              </div>
              <div className="w-[1px] h-12 bg-[#E0D7C9]" />
              <div>
                <span className="font-sans text-3xl sm:text-4xl font-bold block text-[#1C1917]">5 200+</span>
                <span className="text-xs sm:text-sm text-[#706458]">довольных пациентов</span>
              </div>
              <div className="w-[1px] h-12 bg-[#E0D7C9]" />
              <div>
                <span className="font-sans text-3xl sm:text-4xl font-bold block text-[#1C1917]">100%</span>
                <span className="text-xs sm:text-sm text-[#706458]">оригинальный парк</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-md border border-[#E8DEC8] h-80 sm:h-96 md:h-[420px]">
              <RefVisual
                crop="droplet-glow"
                alt="Интерьер и атмосфера клиники Skin Clean"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Certified Equipment Showroom */}
        <div className="space-y-8">
          <div>
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8C8074] font-medium block mb-2">
              Аппаратный парк
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl text-[#1C1917] font-semibold">
              Золотые стандарты мировой аппаратной косметологии
            </h2>
            <p className="text-sm sm:text-base text-[#5A5046] max-w-2xl mt-2 leading-relaxed">
              Мы инвестируем исключительно в оригинальные медицинские платформы от признанных мировых лидеров США, Израиля и Южной Кореи.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {equipmentList.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 bg-white border border-[#EBE3D7] rounded-2xl shadow-xs space-y-3.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-sans text-lg sm:text-xl text-[#1C1917] font-semibold">
                    {item.name}
                  </h3>
                  <span className="text-xs font-mono uppercase bg-[#F3EEE6] text-[#6C6055] px-2.5 py-1 rounded-md shrink-0 font-medium">
                    {item.maker}
                  </span>
                </div>
                <div className="text-sm text-[#483F37] leading-relaxed">
                  <span className="font-semibold text-[#1C1917]">Технология:</span> {item.tech}
                </div>
                <div className="text-sm text-[#5C5249] leading-relaxed">
                  <span className="font-semibold text-[#1C1917]">Назначение:</span> {item.purpose}
                </div>
                <div className="pt-3 border-t border-[#F0EAE1] flex items-center gap-2 text-xs sm:text-sm text-[#A67E48] font-medium">
                  <CheckIcon size={16} />
                  <span>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>



        {/* Medical License & Verification */}
        <div className="p-8 sm:p-10 bg-[#FAF7F2] border border-[#E8DEC8] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-[#A67E48]">
              <ShieldCheckIcon size={22} />
              <span className="text-xs sm:text-sm uppercase tracking-wider font-semibold">Официальная медицинская деятельность</span>
            </div>
            <h3 className="font-sans text-2xl sm:text-3xl text-[#1C1917] font-semibold">
              Медицинская лицензия {clinicInfo.licenseNumber}
            </h3>
            <p className="text-sm text-[#5C5248] leading-relaxed">
              Выдана {clinicInfo.licenseDate} {clinicInfo.licenseIssuer}. Вы можете ознакомиться с оригиналами документов в клиентской зоне клиники.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 bg-[#1C1917] text-white text-xs sm:text-sm uppercase tracking-wider font-medium rounded-full shrink-0 shadow-sm hover:bg-[#342D27] transition-all cursor-pointer"
          >
            Записаться на первичный приём
          </button>
        </div>
      </div>
    </div>
  );
};
