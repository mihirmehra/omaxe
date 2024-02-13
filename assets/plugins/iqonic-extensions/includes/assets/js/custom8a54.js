(function ($) {
  "use strict";
  $(window).ready(function () {
    $(document).find('.css_prefix-widget-menu.swiper').each(function () {
      let slider = $(this);

      let swiper = new Swiper(slider[0], {
        direction: 'horizontal',
        loop: true,
        autoplay: true,
        speed: 2500,
        spaceBetween: 20,
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true,
        },
      });

    });
    
  });
})(jQuery);