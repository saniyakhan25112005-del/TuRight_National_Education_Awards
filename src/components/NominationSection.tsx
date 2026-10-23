import React, { useState } from 'react';
import { 
  Send, 
  Upload, 
  FileText, 
  AlertCircle, 
  Sparkles, 
  User, 
  Mail, 
  Phone, 
  Building, 
  MapPin, 
  Briefcase, 
  Clock, 
  Lock, 
  CheckCircle2, 
  X,
  FileCheck,
  ChevronDown
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { NominationFormData } from '../types';
import { SubmissionSuccessModal } from './SubmissionSuccessModal';
import { TuRightLogo } from './TuRightLogo';

interface NominationSectionProps {
  preselectedCategory?: string;
  onClearPreselectedCategory?: () => void;
}

export const NominationSection: React.FC<NominationSectionProps> = ({
  onClearPreselectedCategory
}) => {
  const [formData, setFormData] = useState<NominationFormData>({
    fullName: '',
    email: '',
    mobileNumber: '',
    designation: '',
    organization: '',
    city: '',
    yearsOfExperience: '',
    additionalInformation: '',
    cvFileName: '',
    cvFileSize: '',
    cvFileType: '',
    cvDataUrl: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<NominationFormData | null>(null);
  const [referenceId, setReferenceId] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  // Maximum CV size: 750 KB to ensure it safely fits within Firestore's 1MB document limit
  const MAX_FILE_SIZE_BYTES = 750 * 1024;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (submissionError) {
      setSubmissionError(null);
    }

    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleCvFile = (file: File) => {
    const validExtensions = ['.pdf', '.docx', '.doc'];
    const fileNameLower = file.name.toLowerCase();
    const hasValidExt = validExtensions.some(ext => fileNameLower.endsWith(ext));

    if (!hasValidExt) {
      setErrors(prev => ({
        ...prev,
        cvFile: 'Please upload your CV in PDF or DOCX format (.pdf, .docx)',
      }));
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrors(prev => ({
        ...prev,
        cvFile: `File size exceeds the 750 KB limit (${(file.size / 1024).toFixed(0)} KB). Please compress or reduce pages.`,
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({
        ...prev,
        cvFileName: file.name,
        cvFileSize: `${(file.size / 1024).toFixed(1)} KB`,
        cvFileType: file.type || 'application/pdf',
        cvDataUrl: reader.result as string,
      }));

      setErrors(prev => {
        const next = { ...prev };
        delete next.cvFile;
        return next;
      });
    };
    reader.onerror = () => {
      setErrors(prev => ({
        ...prev,
        cvFile: 'Could not read the selected file. Please try again.',
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleCvFile(file);
    }
  };

  const handleRemoveCv = () => {
    setFormData(prev => ({
      ...prev,
      cvFileName: '',
      cvFileSize: '',
      cvFileType: '',
      cvDataUrl: '',
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid full name';
    }

    // 2. Email Address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // 3. Mobile Number (Appropriate validation for Indian applicants: 10 digits with optional +91 or 0 prefix)
    const rawPhone = formData.mobileNumber.replace(/[\s-]/g, '');
    const indianPhoneRegex = /^(?:(?:\+|0{0,2})91)?[6-9]\d{9}$/;
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required';
    } else if (!indianPhoneRegex.test(rawPhone)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit Indian mobile number (e.g., 9876543210 or +91 98765 43210)';
    }

    // 4. Designation
    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required (e.g. Principal, Professor, Teacher, Director)';
    }

    // 5. Institute / Organization
    if (!formData.organization.trim()) {
      newErrors.organization = 'Institute / Organization name is required';
    }

    // 6. City
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    // 7. Years of Experience (Accept only valid, non-negative whole numbers)
    const expTrimmed = formData.yearsOfExperience.trim();
    if (!expTrimmed) {
      newErrors.yearsOfExperience = 'Years of Experience is required';
    } else if (!/^\d+$/.test(expTrimmed) || parseInt(expTrimmed, 10) < 0) {
      newErrors.yearsOfExperience = 'Please enter a valid non-negative whole number (e.g. 5, 12, 20)';
    }

    // 9. Upload CV (Required)
    if (!formData.cvFileName || !formData.cvDataUrl) {
      newErrors.cvFile = 'Uploading your CV (in PDF or DOCX format) is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!validateForm()) {
      const firstErrorKey = Object.keys(errors)[0] || 'fullName';
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const randomRef = `TR-2026-EDU-${Math.floor(1000 + Math.random() * 9000)}`;

      // Prepare payload with clean 9 fields + legacy compatibility fields for firestore.rules
      const nominationPayload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        mobileNumber: formData.mobileNumber.trim(),
        designation: formData.designation.trim(),
        organization: formData.organization.trim(),
        city: formData.city.trim(),
        yearsOfExperience: formData.yearsOfExperience.trim(),
        additionalInformation: formData.additionalInformation.trim(),
        
        cvFileName: formData.cvFileName,
        cvFileSize: formData.cvFileSize,
        cvFileType: formData.cvFileType,
        cvDataUrl: formData.cvDataUrl,

        // Required by existing firestore.rules
        nomineeName: formData.fullName.trim(),
        phone: formData.mobileNumber.trim(),
        category: "8th Edition – 2026 National Education Awards",
        nominationDescription: formData.additionalInformation.trim() || `Official nomination for ${formData.fullName.trim()} (${formData.designation.trim()} at ${formData.organization.trim()}) in the 8th Edition TuRight National Education Awards 2026.`,
        status: "submitted",
        referenceId: randomRef,
        createdAt: serverTimestamp(),
        submittedAt: new Date().toISOString(),
      };

      // Save to Cloud Firestore 'nominations' collection
      await addDoc(collection(db, 'nominations'), nominationPayload);

      setReferenceId(randomRef);
      setSubmittedData({ ...formData });
      setSuccessModalOpen(true);

      // Reset form state
      setFormData({
        fullName: '',
        email: '',
        mobileNumber: '',
        designation: '',
        organization: '',
        city: '',
        yearsOfExperience: '',
        additionalInformation: '',
        cvFileName: '',
        cvFileSize: '',
        cvFileType: '',
        cvDataUrl: '',
      });

      if (onClearPreselectedCategory) {
        onClearPreselectedCategory();
      }

    } catch (err: unknown) {
      console.error("Firestore nomination submission error:", err);
      const firebaseError = err as { code?: string; message?: string };
      if (firebaseError?.code === 'permission-denied') {
        setSubmissionError(
          "Firestore Permission Error: Missing write permissions on the 'nominations' collection. Please verify security rules in your Firebase Console."
        );
      } else {
        setSubmissionError(
          firebaseError?.message || "An unexpected error occurred while saving your nomination to Firebase Firestore. Please check your network connection and try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="nomination" className="pt-32 sm:pt-36 pb-20 relative bg-[#0B0C10] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-10 w-[550px] h-[550px] bg-[#F37021]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header - 8th Edition */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F37021]/10 border border-[#F37021]/30 text-[#F37021] text-xs font-bold uppercase tracking-widest">
            <FileCheck className="w-3.5 h-3.5" />
            <span>8th Edition • 2026 National Education Awards</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            TuRight National Education Awards – 8th Edition, 2026
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            Submit your nomination for the TuRight National Education Awards 2026.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-400 pt-1">
            <div className="bg-zinc-900 border border-white/10 px-3.5 py-1.5 rounded-xl inline-flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct Firestore Submission • Deadline: October 31, 2026 (11:59 PM IST)</span>
            </div>
          </div>
        </div>

        {/* Global Error Banner if submission fails */}
        {submissionError && (
          <div className="mb-8 p-5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-3.5 shadow-xl animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-red-200">Submission Failed</h4>
              <p className="text-xs sm:text-sm text-red-300/90 leading-relaxed">
                {submissionError}
              </p>
              <p className="text-[11px] text-zinc-400 mt-1">
                Your data is retained below. Please review and click Submit Nomination again.
              </p>
            </div>
          </div>
        )}

        {/* Simplified Single Nomination Form Card */}
        <div className="bg-[#12141D] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Top colored strip */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#F37021] via-amber-400 to-[#F37021]" />

          <form onSubmit={handleSubmit} className="space-y-6 pt-2">
            
            {/* Field 1: Full Name */}
            <div id="field-fullName" className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-zinc-200 flex items-center justify-between">
                <span>1. Full Name <span className="text-[#F37021]">*</span></span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Dr. Rajesh Sharma or Prof. Sunita Menon"
                  className={`w-full pl-10 pr-3.5 py-3 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                    errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#F37021]'
                  }`}
                />
              </div>
              {errors.fullName && <p className="text-xs text-red-400">{errors.fullName}</p>}
            </div>

            {/* Two-column row for Email and Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Field 2: Email Address */}
              <div id="field-email" className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-zinc-200 flex items-center justify-between">
                  <span>2. Email Address <span className="text-[#F37021]">*</span></span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. rajesh@university.edu or name@school.com"
                    className={`w-full pl-10 pr-3.5 py-3 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#F37021]'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
              </div>

              {/* Field 3: Mobile Number */}
              <div id="field-mobileNumber" className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-zinc-200 flex items-center justify-between">
                  <span>3. Mobile Number <span className="text-[#F37021]">*</span></span>
                  <span className="text-[11px] text-zinc-400">Indian Mobile</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. 9876543210 or +91 98765 43210"
                    className={`w-full pl-10 pr-3.5 py-3 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                      errors.mobileNumber ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#F37021]'
                    }`}
                  />
                </div>
                {errors.mobileNumber && <p className="text-xs text-red-400">{errors.mobileNumber}</p>}
              </div>

            </div>

            {/* Two-column row for Designation and Institute */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Field 4: Designation */}
              <div id="field-designation" className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-zinc-200">
                  4. Designation <span className="text-[#F37021]">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    placeholder="Principal, Professor, Teacher, Researcher, or Director"
                    className={`w-full pl-10 pr-3.5 py-3 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                      errors.designation ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#F37021]'
                    }`}
                  />
                </div>
                {errors.designation && <p className="text-xs text-red-400">{errors.designation}</p>}
              </div>

              {/* Field 5: Institute / Organization */}
              <div id="field-organization" className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-zinc-200">
                  5. Institute / Organization <span className="text-[#F37021]">*</span>
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    placeholder="School, College, University, or Organization"
                    className={`w-full pl-10 pr-3.5 py-3 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                      errors.organization ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#F37021]'
                    }`}
                  />
                </div>
                {errors.organization && <p className="text-xs text-red-400">{errors.organization}</p>}
              </div>

            </div>

            {/* Two-column row for City and Years of Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Field 6: City */}
              <div id="field-city" className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-zinc-200">
                  6. City <span className="text-[#F37021]">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Bengaluru, New Delhi, Mumbai, Kolkata"
                    className={`w-full pl-10 pr-3.5 py-3 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                      errors.city ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#F37021]'
                    }`}
                  />
                </div>
                {errors.city && <p className="text-xs text-red-400">{errors.city}</p>}
              </div>

              {/* Field 7: Years of Experience */}
              <div id="field-yearsOfExperience" className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-zinc-200 flex items-center justify-between">
                  <span>7. Years of Experience <span className="text-[#F37021]">*</span></span>
                  <span className="text-[11px] text-zinc-400">Whole number</span>
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="0"
                    step="1"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                    placeholder="e.g. 8"
                    className={`w-full pl-10 pr-3.5 py-3 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                      errors.yearsOfExperience ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#F37021]'
                    }`}
                  />
                </div>
                {errors.yearsOfExperience && <p className="text-xs text-red-400">{errors.yearsOfExperience}</p>}
              </div>

            </div>

            {/* Field 8: Additional Information (Optional) */}
            <div id="field-additionalInformation" className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-zinc-200 flex items-center justify-between">
                <span>8. Additional Information</span>
                <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  Optional
                </span>
              </label>
              <textarea
                name="additionalInformation"
                rows={4}
                value={formData.additionalInformation}
                onChange={handleInputChange}
                placeholder="Share any key achievements, innovations, recognitions, student impact milestones, or details you want the jury to consider (Optional)..."
                className="w-full px-4 py-3 bg-zinc-900/90 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F37021] transition-all"
              />
            </div>

            {/* Field 9: Upload CV (Required) */}
            <div id="field-cvFile" className="space-y-2 pt-2">
              <label className="text-xs sm:text-sm font-semibold text-zinc-200 flex items-center justify-between">
                <span>9. Upload CV <span className="text-[#F37021]">*</span></span>
                <span className="text-xs text-zinc-400">Accepted: PDF, DOCX (Max 750 KB)</span>
              </label>

              {formData.cvFileName ? (
                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-emerald-500/40 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
                        {formData.cvFileName}
                      </p>
                      <p className="text-xs text-emerald-400 flex items-center gap-1.5 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Ready for submission ({formData.cvFileSize})</span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveCv}
                    className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-300 transition-colors cursor-pointer flex-shrink-0"
                    title="Remove and select different CV"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="relative border-2 border-dashed border-white/15 hover:border-[#F37021] rounded-2xl p-6 text-center bg-zinc-900/50 hover:bg-zinc-900/80 transition-all group">
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileInputChange}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                    aria-label="Upload CV in PDF or DOCX format"
                  />
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#F37021]/15 text-[#F37021] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        Click to upload or drag & drop your CV / Résumé
                      </p>
                      <p className="text-xs text-zinc-400 mt-1">
                        Supported formats: <strong>PDF or DOCX</strong> • Maximum file size: <strong>750 KB</strong>
                      </p>
                    </div>
                    <div className="pt-2">
                      <span className="inline-block px-4 py-1.5 rounded-lg bg-white/10 text-xs font-semibold text-zinc-200 group-hover:bg-[#F37021] group-hover:text-white transition-colors">
                        Browse File
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {errors.cvFile && <p className="text-xs text-red-400">{errors.cvFile}</p>}
            </div>

            {/* Submit Action Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <TuRightLogo size="sm" />
                <span>8th Edition • Official National Secretariat</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-[#F37021] via-[#FA6400] to-[#E65100] hover:from-[#ff802b] hover:to-[#f37021] text-white font-black text-sm sm:text-base shadow-xl shadow-[#F37021]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Nomination to Firestore...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Nomination</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

        {/* Explore rest of awards portal anchor */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-zinc-400">
            Want to explore award details, categories, past winners & eligibility?
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white transition-all border border-white/10 shadow-lg"
          >
            <span>Explore Awards Overview & Gallery</span>
            <ChevronDown className="w-4 h-4 text-[#F37021] animate-bounce" />
          </a>
        </div>

      </div>

      {/* Submission Success Receipt Modal */}
      <SubmissionSuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        data={submittedData}
        referenceId={referenceId}
      />
    </section>
  );
};
