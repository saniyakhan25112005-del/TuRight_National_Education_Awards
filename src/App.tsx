/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { CompleteAwardCategoriesTable } from './components/CompleteAwardCategoriesTable';
import { EligibilitySection } from './components/EligibilitySection';
import { NominationSection } from './components/NominationSection';
import { YouTubeSection } from './components/YouTubeSection';
import { GallerySection } from './components/GallerySection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [preselectedCategory, setPreselectedCategory] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleOpenNomination = (categoryId?: string) => {
    if (categoryId) {
      setPreselectedCategory(categoryId);
    }
    const element = document.getElementById('nomination');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = Math.max(0, elementPosition - offset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExploreAwards = () => {
    const element = document.getElementById('categories');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scroll spy to highlight active section in Navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'nomination', 'gallery', 'about', 'categories', 'eligibility', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }

      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#F3F4F6] selection:bg-[#F37021] selection:text-white relative">
      
      {/* Sticky Navigation */}
      <Navbar
        onOpenNomination={handleOpenNomination}
        activeSection={activeSection}
      />

      <main>
        {/* Hero Section - Homepage opens first */}
        <HeroSection
          onOpenNomination={handleOpenNomination}
          onExploreAwards={handleExploreAwards}
        />

        {/* Official Nomination Form Portal - Displayed immediately below Homepage Hero */}
        <NominationSection
          preselectedCategory={preselectedCategory}
          onClearPreselectedCategory={() => setPreselectedCategory('')}
        />

        {/* Photo & Video Gallery */}
        <GallerySection />

        {/* YouTube Section */}
        <YouTubeSection />

        {/* About the Awards */}
        <AboutSection
          onOpenNomination={handleOpenNomination}
        />

        {/* TuRight National Education Awards – Complete Award Categories List (All 220) */}
        <CompleteAwardCategoriesTable
          onOpenNomination={handleOpenNomination}
        />

        {/* Eligibility Criteria & Interactive Checker */}
        <EligibilitySection
          onOpenNomination={handleOpenNomination}
        />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Contact Us */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenNomination={handleOpenNomination} />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/15 shadow-xl transition-all hover:scale-110 cursor-pointer backdrop-blur-sm"
          aria-label="Scroll to top of page"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}
