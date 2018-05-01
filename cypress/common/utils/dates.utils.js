"use strict";
function getTodaysDate(){
	var date = new Date();
	var month = date.getMonth() + 1 ; 
	var day = date.getDate();
	var year = date.getFullYear();
	return `${ month }/${ day }/${ year }`;
}

module.exports = {
	getTodaysDate : getTodaysDate
};