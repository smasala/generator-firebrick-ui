define( [ "Firebrick.ui/containers/BorderLayout" ], function() {
	"use strict";
	return Firebrick.define( "<%= namespace %>.view.Index", {
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
	                    text: "About",
	                    href: "/about"
	                } ]
	            } ]
	        } ]
	    }, {
	        position: "bottom",
	        items: [ {
	            sName: "containers.panel",
	            title: "YO Firebrick-ui",
	            html: "You just created a Firebrick UI app"
	        } ]
	    } ]
	} );
} );
