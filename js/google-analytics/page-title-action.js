function() {
    return "click " + document.querySelector('meta[property = "og:title"]').content.toLowerCase();
}