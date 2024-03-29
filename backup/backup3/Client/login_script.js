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

async function handleLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if username and password are not empty
    if (username.trim() === '' || password.trim() === '') {
        alert("Please enter both username and password.");
        return false;
    }

    try {
        const response = await fetch('http://localhost:5003/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });


        if (response.ok) {
            const data = await response.json();
            console.log(data);
            if (data.success) {
                // Login successful, store user information in local storage
                localStorage.setItem("loggedInUser", JSON.stringify({ username }));
                // Redirect to index.html after successful login
                //window.location.href = "index.html";
            } else {
                alert(data.message); // Display error message returned from the server
            }
        } else {
            console.error('Login request failed:', response.statusText);
            alert("Failed to login. Please try again later.");
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert("An unexpected error occurred. Please try again later.");
    }

    // Prevent form submission (since it's a submit button)
    return false;
}


