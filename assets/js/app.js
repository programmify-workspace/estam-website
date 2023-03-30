(function (window, document, $, undefined) {
    'use strict';

    var eduJs = {
        i: function (e) {
            eduJs.d();
            eduJs.methods();
        },
        d: function (e) {
            this._window = $(window),
                this._document = $(document),
                this._body = $('body'),
                this._html = $('html')
        },

        methods: function (e) {
            eduJs.bgMarque();
            eduJs.salActive();
            eduJs.stickyHeaderMenu();
            eduJs.magnigyPopup();
            eduJs.swiperSlider();
            eduJs.counterUp();
            eduJs.masonryActivation();
            eduJs.lightboxActivation();
            eduJs.qtyBtn();
            eduJs.mouseMoveAnimation();
            eduJs.popupMobileMenu();
            eduJs.searchPopup();
            eduJs.filterClickButton();
            eduJs.svgVivusAnimation();
            eduJs.widgetToggle();
            eduJs.ToolTip();
            eduJs.contactForm();
            eduJs.sitePreloader();
            eduJs.countdownInit('.countdown', '2023/12/30');
            eduJs.countdownInit('.coming-countdown', '2023/12/30');
        },

        bgMarque: function () {
            $('.background-marque').each(function () {
                var t = 0;
                var i = 1;
                var $this = $(this);
                setInterval(function () {
                    t += i;
                    $this.css('background-position-x', -t + "px");
                }, 10);
            });
        },

        sitePreloader: function () {
            jQuery(window).load(function() {
                jQuery("#edublink-preloader").fadeOut();
            });
                
            // Close The Preloader
            $('.preloader-close-btn').on('click', function (e) {
                e.preventDefault();
                jQuery("#edublink-preloader").fadeOut();
            });
        },

        ToolTip: function () {
            Tipped.create(
                '.inline', 
                'options!', 
                { 
                    skin: "light",
                    position: 'right',
                }
            );
        },

        stickyHeaderMenu: function() {

            $(window).on('scroll', function() {
                // Sticky Class Add
                if ($('body').hasClass('sticky-header')) {
                    var stickyPlaceHolder = $('#edu-sticky-placeholder'),
                        menu = $('.header-mainmenu'),
                        menuH = menu.outerHeight(),
                        topHeaderH = $('.header-top-bar').outerHeight() || 0,
                        targrtScroll = topHeaderH + 200;
                    if ($(window).scrollTop() > targrtScroll) {
                        menu.addClass('edu-sticky');
                        stickyPlaceHolder.height(menuH);
                    } else {
                        menu.removeClass('edu-sticky');
                        stickyPlaceHolder.height(0);
                    }
                }
            });
        },
        
        salActive: function () {
            sal({
                threshold: 0.01,
                once: true,
            });
        },

        magnigyPopup: function () {
            $(document).on('ready', function () {
                $('.video-popup-activation').magnificPopup({
                    type: 'iframe'
                });
            });
        },

        widgetToggle: function () {
            $('.widget-toggle').on('click', function() {
                var $this = $(this),
                    $parents = $this.parents('.edu-course-widget');

                if (!$parents.hasClass('collapsed')) {
                    $parents.addClass('collapsed');
                    $this.next('.content').slideUp(400);
                }else {
                    $parents.removeClass('collapsed');
                    $this.next('.content').slideDown(400);
                }
            });

            $(".toggle-btn").on('click', function(e) {

                var target = $(this).parent().siblings(".toggle-open");
                var target2 = $(this).parent();
                $(target).slideToggle();
                $(target2).toggleClass("active");
            });
        },

        swiperSlider: function () {
            const swiperbanner1 = new Swiper('.university-activator', {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                pagination: false,
                grabCursor: true,
                draggable: true,
                effect: "fade",
                speed: 1000,
                autoplay: {
                    delay: 5500
                },
                navigation: {
                    nextEl: ".slide-next",
                    prevEl: ".slide-prev",
                  },
                  lazy: {      
                    loadPrevNext: true,
                    loadPrevNextAmount: 1,
                  },
            });
            $('.university-activator .swiper-slide img').each(function(){
                var  _this_transform_origin=$(this).data('transform-origin');      
                if(_this_transform_origin!=undefined){
                  $(this).css({
                    'transform-origin': _this_transform_origin
                  });
                }
            });
            var mainslider = new Swiper('.health-slider-main', {
                spaceBetween: 0,
                speed: 1000,
                autoplay: {
                  delay: 5000,
                  disableOnInteraction: false,
                },
                loop: true,
                loopedSlides: 1,
                direction: 'vertical',
                thumbs: {
                  swiper: slidercontent
                },
                navigation: {
                    nextEl: ".slide-next",
                    prevEl: ".slide-prev",
                  }
              });

            var slidercontent = new Swiper('.health-slider-content', {
                spaceBetween: 10,
                centeredSlides: true,
                slidesPerView: 1,
                touchRatio: 0.2,
                slideToClickedSlide: true,
                loop: true
            });
            if ($(".health-slider-main")[0]) {
            mainslider.controller.control = slidercontent;
            slidercontent.controller.control = mainslider;
            } else {}

              var pageSection = $("*");
              pageSection.each(function (indx) {
                if ($(this).attr("data-background")) {
                  $(this).css("background", "url(" + $(this).data("background") + ")");
                }
              });
              const swiperbanner2 = new Swiper('.photography-activator', {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                pagination: false,
                grabCursor: true,
                draggable: true,
                effect: "fade",
                speed: 1000,
                autoplay: {
                    delay: 8000
                },
                navigation: {
                    nextEl: ".slide-next",
                    prevEl: ".slide-prev",
                },
                lazy: {      
                    loadPrevNext: true,
                    loadPrevNextAmount: 1,
                },
                pagination: {
                    el: ".swiper-pagination",
                    type: "fraction",
                },
            });
            $('.photography-activator .swiper-slide img').each(function(){
                var  _this_transform_origin=$(this).data('transform-origin');      
                if(_this_transform_origin!=undefined){
                  $(this).css({
                    'transform-origin': _this_transform_origin
                  });
                }
            });

            const swiperTestimonial1 = new Swiper('.home-one-testimonial-activator', {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                pagination: false,
                grabCursor: true,
                speed: 1500,
                autoplay: {
                    delay: 3500
                },
                breakpoints: {
                    577: {
                        slidesPerView: 2,
                    }
                }
            });

            const swiperTestimonial2 = new Swiper('.swiper-testimonial-slider-wrapper', {
                loop: true,
                speed: 500,
                slidesPerView: 1,
                centeredSlides: true,
                effect: 'coverflow',
                grabCursor: true,
                autoplay: false,
                autoplay: {
                    delay: 3500
                },
                breakpoints: {
                    575: {
                      slidesPerView: 2
                    }
                },
                coverflowEffect: {
                    rotate: 0,
                    slideShadows: false,
                    depth: 180,
                    stretch: 80
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true
                }
            });
            const swiperTestimonial3 = new Swiper('.testimonial-activation', {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                grabCursor: true,
                speed: 1000,
                autoplay: {
                    delay: 3000
                },
                breakpoints: {
                    768: {
                      slidesPerView: 2,
                    },
                    992: {
                      slidesPerView: 3,
                    },
                  },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true
                }
            });
            const swiperTestimonial4 = new Swiper('.testimonial-activation-2', {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                grabCursor: true,
                speed: 1000,
                autoplay: {
                    delay: 3000
                },
                breakpoints: {
                    768: {
                      slidesPerView: 1,
                    },
                    992: {
                      slidesPerView: 2,
                    },
                  },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true
                }
            });
            const swiperTestimonial5 = new Swiper('.testimonial-activation-3', {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                grabCursor: true,
                speed: 1000,
                autoplay: {
                    delay: 3000
                },
                navigation: {
                    nextEl: ".swiper-btn-nxt",
                    prevEl: ".swiper-btn-prv",
                  },
                breakpoints: {
                  577: {
                    slidesPerView: 2,
                  }
                }
              });
              const swiperTestimonial6 = new Swiper('.testimonial-activation-5', {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                grabCursor: true,
                speed: 1000,
                autoplay: {
                    delay: 3000
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true
                }
              });
              const swiperTestimonial7 = new Swiper('.home-health-testimonial-activator', {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                pagination: false,
                grabCursor: true,
                speed: 1000,
                autoplay: {
                    delay: 3000
                },
                navigation: {
                    nextEl: ".swiper-btn-nxt",
                    prevEl: ".swiper-btn-prv",
                  },
            });
            const swiperTestimonial8 = new Swiper('.home-language-testimonial-activator', {
                slidesPerView: 1,
                centeredSlides: true,
                loop: true,
                loopedSlides: 3,
                speed: 1000,
                autoplay: {
                    delay: 5000
                },
                thumbs: {
                    swiper: testimonialThumbs
                }
            });
            var testimonialThumbs = new Swiper(".testimonial-thumbs", {
                slidesPerView: 3,
                spaceBetween: 0,
                centeredSlides: true,
                loop: true,
                slideToClickedSlide: true
            });
            swiperTestimonial8.controller.control = testimonialThumbs;
            testimonialThumbs.controller.control = swiperTestimonial8;

            const swiperTestimonial9 = new Swiper('.home-remote-testimonial-activator', {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                grabCursor: true,
                speed: 1000,
                autoplay: {
                    delay: 3000
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true
                }
            });
            const swiperTestimonial20 = new Swiper('.photography-testimonial-activator', {
                slidesPerView: 1,
                centeredSlides: true,
                loop: true,
                loopedSlides: 3,
                speed: 500,
                autoplay: {
                    delay: 3000
                },
                thumbs: {
                    swiper: photographyTestimonialThumbs
                },
                navigation: {
                    nextEl: ".slide-next",
                    prevEl: ".slide-prev",
                }
            });
            var photographyTestimonialThumbs = new Swiper(".photography-testimonial-thumbs", {
                slidesPerView: 3,
                spaceBetween: 0,
                centeredSlides: true,
                loop: true,
                slideToClickedSlide: true,
            });
            swiperTestimonial20.controller.control = photographyTestimonialThumbs;
            photographyTestimonialThumbs.controller.control = swiperTestimonial20;

            const swiperTestimonial21 = new Swiper('.business-testimonial-activation', {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                grabCursor: true,
                speed: 1000,
                autoplay: {
                    delay: 3000
                },
                navigation: {
                    nextEl: ".swiper-btn-nxt",
                    prevEl: ".swiper-btn-prv",
                  },
                breakpoints: {
                  577: {
                    slidesPerView: 2,
                  }
                }
              });

            const swiperCouesr1 = new Swiper('.course-activation', {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                grabCursor: true,
                speed: 1000,
                autoplay: {
                    delay: 3000
                },
                breakpoints: {
                    768: {
                      slidesPerView: 2,
                    },
                    992: {
                      slidesPerView: 3,
                    },
                  },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true
                }
            });
            const swiperblog = new Swiper('.blog-gallery-activation', {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                pagination: false,
                grabCursor: true,
                speed: 1000,
                autoplay: {
                    delay: 3000
                },
                navigation: {
                    nextEl: ".swiper-btn-nxt",
                    prevEl: ".swiper-btn-prv"
                    }
                });
        },

        counterUp: function () {
            $( '.counter-item' ).each(function () {
                $(this).isInViewport(function (status) {
                    if (status === 'entered' ) {
                        for (var i = 0; i < document.querySelectorAll( '.odometer' ).length; i++) {
                            var el = document.querySelectorAll( '.odometer' )[i];
                            el.innerHTML = el.getAttribute( 'data-odometer-final' );
                        }
                    }
                });
            });
        },

        masonryActivation: function () {
             $('.isotope-wrapper').imagesLoaded(function () {
                // filter items on button click
                $('.isotop-filter').on('click', 'button', function () {
                    var filterValue = $(this).attr('data-filter');
                    $grid.isotope({
                        filter: filterValue
                    });
                });
                
                // init Isotope
                var $grid = $('.isotope-list').isotope({
                    itemSelector: '.isotope-item',
                    percentPosition: true,
                    transitionDuration: '0.7s',
                    layoutMode: 'fitRows',
                    masonry: {
                        // use outer width of grid-sizer for columnWidth
                        columnWidth: 1,
                    }
                });
            });
        
            $('.isotop-filter').on('click', 'button', function (event) {
                $(this).siblings('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
                event.preventDefault();
            });

            // Masonry
            var masonryContainer = $('#masonry-gallery');
            if (masonryContainer.length) {
                var masonryGallery = masonryContainer.imagesLoaded(function () {
                    masonryGallery.isotope({
                        itemSelector: '.masonry-item',
                        masonry: {
                            columnWidth: '.masonry-item'
                        }
                    });
                });
            }
        },

        lightboxActivation: function() {
            lightGallery(document.getElementById('animated-thumbnials'), {
                thumbnail: true,
                animateThumb: false,
                showThumbByDefault: false
            });
        },

        qtyBtn: function () {
            $('.pro-qty').prepend('<span class="dec qtybtn">-</span>');
            $('.pro-qty').append('<span class="inc qtybtn">+</span>');
            $('.qtybtn').on('click', function () {
                var $button = $(this);
                var oldValue = $button.parent().find('input').val();
                if ($button.hasClass('inc')) {
                    var newVal = parseFloat(oldValue) + 1;
                } else {
                    // Don't allow decrementing below zero
                    if (oldValue > 0) {
                        var newVal = parseFloat(oldValue) - 1;
                    } else {
                        newVal = 0;
                    }
                }
                $button.parent().find('input').val(newVal);
            });
        },

        mouseMoveAnimation: function () {
            $( '.scene' ).each(function () {
                new Parallax($(this)[0]);
            });
        },

        popupMobileMenu: function (e) {
            $('.hamberger-button').on('click', function (e) {
                $('.popup-mobile-menu').addClass('active');
            });
            $('.close-menu').on('click', function (e) {
                $('.popup-mobile-menu').removeClass('active');
                $('.popup-mobile-menu .mainmenu .has-droupdown > a').siblings('.submenu, .mega-menu').removeClass('active').slideUp('400');
                $('.popup-mobile-menu .mainmenu .has-droupdown > a').removeClass('open')
            });
            $('.popup-mobile-menu .mainmenu .has-droupdown > a').on('click', function (e) {
                e.preventDefault();
                $(this).siblings('.submenu, .mega-menu').toggleClass('active').slideToggle('400');
                $(this).toggleClass('open')
            })
            $('.popup-mobile-menu, .splash-mobile-menu .mainmenu li a').on('click', function (e) {
                e.target === this && $('.popup-mobile-menu').removeClass('active') && $('.popup-mobile-menu .mainmenu .has-droupdown > a').siblings('.submenu, .mega-menu').removeClass('active').slideUp('400') && $('.popup-mobile-menu .mainmenu .has-droupdown > a').removeClass('open');
            });
        },

        searchPopup: function () {
            $( '.search-trigger' ).on( 'click', function () {
                $( '.edu-search-popup' ).addClass( 'open' )
            } )
            $( '.close-trigger' ).on('click', function () {
                $( '.edu-search-popup' ).removeClass( 'open' )
            } )
            $( '.edu-search-popup' ).on( 'click', function () {
                $('.edu-search-popup').removeClass( 'open' );
            } )
            $( '.edu-search-popup .edublink-search-popup-field' ).on( 'click', function (e) {
                e.stopPropagation();
            } )
        },

        filterClickButton: function () {
            $('#slider-range').slider({
                range: true,
                min: 10,
                max: 500,
                values: [100, 300],
                slide: function (event, ui) {
                    $('#amount').val('$' + ui.values[0] + ' - $' + ui.values[1]);
                }
            });
            $('#amount').val('$' + $('#slider-range').slider('values', 0) +
                " - $" + $('#slider-range').slider('values', 1));
        },

        svgVivusAnimation: function () {
            SVGInject( document.querySelectorAll( 'img.svgInject' ), {
                makeIdsUnique: true,
                afterInject: function ( _, svg ) {
                    new Vivus( svg, {
                        duration: 80
                    } );
                }
            } );
            
            // Vivus Hover JS
            $( '.edublink-svg-animate' ).hover( function () {
                var svg = $( this ).find( 'svg' )[0];
                new Vivus( svg, {
                    duration: 50
                } );
            } )
        },

        countdownInit: function(countdownSelector, countdownTime) {
            var eventCounter = $(countdownSelector);
            if (eventCounter.length) {
                eventCounter.countdown(countdownTime, function(e) {
                    $(this).html(
                        e.strftime(
                            "<div class='countdown-section'><div><div class='countdown-number day'>%D</div> <div class='countdown-unit'>Day%!D</div> </div></div><div class='countdown-section'><div><div class='countdown-number hour'>%H</div> <div class='countdown-unit'>Hrs%!H</div> </div></div><div class='countdown-section'><div><div class='countdown-number minute'>%M</div> <div class='countdown-unit'>Mints</div> </div></div><div class='countdown-section'><div><div class='countdown-number second'>%S</div> <div class='countdown-unit'>Sec</div> </div></div>"
                        )
                    );
                });
            }
        },

        contactForm: function () {
            $('.rwt-dynamic-form').on('submit', function (e) {
				e.preventDefault();
				var _self = $(this);
				var __selector = _self.closest('input,textarea');
				_self.closest('div').find('input,textarea').removeAttr('style');
				_self.find('.error-msg').remove();
				_self.closest('div').find('button[type="submit"]').attr('disabled', 'disabled');
				var data = $(this).serialize();
				$.ajax({
					url: 'mail.php',
					type: "post",
					dataType: 'json',
					data: data,
					success: function (data) {
						_self.closest('div').find('button[type="submit"]').removeAttr('disabled');
						if (data.code == false) {
							_self.closest('div').find('[name="' + data.field + '"]');
							_self.find('.rn-btn').after('<div class="error-msg"><p>*' + data.err + '</p></div>');
						} else {
							$('.error-msg').hide();
							$('.form-group').removeClass('focused');
							_self.find('.rn-btn').after('<div class="success-msg"><p>' + data.success + '</p></div>');
							_self.closest('div').find('input,textarea').val('');

							setTimeout(function () {
								$('.success-msg').fadeOut('slow');
							}, 5000);
						}
					}
				});
			});
        }
    }

    eduJs.i();

})(window, document, jQuery);