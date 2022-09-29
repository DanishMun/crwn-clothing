import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1Q1tFszSub14G70QEioORKzLgO0JAhCU",
  authDomain: "crwn-clothing-db-8981b.firebaseapp.com",
  projectId: "crwn-clothing-db-8981b",
  storageBucket: "crwn-clothing-db-8981b.appspot.com",
  messagingSenderId: "895552618573",
  appId: "1:895552618573:web:249f421ef1f9dace971c04",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();
// creating firestore db and storing
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
// creating authenitcation  user
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
//signing in
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

//singing out

export const signOutUser = async () => await signOut(auth);

// observer listner
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
