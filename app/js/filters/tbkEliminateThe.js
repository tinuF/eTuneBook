'use strict';

/**
 * Cut away ,The at the end of the String
 */
eTuneBook.filter('eliminateThe', function() {
	return function(string) {
		var theSplits = new Array();
		theSplits = string.split(",");
		return theSplits[0];
    };
});
