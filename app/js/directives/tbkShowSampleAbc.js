'use strict';

/**
 * Directive that renders sample Abc (first few bars) when the expression it binds to evaluates to true. 
 */
eTuneBook.directive('tbkShowSampleAbc', function( $timeout ) {
  return function( scope, elem, attrs ) {
	scope.$watch(attrs.tbkShowSampleAbc, function( editing ) {
	  if ( !editing ) {
		var currentScope = angular.element(elem).scope();
		scope.showSampleDots(currentScope.tuneSetPosition);
      } 
    });
  };
});
