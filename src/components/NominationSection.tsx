import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  AlertCircle, 
  Sparkles, 
  User, 
  Mail, 
  Phone, 
  Building, 
  MapPin, 
  FileCheck, 
  Lock, 
  ChevronRight 
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { AWARD_CATEGORIES } from '../data/awardsData';
import { NominationFormData } from '../types';
import { SubmissionSuccessModal } from './SubmissionSuccessModal';
import { TuRightLogo } from './TuRightLogo';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi NCR", "Jammu & Kashmir", "Ladakh", "Puducherry", "Chandigarh", "Other / International"
];

interface NominationSectionProps {
  preselectedCategory?: string;
  onClearPreselectedCategory?: () => void;
}

export const NominationSection: React.FC<NominationSectionProps> = ({
  preselectedCategory,
  onClearPreselectedCategory
}) => {
  const [formData, setFormData] = useState<NominationFormData>({
    nominatorName: '',
    nominatorEmail: '',
    nominatorPhone: '',
    nominatorRole: '',
    nominatorInstitution: '',
    isSelfNomination: false,

    nomineeName: '',
    nomineeEmail: '',
    nomineePhone: '',
    nomineeDesignation: '',
    organization: '',
    city: '',
    state: '',
    category: preselectedCategory || '',

    nominationTitle: '',
    nominationDescription: '',
    keyAchievements: '',
    yearsOfExperience: '',
    supportingInformation: '',
    websiteUrl: '',

    documentName: '',
    documentSize: '',
    photoName: '',
    photoPreview: '',
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<NominationFormData | null>(null);
  const [referenceId, setReferenceId] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    if (preselectedCategory) {
      setFormData(prev => ({ ...prev, category: preselectedCategory }));
    }
  }, [preselectedCategory]);

  const handleSelfNominationToggle = (checked: boolean) => {
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          isSelfNomination: true,
          nomineeName: prev.nominatorName,
          nomineeEmail: prev.nominatorEmail,
          nomineePhone: prev.nominatorPhone,
          organization: prev.nominatorInstitution,
        };
      }
      return {
        ...prev,
        isSelfNomination: false,
      };
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

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

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, document: 'File size exceeds 15MB limit' }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        documentName: file.name,
        documentSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      }));
      setErrors(prev => {
        const next = { ...prev };
        delete next.document;
        return next;
      });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, photo: 'Please upload a valid image file (JPG/PNG)' }));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          photoName: file.name,
          photoPreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
      setErrors(prev => {
        const next = { ...prev };
        delete next.photo;
        return next;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nominatorName.trim()) newErrors.nominatorName = 'Nominator name is required';
    if (!formData.nominatorEmail.trim()) {
      newErrors.nominatorEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.nominatorEmail)) {
      newErrors.nominatorEmail = 'Valid email is required';
    }
    if (!formData.nominatorPhone.trim()) newErrors.nominatorPhone = 'Phone number is required';
    
    if (!formData.nomineeName.trim()) newErrors.nomineeName = 'Nominee / Candidate name is required';
    if (!formData.organization.trim()) newErrors.organization = 'Institution / Organization name is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'Please select a state';
    if (!formData.category.trim()) newErrors.category = 'Please choose an award category';

    if (!formData.nominationTitle.trim()) newErrors.nominationTitle = 'Please provide a title for the nomination entry';
    if (!formData.nominationDescription.trim() || formData.nominationDescription.length < 40) {
      newErrors.nominationDescription = 'Please provide a detailed description (minimum 40 characters)';
    }
    if (!formData.keyAchievements.trim()) {
      newErrors.keyAchievements = 'Please list key achievements or quantitative metrics';
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must confirm that all information provided is accurate and authentic';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!validateForm()) {
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      const randomRef = `TR-2026-EDU-${Math.floor(1000 + Math.random() * 9000)}`;

      // Prepare structured Firestore payload
      const nominationPayload = {
        nomineeName: formData.nomineeName.trim(),
        email: (formData.nomineeEmail || formData.nominatorEmail).trim(),
        nomineeEmail: (formData.nomineeEmail || formData.nominatorEmail).trim(),
        phone: (formData.nomineePhone || formData.nominatorPhone).trim(),
        nomineePhone: (formData.nomineePhone || formData.nominatorPhone).trim(),
        organization: formData.organization.trim(),
        institution: formData.organization.trim(),
        nomineeDesignation: formData.nomineeDesignation.trim() || 'Educator / Leader',
        category: formData.category,
        nominationDescription: formData.nominationDescription.trim(),
        nominationTitle: formData.nominationTitle.trim(),
        keyAchievements: formData.keyAchievements.trim(),
        yearsOfExperience: formData.yearsOfExperience.trim() || 'Not specified',
        supportingInformation: formData.supportingInformation.trim() || '',
        websiteUrl: formData.websiteUrl.trim() || '',
        city: formData.city.trim(),
        state: formData.state,
        
        nominatorName: formData.nominatorName.trim(),
        nominatorEmail: formData.nominatorEmail.trim(),
        nominatorPhone: formData.nominatorPhone.trim(),
        nominatorRole: formData.nominatorRole.trim() || 'Nominator',
        nominatorInstitution: formData.nominatorInstitution.trim() || formData.organization.trim(),
        isSelfNomination: Boolean(formData.isSelfNomination),
        
        documentName: formData.documentName || null,
        documentSize: formData.documentSize || null,
        photoName: formData.photoName || null,
        
        status: 'submitted',
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
        nominatorName: '',
        nominatorEmail: '',
        nominatorPhone: '',
        nominatorRole: '',
        nominatorInstitution: '',
        isSelfNomination: false,
        nomineeName: '',
        nomineeEmail: '',
        nomineePhone: '',
        nomineeDesignation: '',
        organization: '',
        city: '',
        state: '',
        category: '',
        nominationTitle: '',
        nominationDescription: '',
        keyAchievements: '',
        yearsOfExperience: '',
        supportingInformation: '',
        websiteUrl: '',
        documentName: '',
        documentSize: '',
        photoName: '',
        photoPreview: '',
        agreedToTerms: false,
      });
      if (onClearPreselectedCategory) onClearPreselectedCategory();

    } catch (err: unknown) {
      console.error("Firestore submission error:", err);
      const firebaseError = err as { code?: string; message?: string };
      if (firebaseError?.code === 'permission-denied') {
        setSubmissionError(
          "Firestore Permission Error: Missing write permissions on the 'nominations' collection. Please publish the security rules in your Firebase Console (Firestore Database > Rules)."
        );
      } else {
        setSubmissionError(
          firebaseError?.message || "An unexpected error occurred while saving your nomination to Firebase Firestore. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="nomination" className="py-24 relative bg-[#0E1017] border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#F37021]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F37021]/10 border border-[#F37021]/30 text-[#F37021] text-xs font-bold uppercase tracking-widest">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Official Nomination Portal</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display">
            Nominate for the <br className="hidden sm:inline" />
            <span className="text-gradient-orange">TuRight National Education Awards</span>
          </h2>

          <p className="text-base text-zinc-300 leading-relaxed">
            Submit your application dossier or nominate an inspiring educator, school, or leader. All submissions are safely logged to our real-time Firestore jury repository.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-400">
            <div className="bg-zinc-900 border border-white/10 px-4 py-2 rounded-xl inline-flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Encrypted submission channel • Blind jury evaluation</span>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3.5 py-2 rounded-xl inline-flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Firebase Cloud Firestore Connected</span>
            </div>
          </div>
        </div>

        {/* Global Error Banner if submission fails */}
        {submissionError && (
          <div className="mb-8 p-5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-3.5 shadow-xl animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-red-200">Submission Error</h4>
              <p className="text-xs sm:text-sm text-red-300/90 leading-relaxed">
                {submissionError}
              </p>
              <p className="text-[11px] text-zinc-400 mt-1">
                Please verify your connection and required fields before retrying.
              </p>
            </div>
          </div>
        )}

        {/* The Main Nomination Form Card */}
        <div className="bg-[#12141D] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Top colored strip */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#F37021] via-amber-400 to-[#F37021]" />

          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Step 1: Nominator Information */}
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#F37021] text-white font-bold text-xs flex items-center justify-center font-mono">
                    01
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                    Nominator Details
                  </h3>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-zinc-300 hover:text-white">
                  <input
                    type="checkbox"
                    checked={formData.isSelfNomination}
                    onChange={(e) => handleSelfNominationToggle(e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-700 text-[#F37021] focus:ring-[#F37021] bg-zinc-900"
                  />
                  <span className="font-semibold text-amber-200">I am nominating myself / my own institution</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div id="field-nominatorName" className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                    Your Full Name <span className="text-[#F37021]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="nominatorName"
                      value={formData.nominatorName}
                      onChange={handleInputChange}
                      placeholder="e.g. Dr. Rajesh Sharma"
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                        errors.nominatorName ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#F37021]'
                      }`}
                    />
                  </div>
                  {errors.nominatorName && <p className="text-[11px] text-red-400">{errors.nominatorName}</p>}
                </div>

                <div id="field-nominatorEmail" className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                    Email Address <span className="text-[#F37021]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="nominatorEmail"
                      value={formData.nominatorEmail}
                      onChange={handleInputChange}
                      placeholder="e.g. rajesh@university.edu"
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                        errors.nominatorEmail ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#F37021]'
                      }`}
                    />
                  </div>
                  {errors.nominatorEmail && <p className="text-[11px] text-red-400">{errors.nominatorEmail}</p>}
                </div>

                <div id="field-nominatorPhone" className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                    Phone / Mobile Number <span className="text-[#F37021]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="nominatorPhone"
                      value={formData.nominatorPhone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                        errors.nominatorPhone ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#F37021]'
                      }`}
                    />
                  </div>
                  {errors.nominatorPhone && <p className="text-[11px] text-red-400">{errors.nominatorPhone}</p>}
                </div>
              </div>
            </div>

            {/* Step 2: Nominee & Institution Information */}
            <div className="space-y-5">
              <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                <span className="w-7 h-7 rounded-lg bg-[#F37021] text-white font-bold text-xs flex items-center justify-center font-mono">
                  02
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                  Nominee / Candidate & Institution Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div id="field-nomineeName" className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                    Nominee Name (Person or School/College) <span className="text-[#F37021]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="nomineeName"
                      value={formData.nomineeName}
                      onChange={handleInputChange}
                      placeholder="e.g. Prof. Sunita Menon OR Greenwood High"
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                        errors.nomineeName ? 'border-red-500' : 'border-white/10 focus:border-[#F37021]'
                      }`}
                    />
                  </div>
                  {errors.nomineeName && <p className="text-[11px] text-red-400">{errors.nomineeName}</p>}
                </div>

                <div id="field-nomineeDesignation" className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    name="nomineeDesignation"
                    value={formData.nomineeDesignation}
                    onChange={handleInputChange}
                    placeholder="e.g. Principal / Senior Physics Educator"
                    className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F37021] transition-all"
                  />
                </div>

                <div id="field-organization" className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                    Institution / Organization <span className="text-[#F37021]">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      placeholder="e.g. Delhi World Public School"
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                        errors.organization ? 'border-red-500' : 'border-white/10 focus:border-[#F37021]'
                      }`}
                    />
                  </div>
                  {errors.organization && <p className="text-[11px] text-red-400">{errors.organization}</p>}
                </div>

                <div id="field-category" className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                    Nomination Category <span className="text-[#F37021]">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-3.5 py-2.5 bg-zinc-900 border rounded-xl text-sm text-white focus:outline-none transition-all ${
                      errors.category ? 'border-red-500' : 'border-white/10 focus:border-[#F37021]'
                    }`}
                  >
                    <option value="">-- Select Award Category --</option>
                    {AWARD_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title} ({cat.badge})
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className="text-[11px] text-red-400">{errors.category}</p>}
                </div>

                <div id="field-nomineeEmail" className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Nominee Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="nomineeEmail"
                      value={formData.nomineeEmail}
                      onChange={handleInputChange}
                      placeholder="e.g. nominee@institution.edu"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-900/90 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F37021] transition-all"
                    />
                  </div>
                </div>

                <div id="field-nomineePhone" className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Nominee Phone / Mobile
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="nomineePhone"
                      value={formData.nomineePhone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 00000"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-900/90 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F37021] transition-all"
                    />
                  </div>
                </div>

                <div id="field-city" className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                    City <span className="text-[#F37021]">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Bengaluru"
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                        errors.city ? 'border-red-500' : 'border-white/10 focus:border-[#F37021]'
                      }`}
                    />
                  </div>
                  {errors.city && <p className="text-[11px] text-red-400">{errors.city}</p>}
                </div>

                <div id="field-state" className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                    State / Union Territory <span className="text-[#F37021]">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-3.5 py-2.5 bg-zinc-900 border rounded-xl text-sm text-white focus:outline-none transition-all ${
                      errors.state ? 'border-red-500' : 'border-white/10 focus:border-[#F37021]'
                    }`}
                  >
                    <option value="">-- Select State --</option>
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  {errors.state && <p className="text-[11px] text-red-400">{errors.state}</p>}
                </div>
              </div>
            </div>

            {/* Step 3: Nomination Citation & Merits */}
            <div className="space-y-5">
              <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                <span className="w-7 h-7 rounded-lg bg-[#F37021] text-white font-bold text-xs flex items-center justify-center font-mono">
                  03
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                  Citation, Achievements & Pedagogical Impact
                </h3>
              </div>

              <div className="space-y-5">
                <div id="field-nominationTitle" className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                    Headline / Title of the Nomination <span className="text-[#F37021]">*</span>
                  </label>
                  <input
                    type="text"
                    name="nominationTitle"
                    value={formData.nominationTitle}
                    onChange={handleInputChange}
                    placeholder="e.g. Pioneering Experiential STEAM Curriculum for Rural Classrooms"
                    className={`w-full px-3.5 py-2.5 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                      errors.nominationTitle ? 'border-red-500' : 'border-white/10 focus:border-[#F37021]'
                    }`}
                  />
                  {errors.nominationTitle && <p className="text-[11px] text-red-400">{errors.nominationTitle}</p>}
                </div>

                <div id="field-nominationDescription" className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                    <span>Summary of Merits & Methodology (Min 40 characters) <span className="text-[#F37021]">*</span></span>
                    <span className="text-[11px] text-zinc-500">{formData.nominationDescription.length} characters</span>
                  </label>
                  <textarea
                    name="nominationDescription"
                    rows={4}
                    value={formData.nominationDescription}
                    onChange={handleInputChange}
                    placeholder="Describe the candidate's teaching methodology, institutional transformation, student engagement, or creative pedagogical breakthrough..."
                    className={`w-full px-3.5 py-2.5 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                      errors.nominationDescription ? 'border-red-500' : 'border-white/10 focus:border-[#F37021]'
                    }`}
                  />
                  {errors.nominationDescription && <p className="text-[11px] text-red-400">{errors.nominationDescription}</p>}
                </div>

                <div id="field-keyAchievements" className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
                    Key Measurable Achievements & Student Outcomes <span className="text-[#F37021]">*</span>
                  </label>
                  <textarea
                    name="keyAchievements"
                    rows={3}
                    value={formData.keyAchievements}
                    onChange={handleInputChange}
                    placeholder="List specific milestones: e.g. 98% board pass rates, 15 state Olympiad medals, deployment of AI labs, published research papers, etc."
                    className={`w-full px-3.5 py-2.5 bg-zinc-900/90 border rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                      errors.keyAchievements ? 'border-red-500' : 'border-white/10 focus:border-[#F37021]'
                    }`}
                  />
                  {errors.keyAchievements && <p className="text-[11px] text-red-400">{errors.keyAchievements}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Years of Experience / Years in Operation
                    </label>
                    <input
                      type="text"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleInputChange}
                      placeholder="e.g. 12 Years"
                      className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F37021] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Website / Portfolio / Video Link (Optional)
                    </label>
                    <input
                      type="url"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                      placeholder="https://myschool.edu/portfolio"
                      className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F37021] transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Document & Photograph Uploads */}
            <div className="space-y-5">
              <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                <span className="w-7 h-7 rounded-lg bg-[#F37021] text-white font-bold text-xs flex items-center justify-center font-mono">
                  04
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                  Supporting Documents & Nominee Photograph
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Upload Documents Card */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                    <span>Upload Supporting Dossier / CV (PDF, DOCX)</span>
                    <span className="text-[11px] text-zinc-500">Max 15MB</span>
                  </label>
                  
                  <div className="relative border-2 border-dashed border-white/15 hover:border-[#F37021]/60 rounded-2xl p-5 text-center bg-zinc-900/50 hover:bg-zinc-900/80 transition-all">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.zip"
                      onChange={handleDocumentUpload}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                    />
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#F37021] mx-auto">
                        <Upload className="w-5 h-5" />
                      </div>
                      {formData.documentName ? (
                        <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-500/10 py-1.5 px-3 rounded-lg">
                          <FileText className="w-4 h-4" />
                          <span className="truncate max-w-[180px]">{formData.documentName}</span>
                          <span className="text-zinc-400">({formData.documentSize})</span>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs font-bold text-zinc-200">
                            Click or drag to upload dossier
                          </p>
                          <p className="text-[11px] text-zinc-500">
                            Certificates, lesson plans, recommendation letters
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {errors.document && <p className="text-[11px] text-red-400">{errors.document}</p>}
                </div>

                {/* Upload Photo Card */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                    <span>Upload Nominee Photograph / Logo</span>
                    <span className="text-[11px] text-zinc-500">JPG, PNG</span>
                  </label>

                  <div className="relative border-2 border-dashed border-white/15 hover:border-[#F37021]/60 rounded-2xl p-5 text-center bg-zinc-900/50 hover:bg-zinc-900/80 transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                    />
                    <div className="space-y-2">
                      {formData.photoPreview ? (
                        <div className="flex items-center justify-center gap-3">
                          <img
                            src={formData.photoPreview}
                            alt="Nominee preview"
                            className="w-12 h-12 rounded-xl object-cover border border-[#F37021]"
                          />
                          <div className="text-left text-xs">
                            <span className="text-emerald-400 font-bold block">Photo Attached</span>
                            <span className="text-zinc-400 truncate max-w-[140px] block">{formData.photoName}</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#F37021] mx-auto">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-zinc-200">
                              Upload high-res portrait photo
                            </p>
                            <p className="text-[11px] text-zinc-500">
                              Will be featured in the official awards brochure if shortlisted
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {errors.photo && <p className="text-[11px] text-red-400">{errors.photo}</p>}
                </div>

              </div>
            </div>

            {/* Terms & Conditions Checkbox */}
            <div id="field-agreedToTerms" className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 space-y-2">
              <label className="flex items-start gap-3 cursor-pointer text-xs text-zinc-300">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-zinc-700 text-[#F37021] focus:ring-[#F37021] bg-zinc-900 mt-0.5"
                />
                <span className="leading-relaxed">
                  I hereby declare that the facts, achievements, and supporting materials submitted in this dossier are true, authentic, and verifiable. I agree to the rules and adjudication procedures of the <strong>TuRight National Education Awards 2026</strong>.
                </span>
              </label>
              {errors.agreedToTerms && <p className="text-[11px] text-red-400 pl-7">{errors.agreedToTerms}</p>}
            </div>

            {/* Submit Action Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <TuRightLogo size="sm" />
                <span>National Educational Secretariat</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-[#F37021] via-[#FA6400] to-[#E65100] hover:from-[#ff802b] hover:to-[#f37021] text-white font-black text-sm shadow-xl shadow-[#F37021]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Writing to Firestore Repository...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Official Nomination</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

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

