function() {
    var category;
    var link = {{Click Element}};
    var text = link.textContent;
    
    if (link.querySelector('img')) { category = 'image'; }
    else if (link.classList.contains('fusion-button')) { category = 'button'}
    else { category = 'text' }

    return 'nav internal ' + category + ' link';
}