class NextChapter {

    constructor() {
        this.chapters = document.querySelectorAll('.js-chapter');
        this.container = document.querySelector('.js-chapter-container');
    }

    init() {
        //Trigger form last hidden chapter
        const hiddenChapters = [...this.chapters].filter(chapter => chapter.classList.contains('hidden'));
        const indexLastHidden = parseInt(hiddenChapters[hiddenChapters.length - 1].getAttribute('data-list'));

        this.chapters.forEach(chapter => {
            chapter.addEventListener('click', this.nextChapter.bind(this, chapter));

            if (parseInt(chapter.getAttribute('data-list')) > indexLastHidden + 4) {
                chapter.classList.add('hidden');
            }

        });
    }

    nextChapter(chapter) {
        let list_id = chapter.getAttribute('data-list');

        // Get items of sidebar for search first step
        let lists = document.querySelectorAll('.sidebar-pj__group');

        lists.forEach(list => {
            if (list.getAttribute('data-list') === list_id) {
                let firstStep = list.querySelector('.js-video-item');
                firstStep.click(); // Event to change video
            }
        });

        // Scroll to top
        if (window.innerWidth > 1025) window.scrollTo(0, 230); // Scroll to top

        // Hide old chapters
        this.chapters.forEach(chapter => {
            if (chapter.getAttribute('data-list') === list_id) {
                chapter.classList.add('hidden');
            }

            if (parseInt(chapter.getAttribute('data-list')) > parseInt(list_id)) {
                chapter.classList.remove('hidden');
                chapter.classList.remove('active');
            }

            if (chapter.getAttribute('data-list') < list_id) {
                chapter.classList.add('hidden');
            }

            if(parseInt(chapter.getAttribute('data-list')) > parseInt(list_id) + 4){
                chapter.classList.add('hidden');
            }

        });

        // Hide Container if no more chapters
        let hiddens = 0;
        this.chapters.forEach(chapter => {
            if (chapter.classList.contains('hidden')) {
                hiddens++
            }
        });
        hiddens === this.chapters.length ? this.container.classList.add('d-none') : this.container.classList.remove('d-none');
    }
}

export default NextChapter;