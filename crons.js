const cron = require( 'node-cron' );
const http = require( 'http' );
const config = require( "./framework/config" );
const Slack = require( "node-slackr" );
const slack = new Slack( "https://hooks.slack.com/services/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",{
	channel: [ "#eng-quality-assurance" ],
	username: "cypress-test-bot",
	icon_emoji: ":ghost:",
	mrkdwn: true
});
module.exports = {
	init : crontStart
};

function crontStart(){
	config.tests.forEach(( item )=>{
		cron.schedule( item.time, ()=>{
			http.get( `${ config.cron_host }${ item.test }`, ( res )=>{
				let { statusCode } = res;
				let contentType = res.headers[ 'content-type' ];
				let error;
				if ( statusCode !== 200 ){
					error = new Error('Request Failed.\n' + `Status Code: ${ statusCode }` );
				} 
				else if ( !/^application\/json/.test( contentType ) ){
					error = new Error( 'Invalid content-type.\n' + `Expected application/json but received ${ contentType }` );
				}

				if ( error ) {
				//	slack.notify( `Cypress CRON JOB Failed Test: *${ item } Failure* ${ error }`, ( err ) => console.log( err )  );
					res.resume();
					return;
				}
				//no errors so lets run
				let rawData = '';
				res.setEncoding( 'utf8' );
				res.on('data', ( chunk ) => { rawData += chunk; });
				res.on('end', () => {
					try {
						const parsedData = JSON.parse( rawData );
						console.log( parsedData );
					} catch ( e ){
						console.error( e.message );
					}
				});
			});
		});
	});
}

