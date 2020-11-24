document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.eventbrite-checkout-button').forEach(checkoutButton => {
        window.EBWidgets.createWidget({
            widgetType: 'checkout',
            eventId: checkoutButton.getAttribute('eventbriteid'),
            modal: true,
            modalTriggerElementId: checkoutButton.id
        });
    });
});