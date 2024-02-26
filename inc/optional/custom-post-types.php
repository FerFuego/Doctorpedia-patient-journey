<?php
    function create_post_type() {
        
        // Articles
        register_post_type( 'articles',
            array(
                'labels' => array(
                    'name' => __( 'Articles' ),
                    'singular_name' => __( 'Articles' )
                ),
                'public' => true,
                'show_in_rest' => true,
                'has_archive' => false,
                'supports' => array(
                    'title',
                    'thumbnail',
                    'author',
                    'editor'
                ),
                'rewrite' => array('slug' => 'health-article'),
            )
        );

        // Videos
        register_post_type( 'videos',
            array(
                'labels' => array(
                    'name' => __( 'Videos' ),
                    'singular_name' => __( 'Videos' )
                ),
                'public' => true,
                'show_in_rest' => true,
                'has_archive' => false,
                'supports' => array(
                    'title',
                    'thumbnail',
                    'author',
                ),
                'rewrite' => array('slug' => 'health-video'),
            )
        );

        // Patient Journey
        register_post_type( 'patient-journey',
            array(
                'labels' => array(
                    'name' => __( 'Patient Journey' ),
                    'singular_name' => __( 'Patient Journey' )
                ),
                'public' => true,
                'show_in_rest' => true,
                'rewrite' => false,
                'has_archive' => false,
                'hierarchical' => true,	
                'supports' => array(
                    'title',
                    //'page-attributes'
                ),
                //'rewrite' => array('slug' => 'patient-jounery'),
            )
        );

    }

    add_action( 'init', 'create_post_type' );
?>
