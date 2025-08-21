import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaPBVi9BkwaUPBbildIKinROi1DGjxPzw",
  authDomain: "the-movie-skinfa.firebaseapp.com",
  projectId: "the-movie-skinfa",
  storageBucket: "the-movie-skinfa.appspot.com",
  messagingSenderId: "745593031018",
  appId: "1:745593031018:android:e83bbabf54ca4df36ebd13"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Auth
export const auth = getAuth(app);
