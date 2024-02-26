<?php 
    global $wp; 
    $type = $type?? 'video';
?>
<div class="modal-journey js-modal-journey">
    <div class="modal-journey__box">
        <div class="modal-journey__content">
            <div class="modal-journey__header"> 
                <h5 class="modal-journey__header-title">Share this <?= $type; ?></h5>
                <img class="modal-journey__close js-modal-journey-close" src="<?php echo get_template_directory_uri(). '/assets/img/icons/close-icon-modal.svg'; ?>">
            </div>
            <div class="modal-journey__body">
                <p class="modal-journey__body-label">Share this with your social Community</p>
                <?php echo do_shortcode('[social-share url="'.home_url( $wp->request ).'"]'); ?>
                <p class="modal-journey__body-label">or copy link</p>
                <div class="modal-journey__body-form">
                    <input class="modal-journey__body-input js-copy-link" type="text" name="copy-link" value="<?php echo home_url( $wp->request ); ?>">
                    <input class="modal-journey__body-copy js-btn-copy" type="button" value="Copy">
                </div>
            </div>
        </div>
    </div>
</div>