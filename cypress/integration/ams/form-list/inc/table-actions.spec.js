"use strict";

function cypressTest( path ){
	
	describe( "Table Actions", () => {
		it( "should show the action buttons on hover", () => {
			cy.get("table.td-data-table tr.td-data-table-row" ).eq( 1 )
				.find( "td.column6 > div button" ).eq( 1 ).click({ force : true })
		})

})
}

module.exports = {
	executeCyTest : cypressTest
};


