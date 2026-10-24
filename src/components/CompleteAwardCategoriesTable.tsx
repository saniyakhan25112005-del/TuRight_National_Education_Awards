import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Search, 
  FileText, 
  ArrowUpRight, 
  Check, 
  Copy, 
  Filter, 
  Sparkles,
  Download,
  ListOrdered
} from 'lucide-react';
import { AWARD_CATEGORIES_220, AwardCategoryItem } from '../data/awardCategories220';

interface CompleteAwardCategoriesTableProps {
  onOpenNomination: (categoryName?: string) => void;
}

export const CompleteAwardCategoriesTable: React.FC<CompleteAwardCategoriesTableProps> = ({
  onOpenNomination
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [copiedSno, setCopiedSno] = useState<number | null>(null);

  // Unique groups from the 220 list in chronological order
  const groups = useMemo(() => {
    const list: string[] = [];
    AWARD_CATEGORIES_220.forEach((item) => {
      if (!list.includes(item.group)) {
        list.push(item.group);
      }
    });
    return list;
  }, []);

  const filteredCategories = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return AWARD_CATEGORIES_220.filter((item) => {
      const matchesGroup = selectedGroup === 'All' || item.group === selectedGroup;
      const matchesSearch = 
        !term || 
        item.name.toLowerCase().includes(term) || 
        item.sno.toString() === term ||
        item.group.toLowerCase().includes(term);
      return matchesGroup && matchesSearch;
    });
  }, [searchTerm, selectedGroup]);

  const handleCopy = (item: AwardCategoryItem) => {
    navigator.clipboard.writeText(item.name);
    setCopiedSno(item.sno);
    setTimeout(() => setCopiedSno(null), 2000);
  };

  const handleNominate = (categoryName: string) => {
    onOpenNomination(categoryName);
  };

  return (
    <section 
      id="categories" 
      className="py-20 bg-gradient-to-b from-[#0B0C10] via-[#0E131F] to-[#0B0C10] relative text-white border-t border-white/5 scroll-mt-20"
    >
      {/* Anchor for links targeting complete-categories */}
      <div id="complete-categories" className="absolute -top-20 pointer-events-none" />
      {/* Background ambient accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-10 w-[400px] h-[300px] bg-orange-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/25 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Official 2026 Category Catalog
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            TuRight National Education Awards – Complete Award Categories List
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            The TuRight National Education Awards recognise excellence in teaching, academic leadership, research, innovation, mentorship, and contributions to education. Below is the complete catalog of all 220 official award categories.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/80 text-xs sm:text-sm text-slate-300">
              <ListOrdered className="w-4 h-4 text-amber-400" />
              <strong className="text-white">220</strong> Total Award Categories
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/80 text-xs sm:text-sm text-slate-300">
              <Award className="w-4 h-4 text-amber-400" />
              <strong className="text-white">13</strong> Academic Domains
            </span>
            <a
              href="/assets/aistudio/Turight_National_Education_Award_List_04a72be0.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-md bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-xs sm:text-sm text-amber-300 hover:text-white hover:bg-amber-500/30 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Download Official PDF
            </a>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-[#111726]/90 border border-white/10 rounded-xl p-4 sm:p-5 mb-8 backdrop-blur-sm shadow-xl">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by category name, serial number (1–220), or domain..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0B0F19] text-white text-sm pl-10 pr-9 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/50 placeholder:text-slate-500 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-800"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Domain Filter Dropdown */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-400 shrink-0 hidden sm:block" />
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                aria-label="Filter by Academic Domain"
                className="bg-[#0B0F19] text-slate-200 text-sm px-3.5 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/50 cursor-pointer min-w-[220px]"
              >
                <option value="All">All Domains (220 Categories)</option>
                {groups.map((grp, idx) => (
                  <option key={grp} value={grp}>
                    {idx + 1}. {grp}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count pill */}
          <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <span>
              Showing <strong className="text-amber-400 font-semibold">{filteredCategories.length}</strong> of 220 categories
              {selectedGroup !== 'All' && <span> in <strong className="text-slate-200">{selectedGroup}</strong></span>}
              {searchTerm && <span> matching "<strong className="text-slate-200">{searchTerm}</strong>"</span>}
            </span>
            {(searchTerm || selectedGroup !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedGroup('All');
                }}
                className="text-amber-400 hover:text-amber-300 underline font-medium"
              >
                Reset filters (Show all 220)
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Responsive Categories Table */}
        <div className="bg-[#0E1424] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto max-h-[750px] overflow-y-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              {/* Sticky Table Header */}
              <thead className="sticky top-0 z-20 bg-[#162036] border-b-2 border-amber-500/40 text-xs sm:text-sm uppercase tracking-wider text-amber-400">
                <tr>
                  <th 
                    scope="col" 
                    className="py-3.5 px-4 sm:px-6 w-20 sm:w-28 text-center font-bold border-r border-white/10"
                  >
                    S. No.
                  </th>
                  <th 
                    scope="col" 
                    className="py-3.5 px-5 sm:px-8 font-bold flex-1"
                  >
                    <div className="flex items-center justify-between">
                      <span>Award Category Name</span>
                      <span className="text-[11px] font-normal normal-case text-slate-400 hidden sm:inline">
                        Click "Nominate" to apply for any category
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Table Body with 220 Categories */}
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="py-12 px-6 text-center text-slate-400">
                      No categories found matching your query.
                      <div className="mt-2">
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setSelectedGroup('All');
                          }}
                          className="text-amber-400 hover:underline text-xs"
                        >
                          Clear search and view all 220 categories
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((cat, index) => {
                    // Check if this is the start of a new group to show subtle domain header
                    const isGroupStart = index === 0 || filteredCategories[index - 1].group !== cat.group;

                    return (
                      <React.Fragment key={cat.sno}>
                        {/* Domain grouping row divider (only shown when not actively searching specific string) */}
                        {isGroupStart && selectedGroup === 'All' && !searchTerm && (
                          <tr className="bg-[#121B30]/90 border-t border-b border-amber-500/20">
                            <td 
                              colSpan={2} 
                              className="py-2.5 px-5 text-xs font-semibold uppercase tracking-wider text-amber-300/90"
                            >
                              <div className="flex items-center gap-2">
                                <Award className="w-3.5 h-3.5 text-amber-400" />
                                <span>{cat.group}</span>
                              </div>
                            </td>
                          </tr>
                        )}

                        <tr 
                          className={`group transition-colors duration-150 ${
                            cat.sno % 2 === 0 ? 'bg-[#0B101D]' : 'bg-[#0E1526]'
                          } hover:bg-amber-500/10`}
                        >
                          {/* Column 1: S. No. */}
                          <td className="py-3.5 px-4 sm:px-6 text-center font-mono font-medium text-amber-400/90 border-r border-white/5 select-none">
                            {cat.sno}
                          </td>

                          {/* Column 2: Award Category Name */}
                          <td className="py-3.5 px-5 sm:px-8 text-slate-100 font-medium">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <span className="text-sm sm:text-base leading-snug font-normal text-slate-100 group-hover:text-white transition-colors">
                                {cat.name}
                              </span>

                              {/* Action Buttons: Nominate & Copy */}
                              <div className="flex items-center gap-2 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleCopy(cat)}
                                  title="Copy category name"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-colors"
                                >
                                  {copiedSno === cat.sno ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-400" />
                                      <span className="text-emerald-400">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3 text-slate-400" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleNominate(cat.name)}
                                  className="inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-semibold bg-gradient-to-r from-[#F37021] to-[#F59E0B] text-white hover:brightness-110 shadow-sm transition-all"
                                >
                                  <span>Nominate</span>
                                  <ArrowUpRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary Bar */}
          <div className="bg-[#111728] border-t border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                All <strong className="text-white">220 categories</strong> are open for nominations until <strong>October 31, 2026</strong>.
              </span>
            </div>

            <button
              onClick={() => handleNominate('')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-[#F37021] to-[#F59E0B] text-white font-semibold shadow-lg hover:shadow-orange-500/25 hover:brightness-110 transition-all cursor-pointer"
            >
              <span>Submit Your Nomination</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
