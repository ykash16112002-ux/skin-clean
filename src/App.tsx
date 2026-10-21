/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>();
  const [bookingDoctorId, setBookingDoctorId] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isArtDirectionOpen, setIsArtDirectionOpen] = useState<boolean>(false);
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState<boolean>(false);

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

      {/* Floating Action Button for Instant Photo Customization */}
      <aside aria-label="Быстрые действия" className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsPhotoManagerOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#1C1917] hover:bg-[#342D27] text-white text-xs sm:text-sm font-medium rounded-full shadow-2xl border border-white/20 transition-all hover:scale-105 cursor-pointer backdrop-blur-md"
          title="Загрузить свои фотографии в любые блоки сайта"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#D5B48A] animate-pulse" />
          <span>Загрузить свои фото</span>
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
