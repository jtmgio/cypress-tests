"use strict";

function cypressTest( path ){
	
	describe( "Show Archived Forms Checkbox should exist", ()=>{

		it( "should have a archived checkbox", () => {
			cy.get( "md-card-header md-checkbox" ).should( "have.length", 1 );
		})
	
		it( "should have label text", () => {
			cy.get( "md-card-header md-checkbox" )
				.find( "span.mat-checkbox-label" )
				.should( "contain", "Show archived forms" );
		})

})
    describe( "Show Archived Forms Checkbox should function properly", ()=>{

		it( "should be checkable", () => {
			cy.get( "md-card-header md-checkbox" ).click();
			cy.get( "md-card-header md-checkbox" ).find( "[type='checkbox']" ).eq( 0 ).should( "be.checked" );
		})
	
		it( "should have the table show archived forms  IS checked", () => {
			cy.get( "table.td-data-table td > span" ).should( "contain", "ACEC" );
			cy.wait( 1000 );
})
    it( "should NOT have the table show archived forms IS NOT checked", () => {
			cy.wait( 1000 );
			cy.get( "md-card-header md-checkbox" ).click();
			cy.get( "md-card-header md-checkbox" ).find( "[type='checkbox']" ).eq( 0 ).should( "not.be.checked" );
			cy.get( "table.td-data-table td > span" ).should( "not.contain", "ACEC" );
})
})
}


module.exports = {
	executeCyTest : cypressTest
};