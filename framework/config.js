"use strict";
var config = {};
config.environment = process.env.NODE_ENV || "dev";
// Upload files in memory
config.uploadFilesInMemory = process.env.UPLOAD_FILES_IN_MEMORY || false;
// Server settings
config.server = {
	host: process.env.SERVICE_HOST || "0.0.0.0",
	port: process.env.NODE_PORT || process.env.PORT || 5000
};
//set the default file extenstion
config.file_exts = config.environment === "dev" ? ".dev.html" : ".html";
// Export configuration object



//Cypress configurations
// the cypress register key 			
config.cypress_key = "9e37c1de-5352-4854-b683-7a85b77a9113";
// the cron time for scheduled tasks 	
config.cron_time = "* * * * *";
// the jenkins server host to run cron task 
config.cron_host = "http://localhost:5000";
// the cypress tests that you want to run for cron schedules 
//config.tests = ["/manual-renewal", "/autorenewals", "/form-revenue-report", "/form-user-report"];
//config.tests = [ "/ams/auto-renewals", "/classic-ams/form-user-report" ];
config.tests = [{
	time : "30 6,15 * * *",
	test : "/ams/auto-renewals"
},{
	time : "30 5,14 * * *",
	test : "/classic-ams/form-user-report"
},{
	time : "5 6,18 * * *",
	test : "/ams/manual-renewals"
},{
	time : "30 6,18 * * *",
	test : "/classic-ams/form-revenue-report"
},{
	time : "45 6,18 * * *",
	test : "/ams/ad-hoc"
}];
module.exports = config;
