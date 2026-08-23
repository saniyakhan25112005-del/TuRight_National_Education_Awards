/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { CategoriesSection } from './components/CategoriesSection';
import { EligibilitySection } from './components/EligibilitySection';
import { TimelineSection } from './components/TimelineSection';
import { NominationSection } from './components/NominationSection';
import { WinnersSection } from './components/WinnersSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsAndJury } from './components/TestimonialsAndJury';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Award, ArrowUp, Sparkles, MessageCircle } from 'lucide-react';

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
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
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
      const sections = ['home', 'about', 'categories', 'eligibility', 'dates', 'nomination', 'winners', 'gallery', 'faq', 'contact'];
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
        {/* Hero Section */}
        <HeroSection
          onOpenNomination={handleOpenNomination}
          onExploreAwards={handleExploreAwards}
        />

        {/* About the Awards */}
        <AboutSection
          onOpenNomination={handleOpenNomination}
        />

        {/* Award Categories */}
        <CategoriesSection
          onOpenNomination={handleOpenNomination}
        />

        {/* Eligibility Criteria & Interactive Checker */}
        <EligibilitySection
          onOpenNomination={handleOpenNomination}
        />

        {/* Important Dates Timeline */}
        <TimelineSection
          onOpenNomination={handleOpenNomination}
        />

        {/* Official Nomination Form Portal */}
        <NominationSection
          preselectedCategory={preselectedCategory}
          onClearPreselectedCategory={() => setPreselectedCategory('')}
        />

        {/* Previous Winners / Hall of Fame */}
        <WinnersSection />

        {/* Photo & Video Gallery */}
        <GallerySection />

        {/* Testimonials, Jury & Academic Partners */}
        <TestimonialsAndJury />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Contact Us & Map */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenNomination={handleOpenNomination} />

      {/* Floating Action Quick Button on Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/15 shadow-xl transition-all hover:scale-110 cursor-pointer"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={() => handleOpenNomination()}
          className="group flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#F37021] via-[#FA6400] to-[#E65100] text-white font-bold text-xs sm:text-sm shadow-2xl shadow-[#F37021]/40 hover:shadow-[#F37021]/60 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
        >
          <Award className="w-4 h-4 animate-bounce" />
          <span>Nominate 2026</span>
        </button>
      </div>

    </div>
  );
}
