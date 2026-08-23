import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  Award,
  Linkedin,
  Twitter,
  Youtube,
  Facebook,
  Instagram
} from 'lucide-react';
import { TuRightLogo } from './TuRightLogo';
import { AWARDS_METADATA, AWARD_CATEGORIES } from '../data/awardsData';

interface FooterProps {
  onOpenNomination: (categoryId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenNomination }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07080A] text-zinc-400 border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      
      {/* Top CTA Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-white/10">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border border-[#F37021]/30 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F37021]/20 text-[#F37021] text-xs font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Entries Closing Nov 15, 2026</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
              Ready to Recognize Excellence in Education?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300">
              Nominate an exceptional teacher, revolutionary school, or visionary chancellor today.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenNomination()}
              className="px-8 py-4 rounded-xl bg-[#F37021] hover:bg-[#ff802b] text-white font-bold text-sm shadow-xl shadow-[#F37021]/30 transition-all cursor-pointer flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Submit a Nomination</span>
            </button>
            <a
              href="#about"
              className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/15 transition-all"
            >
              Learn More
            </a>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#home" className="inline-block">
              <TuRightLogo size="md" showSubtitle subtitleText="Education Awards" />
            </a>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              The TuRight National Education Awards is the premier nationwide platform celebrating transformative pedagogy, visionary academic leadership, and groundbreaking institutions shaping the future of learning.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#F37021] text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-white/5"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#F37021] text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-white/5"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#F37021] text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-white/5"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#F37021] text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-white/5"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#F37021] text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-white/5"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-[#F37021] transition-colors">Home Portal</a></li>
              <li><a href="#about" className="hover:text-[#F37021] transition-colors">About the Awards</a></li>
              <li><a href="#categories" className="hover:text-[#F37021] transition-colors">Award Categories</a></li>
              <li><a href="#eligibility" className="hover:text-[#F37021] transition-colors">Eligibility Guide</a></li>
              <li><a href="#dates" className="hover:text-[#F37021] transition-colors">Important Dates</a></li>
              <li><a href="#winners" className="hover:text-[#F37021] transition-colors">Hall of Fame / Winners</a></li>
              <li><a href="#gallery" className="hover:text-[#F37021] transition-colors">Photo Gallery</a></li>
              <li><a href="#faq" className="hover:text-[#F37021] transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Key Award Categories */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Award Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {AWARD_CATEGORIES.slice(0, 5).map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => onOpenNomination(cat.id)}
                    className="hover:text-[#F37021] transition-colors text-left truncate max-w-full cursor-pointer"
                  >
                    {cat.title}
                  </button>
                </li>
              ))}
              <li>
                <a href="#categories" className="text-[#F37021] font-semibold hover:underline">
                  View All 25+ Categories →
                </a>
              </li>
            </ul>
          </div>

          {/* Secretariat Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Awards Secretariat
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2 text-zinc-400">
                <MapPin className="w-4 h-4 text-[#F37021] flex-shrink-0 mt-0.5" />
                <span>{AWARDS_METADATA.address}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Mail className="w-4 h-4 text-[#F37021] flex-shrink-0" />
                <a href={`mailto:${AWARDS_METADATA.contactEmail}`} className="hover:text-white">
                  {AWARDS_METADATA.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Phone className="w-4 h-4 text-[#F37021] flex-shrink-0" />
                <span>{AWARDS_METADATA.contactPhone}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-white/5 cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div className="text-center md:text-left">
          © {new Date().getFullYear()} TuRight® National Education Awards. All rights reserved. Registered trademark of TuRight.
        </div>
        
        <div className="flex items-center gap-6">
          <span className="hover:text-zinc-300 transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-zinc-300 transition-colors cursor-pointer">Terms & Conditions</span>
          <span className="hover:text-zinc-300 transition-colors cursor-pointer">Jury Code of Ethics</span>
        </div>
      </div>

    </footer>
  );
};
