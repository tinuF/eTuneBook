'use strict';

/**
 * Directive that attaches jquery.colorpicker.js to the element (text-input). The element itself gets hidden and replaced by the div with class colorPicker-picker.
 */
angular.module('eTuneBookApp').directive('tbkColorselect', function(){
    return function(scope, element, attrs) {
        element.colorPicker({ 
			onColorChange : function(id, newValue) { 
				var currentScope = angular.element(this).scope();
				currentScope.tune.color = newValue;
				scope.putTuneBookToLocalStorage();
				//scope.refreshColorFilter();
				// notify angular of the change
				scope.$apply();
			}
		});
    };
});