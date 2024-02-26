<?php
    //ACF
    $backgroundGroup = get_sub_field('background');
    $backgroundSelector = $backgroundGroup['background_options'];

    //Solid
    $backgroundSolid = $backgroundGroup['solid_background'];
    if($backgroundSolid['selector']){
        $solid = $backgroundSolid['color_picker'];
    }else{
        $solid = $backgroundSolid['color_selector'];
    }

    //Image
    $backgroundImage = $backgroundGroup['image'];

    //Video
    $backgroundVideo = $backgroundGroup['video'];

    //Overlay
    $overlay = $backgroundGroup['overlay'];
?>  

<?php if($backgroundSelector != 'none'): ?>

    <div class="<?php echo $backgroundSelector != 'none' ? 'background background--'.$backgroundSelector : '' ?>" 
        <?php echo $backgroundSelector == 'solid' ? 'style="background-color: '.$solid.';"' : ''; ?>>

        <?php if($overlay > 0): ?>

            <div class="background__overlay" style="opacity:<?php echo $overlay/100; ?>;"></div>

        <?php endif; ?>

        <?php if($backgroundSelector == 'image'): ?>
            
            <?php if($backgroundImage['desktop_background']): ?>
                <img class="background--image__image" src="<?php echo esc_url($backgroundImage['desktop_background']['url'])?>" alt="">
            <?php endif; ?>

            <?php if($backgroundImage['mobile_background']): ?>
                <img class="background--image__image background--image__image--mobile" src="<?php echo esc_url($backgroundImage['mobile_background']['url'])?>" alt="">
            <?php endif; ?>

        <?php endif; ?>

        <?php if($backgroundSelector == 'video'): ?>

            <?php if(!wp_is_mobile()): ?>
                
                <?php if($backgroundVideo['video_desktop_vimeo']): ?>

                    <div class="background--video__video-wrapper">

                        <iframe src="<?php echo $backgroundVideo['video_desktop_vimeo']; ?>?background=1&autoplay=1&loop=1&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

                    </div>

                <?php endif; ?>

            <?php else: ?>

                <?php if($backgroundVideo['image_mobile']): ?>

                    <img class="background--video__image" src="<?php echo esc_url($backgroundVideo['image_mobile']['url'])?>" alt="">

                <?php endif; ?>

            <?php endif; ?>


        <?php endif; ?>

    </div>

<?php endif; ?>