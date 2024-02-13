jQuery(function (jQuery) {
    "use strict";
    loadMore();
});

function loadMore() {
    if (jQuery('.widget-blog-load-btn').length > 0) {
        jQuery('.widget-blog-load-btn').click(function () {
            let button = jQuery(this),
                buttonTxt = button.text(),
                buttonLoadingTxt = button.data('loading'),
                blogPerPage = button.closest('.blog-widget').find('.widget-data .blog-per-page').val(),
                blogPerLoad = button.closest('.blog-widget').find('.widget-data .blog-per-load').val(),
                totalPublishPost = button.closest('.blog-widget').find('.widget-data .total-publish-post').val(),
                currentPage = button.closest('.blog-widget').find('.widget-data .current-page').val(),
                ajaxURL = button.closest('.blog-widget').find('.widget-data .ajax-url').val(),
                data = {
                    'action': 'iqonic_blog_action',
                    'page': currentPage, //iqonic_loadmore_params.current_page,
                    'col': button.closest('.blog-widget').find('.widget-data .blog-col').val(),
                    'settings': button.closest('.blog-widget').find('.widget-data .blog-settigs').val(),
                    'blog_per_page': blogPerPage,
                };
            jQuery.ajax({
                url: ajaxURL, //iqonic_loadmore_params.ajaxurl, // AJAX handler
                data: data,
                type: 'POST',
                beforeSend: function (xhr) {
                    button.find('.btn__text').text(buttonLoadingTxt); // change the button text, you can also add a preloader image
                },
                success: function (data) {
                    if (data) {
                        button.closest('.blog-widget').find('.load-with-ajax').append(data);
                        cursorView();
                        Page_AjaxLoad();
                        button.closest('.blog-widget').find('.current-page').val(parseInt(currentPage) + 1);
                        button.find('.btn__text').html(buttonTxt);
                        button.closest('.blog-widget').find('.blog-per-page').val(parseInt(blogPerPage) + parseInt(blogPerLoad))

                        if (parseInt(button.closest('.blog-widget').find('.blog-per-page').val()) >= parseInt(totalPublishPost))
                            button.remove(); // if last page, remove the button
                    } else {
                        button.remove(); // if no data, remove the button as well
                    }
                }
            });
        });
    }
    if (jQuery('.infinite-blog.widget-infinite-loader').length > 0) {
        let canBeLoaded = true, // this param allows to initiate the AJAX call only if necessary
            bottomOffset = 1200;
        jQuery(window).scroll(function () {
            let widgetParent = jQuery('.blog-widget'),
                blogPerPage = widgetParent.find('.widget-data .blog-per-page').val(),
                blogPerLoad = widgetParent.find('.widget-data .blog-per-load').val(),
                totalPublishPost = widgetParent.find('.widget-data .total-publish-post').val(),
                currentPage = widgetParent.find('.widget-data .current-page').val(),
                ajaxURL = widgetParent.find('.widget-data .ajax-url').val(),
                data = {
                    'action': 'iqonic_blog_action',
                    'page': currentPage, //iqonic_loadmore_params.current_page,
                    'col': widgetParent.find('.widget-data .blog-col').val(),
                    'settings': widgetParent.find('.widget-data .blog-settigs').val(),
                    'blog_per_page': blogPerPage,
                };
            if (jQuery(document).scrollTop() > (jQuery(document).height() - bottomOffset) && canBeLoaded == true) {
                jQuery.ajax({
                    url: ajaxURL, //iqonic_loadmore_params.ajaxurl, // AJAX handler
                    data: data,
                    type: 'POST',
                    beforeSend: function (xhr) {
                        canBeLoaded = false;
                        jQuery('.infinite-blog.widget-infinite-loader').slideToggle(); // change the button text, you can also add a preloader image
                    },
                    success: function (data) {
                        if (data) {
                            widgetParent.find('.load-with-ajax').append(data);
                            cursorView();
                            Page_AjaxLoad();
                            canBeLoaded = true; // the ajax is completed, now we can run it again
                            widgetParent.find('.current-page').val(parseInt(currentPage) + 1);
                            widgetParent.find('.blog-per-page').val(parseInt(blogPerPage) + parseInt(blogPerLoad))
                            if (parseInt(widgetParent.find('.blog-per-page').val()) >= parseInt(totalPublishPost))
                                jQuery('.infinite-blog.widget-infinite-loader').remove(); // if last page, remove the button
                        } else {
                            jQuery('.infinite-blog.widget-infinite-loader').remove(); // if no data, remove the button as well
                        }
                    }
                });
            }
        });
    }
}