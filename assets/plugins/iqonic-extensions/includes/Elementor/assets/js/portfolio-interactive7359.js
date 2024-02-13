(function ($) {
    "use strict";
    $(document).ready(function () {
        PortInteractive();
    });
})(jQuery);
function PortInteractive() {
    jQuery(document).find('.portfolio-item:first-child .portfolio-title-box,.portfolio-image-item:first-child').addClass('active');
    var activeImg = jQuery('.portfolio-item .portfolio-title-box.active').find('a').data("slug");
    jQuery('.portfolio-image-item.' + activeImg).css('opacity', '1');
    jQuery('.portfolio-item .portfolio-title-box').on('mouseenter mouseleave', function () {
        jQuery('.portfolio-item .portfolio-title-box').removeClass("active");
        jQuery(this).addClass("active");
        var hoverImg = jQuery(this).find('a').data("slug");
        jQuery('.portfolio-image-item').css('opacity', '1');
        jQuery('.portfolio-image-item').removeClass("active");
        jQuery('.portfolio-image-item.' + hoverImg).css('opacity', '1');
        jQuery('.portfolio-image-item.' + hoverImg).addClass("active");
    });
}