'use strict';

/**
 * Filter that limits a string to 20 chars and adds '....'
 */
eTuneBook.filter('max20chars', function() {
	return function(string) {
		if (string.length > 20){
			string = string.substr(0,20)+"...";
		}
		return string;
    };
});
