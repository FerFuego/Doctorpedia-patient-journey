import Debounce from "../usefull/debounce";
import Api from '../usefull/api';

class Search {
    constructor() {
        this.input = document.querySelector('.js-search-resources');
        this.searchBtn = document.querySelector('.js-search-resources-btn');
        this.datalist = document.querySelector('.js-search-datalist');
        this.close = document.querySelector('.js-search-close');
        this.taxonomy = document.querySelector('.js-data-taxonomy').getAttribute('data-taxonomy');
        this.shadow = document.querySelector('.js-search-shadow');
        this.heroContainer = document.querySelector('.js-search-hero-container');
        this.hero = document.querySelector('.js-search-hero');
        this.tabs = document.querySelector('.js-search-tabs');
        this.skip = document.querySelector('.js-search-skip');
        this.item = '';
    }

    init() {
        const self = this;

        // Page load with params /search/:params
        window.addEventListener('load', () => {
            let url = window.location.href;
            let tabUrl = url.split('/')[5];
            let params = url.split('/')[6];
            
            if (tabUrl === 'search' && params !== '') {
                params = decodeURIComponent((params + '').replace(/\+/g, '%20'));
                self.input.value = params;
                self.searchApi(params);
                this.changeUrl(params);
                this.activeTab();
            }
        });

        // Event click btn search
        this.searchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            self.searchApi(self.input.value);
            // Hide shadow
            self.shadow.classList.add('d-none'); // mobile
        });

        // Event keyup handler
        this.input.addEventListener("keyup", function(e) {
            if (self.input.value.length > 0) {
                // Display the close button
                self.close.classList.remove('d-none');
                // Hide ElementsDOM
                self.statedElementsDOM('hide');
            } else {
                // Hide the close button
                self.close.classList.add('d-none');
                // Show ElementsDOM
                self.statedElementsDOM('show');
                // show skip search (Fix)
                self.input.classList.add('active');
            }
            // Display the datalist
            if (self.input.value.length > 2 && e.keyCode != 40 && e.keyCode != 38) {
                
                self.getDataListFromApi(self.input.value);

                // Number 13 is the "Enter" key on the keyboard
                if (e.keyCode === 13) {
                    e.preventDefault();
                    if (self.item !== '') {
                        // Go to the page
                        window.location.href = self.item.getAttribute('href');
                    } else {
                        // Go to full search
                        self.searchApi(self.input.value);
                    }
                }
            } 
            // Hide the datalist
            if (self.input.value.length === 0) {
                self.datalist.classList.add('d-none');
                // Show ElementsDOM
                self.statedElementsDOM('show');
            }
            // Key down arrow
            if (e.keyCode === 40) {
                e.preventDefault();
                self.datalist.focus();
                setTimeout(function() {
                    let items = document.querySelectorAll('.js-search-datalist-item');
                    var index = 0;
                    items.forEach((item, i) => {
                        if (item.classList.contains('active')) {
                            item.classList.remove('active');
                            index = i+1;
                        }
                    });
                    if (index < items.length && index > 0) {
                        items[index].classList.add('active');
                        self.input.value = items[index].innerText;
                        self.item = items[index];
                    } else {
                        items[0].classList.add('active');
                        self.input.value = items[index].innerText;
                        self.item = items[index];
                    }
                    
                }, 100);
            }
            // Key up arrow
            if (e.keyCode === 38) {
                e.preventDefault();
                self.datalist.focus();
                setTimeout(function() {
                    let items = document.querySelectorAll('.js-search-datalist-item');
                    let index = 0;
                    items.forEach((item, i) => {
                        if (item.classList.contains('active')) {
                            item.classList.remove('active');
                            index = i-1;
                        }
                    });
                    if (index < items.length && index >= 0) {
                        items[index].classList.add('active');
                        self.input.value = items[index].innerText;
                        self.item = items[index];
                    }
                }, 100);
            }
        });

        // Event on blur
        document.body.addEventListener('click', function(e) {
            if (e.target !== self.input && e.target !== self.datalist && e.target !== self.close) {
                self.datalist.classList.add('d-none');
            }
        });

        // Event click close
        this.close.addEventListener('click', function (e) {
            e.preventDefault();
            self.input.value = '';
            // Hide the datalist
            self.datalist.classList.add('d-none');
            // Hide close btn
            self.close.classList.add('d-none');
            // Hide shadow
            self.shadow.classList.add('d-none'); // mobile
            // Show Elements
            self.statedElementsDOM('show');
        });

        // Event click skip
        this.skip.addEventListener('click', function () {
            self.input.value = '';
            // Hide the datalist
            self.datalist.classList.add('d-none');
            // Hide close btn
            self.close.classList.add('d-none');
            // Hide shadow
            self.shadow.classList.add('d-none'); // mobile
            // Show Elements
            self.statedElementsDOM('show');
        });

        // Setup the debounce
        /* new Debounce({
            input: this.input,
            time: 1000,
            doneFunction: function (params) {
                self.searchApi(params);
            }
        }); */
    }

    getDataListFromApi(params) {
        // Post data with axios
        Api.get('/wp/v2/patient-journey-search/', {
            params: {
                search: params.trim(),
                taxonomy: this.taxonomy,
                datalist: true
            }
        })
        .then(response => {
            if (response.data.data.html == '' 
                || response.data.data.html == null
                || response.data.data.html == undefined) {
                this.datalist.innerHTML = '';
                this.datalist.classList.add('d-none');
                return;
            }

            if (response.status === 200) {

                // Display shadow bg
                this.shadow.classList.remove('d-none'); // mobile

                // Display the datalist
                this.datalist.classList.remove('d-none');
                this.datalist.focus();

                // Clean the datalist
                let datalist = document.querySelector('.js-search-datalist');
                    datalist.innerHTML = '';
                
                // Display the results
                let resultDataList = response.data.data.html;
                datalist.innerHTML = resultDataList;

                // Highlight matching text
                let sections = document.querySelectorAll('.js-search-datalist-item');
                    sections.forEach(el => {
                        el.innerHTML = el.innerText;
                        el.removeAttribute("style");
                    });
                    sections.forEach(el => {
                        if (!el.innerText.toLowerCase().includes(params.toLowerCase())) {
                            //el.style.display = "none";
                        } else {
                            el.innerHTML = el.innerText.replace(new RegExp(`(${params})`,"i"), "<strong>$1</strong>");
                        }
                    });
            } else {
                this.shadow.classList.add('d-none'); // mobile
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    searchApi(params) {
        // Post data with axios
        Api.get('/wp/v2/patient-journey-search/', {
            params: {
                search: params,
                taxonomy: this.taxonomy,
                datalist: false
            }
        })
        .then(response => {
            if (response.status === 200) {
                this.changeUrl(params);
                this.activeTab();
                let groupArticles = document.querySelector('.js-search-content .tab-search .articles');
                let groupVideos = document.querySelector('.js-search-content .tab-search .videos');
                let groupMessage = document.querySelector('.js-search-content .tab-search .message');

                // Count the number of results
                if (response.data.data.articles_count > 0) {
                    groupArticles.classList.remove('d-none');
                    groupArticles.classList.remove('d-none');
                    groupArticles.querySelector('span').innerHTML = response.data.data.articles_count;
                    groupArticles.querySelector('.tab-search__body').innerHTML = response.data.data.articles;
                } else {
                    groupArticles.classList.add('d-none');
                    groupArticles.classList.add('d-none');
                }

                // Display the results
                if (response.data.data.videos_count > 0) {
                    groupVideos.classList.remove('d-none');
                    groupVideos.classList.remove('d-none');
                    groupVideos.querySelector('span').innerHTML = response.data.data.videos_count;
                    groupVideos.querySelector('.tab-search__body').innerHTML = response.data.data.videos;
                } else {
                    groupVideos.classList.add('d-none');
                    groupVideos.classList.add('d-none');
                }

                // Display the message
                if (response.data.data.articles_count === 0 && response.data.data.videos_count === 0) {
                    groupMessage.classList.remove('d-none');
                    // Create float element
                    let elem = document.createElement('div');
                        elem.classList.add('js-message');
                        elem.innerHTML = '<p>We’re sorry. We cannot find any matches for <strong>' + params + '</strong>.</p>';
                    groupMessage.innerHTML = elem.outerHTML;
                } else {
                    groupMessage.classList.add('d-none');
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    changeUrl(params) {
        let url = window.location.href;
        params.trim().replace(/\s/g, '-').replace('?', '').replace('&', '').replace('amp;-', '').toLowerCase();
        window.history.replaceState({}, '',url.split('/')[0] + '//' + url.split('/')[2] + '/' + url.split('/')[3] + '/' + url.split('/')[4] + '/' + 'search/' + params);
    }

    activeTab() {
        let tabsContet = document.querySelectorAll('.js-tab-content');
        tabsContet.forEach(tab => {
            tab.classList.remove('active');
        });
        let tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.classList.remove('active');
            tab.classList.add('d-none');
        });
        let megaMenu = document.querySelector('.js-mega-menu-container');
        megaMenu.classList.add('d-none');
        let tabSearch = document.querySelector('.js-search-content');
            tabSearch.classList.remove('d-none');
    }

    statedElementsDOM(state) {
        // mobile
        if (window.innerWidth <= 768) {
            
            document.body.style.transition = 'all 0.3s ease-in-out';
            this.heroContainer.style.transition = 'all 0.3s ease-in-out';
            this.hero.style.transition = 'all 0.3s ease-in-out';
            this.tabs.style.transition = 'all 0.3s ease-in-out';
            let tabses = this.tabs.querySelector('.b-single-patient-journey__tabber-content');
            tabses.style.transition = 'all 0.3s ease-in-out';

            if (state == 'show') {
                // show elements (normal state)
                document.body.style.paddingTop = '84px';
                this.heroContainer.style.backgroundColor = '#ffffff';
                this.tabs.style.marginBottom = '32px';
                tabses.style.height = 'auto';
                tabses.style.display = 'flex';
                // show navbar
                document.querySelector('#masthead').classList.remove('d-none');
                // show breadcrumb
                this.hero.querySelector('.b-single-patient-journey__breadcrumb').classList.remove('d-none'); // mobile
                // hide skip search
                this.input.classList.remove('active');
            } else {
                // hide elements (search state)
                document.body.style.paddingTop = '0';
                this.heroContainer.style.backgroundColor = '#fafafa';
                this.tabs.style.marginBottom = '0';
                tabses.style.height = '0';
                tabses.style.display = 'none';
                // hide navbar
                document.querySelector('#masthead').classList.add('d-none');
                // hide breadcrumb
                this.hero.querySelector('.b-single-patient-journey__breadcrumb').classList.add('d-none'); // mobile
                // show skip search
                this.input.classList.add('active');
            }
        }
    }
}

export default Search;