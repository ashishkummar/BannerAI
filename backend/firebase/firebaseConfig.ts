import { FIREBASE_API_KEY } from "../config/config";
import admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin"; // Import the correct type
 
// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_API_KEY as ServiceAccount), // Cast JSON to ServiceAccount
  });

const db = admin.firestore();

export { db };
