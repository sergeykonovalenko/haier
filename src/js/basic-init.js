$(document).ready(function () {
    'use strict';

    // WOW
    new WOW().init();

    // masked input
    $('input[type="tel"]').mask("+38 (999) 999-99-99");

    // init popup
    $('[data-fancybox="product-gallery"]').fancybox({
        loop: true,
    });

    $('.btn-buy').fancybox({
        touch : false,
        backFocus : false,
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="modal-common__close fancybox-button fancybox-close-small" title="Закрыть">' +
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.982 212.982" width="15" height="15"><path d="M131.804 106.491l75.936-75.936c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312 0L106.491 81.18 30.554 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.989 6.99-6.989 18.323 0 25.312l75.937 75.936-75.937 75.937c-6.989 6.99-6.989 18.323 0 25.312 6.99 6.99 18.322 6.99 25.312 0l75.937-75.937 75.937 75.937c6.989 6.99 18.322 6.99 25.312 0 6.99-6.99 6.99-18.322 0-25.312l-75.936-75.936z" fill-rule="evenodd" clip-rule="evenodd"/></svg>' +
                "</button>"
        },
    });

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
    /*let aboutIconsMarket = document.querySelector('.about__icons--market');

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
    });*/

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

    $('.btn-buy').on('click', function () {
        let extraTxt = $(this).attr("data-extra-txt");
        if (extraTxt) {
            // add extra text if needed
            let fldType = $( $(this).attr('href') ).find('.fld-type');
            fldType.val(extraTxt);
            // add extra buy form text with details
            let h2El = $( $(this).attr('href') ).find('.request-popup__title');
            h2El.text(extraTxt);
        }
    });


    ////////////////////////////////////////////////////////////////////////////
    // Send callback / Send request / Buy product

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
                fld_name:{
                    required:true
                },
                fld_email:{
                    required:true
                },
                fld_phone:{
                    required:true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                }
            },
            messages:{
                fld_name:{
                    required:'Заполните поле'
                },
                fld_email:{
                    required:'Заполните поле',
                    email:'Неправильный формат e-mail'
                },
                fld_phone:{
                    required:'Заполните поле',
                    regex:'Неправильный формат телефона'
                }
            },
            submitHandler: function (form) {
                $.fancybox.close();
                $('.loader').fadeIn();
                let $form = $(form);

                $.ajax({
                    type: 'POST',
                    url: $form.attr('action'),
                    data: $form.serialize(),
                })
                    .always(function (response) {
                        setTimeout(function () {
                            $('.loader').fadeOut();
                        },800);
                        setTimeout(function () {
                            $.fancybox.open({
                                src: '<div class="modal-thanks modal-common"><h4 class="modal-thanks__title">Спасибо, за Ваше обращение. Мы свяжемся с Вами в скором времени</h4></div>',
                                type : 'html',
                                touch : false,
                                btnTpl: {
                                    smallBtn:
                                        '<button type="button" data-fancybox-close class="modal-common__close fancybox-button fancybox-close-small" title="Закрыть">' +
                                        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.982 212.982" width="15" height="15"><path d="M131.804 106.491l75.936-75.936c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312 0L106.491 81.18 30.554 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.989 6.99-6.989 18.323 0 25.312l75.937 75.936-75.937 75.937c-6.989 6.99-6.989 18.323 0 25.312 6.99 6.99 18.322 6.99 25.312 0l75.937-75.937 75.937 75.937c6.989 6.99 18.322 6.99 25.312 0 6.99-6.99 6.99-18.322 0-25.312l-75.936-75.936z" fill-rule="evenodd" clip-rule="evenodd"/></svg>' +
                                        "</button>"
                                },
                            });
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
