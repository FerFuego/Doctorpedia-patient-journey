<?php

/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package DOCTORPEDIA
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php echo get_field('extra_codes', 'option'); ?>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?> data-barba="wrapper">
	<?php wp_body_open(); ?>
	<?php echo get_field('body_codes', 'option'); ?>

	<div id="page" class="site">

		<header id="masthead" class="site-header">

			<?php get_template_part('template-parts/base/base', 'navbar'); ?>

		</header><!-- #masthead -->

		<div id="content" class="site-content">