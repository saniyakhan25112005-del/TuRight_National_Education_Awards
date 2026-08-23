import React from 'react';
import { AwardCategory } from '../types';
import { 
  X, 
  Award, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Building2,
  GraduationCap,
  Lightbulb,
  School,
  Laptop,
  HeartHandshake
} from 'lucide-react';
import { TuRightLogo } from './TuRightLogo';

interface CategoryDetailModalProps {
  category: AwardCategory | null;
  onClose: () => void;
  onNominate: (categoryId: string) => void;
}

export const CategoryDetailModal: React.FC<CategoryDetailModalProps> = ({
  category,
  onClose,
  onNominate,
}) => {
  if (!category) return null;

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

  const IconComponent = getIcon(category.iconName);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#12141C] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Accent */}
        <div className="h-2 bg-gradient-to-r from-[#F37021] via-amber-400 to-[#F37021]" />

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors focus:outline-none cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
          
          {/* Header Info */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F37021]/15 border border-[#F37021]/30 flex items-center justify-center text-[#F37021] flex-shrink-0">
              <IconComponent className="w-7 h-7" />
            </div>
            <div className="space-y-1 pr-8">
              <div className="flex flex-wrap items-center gap-2">
                {category.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F37021]/20 text-[#F37021] border border-[#F37021]/30">
                    {category.badge}
                  </span>
                )}
                <span className="text-xs uppercase font-semibold text-zinc-400 tracking-wider">
                  Category Code: {category.id.toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                {category.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 text-zinc-300 text-sm leading-relaxed">
            {category.fullDescription}
          </div>

          {/* Eligibility Criteria */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#F37021] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Eligibility Requirements
            </h4>
            <div className="space-y-2">
              {category.eligibility.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Evaluation Rubrics / Criteria breakdown */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Weighted Jury Evaluation Rubric
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.evaluationCriteria.map((criterion, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F37021] flex-shrink-0" />
                  <span>{criterion}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nomination Process & Fee Note */}
          <div className="p-4 rounded-xl bg-[#F37021]/10 border border-[#F37021]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-white block">Official Category Information</span>
              <span className="text-zinc-300">{category.nominationFee}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <span>Organized by:</span>
              <TuRightLogo size="sm" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-sm transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onNominate(category.id);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#F37021] hover:bg-[#ff802b] text-white font-bold text-sm shadow-lg shadow-[#F37021]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Nominate for this Award</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
