import $ from '../usefull/jquery-prefix'; //PREFIX FOR JQUERY
import 'slick-carousel'; //Import slick

class sliderMenu {
    constructor() {
        this.slider = document.querySelector('.js-big-menu-slider');
    }

    init() {
        this.runSlick();
    }

    runSlick() {
        $(this.slider).slick({
            autoplay: true,
            arrows: true,
            infinite: true,
            nextArrow: '<button type="button" class="slick-next"></button>',
            prevArrow: '<button type="button" class="slick-prev"></button>',
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: false,
            adaptiveHeight: false,
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                }
            ]
        })
    }
}

export default sliderMenu;