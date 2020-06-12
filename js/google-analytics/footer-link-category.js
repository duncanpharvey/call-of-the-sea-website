function() {
    var category;
    var link = {{Click Element}};
    var text = link.textContent;
    var internal = /callofthesea.org/.test(link.href);
    
    if (internal && link.querySelector('img')) { category = 'image'; }
    else if (link.classList.contains('fusion-social-network-icon')) { category = 'social icon'}
    else if (internal) { category = 'text' }

    return category ? 'nav ' + (['image', 'text'].includes(category) ? 'internal ' : '') + category + ' link' : 'no category';
}