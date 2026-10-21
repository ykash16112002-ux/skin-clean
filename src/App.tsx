/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, PageId } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { HomeView } from './views/HomeView.tsx';
import { ServicesView } from './views/ServicesView.tsx';
import { AboutView } from './views/AboutView.tsx';
import { JournalView } from './views/JournalView.tsx';
import { ContactsView } from './views/ContactsView.tsx';
import { BookingModal } from './components/BookingModal.tsx';
import { ArtDirectionModal } from './components/ArtDirectionModal.tsx';
import { PhotoManagerModal } from './components/PhotoManagerModal.tsx';
import { getCustomPhotosList, syncCustomPhotosToGitHub } from './utils/githubSync.ts';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>();
  const [bookingDoctorId, setBookingDoctorId] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isArtDirectionOpen, setIsArtDirectionOpen] = useState<boolean>(false);
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState<boolean>(false);
  const [customPhotosCount, setCustomPhotosCount] = useState<number>(0);
  const [syncState, setSyncState] = useState<{
    isSyncing: boolean;
    message: string | null;
    success?: boolean;
  }>({ isSyncing: false, message: null });

  useEffect(() => {
    const updateCount = () => {
      setCustomPhotosCount(getCustomPhotosList().length);
    };
    updateCount();
    window.addEventListener('skinclean_image_updated', updateCount);
    return () => window.removeEventListener('skinclean_image_updated', updateCount);
  }, []);

  const triggerSync = async () => {
    setSyncState({ isSyncing: true, message: 'Сохранение ваших четких фото в GitHub...' });
    const res = await syncCustomPhotosToGitHub((progress) => {
      setSyncState({ isSyncing: true, message: progress.message });
    });
    if (res.success) {
      setSyncState({
        isSyncing: false,
        message: `✅ Успешно! ${res.count} фото сохранены в GitHub. На ноутбуке парня обновите страницу — там теперь четкие фото!`,
        success: true,
      });
    } else {
      setSyncState({
        isSyncing: false,
        message: `Ошибка: ${res.error || 'Не удалось сохранить'}`,
        success: false,
      });
    }
  };

  const handleOpenBooking = (serviceId?: string, doctorId?: string) => {
    setBookingServiceId(serviceId);
    setBookingDoctorId(doctorId);
    setIsBookingOpen(true);
  };

  const handleBookDoctor = (doctorId: string) => {
    setBookingDoctorId(doctorId);
    setBookingServiceId(undefined);
    setIsBookingOpen(true);
  };

  const handleBookService = (serviceId: string) => {
    setBookingServiceId(serviceId);
    setBookingDoctorId(undefined);
    setIsBookingOpen(true);
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917] selection:bg-[#E8DEC8] selection:text-[#1C1917]">
      {/* Top Notification Banner if Custom Photos are on this device */}
      {customPhotosCount > 0 && (
        <div className="bg-[#8C6D46] text-white px-4 py-2.5 text-xs sm:text-sm font-medium flex flex-wrap items-center justify-between gap-3 shadow-md sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-pulse shrink-0" />
            <span>
              {syncState.message ? (
                syncState.message
              ) : (
                <>
                  <strong>На этом ПК обнаружены ваши четкие фото ({customPhotosCount} шт.).</strong> Чтобы они открывались у парня и на всех устройствах:
                </>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!syncState.success && (
              <button
                type="button"
                onClick={triggerSync}
                disabled={syncState.isSyncing}
                className="px-3.5 py-1.5 bg-white text-[#1C1917] hover:bg-stone-100 font-semibold rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {syncState.isSyncing ? 'Сохранение...' : 'Сохранить фото в GitHub'}
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsPhotoManagerOpen(true)}
              className="px-2.5 py-1.5 bg-black/20 hover:bg-black/30 text-white rounded-lg transition-colors cursor-pointer"
            >
              Панель фото
            </button>
          </div>
        </div>
      )}

      {/* Universal Top Bar Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenPhotoManager={() => setIsPhotoManagerOpen(true)}
      />

      {/* Main Multi-Page Routed View */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomeView
            onOpenBooking={() => handleOpenBooking()}
            onBookDoctor={handleBookDoctor}
            onSelectCategory={handleSelectCategory}
            onNavigate={handleNavigate}
            onOpenPhotoManager={() => setIsPhotoManagerOpen(true)}
          />
        )}

        {currentPage === 'services' && (
          <ServicesView
            initialCategoryId={selectedCategory}
            onBookService={handleBookService}
          />
        )}

        {currentPage === 'about' && (
          <AboutView
            onOpenBooking={() => handleOpenBooking()}
            onBookDoctor={handleBookDoctor}
          />
        )}

        {currentPage === 'journal' && (
          <JournalView onOpenBooking={() => handleOpenBooking()} />
        )}

        {currentPage === 'contacts' && (
          <ContactsView onOpenBooking={() => handleOpenBooking()} />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenArtDirection={() => setIsArtDirectionOpen(true)}
        onOpenPhotoManager={() => setIsPhotoManagerOpen(true)}
      />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialServiceId={bookingServiceId}
        initialDoctorId={bookingDoctorId}
      />

      {/* Editorial Art Direction Guidelines Modal */}
      <ArtDirectionModal
        isOpen={isArtDirectionOpen}
        onClose={() => setIsArtDirectionOpen(false)}
      />

      {/* Floating Action Button for Instant Photo Customization & GitHub Sync */}
      <aside aria-label="Быстрые действия" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {customPhotosCount > 0 && (
          <div className="bg-[#FAF4EB] border border-[#D8C7B0] px-3.5 py-1.5 rounded-xl shadow-lg text-[11px] text-[#5A4D41] flex items-center gap-1.5 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
            <span>Нажмите, чтобы фото открылись на других ноутбуках!</span>
          </div>
        )}
        <button
          type="button"
          onClick={() => setIsPhotoManagerOpen(true)}
          className={`flex items-center gap-2.5 px-4 py-3 text-white text-xs sm:text-sm font-medium rounded-full shadow-2xl border transition-all hover:scale-105 cursor-pointer backdrop-blur-md ${
            customPhotosCount > 0
              ? 'bg-[#8C6D46] hover:bg-[#735835] border-[#E2CEB5]/50 ring-2 ring-[#8C6D46]/30'
              : 'bg-[#1C1917] hover:bg-[#342D27] border-white/20'
          }`}
          title="Управление фотографиями клиники и синхронизация с GitHub"
        >
          <span className={`w-2.5 h-2.5 rounded-full ${customPhotosCount > 0 ? 'bg-amber-300 animate-pulse' : 'bg-[#D5B48A]'}`} />
          <span>{customPhotosCount > 0 ? `Сохранить фото в GitHub (${customPhotosCount})` : 'Загрузить свои фото'}</span>
        </button>
      </aside>

      {/* User Custom Photo Manager Modal */}
      <PhotoManagerModal
        isOpen={isPhotoManagerOpen}
        onClose={() => setIsPhotoManagerOpen(false)}
      />
    </div>
  );
}
