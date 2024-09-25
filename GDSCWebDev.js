let cart = [];
function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}
function displayProducts(products) {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}">
                <p>${product.title}</p>
                <p>⭐ ${product.rating.rate}</p>
                <p>₹${product.price}</p>
                <button onclick="addToCart('${product.id}', '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
            </div>
        `;
        productsContainer.innerHTML += productHTML;
    });
}

function addToCart(productId, productName, price, imageUrl) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1; 
    } else {
        cart.push({ id: productId, name: productName, price: price, image: imageUrl, quantity: 1 });
    }
    
    renderCart();
}
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}
function updateQuantity(productId, action) {
    const item = cart.find(item => item.id === productId);

    if (item) {
        if (action === 'increase') {
            item.quantity += 1;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity -= 1;
        }
    }
    renderCart();
}
function renderCart() {
    const cartContainer = document.querySelector('.cart');
    const totalAmountElement = document.querySelector('.price-details h3');
    cartContainer.innerHTML = '<h2>Cart</h2><br>'; 

    let totalAmount = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover;">
                <div>
                    <p>${item.name}</p>
                    <p>₹${item.price}</p>
                </div>
                <div class="quantity">
                    <button onclick="updateQuantity('${item.id}', 'decrease')">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', 'increase')">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">×</button>
            </div>
        `;
    });
    totalAmountElement.textContent = `Total Amount: ₹${totalAmount.toFixed(2)}`;
}

fetchProducts();
