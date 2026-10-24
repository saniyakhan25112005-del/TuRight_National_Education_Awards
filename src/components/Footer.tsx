import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp, 
  Linkedin,
  Twitter,
  Youtube,
  Facebook,
  Instagram,
  Clock,
  ArrowRight,
  ShieldCheck,
  X,
  FileText,
  Scale
} from 'lucide-react';
import { TuRightLogo } from './TuRightLogo';

interface FooterProps {
  onOpenNomination: (categoryId?: string) => void;
}

type LegalModalType = 'privacy' | 'terms' | 'ethics' | null;

export const Footer: React.FC<FooterProps> = ({ onOpenNomination }) => {
  const [activeLegalModal, setActiveLegalModal] = useState<LegalModalType>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#home' || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
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

  // Quick navigation items in exact order required
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Nomination', href: '#nomination' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Categories', href: '#categories' },
    { label: 'Eligibility', href: '#eligibility' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  // Authentic key category domains from the 220 official categories
  const keyCategories = [
    { name: 'Teachers & Educators', href: '#categories' },
    { name: 'Lecturers & Faculty Members', href: '#categories' },
    { name: 'Professors & Academic Professionals', href: '#categories' },
    { name: 'Researchers & Research Scholars', href: '#categories' },
    { name: 'Principals & School Leaders', href: '#categories' },
    { name: 'Heads of Departments (HODs)', href: '#categories' },
  ];

  return (
    <footer className="bg-[#07080A] text-zinc-400 border-t border-white/10 relative overflow-hidden">
      
      {/* Decorative top accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#F37021]/40 to-transparent pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* 1. Brand Section */}
          <div className="lg:col-span-4 space-y-5">
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, '#home')}
              className="inline-block focus:outline-none"
            >
              <TuRightLogo size="md" showSubtitle subtitleText="Education Awards" />
            </a>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              The TuRight National Education Awards recognize excellence in education, outstanding educators, innovative academic institutions, researchers, and visionary leaders across India.
            </p>
            
            {/* Social Media Icons with official page links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://youtube.com/@TuRight"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#F37021] text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-white/5 hover:scale-105"
                aria-label="YouTube"
                title="TuRight on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/turight"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#F37021] text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-white/5 hover:scale-105"
                aria-label="LinkedIn"
                title="TuRight on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/TuRight"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#F37021] text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-white/5 hover:scale-105"
                aria-label="Twitter / X"
                title="TuRight on Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/turight"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#F37021] text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-white/5 hover:scale-105"
                aria-label="Instagram"
                title="TuRight on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/TuRight"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#F37021] text-zinc-400 hover:text-white flex items-center justify-center transition-all border border-white/5 hover:scale-105"
                aria-label="Facebook"
                title="TuRight on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. Quick Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-display">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href} 
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-zinc-400 hover:text-[#F37021] transition-colors inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Award Categories */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-display">
              AWARD CATEGORIES
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {keyCategories.map((cat) => (
                <li key={cat.name}>
                  <a
                    href={cat.href}
                    onClick={(e) => handleNavClick(e, cat.href)}
                    className="text-zinc-400 hover:text-[#F37021] transition-colors inline-block truncate max-w-full"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
              <li className="pt-1.5">
                <a 
                  href="#categories" 
                  onClick={(e) => handleNavClick(e, '#categories')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F37021] hover:text-amber-400 transition-colors group"
                >
                  <span>View All 220 Categories</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Awards Secretariat */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-display">
              Awards Secretariat
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm">
              {/* Location */}
              <div className="flex items-start gap-2.5 text-zinc-400">
                <MapPin className="w-4 h-4 text-[#F37021] flex-shrink-0 mt-0.5" />
                <span>Mysuru, Karnataka, India</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5 text-zinc-400">
                <Mail className="w-4 h-4 text-[#F37021] flex-shrink-0" />
                <a 
                  href="mailto:turighttechnologies@gmail.com" 
                  className="hover:text-white transition-colors break-all"
                >
                  turighttechnologies@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5 text-zinc-400">
                <Phone className="w-4 h-4 text-[#F37021] flex-shrink-0" />
                <a 
                  href="tel:+919880176095" 
                  className="hover:text-white font-medium text-amber-300 hover:text-white transition-colors"
                >
                  +91 98801 76095
                </a>
              </div>

              {/* Office Hours */}
              <div className="flex items-center gap-2.5 text-zinc-400 pt-0.5">
                <Clock className="w-4 h-4 text-[#F37021] flex-shrink-0" />
                <span>
                  <strong className="text-zinc-200 font-semibold">Office Hours:</strong> 11:00 AM to 8:30 PM IST
                </span>
              </div>
            </div>

            {/* Back to Top */}
            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-white/5 hover:border-white/15 transition-all cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#F37021]" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 6. Copyright and Legal Links */}
      <div className="border-t border-white/10 bg-[#050608]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="text-center md:text-left text-zinc-400">
            © 2026 TuRight® National Education Awards. All rights reserved. Registered trademark of TuRight.
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-[#F37021] transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-[#F37021] transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              Terms & Conditions
            </button>
            <button
              type="button"
              onClick={() => setActiveLegalModal('ethics')}
              className="hover:text-[#F37021] transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              Jury Code of Ethics
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Working Legal Modal */}
      {activeLegalModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setActiveLegalModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-[#0F1422] border border-white/15 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                {activeLegalModal === 'privacy' && <ShieldCheck className="w-5 h-5 text-[#F37021]" />}
                {activeLegalModal === 'terms' && <FileText className="w-5 h-5 text-[#F37021]" />}
                {activeLegalModal === 'ethics' && <Scale className="w-5 h-5 text-amber-400" />}
                <h3 className="text-lg font-bold text-white font-display">
                  {activeLegalModal === 'privacy' && 'Privacy Policy'}
                  {activeLegalModal === 'terms' && 'Terms & Conditions'}
                  {activeLegalModal === 'ethics' && 'Jury Code of Ethics'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="text-xs sm:text-sm text-zinc-300 space-y-4 leading-relaxed">
              {activeLegalModal === 'privacy' && (
                <>
                  <p>
                    <strong>TuRight® National Education Awards 2026</strong> is committed to safeguarding the privacy and confidentiality of all applicants, nominators, and educational institutions.
                  </p>
                  <h4 className="font-bold text-white pt-1">1. Information Collection & Storage</h4>
                  <p>
                    Nomination data including applicant names, verified email addresses, mobile numbers, institutional affiliations, designations, and uploaded curriculum vitae (CVs) are stored securely in cloud Firestore infrastructure with strict security rules.
                  </p>
                  <h4 className="font-bold text-white pt-1">2. Purpose of Use</h4>
                  <p>
                    Collected details are utilized exclusively for identity verification, eligibility screening, jury evaluation, application status correspondence, and ceremony invitation dispatch. We do not sell, rent, or trade your data to third parties.
                  </p>
                  <h4 className="font-bold text-white pt-1">3. Data Security & Retention</h4>
                  <p>
                    All submissions are processed under industry-standard TLS encryption. Records are retained through the conclusion of the 8th Edition ceremony and audit cycle.
                  </p>
                  <p className="text-xs text-zinc-400 pt-2 border-t border-white/10">
                    For inquiries, contact the Secretariat at <a href="mailto:turighttechnologies@gmail.com" className="text-[#F37021] underline">turighttechnologies@gmail.com</a> or call <a href="tel:+919880176095" className="text-amber-300 font-bold">+91 98801 76095</a>.
                  </p>
                </>
              )}

              {activeLegalModal === 'terms' && (
                <>
                  <p>
                    By submitting a nomination for the <strong>TuRight® National Education Awards (8th Edition, 2026)</strong>, applicants agree to the following terms and guidelines:
                  </p>
                  <h4 className="font-bold text-white pt-1">1. Eligibility & Authenticity</h4>
                  <p>
                    Nominations are open to educators, lecturers, professors, researchers, school heads, deans, and institutional leaders. All credentials, accomplishments, and uploaded CV files must be genuine and verifiable upon request by the academic audit desk.
                  </p>
                  <h4 className="font-bold text-white pt-1">2. Nomination Deadline</h4>
                  <p>
                    All online nominations must be submitted before <strong>October 31, 2026, at 11:59 PM IST</strong>. Late or incomplete submissions will not be admitted for jury assessment.
                  </p>
                  <h4 className="font-bold text-white pt-1">3. Non-Commercial Merit Selection</h4>
                  <p>
                    There are no mandatory nomination filing fees. Winners are selected solely on merit, qualitative impact, student outcomes, research credentials, and verified pedagogical contributions.
                  </p>
                  <h4 className="font-bold text-white pt-1">4. National Awards Ceremony</h4>
                  <p>
                    The awards ceremony will take place from <strong>11:00 AM to 8:30 PM IST</strong> on October 30, 2026. Finalists and award recipients will receive official notification and ceremony passes.
                  </p>
                </>
              )}

              {activeLegalModal === 'ethics' && (
                <>
                  <p>
                    The <strong>TuRight Academic Council and National Jury Panel</strong> operates under an uncompromising standard of academic integrity, impartiality, and transparency:
                  </p>
                  <h4 className="font-bold text-white pt-1">1. Independent Blind Review</h4>
                  <p>
                    Evaluation is conducted across multi-stage assessment matrices without bias regarding geographical location, gender, or institutional size.
                  </p>
                  <h4 className="font-bold text-white pt-1">2. Conflict of Interest Declaration</h4>
                  <p>
                    Jury members must recuse themselves from scoring candidates belonging to their current home institutions, direct research collaborators, or immediate relatives.
                  </p>
                  <h4 className="font-bold text-white pt-1">3. Finality of Jury Determinations</h4>
                  <p>
                    The decisions of the National Grand Jury and Verification Board are final and binding in all categories across the 220 official award domains.
                  </p>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="px-5 py-2 rounded-xl bg-[#F37021] hover:bg-[#ff802b] text-white text-xs font-bold transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
