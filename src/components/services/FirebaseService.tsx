import { getApp, initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { firebaseConfig } from "./FirebaseConfig";
import { getStorage } from "firebase/storage";
let app: any = null;
const firebase = firebaseConfig;
export function initFirebase() {
  if (!app) return (app = initializeApp(firebase));
}
export const storage = getStorage(initFirebase());

export function getStore() {
  initFirebase();
  const app = getApp();
  return initializeFirestore(app, { ignoreUndefinedProperties: true });
}
