'use strict';

/**
 * Format eTuneBook-Default-Date to Blank.
 */
eTuneBook.filter('noDefaultDate', function() {
    return function(dateString) {
	  if (dateString == eTBk.DEFAULT_PLAYDATE_STRING_FORMATTED) {
		dateString = "";
	  }
	  return dateString;
    };
  });
