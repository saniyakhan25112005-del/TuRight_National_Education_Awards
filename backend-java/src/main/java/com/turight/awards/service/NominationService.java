package com.turight.awards.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.turight.awards.dto.NominationRequest;
import com.turight.awards.dto.NominationResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ExecutionException;

@Service
public class NominationService {

    private static final Logger log = LoggerFactory.getLogger(NominationService.class);
    private static final String COLLECTION_NAME = "nominations";

    private final Firestore firestore;
    private final Random random = new Random();

    @Autowired
    public NominationService(Firestore firestore) {
        this.firestore = firestore;
    }

    public NominationResponse saveNomination(NominationRequest request) throws ExecutionException, InterruptedException {
        String referenceId = generateReferenceId();

        // Build document map matching the Firestore Schema
        Map<String, Object> docData = new HashMap<>();
        docData.put("nomineeName", request.getNomineeName().trim());
        docData.put("email", request.getEmail().trim());
        docData.put("nomineeEmail", request.getNomineeEmail() != null ? request.getNomineeEmail().trim() : request.getEmail().trim());
        docData.put("phone", request.getPhone().trim());
        docData.put("nomineePhone", request.getNomineePhone() != null ? request.getNomineePhone().trim() : request.getPhone().trim());
        docData.put("organization", request.getOrganization().trim());
        docData.put("institution", request.getOrganization().trim());
        docData.put("nomineeDesignation", request.getNomineeDesignation() != null ? request.getNomineeDesignation().trim() : "Educator / Leader");
        docData.put("category", request.getCategory().trim());
        docData.put("nominationDescription", request.getNominationDescription().trim());
        docData.put("nominationTitle", request.getNominationTitle() != null ? request.getNominationTitle().trim() : "");
        docData.put("keyAchievements", request.getKeyAchievements() != null ? request.getKeyAchievements().trim() : "");
        docData.put("yearsOfExperience", request.getYearsOfExperience() != null ? request.getYearsOfExperience().trim() : "Not specified");
        docData.put("supportingInformation", request.getSupportingInformation() != null ? request.getSupportingInformation().trim() : "");
        docData.put("websiteUrl", request.getWebsiteUrl() != null ? request.getWebsiteUrl().trim() : "");
        docData.put("city", request.getCity().trim());
        docData.put("state", request.getState().trim());

        // Nominator metadata
        docData.put("nominatorName", request.getNominatorName().trim());
        docData.put("nominatorEmail", request.getNominatorEmail().trim());
        docData.put("nominatorPhone", request.getNominatorPhone().trim());
        docData.put("nominatorRole", request.getNominatorRole() != null ? request.getNominatorRole().trim() : "Nominator");
        docData.put("nominatorInstitution", request.getNominatorInstitution() != null ? request.getNominatorInstitution().trim() : request.getOrganization().trim());
        docData.put("isSelfNomination", Boolean.TRUE.equals(request.getIsSelfNomination()));

        // Document files
        docData.put("documentName", request.getDocumentName());
        docData.put("documentSize", request.getDocumentSize());
        docData.put("photoName", request.getPhotoName());

        // System attributes
        docData.put("status", "submitted");
        docData.put("referenceId", referenceId);
        docData.put("createdAt", FieldValue.serverTimestamp());
        docData.put("submittedAt", Instant.now().toString());

        log.info("Saving nomination dossier to Firestore for nominee: {} with ref: {}", request.getNomineeName(), referenceId);

        // Async write to Cloud Firestore
        ApiFuture<DocumentReference> future = firestore.collection(COLLECTION_NAME).add(docData);
        DocumentReference docRef = future.get();

        log.info("Successfully persisted nomination into Firestore with Doc ID: {}", docRef.getId());

        return NominationResponse.success(referenceId, docRef.getId());
    }

    private String generateReferenceId() {
        int randomNumber = 1000 + random.nextInt(9000);
        return "TR-2026-EDU-" + randomNumber;
    }
}
