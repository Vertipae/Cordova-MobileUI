$(document).on("ready", function () {
    databaseHandler.createDatabase();
});

function addUser() {
    var email = $("#txtEmail").val();
    var password = $("#txtPassword").val();

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

function login() {
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();
    var userid = "" + email + password
    userHandler.getUser(userid)
}



document.addEventListener('openPage', function (e) {
    if (e.detail.page == 'page4.html') {
        new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
    }
})

var src = null

function showImage(img) {
    src = document.getElementById(img).src
    openPage('preview', function () {
        src = src.replace('&w=400&h=400&', '&w=600&h=1024&')
        document.getElementById('image-preview').src = src
    })
}


