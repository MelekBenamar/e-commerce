document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const formTitle = document.getElementById("formTitle");
    const loginLink = document.getElementById("loginLink");
    const signupLink = document.getElementById("signupLink");

    function toggleForms() {
        loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
        signupForm.style.display = signupForm.style.display === "none" ? "block" : "none";
        formTitle.innerText = loginForm.style.display === "none" ? "Sign Up" : "Login";
    }

    loginLink.addEventListener('click', toggleForms);
    signupLink.addEventListener('click', toggleForms);
});

function validateSignup() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const login = document.getElementById("fullName").value; // Assuming "Full Name" is used as a login
    const amount = document.getElementById("amount").value;

    if (password !== confirmPassword) {
        alert("Password and Confirm Password do not match.");
        return false;
    }

    if (login.length >= 8) {
        alert("Login must be under 8 characters.");
        return false;
    }

    if (!Number.isInteger(Number(amount))) {
        alert("Amount of Money must be an integer.");
        return false;
    }

    if (password.toLowerCase().includes(login.toLowerCase())) {
        alert("Password must not contain the login.");
        return false;
    }
}