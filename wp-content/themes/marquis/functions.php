<?php

/**
 * Enqueue scripts and styles.
 *
 * @since Marquis 1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

function marquis_scripts() {

	// Load our main stylesheet.
	wp_enqueue_style( 'bootstrap-style', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css' );
	wp_enqueue_style( 'marquis-style-dist', get_stylesheet_directory_uri() . '/dist/app.css');
	wp_enqueue_style( 'marquis-style', get_stylesheet_uri() );
	wp_enqueue_style( 'load-fa', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' );

    // Load scripts
	//wp_enqueue_script( 'jquery', 'https://code.jquery.com/jquery-3.2.1.slim.min.js', '20171006', false );	
	wp_enqueue_script('lodash', 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore-min.js', array(), false, false );
    wp_enqueue_script( 'scrollmagic', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js' , array( 'jquery' ), '1.0', false );
	//wp_enqueue_script( 'popper', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js', array( 'jquery' ), '20171006', false );
    //wp_enqueue_script( 'bootstrap-script', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js', array( 'jquery' ), '20171006', false );
    
    wp_enqueue_script( 'marquis-script', get_stylesheet_directory_uri() . '/dist/app.js' , array(), '1.0', true );

	$url = trailingslashit( home_url() );
	$path = trailingslashit( parse_url( $url, PHP_URL_PATH ) );

	wp_scripts()->add_data( 'marquis-script', 'data', sprintf( 'var MarquisSettings = %s;', wp_json_encode( array(
		'title' => get_bloginfo( 'name', 'display' ),
		'path' => $path,
		'URL' => array(
			'api' => esc_url_raw( get_rest_url( null, '/wp/v2/' ) ),
			'root' => esc_url_raw( $url ),
		),
		'woo' => array(
			'url' => esc_url_raw( 'https://localhost/marquis/wp-json/wc/v2/' ),
			'consumer_key' => 'ck_4c897a273bde1274df0325247804ceeb8b09334d',
			'consumer_secret' => 'cs_b1f81580f8f03ff383b7d655e889c26464639064'
		),
	) ) ) );
}
add_action( 'wp_enqueue_scripts', 'marquis_scripts' );

// Add various fields to the JSON output
function marquis_register_fields() {
	// Add Author Name
	register_rest_field( 'post',
		'author_name',
		array(
			'get_callback'		=> 'marquis_get_author_name',
			'update_callback'	=> null,
			'schema'			=> null
		)
	);
	// Add Featured Image
	register_rest_field( 'post',
		'featured_image_src',
		array(
			'get_callback'		=> 'marquis_get_image_src',
			'update_callback'	=> null,
			'schema'			=> null
		)
	);
	register_rest_field( 'gallery',
		'featured_image_src',
		array(
			'get_callback'		=> 'marquis_get_image_src',
			'update_callback'	=> null,
			'schema'			=> null
		)
    );
    // Add Published Date
	register_rest_field( 'post',
        'published_date',
        array(
            'get_callback'		=> 'marquis_published_date',
            'update_callback'	=> null,
            'schema'			=> null
        )
	);
}
add_action( 'rest_api_init', 'marquis_register_fields' );

function marquis_get_author_name( $object, $field_name, $request ) {
	return get_the_author_meta( 'display_name' );
}
function marquis_get_image_src( $object, $field_name, $request ) {
    if($object[ 'featured_media' ] == 0) {
        return $object[ 'featured_media' ];
    }
	$feat_img_array = wp_get_attachment_image_src( $object[ 'featured_media' ], 'large', true );
    return $feat_img_array[0];
}

function marquis_published_date( $object, $field_name, $request ) {
	return get_the_time('F j, Y');
}

function marquis_excerpt_length( $length ) {
    return 20;
}

/* INCLUDE ALL CPT FILES */
foreach(glob(get_template_directory() . "/cpt/*.php") as $file){
	require $file;
}

add_filter( 'excerpt_length', 'marquis_excerpt_length' );

add_theme_support( 'post-thumbnails' ); 