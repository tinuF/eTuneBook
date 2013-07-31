'use strict';

/**
 * Controller for book Template
 */
angular.module('eTuneBookApp').controller( 'bookCtrl', function bookCtrl( $scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService ) {
    $scope.edit = function () {
        $state.transitionTo('bookedit', $stateParams);
    };
});
