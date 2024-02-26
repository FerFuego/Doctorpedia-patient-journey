<div class="b-single-videos-sidebar">
    <div class="b-single-videos-sidebar__line"></div>
    <!-- Related videoss -->
    <div class="b-single-videos-sidebar__content">
        <h4 class="b-single-videos-sidebar__title">Watch Next</h4>
        <!-- List Items -->
        <div class="b-single-videos-sidebar__list js-related-videos-slider">

            <?php 
                foreach( get_the_terms(get_the_ID(), 'site-placement') as $term ) {
                    $terms[] = $term->term_id;
                }
                query_posts([
                    'post_type' => get_post_type(),
                    'status' => 'publish',
                    'posts_per_page' => 12,
                    'post__not_in' => [get_the_ID()],
                    'orderby' => 'date',
                    'order' => 'DESC',
                    'tax_query' => [[
                        'taxonomy' => 'site-placement',
                        'field' => 'term_id',
                        'terms' => $terms
                    ]]
                ]);
            ?>

            <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

                <?php
                    global $post; 
                    $author_id = get_the_author_meta('ID'); ?>
                <!-- Item -->
                <a class="b-single-videos-sidebar__item js-video-item" href="<?php the_permalink(); ?>">
                    <div class="b-single-videos-sidebar__item-image">
                        <div class="b-single-videos-sidebar__item-data" style="background-image: url(<?php echo get_the_post_thumbnail_url(get_the_ID(), 'medium'); ?>)">
                            <div class="b-single-videos-sidebar__item-time"><?php echo get_post_meta(get_the_ID(), 'video_time', true); ?></div>
                        </div>
                    </div>
                    <div class="b-single-videos-sidebar__item-content">
                        <h5 class="b-single-videos-sidebar__item-title" style="-webkit-box-orient: vertical;"><?= trim(end(explode('-', $post->post_title))); ?></h5>
                        <p class="b-single-videos-sidebar__item-author-name">by: <?php echo get_the_author_meta('display_name'); ?></p>

                        <div class="b-single-videos-sidebar__item-author-mobile">
                            <div class="b-single-videos-sidebar__item-author-mobile-image">
                                <img src="<?php echo wp_get_attachment_image_src(get_user_meta($author_id, 'dp_local_avatar', true), 'thumbnail')[0] ?? get_template_directory_uri() . '/assets/img/placeholder/place-holder.svg'; ?>" alt="<?php echo get_the_author($author_id) ?? 'Doctorpedia'; ?>">
                            </div>
                            <div class="b-single-videos-sidebar__item-author-mobile-info">
                                <h5 class="b-single-videos-sidebar__item-author-mobile-name"><?php echo get_the_author($author_id); ?></h5>
                                <p class="b-single-videos-sidebar__item-author-mobile-specialty"><?php echo get_user_meta($author_id, 'specialty_areas', true); ?></p>
                            </div>
                        </div>

                        <button href="<?php the_permalink(); ?>" class="b-single-videos-sidebar__item-cta">Read More</button>
                    </div>
                </a>
                <!-- End Item -->

            <?php endwhile; ?>
            <div class="b-single-videos-sidebar__list-cta js-see-more">More Videos</div>
            <?php endif; ?>

            <?php wp_reset_query(); ?>
        </div>
        <!-- End List Items -->
    </div>
    <!-- End Related videos -->
</div>