import $ from '../usefull/jquery-prefix'; //PREFIX FOR JQUERY
import 'slick-carousel'; //Import slick

class sliderMenu {
    constructor() {
        this.slider = document.querySelector('.js-related-articles-slider');
    }

    init() {
        this.runSlick();
    }

    runSlick() {
        if (window.innerWidth <= 992) {
            $(this.slider).slick({
                autoplay: true,
                arrows: false,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                adaptiveHeight: true,
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint: 2000,
                        settings: "unslick"
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 460,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ]
            });
        }
    }
}

export default sliderMenu;