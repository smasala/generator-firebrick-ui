define( [ "view/Index" ], function() {
	"use strict";
	return Firebrick.createController( "<%= namespace %>.controller.MainController", {

	    init: function() {
		    var me = this;
		    me.initRouter();
		    return me.callParent( arguments );
	    },

	    initRouter: function() {
		    Firebrick.router.history.set( {
		        "/": function() {
			        Firebrick.create( "<%= namespace %>.view.Index" );
		        },
		        "/about": {
		            require: [ "view/About" ],
		            callback: function() {
			            Firebrick.create( "<%= namespace %>.view.About" );
		            }
		        }
		    } );

		    Firebrick.router.init();
	    }

	} );
} );
