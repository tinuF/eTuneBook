'use strict';

/**
 * Controller for tuneinfo Template
 */
angular.module('eTuneBookApp').controller( 'tuneinfoCtrl', function ( $scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService ) {
    // Get current tune
    $scope.intTuneId = $stateParams['intTuneId'];
    $scope.tune =  eTuneBookService.getTune($scope.intTuneId);

    $scope.$parent.currentState = "Info";

    $scope.tuneWebsites = $scope.tune.wsites;

    $scope.tuneWebsitesSelected = [];
    $scope.tuneWebsiteList = {
        data: 'tuneWebsites',
        selectedItems: $scope.tuneWebsitesSelected,
        multiSelect: false,
        /*
        afterSelectionChange: function () {
            if ($scope.tuneVideosSelected.length > 0){
                $state.transitionTo('tunevideo', {intTuneId: $scope.intTuneId, source: $scope.tuneVideosSelected[0].source, code: $scope.tuneVideosSelected[0].code});
            }
        },
        */
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEditOnFocus: true,
        columnDefs: [
            {field: '',
                cellTemplate: '<button class="btn btn-xs btn-default" ng-click="openWebsite(row)"><i class="glyphicon glyphicon-play" title="Jump to"></i></button>',
                enableCellEdit: false,
                width:'10%'
            },
            {field:'url',
                displayName:'URL',
                enableCellEdit: true,
                editableCellTemplate: '<input style="width: 100%" ng-model="COL_FIELD" ng-blur="storeTuneBook()"/>',
                width:'75%'
            },
            {field: '',
                cellTemplate: '<button class="btn btn-xs btn-default" ng-click="deleteWebsite(row)"><i class="glyphicon glyphicon-trash" title="Delete Website"></i></button>',
                enableCellEdit: false,
                width:'10%'
            }
        ]
    };


    $scope.deleteWebsite = function (row) {
        //Delete Video
        eTuneBookService.deleteWebsite($scope.intTuneId, row.entity.url);

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

    $scope.newWebsite = function() {
        eTuneBookService.addWebsite($scope.intTuneId, "");
        //gespeichert (localStorage) wird erst nach erster Eingabe
    };

    $scope.openWebsite = function(row) {
        window.open(row.entity.url);
    };


});
