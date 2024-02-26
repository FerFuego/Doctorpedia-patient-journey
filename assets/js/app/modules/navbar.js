import $ from '../usefull/jquery-prefix'; //PREFIX FOR JQUERY

class Navbar{
    init(){
        window.addEventListener('load', () => {
            //Select all navbars available
            const navbars = document.querySelectorAll('[navbar-functions]');
        
            navbars.forEach(navbar => {
                const brandingHeight = navbar.clientHeight
                const toggler = navbar.querySelector('[toggler-menu]');
                const menu = navbar.querySelector('.menu');
                const itemWithSubmenu = menu.querySelectorAll('.menu-item-has-children');
                const links = menu.querySelectorAll('.menu-item > a');
        
                //Setting space from top of the page
                document.querySelector('body').style.paddingTop = brandingHeight + 'px';
    
        
                //Toggler menu (Mobile)
                toggler.addEventListener('click', () => {
        
                    if (toggler.getAttribute('aria-expanded') == 'false') {
        
                        menu.setAttribute('aria-expanded', true);
        
                        toggler.setAttribute('aria-expanded', true)
        
                    } else {
        
                        menu.setAttribute('aria-expanded', false);
        
                        toggler.setAttribute('aria-expanded', false);
        
                    }
        
                });
        
                //Link fist origin
                const firstUrl = window.location.href;
        
                //Sub menu dropdown
                itemWithSubmenu.forEach(item => {
                    const subMenu = item.querySelector('.sub-menu');
                    item.setAttribute('expanded', false);
        
                    //Select Dropdown
                    const link = item.querySelector('a')
        
                    //Remove URL from dropdown
                    link.setAttribute('href', '#');
        
                    item.querySelector('a').addEventListener('click', () => {
                        event.preventDefault()
        
                        if (item.getAttribute('expanded') == 'false') {
                            closeAllDropdowns(itemWithSubmenu);
                            subMenu.style.height = subMenu.scrollHeight + 'px';
                            item.setAttribute('expanded', true);
                        } else {
                            subMenu.style.height = '0px';
                            item.setAttribute('expanded', false);
                        }
        
                    })
        
                });
        
                //Change background on scroll
                window.addEventListener('scroll', function () {
                    if (window.scrollY > 1) {
                        navbar.classList.add('scrolled')
                    } else {
                        navbar.classList.remove('scrolled')
                    }
                });
        
            });
        
        })

    }
}

export default Navbar;

//Close all dropdowns
const closeAllDropdowns = items => {
    items.forEach(item => {
        const submenu = item.querySelector('.sub-menu');
        submenu.style.height = '0px';
        item.setAttribute('expanded', false);
    })
}

//--------------------
// Old Menu dropdown
//--------------------
(function ($) {
    $(function () {
        //------------      
        // Modal close
        //--------------
        $('.big-menu-header__cross').click(() => {
            $('.big-menu-header__cross').css({'display':'none'});
        })

        if ($(window).width() > 1024) {
            // DESKTOP
            $('.has-channels-menu').on('mouseover', function () {
                $('#js-dropdown-channels-menu').css({'top':'87px'});
                $('#js-dropdown-specialty-areas').css({'top':'-600px'});
                //--------------
                // Modal arrow
                //--------------
                $('#js-dropdown-specialty-areas .big-menu-header__arrow-up').css({'display':'none'});
                $('#js-dropdown-channels-menu .big-menu-header__arrow-up').css({'left': $(this).offset().left + 30 + 'px', 'display':'block'});
                //--------------
                // Modal close
                //--------------
                $('.big-menu-header__cross').css({'display':'none'});
            });

            $('#js-dropdown-channels-menu').on('mouseleave', function () {
                $(this).css({'top':'-600px'});
                $('#js-dropdown-channels-menu .big-menu-header__arrow-up').css({'display':'none'});
            });

            $('.has-specialty-areas-menu').on('mouseover', function () {
                $('#js-dropdown-specialty-areas').css({'top':'87px', 'left': '-120px', 'right': '120px'});
                $('#js-dropdown-channels-menu').css({'top':'-600px'});
                //--------------
                // Modal arrow
                //--------------
                $('#js-dropdown-channels-menu .big-menu-header__arrow-up').css({'display':'none'});
                $('#js-dropdown-specialty-areas .big-menu-header__arrow-up').css({'left': $(this).offset().left + 30 + 'px', 'display':'block'});
                //--------------
                // Modal close
                //--------------
                $('.big-menu-header__cross').css({'display':'none'});
            });

            $('#js-dropdown-specialty-areas').on('mouseleave', function () {
                $(this).css({'top':'-600px'});
                $('#js-dropdown-specialty-areas .big-menu-header__arrow-up').css({'display':'none'});
            });

        } else {
            // MOBILE
            //---------------------
            // Hamburger click
            //--------------------
            $('.b-navbar__toggler').on('click', function () {
                $('.main-navigation').slideToggle(300);
                $(this).toggleClass('active');
                $('.big-menu-header').addClass('d-none');
            })
            //---------------------
            // Fix Children links
            //--------------------
            $('.js-site-link').on('click', function () {
                window.location = $(this).attr('href');
            })
            //---------------------
            // Condition dropdown
            //--------------------
            $('li.has-mega-menu, li.has-mega-menu a').on('click', function (ev) {
                ev.preventDefault();
                if ($(this).parent().hasClass('active')) {
                    $(this).parent().removeClass('active');
                    $('#js-dropdown-channels-menu').addClass('d-none');
                    $('#js-dropdown-specialty-areas').addClass('d-none');
                } else {
                    $(this).parent().addClass('active');
                    $('#js-dropdown-channels-menu').addClass('d-none');
                    $('#js-dropdown-specialty-areas').addClass('d-none');
                }
                ev.stopPropagation();
                return false;
            })
            //---------------------
            // Fix Children links
            //--------------------
            $('#top_channels_menu > li > a').on('click', function () {
                window.location = $(this).attr('href');
            })
            //---------------------
            // Channels dropdown
            //--------------------
            $('.has-channels-menu, .has-channels-menu a').on('click', function (ev) {
                ev.preventDefault();
                if ($(this).parent().hasClass('active')) {
                    $(this).parent().removeClass('active');
                    $(this).parent().children('.container').remove();
                    $('#js-dropdown-channels-menu').addClass('d-none');
                    $('#js-dropdown-specialty-areas').addClass('d-none');
                } else {
                    $(this).parent().addClass('active');
                    $('#js-dropdown-channels-menu').removeClass('d-none');
                    $('#js-dropdown-specialty-areas').addClass('d-none');
                }
                ev.stopPropagation();
                return false;
            })
            //---------------------
            // Specialty Areas dropdown
            //--------------------
            $('.has-specialty-areas-menu, .has-specialty-areas-menu a').on('click', function (ev) {
                ev.preventDefault();
                if ($(this).parent().hasClass('active')) {
                    $(this).parent().removeClass('active');
                    $(this).parent().children('.container').remove();
                    $('#js-dropdown-channels-menu').addClass('d-none');
                    $('#js-dropdown-specialty-areas').addClass('d-none');
                } else {
                    $(this).parent().addClass('active');
                    $('#js-dropdown-channels-menu').addClass('d-none');
                    $('#js-dropdown-specialty-areas').removeClass('d-none');
                }
                ev.stopPropagation();
                return false;
            })
        }
    });
})(jQuery);
