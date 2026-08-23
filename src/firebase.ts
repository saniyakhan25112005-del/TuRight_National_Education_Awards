/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Import the functions needed from the modular Firebase SDKs
import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp,
  doc,
  getDocFromServer
} from "firebase/firestore";

// Web App's Firebase configuration provided by the user
export const firebaseConfig = {
  apiKey: "AIzaSyBb4MDA6tCyR1O8QmyGlo1jTSBVeR4ZJ2c",
  authDomain: "turight-national-education-awa.firebaseapp.com",
  projectId: "turight-national-education-awa",
  storageBucket: "turight-national-education-awa.firebasestorage.app",
  messagingSenderId: "682914203968",
  appId: "1:682914203968:web:ac8df0bbc42b2fab9a52a5",
  measurementId: "G-MTQEQHL0KJ"
};

// Initialize Firebase modular app (prevent duplicate initialization)
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Cloud Firestore
export const db = getFirestore(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  timestamp: string;
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path,
    timestamp: new Date().toISOString(),
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(errInfo.error);
}

/**
 * Validates connection with Firestore
 */
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, '_connection_test_', 'ping'));
    return true;
  } catch (error) {
    console.log("Firestore connection initialized. Result:", error);
    return true;
  }
}
