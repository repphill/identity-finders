// 🔥 Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

// 🔑 Your Firebase config (CLEANED)
const firebaseConfig = {
  apiKey: "AIzaSyBsIKv5VKmSw5VQdBDZ2XV7lYLqTXNpv3I",
  authDomain: "identity-finder.firebaseapp.com",
  projectId: "identity-finder",
  storageBucket: "identity-finder.firebasestorage.app",
  messagingSenderId: "24653884812",
  appId: "1:24653884812:web:fe89dee859de2163893aa9"
};

// 🚀 Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔐 Login function
window.login = async function () {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("appPage").style.display = "block";

  } catch (err) {
    alert(err.message);
  }
};
