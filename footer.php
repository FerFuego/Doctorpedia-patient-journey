<?php

/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package DOCTORPEDIA
 */

?>

</div><!-- #content -->

<footer>
	<?php get_template_part('template-parts/base/base', 'footer'); ?>
	<?php echo get_field('footer_codes', 'option'); ?>
</footer><!-- #colophon -->

</div><!-- #page -->

<?php wp_footer(); ?>

</body>

</html>