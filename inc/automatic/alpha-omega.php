<?php

new DoctorpediaAlphaOmega();

/**
 * Setup activation and deactivation functions
 */
class DoctorpediaAlphaOmega{

	function __construct(){
		add_action( 'after_switch_theme', [ $this, '_activation' ] );
		add_action( 'switch_theme', [ $this, '_deactivation' ] );
	}

	function _activation(){
		do_action( 'doctorpedia/activate' );
	}

	function _deactivation(){
		do_action( 'doctorpedia/deactivate' );
	}

}
