//Performance
import performance from "../app/usefull/performance";
performance.init();

//Modules (Import your JS files here)
import Navbar from "../app/modules/navbar";
import MegaMenu from "../app/modules/mega_menu";
import SidebarPlaylist from "../app/modules/sidebar_video_playlist";
import ShareModal from "../app/modules/share_modal";
import NextChapter from "../app/modules/next_chapter";
import Tabs from "../app/modules/tabs";
import TabContent from "../app/modules/tab_content";
import PrincipalVideo from "../app/modules/get_principal_video";
import Search from "../app/modules/search";

//MEGA MENU DESKTOP / MOBILE
const megamenus = document.querySelectorAll('.js-mega-menu-container');
if(window.innerWidth > 992){
    const megaMenu = new MegaMenu(megamenus[0]);
    megaMenu.init();
}else{
    const megaMenu = new MegaMenu(megamenus[1]);
    megaMenu.init();
}

//Navbar 
const navbar = new Navbar();
navbar.init();

const tabs = new Tabs();
tabs.init();

const sidebarPlaylist = new SidebarPlaylist();
sidebarPlaylist.init();

const nextChapter = new NextChapter();
nextChapter.init();

const shareModal = new ShareModal();
shareModal.init();

const tabContent = new TabContent();
tabContent.init();

const principalVideo = new PrincipalVideo();
principalVideo.listeners();

const search = new Search;
search.init();

//Page Animations
import animations from "../app/usefull/animations";
animations.init();