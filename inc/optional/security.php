<?php

new DoctorpediaSecurity();

class DoctorpediaSecurity {

	private static $instance = null;

	private $filter_values = array();

	public static function getInstance(){

		if ( self::$instance == null ){
			self::$instance = new DoctorpediaSecurity();
		}

		return self::$instance;
	}

	function __construct(){
	}

	public function disable_xmlrpc(){
		add_filter( 'xmlrpc_enabled', '__return_false' );
	}

	/**
	 *
	 * https://developer.wordpress.org/rest-api/frequently-asked-questions/#can-i-disable-the-rest-api
	 */
	public function require_rest_auth(){
		add_filter( 'rest_authentication_errors', [ $this, '_check_rest_auth' ] );
	}

	function _check_rest_auth( $result ){
		// If a previous authentication check was applied,
		// pass that result along without modification.
		if ( true === $result || is_wp_error( $result ) ) {
			return $result;
		}

		// No authentication has been performed yet.
		// Return an error if user is not logged in.
		if ( ! is_user_logged_in() ) {
			return new WP_Error(
				'rest_not_logged_in',
				__( 'You are not currently logged in.' ),
				array( 'status' => 401 )
			);
		}

		return $result;
	}

}

function wcanvasSecurity(){
	return DoctorpediaSecurity::getInstance();
}

wcanvasSecurity();
