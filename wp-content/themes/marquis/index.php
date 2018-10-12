<?php
/**
 * The main template file
 *
 * @package WordPress
 * @subpackage Marquis
 * @since Marquis 1.0
 */
 ?>
 <!DOCTYPE html>

 <html <?php language_attributes(); ?> class="no-js">
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width">
        <link rel="profile" href="http://gmpg.org/xfn/11">
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
        <title>Marquis</title>
        <?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?>>
        <div id="page" class="hfeed site">
            <!-- <div id="content">
                <div class="loader-wrapper">
                    <i className='fa fa-spinner fa-pulse fa-5x fa-fw'></i>
                </div>
            </div> -->
            <?php wp_footer(); ?>
        </div>			
    </body>
</html>
