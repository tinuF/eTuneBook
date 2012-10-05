'use strict';

/**
 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true.
 * Sobald das Element Focus hat, wird die ID des Elements zusammen mit der ID eines Notenbereichs in den ABCJS-Editor gegeben.
 * Das Element muss eine Text-Area sein mit Inhalt vom Format ABC.
 * ACHTUNG: Je mehr Tunes angezeigt werden auf der Seite, umso langsamer reagiert der Text-Editor. Wenn vorher auf ein Set eingeschränkt wird,
 **ist die Performance besser. 
 */
eTuneBook.directive('tbkTuneFocus', function( $timeout ) {
  return function( scope, elem, attrs ) {
    scope.$watch(attrs.tbkTuneFocus, function( newval ) {
	  if ( newval ) {
        $timeout(function() {
          elem[0].focus();
          //elem[0].select();
			new ABCJS.Editor(attrs.id, { canvas_id: 'showTheDotsFor'+attrs.id });
        }, 0, false);
      } 
    });
  };
});
