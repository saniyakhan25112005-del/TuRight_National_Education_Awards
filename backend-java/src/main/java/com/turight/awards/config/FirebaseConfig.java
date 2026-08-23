package com.turight.awards.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    private static final Logger log = LoggerFactory.getLogger(FirebaseConfig.class);

    @Value("${firebase.project-id:turight-national-education-awa}")
    private String projectId;

    @Value("${firebase.credentials.path:classpath:firebase-service-account.json}")
    private Resource serviceAccountResource;

    @PostConstruct
    public void initializeFirebase() {
        if (!FirebaseApp.getApps().isEmpty()) {
            log.info("Firebase Application already initialized.");
            return;
        }

        try {
            FirebaseOptions.Builder optionsBuilder = FirebaseOptions.builder()
                    .setProjectId(projectId);

            if (serviceAccountResource != null && serviceAccountResource.exists()) {
                try (InputStream serviceAccount = serviceAccountResource.getInputStream()) {
                    optionsBuilder.setCredentials(GoogleCredentials.fromStream(serviceAccount));
                    log.info("Initializing Firebase Admin with provided Service Account JSON.");
                }
            } else {
                // Fallback to Google Application Default Credentials (e.g. on Google Cloud Run, GKE, or GCP VM)
                log.info("No service account file specified or found; using Google Application Default Credentials for project: {}", projectId);
                optionsBuilder.setCredentials(GoogleCredentials.getApplicationDefault());
            }

            FirebaseApp.initializeApp(optionsBuilder.build());
            log.info("Firebase Admin SDK successfully initialized for TuRight National Education Awards.");
        } catch (IOException e) {
            log.warn("Could not load Google Credentials. Using default mock configuration for offline development: {}", e.getMessage());
            try {
                FirebaseOptions options = FirebaseOptions.builder()
                        .setProjectId(projectId)
                        .build();
                FirebaseApp.initializeApp(options);
            } catch (Exception ex) {
                log.error("Failed to initialize Firebase App: {}", ex.getMessage());
            }
        }
    }

    @Bean
    public Firestore firestore() {
        return FirestoreClient.getFirestore();
    }
}
