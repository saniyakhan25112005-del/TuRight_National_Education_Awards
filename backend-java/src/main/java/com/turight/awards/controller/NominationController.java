package com.turight.awards.controller;

import com.turight.awards.dto.NominationRequest;
import com.turight.awards.dto.NominationResponse;
import com.turight.awards.service.NominationService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/nominations")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "*"})
public class NominationController {

    private static final Logger log = LoggerFactory.getLogger(NominationController.class);

    private final NominationService nominationService;

    @Autowired
    public NominationController(NominationService nominationService) {
        this.nominationService = nominationService;
    }

    @PostMapping
    public ResponseEntity<NominationResponse> submitNomination(@Valid @RequestBody NominationRequest request) {
        try {
            NominationResponse response = nominationService.saveNomination(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            log.error("Error processing nomination submission: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(NominationResponse.error("Internal Server Error: " + e.getMessage()));
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("service", "TuRight National Education Awards Java Backend");
        health.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(health);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", "Validation failed for one or more fields");
        response.put("errors", errors);

        return ResponseEntity.badRequest().body(response);
    }
}
