'use strict';

/**
 * Delegation of a click-Event to the fileInput-Element. Clicking on the fileInput-Element opens the Explorer for choosing a file.
 */
angular.module('eTuneBookApp').directive('tbkFileSelectDelegate', function() {
  return function( scope, elem, attrs ) {
    elem.bind('click', function(evt) {
		var fileElem = document.getElementById("fileInput");
		fileElem.click();
    });
  };
});
