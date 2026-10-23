import { NominationFormData } from '../types';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export interface NominationSubmissionResult {
  success: boolean;
  referenceId: string;
  documentId?: string;
  source: 'firebase-direct' | 'java-backend';
}

/**
 * Submits nomination to Firebase Cloud Firestore.
 */
export async function submitNominationDossier(
  formData: NominationFormData,
  backendUrl?: string
): Promise<NominationSubmissionResult> {
  const referenceId = `TR-2026-EDU-${Math.floor(1000 + Math.random() * 9000)}`;

  // If a custom backend URL is configured, use the REST API bridge
  if (backendUrl) {
    const response = await fetch(`${backendUrl}/api/nominations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        referenceId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Backend API Error: HTTP ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      referenceId: data.referenceId || referenceId,
      documentId: data.documentId,
      source: 'java-backend',
    };
  }

  // Default: Direct Cloud Firestore submission matching firestore.rules
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

    // Required by firestore.rules
    nomineeName: formData.fullName.trim(),
    phone: formData.mobileNumber.trim(),
    category: "8th Edition – 2026 National Education Awards",
    nominationDescription: formData.additionalInformation.trim() || `Official nomination for ${formData.fullName.trim()} (${formData.designation.trim()} at ${formData.organization.trim()}) in the 8th Edition TuRight National Education Awards 2026.`,
    status: 'submitted',
    referenceId: referenceId,
    createdAt: serverTimestamp(),
    submittedAt: new Date().toISOString(),
  };

  const docRef = await addDoc(collection(db, 'nominations'), nominationPayload);

  return {
    success: true,
    referenceId,
    documentId: docRef.id,
    source: 'firebase-direct',
  };
}
