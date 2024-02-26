import Api from '../usefull/api';

class Breadcrumbs {
    constructor() {
        this.breadcrumbs = document.querySelector('.js-breadcrumbs')
        this.prevPage = document.referrer;
        this.postId = this.breadcrumbs.getAttribute('post_id');
        this.parent = this.breadcrumbs.querySelector('[father_page]');
        this.archive = this.breadcrumbs.querySelector('[archive_page]');
    }

    init() {
        this.getPageHistory();
    }

    getPageHistory(){
        Api.get('/breadcrumbs/v1/history', {
            params: {
                prev_page: this.prevPage,
                post_id: this.postId 
            }
        })
        .then(response => {
            if(response.data){
                //Top level
                this.parent.innerHTML = response.data.title;
                this.parent.setAttribute('href', response.data.permalink);

                //Archive
                this.archive.setAttribute('href', response.data.archive);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
}

export default Breadcrumbs;