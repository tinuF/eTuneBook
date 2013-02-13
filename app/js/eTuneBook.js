'use strict';

/**
 * The main eTuneBook app module.
 *
 * @type {angular.Module}
 */

 	
var eTuneBook = angular.module('eTuneBook', []);

eTuneBook.config(function($locationProvider) {
	//Todo: Auf HTML5-Pushstate umstellen, sobald angular-bug behoben
	$locationProvider.html5Mode(false).hashPrefix('!');
});
 
