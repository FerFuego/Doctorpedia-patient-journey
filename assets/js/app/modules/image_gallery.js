import $ from '../usefull/jquery-prefix'; //PREFIX FOR JQUERY
import 'slick-carousel'; //Import slick

class ImageGallery {
    constructor(module) {
        this.slider = module.querySelector('[slider-container]');
    }

    init() {
        this.runSlick();
    }

    runSlick() {

        $(this.slider).slick({
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            focusOnSelect: true,
            infinite: false,
        });
    }
}

export default ImageGallery;