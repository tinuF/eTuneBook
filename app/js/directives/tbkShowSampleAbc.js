'use strict';

/**
 * Directive that renders sample Abc (first few bars) when the expression it binds to evaluates to true. 
 */
eTuneBook.directive('tbkShowSampleAbc', function( $timeout ) {
  return function( scope, elem, attrs ) {
	//Wenn tuneSetPosition.tune != editedTune (beim Seiten-Aufbau und nach dem Editieren): renderAbc.
	//Wurde keine Änderung gemacht im Abc -> watch sprich nicht an. (warum? die expression hat ja geändert).
	scope.$watch(attrs.tbkShowSampleAbc, function( editing ) {
	  if ( !editing ) {
		var currentScope = angular.element(elem).scope();
		scope.showSampleDots(currentScope.tuneSetPosition);
      } 
    });
	
	/*
	scope.$watch(scope.fingeringAbcIncl, function() {
		var currentScope = angular.element(elem).scope();
		scope.showSampleDots(currentScope.tuneSetPosition);
    });
	*/
	
  };
});
