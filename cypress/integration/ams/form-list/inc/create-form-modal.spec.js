"use strict";

function cypressTest( path ){
	
	describe( "Create Form Modal open a modal", () => {
		
		it( "should open a modal when create a form button is clicked", () => {
			cy.get( "md-card-header button").eq( 0 ).click().then( () => {
				cy.get( "md-dialog-container" ).should( "be.visible" );
    })
    })

		it( "should have a disabled save button", () => {
			cy.get( ".save_btn--create-form" ).should( "have.prop", "disabled" );
			cy.get( "button.cancel_btn--create-form" ).click();
			cy.wait( 3000 );
		})

})
    describe( "Create Form Modal should create a new form", () => {
	
		it( "should allow the modal to save once a form name is entered", () => {
			cy.get( "md-card-header button").eq( 0 ).click().then( () => {
				cy.get( "md-dialog-container" ).should( "be.visible" );
    })
        cy.server();
			//stub the route for POST
			cy.route({
				method : "POST",
				url: "/ui-forms-list/v1/form-list/create-form/",
				status : 200,
				response: { success : true },
				delay : 500
			}).as( "createForm" );		
			cy.get( "md-dialog-container .input_form-name--create-form" ).eq( 0 ).type( `form-${ Date.now() }` );
			//check the boxes
			cy.get( "md-dialog-container .checkbox--membership--create-form" ).click();
			cy.get( "md-dialog-container .checkbox--events--create-form" ).click();
			cy.get( "md-dialog-container [type='checkbox']" ).eq( 0 ).should( "be.checked" );
			cy.get( "md-dialog-container [type='checkbox']" ).eq( 1 ).should( "be.checked" );
			//uncheck the boxes
			cy.get( "md-dialog-container .checkbox--membership--create-form" ).click();
			cy.get( "md-dialog-container .checkbox--events--create-form" ).click();
			cy.get( "md-dialog-container [type='checkbox']" ).eq( 0 ).should( "not.be.checked" );
			cy.get( "md-dialog-container [type='checkbox']" ).eq( 1 ).should( "not.be.checked" );
			//click the save button
			cy.get( ".save_btn--create-form" ).click();
			cy.wait( "@createForm" );	
			cy.get( "@createForm").then( () => {
				cy.get( "button.cancel_btn--create-form" ).click();
    })
        cy.wait( 3000 );
		})

	})

	describe( "Create Form Modal should NOT allow duplicate forms", () => {
		
		it( "should NOT allow a form to have a duplicate name", () => {
			cy.get( "md-card-header button").eq( 0 ).click().then( () => {
				cy.get( "md-dialog-container" ).should( "be.visible" );
    })
        cy.server();
			cy.route({
				method : "POST",
				url: "/ui-forms-list/v1/form-list/create-form/",
				status : 200,
				response: {"status":412,"errors":"Form name has already been used"},
				delay : 500
			}).as( "errorCreateForm" );

			cy.get( "md-dialog-container .input_form-name--create-form" ).eq( 0 ).type( "zzz" );
			cy.get( ".save_btn--create-form" ).click();
			cy.wait( "@errorCreateForm" );
			cy.get( "@errorCreateForm").then( () => {
				cy.get( "md-dialog-container div.error" ).should( 'be.visible' );
				cy.get( "md-dialog-container div.error > span" ).contains( "Form name has already been used" );
				cy.get( "button.cancel_btn--create-form" ).click();
    })
        cy.wait( 3000 );
			
		})

	})

	
}

module.exports = {
	executeCyTest : cypressTest
};


