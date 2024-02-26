<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package DOCTORPEDIA
 */

get_header();
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" data-barba="container" data-barba-namespace="page">

		<?php if ( have_posts() ) : ?>

			<header class="page-header">
				<div class="container-lg">
					<div class="row">
						<div class="col">
							<?php
							the_archive_title( '<h1 class="page-title">', '</h1>' );
							the_archive_description( '<div class="archive-description">', '</div>' );
							?>
						</div>
					</div>
				</div>
			</header><!-- .page-header -->

			<?php

			get_template_part( 'template-parts/loops/loop' );

		else :

			get_template_part( 'template-parts/content', 'none' );

		endif;
		?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
