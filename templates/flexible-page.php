<?php

/**
 * The template for displaying module pages
 * Template Name: Flexible Page
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package DOCTORPEDIA
 */

get_header();
?>

	<main id="main" class="site-main" data-barba="container" data-barba-namespace="page">


		<?php
		while (have_rows('flexible_content')) :

			the_row();
			$module = get_row_layout();
			include(get_template_directory() . '/partials/module-begin.php');
			include(get_template_directory() . '/partials/module-background.php');
			get_template_part('template-parts/modules/module', $module);
			include(get_template_directory() . '/partials/module-end.php');

		endwhile;
		?>

	</main><!-- #main -->

<?php
get_footer();
