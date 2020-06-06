/*
    https://callofthesea.org/donate/
    https://callofthesea.org/donate/scholarships/
*/

var checkExist = setInterval(function () {
    var form = document.getElementById("donation-form-container");
    if (form) {
        clearInterval(checkExist);
        updateForm(form);
    }
}, 100);

function updateForm(form) {
    var otherAmount = form.querySelector("#other-amount");
    if (otherAmount) {
        otherAmount.placeholder = "0.00";
    }

    var state = form.querySelector("#state");
    if (state) {
        state.value = "CA";
        state.options[0].remove();
    }

    var country = form.querySelector("#country");
    if (country) {
        country.options[0].remove();
    }

    var frequency = form.querySelector("#frequency");
    if (frequency) {
        frequency.options[0].remove();
    }

    var ids = ["donation-amount", "first-name", "last-name", "email-address", "phone-number", "street-address", "city", "state", "zip-code", "comment"];

    for (id of ids) {
        var element = form.querySelector('#' + id);
        if (!element) {
            continue;
        }
        var label = element.labels[0].textContent;

        if (element.classList.contains("required")) {
            label = label.replace('*', '');
        }
        else {
            label += " (Optional)";
        }

        element.placeholder = label;
    }
}