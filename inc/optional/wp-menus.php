<?php
    function wpb_custom_new_menu() {
        register_nav_menus(
        array(
            'simplest-navbar' => __( 'Simplest Navbar' ),
            'extra-menu' => __( 'Extra Menu' )
        )
        );
    }
    add_action( 'init', 'wpb_custom_new_menu' );
