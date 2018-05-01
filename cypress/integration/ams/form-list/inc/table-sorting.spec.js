"use strict";

function cypressTest( path ){
	
	describe( "Table should sort correctly", () => {

		it( "should show icon on table header hover", () => {
			cy.get( "table.td-data-table th.column1 md-icon" ).trigger( "mouseover" );
			cy.get( "table.td-data-table th.column1 md-icon" ).should( "be.visible" );
		})

		it( "should sort by alpha when header is clicked", () => {
			cy.get( "table.td-data-table th.column1 md-icon" ).click({ force: true });			
			cy.get( "table.td-data-table th.column1 md-icon" ).click({ force: true });			
			//cy.get("table.td-data-table tr.td-data-table-row" ).eq( 1 ).find( "td" ).eq( 1 ).should( "have.value", "ZZZZZ - Test Payment Form" );			
		})
})
}

module.exports = {
	executeCyTest : cypressTest
};


