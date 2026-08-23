import React, { useState, useEffect } from 'react';
import { 
  Award, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Calendar, 
  ChevronDown,
  ShieldCheck,
  Trophy,
  Download,
  Users
} from 'lucide-react';
import { TuRightLogo } from './TuRightLogo';
import { AWARDS_METADATA, STATS_HIGHLIGHTS } from '../data/awardsData';

interface HeroSectionProps {
  onOpenNomination: () => void;
  onExploreAwards: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenNomination, onExploreAwards }) => {
  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: 84,
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const target = new Date(AWARDS_METADATA.nominationDeadline).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      {/* Dynamic Background with dark education auditorium and glowing ambiance */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80"
          alt="Auditorium and Education Gala"
          className="w-full h-full object-cover opacity-15 scale-105 transform filter brightness-75 contrast-125"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10]/95 via-[#0B0C10]/85 to-[#0B0C10]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-[#F37021]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Top pill badge with TuRight logo integration */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-[#F37021]/30 shadow-inner text-xs sm:text-sm font-medium text-zinc-300">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F37021] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F37021]"></span>
              </span>
              <span className="text-[#F37021] font-bold tracking-wide uppercase text-[11px]">Official Portal</span>
              <span className="text-zinc-500">|</span>
              <span className="text-zinc-200">2026 National Nominations Now Open</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                <TuRightLogo size="md" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#F37021] font-extrabold bg-[#F37021]/10 px-2.5 py-1 rounded border border-[#F37021]/20">
                  National Awards
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] font-display">
                TuRight National <br className="hidden sm:inline" />
                <span className="text-gradient-orange">Education Awards</span>
              </h1>
              <p className="text-xl sm:text-2xl text-amber-100/90 font-medium tracking-tight font-display pt-1">
                {AWARDS_METADATA.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              India's benchmark recognition platform celebrating exceptional educators, pioneering academic institutions, visionary leadership, and transformative educational innovations creating nationwide impact.
            </p>

            {/* Key Assurance Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-zinc-400 pt-1">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#F37021]" />
                Independent Eminent Jury
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                National Gala & Telecast
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Transparent Blind Scoring
              </span>
            </div>

            {/* Action CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenNomination}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#F37021] via-[#FA6400] to-[#E65100] text-white font-bold text-base shadow-xl shadow-[#F37021]/30 hover:shadow-[#F37021]/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer group"
              >
                <Award className="w-5 h-5" />
                <span>Nominate Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreAwards}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold text-base border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Award Categories</span>
                <ChevronDown className="w-4 h-4 text-[#F37021]" />
              </button>
            </div>

            {/* Quick Kit Download / Guide Link */}
            <div className="pt-2">
              <a
                href="#faq"
                className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-[#F37021] transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#F37021]" />
                <span>Download Official Nomination Prospectus & Criteria Guide (PDF)</span>
              </a>
            </div>
          </div>

          {/* Right Card / Interactive Deadline & Highlight Panel */}
          <div className="lg:col-span-5">
            <div className="relative glass-panel rounded-2xl p-6 sm:p-8 border border-white/15 shadow-2xl overflow-hidden">
              {/* Card top banner */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F37021] via-amber-400 to-[#F37021]" />
              
              {/* Card Content */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F37021]">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>2026 Edition Timeline</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Active Submissions
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Nomination Portal Closes In:
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Deadline: November 15, 2026 • 23:59 IST
                  </p>
                </div>

                {/* Live Countdown Grid */}
                <div className="grid grid-cols-4 gap-2.5 text-center">
                  <div className="bg-black/60 rounded-xl p-3 border border-white/10">
                    <span className="block text-2xl sm:text-3xl font-black text-white font-display">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Days</span>
                  </div>
                  <div className="bg-black/60 rounded-xl p-3 border border-white/10">
                    <span className="block text-2xl sm:text-3xl font-black text-[#F37021] font-display">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Hours</span>
                  </div>
                  <div className="bg-black/60 rounded-xl p-3 border border-white/10">
                    <span className="block text-2xl sm:text-3xl font-black text-white font-display">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Mins</span>
                  </div>
                  <div className="bg-black/60 rounded-xl p-3 border border-white/10">
                    <span className="block text-2xl sm:text-3xl font-black text-amber-400 font-display">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Secs</span>
                  </div>
                </div>

                {/* Key Event Milestones */}
                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#F37021]" />
                      Jury Audit Phase:
                    </span>
                    <span className="font-semibold text-zinc-200">Nov 20 - 30, 2026</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#F37021]" />
                      Finalist Announcement:
                    </span>
                    <span className="font-semibold text-zinc-200">Dec 05, 2026</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1.5">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      Grand National Gala:
                    </span>
                    <span className="font-bold text-amber-300">Dec 18, 2026 (New Delhi)</span>
                  </div>
                </div>

                {/* Quick Action Button inside card */}
                <button
                  onClick={onOpenNomination}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-[#F37021] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 border border-white/15 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-[#F37021] group-hover:text-white" />
                  <span>Start Your Nomination Dossier</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Highlight Stats Bar */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS_HIGHLIGHTS.map((stat, idx) => (
              <div key={idx} className="text-center lg:text-left space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight flex items-center justify-center lg:justify-start gap-1">
                  <span className="text-[#F37021]">{stat.value}</span>
                </div>
                <div className="text-sm font-bold text-zinc-200">{stat.label}</div>
                <div className="text-xs text-zinc-400">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
