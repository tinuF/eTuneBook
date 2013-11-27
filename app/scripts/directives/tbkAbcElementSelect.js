'use strict';

/**
 * Directive that executes an expression when whithin the textarae it is applied to has emitted a text selection event.
 */
angular.module('eTuneBookApp').directive('tbkAbcElementSelect', function() {
  return function( scope, elem, attrs ) {
      elem.bind('select selectionchange focus', function(evt) {
          // Abc-Element was highlighted by script (see window.ABCJS.Editor.prototype.highlight) or by user (possible only in Tune-Edit-Modus)
          // Chrome on Windows 7 gets here first due to 'focus' and then due to 'select'.
          // Firefox on Windows 7, Chrome on iPad, Safari on iPad do not get here due 'select'.
          // Firefox on Windows 7 gets here due to 'focus'
          // 'selectionchange' is for IE

          if(scope.noteEditModus){
              //Todo: Chrome on Windows 7 kommt hier zweimal durch (focus und select) -> rausfiltern.
              scope.doneSelecting(evt.target.value, evt.target.selectionStart, evt.target.selectionEnd);
              elem.blur(); // needed for Chrome, Safari on iOS7 to update options after clicking a new note
              scope.$apply();
          }
      });
  };
});
