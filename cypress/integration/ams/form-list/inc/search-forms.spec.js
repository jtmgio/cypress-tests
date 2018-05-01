"use strict";

function cypressTest( path ){
	
	describe( "Write search term in search text input", () => {
		it( "should have a search input field and search button that is disabled", () => {
			cy.get( "input[ aria-label='Form Search Input Box' ]" ).should( "have.length", 1 );
			cy.get( "button[ aria-label='Search Forms' ]" ).should( "have.length", 1 );
			cy.get( "button[ aria-label='Search Forms' ]" ).should( "have.prop", "disabled" );		
		})
		
		it( "should enter a search term and be able to click the active search button", () => {
			cy.get( "input[ aria-label='Form Search Input Box' ]" ).eq( 0 ).type( "contact name" );
			cy.get( "button[ aria-label='Search Forms' ]" ).not( "[disabled]" );
			cy.get( "button[ aria-label='Search Forms' ]" ).click();
			cy.get( "table.td-data-table td > span" ).should( "contain", "contact name" );
		})

		it( "should clear the search when pressing the [X] button.", () => {
			cy.get( "md-icon[ aria-label='Cancel Form Search' ]" ).click();
			cy.get( "input[ aria-label='Form Search Input Box' ]" ).eq( 0 ).should( "have.value", "" );			
		})

		it( "should add disabled to the search button", () => {
			cy.get( "button[ aria-label='Search Forms' ]" ).should( "have.prop", "disabled" );		
		})

})
}

module.exports = {
	executeCyTest : cypressTest
};


