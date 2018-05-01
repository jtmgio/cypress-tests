"use strict";

function _navigate( path ){
	
	it( `should navigate to ${path}`, () => {
		//cy.wait( 5000 );
		cy.visit( path );
		cy.wait( 3000 );
	})	

}
function _navigateFromAdminHome( path ){

	it( `should navigate to ${path}`, () => {
		cy.server();
		cy.route( "/membership/admin/adminHomeProfile/membershipHealth" ).as( "membershipHealth" );
		cy.route( "/form/adminHome/pastEventAttendance" ).as( "pastEventAttendance" );
		cy.route( "/membership/admin/adminHomeProfile/newMemberCounts" ).as( "newMemberCounts" );
		cy.route( "/form/adminHome/nextEventAttendance" ).as( "nextEventAttendance" );
		cy.route( "/payment/v1/report/aged-receivables" ).as( "agedReceivables" );
		cy.route( "/payment/v1/report/sales-over-time" ).as( "salesOverTime" );
		cy.wait( 3000, [ "@membershipHealth", "@pastEventAttendance", "@newMemberCounts", "@nextEventAttendance", "@agedReceivables", "@salesOverTime" ], { log: true }).then(()=>{
			cy.visit( path );
		});
	})	

}
module.exports = {
	_navigate, _navigateFromAdminHome
};