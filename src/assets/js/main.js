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
    $(".bg-img").css('background-image', function () {
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

    // ========================== Range Slider Js Start ==============================
    $('.range-slider').each(function (index, element) {
      var slide = $(element).find('.range-slider__slide');
      var minValue = $(element).data('min');
      var maxValue = $(element).data('max');
      var minDefaultValue = $(element).data('min-default');
      var maxDefaultValue = $(element).data('max-default');
      var minRange = $(element).find('#min-range');
      var maxRange = $(element).find('#max-range');
      
      // Initialize range slider
      var rangeSlider = $(slide).slider({
        range: true,
        animate: false,
        min: minValue,
        max: maxValue,
        values: [minDefaultValue, maxDefaultValue],
        slide: function (event, ui) {
          $(minRange).val(ui.values[0]);
          $(maxRange).val(ui.values[1]);
        }
      });

      // Set Default Slider values
      $(minRange).val(rangeSlider.slider('values', 0));
      $(maxRange).val(rangeSlider.slider('values', 1));
      

      $(minRange).on('change', function () {
        var inputValue = parseInt($(this).val());
        $(this).value(rangeSlider.slider('values', 0, inputValue));
      });

      $(maxRange).on('change', function () {
        var inputValue = parseInt($(this).val());
        $(this).value(rangeSlider.slider('values', 1, inputValue));
      });
      
    });
    // ========================== Range Slider Js End ================================
    
    // ========================== Copy To Clipboard Js Start ==============================
    $('.input-group--copy .btn').on('click', function () {

      var copyInput = $('.input-group--copy .form--control');

      // Select the text field
      copyInput.select()
      copyInput[0].setSelectionRange(0, 99999); // For mobile devices

      // Copy the text inside the text field
      if (navigator.clipboard.writeText(copyInput.val())) {
        $(this).find('span').text('Copied');
        
        var timer = setTimeout(() => {
          $(this).find('span').text('Copy');
          clearTimeout(timer);
        }, 2000);

      }
    });
    // ========================== Copy To Clipboard Js End ================================

    // ========================== Sidebar Show & Hide Js Start ============================
    $('[data-toggle="sidebar"]').on('click', function () {
      var target = $(this).data('target');
      var sidebar = $(target);
      var closeBtn = sidebar.find('.close-btn');
      var sidebarOverlay = $('.sidebar-overlay');

      var actions = {
        open() {
          sidebar.addClass('show');
          sidebarOverlay.addClass('show');
        },

        close() {
          sidebar.removeClass('show');
          sidebarOverlay.removeClass('show');

          // remove click event listener after closing the sidebar
          closeBtn.off('click', actions.close);
          sidebarOverlay.off('click', actions.close);
        }
      }
      
      actions.open();
      closeBtn.on('click', actions.close);
      sidebarOverlay.on('click', actions.close);

    })
    // ========================== Sidebar Show & Hide Js End ==============================

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

      $(element).find('.testimonial__brands').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        pauseOnHover: true,
        speed: 2000,
        dots: false,
        arrows: false,
        responsive: [
          {
            breakpoint: 1199 + 1,
            settings: {
              slidesToShow: 4,
            }
          },
          {
            breakpoint: 576 + 1,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 424 + 1,
            settings: {
              slidesToShow: 2,
            }
          }
        ]
      });

      // Remove slick dots numbers
      var textNodes = $(element).find('.slick-dots > li button').contents().filter(function () {
        return this.nodeType === Node.TEXT_NODE;
      });

      textNodes.remove();
    });
    // ========================== Testimonial Cards Slider Js End ==========================

    // ========================== Property Details Slider Js Start ===============================
    $('.property-details__slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      asNavFor: '.property-details__thumb',
      prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>'
    });

    $('.property-details__thumb').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.property-details__slider',
      dots: false,
      arrows: false,
      centerMode: true,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 600 + 1,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 424 + 1,
          settings: {
            slidesToShow: 2,
          }
        }
      ]
    });

    $('.property-details-sidebar__block.investors').each(function(index, element) {
      $(element).find('.property-details__investors').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1500,
        arrows: true,
        appendArrows: $(element).find('.block-heading__arrows'),
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>',
      });
    });
    // ========================== Property Details Slider Js End ===============================

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
