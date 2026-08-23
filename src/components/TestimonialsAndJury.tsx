import React from 'react';
import { 
  Users, 
  Quote, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  GraduationCap, 
  Building 
} from 'lucide-react';
import { JURY_MEMBERS, TESTIMONIALS, PARTNERS_LIST } from '../data/awardsData';
import { TuRightLogo } from './TuRightLogo';

export const TestimonialsAndJury: React.FC = () => {
  return (
    <section className="py-24 relative bg-[#0B0C10] overflow-hidden">
      {/* Background aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#F37021]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* Section 1: Distinguished Jury Panel */}
        <div>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F37021]/10 border border-[#F37021]/30 text-[#F37021] text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Independent Governance</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
              Distinguished Jury & <br className="hidden sm:inline" />
              <span className="text-gradient-orange">Advisory Council</span>
            </h2>

            <p className="text-base text-zinc-300 leading-relaxed">
              Every submission undergoes a multi-stage blind evaluation by celebrated academicians, former vice-chancellors, and educational policy experts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {JURY_MEMBERS.map((jury) => (
              <div
                key={jury.id}
                className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10 text-center flex flex-col items-center justify-between group transition-all duration-300"
              >
                <div className="space-y-4 flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={jury.imageUrl}
                      alt={jury.name}
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-white/10 group-hover:border-[#F37021] transition-colors shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-zinc-900 border border-[#F37021] text-[#F37021]">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-100 transition-colors font-display">
                      {jury.name}
                    </h3>
                    <p className="text-xs text-[#F37021] font-semibold mt-0.5">
                      {jury.title}
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      {jury.institution}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed text-center">
                    {jury.bio}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 w-full flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Grand Jury Board Member</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Testimonials from Educators & School Heads */}
        <div>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Quote className="w-3.5 h-3.5" />
              <span>Voices of Trust</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
              What Education Leaders Say About <br className="hidden sm:inline" />
              <span className="text-gradient-gold">TuRight National Awards</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="rounded-2xl p-7 bg-zinc-900/80 border border-white/10 flex flex-col justify-between relative shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Quote className="w-8 h-8 text-[#F37021]/20 absolute top-6 right-6" />

                <div className="space-y-4">
                  {test.awardWon && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F37021]/15 text-[#F37021] border border-[#F37021]/30">
                      {test.awardWon} ({test.year})
                    </span>
                  )}
                  
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                    "{test.content}"
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center gap-3.5 mt-6">
                  <img
                    src={test.avatarUrl}
                    alt={test.name}
                    className="w-11 h-11 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">
                      {test.name}
                    </h4>
                    <p className="text-xs text-[#F37021] font-medium">
                      {test.role}, {test.institution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Partners & Institutional Endorsements */}
        <div className="p-8 rounded-3xl bg-zinc-900/40 border border-white/10">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-[#F37021]">
              Collaboration & Endorsement
            </span>
            <h3 className="text-xl font-bold text-white font-display">
              Supported by Leading Academic Bodies & Industry Patrons
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {PARTNERS_LIST.map((partner, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-950/70 border border-white/5 text-center flex flex-col items-center justify-center group hover:border-[#F37021]/40 transition-colors"
              >
                <Building className="w-5 h-5 text-zinc-500 group-hover:text-[#F37021] transition-colors mb-2" />
                <span className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors">
                  {partner.name}
                </span>
                <span className="text-[10px] text-zinc-500 mt-0.5">
                  {partner.type}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
