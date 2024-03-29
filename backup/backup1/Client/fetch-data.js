document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("http://localhost:5000/products");
        const products = await response.json();

        const productContainer = document.getElementById("product-container");

        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("card");

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

            card.appendChild(cardImg);
            card.appendChild(cardContent);

            productContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});