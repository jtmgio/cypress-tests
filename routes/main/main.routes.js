'use strict';
const cypress = require( "cypress" );
const request = require( "request" );
const Slack = require( "node-slackr" );
const config = require( "../../framework/config" );
const cron = require( 'node-cron' );

//Integrate with the Slack Server
const slack = new Slack( "https://hooks.slack.com/services/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",{
	channel : [ "#eng-quality-assurance" ], //HERE IS WHERE WE WILL POST TO THE SLACK ROOMS
	username : "cypress-test-bot",
	icon_emoji : ":ghost:",
	mrkdwn : true
});

module.exports = setRoutes;

/*
**-------------------------------------------------------------------------------------
** METHOD NAME - setRoutes
** DESC - container for all routes in this API
**-------------------------------------------------------------------------------------
*/
function setRoutes( app ){

	//initial health check 
	app.route( "/health-check" ).get( ( req, res ) => {
		slack.notify( "Cypress Health Check OK", ( err ) => console.log( err )  );
		res.status( 200 ).send( "OK" );
	});
	app.route( "/ams/auto-renewals" ).get(( req, res ) => {
		//setup the cypress test to run through our integrations
		cypress.run({
			spec: './cypress/integration/ams/auto-renewals/index.spec.js',
			key: config.cypress_key,
			record: true
		})
		.then(( results )=>{
			if( results.failures > 0 ){			
				slack.notify( "Cypress Integration Test: *Auto Renewals Failure*", ( err ) => console.log( err )  );
				res.status( 500 ).send( results );
				return;
			}
		//	slack.notify( "Cypress Integration Test: *Auto Renewals Passed*" );
			res.status( 200 ).send({});
			return;
		});
	});
	
	app.route( "/classic-ams/form-user-report" ).get(( req, res ) => {
		//setup the cypress test to run through our integrations
		cypress.run({
			spec: './cypress/integration/classic-ams/form-user-report/index.spec.js',
			key: config.cypress_key,
			record: true
		})
		.then(( results )=>{
			if( results.failures > 0 ){			
				slack.notify( "Cypress Integration Test: *Form User Report Failure*", ( err ) => console.log( err )  );
				res.status( 500 ).send( results );
				return;
			}
			//slack.notify( "Cypress Integration Test: *Form User Report Passed*" );
			res.status( 200 ).send({});
			return;
		});
	});


	//API for forms list
	/*app.route( "/forms-list" ).get(( req, res ) => {
		//setup the cypress test to run through our integrations
		cypress.run({
			spec: './cypress/integration/ams/form-list/index.spec.js',
			key: config.cypress_key,
			record: true
		})
		.then(( results )=>{
			if( results.failures > 0 ){			
				slack.notify( "Cypress Integration Test: *UI Forms List Failure*", ( err ) => console.log( err )  );
				res.status( 500 ).send( results );
				return;
			}
			res.status( 200 ).send({});
			return;
		});
	});
*/
	app.route( "/ams/manual-renewals" ).get(( req, res ) => {
		//setup the cypress test to run through our integrations
		cypress.run({
			spec: './cypress/integration/ams/manual-renewal/index.spec.js',
			key: config.cypress_key,
			record: true
		})
		.then(( results )=>{
			console.log(results);
			if( results.failures > 0 ){			
				slack.notify( "Cypress Integration Test: *Manual Renewal Failure*", ( err ) => console.log( err )  );
				res.status( 500 ).send( results );
				return;
			}
			res.status( 200 ).send({});
			return;
		});
	});

	app.route( "/classic-ams/form-user-report" ).get(( req, res ) => {
		//setup the cypress test to run through our integrations
		cypress.run({
			spec: './cypress/integration/classic-ams/form-user-report/index.spec.js',
			key: config.cypress_key,
			record: true
		})
		.then(( results )=>{
			console.log(results);
			if( results.failures > 0 ){			
				slack.notify( "Cypress Integration Test: *Form User Report Failure*", ( err ) => console.log( err )  );
				res.status( 500 ).send( results );
				return;
			}
			res.status( 200 ).send({});
			return;
		});
	});

	app.route( "/classic-ams/form-revenue-report" ).get(( req, res ) => {
		//setup the cypress test to run through our integrations
		cypress.run({
			spec: './cypress/integration/classic-ams/form-revenue-report/index.spec.js',
			key: config.cypress_key,
			record: true
		})
		.then(( results )=>{
			console.log(results);
			if( results.failures > 0 ){			
				slack.notify( "Cypress Integration Test: *Form Revenue Report Failure*", ( err ) => console.log( err )  );
				res.status( 500 ).send( results );
				return;
			}
			res.status( 200 ).send({});
			return;
		});
	});

	app.route( "/ams/ad-hoc" ).get(( req, res ) => {
		//setup the cypress test to run through our integrations
		cypress.run({
			spec: './cypress/integration/ams/ad-hoc/index.spec.js',
			key: config.cypress_key,
			record: true
		})
		.then(( results )=>{
			console.log(results);
			if( results.failures > 0 ){			
				slack.notify( "Cypress Integration Test: *Ad-Hoc Invoices Failure*", ( err ) => console.log( err )  );
				res.status( 500 ).send( results );
				return;
			}
			res.status( 200 ).send({});
			return;
		});
	});
	
	/* ROUTE TEMPLATE


	//API for YOUR ROUTE
	app.route( "/classic-am" ).get(( req, res ) => {
		//setup the cypress test to run through our integrations
		cypress.run({
			spec: 'PATH TO CYPRESS INDEX TESTS', //EXAMPLE: ./cypress/integration/ams/form-list/index.spec.js
			key: config.cypress_key,
			record: true
		})
		.then(( results )=>{
			if( results.failures > 0 ){			
				slack.notify( "ENTER SOME MESSAGE ABOUT THE FAILURE", ( err ) => console.log( err )  );
				res.status( 500 ).send( results );
				return;
			}
			res.status( 200 ).send({});
			return;
			});
		});
	*/

}