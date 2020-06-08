function initializeForm(form) {
    var field_ids;

    if (form.id == 'donation-form-container') {
        var state = form.querySelector('#state');
        if (state) { state.value = 'CA'; }

        field_ids = '#donation-amount, #first-name, #last-name, #email-address, #phone-number, #street-address, #city, #state, #zip-code, #comment';
    }
    else if (form.id == 'email-registration-form-container') {
        field_ids = '#first-name, #last-name, #email-address';
    }
    else {
        console.log('No donation or email registration form to initialize');
        return;
    }

    form.querySelectorAll(field_ids + ', .custom-fields > .field.text > input').forEach(field => {
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
            initializeForm(form);
            observer.disconnect();
        }
    });

    observer.observe(document.body, { attributes: false, childList: true, characterData: false, subtree: true });
});