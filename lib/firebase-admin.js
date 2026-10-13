import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';

const APP_NAME = 'star-prime-site-api';

export { FieldValue };

export function getAdminFirestore() {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!serviceAccountJson) return null;

  const existingApp = getApps().find((app) => app.name === APP_NAME);
  const app = existingApp || initializeApp({
    credential: cert(JSON.parse(serviceAccountJson)),
  }, APP_NAME);

  return getFirestore(app);
}
