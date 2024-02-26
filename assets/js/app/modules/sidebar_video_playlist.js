import MegaMenu from './mega_menu';


class SidebarPlaylist {
    
    constructor() {
        this.items_mobile = 2;
        this.items_desktop = 8;
        this.sidebar = document.querySelector('.js-sidebar-playlist'); // Sidebar
        this.lists = this.sidebar.querySelectorAll('.sidebar-pj__group'); // List of Playlist
        this.items = document.querySelectorAll('.js-video-item'); // List of Video
    }


    init() {
        // count items in active list and hide them
        this.lists.forEach(list => {
            if (list.classList.contains('active')) {
                let MenuItems = list.querySelectorAll('.js-video-item');
                let seeMore = list.querySelector('.js-see-more');
                let items_desktop = this.items_desktop -1;
                let items_mobile = this.items_mobile -1;
                // Desktop Function Mega Menu - See More
                if (window.innerWidth > 992 && MenuItems.length > items_desktop) {
                    seeMore.classList.add('active');
                    seeMore.addEventListener('click', this.eventSeeMore.bind(this, seeMore, MenuItems));
                    MenuItems.forEach(function (item, index) {
                        if (index > items_desktop) item.classList.add('hidden');
                    });
                }
                // Mobile Function Mega Menu - See More
                if (window.innerWidth <= 992 && MenuItems.length > items_mobile) {
                    seeMore.classList.add('active');
                    seeMore.addEventListener('click', this.eventSeeMore.bind(this, seeMore, MenuItems));
                    
                    MenuItems.forEach(function (item, index) {
                        if (index > items_mobile) item.classList.add('hidden');
                    });
                }
            }
        });

        // Player event click
        this.items.forEach(item => {
            item.addEventListener('click', this.activeVideo.bind(this, item));
        });
    }

    eventSeeMore(seeMore, MenuItems) {
        seeMore.classList.remove('active');
        MenuItems.forEach(video => {
            video.classList.remove('hidden');
        });
    }

    // Active Video from click event
    activeVideo(item) {
        // Add title item to url
        this.changeUrl(item);

        // Active MegaMenu
        const megamenus = document.querySelectorAll('.js-mega-menu-container');
        if(window.innerWidth > 992){
            const megaMenu = new MegaMenu(megamenus[0]);
            megaMenu.activeElementsIntoDOM();
        }else{
            const megaMenu = new MegaMenu(megamenus[1]);
            megaMenu.activeElementsIntoDOM();
        }
    }

    // Active Item in the menu from other event
    activeSidebarVideo(postId, list) {

        let MenuItems = document.querySelectorAll('.js-video-item');

        // Active Playlist
        this.lists.forEach(i => {
            if (i.getAttribute('data-list') == list) {
                i.classList.add('active');
            } else {
                i.classList.remove('active');
            }
        });

        // Active Item
        MenuItems.forEach( i => {
            if (i.getAttribute('data-post-id') == postId) {
                i.classList.add('active');
            } else {
                i.classList.remove('active');
            }
        });
    }

    // Change url
    changeUrl(item) {
        let title = item.querySelector('.sidebar-pj__item-title')?? item;
        let url = window.location.href;
        let param = item.getAttribute('title').trim().replace(/\s/g, '-').toLowerCase();
            param = param.split('?').join('');
            param = param.split('&').join('');
            param = param.split('/').join('');
            param = param.split('amp;-').join('');
            param = param.split(',').join('');
            param = param.split(':').join('');
            param = param.split('.').join('');
            
        if (url.split('/')[5] === param) {
            // Nothing
        } else {
            window.history.replaceState({}, '',url.split('/')[0] + '//' + url.split('/')[2] + '/' + url.split('/')[3] + '/' + url.split('/')[4] + '/' + param);
        }
    }

}

export default SidebarPlaylist;