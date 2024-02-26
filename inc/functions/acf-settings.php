<?php

/**
 * ACF Fix local json
 */
add_filter('acf/settings/load_json', 'my_acf_json_load_point');

function my_acf_json_load_point($paths)
{

	// remove original path (optional)
	unset($paths[0]);


	// append path
	$paths[] = get_stylesheet_directory() . '/acf-json';


	// return
	return $paths;
}

/**
 * ACF google maps api integration
 */

function my_acf_init()
{
	acf_update_setting('google_api_key', get_field('api_key', 'option'));
}
add_action('acf/init', 'my_acf_init');
