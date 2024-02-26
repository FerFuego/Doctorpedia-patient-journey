//Performance
import performance from "../app/usefull/performance";
performance.init();

//Video support
import VideoSupport from "../app/usefull/video-support";

//Dynamic js load
import moduleCaller from "../app/usefull/module-caller";


//Modules (Import your JS files here)
import Navbar from "../app/modules/navbar";
import ImageGallery from "../app/modules/image_gallery";
import BigMenu from "../app/modules/big_menu";
import sliderMenu from "../app/modules/slider_menu";

//Add JS class and HTML class for each module
const navbar = new Navbar();
navbar.init();

const bigmenu = new BigMenu();
bigmenu.init();

const slider = new sliderMenu();
slider.init();

moduleCaller([
    {
        domModule: '.js-image-gallery',
        classModule: ImageGallery
    }
]);


//Page Animations
import animations from "../app/usefull/animations";
animations.init();