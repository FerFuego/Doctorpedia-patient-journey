<?php
$post_type = get_post_type();
?>
<div class="col col-12 col-md-4 col-lg-3">
	<article id="post-<?php the_ID(); ?>" <?php post_class( "card card--{$post_type}" ); ?>>
		<header class="entry-header">
			<?php
			the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
			?>
			<div class="entry-meta">
				<?php
				doctorpedia_posted_on();
				doctorpedia_posted_by();
				?>
			</div><!-- .entry-meta -->
		</header><!-- .entry-header -->

		<?php doctorpedia_post_thumbnail(); ?>

		<div class="entry-summary">
			<?php the_excerpt(); ?>
		</div><!-- .entry-summary -->

		<footer class="entry-footer">
			<?php doctorpedia_entry_footer(); ?>
		</footer><!-- .entry-footer -->
	</article><!-- #post-<?php the_ID(); ?> -->
</div>
