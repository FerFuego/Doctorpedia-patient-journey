import Api from '../usefull/api';
import VideoSupport from "../usefull/video-support";

class PrincipalVideo {

    constructor(postId) {
        this.postId = postId;
        this.video = {};
    }

    init() {
        // Get Principal Video with axios
        Api.get('/wp/v2/single-video', {
            params: {
              id: this.postId
            }
        })
        .then(response => {
            this.video = response.data;
            this.render();
        })
        .catch(error => {
            console.log(error);
        });
    }

    listeners() {
        let next = document.querySelector('.js-support-video-next');
        next.addEventListener('click', this.next.bind(this));

        let prev = document.querySelector('.js-support-video-prev');
        prev.addEventListener('click', this.prev.bind(this));
    }

    render() {
        // Get the principal content
        let principalTitle = document.querySelectorAll('.js-principal-title');
        let principalTranscription = document.querySelector('.js-principal-transcription');

        // Change the principal titles
        principalTitle.forEach(title => {
            var t = this.video.title.toString();
            t = t.split('&#8211;'); // - (guion medio)
            t = t.slice(-1)[0].trim();
            title.innerHTML = t;
        });

        // Change the principal transcript
        principalTranscription.innerHTML = this.video.video.description;

        // Change principal author
        this.changePrincipalAuthor();

        // Change the principal image
        try {
            var image = this.video.video.thumbnail;
        } catch (error) {
            var image = ''
        }

        // Change the principal video
        this.getVideoId(image);
    }

    getVideoId(image) {
        let principalVideo = document.querySelector('.js-principal-video');

        var formData = new FormData();
            formData.append('action', 'videoSupportComplement');
            formData.append('video_image', image);
            formData.append('video_link', this.video.video.url);

        // Get Data Principal Video with axios
        Api.post(ajax.url, formData, {
                beforeSend: function () {
                    principalVideo.innerHTML = '';
                }
            })
            .then(response => {
                // Collapse the menu
                let menu = document.querySelector('.js-mega-menu-cta');
                if (!menu.classList.contains('active')) {
                    menu.click();
                }

                // Only desktop
                if (window.innerWidth > 1025) window.scrollTo(0, 230); // Scroll to top

                // Render new video content into DOM
                principalVideo.innerHTML = response.data.data.html;

                // New instance of VideoSupport to fix the work of new element into DOM
                const videoSupport = new VideoSupport();

                let next = document.querySelector('.js-support-video-next');
                next.addEventListener('click', () => {
                    let MegaMenus = document.querySelectorAll('.js-mega-menu-container');
                    let MenuItems = MegaMenus[1].querySelectorAll('.b-single-patient-journey__mega-menu-content-item');
                    let item = [...MenuItems].find(item => item.classList.contains('active'));
                    let next = item.nextElementSibling;

                    if (next) next.click();
                });

                let prev = document.querySelector('.js-support-video-prev');
                prev.addEventListener('click', () => {
                    let MegaMenus = document.querySelectorAll('.js-mega-menu-container');
                    let MenuItems = MegaMenus[1].querySelectorAll('.b-single-patient-journey__mega-menu-content-item');
                    let item = [...MenuItems].find(item => item.classList.contains('active'));
                    let prev = item.previousElementSibling;

                    if (prev) prev.click();
                });
            })
            .catch(error => {
                console.log(error);
            });

        return false;
    }

    changePrincipalAuthor() {
        if (this.video.author) {
            let author = this.video.author;
            let principalAuthor = document.querySelector('.js-principal-author');

            let name = principalAuthor.querySelector('.tab-journey__featured-author-name');
            name.innerHTML = author.name;

            let image = principalAuthor.querySelector('.tab-journey__featured-author-image img');
            if (author.avatar === null) {
                image.src = '/patient-journey/wp-content/themes/Doctorpedia/assets/img/placeholder/place-holder.svg';
            } else {
                image.src = author.avatar;
            }

            let link = principalAuthor.querySelector('.tab-journey__featured-author-link');
            link.href = author.url;

            let link_img = principalAuthor.querySelector('.tab-journey__featured-author-image');
            link_img.href = author.avatar;

            let specialty = principalAuthor.querySelector('.tab-journey__featured-author-specialty');
            specialty.innerHTML = author.description;
        }
    }

    next() {
        let MegaMenus = document.querySelectorAll('.js-mega-menu-container');
        let MenuItems = MegaMenus[1].querySelectorAll('.b-single-patient-journey__mega-menu-content-item');
        let item = [...MenuItems].find(item => item.classList.contains('active'));
        let next = item.nextElementSibling;
        if (next) next.click();
    }

    prev() {
        let MegaMenus = document.querySelectorAll('.js-mega-menu-container');
        let MenuItems = MegaMenus[1].querySelectorAll('.b-single-patient-journey__mega-menu-content-item');
        let item = [...MenuItems].find(item => item.classList.contains('active'));
        let prev = item.previousElementSibling;

        if (prev) prev.click();
    }
}

export default PrincipalVideo;