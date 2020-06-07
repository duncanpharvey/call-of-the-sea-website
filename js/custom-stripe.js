document.addEventListener('DOMContentLoaded', () => {
    var stripe = Stripe('pk_live_gRv3aIGUimO32fejEm3OszCY');

    document.querySelectorAll('.stripe-checkout-button').forEach(checkoutButton => {
        var error_message_container = document.createElement('div');
        error_message_container.id = `error-message-${checkoutButton.id}`;
        error_message_container.classList.add('custom-error-message');
        checkoutButton.insertAdjacentElement('afterend', error_message_container);

        checkoutButton.addEventListener('click', () => {
            stripe.redirectToCheckout({
                lineItems: [{ price: checkoutButton.id, quantity: 1 }],
                mode: 'payment',
                successUrl: window.location.origin + '/payment-success/?payment-origin=' + window.location.pathname,
                cancelUrl: window.location.href,
            }).then((result) => {
                if (result.error) {
                    var displayError = document.getElementById(`error-message-${checkoutButton.id}`);
                    displayError.textContent = result.error.message;
                }
            });
        });
    });
});