# TuRight National Education Awards - Java Spring Boot Backend

A production-grade Java Spring Boot REST API backend that connects to Google Cloud Firestore using the official **Firebase Admin Java SDK**.

## Project Architecture

```
backend-java/
├── pom.xml                                       # Maven build configuration
└── src/
    └── main/
        ├── java/com/turight/awards/
        │   ├── TuRightAwardsApplication.java      # Spring Boot Main Entry
        │   ├── config/
        │   │   └── FirebaseConfig.java           # Firebase Admin & Firestore initialization
        │   ├── controller/
        │   │   └── NominationController.java     # REST API Controller (/api/nominations)
        │   ├── dto/
        │   │   ├── NominationRequest.java        # Request validation payload
        │   │   └── NominationResponse.java       # Standard response schema
        │   └── service/
        │       └── NominationService.java        # Cloud Firestore write logic
        └── resources/
            ├── application.yml                   # Server & Firebase configuration
            └── firebase-service-account.json.example  # Service account credentials template
```

## API Endpoints

### 1. Submit Nomination
- **Route:** `POST /api/nominations`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "nomineeName": "Dr. Ananya Sharma",
  "email": "ananya.sharma@institution.edu",
  "phone": "+91 98765 43210",
  "organization": "Delhi Public School",
  "nomineeDesignation": "Principal / Senior Educator",
  "category": "leadership",
  "nominationTitle": "Transformational STEM & Digital Pedagogy Initiative",
  "nominationDescription": "Detailed dossier outlining over 15 years of exceptional leadership and pedagogy...",
  "keyAchievements": "100% board pass rate, 2 national science awards",
  "yearsOfExperience": "18 Years",
  "city": "New Delhi",
  "state": "Delhi",
  "nominatorName": "Rajesh Verma",
  "nominatorEmail": "rajesh.verma@institution.edu",
  "nominatorPhone": "+91 98111 22233",
  "nominatorRole": "Vice Principal",
  "isSelfNomination": false
}
```

- **Success Response (`201 Created`):**
```json
{
  "success": true,
  "message": "Nomination successfully submitted and recorded.",
  "referenceId": "TR-2026-EDU-8492",
  "documentId": "k3J8s9F2gH1mQ0wE",
  "timestamp": "2026-08-23T13:15:00.000Z"
}
```

### 2. Health Check
- **Route:** `GET /api/nominations/health`
- **Response:** `200 OK` `{"status": "UP", "service": "TuRight National Education Awards Java Backend"}`

---

## Prerequisites & Running Locally

1. **Java Development Kit (JDK 17 or 21)**
2. **Apache Maven 3.8+**
3. **Firebase Service Account Key** (from Firebase Console > Project Settings > Service Accounts > Generate new private key).
   - Save the downloaded file to: `src/main/resources/firebase-service-account.json`

### Commands:
```bash
# Build the Java project
mvn clean package -DskipTests

# Run the Spring Boot application
mvn spring-boot:run
```
The server will start on port `8080`.
