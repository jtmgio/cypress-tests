"use strict";

function cypressTest( path ){
	
	/*
	it( "should have a header", () => {
		cy.get( "#toolbar-box div.header" ).contains( "Form List" );
	})
	*/
	it( "should have a create form button and search button", () => {
		cy.get( "md-card-header button" ).should( "have.length", 2 );	
		cy.get( "md-card-header button").eq( 0 ).find( "span" ).contains( "Create A Form" );
		cy.get( "md-card-header button").eq( 1 ).find( "span" ).contains( "Search" );
	})

	it( "should have a search input box", () => {
		cy.get( "md-card-header input.mat-input-element" ).should( "have.length", 1 );
	})

	it( "should have a checkbox for showing archived forms input box", () => {
		cy.get( "md-card-header input.mat-checkbox-input" ).should( "have.length", 1 );
		cy.get( "md-card-header label.mat-checkbox-layout span" ).contains( "Show archived forms" );
	})

}


module.exports = {
	executeCyTest : cypressTest
};