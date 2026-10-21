import React from 'react';
import { clinicInfo } from '../data/clinicData.ts';
import { PageId } from './Header.tsx';
import { PhoneIcon, MapPinIcon, ClockIcon, ShieldCheckIcon } from './Icons.tsx';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
  onOpenArtDirection: () => void;
  onOpenPhotoManager: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenArtDirection,
  onOpenPhotoManager,
}) => {
  return (
    <footer className="bg-[#1C1917] text-[#EDE7DF] border-t border-[#342E28] pt-16 sm:pt-20 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 pb-14 border-b border-[#342E28]">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-sans font-light tracking-[0.25em] text-2xl sm:text-3xl text-white uppercase">
                SKIN
              </span>
              <span className="w-6 h-[1.5px] bg-white inline-block" />
              <span className="font-script italic font-normal tracking-wide text-3xl sm:text-4xl text-white lowercase">
                clean
              </span>
            </div>
            <p className="text-sm text-[#DDD5CB] leading-relaxed max-w-sm">
              Клиника премиальной эстетической и аппаратной косметологии в центре Москвы. 
              Медицинская безопасность, деликатная гармонизация внешности и естественное сияние здоровой кожи.
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#D8B78A] pt-2">
              <ShieldCheckIcon size={16} />
              <span>Лицензия {clinicInfo.licenseNumber}</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3.5">
            <h4 className="text-xs sm:text-sm uppercase tracking-widest text-[#B5ABA0] font-semibold">
              Разделы клиники
            </h4>
            <ul className="space-y-2.5 text-sm text-[#DDD5CB]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Главная страница
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Услуги и прайс-лист
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  О клинике и стандартах
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Экспертный блог врачей
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contacts')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Контакты и схема проезда
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacts & Schedule */}
          <div className="space-y-3.5">
            <h4 className="text-xs sm:text-sm uppercase tracking-widest text-[#B5ABA0] font-semibold">
              Контакты и визит
            </h4>
            <div className="space-y-3 text-sm text-[#DDD5CB]">
              <div className="flex items-start gap-2.5">
                <MapPinIcon size={16} className="shrink-0 mt-0.5 text-[#D8B78A]" />
                <span>{clinicInfo.address}, {clinicInfo.city} ({clinicInfo.metro})</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ClockIcon size={16} className="shrink-0 text-[#D8B78A]" />
                <span>{clinicInfo.workingHours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneIcon size={16} className="shrink-0 text-[#D8B78A]" />
                <a href={`tel:${clinicInfo.phone}`} className="hover:text-white font-mono font-medium">
                  {clinicInfo.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-3">
              <a
                href={clinicInfo.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-full bg-[#2A241F] hover:bg-[#38312B] text-white text-xs transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={clinicInfo.telegram}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-full bg-[#2A241F] hover:bg-[#38312B] text-white text-xs transition-colors"
              >
                Telegram
              </a>
            </div>
          </div>

          {/* Col 4: Quick Online Booking & Photo Management */}
          <div className="space-y-4">
            <h4 className="text-xs sm:text-sm uppercase tracking-widest text-[#B5ABA0] font-semibold">
              Консьерж-сервис
            </h4>
            <p className="text-sm text-[#B5ABA0] leading-relaxed">
              Забронируйте персональную консультацию с бесплатной 3D-диагностикой кожи.
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full py-3.5 bg-[#FAF8F5] hover:bg-white text-[#1C1917] text-xs sm:text-sm uppercase tracking-wider font-semibold rounded-full transition-all cursor-pointer shadow-xs"
            >
              Записаться на прием
            </button>
            <div className="flex flex-col gap-2 pt-1 text-center">
              <button
                onClick={onOpenPhotoManager}
                className="text-xs sm:text-sm text-[#D8B78A] hover:text-white transition-colors underline cursor-pointer"
              >
                Загрузить свои фото на сайт
              </button>
              <button
                onClick={onOpenArtDirection}
                className="text-xs sm:text-sm text-[#A6998A] hover:text-[#D8B78A] transition-colors underline cursor-pointer"
              >
                Стандарты арт-дирекции и съемки
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-[#8C8074] gap-4">
          <div>
            © {new Date().getFullYear()} Skin Clean Clinic. Медицинская деятельность лицензирована.
          </div>
          <div className="flex items-center gap-4">
            <span>Политика конфиденциальности</span>
            <span>·</span>
            <span>Пользовательское соглашение</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
