import admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin"; // Import the correct type

// Load service account key
import serviceAccount from "./serviceAccountKey.json"; // Ensure this file is in your backend folder



// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount), // Cast JSON to ServiceAccount
  });

const db = admin.firestore();

export { db };
