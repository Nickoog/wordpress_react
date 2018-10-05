<?php

// Register Custom Post Type
function custom_post_type_gallery() {

	$labels = array(
		'name'                  => _x( 'Galleries', 'Post Type General Name', 'marquis_theme' ),
		'singular_name'         => _x( 'Gallerie', 'Post Type Singular Name', 'marquis_theme' ),
		'menu_name'             => __( 'Galeries', 'marquis_theme' ),
		'name_admin_bar'        => __( 'Galeries', 'marquis_theme' ),
		'archives'              => __( 'Archives des galeries', 'marquis_theme' ),
		'attributes'            => __( 'Attributes des galeries', 'marquis_theme' ),
		'parent_item_colon'     => __( 'Parent des galeries:', 'marquis_theme' ),
		'all_items'             => __( 'Toutes les galeries', 'marquis_theme' ),
		'add_new_item'          => __( 'Ajouter une nouvelle galerie', 'marquis_theme' ),
		'add_new'               => __( 'Ajouter', 'marquis_theme' ),
		'new_item'              => __( 'Nouvelle galerie', 'marquis_theme' ),
		'edit_item'             => __( 'Editer une galerie', 'marquis_theme' ),
		'update_item'           => __( 'Mettre à jour une galerie', 'marquis_theme' ),
		'view_item'             => __( 'Voir une galerie', 'marquis_theme' ),
		'view_items'            => __( 'Voir les galeries', 'marquis_theme' ),
		'search_items'          => __( 'Rechercher une galerie', 'marquis_theme' ),
		'not_found'             => __( 'Pas trouvé', 'marquis_theme' ),
		'not_found_in_trash'    => __( 'Pas trouvé dans la corbeille', 'marquis_theme' ),
		'featured_image'        => __( 'L\'image sélectionnée', 'marquis_theme' ),
		'set_featured_image'    => __( 'Définir l\'image sélectionnée', 'marquis_theme' ),
		'remove_featured_image' => __( 'Supprimer l\'image sélectionnée', 'marquis_theme' ),
		'use_featured_image'    => __( 'Utiliser comme image sélectionnée', 'marquis_theme' ),
		'insert_into_item'      => __( 'Insérer dans la galerie', 'marquis_theme' ),
		'uploaded_to_this_item' => __( 'Téléchargé pour cette galerie', 'marquis_theme' ),
		'items_list'            => __( 'Liste des galeries', 'marquis_theme' ),
		'items_list_navigation' => __( 'Liste de navigation des galeries', 'marquis_theme' ),
		'filter_items_list'     => __( 'Filtrer la liste des galeries', 'marquis_theme' ),
	);
	$args = array(
		'label'                 => __( 'Gallerie', 'marquis_theme' ),
		'description'           => __( 'Post Type Description', 'marquis_theme' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'thumbnail' ),
		'taxonomies'            => array( 'category', 'post_tag' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-images-alt2',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
		'show_in_rest'          => true,
	);
	register_post_type( 'gallery', $args );

}
add_action( 'init', 'custom_post_type_gallery', 0 );