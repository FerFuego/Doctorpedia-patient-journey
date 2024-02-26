<?php
//For js req http://local.boiler.com/wp-json/spa-settings/v1/forced-pages

add_action('rest_api_init', 'forceSpaRest');

function forceSpaRest()
{
    register_rest_route('spa-settings/v1', 'forced-pages', array(
        'methods' => 'GET',
        'callback' => 'forcedPages'
    ));
}

function forcedPages()
{
    $selectedPages = get_field('force_reload_pages', 'option');
    $forceUrls = [];
    foreach($selectedPages as $post){
        array_push($forceUrls, get_permalink($post));
    }

    return $forceUrls;
}
