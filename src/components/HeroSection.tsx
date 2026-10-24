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
  Users,
  Clock,
  AlertCircle
} from 'lucide-react';
import { TuRightLogo } from './TuRightLogo';
import { AWARDS_METADATA, STATS_HIGHLIGHTS } from '../data/awardsData';

interface HeroSectionProps {
  onOpenNomination: () => void;
  onExploreAwards: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenNomination, onExploreAwards }) => {
  // Countdown Timer State targeting October 31, 2026 at 11:59 PM IST (UTC+5:30)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isNominationsClosed, setIsNominationsClosed] = useState(false);

  useEffect(() => {
    // Exact deadline: October 31, 2026, at 11:59:59 PM IST
    const target = new Date("2026-10-31T23:59:59+05:30").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsNominationsClosed(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsNominationsClosed(false);
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-[85vh] pt-24 pb-20 flex flex-col justify-center overflow-hidden border-t border-white/10">
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
            
            {/* Main Headline Block */}
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <TuRightLogo size="md" />
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-display leading-[1.14]">
                  TuRight National Education Awards
                </h1>
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F37021] via-amber-400 to-[#F37021] font-display tracking-wide">
                  8th Edition | 2026
                </div>
              </div>

              <p className="text-base sm:text-xl text-zinc-300 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed pt-1">
                Recognizing Excellence in Education Across India
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              India's premier recognition platform celebrating outstanding educators, pioneering academic institutions, researchers, and visionary leaders shaping the future of education across India.
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
            <div className="relative glass-panel rounded-2xl p-6 sm:p-8 border border-white/15 shadow-2xl overflow-hidden bg-[#10121A]/90">
              {/* Card top banner */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F37021] via-amber-400 to-[#F37021]" />
              
              {/* Card Content */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="space-y-0.5">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-[#F37021] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      8th Edition – 2026
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                      Nomination Portal Closes In
                    </h3>
                  </div>
                  {isNominationsClosed ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-500/20 text-red-400 border border-red-500/40">
                      Closed
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Active
                    </span>
                  )}
                </div>

                {/* Countdown Display or "Nominations Closed" state */}
                {isNominationsClosed ? (
                  <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-center space-y-2">
                    <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
                    <h4 className="text-lg font-black text-red-300 font-display">
                      Nominations Closed
                    </h4>
                    <p className="text-xs text-zinc-400">
                      The official nomination portal for the 8th Edition closed on October 31, 2026.
                    </p>
                  </div>
                ) : (
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
                )}

                {/* Nomination Deadline Display */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1 text-left">
                  <div className="text-[11px] uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#F37021]" />
                    <span>Nomination Deadline</span>
                  </div>
                  <div className="text-sm sm:text-base font-bold text-amber-300 font-display">
                    October 31, 2026
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-300 font-medium">
                    Time: <span className="font-bold text-amber-300 font-display">11:00 AM to 8:30 PM IST</span>
                  </div>
                </div>

                {/* Separate National Awards Ceremony Announcement */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/15 via-[#0A182E] to-orange-500/10 border border-[#F37021]/40 text-left space-y-2.5 shadow-lg relative overflow-hidden group">
                  <div className="text-xs uppercase font-extrabold text-[#F37021] tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span>National Awards Ceremony</span>
                    </span>
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                      Gala Event
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between text-zinc-200 py-0.5">
                      <span className="font-semibold text-white">Date:</span>
                      <span className="font-medium text-zinc-200">October 30, 2026</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 bg-black/50 px-2.5 py-1.5 rounded-lg border border-amber-400/30 shadow-inner">
                      <span className="font-semibold text-white flex items-center gap-1.5 shrink-0">
                        <Clock className="w-3.5 h-3.5 text-[#F37021]" />
                        <span>Time:</span>
                      </span>
                      <span className="font-bold text-amber-300 tracking-wide font-display text-xs sm:text-sm whitespace-nowrap text-right">
                        11:00 AM to 8:30 PM IST
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Button inside card */}
                <button
                  onClick={onOpenNomination}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F37021] to-[#FA6400] hover:from-[#ff802b] hover:to-[#f37021] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#F37021]/20 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Start Your 8th Edition Nomination</span>
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
