import PrincipalVideo from "./get_principal_video";
import SidebarPlaylist from "./sidebar_video_playlist";
import ShareModal from "./share_modal";

class MegaMenu {
    constructor (module) {
        self = this;
        this.mega = module.querySelector('.js-mega-menu'); // (1) container
        this.cta = module.querySelectorAll('.js-mega-menu-cta'); // (2) cta btn collapse
        this.list = module.querySelectorAll('.b-single-patient-journey__mega-menu-item'); // (3) list of steps
        this.titles = module.querySelectorAll('.b-single-patient-journey__mega-menu-title'); // (4) titles of each list
        this.list_items = module.querySelectorAll('.b-single-patient-journey__mega-menu-content-item'); // (5) items of each list
        this.initReturn = true;
        this.module = module;
    }

    init () {
        // on load page
        this.module.addEventListener("load", this.activeElementsIntoDOM());

        // slide menu
        this.module.addEventListener("load", this.slideMenu());

        // slide shadows menu
        this.module.addEventListener("load", this.setContainerSlideShadow());

        // Toggle icon menu (2)
        this.cta.forEach(btn => {
            btn.addEventListener('click', this.toggle.bind(this));
        });

        // Toggle items in the menu
        // Desktop only function Mega Menu
        if (window.innerWidth > 1025) {
            this.list.forEach(item => {
                this.hideMore(item);
            });
        }

        // Timeline event (3)
        this.list.forEach((item, index) => {
            let ctaPlay = item.querySelector('.js-cta-play');
                ctaPlay.addEventListener('click', this.eventMenuTitles.bind(this, index));
        });

        // Action Titles Lists (4)
        this.titles.forEach((item, index) => {
            item.addEventListener('click', this.eventMenuTitles.bind(this, index));
        });

        // Items Function Mega Menu (5),
        this.list_items.forEach(item => {
            item.addEventListener('click', this.eventMenuItem.bind(this, item));
        });
    }

    setContainerSlideShadow() {
        // only desktop
        if (window.innerWidth > 1024) {
            // element that will be wrapped
            var el = this.mega;
            // create wrapper container
            var wrapper = document.createElement('div');
                wrapper.classList.add('hor-scroll-wrap');
                wrapper.classList.add('start');
            // insert wrapper before el in the DOM tree
            el.parentNode.insertBefore(wrapper, el);
            // move el into wrapper
            wrapper.appendChild(el);
        }
    }

    changeStateLists(index, click=false) {
        // Actions rest of items
        let list = this.module.querySelectorAll('.b-single-patient-journey__mega-menu-item');
        list.forEach(function (item, i) {
            let title   = item.querySelector('.b-single-patient-journey__mega-menu-title');
            let line    = item.querySelector('.b-single-patient-journey__mega-menu-timeline-line');
            let ctaStep = item.querySelector('.js-cta-play');
            let dropdownList = item.querySelector('.b-single-patient-journey__mega-menu-content');
            // Active dropdown list
            if (i == index) {
                ctaStep.classList.add('active');
                ctaStep.classList.remove('complete');
                ctaStep.classList.remove('loading');
                if (line) line.classList.remove('complete');
                if (click) {
                    if (title && title.classList.contains('active')) {
                        title.classList.remove('active')
                    } else { 
                        title.classList.add('active') 
                    }
                    if (dropdownList.classList.contains('active')) {
                        dropdownList.classList.remove('active')
                    } else { 
                        dropdownList.classList.add('active') 
                    }
                } else {
                    title.classList.add('active') 
                    dropdownList.classList.add('active') 
                }
            }

            // Actions previous items
            if (i != index && i < index ) {
                ctaStep.classList.remove('active');
                ctaStep.classList.remove('loading');
                ctaStep.classList.add('complete');
                if (line) line.classList.add('complete');
            }

            // Actions next items
            if (i > index) {
                ctaStep.classList.remove('active');
                ctaStep.classList.remove('loading');
                ctaStep.classList.remove('complete');
                if (line) line.classList.remove('complete');
            }
        });

        this.changeStateChapters(index);
    }

    // Toggle the MegaMenu
    toggle () {
        this.mega.classList.toggle('active');
        this.cta.forEach(btn => {
            btn.classList.toggle('active');
        });

        // Desktop Only - Change state of the Menu 
        if (window.innerWidth > 1025) {
            // Hide/Show the more buttons
            let mores = this.module.querySelectorAll('.js-mega-menu-more');
            mores.forEach(item => {
                item.classList.toggle('d-none');
            });
            // Hide/Show the less buttons
            let less = this.module.querySelectorAll('.js-mega-menu-less');
            less.forEach(item => {
                item.classList.toggle('d-none');
            });
            // Hide/Show the chapters lists
            let lists = this.module.querySelectorAll('.b-single-patient-journey__mega-menu-content');
            lists.forEach(item => {
                item.classList.toggle('d-none');
            });
        }

        // Mobile only function Mega Menu
        if (window.innerWidth <= 1025) {
            var title = '';

            // Get container
            var container = this.module
                container.classList.toggle('collapsed');

            if (container.classList.contains('collapsed')) {
                // Search active step
                let steps = this.module.querySelectorAll('.b-single-patient-journey__mega-menu-title');
                steps.forEach(step => {
                    if (step.classList.contains('active')) {
                        title = step.innerHTML;
                    }
                });
    
                // If no active step, get the first step
                if (title == '') {
                    title = steps[0].innerHTML;
                }
    
                // Create float element
                let elem = document.createElement('div');
                    elem.classList.add('js-mega-menu-step-mobile');
                    elem.innerHTML = `<div class="b-single-patient-journey__mega-menu-item b-single-patient-journey__mega-menu-step-mobile">
                                <div class="b-single-patient-journey__mega-menu-timeline">
                                    <div class="b-single-patient-journey__mega-menu-timeline-icon js-cta-play active"></div>
                                </div>
                                <div class="b-single-patient-journey__mega-menu-mobile">
                                    <h4 class="b-single-patient-journey__mega-menu-title b-single-patient-journey__mega-menu-title-without-after">${title}</h4>
                                </div>
                            </div>`;
    
                // Add float element to the list
                let m = this.module
                    m.appendChild(elem);
            } else {
                // Remove float element
                let m = this.module
                let elem = m.querySelector('.js-mega-menu-step-mobile');
                    m.removeChild(elem);
            }

        }
    }

    // Active timeline on click title
    eventMenuTitles(index) {
        this.list.forEach((item, i) => {
            if (i == index) {
                let ctaStep = item.querySelector('.js-cta-play');
                    ctaStep.classList.add('loading');
                // timeout for feel the loading experience
                setTimeout(() => { 
                    if (window.innerWidth >= 1025) {
                        // Active First item list
                        let firstItemsList = item.querySelectorAll('.b-single-patient-journey__mega-menu-content-item')[0];
                        if (firstItemsList) this.eventMenuItem(firstItemsList)
                    } else {
                        let click = true;
                        this.changeStateLists(index, click);
                    }
                }, 250);
            }
        });
    }

    // Active Item on click in the menu or load page url
    eventMenuItem(item) {
        let list = item.getAttribute('data-list');
        let postId = item.getAttribute('data-post-id');
        let currentPostId = document.querySelector('#main').getAttribute('data-post-id');
        
        item.classList.add('active');

        // Mobile only scroll to the top
        if (window.innerWidth <= 1025) window.scrollTo(0, 0);

        // Remove active class from other items
        this.list_items.forEach(item => {
            if (item.getAttribute('data-post-id') !== postId) item.classList.remove('active');
        });

        // Add active to list Timeline
        this.changeStateLists(list-1, false);

        // Add title item to url
        this.changeUrl(item);

        // Change the principal video
        const principalVideo = new PrincipalVideo(postId, true);
        principalVideo.init();

        const sidebarPlaylist = new SidebarPlaylist();
        sidebarPlaylist.activeSidebarVideo(postId, list);

        // Reload share modal
        const share = new ShareModal();
        share.reload();
    }

    // Toggle Items in the menu
    showMore (item) {
        let step = item.querySelectorAll('span')

        step.forEach(a => {
            a.classList.remove('hidden');
        });

        // Remove more element to the list
        let more = item.querySelector('.js-mega-menu-more');
        if (more) more.remove();

        // Add more elements to the list
        let less = document.createElement('span');
            less.classList.add('b-single-patient-journey__mega-menu-content-item-more');
            less.classList.add('js-mega-menu-less');
            less.innerHTML = 'Less';

        item.appendChild(less);
        less.addEventListener('click', this.hideMore.bind(this, item));
    }

    // Toggle Items in the menu
    hideMore (item) {
        let step = item.querySelectorAll('span');
        let count = step.length;
        if (count > 4) {

            // Remove the last 4 elements
            step.forEach(function (a, i) {
                if (i >= 4) a.classList.add('hidden');
            });  

            // Remove less element to the list
            let less = item.querySelector('.js-mega-menu-less');
            if (less) less.remove();            

            // Add more elements to the list
            let more = document.createElement('span');
                more.classList.add('b-single-patient-journey__mega-menu-content-item-more');
                more.classList.add('js-mega-menu-more');
                more.innerHTML = 'More...';
        
            item.appendChild(more);
            more.addEventListener('click', this.showMore.bind(this, item));
        }
    }

    // Change url
    changeUrl(item) {
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
            //window.location = url.split('/')[0] + '//' + url.split('/')[2] + '/' + url.split('/')[3] + '/' + url.split('/')[4] + '/' + param;
        }

        //window.location.hash = item.innerHTML.trim().replace(/\s/g, '-').toLowerCase();
    }

    // Active Items if exist params in url
    activeElementsIntoDOM () {
        let url = window.location.href;
        if (url.split('/')[5] !== undefined) {
            this.list_items.forEach(item => {
                let title = item.getAttribute('title').trim().replace(/\s/g, '-').toLowerCase();
                    title = title.split('?').join('');
                    title = title.split('&').join('');
                    title = title.split('/').join('');
                    title = title.split('amp;-').join('');
                    title = title.split(',').join('');
                    title = title.split(':').join('');
                    title = title.split('.').join('');
                if (title === url.split('/')[5] && this.initReturn) {
                    this.eventMenuItem(item);
                    this.initReturn = false;
                }
            });
        }
    }

    // Change state of the chapters
    changeStateChapters(index) {
        // Hide old chapters
        let hiddens = 0;
        let i = parseInt(index+1)
        let chapters = document.querySelectorAll('.js-chapter');
        let container = document.querySelector('.js-chapter-container');
        chapters.forEach(chapter => {
            if (chapter.getAttribute('data-list') == i) {
                chapter.classList.add('hidden');
            }

            if (chapter.getAttribute('data-list') > i) {
                chapter.classList.remove('hidden');
                chapter.classList.remove('active');
            }
            
            if (chapter.getAttribute('data-list') < i) {
                chapter.classList.add('hidden');
            }

            if (chapter.classList.contains('hidden')) {
                hiddens++
            }
            // Show only 4 next chapters on load page
            if (parseInt(chapter.getAttribute('data-list')) > index +5 ) {
                chapter.classList.add('hidden');
            }
        });
        hiddens === chapters.length ? container.classList.add('d-none'): container.classList.remove('d-none');
    }

    // Slide menu
    slideMenu () {
        let slider = document.querySelector('.js-mega-menu');
        let prev = document.querySelector('#js-prev-slide');
        let next = document.querySelector('#js-next-slide');
        let totalScroll = slider.scrollWidth - slider.offsetWidth;
        
        prev.addEventListener('click', function () {
            slider.scrollLeft -=  290;
        });
        
        next.addEventListener('click', function () {
            slider.scrollLeft += 290;
        });

        slider.addEventListener('scroll', function () {
            let fade = document.querySelector('.hor-scroll-wrap');
            let currentScroll = document.querySelector('.js-mega-menu').scrollLeft;
            if (currentScroll === 0 || currentScroll < 0) {
                prev.classList.add('inactive');
                fade.classList.add('start');
            } else {
                prev.classList.remove('inactive');
                fade.classList.remove('start');

                if (totalScroll === currentScroll || currentScroll > totalScroll) {
                    next.classList.add('inactive');
                    fade.classList.add('ended');
                } else {
                    next.classList.remove('inactive');
                    fade.classList.remove('ended');
                }
            }
        });
    }
}

export default MegaMenu;