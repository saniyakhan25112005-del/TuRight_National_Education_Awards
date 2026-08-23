package com.turight.awards.dto;

import java.time.Instant;

public class NominationResponse {

    private boolean success;
    private String message;
    private String referenceId;
    private String documentId;
    private Instant timestamp;

    public NominationResponse() {}

    public NominationResponse(boolean success, String message, String referenceId, String documentId) {
        this.success = success;
        this.message = message;
        this.referenceId = referenceId;
        this.documentId = documentId;
        this.timestamp = Instant.now();
    }

    public static NominationResponse success(String referenceId, String documentId) {
        return new NominationResponse(true, "Nomination successfully submitted and recorded.", referenceId, documentId);
    }

    public static NominationResponse error(String message) {
        NominationResponse response = new NominationResponse();
        response.setSuccess(false);
        response.setMessage(message);
        response.setTimestamp(Instant.now());
        return response;
    }

    // Getters and Setters
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getReferenceId() { return referenceId; }
    public void setReferenceId(String referenceId) { this.referenceId = referenceId; }

    public String getDocumentId() { return documentId; }
    public void setDocumentId(String documentId) { this.documentId = documentId; }

    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
}
