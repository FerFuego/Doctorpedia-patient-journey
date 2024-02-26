<?php 
$video_title = $newpost->post_title; // Get the title of the video
$video_title = explode('-', $video_title); // Split the title into an array
$video_title = end($video_title); // Get the last element of the array
$author_id = $newpost->post_author; 
?>
<div class="card-video">
    <a class="card-video__header" href="<?php echo get_the_permalink($newpost->ID); ?>">
        <img class="card-video__header-img" src="<?php echo get_the_post_thumbnail_url($newpost->ID, 'medium') ? get_the_post_thumbnail_url($newpost->ID, 'medium') : get_template_directory_uri() . '/assets/img/placeholder/main-image-journey.png'; ?>" alt="<?php echo get_the_author($author_id) ?? 'Doctorpedia'; ?>">
        <?php echo file_get_contents(get_template_directory_uri() . '/assets/img/icons/video-journey-play-video.svg'); ?>
        <?php if (get_field('video_time', $newpost->ID)) : ?>
            <span class="card-video__header-time"><?= get_field('video_time', $newpost->ID); ?></span>
        <?php endif; ?>
    </a>
    <a class="card-video__link-mobile" href="<?php echo get_the_permalink($newpost->ID); ?>">
        <h3 class="card-video__title" style="-webkit-box-orient: vertical;"><?= $video_title; ?></h3>
    </a>
    <div class="card-video__author">
        <a class="card-video__author-image" href="<?php echo get_user_meta($author_id, 'doctorpedia_url', true); ?>" target="_blank">
            <img src="<?php echo wp_get_attachment_image_src(get_user_meta($author_id, 'dp_local_avatar', true), 'thumbnail')[0] ?? get_template_directory_uri() . '/assets/img/placeholder/place-holder.svg'; ?>" alt="<?php echo get_the_author($author_id) ?? 'Doctorpedia'; ?>">
        </a>
        <div class="card-video__author-info">
            <a class="card-video__author-link" href="<?php echo get_user_meta($author_id, 'doctorpedia_url', true); ?>" target="_blank">
                <h5 class="card-video__author-name"><?php echo get_the_author_meta( 'display_name', $author_id ) ?></h5>
            </a>
        </div>
    </div>
    <div class="card-video__body">
        <a class="card-video__link-title" href="<?php echo get_the_permalink($newpost->ID); ?>">
            <h3 class="card-video__title" style="-webkit-box-orient: vertical;"><?= $video_title; ?></h3>
        </a>
        <div class="shimmer"></div>
    </div>
</div>