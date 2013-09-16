'use strict';

/**
 * Controller for tunevideos Template
 */
angular.module('eTuneBookApp').controller( 'tunevideosCtrl', function( $scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService ) {
    // Get current tune
    $scope.intTuneId = $stateParams['intTuneId'];
    $scope.tune =  eTuneBookService.getTune($scope.intTuneId);

    $scope.$parent.currentState = "Videos";

    $scope.tuneVideos = $scope.tune.videos;

    $scope.tuneVideosSelected = [];
    $scope.tuneVideoList = {
        data: 'tuneVideos',
        selectedItems: $scope.tuneVideosSelected,
        multiSelect: false,
        afterSelectionChange: function () {
            if ($scope.tuneVideosSelected.length > 0){
                $state.transitionTo('tunevideo', {intTuneId: $scope.intTuneId, source: $scope.tuneVideosSelected[0].source, code: $scope.tuneVideosSelected[0].code});
            }
        },
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: true,
        columnDefs: [
             {field:'code',
                displayName:'Code',
                enableCellEdit: true,
                editableCellTemplate: '<input ng-model="COL_FIELD" ng-blur="storeTuneBook()"/>',
                width:'25%'
            },
            {field:'description',
                displayName:'Description',
                enableCellEdit: true,
                //enableFocusedCellEdit: true,
                editableCellTemplate: '<input ng-model="COL_FIELD" ng-blur="storeTuneBook()"/>',
                width:'60%'
            },
            {field: '',
                cellTemplate: '<button class="btn btn-xs btn-default" ng-click="deleteVideo(row)"><i class="glyphicon glyphicon-trash" title="Delete Video"></i></button>',
                enableCellEdit: false,
                width:'10%'
            }
        ]
    };

    /*
    if($scope.tuneVideos.length == 0){
        $state.transitionTo('tunevideo', {intTuneId: $scope.intTuneId, source: "ytube", code: ""});
    } else {
        $scope.tuneVideosSelected.push($scope.tuneVideos[0]);
        $state.transitionTo('tunevideo', {intTuneId: $scope.intTuneId, source: $scope.tuneVideosSelected[0].source, code: $scope.tuneVideosSelected[0].code});
    }
    */

    $scope.deleteVideo = function (row) {
        //Delete Video
        eTuneBookService.deleteVideo($scope.intTuneId, row.entity.source, row.entity.code);

        //Generate TuneBook-Abc and save it to localStorage
        eTuneBookService.storeTuneBookAbc();
    };

    //TODO:
    //editableCellTemplate wird gebraucht um mit ng-blur in storeTuneBook zu verzweigen.
    //editableCellTemplate bewirkt aber, dass mit ng-blur das Input-Feld nicht korrekt zurückgesetzt wird.
    //ng-grid Problem?

    $scope.storeTuneBook = function() {
        //Generate TuneBook-Abc and save it to localStorage
        // (jedesmal wenn ein Feld verlassen wird, egal ob was geändert hat oder nicht)
        eTuneBookService.storeTuneBookAbc();
    };

    $scope.newVideo = function() {
        eTuneBookService.addVideo($scope.intTuneId, "ytube", "", "");
        //gespeichert (localStorage) wird erst nach erster Eingabe
    };
});
