<?php
//Disable wp embed
/*function my_deregister_scripts()
{
	wp_deregister_script('wp-embed');
}
add_action('wp_footer', 'my_deregister_scripts');*/

//Disable Wp Emojis
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

//Disable jquery migrate
function dequeue_jquery_migrate($scripts)
{
	if (!is_admin() && !empty($scripts->registered['jquery'])) {
		$scripts->registered['jquery']->deps = array_diff(
			$scripts->registered['jquery']->deps,
			['jquery-migrate']
		);
	}
}
add_action('wp_default_scripts', 'dequeue_jquery_migrate');
