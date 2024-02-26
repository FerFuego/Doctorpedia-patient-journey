class VideoSupport {
    constructor() {
        this.videos = document.querySelectorAll('.js-support-video');
        this.videosLoad = [];
        this.init();
    }

    init() {
        this.playVideo();
    }

    playVideo() {
        this.videos.forEach(video => {
            const videoId = video.getAttribute('video-id')
            let moduleId = video.getAttribute('id')
            const service = video.getAttribute('service')
            const placeHolder = video.querySelector('.support-video__placeholder');

            if(window.innerWidth > 992){

                //Preload iframes on mouseover
                video.addEventListener('mouseover', () => {
                    switch (service) {
                        case 'youtube':
                            if (!video.getAttribute('init')) {
                                moduleId = video.getAttribute('youtube-dom');
                                this.preyoutube(videoId, moduleId);
                                video.setAttribute('init', 'true');
                            }
                            break;
                        case 'vimeo':
                            if (!video.getAttribute('init')) {
                                this.previmeo(videoId, moduleId);
                                video.setAttribute('init', 'true');
                            }
                            break;
                    }
    
                });
    
    
                //Play videos on click
                video.addEventListener('click', ({target}) => {
                    if(!target.classList.contains('js-support-video-next') && !target.classList.contains('js-support-video-prev')){
                        placeHolder.style.background = 'none';
                        const currentVideo = video;
                        switch (service) {
                            case 'youtube':
                                video.setAttribute('play', 'true')
                                try {
                                    const player = this.videosLoad.filter(video => video.m.id == currentVideo.getAttribute('youtube-dom'))[0]
                                    player.playVideo();
                                } catch {}
                                break;
                            case 'vimeo':
                                //Play video
                                video.setAttribute('play', 'true')
                                try {
                                    this.videosLoad.filter(video => video._originalElement.id == moduleId)[0].play();
                                } catch {}
                                break;
                        }
                    }
    
                });
            }else{
                video.addEventListener('click', ({target}) => {
                    switch (service) {
                        case 'youtube':
                            if (!video.getAttribute('init')) {
                                moduleId = video.getAttribute('youtube-dom');
                                this.preyoutube(videoId, moduleId);
                                video.setAttribute('init', 'true');
                            }
                            break;
                        case 'vimeo':
                            if (!video.getAttribute('init')) {
                                this.previmeo(videoId, moduleId);
                                video.setAttribute('init', 'true');
                            }
                            break;
                    }

                    setTimeout(()=>{
                        if(!target.classList.contains('js-support-video-next') && !target.classList.contains('js-support-video-prev')){
                            placeHolder.style.background = 'none';
                            const currentVideo = video;
                            switch (service) {
                                case 'youtube':
                                    video.setAttribute('play', 'true')
                                    try {
                                        const player = this.videosLoad.filter(video => video.m.id == currentVideo.getAttribute('youtube-dom'))[0]
                                        player.playVideo();
                                    } catch {}
                                    break;
                                case 'vimeo':
                                    //Play video
                                    video.setAttribute('play', 'true')
                                    try {
                                        this.videosLoad.filter(video => video._originalElement.id == moduleId)[0].play();
                                    } catch {}
                                    break;
                            }
                        }
                    }, 300)
    
                });
            }


        })
    }

    preyoutube(videoId, moduleId) {
        const self = this;
        if (!document.querySelector('.youtube-api')) {
            const api = document.createElement('script');
            api.src = "https://www.youtube.com/iframe_api";
            api.setAttribute('class', 'youtube-api');
            document.head.appendChild(api)

            api.onload = function () {
                window.YT.ready(function () {
                    const player = new YT.Player(moduleId, {
                        height: '360',
                        width: '640',
                        videoId: videoId,
                        playerVars: {
                            'controls': 1,
                            'showinfo': 0,
                            'rel': 0,
                            'enablejsapi': 1,
                            'autoplay': 0,
                            'wmode': 'transparent'
                        }
                    });

                    self.videosLoad.push(player);
                });
            }
        } else {
            const player = new YT.Player(moduleId, {
                height: '360',
                width: '640',
                videoId: videoId,
                playerVars: {
                    'controls': 1,
                    'showinfo': 0,
                    'rel': 0,
                    'enablejsapi': 1,
                    'autoplay': 1,
                    'wmode': 'transparent'
                }
            });

            self.videosLoad.push(player);
        }
    }

    previmeo(videoId, moduleId) {
        const self = this;
        if (!document.querySelector('.vimeo-api')) {
            const api = document.createElement('script');
            api.src = "https://player.vimeo.com/api/player.js";
            api.setAttribute('class', 'vimeo-api');
            document.head.appendChild(api)

            api.onload = function () {
                const options = {
                    id: videoId,
                    width: 640,
                    loop: false
                };
                const player = new Vimeo.Player(moduleId, options);

                //Add video object
                self.videosLoad.push(player);

            }
        } else {
            const options = {
                id: videoId,
                width: 640,
                loop: false
            };
            const player = new Vimeo.Player(moduleId, options);

            //Add video object
            self.videosLoad.push(player);

        }

    }
}

const videoSupport = new VideoSupport;

export default VideoSupport;