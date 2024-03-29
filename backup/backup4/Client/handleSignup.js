async function handleSignup() {
    const password = document.getElementById("passwordSignup").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const username = document.getElementById("usernameSignup").value;
    const email = document.getElementById("email").value;
    const num = document.getElementById("num").value;
    const amount = document.getElementById("amount").value;

    if (password !== confirmPassword) {
        alert("Password and Confirm Password do not match.");
        return false;
    }

    if (username.length >= 8) {
        alert("Username must be under 8 characters.");
        return false;
    }

    if (!Number.isInteger(Number(amount))) {
        alert("Amount of Money must be an integer.");
        return false;
    }

    if (password.toLowerCase().includes(username.toLowerCase())) {
        alert("Password must not contain the login.");
        return false;
    }

    // Create user data object
    const userData = {
        username: username, // Assuming "Full Name" is used as a username
        password: password,
        email: email,
        num: num,
        amount: parseInt(amount) // Parse amount to an integer
    };

    try {
        // Send POST request to add user to e-commerce table
        const response = await fetch('http://localhost:5003/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        // Check response status
        if (response.ok) {
            alert('User added successfully!');

            toggleForms();
        } else {
            // If adding user fails
            const data = await response.json();
            alert(`Failed to add user: ${data.message}`);
        }
    } catch (error) {
        console.error('Error adding user:', error);
        alert('An error occurred while adding user. Please try again later.');
    }
}


function toggleForms() {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const formTitle = document.getElementById("formTitle");

    loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
    signupForm.style.display = signupForm.style.display === "none" ? "block" : "none";
    formTitle.innerText = loginForm.style.display === "none" ? "Sign Up" : "Login";
}