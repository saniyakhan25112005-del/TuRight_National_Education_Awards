import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Sparkles, 
  ZoomIn, 
  X, 
  Camera, 
  Filter,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/awardsData';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ceremony' | 'winners' | 'keynote' | 'campus'>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filters = [
    { id: 'all', label: 'All Photos' },
    { id: 'ceremony', label: 'Award Ceremonies' },
    { id: 'winners', label: 'Trophy Presentations' },
    { id: 'keynote', label: 'Academic Conclaves' },
    { id: 'campus', label: 'Classrooms & Labs' },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => 
        prev! === 0 ? filteredItems.length - 1 : prev! - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => 
        prev! === filteredItems.length - 1 ? 0 : prev! + 1
      );
    }
  };

  const currentLightboxItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <section id="gallery" className="py-24 relative bg-[#0E1017] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#F37021]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F37021]/10 border border-[#F37021]/30 text-[#F37021] text-xs font-bold uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5" />
            <span>Moments & Highlights</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            Glimpses of National <br className="hidden sm:inline" />
            <span className="text-gradient-orange">Education Conclaves</span>
          </h2>

          <p className="text-base text-zinc-300 leading-relaxed">
            Capturing the energy, prestige, and pride of national award ceremonies, visionary keynote discussions, and transformative classrooms.
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
                  ? 'bg-[#F37021] text-white shadow-lg shadow-[#F37021]/20 font-bold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(idx)}
              className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 aspect-[4/3] cursor-pointer shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#F37021]/50"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F37021] flex items-center gap-1 mb-1">
                  <Sparkles className="w-3 h-3" />
                  {item.year} Edition
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-white font-display line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[11px] text-zinc-300 line-clamp-1 mt-0.5">
                  {item.caption}
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-400 pt-1 border-t border-white/10">
                  <span>Click to expand</span>
                  <ZoomIn className="w-3.5 h-3.5 text-[#F37021]" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {currentLightboxItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
            aria-label="Close image lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#F37021] text-white border border-white/15 transition-colors cursor-pointer z-50"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#F37021] text-white border border-white/15 transition-colors cursor-pointer z-50"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            className="relative max-w-4xl w-full bg-zinc-950 border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-black max-h-[70vh]">
              <img
                src={currentLightboxItem.imageUrl}
                alt={currentLightboxItem.title}
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="p-5 bg-zinc-900 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F37021]/20 text-[#F37021] border border-[#F37021]/30 uppercase">
                    {currentLightboxItem.category}
                  </span>
                  <span className="text-xs text-zinc-400">{currentLightboxItem.year} Edition</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white font-display mt-1">
                  {currentLightboxItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-0.5">
                  {currentLightboxItem.caption}
                </p>
              </div>

              <div className="text-xs text-zinc-500 whitespace-nowrap">
                Photo {activeLightboxIndex! + 1} of {filteredItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
