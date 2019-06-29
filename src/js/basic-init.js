$(document).ready(function () {
    'use strict';

    // WOW
    new WOW().init();

    // masked input
    $('input[type="tel"]').mask("+38 (999) 999-99-99");


    // video
    function findVideos() {
        let videos = document.querySelectorAll('.video');

        for (let i = 0; i < videos.length; i++) {
            setupVideo(videos[i]);
        }
    }

    function setupVideo(video) {
        let link = video.querySelector('.video__link');
        let media = video.querySelector('.video__media');
        let button = video.querySelector('.video__button');
        let id = parseMediaURL(media);

        video.addEventListener('click', () => {
            let iframe = createIframe(id);

            link.remove();
            button.remove();
            video.appendChild(iframe);
        });

        link.removeAttribute('href');
        video.classList.add('video--enabled');
    }

    function parseMediaURL(media) {
        let regexp = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/i;
        let url = media.alt;
        let match = url.match(regexp);

        return match[1];
    }

    function createIframe(id) {
        let iframe = document.createElement('iframe');

        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay');
        iframe.setAttribute('src', generateURL(id));
        iframe.classList.add('video__media');

        return iframe;
    }

    function generateURL(id) {
        let query = '?rel=0&showinfo=0&autoplay=1';

        return 'https://www.youtube.com/embed/' + id + query;
    }

    findVideos();


    // menu stuff
    let mainNav = document.querySelector('.main-header__top') || false;

    if (mainNav) {
        // sticky menu
        let mainNavWrapper = document.querySelector('.main-header__top-wrapper');

        let waypointNav = new Waypoint({
            element: mainNav,
            handler: function (direction) {
                if (direction === 'down') {
                    mainNavWrapper.classList.add('main-header__top-wrapper--sticky');
                    mainNav.style.height = mainNavWrapper.offsetHeight + 'px';
                } else {
                    mainNavWrapper.classList.remove('main-header__top-wrapper--sticky');
                    mainNav.style.height = 'auto';
                }
            },
            offset: -1
        });

        // show/hide mobile menu
        $('.main-header__hamburger').on('click', function () {
            $('html').toggleClass('show-main-nav');
        });

        $('.sidenav a, .drawer-backdrop').on('click', function () {
            $('html').removeClass('show-main-nav');
        });
    }

    // smooth page scrolling
    $('.scrollto').click(function () {
        var elementClick = '#'+$(this).attr('href').split('#')[1];
        var destination = $(elementClick).offset().top;
        jQuery('html:not(:animated),body:not(:animated)').animate({scrollTop: destination - 40}, 800);
        return false;
    });

    // number animation
    let aboutIconsMarket = document.querySelector('.about__icons--market');

    let waypoint = new Waypoint({
        element: aboutIconsMarket,
        handler: function(direction) {
            setTimeout(function () {
                $('.about__year').animateNumber(
                    {
                        number: 2019,
                    },
                    {
                        easing: 'swing',
                        duration: 1800
                    }
                );
            }, 500);

            waypoint.destroy();
        },
        offset: function() {
            return window.innerHeight - aboutIconsMarket.clientHeight;
        }
    });

    // animation of icons about us
    let aboutListItems = document.querySelectorAll('.about__item');

    aboutListItems.forEach(function (aboutItem) {
        let aboutIcons = aboutItem.querySelector('.about__icons');

        let waypoint = new Waypoint({
            element: aboutItem,
            handler: function(direction) {
                aboutItem.classList.add('about__item--show');
                waypoint.destroy();
            },
            offset: function() {
                return window.innerHeight - aboutIcons.clientHeight;
            }
        });
    });


    ////////////////////////////////////////////////////////////////////////////
    // FORM PROCESSING

    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    });

    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            let re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Пожалуйста, проверьте свои данные"
    );

    function valEl(el) {
        let validator = el.validate({
            rules:{
                name:{
                    required:true
                },
                email:{
                    required:true
                },
                phone:{
                    required:true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                }
            },
            messages:{
                name:{
                    required:'Заполните поле'
                },
                email:{
                    required:'Заполните поле',
                    email:'Неправильный формат e-mail'
                },
                phone:{
                    required:'Заполните поле',
                    regex:'Неправильный формат телефона'
                }
            },
            submitHandler: function (form) {
                // $('.modal-order').modal('hide');
                // $('.loader').fadeIn();
                let $form = $(form);

                $.ajax({
                    type: 'POST',
                    url: $form.attr('action'),
                    data: $form.serialize(),
                })
                    .always(function (response) {
                        setTimeout(function () {
                            // $('.loader').fadeOut();
                        },800);
                        setTimeout(function () {
                            // $('.modal-thanks').modal('show');
                        },1100);
                    });

                return false;
            }
        });
    }

    $('.js-form').each(function() {
        valEl( $(this) );
    });

    ////////////////////////////////////////////////////////////////////////////

    function isMobile() {
        return $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    }

    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

}); // end ready
