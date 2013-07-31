'use strict';

/**
 * Cut away ,The at the end of the String
 */
angular.module('eTuneBookApp').filter('eliminateThe', function() {
	return function(string) {
		var theSplits = [];
        if (string != 'undefined' && string != null){
            theSplits = string.split(",");
        }
		return theSplits[0];
    };
});
