//Performance
import performance from "../app/usefull/performance";
performance.init();

//Modules (Import your JS files here)
import Navbar from "../app/modules/navbar";
import ShareModal from "../app/modules/share_modal";
import RelatedArticles from "../app/modules/related_articles";
import Breadcrumbs from "../app/modules/breadcrumbs";

//Navbar 
const navbar = new Navbar();
navbar.init();

const shareModal = new ShareModal();
shareModal.init();

const relatedArticles = new RelatedArticles();
relatedArticles.init();

const breadcrumbs = new Breadcrumbs();
breadcrumbs.init();

//Page Animations
import animations from "../app/usefull/animations";
animations.init();