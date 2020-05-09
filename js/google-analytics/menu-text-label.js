/*
    https://callofthesea.org/ -> home
    https://callofthesea.org/about-us/ -> about us
    https://callofthesea.org/sail-with-us/ -> sail with us
*/

function() {
    var url = {{Click URL}};
    var label;
    if (url.search(/callofthesea.org\/$/) != -1) {
        label = "home";
    } else {
        label = url.match(/callofthesea.org\/.*\/$/)[0].slice(17, -1).replace(/-/g, ' ');
    }
    return label;
}