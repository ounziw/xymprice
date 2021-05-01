<?php
/**
 * Plugin name: XYM Price block
 * Version: 0.9
 * Description: displays WYM price.
 * Author: ounziw
 * Author URI: https://php4wordpress.calculator.jp/
 * License: GPL2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: xymprice
 */

function xymprice_register_block() {

    // automatically load dependencies and version
    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

    wp_register_script(
        'xymprice',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    register_block_type( 'xymprice/xymprice', array(
        'editor_script' => 'xymprice',
    ) );
}
add_action( 'init', 'xymprice_register_block' );

function xymprice_enqueue_scripts() {
    if ( has_block( 'xymprice/xymprice' ) ) {
        wp_enqueue_script(
            'xympricefront',
            plugins_url('js/xymprice.js', __FILE__),
            array('jquery'),
        filemtime( plugin_dir_path( __FILE__ ) . 'js/xymprice.js' ),
            true
        );
    }
}
add_action( 'wp_enqueue_scripts', 'xymprice_enqueue_scripts' );

function xymprice_load_textdomain() {
    load_plugin_textdomain( 'xymprice', false, basename( __DIR__ ) . '/languages' );
}
add_action( 'init', 'xymprice_load_textdomain' );
