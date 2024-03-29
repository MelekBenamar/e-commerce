async function fetchProducts(category) {
    try {
        const response = await fetch(`http://localhost:5003/products?category=${category}`);
        const products = await response.json();

        // Call a function to render the products
        renderProducts(products);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function renderProducts(products) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = '';
    products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("id",product.product_id);

            const cardImg = document.createElement("div");
            cardImg.classList.add("card-img");

            const image = document.createElement("img");
            image.src = `Assets/articels/${product.image}`;
            image.alt = product.title;

            cardImg.appendChild(image);

            const cardContent = document.createElement("div");
            cardContent.classList.add("card-content");

            const title = document.createElement("h3");
            title.textContent = product.title;

            const price = document.createElement("p");
            price.textContent = `Price: $${product.price}`;

            cardContent.appendChild(title);
            cardContent.appendChild(price);

            const addToCartButton = document.createElement("button");
            addToCartButton.classList.add("add-to-cart");
            addToCartButton.textContent = "Add to Cart";

            card.appendChild(cardImg);
            card.appendChild(cardContent);
            card.appendChild(addToCartButton);

            productContainer.appendChild(card);
        })
}

