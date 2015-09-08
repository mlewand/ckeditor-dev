<?php

if ( $_SERVER['REQUEST_METHOD'] !== 'POST' ) {
	exit( 'Only POST request are handled' );
}

function escape( $strIn ) {
	return preg_replace( '/\.{2,}/', '.', $strIn );
}

$payload = $HTTP_RAW_POST_DATA;
$wordVersion = escape( $_GET[ 'word' ] );
$browser = escape( $_GET[ 'browser' ] );
$input = (bool)$_GET[ 'input' ] ? 'input' : 'output';
$targetDir = './res/';
$tidyHtml = true;

// If you'd like to put the output to subdirectory, you might uncomment following line (but you need to create dir manually :((((().
//$targetDir = $targetDir . 'subdir/';

if ( $tidyHtml ) {
	// Tide HTML code, for better diffs.
	$tidyCfg = array(
		'force-output' => true,
		'indent' => true,
		'indent-spaces' => 4,
		'quiet' => true,
		'show-body-only'=>true
	);

	$payload = (string)tidy_repair_string( $payload, $tidyCfg, 'utf8' );
}

file_put_contents( $targetDir . implode( '_', [ $browser, $wordVersion, $input ] ) . '.txt', $payload );

?>