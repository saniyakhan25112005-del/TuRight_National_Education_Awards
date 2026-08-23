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
 * Submits nomination either to custom Java Spring Boot REST API (if configured)
 * or directly to Firebase Firestore client SDK.
 */
export async function submitNominationDossier(
  formData: NominationFormData,
  backendUrl?: string
): Promise<NominationSubmissionResult> {
  const referenceId = `TR-2026-EDU-${Math.floor(1000 + Math.random() * 9000)}`;

  // If a Java backend URL is configured, use the REST API bridge
  if (backendUrl) {
    const response = await fetch(`${backendUrl}/api/nominations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        email: formData.nomineeEmail || formData.nominatorEmail,
        phone: formData.nomineePhone || formData.nominatorPhone,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Java API Error: HTTP ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      referenceId: data.referenceId || referenceId,
      documentId: data.documentId,
      source: 'java-backend',
    };
  }

  // Default: Direct Cloud Firestore submission
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
