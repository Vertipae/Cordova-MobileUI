// upon startup create database and swiper
$(document).on("ready", function () {
    databaseHandler.createDatabase();
    // Check if user is already logged in
    var user = window.localStorage.getItem("user");
    if (user) {
        openPage('page1')
    } else {
        new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
    }
});

// Adds user when they click register button
function addUser() {
    var email = $("#txtEmail").val();
    var password = $("#txtPassword").val();
    // Alerts if email is missing else its adds user and closes register menu
    if (!email) {
        alert("Email is required");
    } else {
        var r = confirm("Register?" + "\n" + "Email: " + email + "\n" + "Password: ")
        if (r == true) {
            userHandler.addUser(email, password);
            $("txtEmail").val("");
            $("txtPassword").val("");
        }
        closeMenu('registerMenu')
    }
}

// When user clicks login button 
function login() {
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();
    var userid = "" + email + password
    // call getUser in userHandler
    userHandler.getUser(userid)
}

// Remove credentials from localStorage and open login page
function logout() {
    window.localStorage.removeItem("user");
    openPage('login')
}


// When switching to page where swiper is needed, create new swipers
document.addEventListener('openPage', function (e) {
    if (e.detail.page == 'page4.html') {
        new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
    }
    if (e.detail.page == 'index.html') {
        new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
    }
})



var src = null

// Image preview
function showImage(img) {
    src = document.getElementById(img).src
    openPage('preview', function () {
        src = src.replace('&w=400&h=400&', '&w=600&h=1024&')
        document.getElementById('image-preview').src = src
    })
}

// Geolocation

function getMapLocation() {
    navigator.geolocation.getCurrentPosition
        (onMapSuccess, onMapError, { enableHighAccuracy: true });
}

// Success callback for get geo coordinates
var onMapSuccess = function (position) {

    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    // navigator.geolocation coordinates needs to be converted to other format:
    let center = ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857');

    new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: 'map',
        view: new ol.View({
            center: center,
            zoom: 15
        })
    });
}
// Error callback for get geo coordinates
function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}