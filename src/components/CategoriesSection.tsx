import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Info, 
  Check, 
  GraduationCap, 
  School, 
  Lightbulb, 
  Laptop, 
  HeartHandshake, 
  Building2,
  Filter
} from 'lucide-react';
import { AWARD_CATEGORIES } from '../data/awardsData';
import { AwardCategory, CategoryType } from '../types';
import { CategoryDetailModal } from './CategoryDetailModal';

interface CategoriesSectionProps {
  onOpenNomination: (categoryId?: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onOpenNomination }) => {
  const [selectedType, setSelectedType] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalCategory, setActiveModalCategory] = useState<AwardCategory | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Categories' },
    { id: 'educators', label: 'Educators & Teachers' },
    { id: 'institutions', label: 'Schools & Colleges' },
    { id: 'innovation', label: 'Innovation & Pedagogy' },
    { id: 'leadership', label: 'Education Leadership' },
    { id: 'edtech', label: 'EdTech & Digital' },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return GraduationCap;
      case 'School': return School;
      case 'Sparkles': return Sparkles;
      case 'Award': return Award;
      case 'Lightbulb': return Lightbulb;
      case 'Laptop': return Laptop;
      case 'HeartHandshake': return HeartHandshake;
      case 'Building2': return Building2;
      default: return Award;
    }
  };

  const filteredCategories = useMemo(() => {
    return AWARD_CATEGORIES.filter((cat) => {
      const matchesType = selectedType === 'all' || cat.categoryType === selectedType;
      const matchesSearch = 
        cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.badge?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [selectedType, searchQuery]);

  return (
    <section id="categories" className="py-24 relative bg-[#0B0C10] overflow-hidden">
      {/* Subtle background decorative shapes */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#F37021]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F37021]/10 border border-[#F37021]/30 text-[#F37021] text-xs font-bold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>Award Categories</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            Recognizing Excellence Across <br className="hidden sm:inline" />
            <span className="text-gradient-orange">Every Educational Realm</span>
          </h2>

          <p className="text-base text-zinc-300 leading-relaxed">
            From classroom educators to visionary university directors, our categories are designed to recognize distinct milestones in modern education.
          </p>

          {/* Administrative info badge */}
          <div className="text-xs text-zinc-400 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-lg inline-block">
            📌 <span className="font-semibold text-zinc-200">Category Structure:</span> Structured for seamless administrative customization.
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id as CategoryType)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedType === tab.id
                    ? 'bg-[#F37021] text-white shadow-lg shadow-[#F37021]/20 font-bold'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search award category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-900/90 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F37021] focus:ring-1 focus:ring-[#F37021] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const IconComponent = getIcon(category.iconName);
            return (
              <div
                key={category.id}
                className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10 flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  {/* Top row with icon & badge */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#F37021]/15 border border-[#F37021]/25 flex items-center justify-center text-[#F37021] group-hover:scale-110 group-hover:bg-[#F37021] group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {category.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/5 text-[#F37021] border border-[#F37021]/30">
                        {category.badge}
                      </span>
                    )}
                  </div>

                  {/* Title and description */}
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-100 transition-colors font-display mb-2.5">
                    {category.title}
                  </h3>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                    {category.shortDescription}
                  </p>

                  {/* Key eligibility preview */}
                  <div className="space-y-1.5 py-3 border-t border-white/5 text-xs text-zinc-400">
                    <div className="font-semibold text-zinc-300 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                      <Check className="w-3.5 h-3.5 text-[#F37021]" />
                      Key Eligibility:
                    </div>
                    <p className="line-clamp-2 text-zinc-400 text-xs pl-5">
                      {category.eligibility[0]}
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 mt-4">
                  <button
                    onClick={() => setActiveModalCategory(category)}
                    className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1 transition-colors py-1 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-[#F37021]" />
                    <span>View Criteria</span>
                  </button>

                  <button
                    onClick={() => onOpenNomination(category.id)}
                    className="px-4 py-2 rounded-xl bg-[#F37021]/15 hover:bg-[#F37021] text-[#F37021] hover:text-white border border-[#F37021]/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Nominate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16 bg-zinc-900/50 rounded-2xl border border-white/10 p-8 space-y-3">
            <Filter className="w-10 h-10 text-zinc-500 mx-auto" />
            <h4 className="text-lg font-bold text-white font-display">No Award Categories Found</h4>
            <p className="text-sm text-zinc-400">
              No categories match your search "{searchQuery}". Try searching for terms like "educator", "school", "innovation", or "leadership".
            </p>
            <button
              onClick={() => {
                setSelectedType('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-[#F37021] text-white text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold text-white font-display">
              Need Help Choosing the Right Category?
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400">
              Consult our eligibility guide or reach out to our nominations desk for guidance.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#eligibility"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
            >
              Check Eligibility
            </a>
            <button
              onClick={() => onOpenNomination()}
              className="px-6 py-2.5 rounded-xl bg-[#F37021] hover:bg-[#ff802b] text-white font-bold text-xs shadow-lg shadow-[#F37021]/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Start Nomination</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Category Detail Modal */}
      <CategoryDetailModal
        category={activeModalCategory}
        onClose={() => setActiveModalCategory(null)}
        onNominate={(catId) => onOpenNomination(catId)}
      />
    </section>
  );
};
