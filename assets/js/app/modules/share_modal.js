class ShareModal {

    constructor() {
        self = this;
        this.cta = document.querySelector('.js-cta-modal-journey');
        this.cta_close = document.querySelector('.js-modal-journey-close');
        this.modal = document.querySelector('.js-modal-journey');
        this.btn_copy = document.querySelector('.js-btn-copy');
        this.link = this.modal.querySelector('.js-copy-link');
    }

    init() {
        this.cta.addEventListener('click', this.open.bind(this));
        this.cta_close.addEventListener('click', this.close.bind(this));
        this.btn_copy.addEventListener('click', this.copyLink.bind(this));
    }
    
    open() {
        this.modal.classList.add('active');
    }

    close() {
        this.modal.classList.remove('active');
    }

    /**
     * Copy post
     */
    copyLink () {
        let link = document.querySelector('.js-copy-link').value;
        let temp = document.createElement('input');
        let body = document.body;
            body.appendChild(temp);
            temp.value = link;
            temp.select();
            document.execCommand('copy');
            body.removeChild(temp);

        this.btn_copy.style.color = '#41b883';
        this.btn_copy.value = 'Copied!';
    }

    /**
     * Reload Share Modal
     */
    reload() {
        let url = document.URL;
        let element = document.querySelector('.js-modal-journey'); 
        let req = new XMLHttpRequest();
            req.onload = function () {
                element.innerHTML = req.responseText;
                // Fix duplicate container
                let wrapper = document.querySelector('.js-modal-journey .js-modal-journey');
                let html = wrapper.innerHTML;
                let container = document.querySelector('.js-modal-journey');
                    container.innerHTML = html;

                const reload = new ShareModal();
                reload.init();
            };
            req.open("GET", url, false);
            req.send(null);
    }
}

export default ShareModal;