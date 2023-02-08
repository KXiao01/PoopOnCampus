import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { config } from 'dotenv';

config();

initializeApp({
  credential: cert(JSON.parse(process.env.OBJ))
});

const db = getFirestore();

export default db;
