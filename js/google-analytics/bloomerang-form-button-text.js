function() {
    var text = {{Click Element}}.value.toLowerCase();
    var label;
    if (/donate/.test(text)) { label = 'donate' }
    else { label = text; }
    return label;
}