define( [ "Firebrick.ui/containers/BorderLayout" ], function() {
	"use strict";
	return Firebrick.define( "<%= namespace %>.view.About", {
	    extend: "containers.borderlayout",
	    target: "body",
	    items: [ {
	        position: "top",
	        items: [ {
	            sName: "nav.navbar",
	            brandName: "Firebrick UI",
	            items: [ {
	                sName: "nav.list",
	                items: [ {
	                    text: "Home",
	                    href: "/"
	                } ]
	            } ]
	        } ]
	    }, {
	        position: "bottom",
	        items: [ {
	            sName: "containers.panel",
	            title: "About",
	            html: "Some about page"
	        } ]
	    } ]
	} );
} );
