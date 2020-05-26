function goBack() {
    var urlParams = new URLSearchParams(window.location.search);
    var paymentOrigin = urlParams.get('payment-origin');
    console.log(paymentOrigin);
    if (paymentOrigin) {
        window.location.href = window.location.origin + paymentOrigin;
    }
    else {
        var displayError = document.getElementById('error-message');
        displayError.textContent = "no page to redirect to!";
    }
}