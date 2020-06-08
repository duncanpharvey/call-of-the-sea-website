function returnToSailDetails() {
    var urlParams = new URLSearchParams(window.location.search);
    var paymentOrigin = urlParams.get('payment-origin');
    if (paymentOrigin) {
        window.location.href = window.location.origin + paymentOrigin;
    }
    else {
        document.getElementById('error-message').textContent = 'There is no page to return to!';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    var sail_details_button = document.getElementById('return-to-sail-details-button');

    if (sail_details_button) {
        var error_message_container = document.createElement('div');
        error_message_container.id = 'error-message';
        error_message_container.classList.add('custom-error-message');
        sail_details_button.insertAdjacentElement('afterend', error_message_container);
    }
});