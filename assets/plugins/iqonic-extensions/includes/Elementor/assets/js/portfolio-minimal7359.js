(function ($) {
    "use strict";
    $(document).ready(function () {
        callPortMinimal();
        if ($(window).width() > 1024) {
            callPortOnHover();
        }
    });

})(jQuery);

function callPortMinimal() {
    jQuery(".css_prefix-portfolio-minimal .odditem").each(function () {
        jQuery(this).find('.css_prefix-masonry-item:odd').addClass('iqonic-even-item');
        jQuery(this).find('.css_prefix-masonry-item:even').addClass('iqonic-odd-item');
    });

    jQuery(".css_prefix-portfolio-minimal .evenitem").each(function () {
        jQuery(this).find('.css_prefix-masonry-item:odd').addClass('iqonic-odd-item');
        jQuery(this).find('.css_prefix-masonry-item:even').addClass('iqonic-even-item');
    });
}

function callPortOnHover() {
    jQuery(document).find('.css_prefix-portfolio-category-item:first-child').addClass('acitveCat');
    // console.log(jQuery('.css_prefix-portfolio-gallery').find('.css_prefix-detail-box .css_prefix-portfolio-details.last-item-right')[0].getBoundingClientRect().right+jQuery('.css_prefix-portfolio-gallery').find('.css_prefix-detail-box .css_prefix-portfolio-details.last-item-right').width());
    jQuery(document).find('.css_prefix-portfolio-category-block').on('mouseover', '.css_prefix-portfolio-category-item', function () {
        jQuery('.css_prefix-portfolio-category-item.acitveCat').removeClass('acitveCat');
        jQuery(this).addClass('acitveCat');
        var hoverImg = jQuery(this).find('a').data("slug");
        jQuery('.css_prefix-portfolio-category-item .css_prefix-portfolio-image').css('opacity', '0');
        jQuery('.css_prefix-portfolio-category-item .css_prefix-portfolio-image.' + hoverImg).css('opacity', '1');

    });
    var activeImg = jQuery('.css_prefix-portfolio-category-item.acitveCat').find('a').data("slug");
    jQuery(document).find('.css_prefix-portfolio-category-item .css_prefix-portfolio-image.' + activeImg).css('opacity', '1');

    var $cursorPort = jQuery('.css_prefix-gallery-style').find('.css_prefix-portfolio-content');
    var $cursorMinimal = jQuery('.css_prefix-portfolio-minimal .css_prefix-portfolio-content');

    var $cursorPortBox = jQuery('.css_prefix-portfolio-gallery').find('.css_prefix-portfolio-details');

    if (jQuery('.css_prefix-portfolio-gallery').length > 0) {
        jQuery('.css_prefix-portfolio-gallery').on('mousemove', function (e) {
            let $this = jQuery(this),
                parentElem = $this.offset(),
                cursorPtPosX = e.pageX - parentElem.left,
                cursorPtPosY = e.pageY - parentElem.top,
                cursorPtWidth = $cursorPortBox.width(),
                cursorPtHeight = $cursorPortBox.height(),
                PortX = (cursorPtPosX - cursorPtWidth / 2) + 70,
                PortY = (cursorPtPosY - cursorPtHeight / 2) + 30,
                MiniX = (cursorPtPosX - cursorPtWidth / 2) + 165,
                MiniY = (cursorPtPosY - cursorPtHeight / 2) + 20,
                elem = $this.find('.css_prefix-portfolio-box .css_prefix-portfolio-details');

            $cursorPort.css({
                'top': PortY + 'px',
                'left': PortX + 'px'
            });
            if ((MiniX + elem.width() + parentElem.left) > window.innerWidth) {
                $cursorMinimal.addClass("min-detail-right");
                $cursorMinimal.css({
                    'top': MiniY + 'px',
                    'left': (MiniX - 75) + 'px'
                });
            } else {
                $cursorMinimal.removeClass("min-detail-right");
                $cursorMinimal.css({
                    'top': MiniY + 'px',
                    'left': MiniX + 'px'
                });
            }
        });
    }

    jQuery(document).find('.css_prefix-portfolio-gallery').on('mouseenter', '.css_prefix-portfolio-box-img', function () {
        var hoverPortImg = jQuery(this).find('a').data("slug");
        jQuery('.css_prefix-portfolio-content .css_prefix-portfolio-details').removeClass('hover-content');
        jQuery('.css_prefix-portfolio-content').find('.css_prefix-portfolio-details.' + hoverPortImg).addClass('hover-content');
    });

    jQuery(document).find('.css_prefix-portfolio-gallery').on('mouseleave', '.css_prefix-portfolio-box-img', function () {
        jQuery('.css_prefix-portfolio-content .css_prefix-portfolio-details').removeClass('hover-content');
    });

}