(function ($) {
    $(function () {
        
        //In case the module is repeated on one page, then each one has its own slick separately.
        const modules = document.querySelectorAll('.js-image-gallery[has-js="true"]');

        modules.forEach(module => {
            const slider = $(module.querySelector('[slider-container]'));
            slider.not('.slick-initialized').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1
            });
        })

    });
})(jQuery);