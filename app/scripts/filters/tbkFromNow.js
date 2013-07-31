'use strict';

/**
 * Filter that calculates how old a date is.
 */
angular.module('eTuneBookApp').filter('fromNow', function() {
    return function(date) {
        var result = "";
        //var initDate = moment("1966-04-05T22:00", "YYYY-MM-DDTHH:mm").toDate();
        // if (moment(date).diff(initDate) != 0) {
        // result = moment(date).fromNow();
        // }
        if (date != null) {
            result = moment(date).fromNow();
        }

	    return result;
    };
  });
