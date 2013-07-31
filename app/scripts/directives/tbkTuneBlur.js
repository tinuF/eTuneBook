'use strict';

/**
 * Directive that executes an expression when the element it is applied to loses focus.
 */
angular.module('eTuneBookApp').directive('tbkTuneBlur', function() {
  return function( scope, elem, attrs ) {
    elem.bind('blur', function() {
      scope.$apply(attrs.tbkTuneBlur);
    });
  };
});
