<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package doctorpedia_theme
 */
     get_header(); 
?>
	<div id="primary" class="content-area">
		<main id="main" class="site-main">

			<section class="error-404">
			
				<header class="error-404__header">
					<h2 class="error-404__title">404</h2>
					<h1 class="error-404__copy"><?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'doctorpedia_theme' ); ?></h1>
					<a class="error-404__link" href="/">Go to the home page</a>
				</header><!-- .page-header -->

				<div class="page-content">
				

				</div><!-- .page-content -->
			</section><!-- .error-404 -->

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>