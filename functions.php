<?php

/**
 * Doctorpedia functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package DOCTORPEDIA
 */

if (!defined('_S_VERSION')) {
	// Replace the version number of the theme on each release.
	define('_S_VERSION', '1.0.0');
}

if (!function_exists('doctorpedia_setup')) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function doctorpedia_setup()
	{
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Doctorpedia, use a find and replace
		 * to change 'doctorpedia' to the name of your theme in all the template files.
		 */
		load_theme_textdomain('doctorpedia', get_template_directory() . '/languages');

		// Add default posts and comments RSS feed links to head.
		add_theme_support('automatic-feed-links');

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support('title-tag');

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support('post-thumbnails');

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(
			array(
				'main-menu' => esc_html__('Primary', 'doctorpedia'),
			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'doctorpedia_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support('customize-selective-refresh-widgets');

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
				'header-text' => array('site-title', 'site-description'),
			)
		);
	}
endif;
add_action('after_setup_theme', 'doctorpedia_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function doctorpedia_content_width()
{
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters('doctorpedia_content_width', 1080);
}
add_action('after_setup_theme', 'doctorpedia_content_width', 0);

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function doctorpedia_widgets_init()
{
	register_sidebar(
		array(
			'name'          => esc_html__('Sidebar', 'doctorpedia'),
			'id'            => 'sidebar-1',
			'description'   => esc_html__('Add widgets here.', 'doctorpedia'),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
//add_action( 'widgets_init', 'doctorpedia_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function doctorpedia_scripts()
{
	//we don't need the block editor css
	wp_dequeue_style('wp-block-library');

	$buildFilesPath = '/assets/build/';
	$absolutePath = array(
		'js' => get_template_directory() . $buildFilesPath,
		'css' => get_template_directory() . $buildFilesPath,
		'spa' => get_template_directory() . $buildFilesPath,
	);

	//Get file path
	if (!is_404()) {
		if (is_page()) {
			if (get_page_template_slug()) {
				$jsFile = $buildFilesPath . str_replace(array('templates/', 'php'), array('', 'min.js'), get_page_template_slug());
				$cssFile = $buildFilesPath . str_replace(array('templates/', 'php'), array('', 'min.css'), get_page_template_slug());
				$absolutePath['js'] .= str_replace(array('templates/', 'php'), array('', 'min.js'), get_page_template_slug());
				$absolutePath['css'] .= str_replace(array('templates/', 'php'), array('', 'min.css'), get_page_template_slug());
			} else {
				$jsFile = $buildFilesPath . 'page.min.js';
				$cssFile = $buildFilesPath . 'page.min.css';
				$absolutePath['js'] .= 'page.min.js';
				$absolutePath['css'] .= 'page.min.css';
			}
		} elseif (is_archive()) {
			$jsFile = $buildFilesPath . 'archive-' . str_replace(array(' '), array('_'), get_post_type()) . '.min.js';
			$cssFile = $buildFilesPath . 'archive-' . str_replace(array(' '), array('_'), get_post_type()) . '.min.css';
			$absolutePath['js'] .= 'archive-' . str_replace(array(' '), array('_'), get_post_type()) . '.min.js';
			$absolutePath['css'] .= 'archive-' . str_replace(array(' '), array('_'), get_post_type()) . '.min.css';
		} elseif (is_single()) {
			if (get_post_type() == 'post') {
				$jsFile = $buildFilesPath . 'single.min.js';
				$cssFile = $buildFilesPath . 'single.min.css';
				$absolutePath['js'] .= 'single.min.js';
				$absolutePath['css'] .= 'single.min.css';
			} else {
				$jsFile = $buildFilesPath . 'single-' . get_post_type() . '.min.js';
				$cssFile = $buildFilesPath . 'single-' . get_post_type() . '.min.css';
				$absolutePath['js'] .= 'single-' . get_post_type() . '.min.js';
				$absolutePath['css'] .= 'single-' . get_post_type() . '.min.css';
			}
		} else {
			$jsFile = $buildFilesPath . 'page.min.js';
			$cssFile = $buildFilesPath . 'page.min.css';
			$absolutePath['js'] .= 'page.min.js';
			$absolutePath['css'] .= 'page.min.css';
		}
	} else {
		$jsFile = $buildFilesPath . '404-page.min.js';
		$cssFile = $buildFilesPath . '404-page.min.css';
		$absolutePath['js'] .= '404-page.min.js';
		$absolutePath['css'] .= '404-page.min.css';
	}

	//Load Styles
	wp_enqueue_style('doctorpedia-theme-page-style', get_theme_file_uri($cssFile),  array(), filemtime($absolutePath['css']));

	//Load Scripts
	wp_enqueue_script('doctorpedia-theme-main', get_theme_file_uri($jsFile), array('jquery'), filemtime($absolutePath['js']), true);

	//Spa Scripts
	if (get_field('spa_web_page', 'option')) {
		wp_enqueue_script('doctorpedia-theme-page-spa', get_theme_file_uri($buildFilesPath . 'spa-webpage.min.js'),  array(), filemtime($absolutePath['spa'] . 'spa-webpage.min.js'), true);
	}


	//Optional google maps api
	if (get_field('api_key', 'option')) {
		wp_register_script('google-maps-js', 'https://maps.googleapis.com/maps/api/js?key=' . get_field('api_key', 'option') . '&libraries=places');
		wp_enqueue_script('google-maps-js');
	}

	wp_localize_script('doctorpedia-app-js', 'Doctorpedia', [
		'ajax' => admin_url('admin-ajax.php')
	]);

	// Load API vars to Axios
	wp_localize_script('doctorpedia-theme-main', 'Doctorpedia', array(
		'rootapiurl' => esc_url_raw(rest_url()),
		'nonce' => wp_create_nonce('wp_rest')
	));

	// Load Ajax
	wp_localize_script('doctorpedia-theme-main', 'ajax', array(
		'url'    => admin_url('admin-ajax.php'),
		'nonce'  => wp_create_nonce('ajax-nonce'),
	));

	if (is_singular() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}
}
add_action('wp_enqueue_scripts', 'doctorpedia_scripts', 100, 0);


/**
 * Automatically loaded theme features
 * If adding a new feature that should always be on, just drop the file into the directory below.
 * If your feature needs special priority, you may want to include it separately as this is not loaded in specific order
 */
$iterator = new RecursiveDirectoryIterator(__DIR__ . '/inc/automatic');
foreach (new RecursiveIteratorIterator($iterator) as $file) {
	if ($file->getExtension() === 'php') {
		require $file;
	}
}

/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
	require get_template_directory() . '/inc/optional/jetpack.php';
}


/**
 * Enable ACF Theme Options
 */
if (function_exists('acf_add_options_page')) {

	acf_add_options_page(array(
		'page_title' 	=> 'Theme General Settings',
		'menu_title'	=> 'Theme Settings',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'Header',
		'menu_title'	=> 'Header',
		'parent_slug' 	=> 'theme-general-settings',
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'Footer',
		'menu_title'	=> 'Footer',
		'parent_slug' 	=> 'theme-general-settings',
	));
}

/**
 * Custom Post Types
 */
require get_template_directory() . '/inc/optional/custom-post-types.php';

/**
 * Custom menus
 */
require get_template_directory() . '/inc/optional/wp-menus.php';

/* Disable WordPress Admin Bar for all users */
add_filter('show_admin_bar', '__return_false');

/**
 * Disable Gutenberg
 */
add_action('admin_init', 'remove_textarea');
function remove_textarea()
{
	remove_post_type_support('page', 'editor');
}

/**
 * Custom Functions
 */
require get_template_directory() . '/inc/optional/custom-functions.php';

/**
 * Classes
 */
require get_template_directory() . '/inc/functions/class-doctorpedia.php';
require get_template_directory() . '/inc/functions/class-big-menu.php';
require get_template_directory() . '/inc/functions/class-cURL.php';

/**
 * API Rest
 */
require get_template_directory() . '/inc/api/search.php';
require get_template_directory() . '/inc/api/video-articles.php';
require get_template_directory() . '/inc/api/breadcrumbs.php';