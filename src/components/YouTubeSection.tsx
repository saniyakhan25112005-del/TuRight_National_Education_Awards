import React from 'react';
import { Youtube, PlayCircle } from 'lucide-react';

export const YouTubeSection: React.FC = () => {
  const videos = [
    {
      id: '2sr8pljGLCE',
      title: 'TuRight National Education Awards 2026 | Edition 3',
      url: 'https://youtu.be/2sr8pljGLCE?si=0rWjnP-C36Lpof1n'
    },
    {
      id: 'j5bBUpwcgUU',
      title: 'TuRight National Education Awards 2026 | Edition 2',
      url: 'https://youtu.be/j5bBUpwcgUU?si=Q33SkxG3XLdoxgFK'
    },
    {
      id: 's9HT_brfhUo',
      title: 'TuRight National Education Awards | October 2025',
      url: 'https://youtu.be/s9HT_brfhUo?si=lBFNOBmUtfP_TIiS'
    }
  ];

  return (
    <section id="watch" className="py-24 relative bg-[#0B0C10] border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#F37021]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F37021]/10 border border-[#F37021]/30 text-[#F37021] text-xs font-bold uppercase tracking-widest">
            <Youtube className="w-3.5 h-3.5" />
            <span>Official Media</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            Watch Our <span className="text-gradient-orange">Awards</span>
          </h2>
          <p className="text-base text-zinc-300 leading-relaxed">
            Experience the highlights, keynotes, and grand ceremonies of the TuRight National Education Awards on our official YouTube channel.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {videos.map((video) => (
            <div key={video.id} className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-lg flex flex-col">
              <div className="relative aspect-video bg-black w-full overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-sm font-bold text-white font-display mb-3 line-clamp-2">
                  {video.title}
                </h3>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-xs font-bold text-[#F37021] hover:text-white transition-colors"
                >
                  <PlayCircle className="w-4 h-4" />
                  Watch on YouTube
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Channel CTA */}
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-900/50 border border-white/10 text-center">
          <Youtube className="w-12 h-12 text-[#F37021] mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">TuRight National Education Awards</h3>
          <p className="text-zinc-400 text-sm mb-6">@TurightNationalAwards</p>
          <a
            href="https://www.youtube.com/@TurightNationalAwards"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold text-sm shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            <Youtube className="w-4 h-4" />
            Visit Our YouTube Channel
          </a>
        </div>
      </div>
    </section>
  );
};
