'use strict';

/**
 * Directive that renders sample Abc (first few bars) when the expression it binds to evaluates to true. 
 */
angular.module('eTuneBookApp').directive('renderSampleAbc', function( $timeout ) {
  return function( scope, elem, attrs ) {
      var currentScope = angular.element(elem).scope();
      scope.showSampleDots(currentScope.tune);
  };
});
