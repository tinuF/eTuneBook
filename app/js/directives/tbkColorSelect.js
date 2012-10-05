'use strict';

/**
 * Directive that attaches jquery.colorpicker.js to the element (text-input). The element itself gets hidden and replaced by the div with class colorPicker-picker.
 */
eTuneBook.directive('tbkColorselect', function(){
    return function(scope, element, attrs) {
        element.colorPicker({ 
			onColorChange : function(id, newValue) { 
				var currentScope = angular.element(this).scope();
				//console.log("ID: " + id + " has been changed to " + newValue); 
				currentScope.tuneSetPosition.tune.color = newValue;
				scope.saveColorDirective(currentScope.tuneSetPosition);
				scope.putTuneBookToLocalStorage();
				scope.refreshColorFilter();
				// notify angular of the change
				scope.$apply();
			}
		});
    };
});