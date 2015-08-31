/* globals module, process */
( function() {
	"use strict";
	var generators = require( "yeoman-generator" );

	module.exports = generators.Base.extend( {

		_registerOptions: function() {
			var me = this,
			it;
			me.option( "h" );
			me.__vars = {};
			me.__options = [ {
				value: "version",
				desc: "which version of firebrick.ui should be downloaded",
				defaults: "latest"
			}, {
				value: "appname",
				desc: "name of the generator app, value of the app name in package.json and bower.json",
				defaults: "firebrick-ui-app"
			}, {
				value: "bowerpath",
				desc: "relative path to bower_components from the generated app /app/js/Main.js",
				defaults: "../../bower_components"
			}, {
				value: "ns",
				desc: "namespace: the parent namespace of the classes '{namespace}.controller.MyController' ",
				defaults: "MyApp"
			} ];
			for ( var i = 0, l = me.__options.length; i < l; i++ ) {
				it = me.__options[ i ];
				me.option( it.value );
				me.__vars[ it.value ] = me.options[ it.value ] || it.defaults;
			}
		},

		_helpOptions: function() {
			var me = this;
			me.log();
			me.log( "Options:" );
			me.log();
			console.log( me.__options );
		},

		constructor: function() {
			var me = this;
			generators.Base.apply( me, arguments );

			me._registerOptions();

			if ( me.options.h ) {
				me._helpOptions();
				process.exit();
			}

			me.log();
			me.log( "Running generator with following config: " );
			me.log( me.__vars );
			me.log();
		},

		writing: {
			node: function() {
				var me = this;
				me.fs.copyTpl( me.templatePath( "configs/package.json" ), me.destinationPath( "package.json" ), {
					name: me.__vars.appname
				} );
			},
			bower: function() {
				var me = this;
				me.fs.copyTpl( me.templatePath( "configs/bower.json" ), me.destinationPath( "bower.json" ), {
					name: me.__vars.appname,
					version: me.__vars.version
				} );
			},
			tools: function() {
				var me = this;
				me.directory( me.templatePath( "../tools/" ), me.destinationPath( "tools/" ) );
			},
			index: function() {
				var me = this;
				me.fs.copyTpl( me.templatePath( "index.html" ), me.destinationPath( "index.html" ) );
			},
			css: function() {
				var me = this;
				me.directory( me.templatePath( "app/css/" ), me.destinationPath( "app/css/" ) );
			},
			application: function() {
				var me = this;
				me.fs.copyTpl(
						me.templatePath( "app/js/Main.js" ), me.destinationPath( "app/js/Main.js" ),
						{
							bowerpath: me.__vars.bowerpath,
							namespace: me.__vars.ns
						}
				);
			},
			controller: function() {
				var me = this;
				me.fs.copyTpl(
						me.templatePath( "app/js/controller/MainController.js" ),
						me.destinationPath( "app/js/controller/MainController.js" ),
						{
							namespace: me.__vars.ns
						}
				);
			},
			view: function() {
				var me = this;
				me.fs.copyTpl( me.templatePath( "app/js/view/Index.js" ), me.destinationPath( "app/js/view/Index.js" ), {
					namespace: me.__vars.ns
				} );
				me.fs.copyTpl( me.templatePath( "app/js/view/About.js" ), me.destinationPath( "app/js/view/About.js" ), {
					namespace: me.__vars.ns
				} );
			}
		},

		install: function() {
			this.installDependencies();
		},

		end: function() {
			this.spawnCommand( "npm", [ "start" ] );
		}
	} );
} )();
