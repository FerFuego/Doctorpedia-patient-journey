<?php 
$wp_link = Doctorpedia::parseUrl( $_SERVER['REQUEST_URI'] );

if ( $wp_link[2] !== 'articles' && $wp_link[2] !== 'blogs' &&
     $wp_link[2] !== 'videos' && $wp_link[2] !== 'doctors' &&
     $wp_link[2] !== 'patient-journey' && $wp_link[2] != '' ) :
    $journey = Doctorpedia::get_post_patient_journey($wp_link[2]);
else :
    $journey = Doctorpedia::get_first_post_patient_journey(get_the_ID());
endif;
?>
<div class="tab tab-journey js-journey-content">
    <h1 class="tab-journey__header js-principal-title"><?php echo trim(end(explode('-', $journey['video_title']))); ?></h1>
    <div class="tab-journey__container">
        <div class="tab-journey__body">
            <div class="tab-journey__content">

                <!-- Video Player -->
                <div class="tab-journey__featured-video js-principal-video">
                    <?= videoSupport([
                        'field' => '',
                        'link' => $journey['video_link'],
                        'button_content' => '',
                        'placeholder_url' => $journey['video_thumbnail']
                    ]); ?>
                </div>
                <!-- End Video Player -->

                <!-- Mega Menu Mobile -->
                <h1 class="tab-journey__header-mobile js-principal-title"><?php echo trim(end(explode('-', $journey['video_title']))); ?></h1>
                <?php get_template_part('partials/patient-journey/mega', 'menu', ['device' => 'mobile']); ?>
                <!-- End Mega Menu Mobile -->

                <!-- Author -->
                <?php set_query_var('journey', $journey); ?>
                <?php get_template_part('partials/patient-journey/author'); ?>
                <!-- End Author -->

                <!-- Content -->
                <div class="tab-journey__featured-transcript">
                    <h4 class="tab-journey__featured-transcript-title">Transcript</h4>
                    <div class="tab-journey__featured-transcript-text js-principal-transcription">
                        <?php echo get_field('video_transcript', $journey['video_id']); ?>
                    </div>
                </div>
                <!-- End Content -->
                
            </div>

            <!-- Next Chapters -->
            <?php !wp_is_mobile() ? get_template_part('partials/patient-journey/next-chapter') : ''; ?>
            <!-- End Next Chapters -->
        </div>

        <!-- Sidebar -->
        <?php get_template_part('partials/patient-journey/sidebar'); ?>
        <!-- End Sidebar -->    
    </div>
    
    <!-- Next Chapters Mobile-->
    <?php  wp_is_mobile() ? get_template_part('partials/patient-journey/next-chapter') : ''; ?>
    <!-- End Next Chapters -->
</div>