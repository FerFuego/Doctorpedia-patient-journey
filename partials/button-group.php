<?php
$alignment = ( '' !== $override_alignment )? "button-group--align-{$override_alignment}" : 'button-group--align-'.$button_group['button_alignment'];
?>
<div class="button-group <?php echo $alignment; ?>">
	<?php
		foreach( $button_group['buttons'] as $button ):
			$link = $button['button_group']['link'];
			$type = ( '' !== $override_type )? $override_type : $button['button_group']['button_type'];
			$rel = '';
			if( doctorpedia_needs_rel_tags( $link['url'] ) ){
				$rel = 'noopener noreferrer';
			}
	?>
		<a class="button <?php echo esc_attr( $button['button_group']['button_type'] ); ?>" href="<?php echo esc_attr( $link['url'] ); ?>" target="<?php echo esc_attr( $link['target'] ); ?>" rel="<?php echo esc_attr( $rel ); ?>"><?php echo esc_html( $link['title'] ); ?></a>
	<?php endforeach ?>
</div>
