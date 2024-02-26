<?php
add_action('rest_api_init', 'doctorpedia_search_rest_api_init');

/*
* Add custom endpoint for resources patient-journey
*/
function doctorpedia_search_rest_api_init()
{
    register_rest_route('wp/v2', 'patient-journey-search', array(
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'get_patient_journey_search_data'
    ));
}

/**
 * Get Patient Journey Posts API
 * @return json
 */
function get_patient_journey_search_data($data)
{
    if (trim($_GET['search']) == '') {
        wp_send_json_success([
            'articles_count' => 0,
            'videos_count' => 0
        ]);
    }
    
    // Response for dropdown search
    if ($_GET['datalist'] == 'true') {

        $html = $videos = $articles = '';
        $args = [
            'post_type' => array('videos', 'articles'),
            's' => sanitize_text_field($_GET['search']),
            'post_status' => 'publish',
            'posts_per_page' => 10,
            'orderby' => 'date',
            'order' => 'DESC',
            'tax_query' => [[
                'taxonomy' => 'site-placement',
                'field' => 'slug',
                'terms' => sanitize_text_field($_GET['taxonomy'])
            ]]
        ];

        $query = new WP_Query($args);
        $posts = $query->get_posts();

        foreach ($posts as $post) :
            if ($post->post_type == 'videos') {
                $videos .= '<a href="'.get_post_permalink($post->ID).'" class="b-single-patient-journey__data-item js-search-datalist-item">' . trim(end(explode('-', $post->post_title))) . '</a>';
            }
            if ($post->post_type == 'articles') {
                $articles .= '<a href="'.get_post_permalink($post->ID).'" class="b-single-patient-journey__data-item js-search-datalist-item">' . trim(end(explode('-', $post->post_title))) . '</a>';
            }
        endforeach;

        if ($videos != '') {
            $html .= '<div class="b-single-patient-journey__data-item-group">
                        <h3 class="b-single-patient-journey__data-item-group-title">Videos</h3>
                        <div class="b-single-patient-journey__data-item-group-list">' . $videos . '</div>
                    </div>';
        }

        if ($articles != '') {
            $html .= '<div class="b-single-patient-journey__data-item-group">
                        <h3 class="b-single-patient-journey__data-item-group-title">Articles</h3>
                        <div class="b-single-patient-journey__data-item-group-list">' . $articles . '</div>
                    </div>';
        }

        wp_send_json_success([
            'html' => $posts ? $html : '',
        ]);
    }

    // Response for search results
    $x = $y = 0;
    $html = $videos = $articles = '';
    $args = [
        'post_type' => array('videos', 'articles'),
        's' => sanitize_text_field($_GET['search']),
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'orderby' => 'date',
        'order' => 'DESC',
        'tax_query' => [[
            'taxonomy' => 'site-placement',
            'field' => 'slug',
            'terms' => sanitize_text_field($_GET['taxonomy'])
        ]]
    ];

    $query = new WP_Query($args);
    $posts = $query->get_posts();

    if (!empty($posts)) :
        foreach ($posts as $post) :
            ob_start();
            set_query_var('newpost', $post);
            
            // Cards for Videos
            if ($post->post_type == 'videos') : $y++;
                get_template_part('partials/patient-journey/card', 'video');
                $videos .= ob_get_contents();
            endif;
        
            // Cards for Articles
            if ($post->post_type == 'articles') : $x++;
                get_template_part('partials/patient-journey/card', 'article');
                $articles .= ob_get_contents();
            endif;

            ob_end_clean();
        endforeach;
    endif;
    
    wp_send_json_success([
        'articles' => $articles,
        'articles_count' => $x,
        'videos' => $videos,
        'videos_count' => $y
    ]);
}