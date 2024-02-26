<?php $author_id = $newpost->post_author; ?>
<div class="card-article">
    <div class="card-article__header">
        <img class="card-article__header-img" src="<?php echo get_the_post_thumbnail_url($newpost->ID, 'medium') ?? get_template_directory_uri() . '/assets/img/placeholder/main-image-journey.png'; ?>" alt="<?php echo get_the_author($author_id) ?? 'Doctorpedia'; ?>">
    </div>
    <a class="card-article__link-mobile" href="<?php echo get_the_permalink($newpost->ID); ?>">
        <h3 class="card-article__title"><?php echo $newpost->post_title; ?></h3>
    </a>
    <div class="card-article__body">
        <a class="card-article__link-title" href="<?php echo get_the_permalink($newpost->ID); ?>">
            <h3 class="card-article__title"><?php echo $newpost->post_title; ?></h3>
        </a>
        <a class="card-article__cta" href="<?php echo get_the_permalink($newpost->ID); ?>">Read More</a>
    </div>
</div>