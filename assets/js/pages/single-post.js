//Performance
import performance from "../app/usefull/performance";
performance.init();

//Dynamic js load
import moduleCaller from "../app/usefull/module-caller";

//Modules (Import your JS files here)
import Navbar from "../app/modules/navbar";

//Navbar 
const navbar = new Navbar();
navbar.init();

//Add JS class and HTML class for each module
//moduleCaller();

//Page Animations
import animations from "../app/usefull/animations";
animations.init();