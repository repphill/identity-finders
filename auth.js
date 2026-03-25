// 🔥 Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

// 🔑 YOUR CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBsIKv5VKmSw5VQdBDZ2XV7lYLqTXNpv3I",
  authDomain: "identity-finder.firebaseapp.com",
  projectId: "identity-finder",
  storageBucket: "identity-finder.firebasestorage.app",
  messagingSenderId: "24653884812",
  appId: "1:24653884812:web:fe89dee859de2163893aa9"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🌍 GLOBAL TOKEN
window.userToken = null;

// 🔐 LOGIN FUNCTION
window.login = async function () {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert("Login failed: " + err.message);
  }
};

// 🚪 LOGOUT FUNCTION
window.logout = async function () {
  await signOut(auth);
};

// 🔄 AUTH STATE LISTENER
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // ✅ Get token
    window.userToken = await user.getIdToken();

    // ✅ Show app
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("appPage").style.display = "block";

  } else {
    // ❌ No user
    window.userToken = null;

    document.getElementById("loginPage").style.display = "block";
    document.getElementById("appPage").style.display = "none";
  }
});
