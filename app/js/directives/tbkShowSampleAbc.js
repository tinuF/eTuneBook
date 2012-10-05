'use strict';

/**
 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true.
 * Sobald das Element Focus hat, wird die ID des Elements zusammen mit der ID eines Notenbereichs in den ABCJS-Editor gegeben.
 * Das Element muss eine Text-Area sein mit Inhalt vom Format ABC.
 * ACHTUNG: Je mehr Tunes angezeigt werden auf der Seite, umso langsamer reagiert der Text-Editor. Wenn vorher auf ein Set eingeschränkt wird,
 **ist die Performance besser. 
 */
eTuneBook.directive('tbkShowSampleAbc', function( $timeout ) {
  return function( scope, elem, attrs ) {
	//Wenn tuneSetPosition.tune != editedTune (beim Seiten-Aufbau und nach dem Editieren): renderAbc.
	//Wurde keine Änderung gemacht im Abc -> watch sprich nicht an. (warum? die expression hat ja geändert).
	//TODO: Wurde eine Änderung gemacht im Abc -> sampleDots wird NICHT mehr angezeigt nach dem Editieren (renderAbc wird fehlerfrei durchlaufen mit dem geänderten Abc). 
	scope.$watch(attrs.tbkShowSampleAbc, function( editing ) {
	  if ( !editing ) {
        $timeout(function() {
			var currentScope = angular.element(elem).scope();
			
			var showHere = 'sampleDotsViewerFor'+currentScope.tuneSetPosition.tune.title;
			var tuneAbc = eTBk.TuneBook.getSampleAbc(currentScope.tuneSetPosition);
							
			ABCJS.renderAbc(showHere, tuneAbc, {}, {scale:0.6, paddingtop:0, paddingbottom:0, staffwidth:960}, {});	
		}, 0, false);
      } 
    });
  };
});
