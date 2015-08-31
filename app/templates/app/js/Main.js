define( function() {
	"use strict";
	var bowerPath = "<%= bowerpath %>";

	require.config( {
	    config: {
		    configuration: {
			    bowerPath: bowerPath
		    }
	    },
	    paths: {
		    "configuration": bowerPath + "/firebrick.ui/src/configuration"
	    },
	    shim: {
		    "firebrick-ui-all": [ "configuration" ]
	    }
	} );

	require( [ "firebrick-ui-all" ], function() {
		Firebrick.application( {
		    app: {
			    name: "<%= namespace %>"
		    },
		    autoRender: false,
		    dev: false,
		    require: [ "controller/MainController" ]
		} );
	} );
} );
