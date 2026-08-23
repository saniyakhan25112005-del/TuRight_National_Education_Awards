import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  Sparkles, 
  MessageSquare, 
  Mail, 
  PhoneCall,
  FileQuestion
} from 'lucide-react';
import { FAQ_ITEMS, AWARDS_METADATA } from '../data/awardsData';

export const FaqSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-3']);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General' },
    { id: 'nomination', label: 'Nomination Process' },
    { id: 'eligibility', label: 'Evaluation & Rules' },
    { id: 'dates', label: 'Timelines' },
    { id: 'fees', label: 'Fee Policy' },
  ];

  const toggleAccordion = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="faq" className="py-24 relative bg-[#0E1017] border-t border-white/5 overflow-hidden">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#F37021]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F37021]/10 border border-[#F37021]/30 text-[#F37021] text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            Everything You Need to Know About <br className="hidden sm:inline" />
            <span className="text-gradient-orange">TuRight Education Awards</span>
          </h2>

          <p className="text-base text-zinc-300 leading-relaxed">
            Find prompt answers regarding eligibility, dossier uploads, evaluation timelines, and official policies.
          </p>
        </div>

        {/* Search & Categories Bar */}
        <div className="space-y-4 mb-10">
          <div className="relative">
            <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type your question (e.g. fees, deadline, documents, eligibility)..."
              className="w-full pl-12 pr-4 py-3.5 bg-zinc-900/90 border border-white/15 rounded-2xl text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none focus:border-[#F37021] focus:ring-1 focus:ring-[#F37021] transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#F37021] text-white font-bold shadow-md shadow-[#F37021]/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-zinc-900/90 border-[#F37021]/50 shadow-xl shadow-[#F37021]/5'
                    : 'bg-zinc-900/50 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-bold font-display transition-colors ${
                    isOpen ? 'text-[#F37021]' : 'text-white'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-[#F37021] text-white rotate-180' : 'bg-white/10 text-zinc-300'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-zinc-300 leading-relaxed border-t border-white/5">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 bg-zinc-900/50 rounded-2xl border border-white/10 p-6">
              <FileQuestion className="w-10 h-10 text-zinc-500 mx-auto mb-2" />
              <h4 className="text-base font-bold text-white font-display">No matching questions found</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Have a specific question not listed here? Please contact our support team below.
              </p>
            </div>
          )}
        </div>

        {/* Support Help Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-zinc-900/70 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#F37021]/15 text-[#F37021] flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display">Still have questions?</h4>
              <p className="text-xs text-zinc-400">Our nominations secretariat is here to help you through the process.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-xl bg-[#F37021] hover:bg-[#ff802b] text-white font-bold text-xs shadow-lg shadow-[#F37021]/20 transition-all"
          >
            Contact Awards Desk
          </a>
        </div>

      </div>
    </section>
  );
};
