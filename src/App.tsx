/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PreHeader } from './components/soulsoil/PreHeader.tsx';
import { Navbar } from './components/soulsoil/Navbar.tsx';
import { HeroSection } from './components/soulsoil/HeroSection.tsx';
import { MissionSection } from './components/soulsoil/MissionSection.tsx';
import { HowItWorksSection } from './components/soulsoil/HowItWorksSection.tsx';
import { TestimonialsSection } from './components/soulsoil/TestimonialsSection.tsx';
import { CommunityGridSection } from './components/soulsoil/CommunityGridSection.tsx';
import { TickerRibbon } from './components/soulsoil/TickerRibbon.tsx';
import { FooterSection } from './components/soulsoil/FooterSection.tsx';
import { MeetingModal } from './components/soulsoil/MeetingModal.tsx';
import { SubscriptionModal } from './components/soulsoil/SubscriptionModal.tsx';
import { QuizModal } from './components/soulsoil/QuizModal.tsx';
import { ReferencePresentationView } from './components/soulsoil/ReferencePresentationView.tsx';
import { PngPreviewModal } from './components/soulsoil/PngPreviewModal.tsx';

export default function App() {
  const [viewMode, setViewMode] = useState<'interactive' | 'reference-frame'>('reference-frame');
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isPngModalOpen, setIsPngModalOpen] = useState(false);

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'interactive' ? 'reference-frame' : 'interactive'));
  };

  return (
    <ReferencePresentationView
      viewMode={viewMode}
      onToggleViewMode={toggleViewMode}
      onOpenPngModal={() => setIsPngModalOpen(true)}
    >
      <div className="w-full flex flex-col font-sans text-[#263514]">
        {/* Top Cultural Micro Bar */}
        <PreHeader />

        {/* Brand Navigation Bar */}
        <Navbar
          onOpenSubscriptions={() => setIsSubscriptionOpen(true)}
          onOpenMeeting={() => setIsMeetingOpen(true)}
          onNavigateSection={handleNavigateSection}
        />

        {/* Hero Section: GROWERS MAKERS DOERS + Cards */}
        <HeroSection />

        {/* Mission Statement: GROWING WIT' A PURPOSE */}
        <MissionSection onOpenMeeting={() => setIsMeetingOpen(true)} />

        {/* 3-Step Process: CHOOSE A PLAN / GET YOUR BIN / SCHEDULE PICKUP */}
        <HowItWorksSection onOpenSubscriptions={() => setIsSubscriptionOpen(true)} />

        {/* Testimonials: WHAT DA' PEOPLE SAYIN'? */}
        <TestimonialsSection />

        {/* 4 Community Grid Photos */}
        <CommunityGridSection />

        {/* Scrolling Cultural Ticker */}
        <TickerRibbon />

        {/* Comprehensive 4-Column Footer */}
        <FooterSection
          onOpenSubscriptions={() => setIsSubscriptionOpen(true)}
          onOpenMeeting={() => setIsMeetingOpen(true)}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onNavigateSection={handleNavigateSection}
        />

        {/* Interactive Action Modals */}
        <MeetingModal
          isOpen={isMeetingOpen}
          onClose={() => setIsMeetingOpen(false)}
        />

        <SubscriptionModal
          isOpen={isSubscriptionOpen}
          onClose={() => setIsSubscriptionOpen(false)}
          onSelectPlan={(_plan) => setIsMeetingOpen(true)}
        />

        <QuizModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          onOpenSubscriptions={() => setIsSubscriptionOpen(true)}
        />

        <PngPreviewModal
          isOpen={isPngModalOpen}
          onClose={() => setIsPngModalOpen(false)}
        />
      </div>
    </ReferencePresentationView>
  );
}
