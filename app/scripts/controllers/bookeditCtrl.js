'use strict';

/**
 * Controller for bookedit Template
 */
angular.module('eTuneBookApp').controller( 'bookeditCtrl', function bookeditCtrl( $scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService ) {
    //Current TuneBook
    $scope.tuneBook = eTuneBookService.getCurrentTuneBook();
    //Editable Fields (detached copies)
    $scope.tuneBookName = angular.copy($scope.tuneBook.name);
    $scope.tuneBookVersion = angular.copy($scope.tuneBook.version);
    $scope.tuneBookDescription = angular.copy($scope.tuneBook.description);


    $scope.save = function () {
        //Update Fields -> tuneBook in eTuneBookService gets updated as well (copy by reference)
        $scope.tuneBook.name = angular.copy($scope.tuneBookName);
        $scope.tuneBook.version = angular.copy($scope.tuneBookVersion);
        $scope.tuneBook.description = angular.copy($scope.tuneBookDescription);
        //Generate TuneBook-Abc and save it to localStorage
        eTuneBookService.storeAbc($scope.tuneBook);
        $state.transitionTo('book', $stateParams);
    };

    $scope.cancel = function () {
        $state.transitionTo('book', $stateParams);
    };
});
