//Performance
import performance from "../app/usefull/performance";
performance.init();

//Video support
import VideoSupport from "../app/usefull/video-support";

//Modules (Import your JS files here)
import Navbar from "../app/modules/navbar";
import ShareModal from "../app/modules/share_modal";
import Sidebar from "../app/modules/sidebar_videos";
import Breadcrumbs from "../app/modules/breadcrumbs";

//Navbar 
const navbar = new Navbar();
navbar.init();

const shareModal = new ShareModal();
shareModal.init();

const sidebar = new Sidebar();
sidebar.init();

const videoPlayer = new VideoSupport();

const breadcrumbs = new Breadcrumbs();
breadcrumbs.init();

//Page Animations
import animations from "../app/usefull/animations";
animations.init();