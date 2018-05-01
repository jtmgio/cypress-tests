"use strict";
function getElement( $iframe, $el ){
	let $doc = $iframe.contents();
	return cy.wrap(
		$doc.find( $el )
	);
}

module.exports = { getElement };