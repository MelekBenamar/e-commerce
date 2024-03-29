async function handleBuyButtonClick() {
    try {

        const loggedInNumber = localStorage.getItem("loggedInNumber");
        console.log(loggedInNumber);
        const purchaseItems = document.querySelectorAll('.purchase-item');
        
        // Extract the IDs of the items
        const itemIds = Array.from(purchaseItems).map(item => item.dataset.productId);
        console.log(loggedInNumber,itemIds);
        
        // Send the item IDs to the server
        const response = await fetch('http://localhost:5003/purchases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ loggedInNumber, itemIds })
        });
        
        if (response.ok) {
            // Clear the purchase card on successful purchase
            //clearPurchaseCard();
            alert('Purchase successful!');
        } else {
            alert('Error processing purchase.');
        }
    } catch (error) {
        console.error('Error processing purchase:', error);
        alert('Error processing purchase. Please try again later.');
    }
}

const buyButton = document.getElementById('buy-button');
buyButton.addEventListener('click', handleBuyButtonClick);
