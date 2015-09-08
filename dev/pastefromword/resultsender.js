/* global alert:false, console:false */

/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
( function() {
	'use strict';

	// A simple script that will save textareas values into .txt files using the storeresult.php file.

	CKEDITOR.on( 'instanceReady', function() {
		var env = CKEDITOR.env,
			browserMapping = {
				IE8: env.ie && env.version === 8,
				IE9: env.ie && env.version === 9,
				IE10: env.ie && env.version === 10,
				IE11: env.ie && env.version === 11,
				EDGE: env.ie && env.version === 12,
				CHROME: env.chrome,
				FIREFOX: env.gecko,
				//OPERA: CKEDITOR.env.chrome,
				SAFARI: env.webkit && !env.chrome
			},
			browserPicker = document.getElementById( 'browser' );

		if ( browserPicker.value !== 'not selected' ) {
			return;
		}

		for ( var browserId in browserMapping ) {
			if ( browserMapping[ browserId ] ) {
				browserPicker.value = browserId;
			}
		}
	} );

	window.resultsSender = {
		allowedBrowsers: [
			'IE8',
			'IE9',
			'IE10',
			'IE11',
			'EDGE',
			'CHROME',
			'FIREFOX',
			'OPERA',
			'SAFARI'
		],

		postData: function( wordVersion, browser, input ) {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 && window.console ) {
					console.log( ( input ? 'Input' : 'Output' ) + ' saved!' );
				}
			};
			xmlhttp.open( 'POST', 'storeresult.php?browser=' + browser + '&word=' + wordVersion + '&input=' + Number( input ), true );
			xmlhttp.send( document.getElementById( input ? 'raw' : 'output' ).value );
		},

		saveResults: function() {
			var browser = String( document.getElementById( 'browser' ).value ).toUpperCase(),
				wordVersion = document.getElementById( 'wordVersion' ).value;

			if ( CKEDITOR.tools.indexOf( this.allowedBrowsers, browser ) === -1 ) {
				return alert( 'Unknown browser "' + browser + '"' );
			}

			this.postData( wordVersion, browser, true );
			this.postData( wordVersion, browser, false );
		}
	};

	// A fancy way to add the UI.
	var el = document.createElement( 'div' );

	el.innerHTML = '<label for="browser">Browser</label>: ' +
		'<select name="browser" id="browser" tabindex="1">' +
			'<option value="not selected">-- select --</option>' +
			'<option value="IE8">IE8</option>' +
			'<option value="IE9">IE9</option>' +
			'<option value="IE10">IE10</option>' +
			'<option value="IE11">IE11</option>' +
			'<option value="EDGE">EDGE</option>' +
			'<option value="CHROME">CHROME</option>' +
			'<option value="FIREFOX">FIREFOX</option>' +
			'<option value="OPERA">OPERA</option>' +
			'<option value="SAFARI">SAFARI</option>' +
		'</select>' +
		' ' +
		'<label for="wordVersion">Word</label>: ' +
		'<select name="wordVersion" id="wordVersion" tabindex="1">' +
			'<option value="not selected">-- select --</option>' +
			'<option value="2013">2013</option>' +
			'<option value="2007">2007</option>' +
		'</select> ' +
		'<button onclick="window.resultsSender.saveResults();"  tabindex="1">Save results</button>';

	document.body.appendChild( el );
	CKEDITOR.document.getById( 'input' ).setAttribute( 'tabindex', '1' );
} )();
