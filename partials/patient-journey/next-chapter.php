<?php  wp_reset_postdata(); ?>

<div class="chapters js-chapter-container">
    <div class="chapters__header">
        <h4 class="chapters__title">Next Section</h4>
    </div>
    <div class="chapters__body">
        <div class="chapters__content">
            <?php if (have_rows('timeline')) : 
                while (have_rows('timeline')) : the_row(); 
                    $row_id = get_row_index();  ?>    
                    <!-- Chapter -->
                    <div class="chapters__card js-chapter <?php echo $row_id == 1 ? 'hidden':''; ?>" data-list="<?php echo $row_id; ?>">
                        <div class="chapters__card-video">
                            <div class="chapters__card-data" style="background-image: url(<?php echo get_sub_field('chapter_image_')['sizes']['medium_large'] ?? ''; ?>)"></div>
                        </div>
                        <div class="chapters__card-content">
                            <h5 class="chapters__card-title" style="-webkit-box-orient: vertical;"><?php the_sub_field('title_step'); ?></h5>
                        </div>
                    </div>
                    <!-- End Chapter -->
            <?php endwhile; endif; ?>
        </div>
    </div>
</div>