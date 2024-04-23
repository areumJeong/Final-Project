import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GithubAuthProvider, signInWithPopup, 
  signOut, updateProfile, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function register({ email, password, name, photo }) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return updateProfile(user, {
        displayName: name,
        photoURL: photo
      });
    })
    .catch(error => {
      console.error("Error registering user:", error.message);
    });
}

export function login({ email, password }) {
  signInWithEmailAndPassword(auth, email, password)
    .catch(error => {
      console.error("Error logging in:", error.message);
    });
}

export function loginWithGithub() {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .catch(error => {
      console.error("Error logging in with Github:", error.message);
    });
}

export function logout() {
  signOut(auth)
    .catch(error => {
      console.error("Error logging out:", error.message);
    });
}

export function onUserStateChanged(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}