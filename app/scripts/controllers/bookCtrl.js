'use strict';

/**
 * Controller for book Template
 */
angular.module('eTuneBookApp').controller( 'bookCtrl', function bookCtrl( $scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService ) {
    // Get current tuneBook
    $scope.tuneBook =  eTuneBookService.getCurrentTuneBook();

    $scope.edit = function () {
        $state.transitionTo('bookedit', $stateParams);
    };
});
