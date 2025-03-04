import { FIREBASE_API_KEY } from "../config/config";
import admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin"; // Import the correct type
 
const serviceAccount = JSON.parse(FIREBASE_API_KEY);

  // Initialize Firebase Admin SDK
   admin.initializeApp({
     credential: admin.credential.cert(serviceAccount), // Cast JSON to ServiceAccount
  });

const db = admin.firestore();

export { db };
