package com.turight.awards.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class NominationRequest {

    @NotBlank(message = "Nominee name is required")
    @Size(max = 300, message = "Nominee name cannot exceed 300 characters")
    private String nomineeName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String nomineeEmail;

    @NotBlank(message = "Phone number is required")
    private String phone;

    private String nomineePhone;

    @NotBlank(message = "Organization or institution is required")
    private String organization;

    private String nomineeDesignation;

    @NotBlank(message = "Award category is required")
    private String category;

    private String nominationTitle;

    @NotBlank(message = "Nomination description is required")
    @Size(min = 20, max = 10000, message = "Description must be between 20 and 10,000 characters")
    private String nominationDescription;

    private String keyAchievements;
    private String yearsOfExperience;
    private String supportingInformation;
    private String websiteUrl;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Nominator name is required")
    private String nominatorName;

    @NotBlank(message = "Nominator email is required")
    @Email(message = "Invalid nominator email format")
    private String nominatorEmail;

    @NotBlank(message = "Nominator phone is required")
    private String nominatorPhone;

    private String nominatorRole;
    private String nominatorInstitution;
    private Boolean isSelfNomination;

    private String documentName;
    private String documentSize;
    private String photoName;

    // Constructors
    public NominationRequest() {}

    // Getters and Setters
    public String getNomineeName() { return nomineeName; }
    public void setNomineeName(String nomineeName) { this.nomineeName = nomineeName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getNomineeEmail() { return nomineeEmail; }
    public void setNomineeEmail(String nomineeEmail) { this.nomineeEmail = nomineeEmail; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getNomineePhone() { return nomineePhone; }
    public void setNomineePhone(String nomineePhone) { this.nomineePhone = nomineePhone; }

    public String getOrganization() { return organization; }
    public void setOrganization(String organization) { this.organization = organization; }

    public String getNomineeDesignation() { return nomineeDesignation; }
    public void setNomineeDesignation(String nomineeDesignation) { this.nomineeDesignation = nomineeDesignation; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getNominationTitle() { return nominationTitle; }
    public void setNominationTitle(String nominationTitle) { this.nominationTitle = nominationTitle; }

    public String getNominationDescription() { return nominationDescription; }
    public void setNominationDescription(String nominationDescription) { this.nominationDescription = nominationDescription; }

    public String getKeyAchievements() { return keyAchievements; }
    public void setKeyAchievements(String keyAchievements) { this.keyAchievements = keyAchievements; }

    public String getYearsOfExperience() { return yearsOfExperience; }
    public void setYearsOfExperience(String yearsOfExperience) { this.yearsOfExperience = yearsOfExperience; }

    public String getSupportingInformation() { return supportingInformation; }
    public void setSupportingInformation(String supportingInformation) { this.supportingInformation = supportingInformation; }

    public String getWebsiteUrl() { return websiteUrl; }
    public void setWebsiteUrl(String websiteUrl) { this.websiteUrl = websiteUrl; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getNominatorName() { return nominatorName; }
    public void setNominatorName(String nominatorName) { this.nominatorName = nominatorName; }

    public String getNominatorEmail() { return nominatorEmail; }
    public void setNominatorEmail(String nominatorEmail) { this.nominatorEmail = nominatorEmail; }

    public String getNominatorPhone() { return nominatorPhone; }
    public void setNominatorPhone(String nominatorPhone) { this.nominatorPhone = nominatorPhone; }

    public String getNominatorRole() { return nominatorRole; }
    public void setNominatorRole(String nominatorRole) { this.nominatorRole = nominatorRole; }

    public String getNominatorInstitution() { return nominatorInstitution; }
    public void setNominatorInstitution(String nominatorInstitution) { this.nominatorInstitution = nominatorInstitution; }

    public Boolean getIsSelfNomination() { return isSelfNomination; }
    public void setIsSelfNomination(Boolean isSelfNomination) { this.isSelfNomination = isSelfNomination; }

    public String getDocumentName() { return documentName; }
    public void setDocumentName(String documentName) { this.documentName = documentName; }

    public String getDocumentSize() { return documentSize; }
    public void setDocumentSize(String documentSize) { this.documentSize = documentSize; }

    public String getPhotoName() { return photoName; }
    public void setPhotoName(String photoName) { this.photoName = photoName; }
}
