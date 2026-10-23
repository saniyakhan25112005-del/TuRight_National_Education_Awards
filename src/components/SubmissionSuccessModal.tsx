import React from 'react';
import { 
  CheckCircle2, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  ArrowRight, 
  X,
  FileCheck,
  Calendar,
  Sparkles
} from 'lucide-react';
import { TuRightLogo } from './TuRightLogo';
import { NominationFormData } from '../types';

interface SubmissionSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: NominationFormData | null;
  referenceId: string;
}

export const SubmissionSuccessModal: React.FC<SubmissionSuccessModalProps> = ({
  isOpen,
  onClose,
  data,
  referenceId,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !data) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#10121A] border border-white/20 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top celebratory gradient ribbon */}
        <div className="h-2.5 bg-gradient-to-r from-[#F37021] via-amber-400 to-[#F37021]" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-10 space-y-6 text-center">
          
          {/* TuRight Logo Badge */}
          <div className="flex justify-center">
            <TuRightLogo size="md" />
          </div>

          {/* Big Success Icon */}
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          {/* Heading */}
          {/* Heading */}
          <div className="space-y-1.5">
            <span className="text-xs uppercase font-bold tracking-widest text-[#F37021]">
              Submission Confirmed • 8th Edition
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
              Nomination Successfully Submitted!
            </h3>
            <p className="text-sm text-zinc-300 max-w-lg mx-auto font-medium">
              Your nomination has been submitted successfully. Thank you for participating in the TuRight National Education Awards 2026.
            </p>
          </div>

          {/* Official Reference Card */}
          <div className="p-5 rounded-2xl bg-black/60 border border-white/15 text-left space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[11px] text-zinc-400 uppercase font-semibold block">
                  Official Application Reference ID
                </span>
                <span className="text-lg sm:text-xl font-mono font-black text-amber-300 tracking-wider">
                  {referenceId}
                </span>
              </div>
              <button
                onClick={handleCopyId}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-zinc-200 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy ID'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-zinc-400 block">Candidate / Full Name:</span>
                <span className="font-semibold text-zinc-200">{data.fullName || data.nomineeName}</span>
              </div>
              <div>
                <span className="text-zinc-400 block">Designation:</span>
                <span className="font-semibold text-zinc-200">{data.designation}</span>
              </div>
              <div>
                <span className="text-zinc-400 block">Institute / Organization:</span>
                <span className="font-semibold text-zinc-200">{data.organization}</span>
              </div>
              <div>
                <span className="text-zinc-400 block">City:</span>
                <span className="font-semibold text-zinc-200">{data.city}</span>
              </div>
              <div>
                <span className="text-zinc-400 block">Experience:</span>
                <span className="font-semibold text-zinc-200">{data.yearsOfExperience} Years</span>
              </div>
              <div>
                <span className="text-zinc-400 block">Attached CV:</span>
                <span className="font-semibold text-emerald-400 truncate block max-w-[200px]">
                  {data.cvFileName} ({data.cvFileSize})
                </span>
              </div>
              <div>
                <span className="text-zinc-400 block">Email Address:</span>
                <span className="font-semibold text-zinc-200">{data.email}</span>
              </div>
              <div>
                <span className="text-zinc-400 block">Date of Submission:</span>
                <span className="font-semibold text-zinc-200">
                  {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>

            {data.cvDataUrl && (
              <div className="pt-2 border-t border-white/10">
                <a
                  href={data.cvDataUrl}
                  download={data.cvFileName}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#F37021] hover:text-amber-300 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download / Review Submitted CV</span>
                </a>
              </div>
            )}
          </div>

          {/* Next Steps Info */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 text-left text-xs space-y-2">
            <div className="font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F37021]" />
              What Happens Next?
            </div>
            <ul className="text-zinc-300 space-y-1.5 list-disc list-inside">
              <li>Confirmation details have been recorded for <strong>{data.email}</strong>.</li>
              <li>The academic secretariat will review your submitted CV and profile.</li>
              <li>Jury evaluation commences after nominations close on October 31, 2026.</li>
            </ul>
          </div>

          {/* Modal Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#F37021] hover:bg-[#ff802b] text-white font-bold text-sm shadow-lg shadow-[#F37021]/30 transition-all cursor-pointer"
            >
              Done & Return to Website
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
