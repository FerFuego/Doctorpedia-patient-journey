<?php
	while( have_rows( 'modules' ) ):
		the_row();
		$module = get_row_layout();

		include( get_template_directory().'/partials/module-begin.php' );
		get_template_part( 'template-parts/modules/module', get_row_layout() );
		include( get_template_directory().'/partials/module-end.php' );

	endwhile;
?>
