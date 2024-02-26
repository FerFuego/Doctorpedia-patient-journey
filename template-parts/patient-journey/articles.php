<div class="tab js-articles-content d-none">
    <div class="tab-articles">
        <?php for ($i = 0; $i < 9; $i++) {
            set_query_var('type', 'articles');
            get_template_part('partials/patient-journey/card-placeholder');
        } ?>
    </div>
    <div class="js-paginator"></div>
</div>