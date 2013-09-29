'use strict';

/**
 * Controller for tunlist Template
 */
angular.module('eTuneBookApp').controller( 'tunelistCtrl', function tunelistCtrl( $scope, $location, $timeout, $rootScope, $state, eTuneBookService ) {
    $scope.tunes = eTuneBookService.getTunes();
    $scope.tunesSelected = [];

    var rowTempl = '<div ng-style="{ \'cursor\': row.cursor }" '+
        'ng-repeat="col in renderedColumns" '+
        'style="background-color:{{row.entity.color}}" ' +
        'class="ngCell {{col.cellClass}} {{col.colIndex()}}" ng-cell></div>';


    $scope.tuneList = {
        data: 'tunes',
        selectedItems: $scope.tunesSelected,
        //enableRowSelection: true,
        multiSelect: false,
        //sortInfo: { fields: ['title'], directions: ['asc'] },
        showFilter: true,
        showColumnMenu: true,
        /*rowHeight: 35,*/
        rowTemplate: rowTempl,
        //showFooter: true,
        //afterSelectionChange: function () {
        //    $state.transitionTo('tune', {intTuneId: $scope.tunesSelected[0].intTuneId});
        //},
        //enableRowSelection: false,
        columnDefs: [
            //{field: '',
              //  cellTemplate: '<a class="btn btn-xs dotsViewerBtn" href="#/tunes/{{row.entity.intTuneId}}/dots" title="Show The Tune" >Tune</a>'
              //      + '<a class="btn btn-xs setsViewerBtn" href="#/sets?tune={{row.entity.intTuneId}}" title="Show The Sets" >Sets</a>',
              //  width:'15%'
            //},
            {field:'title',
                displayName:'Tune',
                cellFilter: 'eliminateThe',
                width:'50%',
                cellTemplate: '<a href="#/tunes/{{row.entity.intTuneId}}" title="Show The Tune" >{{row.entity.title}}</a>'

            },
            {field:'type', displayName:'Type', width:'10%'},
            {field:'key', displayName:'Key', width:'5%'},
            {field:'lastPlayed',
                displayName:'Played',
                cellFilter: 'fromNow',
                width:'10%'
            },
            {field:'frequencyPlayed', displayName:'Frequency', width:'7%'},
            {field:'skill', displayName:'Skill', width:'8%'},
            {field:'lastModified',
                displayName:'Modified',
                cellFilter: 'fromNow',
                width:'10%'
            }
        ]
    };

    /*
     $scope.filteringText = '';
     $scope.tuneList.filterOptions = {
     filterText:'',
     useExternalFilter: false
     };
     */


    $scope.newTune = function( ) {
        // A new Tune gets the highest TuneId, intTuneId and TuneSetId
        var newTuneSet = eTuneBookService.initializeTuneAndTuneSet();
        $state.transitionTo('tuneabc', {intTuneId: newTuneSet.tuneSetPositions[0].tune.intTuneId})
    };


    /*
    $scope.$watch('search', function(searchText) {
        if (searchText) {
            // console.log(searchText);
            var searchQuery = 'title:' + searchText + ';';
            $scope.tuneList.filterOptions.filterText = searchQuery;
            console.log(searchQuery);
        }
    });
    */
});
