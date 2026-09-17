import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBb4MDA6tCyR1O8QmyGlo1jTSBVeR4ZJ2c",
  authDomain: "turight-national-education-awa.firebaseapp.com",
  projectId: "turight-national-education-awa",
  storageBucket: "turight-national-education-awa.firebasestorage.app",
  messagingSenderId: "682914203968",
  appId: "1:682914203968:web:ac8df0bbc42b2fab9a52a5",
  measurementId: "G-MTQEQHL0KJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testSubmit() {
  try {
    const randomRef = `TR-2026-EDU-1234`;
    const payload = {
      nomineeName: "Test Nominee",
      email: "test@example.com",
      nomineeEmail: "test@example.com",
      phone: "+91 9876543210",
      nomineePhone: "+91 9876543210",
      organization: "Test Org",
      institution: "Test Org",
      nomineeDesignation: "Educator / Leader",
      category: "cat-1",
      nominationDescription: "This is a very detailed description that is at least 40 characters long.",
      nominationTitle: "Test Title",
      keyAchievements: "Key achievements go here",
      yearsOfExperience: "Not specified",
      supportingInformation: "",
      websiteUrl: "",
      city: "Bangalore",
      state: "Karnataka",
      nominatorName: "Test Nominator",
      nominatorEmail: "nominator@test.com",
      nominatorPhone: "+91 1122334455",
      nominatorRole: "Nominator",
      nominatorInstitution: "Test Org",
      isSelfNomination: false,
      documentName: null,
      documentSize: null,
      photoName: null,
      status: "submitted",
      referenceId: randomRef,
      createdAt: serverTimestamp(),
      submittedAt: new Date().toISOString(),
    };
    
    console.log("Submitting payload to Firestore...");
    const docRef = await addDoc(collection(db, "nominations"), payload);
    console.log("Success! Document written with ID: ", docRef.id);
  } catch (err) {
    console.error("Submission failed: ", err);
  }
}

testSubmit();
