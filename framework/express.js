"use strict";
/**
 * Module dependencies.
 */
var cors, path, morgan, helmet, multer, logger, express, bodyParser, methodOverride, pathUtils, config, _, serveStatic, finalHandler, fs, cookieParser;
cors = require("cors");
path = require("path");
morgan = require("morgan");
helmet = require("helmet");
multer = require("multer");
logger = require("mm-node-logger")(module);
express = require("express");
bodyParser = require("body-parser");
methodOverride = require("method-override");
pathUtils = require("./utils/path-utils");
config = require("./config");
_ = require("lodash");
serveStatic = require("serve-static");
finalHandler = require("finalhandler");
fs = require("fs");
cookieParser = require("cookie-parser");



/**
 * Initialize application middleware.
 *
 * @method initMiddleware
 * @param {Object} app The express application
 * @private
 */
function initMiddleware(app) {

	// Showing stack errors
	app.set("showStackError", true);
	// Enable jsonp
	app.enable("jsonp callback");
	// Environment dependent middleware
	if (config.environment === "development") {
		// Enable logger (morgan)
		app.use(morgan("dev"));
		// Disable views cache
		app.set("view cache", false);
	} else if (config.environment === "production") {
		app.locals.cache = "memory";
	}
	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// views as directory for all template files
	app.set("../views", path.join(__dirname, "views"));
	//html is our default enging
	app.engine("html", require("ejs").renderFile);
	app.set("view engine", "html");
	// instruct express to server up static assets
	app.use(express.static("../public"));
	app.use(express.static("../assets"));
	
	/*
	** method - set gobals
	** desc - this will set glabals for the app
	*/

	//use cookie parser
	app.use( cookieParser() );
	
	app.use( function( req, res, next ){
		//set the locals
		app.locals.domain = "http://" + config.server.host;
		next();
	});

}

/**
 * Configure Helmet headers configuration.
 *
 * @method initHelmetHeaders
 * @param {Object} app The express application
 * @private
 */

function initHelmetHeaders(app) {
	// Use helmet to secure Express headers
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
	app.disable("x-powered-by");
}
/**
 * Configure CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests.
 *
 * @method initCrossDomain
 * @param {Object} app The express application
 * @private
 */

function initCrossDomain(app) {
	// setup CORS
	app.use(cors());
	app.use(function(req, res, next) {
		// Website you wish to allow to connect
		res.set("Access-Control-Allow-Origin", req.get( "host" ) );
		// Request methods you wish to allow
		res.set("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
		// Request headers you wish to allow
		res.set("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token");
		// Pass to next layer of middleware
		next();
	});
}
/**
 * Configure app modules config files.
 *
 * @method initGonfig
 * @param {Object} app The express application
 * @private
 */

function initGonfig(app) {
	// Globbing config files
	pathUtils.getGlobbedPaths(path.join(__dirname, "../routes/**/*.config.js")).forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});
}
/**
 * Configure app routes.
 *
 * @method initRoutes
 * @param {Object} app The express application
 * @private
 */

function initRoutes(app) {
	// Globbing routing files
	pathUtils.getGlobbedPaths(path.join(__dirname, "../routes/**/*.routes.js")).forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});
}
/**
 * Configure error handling.
 *
 * @method initErrorRoutes
 * @param {Object} app The express application
 * @private
 */

function initErrorRoutes(app) {
	// Assume "not found" in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn"t exists
		if (!err) {
			return next();
		}
		// Log it
		logger.error("Internal error(%d): %s", res.statusCode, err.stack);
		// Redirect to error page
		res.sendStatus(500);
	});
	
	
	// Assume 404 since no middleware responded
	// inject assets if found if not 404
	app.use(function(req, res) {
		var static_path, serve, done;
		var url = req.url.split( "/" );
		
		//set the static path
		//added to serve view template static files
		
		if( req.url.indexOf( "assets" ) > -1 ){
			static_path = path.join(__dirname, "../public/dist/" );
			//req.url = req.url.replace( "assets/", "" );
		}else{
			var url_parts = req.url.split( "/" );

			if( url_parts.length == 2 ){
				static_path = path.join(__dirname, "../public/dist/" );
			}else{
				static_path = path.join(__dirname, "../" );
			}
		}




		//if we really dont have a path/file its a 404			
		if( !fileExists( path.join( static_path, url.join( "/" ) ) ) ){
			res.sendStatus( 404 );
			res.end();
			return;
		}
		//run the serving of static files			
		serve = serveStatic( static_path );
		done = finalHandler(req, res);
		serve( req, res, done );
	
	});
	
}
/**
 *
 * @method fileExists
 * @returns {string} the file path
 */
function fileExists( filePath ){
	try{ return fs.statSync(filePath).isFile(); }
	catch ( err ){return false;}
}
/**
 * Initialize the Express application.
 *
 * @method init
 * @returns {Object} the express application
 */

function init() {
	
	// Initialize express app
	var app = express();
	// Initialize Express middleware
	initMiddleware(app);
	// Initialize Helmet security headers
	initHelmetHeaders(app);
	// Initialize CORS
	initCrossDomain(app);
	// Initialize config
	initGonfig(app);
	// Initialize routes
	initRoutes(app);
	// Initialize error routes
	initErrorRoutes(app);
	return app;
}
module.exports.init = init;
