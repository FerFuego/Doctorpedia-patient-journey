<?php
add_action('rest_api_init', 'doctorpedia_articles_rest_api_init');
/*
* Add custom endpoint for resources patient-journey
*/
function doctorpedia_articles_rest_api_init()
{
    register_rest_route('wp/v2', 'patient-journey-posts', [
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'get_patient_journey_posts_api'
    ]);
}

/**
 * Get Patient Journey Posts API
 * @return html
 */
function get_patient_journey_posts_api()
{
    $x = 0;
    $html = '';
    $paginator = '';
    $page = $_GET['page'] ?? 1;
    $post_type = $_GET["post_type"] ?? null;
    $taxonomy = $_GET["taxonomy"] ?? null;

    if ($post_type == 'videos') {
        $ppp = 16;
    } else {
        $ppp = 9;
    }

    $args = [
        'post_type' => $post_type,
        'post_status' => 'publish',
        'posts_per_page' => $ppp,
        'number' => $ppp,
        'paged' => $page,
        'orderby' => 'date',
        'order' => 'DESC',
        'tax_query' => [[
            'taxonomy' => 'site-placement',
            'field' => 'slug',
            'terms' => $taxonomy
        ]]
    ];

    $query = new WP_Query($args);
    $posts = $query->get_posts();

    if (!empty($posts)) :

        $total_posts = $query->found_posts;
        $num_pages = ceil($total_posts / $ppp);

        //--------------------
        // Cards
        //--------------------
        foreach ($posts as $post) : $x++;
            ob_start();
            set_query_var('newpost', $post);

            switch ($post_type) {
                case 'blogs':
                    get_template_part('partials/patient-journey/card', 'blog');
                    break;
                case 'articles':
                    get_template_part('partials/patient-journey/card', 'article');
                    break;
                case 'videos':
                    get_template_part('partials/patient-journey/card', 'video');
                    break;
            }
            $html .= ob_get_contents();
            ob_end_clean();
        endforeach;

        //--------------------
        // Paginator
        //--------------------
        ob_start();
        set_query_var('num_pages', $num_pages);
        set_query_var('current_page', $page);
        get_template_part('template-parts/patient-journey/paginator');
        $paginator .= ob_get_contents();
        ob_end_clean();

    else :
        $html = '<h2 class="col-12">No posts found</h2>';
    endif;

    wp_send_json_success([
        'html'  => $html,
        'count' => $x,
        'total' => $query->found_posts,
        'paginator' => $paginator
    ]);
}

add_action('rest_api_init', 'doctorpedia_videos_rest_api_init');
function doctorpedia_videos_rest_api_init()
{
    register_rest_route('wp/v2', 'single-video', [
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'singleVideo'
    ]);
}

function singleVideo($data)
{
    $videoId = $data['id'];
    $item = get_post($videoId);
    $author_id = $item->post_author;
    $author_name = get_the_author_meta('display_name', $author_id);
    $author_avatar = wp_get_attachment_image_src(get_user_meta($author_id, 'dp_local_avatar', true), 'thumbnail')[0];
    $author_url = get_user_meta($author_id, 'doctorpedia_url', true);
    $description = get_user_meta($author_id, 'specialty_areas', true);

    return array(
        'title' => get_the_title($videoId),
        'video' => array(
            'url' => get_field('video_link', $videoId),
            'description' => get_field('video_transcript', $videoId),
            'thumbnail' => get_the_post_thumbnail_url($videoId, 'full')
        ),
        'author' => array(
            'name' => $author_name,
            'avatar' => $author_avatar,
            'url' => $author_url,
            'description' => $description
        )
    );
}
