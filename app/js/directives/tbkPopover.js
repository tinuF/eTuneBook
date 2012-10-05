'use strict';

/**
 * Directive that leads to a Popover, if the element is clicked. The Popover shows the Dots of the angular-scoped tune.
 */
eTuneBook.directive('tbkPopover', function($timeout){
    return function(scope, element, attrs) {
        element.popover({html : true, trigger: "manual", placement: "right", title: function(){return "";}, content: function(){
				var currentScope = angular.element(this).scope();
				var abc = currentScope.tuneSetPosition.tune.pure;
				ABCJS.renderAbc('popover_content_wrapper', abc, {}, {scale:0.6}, {});
				return $('#popover_content_wrapper').html();
		}}).click(function(event){	
				// Toggle aktuelles Popover zwischen show und hide (alle anderen bleiben offen, so lange sie nicht weggeklickt werden)
				element.popover('toggle');
		});
    };
});

