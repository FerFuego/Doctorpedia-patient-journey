import barba from '@barba/core';

class ForceReloadPages {
    constructor(){
        this.permaliks;
        this.selectedLinks;
    }

    init() {
        this.getPermalinks();
    }

    getPermalinks(){
        //Api rest call
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', `${window.location.origin}/patient-journey/wp-json/spa-settings/v1/forced-pages`, true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    //Res content
                    try{

                        this.permaliks = JSON.parse(xmlhttp.responseText);
    
                        //Forced Links
                        for(let i = 0; this.permaliks.length > i; i++){
                            let links = document.querySelectorAll(`[href="${this.permaliks[i]}"]`);
                            links.forEach(link=>{
                                if(link.getAttribute('permalink') != ''){
                                    //Removing href
                                    link.setAttribute('permalink', link.getAttribute('href'));
                                    link.removeAttribute('href');
    
                                    //Force reload page
                                    link.addEventListener('click', () => {
                                        barba.force(link.getAttribute('permalink'));
                                    })
                    
                                }
                            })
    
                        }
                    }catch{}
                    
                }
            }
        };
        xmlhttp.send(null);
    }
}

export default ForceReloadPages;