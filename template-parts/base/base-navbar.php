<?php 
    //Remember to import this file into the header.php file for it to work!
    //ACF
    $navLogo = get_field('c-navbar__logo', 'option');
    $navLogoMobile = get_field('c-navbar__logo__mobile', 'option');
    
    //CONFIG
    //You can create custom menus from the wp-menus.php file found in the path inc/optional/wp-menus.php
    $theme_location_menu = 'main-menu'; //Set your menu from here
?>

<div class="b-navbar" navbar-functions>

    <div class="b-navbar__container container">

        <!-- Navbar logo desktop -->
        <a href="/">
            <?php if($navLogo) : ?>
                <img
                    width="215"
                    height="33.38" 
                    src="<?php echo $navLogo['url']; ?>" 
                    alt="<?php echo $navLogo['url']; ?>" 
                    class="b-navbar__logo">
            <?php endif; ?>

            <!-- Navbar logo mobile -->
            <?php if($navLogoMobile) : ?>
                <img 
                    width="52"
                    height="44"
                    src="<?php echo $navLogoMobile['url']; ?>" 
                    alt="<?php echo $navLogoMobile['url']; ?>" 
                    class="b-navbar__logo-mobile">
            <?php endif; ?>
        </a>

        <!-- Toggler button for mobile -->
        <button class="b-navbar__toggler" aria-expanded="false" toggler-menu>
            <span></span>
            <span></span>
            <span></span>
        </button>
        
        <?php //Nav menu 
            wp_nav_menu( array( 
                'theme_location' => $theme_location_menu, //Nav menu selector
                'container_class' => 'menu b-navbar__menu') //Nav menu class
            ); 
        ?>

    </div>

</div>