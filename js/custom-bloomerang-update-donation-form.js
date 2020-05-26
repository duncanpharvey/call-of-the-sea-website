function updateDonationForm() {
    var otherAmount = document.getElementById("other-amount");
    if (otherAmount) {
        otherAmount.placeholder = "0.00";
    }

    var state = document.getElementById("state");
    if (state) {
        state.value = "CA";
        state.options[0].remove();
    }

    var country = document.getElementById("country");
    if (country) {
        country.options[0].remove();
    }

    var frequency = document.getElementById("frequency");
    if (frequency) {
        frequency.options[0].remove();
    }

    var ids = ["donation-amount", "first-name", "last-name", "email-address", "phone-number", "street-address", "city", "state", "zip-code", "comment"];

    for (id of ids) {
        var element = document.getElementById(id);
        if (!element) {
            continue;
        }
        var label = element.labels[0].textContent;

        if (element.classList.contains("required")) {
            label = label.replace('*', '');
        } else {
            label += " (Optional)";
        }

        element.placeholder = label;
    }
}

var checkExist = setInterval(function() {
    if (document.getElementById("donation-form-container")) {
        clearInterval(checkExist);
        updateDonationForm();
    }
}, 100);