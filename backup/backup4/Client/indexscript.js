document.addEventListener("DOMContentLoaded", function() {

    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all navbar items
            navItems.forEach(item => {
                item.classList.remove('active');
            });

            // Add active class to the clicked navbar item
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            fetchProducts(category);
        });
    });

    const cartIcon = document.querySelector('.cart');
    const purchaseCard = document.getElementById('purchase-card');

    // Add click event listener to the cart icon
    cartIcon.addEventListener('click', function() {
        // Toggle the visibility of the purchase card
        purchaseCard.classList.toggle('hidden');
    });

    const loggedInUser = localStorage.getItem("loggedInUser");    
    updateUsernameDisplay(loggedInUser);

    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCartHandler);
    });

});

function updateUsernameDisplay(username) {
    const usernameDisplay = document.getElementById("username-display");
    if (username) {
        // Clear previous content
        usernameDisplay.innerHTML = '';
        
        // Create and append user icon
        const userIcon = document.createElement("img");
        userIcon.src = "Assets/icons/user.png";
        userIcon.alt = "user";
        usernameDisplay.appendChild(userIcon);
        
        // Create and append username text
        const usernameText = document.createElement("span");
        usernameText.textContent = username;
        usernameDisplay.appendChild(usernameText);
    }else{
        const loginLink = document.createElement("a");
            loginLink.href = "login.html";
            loginLink.textContent = "Login";
            usernameDisplay.appendChild(loginLink);
    }
}

// Add a click event listener to a parent element that contains the dynamically created buttons
document.addEventListener('click', function(event) {
    // Check if the clicked element has the class 'add-to-cart'
    if (event.target.classList.contains('add-to-cart')) {

        addToCartHandler(event);
    }
});

function addToCartHandler(event) {
    // Get the product card
    const productCard = event.target.closest('.card');

    const productId = productCard.id;
    const productTitle = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('p').textContent;

    // Check if the product is already in the cart
    const isInCart = Array.from(document.querySelectorAll('.purchase-item')).some(item => {
        return item.dataset.productId === productId;
    });

    // If the product is not already in the cart, add it
    if (!isInCart) {
        // Create a new element to represent the product in the purchase card
        const purchaseItem = document.createElement('div');
        purchaseItem.classList.add('purchase-item');
        purchaseItem.dataset.productId = productId;
        purchaseItem.innerHTML = `
            <span class="purchase-title">${productTitle}</span>
            <span class="purchase-price">${productPrice}</span>
            <img class="delete-icon" src="Assets/icons/delete.png" alt="delete">
        `;

        // Append the new purchase item to the purchase card
        const purchaseCard = document.getElementById('purchase-card');
        purchaseCard.appendChild(purchaseItem);

        updateBuyButtonVisibility();
    }
}



document.getElementById('purchase-card').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-icon')) {
        const item = event.target.closest('.purchase-item');
        item.remove(); // Remove the item from the purchase cart
        updateBuyButtonVisibility();
    }
});

function updateBuyButtonVisibility() {
    const buyButton = document.getElementById('buy-button');
    const purchaseItems = document.querySelectorAll('.purchase-item');
    if (purchaseItems.length > 0) {
        buyButton.classList.remove('hidden');
        buyButton.textContent = `Buy (${purchaseItems.length})`;
    } else {
        buyButton.classList.add('hidden');
    }
}
