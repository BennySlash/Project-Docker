// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAApg2uRm0goXUx_lCP2dD04hgt9ho8MMM",
  authDomain: "gebeya-auth.firebaseapp.com",
  projectId: "gebeya-auth",
  storageBucket: "gebeya-auth.appspot.com",
  messagingSenderId: "488317991162",
  appId: "1:488317991162:web:b5b3dfd33a471c6b337143",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      //   //   console.log(result);
      //   const name = result.user.displayName;
      //   const email = result.user.displayName;
      //   const profilePhoto = result.user.photoURL;
      //   localStorage.setItem("name", name);
      //   localStorage.setItem("email", email);
      //   localStorage.setItem("pic", profilePhoto);
    })
    .catch((err) => {
      console.log(err);
    });
};
