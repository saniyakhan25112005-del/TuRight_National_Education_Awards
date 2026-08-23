import React, { useState, useEffect } from 'react';
import { TuRightLogo } from './TuRightLogo';
import { 
  Menu, 
  X, 
  Sparkles, 
  Award, 
  ArrowRight, 
  PhoneCall, 
  HelpCircle,
  FileCheck2,
  Calendar
} from 'lucide-react';

interface NavbarProps {
  onOpenNomination: (preselectedCategory?: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNomination, activeSection = 'home' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Categories', href: '#categories', id: 'categories' },
    { label: 'Eligibility', href: '#eligibility', id: 'eligibility' },
    { label: 'Dates', href: '#dates', id: 'dates' },
    { label: 'Winners', href: '#winners', id: 'winners' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0C10]/95 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/60 py-2.5'
          : 'bg-gradient-to-b from-[#0B0C10] via-[#0B0C10]/80 to-transparent py-4'
      }`}
    >
      {/* Top micro-banner */}
      <div className="hidden lg:block border-b border-white/5 pb-1.5 mb-2 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[#F37021] font-semibold">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Nominations Open for 2026 National Edition
            </span>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-1 text-zinc-400">
              <Calendar className="w-3 h-3 text-[#F37021]" />
              Submission Deadline: Nov 15, 2026
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a href="tel:+919876543210" className="hover:text-white flex items-center gap-1 transition-colors">
              <PhoneCall className="w-3 h-3 text-[#F37021]" />
              Helpline: +91 98765 43210
            </a>
            <span className="text-zinc-600">|</span>
            <a href="#faq" className="hover:text-white flex items-center gap-1 transition-colors">
              <HelpCircle className="w-3 h-3 text-zinc-400" />
              Guidelines & FAQ
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo with official branding */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="TuRight National Education Awards Homepage"
          >
            <TuRightLogo size="sm" showSubtitle subtitleText="Education Awards" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-[#F37021] bg-[#F37021]/10 font-semibold'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenNomination()}
              className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#F37021] to-[#FF8C38] px-5 py-2 text-xs md:text-sm font-bold text-white shadow-lg shadow-[#F37021]/25 hover:shadow-[#F37021]/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Nominate Now</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => onOpenNomination()}
              className="sm:hidden px-3 py-1.5 rounded-lg bg-[#F37021] text-xs font-bold text-white"
            >
              Nominate
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#10121A] border-b border-white/10 px-4 pt-3 pb-6 mt-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-zinc-600 text-xs">→</span>
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenNomination();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F37021] to-[#FF8C38] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#F37021]/30"
            >
              <Award className="w-4 h-4" />
              Submit Official Nomination
            </button>
            <div className="text-center text-xs text-zinc-400 mt-2">
              Helpline: +91 98765 43210 • awards@turight.org
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
