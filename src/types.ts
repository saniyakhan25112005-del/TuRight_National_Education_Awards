export type CategoryType = 
  | 'all'
  | 'educators'
  | 'institutions'
  | 'innovation'
  | 'leadership'
  | 'edtech';

export interface AwardCategory {
  id: string;
  title: string;
  categoryType: 'educators' | 'institutions' | 'innovation' | 'leadership' | 'edtech';
  shortDescription: string;
  fullDescription: string;
  eligibility: string[];
  evaluationCriteria: string[];
  iconName: string;
  nominationFee: string;
  badge?: string;
  colorGradient?: string;
}

export interface ImportantDate {
  id: string;
  phase: string;
  title: string;
  date: string;
  isoDate: string;
  status: 'completed' | 'active' | 'upcoming';
  description: string;
  iconName: string;
}

export interface Winner {
  id: string;
  name: string;
  designation: string;
  institution: string;
  category: string;
  year: string;
  avatarUrl: string;
  achievement: string;
  quote: string;
  state: string;
  tags: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ceremony' | 'winners' | 'keynote' | 'campus';
  imageUrl: string;
  caption: string;
  year: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  institution: string;
  avatarUrl: string;
  content: string;
  year: string;
  awardWon?: string;
}

export interface JuryMember {
  id: string;
  name: string;
  title: string;
  institution: string;
  imageUrl: string;
  bio: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'eligibility' | 'nomination' | 'dates' | 'fees';
}

export interface NominationFormData {
  fullName: string;
  email: string;
  mobileNumber: string;
  designation: string;
  organization: string;
  city: string;
  yearsOfExperience: string;
  additionalInformation: string;
  cvFileName: string;
  cvFileSize: string;
  cvFileType: string;
  cvDataUrl?: string;

  // Legacy/compatibility fields for Firestore rules and modal display
  nomineeName?: string;
  category?: string;
  referenceId?: string;
}
