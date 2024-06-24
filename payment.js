
const checkoutButton = document.getElementById('checkout');
checkoutButton.addEventListener('click', () => {
    const totalPrice = calculateTotalPrice();

    processPayment(totalPrice);
});

function calculateTotalPrice() {
    const totalElement = document.querySelector('.cart h3');
    return parseInt(totalElement.textContent.split('$')[1]);
}
function processPayment(amount) {
    const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');
    fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount }),
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        return stripe.confirmCardPayment(data.client_secret, {
            payment_method: {
                card: cardElement,
            }
        });
    })
    .then(result => {
        if (result.error) {
            console.error(result.error.message);
        } else {
            alert('Payment successful! Thank you for your purchase.');
        }
    });
}
