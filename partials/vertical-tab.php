<?php
while( have_rows( 'vertical_tab' ) ):
	the_row();
?>
<div class="vertical-tab-panel" role="tabpanel" tabindex="0" id="<?php echo $tablist_id.'_panel_'.$i ?>" aria-labelledby="<?php echo $tablist_id.'_tab_'.$i ?>">
	<?php if( '' != get_sub_field( 'prehead' ) ): ?>
		<div class="prehead"><?php the_sub_field( 'prehead' ); ?></div>
	<?php endif; ?>

	<?php doctorpedia_heading( 'text' ); ?>

	<?php if( '' != get_sub_field( 'description' ) ): ?>
		<div class="wysiwyg">
			<?php the_sub_field( 'description' ); ?>
		</div>
	<?php endif; ?>

	<?php doctorpedia_button_group( 'button_section' ); ?>
</div>
<?php endwhile; ?>
