<?php
/**
 * Support: SEO Text field helpers
 * If you copied your fields correctly, you should have the correct setup which is a support field containing a text and seo type fields.
 * Each module should have a clone of that field in a group with an appropriate name - default is title
 */
class WcanvasSEOTextField{
	/**
	 * display seo text field with corresponding selected tag
	 * @param string $field_name Field group name
	 * @param array $params additional display parameters as noted below
	 */
	public static function display( $field_name = 'title', $params = [] ){
		$params += [
			'class'       => 'title',						//default class to apply
			'default_tag' => 'div',							//default html tag to use
			'default_text' => '',							//fallback text if value text is empty
			'function'    => 'get_sub_field',				//acf function to use to retrieve value
			'partial'	  => 'seo-text.php',				//partial file to include
		];
		$values = $params['function']( $field_name );
		if( false === $values ){
			return ;
		}
		extract( $values );
		$class = $params['class'];
		$partial = $params['partial'];
		if( 'default' === $type || '' === $type  ){
			$type = $params['default_tag'];
		}
		if( $text === '' ){
			$text = $params['default_text'];
			if( $text === '' ){
				return;
			}
		}
		include( get_template_directory() . "/partials/{$partial}" );
	}
}