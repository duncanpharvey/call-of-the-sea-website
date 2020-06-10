function() {
    var label;
    var link = {{Click Element}};
    var text = link.textContent;
    
    if (link.querySelector('img')) {
      image_label = link.getAttribute('aria-label');
      label = image_label ? image_label : 'image';
    }
    else if (text) { label = text; }

    return label ? label.toLowerCase() : 'no link label';
}