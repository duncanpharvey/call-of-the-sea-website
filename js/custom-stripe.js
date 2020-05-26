document.addEventListener("DOMContentLoaded", () => {
    var stripe = Stripe('pk_test_dN3uwiG2EgJb92Epj7EQFSKz');

    window.stripePriceIds.forEach(priceId => {
        var checkoutButton = document.getElementById(priceId);
        checkoutButton.addEventListener('click', function () {
            stripe.redirectToCheckout({
                lineItems: [{ price: priceId, quantity: 1 }],
                mode: 'payment',
                successUrl: window.location.origin + '/payment-success/?payment-origin=' + window.location.pathname,
                cancelUrl: window.location.href,
            }).then(function (result) {
                if (result.error) {
                    var displayError = document.getElementById('error-message');
                    displayError.textContent = result.error.message;
                }
            });
        });
    });
});