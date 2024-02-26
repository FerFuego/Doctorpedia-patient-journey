import Api from '../usefull/api';

class TabContent {
    constructor() {
        this.Contents = document.querySelectorAll('.js-tab-content');
        this.ppp = 9;
        this.taxonomy = document.querySelector('.js-data-taxonomy').getAttribute('data-taxonomy');
    }

    init() {
        window.addEventListener('load', () => {
            let url = window.location.href;
            if (url.split('/')[5]) {
                this.Contents.forEach(content => {
                    let page = 1;
                    let tabId = content.getAttribute('id');
                    if (url.split('/')[5] == tabId) this.onClick(tabId, page);
                });
            }
        });

        this.Contents.forEach(content => {
            let page = 1;
            let tabId = content.getAttribute('id');
            content.addEventListener('click', this.onClick.bind(this, tabId, page));
        });
    }

    onClick(tabId, page) {
        // Get Articles with axios
        Api.get('/wp/v2/patient-journey-posts/', {
                params: {
                    post_type: tabId,
                    taxonomy: this.taxonomy,
                    page: page,
                    ppp: this.ppp,
                }
            })
            .then(response => {
                let content = document.querySelector(`.js-${tabId}-content .tab-${tabId}`);
                content.innerHTML = response.data.data.html;
                let paginator = document.querySelector(`.js-${tabId}-content > .js-paginator`);
                paginator.innerHTML = response.data.data.paginator;

                // Add Event Listeners
                let pages = document.querySelectorAll('.page-numbers');
                pages.forEach(p => {
                    let page = p.getAttribute('data-page');
                    p.addEventListener('click', () => {
                        const tabContent = new TabContent();
                        tabContent.onClick(tabId, page);
                        // Only desktop scrollIntoView
                        window.scrollTo(0, 0); // Scroll to top
                    });
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export default TabContent;