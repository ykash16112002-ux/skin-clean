import React, { useState } from 'react';
import { MenuIcon, CloseIcon, PhoneIcon, CameraIcon } from './Icons.tsx';
import { clinicInfo } from '../data/clinicData.ts';

export type PageId = 'home' | 'services' | 'about' | 'journal' | 'contacts';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
  onOpenPhotoManager: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
  onOpenPhotoManager,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Главная' },
    { id: 'services', label: 'Услуги и цены' },
    { id: 'about', label: 'О клинике' },
    { id: 'journal', label: 'Блог' },
    { id: 'contacts', label: 'Контакты' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#EBE3D7]/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (SKIN in caps, clean in script) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 group cursor-pointer text-left whitespace-nowrap shrink-0"
          aria-label="Skin Clean — главная страница"
        >
          <span className="font-sans font-light tracking-[0.25em] text-2xl sm:text-3xl text-[#1C1917] uppercase">
            SKIN
          </span>
          <span className="w-5 sm:w-6 h-[1.5px] bg-[#1C1917] inline-block transition-transform duration-300 group-hover:w-8" />
          <span className="font-script italic font-normal tracking-wide text-3xl sm:text-4xl text-[#1C1917] lowercase">
            clean
          </span>
        </button>

        {/* Zone 2: Navigation Links (scaled up to text-sm/14px for clear readability) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wider uppercase text-[#4A423A]">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors py-1 cursor-pointer whitespace-nowrap shrink-0 relative ${
                  isActive
                    ? 'text-[#1C1917] font-semibold'
                    : 'hover:text-[#1C1917]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C1917]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action + Photo Manager Trigger */}
        <div className="hidden sm:flex items-center gap-3.5 shrink-0">
          <button
            onClick={onOpenPhotoManager}
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#3E362F] hover:text-[#1C1917] border border-[#DDD3C4] hover:border-[#1C1917] rounded-full transition-all cursor-pointer whitespace-nowrap bg-white/50"
            title="Загрузить свои фотографии в любые блоки сайта"
          >
            <CameraIcon size={16} className="text-[#A67E48]" />
            <span>Загрузить свои фото</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 sm:py-3 bg-[#1C1917] hover:bg-[#322B25] text-[#FBF9F5] text-xs sm:text-sm font-medium tracking-wider uppercase rounded-full transition-all shadow-xs cursor-pointer whitespace-nowrap shrink-0"
          >
            Записаться на прием
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenPhotoManager}
            className="p-2 border border-[#DDD3C4] rounded-full text-[#1C1917] bg-white"
            title="Загрузить свои фото"
          >
            <CameraIcon size={18} />
          </button>
          <button
            onClick={onOpenBooking}
            className="px-3.5 py-2 bg-[#1C1917] text-[#FBF9F5] text-xs font-medium tracking-wide uppercase rounded-full"
          >
            Запись
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1C1917] rounded-lg hover:bg-[#F3EEE6]"
            aria-label="Открыть главное меню"
          >
            {mobileMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#EBE3D7] bg-[#FAF7F2] px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2 text-base uppercase tracking-wider ${
                  currentPage === item.id ? 'font-semibold text-[#1C1917]' : 'text-[#5C5248]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#E8DFC8] flex flex-col gap-3">
            <a
              href={`tel:${clinicInfo.phone}`}
              className="text-sm font-mono text-[#1C1917] flex items-center gap-2"
            >
              <PhoneIcon size={16} />
              <span>{clinicInfo.phoneDisplay}</span>
            </a>
            <div className="text-xs text-[#7A6E63]">{clinicInfo.workingHours}</div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 bg-[#1C1917] text-[#FBF9F5] text-sm uppercase tracking-wider font-medium rounded-full"
            >
              Записаться на приём онлайн
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
