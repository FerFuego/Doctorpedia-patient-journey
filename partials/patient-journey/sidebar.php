<?php wp_reset_postdata(); ?>

<div class="sidebar-pj">
    <div class="sidebar-pj__line"></div>
    <div class="sidebar-pj__content js-sidebar-playlist">
        <?php if (have_rows('timeline')) :
            //$numrows = count( get_field( 'timeline', get_the_ID() ) );
            while (have_rows('timeline')) : the_row();
                $row_id = get_row_index();  ?>
                <div class="sidebar-pj__group <?php echo $row_id == 1 ? 'active' : ''; ?>" data-list="<?php echo $row_id; ?>">
                    <h4 class="sidebar-pj__title"><?php the_title(); ?> <?php the_sub_field('title_step'); ?></h4>
                    <!-- List Items -->
                    <div class="sidebar-pj__list">
                        <?php if (have_rows('post_step')) :
                            while (have_rows('post_step')) : the_row();
                                $item = get_sub_field('item');
                                $video = get_field('video_link', $item->ID);
                                $image = get_the_post_thumbnail_url($item->ID, 'thumbnail');
                        ?>
                                <!-- Item -->
                                <div class="sidebar-pj__item js-video-item" data-post-id="<?php echo $item->ID; ?>" data-list="<?php echo $row_id; ?>" title="<?= esc_attr(trim(end(explode('-', $item->post_title)))); ?>">
                                    <div class="sidebar-pj__item-video">
                                        <div class="sidebar-pj__item-data" style="background-image: url(<?php echo $image; ?>)">
                                            <div class="sidebar-pj__item-time"><?php echo get_post_meta($item->ID, 'video_time', true); ?></div>
                                        </div>
                                    </div>
                                    <div class="sidebar-pj__item-content">
                                        <h5 class="sidebar-pj__item-title" style="-webkit-box-orient: vertical;"><?php echo trim(end(explode('-', $item->post_title))); ?></h5>
                                        <p class="sidebar-pj__item-author">by: <?php echo get_the_author_meta('display_name', $item->post_author); ?></p>
                                    </div>
                                </div>
                                <!-- End Item -->
                        <?php endwhile;
                        endif; ?>
                    </div>
                    <!-- End List Items -->
                    <div class="sidebar-pj__list-cta js-see-more">More Videos</div>
                </div>
        <?php endwhile;
        endif; ?>
    </div>
</div>