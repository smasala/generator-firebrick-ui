/* global process */
/**
 * Adapted from http://stackoverflow.com/a/13635318/425226
 * used for Firebrick History API
 */
( function() {
	"use strict";
	var http = require( "http" ),
		url = require( "url" ),
		path = require( "path" ),
		fs = require( "fs" ),
		port = process.argv[ 2 ] || 8001;

	http.createServer( function( request, response ) {
		var uri = url.parse( request.url ).pathname, filename = path.join( process.cwd(), uri ), contentTypesByExtension = {
		    ".html": "text/html",
		    ".css": "text/css",
		    ".js": "text/javascript"
		}, ignorePaths = [ "/bower_components/", "/app/" ], ignore = false;

		if ( uri !== "/" ) {
			for ( var i = 0, l = ignorePaths.length; i < l; i++ ) {
				if ( uri.indexOf( ignorePaths[ i ] ) === 0 ) {
					ignore = true;
					break;
				}
			}

			if ( !ignore ) {
				//console.info("del", uri, filename);
				filename = path.join( process.cwd(), "/" );
			}
		}

		fs.exists( filename, function( exists ) {
			if ( !exists ) {
				response.writeHead( 404, {
					"Content-Type": "text/plain"
				} );
				response.write( "404 Not Found\n" );
				response.end();
				return;
			}

			if ( fs.statSync( filename ).isDirectory() ) {
				filename += "/index.html";
			}

			fs.readFile( filename, "binary", function( err, file ) {
				var headers = {}, contentType = contentTypesByExtension[ path.extname( filename ) ];

				if ( err ) {
					response.writeHead( 500, {
						"Content-Type": "text/plain"
					} );
					response.write( err + "\n" );
					response.end();
					return;
				}

				if ( contentType ) {
					headers[ "Content-Type" ] = contentType;
				}
				response.writeHead( 200, headers );
				response.write( file, "binary" );
				response.end();
			} );
		} );
	} ).listen( parseInt( port, 10 ) );

	console.log( "Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown" );
} )();
