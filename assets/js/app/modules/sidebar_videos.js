class SidebarPlaylist {
    
    constructor() {
        this.items_mobile = 2;
        this.items_desktop = 5;
        this.items = document.querySelectorAll('.js-video-item'); // List of Video
        this.seeMore = document.querySelector('.js-see-more');
    }


    init() {
        // Desktop Function Mega Menu - See More
        let items_desktop = this.items_desktop -1;
        if (window.innerWidth > 992 && this.items.length > items_desktop) {
            this.seeMore.classList.add('active');
            this.seeMore.addEventListener('click', this.eventSeeMore.bind(this));
            this.items.forEach(function (item, index) {
                if (index > items_desktop) item.classList.add('hidden');
            });
        }

        // Mobile Function Mega Menu - See More
        let items_mobile = this.items_mobile -1;
        if (window.innerWidth <= 992 && this.items.length > items_mobile) {
            this.seeMore.classList.add('active');
            this.seeMore.addEventListener('click', this.eventSeeMore.bind(this));
            this.items.forEach(function (item, index) {
                if (index > items_mobile) item.classList.add('hidden');
            });
        }
    }

    eventSeeMore() {
        this.seeMore.classList.remove('active');
        this.items.forEach(video => {
            video.classList.remove('hidden');
        });
    }

}

export default SidebarPlaylist;