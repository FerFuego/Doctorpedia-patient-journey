<div class="tab-journey__featured-author js-principal-author">
    <div class="tab-journey__featured-author-profile">
        <a class="tab-journey__featured-author-image" href="<?php echo $journey['video_author']['link'] ?? ''; ?>" target="_blank">
            <img src="<?php echo $journey['video_author']['avatar'] ? $journey['video_author']['avatar'] : get_template_directory_uri() . '/assets/img/placeholder/place-holder.svg'; ?>" alt="<?php echo $journey['video_author']['name'] ?? 'Doctorpedia'; ?>">
        </a>
        <div class="tab-journey__featured-author-info">
            <a class="tab-journey__featured-author-link" href="<?php echo $journey['video_author']['link'] ?? ''; ?>" target="_blank">
                <h5 class="tab-journey__featured-author-name"><?php echo $journey['video_author']['name'] ?? ''; ?></h5>
            </a>
            <p class="tab-journey__featured-author-specialty"><?php echo $journey['video_author']['description'] ?? ''; ?></p>
        </div>
    </div>
    <div class="tab-journey__featured-author-share js-cta-modal-journey">
        <div class="tab-journey__featured-author-share-icon"></div>
        <span>Share</span>
    </div>
</div>