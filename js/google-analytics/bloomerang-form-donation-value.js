function() {
    var text = {{Click Element}}.value.toLowerCase();
    var regex = /\d+\.\d{2}$/;
    var value;
    if (regex.test(text)) { value = text.match(regex)[0]; }
    else { value = 0; }
    return value;
}