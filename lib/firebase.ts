import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

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
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

export function handleFirestoreError(error: any, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface QuizResult {
  id?: string;
  userName: string;
  score: number;
  totalQuestions: number;
  completedAt: any;
}

export async function saveResult(userName: string, score: number, totalQuestions: number) {
  const path = 'results';
  try {
    const docRef = await addDoc(collection(db, path), {
      userName,
      score,
      totalQuestions,
      completedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function subscribeToResults(callback: (results: QuizResult[]) => void) {
  const q = query(collection(db, 'results'), orderBy('completedAt', 'desc'), limit(10));
  return onSnapshot(q, (snapshot) => {
    const results = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as QuizResult[];
    callback(results);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, 'results');
  });
}
