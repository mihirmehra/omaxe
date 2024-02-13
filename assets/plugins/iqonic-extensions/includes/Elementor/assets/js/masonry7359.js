(function (jQuery) {
    "use strict";
    // Init elements after creation
    jQuery(window).on('load', function () {
        jQuery(window).on('elementor/frontend/init', function () {
            if (typeof window.elementorFrontend !== 'undefined' && typeof window.elementorFrontend.hooks !== 'undefined') {
                // If Elementor is in the Editor's Preview mode

                if (elementorFrontend.isEditMode()) {
                    elementorFrontend.hooks.addAction('frontend/element_ready/widget', function (scope) {
                        if (scope.find('.iqonic-masonry-grid').length > 0) {
                            var masonry = scope.find('.iqonic-masonry-grid');
                            var parent = scope.find('.iqonic-masonry-grid').parent();
                            apply_masonry(parent, masonry);
                        }
                    });
                }
            }
        });
    });
    jQuery(window).ready(function () {
        /*------------------------
        Masonry
        --------------------------*/
        PortBoxHover();
        if (jQuery('.iqonic-masonry-grid').length > 0) {
            jQuery('.iqonic-masonry-grid').each(function () {
                apply_masonry(jQuery(".iqonic-masonry-block"), jQuery(this));
            });
        }
    });

})(jQuery);

function apply_masonry(parent, selector) {
    let horizontal = selector.data("horizontalorder");
    parent.imagesLoaded(function () {
        selector.masonry({
            columnWidth: ".grid-sizer",
            itemSelector: ".iqonic-masonry-item",
            horizontalOrder: horizontal,
            // gutter: gutterSpace
        });
    });
}

function PortBoxHover() {
    var classCheck = jQuery('.box').length;
    console.log(jQuery('.box').length);
    if (classCheck > 0) {
        jQuery(function () {
            jQuery('.box').hoverDirection();
        });
    }
}