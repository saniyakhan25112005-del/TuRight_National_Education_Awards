import React, { useState } from 'react';
import { 
  Trophy, 
  Sparkles, 
  MapPin, 
  Quote, 
  ExternalLink, 
  X,
  Award,
  GraduationCap,
  Calendar,
  Building
} from 'lucide-react';
import { PREVIOUS_WINNERS } from '../data/awardsData';
import { Winner } from '../types';
import { TuRightLogo } from './TuRightLogo';

export const WinnersSection: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedWinnerModal, setSelectedWinnerModal] = useState<Winner | null>(null);

  const years = ['all', '2025', '2024'];

  const filteredWinners = PREVIOUS_WINNERS.filter(w => {
    if (selectedYear === 'all') return true;
    return w.year === selectedYear;
  });

  return (
    <section id="winners" className="py-24 relative bg-[#0B0C10] overflow-hidden">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F37021]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5" />
            <span>Hall of Fame & Honorees</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            Past Laureates & <br className="hidden sm:inline" />
            <span className="text-gradient-gold">National Award Winners</span>
          </h2>

          <p className="text-base text-zinc-300 leading-relaxed">
            Discover the groundbreaking educators and institutions honored in preceding editions for redefining pedagogy, governance, and educational equity.
          </p>

          <div className="text-xs text-zinc-400 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-lg inline-block">
            🏆 <span className="text-zinc-200 font-semibold">Laureate Archive:</span> Displaying verified national awardees. Updated after each national conclave.
          </div>
        </div>

        {/* Year Filter Tabs */}
        <div className="flex justify-center items-center gap-2 mb-12">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedYear === year
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              {year === 'all' ? 'All Honorees' : `${year} Laureates`}
            </button>
          ))}
        </div>

        {/* Winners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWinners.map((winner) => (
            <div
              key={winner.id}
              className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10 flex flex-col justify-between group cursor-pointer transition-all duration-300"
              onClick={() => setSelectedWinnerModal(winner)}
            >
              <div className="space-y-4">
                {/* Image and Year Badge */}
                <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-zinc-900 border border-white/10">
                  <img
                    src={winner.avatarUrl}
                    alt={winner.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-amber-300 border border-amber-400/30 flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-amber-400" />
                    <span>{winner.year} Winner</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md p-2 rounded-lg text-xs font-semibold text-white border border-white/10 flex items-center justify-between">
                    <span className="truncate">{winner.category}</span>
                    <span className="text-[#F37021] text-[10px] font-bold uppercase">{winner.state}</span>
                  </div>
                </div>

                {/* Name & Institution */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors font-display">
                    {winner.name}
                  </h3>
                  <p className="text-xs text-[#F37021] font-medium mt-0.5">
                    {winner.designation}
                  </p>
                  <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1">
                    <Building className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="truncate">{winner.institution}</span>
                  </p>
                </div>

                {/* Achievement snippet */}
                <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                  {winner.achievement}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {winner.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] font-medium text-zinc-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-4">
                <span className="text-xs text-zinc-400 italic line-clamp-1 max-w-[200px]">
                  "{winner.quote}"
                </span>
                <span className="text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                  Citation ➔
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Winner Full Citation Modal */}
      {selectedWinnerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-2xl bg-[#12141D] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top gold line */}
            <div className="h-2 bg-gradient-to-r from-amber-400 via-[#F37021] to-amber-400" />

            <button
              onClick={() => setSelectedWinnerModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <img
                  src={selectedWinnerModal.avatarUrl}
                  alt={selectedWinnerModal.name}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-400/40 shadow-xl"
                />
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 text-xs font-bold">
                    <Trophy className="w-3 h-3" />
                    <span>{selectedWinnerModal.year} National Honoree</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    {selectedWinnerModal.name}
                  </h3>
                  <p className="text-xs text-[#F37021] font-semibold">
                    {selectedWinnerModal.designation} • {selectedWinnerModal.institution}
                  </p>
                  <p className="text-xs text-zinc-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-500" />
                    <span>{selectedWinnerModal.state}</span>
                  </p>
                </div>
              </div>

              {/* Award Category Tag */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 font-semibold flex items-center justify-between">
                <span>Award Category: {selectedWinnerModal.category}</span>
                <TuRightLogo size="sm" />
              </div>

              {/* Citation & Achievement */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Official Jury Citation & Impact
                </h4>
                <p className="text-sm text-zinc-200 leading-relaxed bg-zinc-900/80 p-4 rounded-xl border border-white/5">
                  {selectedWinnerModal.achievement}
                </p>
              </div>

              {/* Winner Quote */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Laureate's Statement
                </h4>
                <blockquote className="text-xs sm:text-sm text-zinc-300 italic p-4 rounded-xl bg-white/5 border border-white/5 relative">
                  <Quote className="w-6 h-6 text-[#F37021]/30 absolute top-2 right-2" />
                  "{selectedWinnerModal.quote}"
                </blockquote>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedWinnerModal(null)}
                  className="px-6 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold cursor-pointer"
                >
                  Close Citation
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
