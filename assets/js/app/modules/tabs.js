class Tabs {
    constructor () {
        this.tabContent = document.querySelectorAll('.js-tab-content');
        this.Contents = document.querySelectorAll('.tab');
        this.megaMenuContent = document.querySelector('.js-mega-menu-container');
    }

    init () {
        window.addEventListener('load', () => {
            let url = window.location.href;
            let tabUrl = url.split('/')[5];

            this.tabContent.forEach(tab => {
                if (tab.getAttribute('id') === tabUrl && tabUrl !== 'journey') {
                    this.hideTabContent(tabUrl);
                    this.activeTab(tabUrl);
                }
            });

            if (tabUrl === 'search') {
                this.hideTabContent(tabUrl);
                this.activeTab(tabUrl);
            }
        });

        this.tabContent.forEach( tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const tabId = tab.getAttribute('id');
                this.hideTabContent(tabId)
                this.changeUrl(tabId);
                this.activeTab(tabId);
            });
        });
    }

    hideTabContent (tabId) {
        const currentTab = `js-${tabId}-content`;
        let url = window.location.href;

        this.Contents.forEach(content => {

            if (content.classList.contains(currentTab)) {
                content.classList.remove('d-none');
            } else {
                content.classList.add('d-none');
            }

            if (currentTab == 'js-journey-content') {
                this.megaMenuContent.classList.remove('d-none');
            } else {
                this.megaMenuContent.classList.add('d-none');
            }
        });
    }

    changeUrl(tabId) {
        let url = window.location.href;
        let param = tabId.trim().replace(/\s/g, '-').toLowerCase();
            param = param.split('?').join('');
            param = param.split('&').join('');
            param = param.split('/').join('');
            param = param.split('amp;-').join('');
            param = param.split(',').join('');
            param = param.split(':').join('');
            param = param.split('.').join('');
            
        if (tabId == 'journey') {
            window.history.replaceState({}, '',url.split('/')[0] + '//' + url.split('/')[2] + '/' + url.split('/')[3] + '/' + url.split('/')[4] + '/');
            return;
        }

        if (url.split('/')[5] === param) {
            // Nothing because the url is already the same
        } else {
            window.history.replaceState({}, '',url.split('/')[0] + '//' + url.split('/')[2] + '/' + url.split('/')[3] + '/' + url.split('/')[4] + '/' + param);
        }
    }

    activeTab(tabId) {
        this.tabContent.forEach(tab => {
            let t = tab.getAttribute('id');
            if (t === tabId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }
}

export default Tabs;