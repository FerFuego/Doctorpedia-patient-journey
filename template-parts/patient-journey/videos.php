<div class="tab js-videos-content d-none">
    <div class="tab-videos">
        <?php for ($i = 0; $i < 12; $i++) {
            set_query_var('type', 'videos');
            get_template_part('partials/patient-journey/card-placeholder');
        } ?>
    </div>
    <div class="js-paginator"></div>
</div>