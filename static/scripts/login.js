// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

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

// Function to check if a file exists before redirecting
async function fileExists(url) {
    try {
        const response = await fetch(url, { method: "HEAD" });
        return response.ok;
    } catch (error) {
        console.error("Error checking file:", error);
        return false;
    }
}

// Handle login with email/password
document.getElementById('submit').addEventListener("click", async function(event) {
    event.preventDefault();

    // Get user input
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (email === "" || password === "") {
        alert("Please fill in both email and password.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            alert("Login successful!");

            // Try both Flask route & direct file navigation
            if (await fileExists("/mainsec.html")) {
                window.location.href = "/mainsec.html";  // Direct file access
            } else {
                window.location.href = "/mainsec";  // Flask route
            }
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Handle login with Google
async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(async (result) => {
            alert("Google Login Successful!");

            // Try both Flask route & direct file navigation
            if (await fileExists("/mainsec.html")) {
                window.location.href = "/mainsec.html";  // Direct file access
            } else {
                window.location.href = "/mainsec";  // Flask route
            }
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Attach Google login function to window so it's accessible in HTML
window.loginWithGoogle = loginWithGoogle;
