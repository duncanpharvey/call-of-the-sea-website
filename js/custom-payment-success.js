function goBack() {
    var urlParams = new URLSearchParams(window.location.search);
    var paymentOrigin = urlParams.get('payment-origin');
    if (paymentOrigin) {
        window.location.href = window.location.origin + paymentOrigin;
    }
    else {
        document.getElementById('error-message').textContent = "There is no page to return to!";
    }
}