$(function () {

    // Menu on mobile
    $('.navbar-toggler').on('click', function () {
        $('body').toggleClass('menu-open');
        $('li').removeClass('menu-expand');
    });

    $('.fa-arrow-right').on('click', function () {
        $(this).parent('li').siblings().removeClass('menu-expand');
        $(this).parent('li').toggleClass('menu-expand');
    });

    // Open Search
    $('.header-search-toggle').click(function (e) {
        e.preventDefault();
        var $this = $(this),
            $body = $('body');

        $body.toggleClass('show-search overflow-hidden');
    });

    // Image Gallery
    if ($('.filtr-container').length) {
        $('.filtr-container').filterizr({
            animationDuration: 0.3,
            delayMode: 'progressive',
            easing: 'ease-out',
            filter: 'all',
        });
    }

    $('.filter-nav li').on('click', function () {
        $('.filter-nav li').removeClass('active');
        $(this).addClass('active');
        var filter = $(this).data('fltr');
    });

    $('.image-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    // Scroll To Top
    $('#toTopBtn').fadeOut();
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 40) {
            $('#toTopBtn').fadeIn();
        } else {
            $('#toTopBtn').fadeOut();
        }
    });

    $('#toTopBtn').on('click', function () {
        $("html, body").animate({
            scrollTop: 0
        }, 10);
        return false;
    });

    // AOS Init
    AOS.init();

    $('#heroBanner').on('slide.bs.carousel', function (e) {
        $(".carousel-item-content span").removeClass('aos-animate');
        $(".carousel-item-content h2").removeClass('aos-animate');
        $(".carousel-item-content i").removeClass('aos-animate');
        $(".carousel-item-content .btn").removeClass('aos-animate');

        setTimeout(function () {
            $(".carousel-item-content span").addClass('aos-animate');
            $(".carousel-item-content h2").addClass('aos-animate');
            $(".carousel-item-content i").addClass('aos-animate');
            $(".carousel-item-content .btn").addClass('aos-animate');
        }, 1);
    });

    // Adding Class on Scroll
    $(window).on('load', function () {
        var winOffset = document.documentElement.scrollTop || document.body.scrollTop;
        if (winOffset > 1) {
            $('body').addClass('nav-fixed');
        }
    });
    $(window).on('scroll', function () {
        var winOffset = document.documentElement.scrollTop || document.body.scrollTop;
        if (winOffset > 1) {
            $('body').addClass('nav-fixed');
        } else {
            $('body').removeClass('nav-fixed');
        }
    });

    // Google Map

    function initialize() {

        //replace this variable with the json you generate in the google maps api wizard tool
        //Styles Start
        var styles = [{ "featureType": "landscape", "stylers": [{ "saturation": -100 }, { "lightness": 60 }] }, { "featureType": "road.local", "stylers": [{ "saturation": -100 }, { "lightness": 40 }, { "visibility": "on" }] }, { "featureType": "transit", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "administrative.province", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "stylers": [{ "visibility": "on" }, { "lightness": 30 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ef8c25" }, { "lightness": 40 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#b6c54c" }, { "lightness": 40 }, { "saturation": -40 }] }, {}];
        //Styles End

        //Create a styled map using the above styles
        var styledMap = new google.maps.StyledMapType(styles, { name: "Styled Map" });

        var mapProp = {
            center: new google.maps.LatLng($(".latitude").val(), $(".longitude").val()), //set the centre of the map. In my case it is the same as the position of the map pin.
            zoom: 17,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

        //Set the map to use the styled map
        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');

        //Create a marker pin to add to the map
        var marker;
        marker = new google.maps.Marker({
            position: new google.maps.LatLng($(".latitude").val(), $(".longitude").val()), //set the position of the pin
            map: map,
            title: "",
            icon: "./assets/map-marker.png",
            animation: google.maps.Animation.BOUNCE
        });
    }

    if ($('#googleMap').length) {
        google.maps.event.addDomListener(window, 'load', initialize);
    }

    // Form Validation
    (function () {
        'use strict';
        window.addEventListener('load', function () {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('contact-form');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function (form) {
                form.addEventListener('submit', function (event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);

    })();
})

$(".counter").counter();
