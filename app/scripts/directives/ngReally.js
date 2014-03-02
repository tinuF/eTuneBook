/**
 * A generic confirmation for risky actions.
 * Usage: Add attributes: ng-really-message="Are you sure"? ng-really-click="takeAction()" function
 * Source: https://gist.github.com/asafge/7430497 and http://stackoverflow.com/questions/15420935/create-a-confirmation-alert-for-delete-button-in-angular-using-js
 */
angular.module('eTuneBookApp')
    .directive('ngReallyClick', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    var message = attrs.ngReallyMessage;
                    if (message && confirm(message)) {
                        scope.$apply(attrs.ngReallyClick);
                    }
                });
            }
        }
    }]);