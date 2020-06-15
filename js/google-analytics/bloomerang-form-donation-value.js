function() {
    var text = {{Click Element}}.value.toLowerCase();
    var regex = /\$(\d|,|\.)+$/;
    var value;
    if (regex.test(text)) { value = parseInt(text.match(regex)[0].slice(1).replace(/,/g, '')); }
    else { value = 0; }
    return value;
}