import React, { useState } from 'react';

interface NavbarProps {
  onOpenSubscriptions: () => void;
  onOpenMeeting: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSubscriptions,
  onOpenMeeting,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#506D44] text-[#FAF7F0] px-4 sm:px-6 md:px-10 py-3.5 border-b border-[#435C3A] sticky top-0 z-40 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Left Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-[11px] lg:text-xs font-mono-custom tracking-wider text-[#FAF7F0]/90">
          <button
            onClick={() => onNavigateSection('mission')}
            className="hover:text-white hover:underline transition-colors cursor-pointer uppercase"
          >
            About
          </button>
          <button
            onClick={onOpenSubscriptions}
            className="hover:text-white hover:underline transition-colors cursor-pointer uppercase"
          >
            Subscriptions
          </button>
          <button
            onClick={() => onNavigateSection('community')}
            className="hover:text-white hover:underline transition-colors cursor-pointer uppercase"
          >
            Our Projects
          </button>
        </nav>

        {/* Center Brand Logo */}
        <div className="flex-1 md:flex-none flex justify-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center group cursor-pointer focus:outline-none"
            aria-label="Soul and Soil Composting Home"
          >
            <img
              src="assets/soulsoil/nav_logo_2x.png"
              alt="SOUL AND SOIL COMPOSTING"
              className="h-7 sm:h-8 md:h-9 object-contain filter drop-shadow-sm transition-transform group-hover:scale-105"
            />
          </button>
        </div>

        {/* Right Navigation Links & Login */}
        <div className="hidden md:flex items-center gap-5 text-[11px] lg:text-xs font-mono-custom tracking-wider text-[#FAF7F0]/90">
          <button
            onClick={() => onNavigateSection('how-it-works')}
            className="hover:text-white hover:underline transition-colors cursor-pointer uppercase"
          >
            Get Involved
          </button>
          <button
            onClick={onOpenMeeting}
            className="hover:text-white hover:underline transition-colors cursor-pointer uppercase"
          >
            Contact Us
          </button>
          <button
            onClick={onOpenSubscriptions}
            className="px-4 py-1.5 bg-[#CAD86B] hover:bg-[#D8E677] text-[#263514] font-bold text-[10px] lg:text-xs tracking-wider uppercase rounded-full shadow-xs transition-transform active:scale-95 cursor-pointer"
          >
            Login
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#FAF7F0] focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-3 border-t border-[#435C3A] mt-3 space-y-3 font-mono-custom text-xs uppercase tracking-wider">
          <button
            onClick={() => {
              onNavigateSection('mission');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-1 hover:text-white"
          >
            About
          </button>
          <button
            onClick={() => {
              onOpenSubscriptions();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-1 hover:text-white"
          >
            Subscriptions
          </button>
          <button
            onClick={() => {
              onNavigateSection('community');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-1 hover:text-white"
          >
            Our Projects
          </button>
          <button
            onClick={() => {
              onNavigateSection('how-it-works');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-1 hover:text-white"
          >
            Get Involved
          </button>
          <button
            onClick={() => {
              onOpenMeeting();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-1 hover:text-white"
          >
            Contact Us
          </button>
          <button
            onClick={() => {
              onOpenSubscriptions();
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 py-2.5 bg-[#CAD86B] text-[#263514] font-bold text-center rounded-lg uppercase"
          >
            Login / Subscribe
          </button>
        </div>
      )}
    </header>
  );
};
