<?php

new DoctorpediaAdvancedCustomFields();

/**
 * Class to keep track of hooks and filters tied into ACF plugin
 */

class DoctorpediaAdvancedCustomFields{

	function __construct(){
		add_action( 'acf/init', [ $this, '_options_page' ] );
		add_action( 'acf/load_field/name=gravity_form', [ $this, '_populate_gravity_form_options' ] );
		//add_filter( 'teeny_mce_buttons', [ $this, '_adjust_basic_toolbar' ], 100, 2 );	//acfpro/includes/fields/class-acf-field-wysiwyg.php
		//add_filter( 'acf/fields/wysiwyg/toolbars', [ $this, '_custom_toolbar' ] );	//acfpro/includes/fields/class-acf-field-wysiwyg.php
	}

	function _options_page(){

		acf_add_options_page(array(
			'page_title' 	=> 'Theme General Settings',
			'menu_title'	=> 'Theme Settings',
			'menu_slug' 	=> 'theme-general-settings',
			'capability'	=> 'edit_posts',
			'redirect'		=> false,
			'show_in_graphql' => true,
		));

	}

	/**
	 * Add options to gravity form select
	 * https://docs.gravityforms.com/api-functions/#get-forms
	 */
	function _populate_gravity_form_options( $field ){
		if( !class_exists( 'GFAPI' ) ){
			return $field;
		}

		$forms = GFAPI::get_forms( true, false );

		foreach( $forms as $form ){
			$field['choices'][$form['id']] = $form['title'];
		}

		return $field;
	}

	/**
	 * Alter buttons on existing basic toolbar
	 */
	function _adjust_basic_toolbar( $buttons, $editor_id ){

		$buttons = array(
			'bold',
			'italic',
			'underline',
			'blockquote',
			'strikethrough',
			'bullist',
			'numlist',
			'alignleft',
			'aligncenter',
			'alignright',
			'undo',
			'redo',
			'link',
			'fullscreen',
		);

		return $buttons;
	}

	/**
	 * Custom toolbar example
	 */
	function _custom_toolbar( $toolbars ){

		$buttons = array(
			'bold',
			'italic',
			'underline',
			'blockquote',
			'strikethrough',
			'bullist',
			'numlist',
			'alignleft',
			'aligncenter',
			'alignright',
			'undo',
			'redo',
			'link',
			'fullscreen',
		);

		$toolbars['Custom'] = array(
			1 => $buttons
		);

		return $toolbars;
	}

}
