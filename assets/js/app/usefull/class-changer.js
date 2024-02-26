class ResetClasesBetweenPages {
    constructor(nextPage, url) {
        this.htmlNext = nextPage;
        this.bodyNext = this.htmlNext.body;
        this.document = document;
        this.body = this.document.body;
        this.nextUrl = url;
    }

    init() {
        this.bodyClasses();
        this.menuCurrentPageClass();
    }

    bodyClasses() {
        const nextPageClass = this.bodyNext.classList;
        this.body.classList = nextPageClass;
    }

    menuCurrentPageClass() {
        //WP menus current page fix classes and attr
        const menus = this.body.querySelectorAll('ul.menu');

        menus.forEach(menu => {
            //Each menu
            const menuItems = menu.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                const link = item.firstChild;
                const parentItem = item.closest('.menu-item-has-children');

                //Unset classes and attr
                item.classList.remove('current-menu-item');
                item.classList.remove('current_page_item');
                link.removeAttribute('aria-current');

                //Unset classes for parents and ancestors
                if (parentItem) {
                    parentItem.classList.remove('current-menu-parent')
                    parentItem.classList.remove('current_page_parent')

                    //Ancestors
                    const ancestor = parentItem.parentNode;
                    if(ancestor.classList.contains('menu')) {
                        parentItem.classList.remove('current-menu-ancestor')
                        parentItem.classList.remove('current_page_ancestor')
                    }
                }

                if (link.href == this.nextUrl) {
                    //Add classes to li element
                    item.classList.add('current-menu-item');
                    item.classList.add('current_page_item');

                    //Add WP attr aria-current to link
                    link.setAttribute('aria-current', 'page')

                    //Set classes for parents
                    if (parentItem) {
                        setTimeout(() => {
                            //Parents
                            parentItem.classList.add('current-menu-parent');
                            parentItem.classList.add('current_page_parent');

                            //Ancestors
                            const ancestor = parentItem.parentNode;
                            if (ancestor.classList.contains('menu')) {
                                parentItem.classList.add('current-menu-ancestor')
                                parentItem.classList.add('current_page_ancestor')
                            }else{
                                const ancestorTop = parentItem.parentNode.closest('.menu-item-has-children');
                                ancestorTop.classList.add('current-menu-ancestor');
                                ancestorTop.classList.add('current_page_ancestor')
                            }
                        }, 100)
                    }
                }

            });
        })
        
    }
    
}

export default ResetClasesBetweenPages;