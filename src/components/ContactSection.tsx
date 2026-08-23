import React, { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Send, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles,
  ExternalLink,
  Building
} from 'lucide-react';
import { AWARDS_METADATA } from '../data/awardsData';
import { TuRightLogo } from './TuRightLogo';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    inquiryType: 'Nomination Process',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        inquiryType: 'Nomination Process',
        message: '',
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 relative bg-[#0B0C10] overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F37021]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F37021]/10 border border-[#F37021]/30 text-[#F37021] text-xs font-bold uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect With Organizers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            Contact the National <br className="hidden sm:inline" />
            <span className="text-gradient-orange">Awards Secretariat</span>
          </h2>

          <p className="text-base text-zinc-300 leading-relaxed">
            Have questions regarding bulk institutional nominations, sponsorship opportunities, or jury inquiries? Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Details & Map Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Main Info Card */}
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
              <div className="flex items-center gap-3">
                <TuRightLogo size="sm" />
                <span className="text-xs uppercase font-bold text-zinc-400 tracking-wider">
                  Awards Headquarters
                </span>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5 text-zinc-300">
                  <div className="w-9 h-9 rounded-xl bg-[#F37021]/15 text-[#F37021] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Official Address:</span>
                    <span className="text-xs text-zinc-400">{AWARDS_METADATA.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-zinc-300">
                  <div className="w-9 h-9 rounded-xl bg-[#F37021]/15 text-[#F37021] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Email Inquiries:</span>
                    <a href={`mailto:${AWARDS_METADATA.contactEmail}`} className="text-xs text-[#F37021] hover:underline font-medium">
                      {AWARDS_METADATA.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-zinc-300">
                  <div className="w-9 h-9 rounded-xl bg-[#F37021]/15 text-[#F37021] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Telephone Helpline:</span>
                    <span className="text-xs text-zinc-400">{AWARDS_METADATA.contactPhone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-zinc-300">
                  <div className="w-9 h-9 rounded-xl bg-[#F37021]/15 text-[#F37021] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Secretariat Office Hours:</span>
                    <span className="text-xs text-zinc-400">Monday - Saturday: 9:00 AM – 6:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Visual Placeholder */}
            <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 aspect-[16/9] group shadow-xl">
              {/* Map background illustration */}
              <div 
                className="w-full h-full bg-[#181A24] flex items-center justify-center relative"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.06) 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }}
              >
                {/* Visual Location Marker */}
                <div className="relative flex flex-col items-center">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#F37021]/20 animate-ping absolute inset-0" />
                    <div className="w-12 h-12 rounded-full bg-[#F37021] text-white flex items-center justify-center shadow-2xl relative z-10 border-2 border-white">
                      <Building className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-2 bg-black/90 px-3 py-1 rounded-full border border-white/15 text-[11px] font-bold text-white shadow-lg">
                    TuRight National Secretariat
                  </div>
                  <span className="text-[10px] text-zinc-400">Institutional Area, New Delhi</span>
                </div>
              </div>

              {/* Map controls overlay */}
              <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md p-2.5 rounded-xl text-xs flex items-center justify-between border border-white/10">
                <span className="text-zinc-300 font-medium">Google Maps Location</span>
                <a
                  href="https://maps.google.com/?q=New+Delhi+Institutional+Area"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#F37021] hover:underline flex items-center gap-1"
                >
                  <span>Open Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#12141D] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
              <div className="space-y-2 mb-8">
                <h3 className="text-2xl font-bold text-white font-display">
                  Send an Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Our coordination desk will respond within 24 business hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white font-display">
                    Thank You for Reaching Out!
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
                    Your inquiry has been logged with reference ticket <strong className="text-emerald-400 font-mono">#INQ-{Math.floor(1000 + Math.random() * 9000)}</strong>. An awards liaison officer will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        Full Name <span className="text-[#F37021]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F37021] transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        Email Address <span className="text-[#F37021]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@institution.edu"
                        className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F37021] transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F37021] transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F37021] transition-all"
                      >
                        <option value="Nomination Process">Nomination & Submission Help</option>
                        <option value="Institutional Nominations">Bulk School/College Entries</option>
                        <option value="Jury & Evaluation">Jury & Evaluation Criteria</option>
                        <option value="Sponsorship & Partnership">Sponsorship & Patronage</option>
                        <option value="General Query">General Query</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Institution / School / Organization Name
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. National Model Public School"
                      className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F37021] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Your Message or Question <span className="text-[#F37021]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please write your inquiry in detail..."
                      className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F37021] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#F37021] hover:bg-[#ff802b] text-white font-bold text-sm shadow-lg shadow-[#F37021]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
