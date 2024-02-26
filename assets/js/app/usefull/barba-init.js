//LIBRARIES
import barba from '@barba/core';

//APP SCRIPTS
import ResetClasesBetweenPages from './class-changer';
import stringToHTML from './string-to-html';
import ResetScripts from './reset-scripts';
import ForceReloadPages from './force-reload-spa';

barba.init({
    timeout: 10000,
    transitions: [{
        name: 'opacity-transition',
        leave(data) {},
        enter(data) {}
    }],
    views: [{
        namespace: 'page',
        beforeEnter({
            next
        }) {
            //Scroll top
            window.scroll({
                top: 0,
                behavior: 'auto'
            });

            //Force reload pages
            const forceReload = new ForceReloadPages;
            forceReload.init();
        },
        afterEnter({
            next
        }) {}

    }]

});

//Load new scripts and styles
barba.hooks.beforeEnter((data) => {

    //Reset Scripts
    const nextPage = stringToHTML(data.next.html);
    const resetScripts = new ResetScripts(nextPage)
    resetScripts.init();

    //Reset clases
    const resetClasses = new ResetClasesBetweenPages(nextPage, data.next.url.href);
    resetClasses.init();
});