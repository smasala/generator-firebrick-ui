/* globals module */
module.exports = function( grunt ) {
	"use strict";

	var tasks = [];

	grunt.loadNpmTasks( "grunt-jscs" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );

	grunt.initConfig( {
	    jscs: {
	        src: "./**/*.js",
	        options: {
		        config: ".jscsrc"
	        }
	    },
	    jshint: {
	        options: {
	            jshintrc: ".jshintrc",
	            reporter: require( "jshint-stylish" )
	        },
	        all: {
		        src: [ "Gruntfile.js", "./{,*/}*.js" ]
	        }
	    }
	} );

	tasks = [ "jscs", "jshint" ];

	grunt.registerTask( "default", tasks );
};
