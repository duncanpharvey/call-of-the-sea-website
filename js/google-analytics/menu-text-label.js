/*
    https://callofthesea.org/ -> home
    https://callofthesea.org/about-us/ -> about us
    https://callofthesea.org/sail-with-us/ -> sail with us
*/

function() {
    var url = {{Click URL}};
    var len = url.length;
    var label;
    if (url.search("callofthesea.org\/$") != -1) {
        label = 'home';
    } else {
        label = url.slice(url.lastIndexOf('/', len - 2) + 1, len - 1).replace(/-/g, ' ');
    }
    return label;
}