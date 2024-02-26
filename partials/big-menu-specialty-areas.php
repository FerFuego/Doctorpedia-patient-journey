<!-- Specialty Areas -->
<?php 
$condition_title = get_field('condition_title', $item);
$menus = get_field('navbar_pages', $item);
?>
<div class="big-menu-header w-40" id="js-dropdown-specialty-areas">
    <span class="big-menu-header__arrow-up"></span>
    <div class="big-menu-header__container">
        <div class="big-menu-header__header">
            <h2 class="big-menu-header__title"><?php echo $condition_title; ?></h2>
        </div>
        <div class="big-menu-header__body">
            <div class="big-menu-header__content">
                <?php if ( $menus ) : ?>
                    <ul class="big-menu-header__list">
                        <?php foreach ( $menus as $m ) :
                            $term = $m['page_link'];
                            $title = $term['title'];
                            $link = $term['url'];
                            $target = $term['target'];
                            ?>
                            <li id="menu-item-<?php echo $term->term_id; ?>" class="big-menu-header__item menu-item menu-item-type-taxonomy menu-item-object-categories-category current-menu-item menu-item-<?php echo $term->term_id; ?>">
                                <a class="big-menu-header__item-link js-site-link" href="<?php echo $link; ?>" target="<?php echo $target; ?>" aria-current="page"><?php echo $title; ?></a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>