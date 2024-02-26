//Performance
import performance from "../app/usefull/performance";
performance.init();

//Video support
//import VideoSupport from "../app/usefull/video-support";

//Dynamic js load
//import moduleCaller from "../app/usefull/module-caller";

//Modules (Import your JS files here)
import Navbar from "../app/modules/navbar";


//Add JS class and HTML class for each module
const navbar = new Navbar();
navbar.init();

//moduleCaller();


//Page Animations
import animations from "../app/usefull/animations";
animations.init();