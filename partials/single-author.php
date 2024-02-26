<?php $user_id = get_the_author_meta('ID') ?>
<div class="b-single-author js-principal-author">
    <div class="b-single-author__author-profile">
        <a class="b-single-author__author-image" href="<?php echo $journey['video_author']['link']?? ''; ?>" target="_blank">
            <img 
                src="<?php echo wp_get_attachment_image_src(get_user_meta($user_id, 'dp_local_avatar', true), 'thumbnail' )[0]?? get_template_directory_uri() .'/assets/img/placeholder/place-holder.svg'; ?>" 
                alt="<?php echo get_the_author()?? 'Doctorpedia'; ?>">
        </a>
        <div class="b-single-author__author-info">
            <a class="b-single-author__author-link" href="<?php echo get_user_meta($user_id, 'doctorpedia_url', true)?? ''; ?>" target="_blank">
                <h5 class="b-single-author__author-name"><?php echo get_the_author()?? ''; ?></h5>
            </a>
            <p class="b-single-author__author-specialty"><?php echo get_user_meta($user_id, 'specialty_areas', true)?? ''; ?></p>
        </div>
    </div>
    <div class="b-single-author__author-share js-cta-modal-journey">
        <div class="b-single-author__author-share-icon"></div>
        <span>Share</span>
    </div>
</div>