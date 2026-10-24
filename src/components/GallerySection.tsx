import React, { useState, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  ZoomIn, 
  X, 
  Camera, 
  ChevronLeft, 
  ChevronRight,
  Trophy,
  Award,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/awardsData';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ceremony' | 'winners' | 'keynote' | 'campus'>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filters = [
    { id: 'all', label: 'All Photos & Awards' },
    { id: 'winners', label: 'Award Winners & Trophies' },
    { id: 'ceremony', label: 'Award Ceremonies' },
    { id: 'keynote', label: 'Academic Conclaves' },
    { id: 'campus', label: 'Classrooms & Labs' },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => 
        prev! === 0 ? filteredItems.length - 1 : prev! - 1
      );
    }
  }, [activeLightboxIndex, filteredItems.length]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => 
        prev! === filteredItems.length - 1 ? 0 : prev! + 1
      );
    }
  }, [activeLightboxIndex, filteredItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, handlePrev, handleNext]);

  const currentLightboxItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <section id="gallery" className="py-24 relative bg-[#090D16] border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#F37021]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F37021]/15 to-amber-500/15 border border-[#F37021]/30 text-[#F37021] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>National Excellence Honor Roll</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            Award Winners & Recognition – 2026
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            Honoring distinguished educators, professors, researchers, and academic leaders across India with the prestigious TuRight National Education Awards.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center items-center gap-2 flex-wrap mb-10">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-[#F37021] to-amber-500 text-white shadow-lg shadow-[#F37021]/25 font-bold scale-105'
                  : 'bg-zinc-900/90 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Award Certificates & Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => {
            const isCertificate = item.badge || item.category === 'winners' || item.imageUrl.includes('WhatsApp');
            
            return (
              <div
                key={item.id}
                onClick={() => setActiveLightboxIndex(idx)}
                className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0F172A] to-[#0A0F1D] border border-amber-500/20 hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-[#F37021]/10 flex flex-col cursor-pointer"
              >
                {/* Image Container with guaranteed non-cropping */}
                <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] bg-black/70 flex items-center justify-center p-2.5 overflow-hidden border-b border-white/5">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-contain drop-shadow-md group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Subtle Badge Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/75 backdrop-blur-md text-amber-400 border border-amber-400/30 shadow-md">
                      <Sparkles className="w-2.5 h-2.5" />
                      {item.badge || `${item.year} Edition`}
                    </span>
                  </div>

                  {/* Click to expand hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#F37021] to-amber-500 text-white text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <ZoomIn className="w-4 h-4" />
                      <span>Click to Enlarge</span>
                    </div>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-4 flex-1 flex flex-col justify-between bg-[#0B1322]">
                  <div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#F37021] uppercase tracking-wider mb-1">
                      <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="line-clamp-1">{item.title}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white font-display line-clamp-1">
                      {item.recipient || item.caption}
                    </h3>

                    {item.institution ? (
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                        {item.institution}
                      </p>
                    ) : (
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                        {item.caption}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="text-amber-400/90 font-medium">Verified Awardee</span>
                    <span className="inline-flex items-center gap-1 text-zinc-300 group-hover:text-amber-400 transition-colors font-medium">
                      View <ZoomIn className="w-3 h-3 text-[#F37021]" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {currentLightboxItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white border border-white/20 transition-colors cursor-pointer z-50"
            aria-label="Close image modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-black/70 hover:bg-[#F37021] text-white border border-white/20 transition-all cursor-pointer z-50"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-black/70 hover:bg-[#F37021] text-white border border-white/20 transition-all cursor-pointer z-50"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Card Container */}
          <div 
            className="relative max-w-4xl w-full bg-[#0B1322] border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Preview Area */}
            <div className="relative flex-1 min-h-[50vh] max-h-[72vh] bg-black flex items-center justify-center p-2 sm:p-4 overflow-hidden">
              <img
                src={currentLightboxItem.imageUrl}
                alt={currentLightboxItem.title}
                className="w-auto h-auto max-w-full max-h-[70vh] object-contain rounded-md"
              />
            </div>
            
            {/* Modal Info Footer */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-[#0C1527] to-[#080E1C] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1 pr-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
                    {currentLightboxItem.badge || `${currentLightboxItem.category} • ${currentLightboxItem.year}`}
                  </span>
                  <span className="text-xs text-[#F37021] font-semibold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    {currentLightboxItem.title}
                  </span>
                </div>
                
                <h3 className="text-base sm:text-xl font-bold text-white font-display">
                  {currentLightboxItem.recipient || currentLightboxItem.caption}
                </h3>
                
                {currentLightboxItem.institution && (
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {currentLightboxItem.institution}
                  </p>
                )}
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto text-xs text-zinc-400 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10 shrink-0">
                <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 font-medium">
                  {activeLightboxIndex! + 1} / {filteredItems.length}
                </span>
                <span className="text-[11px] text-zinc-500 mt-1 hidden sm:inline">Use ← → keys</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
