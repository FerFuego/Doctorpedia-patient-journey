class ResetScripts{
    constructor(html){
        this.script = html.querySelector('#doctorpedia-main-js');
        this.style = html.querySelector('#doctorpedia-page-style-css');
    }

    init(){
        this.reloadScripts();
        this.reloadStyles();
        this.reloadLazyload();
    }
    
    reloadScripts(){
        //Create new element
        const scripts = document.createElement('script');
        scripts.src = this.script.src;
        scripts.setAttribute("id", "doctorpedia-main-js");
        document.body.appendChild(scripts);

        //Remove prev element
        scripts.onload = function () {
            document.querySelector('#doctorpedia-main-js').remove();
        } 
    }
    
    reloadStyles(){
        //Create new element
        const styles = document.createElement('link');
        styles.setAttribute("rel", "stylesheet");
        styles.setAttribute("href", this.style.href);
        styles.setAttribute("id", "doctorpedia-page-style-css");
        styles.setAttribute("all", "media");
        document.head.appendChild(styles);
        
        //Remove prev element
        styles.onload = function () {
            document.querySelector('#doctorpedia-page-style-css').remove();
        }
    }

    reloadLazyload(){
        //Create new element
        const scripts = document.createElement('script');
        scripts.src = `${window.origin}/wp-content/plugins/w3-total-cache/pub/js/lazyload.min.js`;
        scripts.setAttribute("id", "doctorpedia-lazy-load-js");
        document.body.appendChild(scripts);

        //Remove prev element
        scripts.onload = function () {
            document.querySelector('#doctorpedia-lazy-load-js').remove();
        } 
    }

}

export default ResetScripts;