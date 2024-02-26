<?php
//For js req http://doctorpedia.local/patient-journey/wp-json/breadcrumbs/v1/history

add_action('rest_api_init', 'breadcrumbs');

function breadcrumbs()
{
    register_rest_route('breadcrumbs/v1', 'history', array(
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'breadcrumbsHistory'
    ));
}

function breadcrumbsHistory($data)
{
    //Get parammeters
    $prevPage = $data['prev_page'];
    $post_id = $data['post_id'];
    $prevPageId = url_to_postid($prevPage);

    if ($prevPageId != 0 && get_post_type($prevPageId) == 'patient-journey') {
        return array(
            'title' => get_the_title($prevPageId),
            'permalink' => str_replace('?patient-journey=', '', get_the_permalink($prevPageId)),
            'archive' => str_replace('?patient-journey=', '', get_the_permalink($prevPageId)) . '/' . get_post_type($post_id)
        );
    } else {
        $father_taxonomies = get_the_terms($post_id, 'site-placement');
        $possibles_fathers = array(); //Contains all posible fathers (title and permalink of eachones)
        foreach ($father_taxonomies as $tax) {
            $page = get_page_by_title($tax->name, OBJECT, 'patient-journey');
            $page_data = array(
                'title' => $tax->name,
                'permalink' => str_replace('?patient-journey=', '', get_the_permalink($page)),
                'archive' => str_replace('?patient-journey=', '', get_the_permalink($page)) . '/' . get_post_type($post_id),
                'post_id'=> $post_id,
                'prev_page'=>$prevPage
            );
            array_push($possibles_fathers, $page_data);
        }
        return $possibles_fathers[0];
    }
}
