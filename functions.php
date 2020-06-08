<?php

function avada_lang_setup()
{
	$lang = get_stylesheet_directory() . '/languages';
	load_child_theme_textdomain('Avada', $lang);
}
add_action('after_setup_theme', 'avada_lang_setup');

function theme_enqueue_styles()
{
	wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/style.css', array('avada-stylesheet'), '1.4.3');
}
add_action('wp_enqueue_scripts', 'theme_enqueue_styles');

function theme_enqueue_scripts()
{
	// https://callofthesea.org/payment-success/
	if (is_page(14232)) {
		wp_enqueue_script('custom-payment-success', get_stylesheet_directory_uri() . '/js/custom-payment-success.js', array(), '2.0.0', true);
	}

	// https://callofthesea.org/sail-with-us/youth-day/
	if (is_page(11514)) {
		wp_enqueue_script('custom-anchor-scrolling', get_stylesheet_directory_uri() . '/js/custom-anchor-scrolling.js', array(), '2.0.0', true);
	}

	// https://callofthesea.org/photo-gallery/
	if (is_page(11488)) {
		wp_enqueue_script('axios', 'https://unpkg.com/axios/dist/axios.min.js', array(), '0.19.2', true);
		wp_enqueue_script('custom-flickr', get_stylesheet_directory_uri() . '/js/custom-flickr.js', array('axios'), '2.0.0', true);
	}

	if (in_category('page-custom-code-stripe')) {
		wp_enqueue_script('stripe', 'https://js.stripe.com/v3', array(), '3.0.0', true);
		wp_enqueue_script('custom-stripe', get_stylesheet_directory_uri() . '/js/custom-stripe.js', array('stripe'), '2.0.0', true);
	}
}
add_action('wp_enqueue_scripts', 'theme_enqueue_scripts');

// hide unused wordpress menus
function hide_wordpress_menus()
{
	remove_menu_page('edit-comments.php'); // Comments
	remove_menu_page('edit.php?post_type=avada_portfolio'); // Portfolio
	remove_menu_page('edit.php?post_type=avada_faq'); // FAQs
}
add_action('admin_menu', 'hide_wordpress_menus');

// add short name
add_filter('web_app_manifest', function ($manifest) {
	$manifest['short_name'] = 'COTS';
	$manifest['icons'] = [
		["src" => "/wp-content/uploads/2020/06/call-of-the-sea-logo-512px.png", "sizes" => "512x512"],
		["src" => "/wp-content/uploads/2020/06/call-of-the-sea-logo-touch-192px.png", "sizes" => "192x192"]
	];
	return $manifest;
});

// deregister unused scripts
function custom_disable_js()
{
	// no dependencies or dependents
	Fusion_Dynamic_JS::deregister_script('avada-comments'); // 2020-05-21
	Fusion_Dynamic_JS::deregister_script('avada-quantity'); // 2020-06-02

	Fusion_Dynamic_JS::deregister_script('fusion-alert'); // 2020-05-03
	Fusion_Dynamic_JS::deregister_script('fusion-chartjs'); // 2020-05-03
	Fusion_Dynamic_JS::deregister_script('fusion-sharing-box'); // 2020-05-03

	Fusion_Dynamic_JS::deregister_script('jquery-count-down'); // 2020-06-02
	Fusion_Dynamic_JS::deregister_script('jquery-cycle'); // 2020-05-08
	Fusion_Dynamic_JS::deregister_script('jquery-easy-pie-chart'); // 2020-05-03
	Fusion_Dynamic_JS::deregister_script('jquery-fusion-maps'); // 2020-05-03
	Fusion_Dynamic_JS::deregister_script('jquery-title-textillate'); // 2020-05-11

	wp_deregister_script('wp-embed'); // 2020-05-28

	// fusion slider, deregistered on 2020-06-03
	Fusion_Dynamic_JS::deregister_script('avada-fusion-slider');
	Fusion_Dynamic_JS::deregister_script('fusion-flexslider');
	Fusion_Dynamic_JS::deregister_script('jquery-flexslider');

	// image carousel, deregistered on 2020-05-27
	Fusion_Dynamic_JS::deregister_script('fusion-carousel');
	Fusion_Dynamic_JS::deregister_script('jquery-caroufredsel');
	Fusion_Dynamic_JS::deregister_script('jquery-touch-swipe');

	// popover, deregistered on 2020-05-03
	Fusion_Dynamic_JS::deregister_script('bootstrap-popover');
	Fusion_Dynamic_JS::deregister_script('fusion-popover');

	// scrollspy, deregistered on 2020-05-08
	Fusion_Dynamic_JS::deregister_script('avada-scrollspy');
	Fusion_Dynamic_JS::deregister_script('bootstrap-scrollspy');

	// tabs, deregistered on 2020-06-03
	Fusion_Dynamic_JS::deregister_script('avada-tabs-widget');
	Fusion_Dynamic_JS::deregister_script('bootstrap-tab');
	Fusion_Dynamic_JS::deregister_script('fusion-tabs');

	// tooltip, deregistered on 2020-05-03
	Fusion_Dynamic_JS::deregister_script('bootstrap-tooltip');
	Fusion_Dynamic_JS::deregister_script('fusion-tooltip');
	Fusion_Dynamic_JS::deregister_script('jquery-hover-flow');

	// portfolio, gallery, blog, deregistered on 2020-06-05
	Fusion_Dynamic_JS::deregister_script('avada-portfolio');
	Fusion_Dynamic_JS::deregister_script('fusion-blog');
	Fusion_Dynamic_JS::deregister_script('fusion-gallery');
	Fusion_Dynamic_JS::deregister_script('fusion-lightbox');
	Fusion_Dynamic_JS::deregister_script('images-loaded');
	Fusion_Dynamic_JS::deregister_script('isotope');
	Fusion_Dynamic_JS::deregister_script('jquery-infinite-scroll');
	Fusion_Dynamic_JS::deregister_script('jquery-lightbox');
	Fusion_Dynamic_JS::deregister_script('jquery-mousewheel');
	Fusion_Dynamic_JS::deregister_script('packery');

	// counters box
	/*
	Fusion_Dynamic_JS::deregister_script('fusion-counters-box');
	Fusion_Dynamic_JS::deregister_script('jquery-appear');
	Fusion_Dynamic_JS::deregister_script('jquery-count-to');
	*/
}
add_action('wp_enqueue_scripts', 'custom_disable_js');