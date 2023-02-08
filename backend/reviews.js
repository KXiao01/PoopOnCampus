import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import creds from './creds.js';


initializeApp({
  credential: cert(creds)
});

const db = getFirestore();
const colRef = await db.collection("toilets").where("id", "==", "CLB").get();

colRef.forEach((doc) => {
  console.log(doc.data());
})





