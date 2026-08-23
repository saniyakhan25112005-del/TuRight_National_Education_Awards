import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle, 
  HelpCircle, 
  GraduationCap, 
  School, 
  Building2, 
  Laptop, 
  Award,
  Sparkles,
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface EligibilitySectionProps {
  onOpenNomination: (categoryId?: string) => void;
}

export const EligibilitySection: React.FC<EligibilitySectionProps> = ({ onOpenNomination }) => {
  // Interactive Eligibility Checker state
  const [selectedRole, setSelectedRole] = useState<'teacher' | 'school' | 'highered' | 'edtech' | 'leader'>('teacher');

  const targetGroups = [
    {
      id: 'teacher',
      title: 'Individual Educators & Teachers',
      icon: GraduationCap,
      description: 'Primary, secondary, high school, and junior college teachers across government, private, and trust-run schools.',
      criteria: [
        'Minimum 3 years of active classroom or online teaching experience',
        'Recognized educational qualification and school affiliation',
        'Demonstrated commitment to student engagement and positive learning outcomes',
        'Open to full-time, guest, and contractual educators'
      ],
      recommendedCategory: 'best-educator'
    },
    {
      id: 'school',
      title: 'K-12 Schools & Institutions',
      icon: School,
      description: 'Primary, secondary, CBSE, ICSE, State Board, IB, and Cambridge affiliated academic institutions.',
      criteria: [
        'Accredited and legally recognized educational institution',
        'Minimum 3 academic cycles of operational history',
        'Documented track record of holistic student safety, sports, and infrastructure',
        'Compliant with state and national educational norms'
      ],
      recommendedCategory: 'outstanding-school'
    },
    {
      id: 'highered',
      title: 'Colleges & Universities',
      icon: Building2,
      description: 'Undergraduate, postgraduate colleges, polytechnics, autonomous institutions, and deemed universities.',
      criteria: [
        'UGC, AICTE, NAAC, NBA, or state government statutory recognition',
        'Active academic curriculum, laboratory facilities, and faculty roster',
        'Documented research output, placement records, and campus culture',
        'Open to public and private universities nationwide'
      ],
      recommendedCategory: 'higher-ed-excellence'
    },
    {
      id: 'edtech',
      title: 'EdTech & Learning Innovators',
      icon: Laptop,
      description: 'EdTech startups, educational software providers, e-learning content creators, and academic publishers.',
      criteria: [
        'Registered corporate or non-profit educational venture',
        'Product or service deployed and active in the education sector',
        'Verified data privacy and user safety protocols for minors',
        'Measurable impact on student learning efficiency'
      ],
      recommendedCategory: 'edtech-pioneer'
    },
    {
      id: 'leader',
      title: 'Principals, Deans & Directors',
      icon: Award,
      description: 'Executive academic leaders steering institutional growth, faculty development, and educational vision.',
      criteria: [
        'Minimum 5 years in educational governance or principalship',
        'Demonstrated institutional growth, faculty retention, and vision',
        'Community reputation and educational policy advocacy',
        'Endorsement from management or academic council'
      ],
      recommendedCategory: 'education-leadership'
    }
  ];

  const currentGroup = targetGroups.find(g => g.id === selectedRole) || targetGroups[0];

  return (
    <section id="eligibility" className="py-24 relative bg-[#0E1017] border-t border-white/5 overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F37021]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F37021]/10 border border-[#F37021]/30 text-[#F37021] text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Eligibility & Participation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            Who Can Nominate for the <br className="hidden sm:inline" />
            <span className="text-gradient-orange">National Awards?</span>
          </h2>

          <p className="text-base text-zinc-300 leading-relaxed">
            The TuRight National Education Awards welcomes nominations from all segments of the Indian educational landscape. Explore participation eligibility below.
          </p>

          <div className="text-xs text-zinc-400 bg-zinc-900 border border-white/10 px-3.5 py-1.5 rounded-lg inline-block">
            ℹ️ <span className="text-zinc-200 font-semibold">Official Notice:</span> All criteria listed below are placeholder guidelines for the 2026 edition and subject to final board ratifications.
          </div>
        </div>

        {/* Interactive Eligibility Profile Selector & Checker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Role Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-2">
              Select Your Category Profile:
            </span>
            {targetGroups.map((group) => {
              const Icon = group.icon;
              const isSelected = selectedRole === group.id;
              return (
                <button
                  key={group.id}
                  onClick={() => setSelectedRole(group.id as any)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 flex items-center justify-between border cursor-pointer ${
                    isSelected
                      ? 'bg-[#F37021]/15 border-[#F37021] shadow-lg shadow-[#F37021]/10'
                      : 'bg-zinc-900/60 border-white/5 hover:bg-zinc-900 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-[#F37021] text-white' : 'bg-white/5 text-zinc-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold font-display ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                        {group.title}
                      </h4>
                      <p className="text-xs text-zinc-400 line-clamp-1">
                        {group.description}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold ${isSelected ? 'text-[#F37021]' : 'text-zinc-600'}`}>
                    ➔
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Criteria for Selected Role */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/15 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F37021]/20 flex items-center justify-center text-[#F37021]">
                    <currentGroup.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-[#F37021] tracking-wider">
                      Eligibility Overview
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                      {currentGroup.title}
                    </h3>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Eligible to Apply</span>
                </div>
              </div>

              <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
                {currentGroup.description}
              </p>

              {/* Checklist */}
              <div className="space-y-3 mb-8">
                <span className="text-xs uppercase font-bold text-zinc-400 tracking-wider block">
                  Mandatory Submission Prerequisites:
                </span>
                {currentGroup.criteria.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/80 border border-white/5 text-xs sm:text-sm text-zinc-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Banner inside check box */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-zinc-400 text-center sm:text-left">
                  <span>Matches Category: </span>
                  <span className="font-bold text-amber-300">
                    {currentGroup.title}
                  </span>
                </div>
                <button
                  onClick={() => onOpenNomination(currentGroup.recommendedCategory)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#F37021] hover:bg-[#ff802b] text-white font-bold text-xs shadow-lg shadow-[#F37021]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Nominate in this Track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Universal Rules & Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-5 rounded-xl bg-zinc-900/50 border border-white/5 space-y-2">
            <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F37021]" />
              Self-Nomination Allowed
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Educators and institutions can submit their own dossiers or be nominated by peers, students, management, or alumni.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/50 border border-white/5 space-y-2">
            <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Pan-India Participation
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Open to educators and institutions located across all 28 Indian States and 8 Union Territories with equal consideration.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/50 border border-white/5 space-y-2">
            <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Strict Ethical Compliance
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Submissions must be factual. Any fraudulent certificates, false statistics, or plagiarism leads to immediate disqualification.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
