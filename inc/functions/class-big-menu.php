<?php
/**
 * Menu filtering to add in our extra content to main navigation
 * mega menu for desktop
 * additional links for mobile
 * wrapping mega menu class
 */

class DoctorpediaMenu{

	function __construct(){
		add_filter( 'walker_nav_menu_start_el', [ $this, 'mega_menu_contents_channels' ], 20, 4 );
		add_filter( 'walker_nav_menu_start_el', [ $this, 'mega_menu_contents_soecialty_areas' ], 20, 4 );
	}
    
    /**
	* Add content into menu after top level links for mega menu
	*/
	function mega_menu_contents_channels( $item_output, $item, $depth, $args ){
		
		ob_start();
		if ( in_array('has-channels-menu', $item->classes) ) {
			include( get_template_directory() . '/partials/big-menu-channels.php' );
		}
		$item_output .= ob_get_clean();

		return $item_output;
	}

	/**
	 * Add content into menu after top level links for mega menu
	 */
	public function mega_menu_contents_soecialty_areas( $item_output, $item, $depth, $args ){
		
		ob_start();
		if ( in_array('has-specialty-areas-menu', $item->classes) ) {
			include( get_template_directory() . '/partials/big-menu-specialty-areas.php' );
		}
		$item_output .= ob_get_clean();

		return $item_output;
	}
}

$bigMenu = new DoctorpediaMenu();