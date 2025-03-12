// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

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
