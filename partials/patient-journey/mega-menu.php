<?php wp_reset_postdata(); ?>

<div class="b-single-patient-journey__mega-menu js-mega-menu-container <?= $args['device'] == 'mobile' ? 'b-single-patient-journey__mega-menu--mobile' : ''; ?>">
            
    <?php if (have_rows('timeline')) : 
        $numrows = count( get_field( 'timeline', get_the_ID() ) ); ?>
        
        <div class="b-single-patient-journey__mega-menu-container-cta">
            <div class="b-single-patient-journey__mega-menu-timeline-cta js-mega-menu-cta"></div>
        </div>
        
        <div class="b-single-patient-journey__mega-menu-container js-mega-menu">
            
            <div class="b-single-patient-journey__mega-menu-timeline-cta b-single-patient-journey__mega-menu-timeline-cta--mobile js-mega-menu-cta">
                <!-- See More / See Less -->
            </div>
            
            <?php while (have_rows('timeline')) : the_row(); 
                $row_id = get_row_index(); ?>

                <div class="b-single-patient-journey__mega-menu-item">
                    <div class="b-single-patient-journey__mega-menu-timeline">
                        <div class="b-single-patient-journey__mega-menu-timeline-icon js-cta-play <?php echo $row_id == 1 ? 'active':''; ?>" data-list="<?php echo $row_id; ?>"></div>
                        <?php if ($row_id == $numrows && !wp_is_mobile()) : ?>
                            <!-- No CTA collapsible -->
                        <?php elseif ($row_id == $numrows && wp_is_mobile()) : ?>
                            <!-- No line -->
                        <?php else: ?>
                            <div class="b-single-patient-journey__mega-menu-timeline-line"></div>
                        <?php endif; ?>
                    </div>

                    <div class="b-single-patient-journey__mega-menu-mobile">
                        <h4 class="b-single-patient-journey__mega-menu-title" data-list="<?php echo $row_id; ?>">
                            <?php the_sub_field('title_step'); ?>
                        </h4>
                        <?php if (have_rows('post_step')) : ?>
                            <div class="b-single-patient-journey__mega-menu-content">
                                <?php while (have_rows('post_step')) : the_row(); 
                                    $item = get_sub_field('item'); 
                                    $briefTitle = get_field('brief_title', $item->ID); ?>
                                    <span 
                                        class="b-single-patient-journey__mega-menu-content-item <?php echo get_row_index() == 1 && $row_id == 1 ? 'active':''; ?>" 
                                        data-post-id="<?php echo $item->ID; ?>"
                                        data-list="<?php echo $row_id; ?>"
                                        title="<?= esc_attr(trim(end(explode('-', $item->post_title)))); ?>"
                                        >
                                            <?= $briefTitle ? $briefTitle : trim(end(explode('-', $item->post_title))); ?>
                                    </span>
                                <?php endwhile; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                    
                </div>
                
            <?php endwhile; ?>

        </div>
        
        <div class="b-single-patient-journey__control-slide">
            <div class="b-single-patient-journey__controls">
                <span class="b-single-patient-journey__prev-btn inactive" id="js-prev-slide"></span>
                <span class="b-single-patient-journey__next-btn" id="js-next-slide"></span>
            </div>
        </div>

    <?php endif; ?>

</div>