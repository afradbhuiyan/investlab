(function ($) {
  "use strict";

  // ==========================================
  //      Start Document Ready function
  // ==========================================
  $(document).ready(function () {

    // ============== Header Hide Click On Body Js Start ===============
    $('.header-button').on('click', function () {
      $('.body-overlay').toggleClass('show')
    });

    $('.body-overlay').on('click', function () {
      $('.header-button').trigger('click')
      $(this).removeClass('show');
    });
    // =============== Header Hide Click On Body Js End ===============

    // =============== Header Hide Scroll Bar Js Start ===============
    $('.navbar-toggler.header-button').on('click', function () {
      $('body').toggleClass('scroll-hide-sm')
    });

    $('.body-overlay').on('click', function () {
      $('body').removeClass('scroll-hide-sm')
    });
    // =============== Header Hide Scroll Bar Js End ===============

    // ========================== Add Attribute For Bg Image Js Start =====================
    $(".bg-img").css('background', function () {
      var bg = ('url(' + $(this).data("background-image") + ')');
      return bg;
    });
    // ========================== Add Attribute For Bg Image Js End =====================

    // ========================== Add active class to ul > li top Active current page Js Start =====================
    function dynamicActiveMenuClass(selector) {
      let FileName = window.location.pathname.split("/").reverse()[0];

      selector.find("li").each(function () {
        let anchor = $(this).find("a");
        if ($(anchor).attr("href") == FileName) {
          $(this).addClass("active");
        }
      });

      // if any li has active element add class
      selector.children("li").each(function () {
        if ($(this).find(".active").length) {
          $(this).addClass("active");
        }
      });

      // if no file name return
      if ("" == FileName) {
        selector.find("li").eq(0).addClass("active");
      }
    }

    if ($('ul').length) {
      dynamicActiveMenuClass($('ul'));
    }
    // ========================== Add active class to ul>li top Active current page Js End =====================

    // ========================== Password Show Hide Js Start ==========================
    $(".toggle-password").on('click', function () {
      $(this).toggleClass(" fa-eye-slash");
      var input = $($(this).attr("id"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
    // ========================== Password Show Hide Js End ==========================

    // ========================== Featured Property Cards Slider Js Start ========================
    $('.featured-property').each(function (index, element) {
      $(element).find('.featured-property__cards').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 2000,
        dots: false,
        arrows: true,
        appendArrows: $(element).find('.featured-property__arrows'),
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>',
        responsive: [
          {
            breakpoint: 991 + 1,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 600 + 1,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 424 + 1,
            settings: {
              slidesToShow: 1,
              dots: true,
              arrows: false
            }
          }
        ]
      });
      // Remove slick dots numbers
      var textNodes = $(element).find('.slick-dots > li button').contents().filter(function () {
        return this.nodeType === Node.TEXT_NODE;
      })
      textNodes.remove();
    });
    // ========================== Featured Property Cards Slider Js End ==========================

    // ========================== Testimonial Cards Slider Js Start ========================
    $('.testimonial').each(function (index, element) {
      
      $(element).find('.testimonial__cards').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        pauseOnHover: true,
        speed: 1500,
        arrows: false,
        dots: true,
        appendDots: $(element).find('.testimonial__dots'),
        responsive: [
          {
            breakpoint: 767 + 1,
            settings: {
              appendDots: $(element).find('.testimonial__cards'),
            }
          },
        ]
      });

      // Remove slick dots numbers
      var textNodes = $(element).find('.slick-dots > li button').contents().filter(function () {
        return this.nodeType === Node.TEXT_NODE;
      })
      textNodes.remove();
    });
    // ========================== Testimonial Cards Slider Js End ==========================

  });
  // ==========================================
  //      End Document Ready function
  // ==========================================

  // ========================= Preloader Js Start =====================
  $(window).on("load", function () {
    $('.preloader').fadeOut();
  })
  // ========================= Preloader Js End=====================

  // ========================= Header Sticky Js Start ==============
  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= 300) {
      $('.header').addClass('fixed-header');
    }
    else {
      $('.header').removeClass('fixed-header');
    }
  });
  // ========================= Header Sticky Js End===================

  //============================ Scroll To Top Icon Js Start =========
  var btn = $('.scroll-top');

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
  });
  //========================= Scroll To Top Icon Js End ======================

})(jQuery);
