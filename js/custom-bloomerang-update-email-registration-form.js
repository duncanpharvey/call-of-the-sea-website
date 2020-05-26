/*
https://callofthesea.org/sign-up-for-newsletter/
https://callofthesea.org/contact-us/
*/

var checkExist = setInterval(function () {
    var form = document.getElementById("email-registration-form-container");
    if (form) {
        clearInterval(checkExist);
        updateForm(form);
    }
}, 100);

function updateForm(form) {
    var ids = ["first-name", "last-name", "email-address", "CustomAccountField_185344", "CustomAccountField_5148673"];

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