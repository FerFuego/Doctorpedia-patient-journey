<?php

/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package DOCTORPEDIA
 */

get_header();

$wp_link = Doctorpedia::parseUrl($_SERVER['REQUEST_URI']);
?>

<div id="primary" class="content-area">
    <main id="main" class="site-main b-single-patient-journey" data-barba="container" data-barba-namespace="page" data-post-id="<?php the_ID(); ?>">

        <div class="b-single-patient-journey__container js-search-hero-container">
            <!-- Hero -->
            <div class="b-single-patient-journey__hero js-search-hero">
                <div class="b-single-patient-journey__breadcrumb">
                    <a
                        class="b-single-patient-journey__breadcrumb-father" 
                        href="<?php echo get_field('link_to_channel')['url']?? 'https://www.doctorpedia.com/channels/'; ?>">
                        <?php echo get_field('link_to_channel')['title']?? 'Channels'; ?>
                    </a> 
                    <div class="b-single-patient-journey__breadcrumb-current js-data-taxonomy" data-taxonomy="<?php echo sanitize_title(get_the_title()); ?>"><?php the_title(); ?></div>
                </div>
                <?php the_title('<h2 class="b-single-patient-journey__title">', '</h2>'); ?>
            </div>
            <!-- End Hero -->

            <!-- Tabs Menu -->
            <div class="b-single-patient-journey__tabber js-search-tabs">
                <div class="b-single-patient-journey__tabber-content">
                    <span href="<?php echo home_url(sanitize_title(get_the_title())); ?>" class="b-single-patient-journey__tabber-link js-tab-content active" id="journey">
                        Video Journey
                    </span>
                    <?php foreach (get_field('show_tab_content') as $tab) : ?>
                        <span href="<?php echo home_url(sanitize_title(get_the_title()) . '/' . $tab['value']); ?>" class="b-single-patient-journey__tabber-link js-tab-content" id="<?php echo $tab['value']; ?>">
                            <?= $tab['label']; ?>
                        </span>
                    <?php endforeach ?>
                </div>
                <div class="b-single-patient-journey__search">
                    <div class="b-single-patient-journey__search-container">
                        <div class="b-single-patient-journey__close-search js-search-close d-none"></div>
                        <div class="b-single-patient-journey__search-skip js-search-skip"></div>
                        <input type="text" placeholder="Search in Patient Journey..." class="b-single-patient-journey__search-input js-search-resources"/>
                        <div class="b-single-patient-journey__data-list js-search-datalist d-none"></div>
                    </div>
                    <input type="submit" class="b-single-patient-journey__search-button js-search-resources-btn" value="">
                </div>
            </div>
            <!-- End Tabs Menu -->
        </div>

        <!-- Mega Menu Desktop -->
        <?php get_template_part('partials/patient-journey/mega-menu'); ?>
        <!-- End Mega Menu Desktop -->

        <!-- Tabs Content -->
        <div class="b-single-patient-journey__tabs">
            <div class="b-single-patient-journey__shadow d-none js-search-shadow"></div>
            <?php
            #Tab Articles
            get_template_part('template-parts/patient-journey/articles');
            #Tab Videos
            get_template_part('template-parts/patient-journey/videos');
            #Tab Journey
            get_template_part('template-parts/patient-journey/journey');
            #Tab Search
            get_template_part('template-parts/patient-journey/search');
            ?>
        </div>
        <!-- End Tabs Content -->

    </main><!-- #main -->
</div><!-- #primary -->

<!-- Modal -->
<?php set_query_var('type', 'video'); ?>
<?php get_template_part('partials/patient-journey/modal'); ?>
<!-- End Modal -->

<?php get_footer(); ?>