"use strict";
var logger, config, express, colors, pkg, crons;
/**
* Module dependencies
*/

colors = require( "colors" );
logger = require("mm-node-logger")(module);
config = require("./framework/config");
express = require("./framework/express");
pkg = require( "./package.json" );
crons = require( "./crons" );

// Initialize server
function startServer() {
    // Initialize express
    var app = express.init();
	crons.init();
    // Start up the server on the port specified in the config
    app.listen(config.server.port, function () {
        var serverBanner = ["",
            "*************************************" + " EXPRESS SERVER ".yellow + "********************************************",
            "*",
            "* @version: " + pkg.version.red,
            "* @service router: " + config.server.host.toUpperCase().red,
            "*",
            "*" + " App started on localhost port: ".blue + config.server.port + " - with environment: ".blue + config.environment.blue,
            "*",
            "*************************************************************************************************",
            ""].join("\n");
        logger.info(serverBanner);
    });
    module.exports = app;
}
startServer();
