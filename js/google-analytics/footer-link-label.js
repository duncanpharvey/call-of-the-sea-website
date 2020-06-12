function() {
    var label;
    var link = {{Click Element}};
    var image = link.querySelector('img');
    var text = link.textContent;
    var internal = /callofthesea.org/.test(link.href);
    
    if (internal && image) { label = image.alt; }
    else if (link.classList.contains('fusion-social-network-icon')) { label = link.title; }
    else if (internal && text) { label = text; }

    return label ? label.toLowerCase() : 'no link label';
}