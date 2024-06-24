let cart = [];
const addToCartButtons = document.querySelectorAll('.product button');
addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const selectedProduct = {
            id: index + 1,
            name: button.parentElement.querySelector('h3').innerText,
            price: button.parentElement.querySelector('span').innerText
        };
        addToCart(selectedProduct);
    });
});
function addToCart(product) {
    cart.push(product);
    updateCartUI();
}
function updateCartUI() {
    const cartElement = document.querySelector('.cart');
    cartElement.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="product${item.id}.jpg" alt="${item.name}">
            <h4>${item.name}</h4>
            <span>${item.price}</span>
        `;
        cartElement.appendChild(cartItem);
    });

    calculateTotal();
}
function calculateTotal() {
    const totalElement = document.createElement('h3');
    const totalPrice = cart.reduce((acc, item) => acc + parseInt(item.price.slice(1)), 0);
    totalElement.textContent = `Total: $${totalPrice}`;
    
    const cartElement = document.querySelector('.cart');
    cartElement.appendChild(totalElement);
}
