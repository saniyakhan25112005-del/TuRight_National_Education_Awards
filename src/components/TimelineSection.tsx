import React from 'react';
import { 
  Calendar, 
  Clock, 
  Send, 
  CheckCircle2, 
  Trophy, 
  Sparkles,
  Bell,
  MapPin
} from 'lucide-react';
import { IMPORTANT_DATES, AWARDS_METADATA } from '../data/awardsData';

interface TimelineSectionProps {
  onOpenNomination: () => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ onOpenNomination }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Send': return Send;
      case 'Clock': return Clock;
      case 'CheckCircle2': return CheckCircle2;
      case 'Trophy': return Trophy;
      case 'Sparkles': return Sparkles;
      default: return Calendar;
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent("TuRight National Education Awards 2026 - Gala Ceremony");
    const details = encodeURIComponent("Grand National Gala Ceremony celebrating excellence in education. Organized by TuRight Educational Foundation.");
    const location = encodeURIComponent("Grand Convention Center & National Education Conclave, New Delhi");
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261218T100000Z/20261218T170000Z`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="dates" className="py-24 relative bg-[#0B0C10] overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#F37021]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F37021]/10 border border-[#F37021]/30 text-[#F37021] text-xs font-bold uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" />
            <span>Important Milestones</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            Key Dates & Award <br className="hidden sm:inline" />
            <span className="text-gradient-orange">Roadmap for 2026</span>
          </h2>

          <p className="text-base text-zinc-300 leading-relaxed">
            Mark your calendar with the official milestones of the TuRight National Education Awards 2026 edition.
          </p>

          <div className="text-xs text-zinc-400 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-lg inline-block">
            📅 <span className="text-zinc-200 font-semibold">Schedule Status:</span> Current Phase: Active Nomination Intake until November 15, 2026.
          </div>
        </div>

        {/* Timeline Desktop & Tablet View */}
        <div className="relative mb-16">
          {/* Vertical/Horizontal Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-[#F37021]/20 via-[#F37021] to-[#F37021]/20 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {IMPORTANT_DATES.map((item, idx) => {
              const IconComponent = getIcon(item.iconName);
              const isActive = item.status === 'active';
              const isCompleted = item.status === 'completed';

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl p-5 relative flex flex-col justify-between transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-b from-[#F37021]/20 to-zinc-900 border-2 border-[#F37021] shadow-xl shadow-[#F37021]/15 -translate-y-2'
                      : isCompleted
                      ? 'bg-zinc-900/80 border border-emerald-500/30'
                      : 'bg-zinc-900/60 border border-white/10 opacity-90 hover:opacity-100 hover:border-white/20'
                  }`}
                >
                  {/* Top Status & Phase */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono font-bold text-[#F37021] uppercase tracking-wider">
                        {item.phase}
                      </span>
                      {isActive && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F37021] text-white animate-pulse">
                          Current
                        </span>
                      )}
                      {isCompleted && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                          Completed
                        </span>
                      )}
                      {item.status === 'upcoming' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-zinc-400">
                          Upcoming
                        </span>
                      )}
                    </div>

                    {/* Icon Sphere */}
                    <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center ${
                      isActive
                        ? 'bg-[#F37021] text-white shadow-lg shadow-[#F37021]/30'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-white/5 text-zinc-400'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Date badge */}
                    <div className="text-xs font-bold text-amber-300 font-mono mb-1">
                      {item.date}
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-white font-display mb-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Action link if active */}
                  {isActive && (
                    <div className="mt-4 pt-3 border-t border-white/10">
                      <button
                        onClick={onOpenNomination}
                        className="w-full py-1.5 rounded-lg bg-[#F37021] hover:bg-[#ff802b] text-white font-bold text-xs transition-colors cursor-pointer"
                      >
                        Nominate Now
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Gala Ceremony Spotlight Banner */}
        <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border border-[#F37021]/30 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F37021] to-amber-500 flex items-center justify-center text-white shadow-lg shadow-[#F37021]/30 flex-shrink-0">
              <Trophy className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#F37021]">
                  Grand Finale
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs text-zinc-300 font-medium">December 18, 2026</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                National Education Conclave & Gala Ceremony
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#F37021]" />
                {AWARDS_METADATA.venue}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleAddToCalendar}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-2 border border-white/10 cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-[#F37021]" />
              <span>Add to Google Calendar</span>
            </button>
            <button
              onClick={onOpenNomination}
              className="px-6 py-2.5 rounded-xl bg-[#F37021] hover:bg-[#ff802b] text-white text-xs font-bold shadow-lg shadow-[#F37021]/30 transition-all cursor-pointer"
            >
              Submit Nomination
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
