function() {
    var title = document.title.toLowerCase();
    var label = title == 'call of the sea - sail, explore, learn' ? 'home' : title.replace(/ - call of the sea/g, '');
    return 'click ' + label;
}