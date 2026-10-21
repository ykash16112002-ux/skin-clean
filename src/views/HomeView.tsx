import React from 'react';
import { HeroReference } from '../components/HeroReference.tsx';
import { PhilosophySection } from '../components/PhilosophySection.tsx';
import { DirectionsSection } from '../components/DirectionsSection.tsx';
import { SpecialOfferSection } from '../components/SpecialOfferSection.tsx';
import { SafetyLicensesSection } from '../components/SafetyLicensesSection.tsx';
import { PageId } from '../components/Header.tsx';

interface HomeViewProps {
  onOpenBooking: () => void;
  onBookDoctor: (doctorId: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onNavigate: (page: PageId) => void;
  onOpenPhotoManager: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onOpenBooking,
  onBookDoctor,
  onSelectCategory,
  onNavigate,
  onOpenPhotoManager,
}) => {
  return (
    <div className="w-full">
      {/* 1. Hero Screen strictly matching the user's reference */}
      <HeroReference
        onOpenBooking={onOpenBooking}
        onOpenPhotoManager={onOpenPhotoManager}
        onExploreDirections={() => {
          const el = document.getElementById('directions-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Philosophy & Approach Section matching reference */}
      <PhilosophySection />

      {/* 3. Directions Bento Grid Section matching reference */}
      <div id="directions-section">
        <DirectionsSection
          onSelectCategory={onSelectCategory}
          onNavigate={onNavigate}
        />
      </div>

      {/* 4. Consultation & Special Offer Section matching reference */}
      <SpecialOfferSection onOpenBooking={onOpenBooking} />

      {/* 6. Medical Safety & Licenses */}
      <SafetyLicensesSection />
    </div>
  );
};
