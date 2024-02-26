<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package DOCTORPEDIA
 */

get_header();
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main b-single-article" data-barba="container" data-barba-namespace="page" data-post-id="<?php the_ID(); ?>">

        <!-- Hero -->
        <?php get_template_part('template-parts/modules/module', 'breadcrumbs'); ?>
        <!-- End Hero -->

        <!-- Content -->
        <div class="b-single-article-content">
            <div class="b-single-article-content__container">
                <div class="b-single-article-content__body">
                    <div class="b-single-article-content__content">
                        <!-- Title -->
                        <?php the_title( '<h1 class="b-single-article-content__header">', '</h1>' ); ?>
                        <!-- End Title -->

                        <!-- Summary -->
                        <p class="b-single-article-content__summary">
                            <?php echo get_field('summary'); ?>
                        </p>
                        <!-- End Summary -->

                        <!-- Picture -->
                        <div class="b-single-article-content__picture">
                            <?php echo get_the_post_thumbnail(get_the_ID(), 'medium', array( 'class' => 'b-single-article-content__picture-img b-single-article-content__picture-img--mini')); ?>
                            <?php echo get_the_post_thumbnail(get_the_ID(), 'large', array( 'class' => 'b-single-article-content__picture-img b-single-article-content__picture-img--mobile')); ?>
                            <?php echo get_the_post_thumbnail(get_the_ID(), 'full', array( 'class' => 'b-single-article-content__picture-img b-single-article-content__picture-img--desktop')); ?>
                        </div>
                        <!-- End Picture -->

                        <!-- Share -->
                        <div class="b-single-article-content__share">
                            <div class="b-single-author__author-share js-cta-modal-journey">
                                <div class="b-single-author__author-share-icon"></div>
                                <span>Share</span>
                            </div>
                        </div>
                        <!-- End Share -->

                        <!-- Content -->
                        <div class="b-single-article-content__paragraph">
                            <?php the_content(); ?>
                        </div>
                        <!-- End Content -->
                    </div>
                </div>

                <!-- Sidebar -->
                <?php get_template_part('partials/single','sidebar'); ?>
                <!-- End Sidebar -->
            </div>
        </div>
        <!-- End Content -->

		</main><!-- #main -->
	</div><!-- #primary -->

    <!-- Modal -->
    <?php set_query_var('type', 'article'); ?>
    <?php get_template_part('partials/patient-journey/modal'); ?>
    <!-- End Modal -->

<?php get_footer(); ?>