// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBo7KC8DcHi3E49_LGf-N3SYYF0CUswmg8",
    authDomain: "yowp-11792.firebaseapp.com",
    projectId: "yowp-11792",
    storageBucket: "yowp-11792.appspot.com",
    messagingSenderId: "385733694346",
    appId: "1:385733694346:web:38658c0e7b6002e9836e73"
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
