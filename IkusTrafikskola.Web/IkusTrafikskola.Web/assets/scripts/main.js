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

    //Open Action Modal
    if (sessionStorage.getItem('#myModal') !== 'true' && $(".modal-status").val()) {
        $('#myModal').modal('show');
        sessionStorage.setItem('#myModal', 'true');
    }

})

$(".counter").counter();
