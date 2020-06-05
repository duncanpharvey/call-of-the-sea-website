// flickr photo sizes - https://www.flickr.com/services/api/misc.urls.html
const default_size = 'm';
const api_key = 'd06fdce54f321deaef2c50239191f68c';
const format = 'json';
const flickr_api_url = "https://api.flickr.com/services/rest/";
const nojsoncallback = '1';
const per_page = '24';
const user_id = '188642069@N06';

var currentPage;
var totalPages;
var allLoaded;
var timer;

function getFlickrAlbums() {
    axios.get(flickr_api_url, {
        params: {
            api_key: api_key,
            format: format,
            method: 'flickr.photosets.getList',
            nojsoncallback: nojsoncallback,
            user_id: user_id,
        }
    }).then(response => {
        if (response.data.stat != 'ok') { return; }
        createFlickrAlbumSelect(response.data.photosets.photoset);
    });
}

function getAllFlickrPhotos(page = 1, append = false) {
    axios.get(flickr_api_url, {
        params: {
            api_key: api_key,
            format: format,
            media: 'photos',
            method: 'flickr.photos.search',
            nojsoncallback: nojsoncallback,
            page: page,
            per_page: per_page,
            privacy_filter: '1',
            user_id: user_id
        }
    }).then(response => {
        if (response.data.stat != 'ok') { return; }
        currentPage = response.data.photos.page;
        totalPages = response.data.photos.pages;
        createFlickrPhotoElements(response.data.photos.photo, '', '', append);
    });
}

function getFlickrAlbumPhotos(albumId, page = 1, append = false) {
    axios.get(flickr_api_url, {
        params: {
            api_key: api_key,
            format: format,
            media: 'photos',
            method: 'flickr.photosets.getPhotos',
            nojsoncallback: nojsoncallback,
            page: page,
            per_page: per_page,
            photoset_id: albumId,
            privacy_filter: '1',
            user_id: user_id
        }
    }).then(response => {
        if (response.data.stat != 'ok') { return; }
        currentPage = parseInt(response.data.photoset.page);
        totalPages = parseInt(response.data.photoset.pages);
        var isfeatured = albumId == '72157714587695061' ? true : false;
        createFlickrPhotoElements(response.data.photoset.photo, response.data.photoset.owner, isfeatured, append);
    });
}

function createFlickrAlbumSelect(photosets) {
    var select = document.createElement('select');
    select.setAttribute('id', 'flickr-album');
    select.setAttribute('name', 'flickr-album');
    var options_html = '<option id="all-photos" value="all-photos">All Photos</option>';

    photosets.forEach(photoset => {
        var title = photoset.title._content;
        options_html += `<option id="${photoset.id}" value="${title.replace(/ /g, '-').toLowerCase()}">${title}</option>`;
    });
    select.innerHTML = options_html;

    select.addEventListener('change', function () {
        allLoaded = false;
        var optionId = this.options[this.selectedIndex].id;
        if (optionId == 'all-photos') { getAllFlickrPhotos() }
        else { getFlickrAlbumPhotos(optionId) }
    });

    document.getElementById('flickr-album-container').appendChild(select);
    document.getElementById('72157714587695061').selected = true; // set featured photo album to be the default selected option
}

function createFlickrPhotoElements(photos, owner, isfeatured, append = false) {
    if (isfeatured) { size = 'z'; }
    else { size = default_size; }
    var photo_container = document.getElementById('flickr-photo-container');

    if (!append) { photo_container.innerHTML = ''; }
    photos.forEach(photo => {
        var embed_url = `https://farm${photo.farm}.static.flickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
        var link_url = `https://www.flickr.com/photos/${owner ? owner : photo.owner}/${photo.id}`;

        var photo = `<img class="flickr-photo lazyload${isfeatured ? " isfeatured" : ""}" alt="${photo.title}" src="${embed_url}"></img>`;
        var link = `<a href="${link_url}" target="_blank">${photo}</a>`;

        var photo_wrapper = document.createElement('div');
        photo_wrapper.classList.add('flickr-photo-wrapper');
        photo_wrapper.innerHTML = link;
        photo_container.appendChild(photo_wrapper);
    });
}

function loadMoreFlickrPhotos() {
    var page = currentPage + 1;

    if (page > totalPages) {
        allLoaded = true;
        return;
    }

    var select = document.querySelector('select#flickr-album');
    var optionId = select.options[select.selectedIndex].id;

    if (optionId == 'all-photos') { getAllFlickrPhotos(page, true) }
    else { getFlickrAlbumPhotos(optionId, page, true) }
}

function checkScreenPosition() {
    if (timer) { window.clearTimeout(timer); }

    timer = window.setTimeout(function () {
        var photo_container = document.getElementById('flickr-photo-container');

        // load more Flickr photos when the bottom of window is 200 pixels above the bottom of the photo container
        if (window._fusionScrollTop + window.innerHeight > photo_container.offsetTop + photo_container.offsetHeight - 200 && !allLoaded) { loadMoreFlickrPhotos(); }
    }, 100);
}

getFlickrAlbums();
getFlickrAlbumPhotos('72157714587695061'); // load featured photos by default
document.addEventListener('scroll', checkScreenPosition); // monitor scroll event for infinite scrolling