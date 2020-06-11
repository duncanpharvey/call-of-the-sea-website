// flickr photo sizes - https://www.flickr.com/services/api/misc.urls.html
const default_size = 'm';
const api_key = 'd06fdce54f321deaef2c50239191f68c';
const format = 'json';
const flickr_api_url = 'https://api.flickr.com/services/rest/';
const nojsoncallback = '1';
const per_page = '24';
const user_id = '188642069@N06';

var currentPage = 1;
var timer;
var totalPages;

async function getFlickrAlbums() {
    await axios.get(flickr_api_url, {
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

async function getAllFlickrPhotos() {
    await axios.get(flickr_api_url, {
        params: {
            api_key: api_key,
            format: format,
            media: 'photos',
            method: 'flickr.photos.search',
            nojsoncallback: nojsoncallback,
            page: currentPage,
            per_page: per_page,
            privacy_filter: '1',
            user_id: user_id
        }
    }).then(response => {
        if (response.data.stat != 'ok') { return; }
        totalPages = parseInt(response.data.photos.pages);
        createFlickrPhotoElements(response.data.photos.photo, '', '');
    });
}

async function getFlickrAlbumPhotos(albumId) {
    await axios.get(flickr_api_url, {
        params: {
            api_key: api_key,
            format: format,
            media: 'photos',
            method: 'flickr.photosets.getPhotos',
            nojsoncallback: nojsoncallback,
            page: currentPage,
            per_page: per_page,
            photoset_id: albumId,
            privacy_filter: '1',
            user_id: user_id
        }
    }).then(response => {
        if (response.data.stat != 'ok') { return; }
        var featured = albumId == '72157714587695061' ? true : false;
        totalPages = parseInt(response.data.photoset.pages);
        createFlickrPhotoElements(response.data.photoset.photo, response.data.photoset.owner, featured);
    });
}

function createFlickrAlbumSelect(photosets) {
    var select = document.createElement('select');
    select.setAttribute('id', 'flickr-album');
    select.setAttribute('name', 'flickr-album');
    var options_html = '<option id="all-photos" value="all-photos">All Photos</option>';

    photosets.sort((a, b) => {
        // sort featured photos before other albums, just below all photos
        if (a.id == '72157714587695061') { return -1; }
        else if (b.id == '72157714587695061') { return 1; }

        var title_a = a.title._content.toLowerCase();
        var title_b = b.title._content.toLowerCase();
        if (title_a < title_b) { return -1; }
        else if (title_a > title_b) { return 1; }
        return 0;
    });

    photosets.forEach(photoset => {
        var title = photoset.title._content;
        options_html += `<option id="${photoset.id}" value="${title.replace(/ /g, '-').toLowerCase()}">${title}</option>`;
    });
    select.innerHTML = options_html;

    document.getElementById('flickr-album-container').appendChild(select);

    // use query parameter in url if available to default select option, otherwise use featured photos.
    // If for some reason featured photos does not exist, use all photos
    var urlParams = new URLSearchParams(window.location.search);
    var album = urlParams.get('album');
    try { select.querySelector('option[value = "' + album.replace(/ /g, '-').toLowerCase() + '"]').selected = true; }
    catch {
        var option = document.getElementById('72157714587695061');
        if (option) { option.selected = true; }
        else { document.getElementById('all-photos').selected = true; }
    }

    select.addEventListener('change', function () {
        var new_param = new URLSearchParams();
        new_param.set('album', this.options[this.selectedIndex].value);
        history.pushState(null, null, `?${new_param.toString()}`);
        currentPage = 1;
        loadFlickrPhotos();
    });
}

function createFlickrPhotoElements(photos, owner, featured) {
    if (featured) { size = 'z'; }
    else { size = default_size; }

    var photo_container = document.getElementById('flickr-photo-container');
    if (currentPage == 1) { photo_container.innerHTML = ''; }

    photos.forEach(photo => {
        var embed_url = `https://farm${photo.farm}.static.flickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
        var link_url = `https://www.flickr.com/photos/${owner ? owner : photo.owner}/${photo.id}`;

        var photo = `<img class="flickr-photo lazyload${featured ? " featured" : ""}" alt="${photo.title}" src="${embed_url}"></img>`;
        var link = `<a href="${link_url}" target="_blank">${photo}</a>`;

        var photo_wrapper = document.createElement('div');
        photo_wrapper.classList.add('flickr-photo-wrapper');
        photo_wrapper.innerHTML = link;
        photo_container.appendChild(photo_wrapper);
    });
}

async function loadFlickrPhotos() {
    var select = document.querySelector('select#flickr-album');
    var optionId = select.options[select.selectedIndex].id;
    if (optionId == 'all-photos') { await getAllFlickrPhotos() }
    else { await getFlickrAlbumPhotos(optionId) }
}

async function checkScreenPosition() {
    if (timer) { window.clearTimeout(timer); }

    timer = window.setTimeout(() => {
        var photo_container = document.getElementById('flickr-photo-container');

        // load more Flickr photos when the bottom of window is 400 pixels above the bottom of the photo container
        if (window._fusionScrollTop + window.innerHeight > photo_container.offsetTop + photo_container.offsetHeight - 400 && currentPage < totalPages) {
            currentPage++;
            loadFlickrPhotos();
        }
    }, 100);
}

async function initializePage() {
    var flickr_container = document.getElementById('flickr-container');
    if (!flickr_container) { return; }

    var flickr_album_container = document.createElement('flickr-album-container');
    var flickr_photo_container = document.createElement('flickr-photo-container');
    flickr_album_container.id = 'flickr-album-container';
    flickr_photo_container.id = 'flickr-photo-container';
    flickr_container.appendChild(flickr_album_container);
    flickr_container.appendChild(flickr_photo_container);

    getFlickrAlbums().then(async () => {
        await loadFlickrPhotos();
        document.addEventListener('scroll', checkScreenPosition); // monitor scroll event for infinite scrolling
    });
}

document.addEventListener('DOMContentLoaded', initializePage);