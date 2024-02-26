<?php

class Doctorpedia
{

    public function __construct()
    {
        add_action('after_setup_theme', array($this, 'register_custom_nav_menus'));
        add_action('init', array($this, 'build_taxonomies'), 0);
        add_action('init', array($this, 'custom_rewrite_rule'), 10, 0);
        add_action('save_post_patient-journey', array($this, 'add_custom_taxonomy_automatically'), 10, 3);

        add_filter('tiny_mce_before_init', array($this, 'override_tinymce_styles'));
        add_filter('rest_prepare_videos', array($this, 'videos_prepare_response'), 10, 3);

        add_filter('manage_videos_posts_columns', array($this, 'manage_site_placement_column'));
        add_action('manage_videos_posts_custom_column', array($this, 'manage_category_custom_fields'), 10, 2);
        add_filter('manage_articles_posts_columns', array($this, 'manage_site_placement_column'));
        add_action('manage_articles_posts_custom_column', array($this, 'manage_category_custom_fields'), 10, 2);

        add_filter('get_avatar', array($this, 'acf_profile_avatar'), 10, 5);

        # Ajax calls
        add_action('wp_ajax_videoSupportComplement', array($this, 'videoSupportComplement'));
        add_action('wp_ajax_nopriv_videoSupportComplement', array($this, 'videoSupportComplement'));
    }

    /**
     * Get Author data from Doctorpedia.com
     * Push data into response API REST of patient journey
     */
    public function videos_prepare_response($results)
    {
        $author_id = get_post_field('post_author', $results->data['id']);

        $user['name'] = get_the_author_meta('display_name', $author_id);
        $user['avatar'] = wp_get_attachment_image_src(get_user_meta($author_id, 'dp_local_avatar', true), 'thumbnail')[0];
        $user['link'] = get_user_meta($author_id, 'doctorpedia_url', true);
        $user['description'] = get_user_meta($author_id, 'specialty_areas', true);

        $results->data['author'] = $user;

        return $results;
    }

    /**
     * Register Menu
     */
    public function register_custom_nav_menus()
    {
        register_nav_menus(array(
            'top_big_menu' => 'Doctorpedia Big Menu'
        ));

        register_nav_menus(array(
            'top_channels_menu' => 'Doctorpedia Channels Menu'
        ));
    }

    /**
     * Add taxonomies to post_types
     */
    public function build_taxonomies()
    {
        register_taxonomy(
            'site-placement',
            // post types name
            array(
                'videos',
                'articles',
                'blogs',
                'app-reviews',
                'organizations',
                'clinical-trials'
            ),
            array(
                'hierarchical' => true,
                'label' => 'Site Placement',
                'query_var' => true,
                'rewrite' => true,
                'public' => false,
                'show_ui' => true,
                'show_admin_column' => true,
                'show_in_nav_menus' => true,
                'show_tagcloud' => true,
                'show_in_rest' => true,
            )
        );
    }

    /*
	 * Create rules for patient journey
     * DO NOT REMOVE. This function fix redirect urls
     * Ex: ?patient-journey=post-name to /patient-journey/post-name
     */
    public function custom_rewrite_rule()
    {
        query_posts([
            'post_type' => 'patient-journey',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'nopaging' => true
        ]);
        while (have_posts()) : the_post();
            global $post;
            add_rewrite_rule('^' . $post->post_name . '([^/]*)/?', 'index.php?post_type=patient-journey&name=' . $post->post_name, 'top');
        endwhile;
        wp_reset_query();
        flush_rewrite_rules($hard = true);
    }

    /**
     * Add Custom Taxonomy Automatically
     */
    public function add_custom_taxonomy_automatically($post_id, $post, $update)
    {
        global $wpdb;
        $post = get_post($post_id);
        $post_name = $post->post_name;
        $post_title = $post->post_title;
        $post_status = $post->post_status;

        if ($post_status == 'publish') {
            $taxonomy = 'site-placement';
            $term = $post_title;
            $term_slug = $post_name;

            $term_id = term_exists($term, $taxonomy);
            if ($term_id == 0) {
                wp_insert_term($term, $taxonomy, array('slug' => $term_slug));
            }
        }
    }

    /**
     * Parse URL for patient journey
     */
    public static function parseUrl($url)
    {
        $url = rtrim(ltrim($url, "/"), "/");
        $url = explode("/", $url);
        return $url;
    }

    /**
     * Get First Post Patient Journey
     */
    public static function get_first_post_patient_journey($post_id)
    {
        if (have_rows('timeline')) :
            while (have_rows('timeline')) : the_row();
                if (get_row_index() == 1) :
                    if (have_rows('post_step')) :
                        while (have_rows('post_step')) : the_row();
                            if (get_row_index() == 1) :
                                $item = get_sub_field('item');
                                $author_id = $item->post_author;
                                $author_name = get_the_author_meta('display_name', $author_id);
                                $author_avatar = wp_get_attachment_image_src(get_user_meta($author_id, 'dp_local_avatar', true), 'thumbnail' )[0];
                                $author_url = get_user_meta($author_id, 'doctorpedia_url', true);
                                $description = get_user_meta($author_id, 'specialty_areas', true);
                                $video_id = $item->ID;
                                $video_link = get_post_meta($item->ID, 'video_link', true);
                                $video_title = $item->post_title;
                                $video_transcript = get_post_meta($item->ID, 'video_transcript', true);
                                $video_thumbnail = get_the_post_thumbnail_url($item->ID, 'large');
                            endif;
                        endwhile;
                    endif;
                endif;
            endwhile;
        endif;

        return [
            'video_author' => [
                'name' => $author_name ?? '',
                'avatar' => $author_avatar ?? '',
                'link' => $author_url ?? '',
                'description' => $description ?? ''
            ],
            'video_id' => $video_id ?? '',
            'video_link' => $video_link ?? '',
            'video_title' => $video_title ?? '',
            'video_transcript' => $video_transcript ?? '',
            'video_thumbnail' => $video_thumbnail ?? '',
        ];
    }

    /**
     * Get Post by slug Patient Journey
     */
    public static function get_post_patient_journey($post_slug)
    {
        $args = array(
            'name'        => $post_slug,
            'post_type'   => 'videos',
            'post_status' => 'publish',
            'numberposts' => 1
        );
        $result = new WP_Query($args);

        if ($result->have_posts()) :
            while ($result->have_posts()) : $result->the_post();
                global $post;
                $author_id = $post->post_author;
                return [
                    'video_author' => [
                        'name' => get_the_author_meta('display_name', $author_id) ?? '',
                        'avatar' => wp_get_attachment_image_src(get_user_meta($author_id, 'dp_local_avatar', true), 'thumbnail' )[0],
                        'link' => get_user_meta($author_id, 'doctorpedia_url', true) ?? '',
                        'description' => get_user_meta($author_id, 'specialty_areas', true) ?? ''
                    ],
                    'video_id' => get_the_ID(),
                    'video_link' => get_post_meta(get_the_ID(), 'video_link', true),
                    'video_title' => get_the_title(),
                    'video_transcript' => get_post_meta(get_the_ID(), 'video_transcript', true),
                    'video_thumbnail' => get_the_post_thumbnail_url(get_the_ID(), 'full')
                ];
            endwhile;
        endif;

        return false;
    }

    /**
     * Get Video HTML from videoSupport()
     */
    public function videoSupportComplement()
    {
        $html = videoSupport([
            'fied' => '',
            'link' => $_POST['video_link'],
            'button_content' => '',
            'placeholder_url' => $_POST['video_image']
        ]);

        wp_send_json_success(array(
            'success' => true,
            'html' => $html
        ));
    }

    /**
     * Add Customs Styles WYSIWYG on Admin
     */
    public function override_tinymce_styles($mce_init)
    {
        $content_css = get_stylesheet_directory_uri() . '/dp-editor-styles.css';
        if (isset($mce_init['content_css'])) {
            $content_css .= ',' . $mce_init['content_css'];
        }

        $mce_init['content_css'] = $content_css;

        return $mce_init;
    }

    /*
    * Add columns to videos post list
    */
    public function manage_site_placement_column($columns)
    {
        $n_columns = array();
        $title = 'Title';
        foreach ($columns as $key => $value) {
            if ($value == $title) {
                $n_columns[$key] = $value;
                $n_columns['site_placement'] = 'Site Placement';
            } else {
                $n_columns[$key] = $value;
            }
        }
        return $n_columns;
    }

    /*
    * Add data to videos columns to the post list
    */
    public function manage_category_custom_fields($column, $post_id)
    {
        switch ($column) {
            case 'site_placement':
                $taxonomy_names = get_the_terms($post_id, 'site-placement');
                if (!empty($taxonomy_names)) {
                    foreach ($taxonomy_names as $taxonomy_name) {
                        echo esc_html($taxonomy_name->name) . ', ';
                    }
                } else {
                    echo '<span aria-hidden="true">—</span><span class="screen-reader-text">' . __('No terms') . '</span>';
                }
                break;
        }
    }

    /**
     * Use ACF image field as avatar
     * @author Mike Hemberger
     * @link http://thestizmedia.com/acf-pro-simple-local-avatars/
     * @uses ACF Pro image field (tested return value set as Array )
     */
    function acf_profile_avatar($avatar, $id_or_email, $size, $default, $alt)
    {

        $user = '';

        // Get user by id or email
        if (is_numeric($id_or_email)) {

            $id   = (int) $id_or_email;
            $user = get_user_by('id', $id);
        } elseif (is_object($id_or_email)) {

            if (!empty($id_or_email->user_id)) {
                $id   = (int) $id_or_email->user_id;
                $user = get_user_by('id', $id);
            }
        } else {
            $user = get_user_by('email', $id_or_email);
        }

        if (!$user) {
            return $avatar;
        }

        // Get the user id
        $user_id = $user->ID;

        // Get the file id
        $image_id = get_user_meta($user_id, 'dp_local_avatar', true);

        // Bail if we don't have a local avatar
        if (!$image_id) {
            return '<img alt="' . $alt . '" src="' . get_template_directory_uri() .'/assets/img/placeholder/place-holder.svg" class="avatar avatar-' . $size . '" height="' . $size . '" width="' . $size . '"/>';
        }

        // Get the file size
        $image_url  = wp_get_attachment_image_src($image_id, 'thumbnail'); // Set image size by name
        // Get the file url
        $avatar_url = $image_url[0];
        // Get the img markup
        $avatar = '<img alt="' . $alt . '" src="' . $avatar_url . '" class="avatar avatar-' . $size . '" height="' . $size . '" width="' . $size . '"/>';

        // Return our new avatar
        return $avatar;
    }
}

$doctorpedia = new Doctorpedia();
