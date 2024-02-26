<?php
global $post;
$video_title = $post->post_title; // Get the title of the video
$video_title = explode('-', $video_title); // Split the title into an array
$video_title = end($video_title); // Get the last element of the array
$post_type = get_post_type() == 'articles' ? 'article' : get_post_type();

?>
<div class="b-single-<?= esc_attr($post_type) ?>__container js-breadcrumbs" post_id="<?= esc_attr($post->ID) ?>">
    <div class="b-single-<?= esc_attr($post_type) ?>__hero">
        <div class="b-single-<?= esc_attr($post_type) ?>__breadcrumb">
            <a class="b-single-<?= esc_attr($post_type) ?>__breadcrumb-father" href="" father_page></a>
            <a class="b-single-<?= esc_attr($post_type) ?>__breadcrumb-father" href="" archive_page><?= esc_html(get_post_type()) ?></a>
            <div class="b-single-<?= esc_attr($post_type) ?>__breadcrumb-current js-data-taxonomy" data-taxonomy="<?= sanitize_title(get_the_title()); ?>"><?= $video_title; ?></div>
        </div>
    </div>
</div>