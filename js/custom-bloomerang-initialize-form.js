function initializeForm(form) {
    form.classList.add('bloomerang-form');

    var state = form.querySelector('#state');
    if (state) { state.value = 'CA'; }

    form.querySelectorAll('input[type=text], input[type=email], input[type=tel], input[type=number], textarea:not(.g-recaptcha-response)').forEach(field => {
        var label = field.labels[0].textContent;
        if (field.classList.contains('required')) { label = label.replace('*', ''); }
        else { label += ' (Optional)'; }
        field.placeholder = label;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    var error_message_container = document.createElement('div');
    error_message_container.id = 'error-message';
    error_message_container.classList.add('custom-error-message');
    document.querySelector('main#main').insertAdjacentElement('afterbegin', error_message_container);

    var bloomerang_form_scripts = document.querySelectorAll('script[src^="https://s3-us-west-2.amazonaws.com/bloomerang-public-cdn/callofthesea/.widget-js/"]');
    if (bloomerang_form_scripts.length > 1) {
        error_message_container.textContent = 'Only one Bloomerang form can be used on each page';
        return;
    }

    var observer = new MutationObserver(() => {
        var form = document.querySelector('#donation-form-container, #email-registration-form-container');
        if (form) {
            observer.disconnect();
            initializeForm(form);
        }
    });

    observer.observe(document.body, { attributes: false, childList: true, characterData: false, subtree: true });
});