<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'react');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'mysql');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '%*Bzp-1`d7_9XA6bCc:QC2:w>kCBZb:F{gzJMis7 :7d?(1VaFX&)/yc`{ %a,~H');
define('SECURE_AUTH_KEY',  '7`CT{7X_p;N2?wQ:N]b[/^x_W;iLTX.>eRO|)S7FRfB>u*|i^K+QJwd.vsd0w~s!');
define('LOGGED_IN_KEY',    '.I#`niQ+%7[R(sOV+!7O(My50,$<G9)[{fS`[{!e}P:`~h~xqL>!(*},hV`?4J~$');
define('NONCE_KEY',        'mA;YIUkk)%x9&[~I=4U7L[rhsKiVI3sA+>VjErQ4R27{P|XegW%M/yvZPlpz@^p^');
define('AUTH_SALT',        '>+_q4$YsY[=~(~S;L7Tjv}Hiz~U8&;v,;]0OKj){I6@a|f9 ! zY@HdY#/A)?Tq6');
define('SECURE_AUTH_SALT', 'm(UF=_aUGj=Mfn1z,Kq9EBR.xW1SL!V?$EkarupT?zXnFA/d+)@Pkt98_ET09<>y');
define('LOGGED_IN_SALT',   ':Oxa.]2$+jr:qv^l9!{vd2 Q)1n<ing6rRtBAWidOG4mYR>){l$=Oh%R~y*(N=$G');
define('NONCE_SALT',       'm 9K2)fk;<Mq!2PReG*0H8*m;nnAApEyj!RD87|f%v3E=ZjI{3c`s}KC|i%r0fFU');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
