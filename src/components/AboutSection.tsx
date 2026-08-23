import React from 'react';
import { 
  Target, 
  Compass, 
  Lightbulb, 
  Sparkles, 
  Check, 
  ArrowRight,
  GraduationCap,
  Award
} from 'lucide-react';
import { TuRightLogo } from './TuRightLogo';

interface AboutSectionProps {
  onOpenNomination: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenNomination }) => {
  const corePillars = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To identify, celebrate, and amplify the accomplishments of visionary educators, innovative schools, and educational disruptors who are building high-impact learning ecosystems across the country.",
      color: "from-orange-500/20 to-amber-500/10",
      border: "border-orange-500/30"
    },
    {
      icon: Compass,
      title: "Our Vision",
      description: "To establish a national benchmark of pedagogical excellence, inspiring millions of teachers and institutions to embrace modern innovation, holistic student development, and inclusive educational equity.",
      color: "from-amber-500/20 to-yellow-500/10",
      border: "border-amber-500/30"
    },
    {
      icon: Lightbulb,
      title: "Core Purpose",
      description: "To bridge the gap between grassroots classroom triumph and national recognition, providing educators with the prestige, resources, and institutional spotlight they rightfully deserve.",
      color: "from-orange-600/20 to-red-500/10",
      border: "border-orange-600/30"
    }
  ];

  const whyItMatters = [
    {
      title: "National Accreditation & Prestige",
      description: "Winning or being shortlisted serves as a gold standard endorsement of educational quality, validated by an independent jury of prominent scholars."
    },
    {
      title: "Benchmarking Institutional Innovation",
      description: "Participating institutions gain valuable self-audit insights, comparing their academic frameworks and pedagogical tools against national best practices."
    },
    {
      title: "Inspiring the Next Generation of Teachers",
      description: "By elevating teaching as one of the most noble, celebrated professions, we inspire talented youth to pursue careers in education."
    },
    {
      title: "Catalyzing Philanthropy & Collaborations",
      description: "Awardees gain widespread media visibility, opening doors to academic partnerships, corporate grants, and collaborative learning initiatives."
    }
  ];

  return (
    <section id="about" className="py-24 relative bg-[#0E1017] border-t border-b border-white/5 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#F37021]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F37021]/10 border border-[#F37021]/30 text-[#F37021] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About The National Initiative</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            Celebrating the Torchbearers of <br className="hidden sm:inline" />
            <span className="text-gradient-orange">Educational Excellence</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            The TuRight National Education Awards is an annual national recognition platform instituted to honor transformative work in classrooms, universities, research laboratories, and educational governance.
          </p>

          {/* Placeholder note indicator for administration clarity */}
          <div className="inline-flex items-center gap-2 text-xs bg-zinc-900/80 text-zinc-400 border border-white/10 px-3 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F37021]" />
            <span>Official initiative organized under the TuRight National Educational Foundation.</span>
          </div>
        </div>

        {/* 3 Main Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {corePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className={`rounded-2xl p-8 bg-gradient-to-b ${pillar.color} bg-zinc-900/60 border ${pillar.border} backdrop-blur-sm relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 shadow-xl`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#F37021]/20 flex items-center justify-center text-[#F37021] mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 font-display">
                  {pillar.title}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Narrative & Visual Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Why It Matters */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#F37021] font-bold">
                Why These Awards Matter
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Elevating the Standard of Indian & Global Learning
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Education is the singular engine driving social transformation and technological evolution. Yet, countless educators and institutions pioneer innovative pedagogies in silence. The TuRight National Education Awards shines a national spotlight on these unsung champions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {whyItMatters.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 space-y-1.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#F37021]/20 flex-shrink-0 flex items-center justify-center mt-0.5 text-[#F37021]">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <h4 className="text-sm font-bold text-white font-display">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-400 pl-7 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenNomination}
                className="px-6 py-3 rounded-xl bg-[#F37021] hover:bg-[#ff802b] text-white font-bold text-sm shadow-lg shadow-[#F37021]/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Submit a Nomination for 2026</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#categories"
                className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold text-sm border border-white/10 transition-colors"
              >
                Browse 25+ Award Categories
              </a>
            </div>
          </div>

          {/* Right Column: Visual Brand Card with TuRight Logo Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-8 bg-gradient-to-b from-zinc-900 to-black border border-white/15 shadow-2xl overflow-hidden text-center space-y-6">
              
              {/* Decorative background trophy aura */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#F37021]/15 rounded-full blur-3xl pointer-events-none" />

              {/* TuRight Logo in all its glory */}
              <div className="py-4 flex justify-center">
                <TuRightLogo size="xl" badgeStyle />
              </div>

              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-[#F37021]/10 text-[#F37021] text-xs font-bold uppercase tracking-wider">
                  The National Seal of Quality
                </div>
                <h4 className="text-xl font-bold text-white font-display">
                  Recognizing Educational Pioneers
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                  Every TuRight trophy signifies unparalleled dedication, independent jury validation, and transformative social impact.
                </p>
              </div>

              {/* Quick stats mini-grid */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-left">
                <div className="p-3 rounded-lg bg-zinc-950/80 border border-white/5">
                  <div className="text-lg font-black text-[#F37021] font-display">100%</div>
                  <div className="text-[11px] text-zinc-400 font-medium">Independent Evaluation</div>
                </div>
                <div className="p-3 rounded-lg bg-zinc-950/80 border border-white/5">
                  <div className="text-lg font-black text-white font-display">Pan-India</div>
                  <div className="text-[11px] text-zinc-400 font-medium">State & National Reach</div>
                </div>
              </div>

              {/* Official quote */}
              <blockquote className="text-xs text-zinc-300 italic bg-white/5 p-4 rounded-xl border border-white/5">
                "When we honor an educator, we honor the architect of a thousand futures."
              </blockquote>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
