// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARwsPQOMNbrGVlIM6AJKHmg0mWDl445gU",
    authDomain: "farmify-d901b.firebaseapp.com",
    projectId: "farmify-d901b",
    storageBucket: "farmify-d901b.firebasestorage.app",
    messagingSenderId: "782437842701",
    appId: "1:782437842701:web:af941448a8ad8ecb4aba44",
    measurementId: "G-F2S0ZV5KGD"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Ensure DOM is fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
    const signupBtn = document.getElementById("signup-btn");
    
    if (!signupBtn) {
        console.error("❌ signup-btn not found in DOM!");
        return;
    }

    signupBtn.addEventListener("click", function () {
        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value.trim();

        if (email === "" || password === "") {
            alert("Please fill in both fields.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("✅ Sign-up successful! Redirecting to login...");
                window.location.href = "/"; 
            })
            .catch((error) => {
                console.error("Firebase Auth Error:", error);
                alert("❌ Error: " + error.message);
            });
    });
});
