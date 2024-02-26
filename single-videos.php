<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package DOCTORPEDIA
 */

get_header();

global $post;
$video_title = $post->post_title; // Get the title of the video
$video_title = explode('-', $video_title); // Split the title into an array
$video_title = end($video_title); // Get the last element of the array
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main b-single-videos" data-barba="container" data-barba-namespace="page" data-post-id="<?php the_ID(); ?>">

        <!-- Hero -->
        <?php get_template_part('template-parts/modules/module', 'breadcrumbs'); ?>
        <!-- End Hero -->

        <!-- Content -->
        <div class="b-single-videos-content">
            <div class="b-single-videos-content__container">
                <div class="b-single-videos-content__body">
                    <div class="b-single-videos-content__content">
                        
                        <!-- Video Player -->
                        <div class="b-single-videos-content__featured-video js-principal-video">
                            <?= videoSupport([
                                'field' => '',
                                'link' => get_post_meta(get_the_ID(), 'video_link', true),
                                'button_content' => '',
                                'placeholder_url' => get_the_post_thumbnail_url(get_the_ID(), 'full')
                            ]); ?>
                        </div>
                        <!-- End Video Player -->

                        <!-- Title -->
                        <div class="b-single-videos-content__header">
                            <h1 class="b-single-videos-content__header-title"><?= $video_title; ?></h1>
                            <div class="b-single-videos-content__header-date"><?= get_the_date(); ?></div>
                        </div>
                        <!-- End Title -->
                        
                        <!-- Author -->
                        <?php get_template_part('partials/single','author'); ?>
                        <!-- End Author -->
                        
                        <!-- Content -->
                        <div class="b-single-videos-content__paragraph">
                            <h4 class="b-single-videos-content__transcript-title">Transcript</h4>
                            <?= get_field('video_transcript'); ?>
                        </div>
                        <!-- End Content -->
                    </div>
                </div>

                <!-- Sidebar -->
                <?php get_template_part('partials/single','videos-sidebar'); ?>
                <!-- End Sidebar -->
            </div>
        </div>
        <!-- End Content -->

		</main><!-- #main -->
	</div><!-- #primary -->

    <!-- Modal -->
    <?php set_query_var('type', 'video'); ?>
    <?php get_template_part('partials/patient-journey/modal'); ?>
    <!-- End Modal -->

<?php get_footer(); ?>