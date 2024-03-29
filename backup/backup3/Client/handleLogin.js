async function handleLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if username and password are not empty
    if (username.trim() === '' || password.trim() === '') {
        alert("Please enter both username and password.");
        return false;
    }

    try {
        const response = await fetch(`http://localhost:5003/users/login?username=${username}&password=${password}`);
        const data = await response.json();
        
        if (data.exists) {

            alert('Logging in...');

            localStorage.setItem("loggedInUser", username);
            window.location.href = "index.html";

        } else {
            alert('User does not exist!');
            // Handle what to do if the username does not exist
        }
    } catch (error) {
        console.error('Error checking user:', error);
        alert('An error occurred while checking user. Please try again later.');
    }
}