'use strict';

/**
 * Controller for tunlist Template
 */
angular.module('eTuneBookApp').controller( 'tunelistCtrl', function tunelistCtrl( $scope, $window, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService ) {
    var filterOptions, columnDefs, rowTempl;

    filterOptions = {};
    filterOptions.key = $stateParams['key'];
    filterOptions.type = $stateParams['type'];
    filterOptions.color = $stateParams['color'];
    filterOptions.skill = $stateParams['skill'];
    filterOptions.target = $stateParams['targ'];
    filterOptions.env = $stateParams['env'];
    filterOptions.plmin = $stateParams['plmin'];
    filterOptions.plmax = $stateParams['plmax'];
    filterOptions.freqcomp = $stateParams['freqcomp'];
    filterOptions.freq = $stateParams['freq'];
    filterOptions.updmin = $stateParams['updmin'];
    filterOptions.updmax = $stateParams['updmax'];

    $scope.tunes = eTuneBookService.getTunesFiltered(filterOptions);
    $scope.tunesSelected = [];

    rowTempl = '<div ng-style="{ \'cursor\': row.cursor }" '+
        'ng-repeat="col in renderedColumns" '+
        'style="background-color:{{row.entity.color}}" ' +
        'class="ngCell {{col.cellClass}} {{col.colIndex()}}" ng-cell></div>';

    if ($window.mobilecheck()){
        // Small Device -> Display Less Columns
        columnDefs = [
            {field:'title',
                displayName:'Tune',
                cellFilter: 'eliminateThe',
                width:'60%',
                cellTemplate: '<a href="#/tunes/{{row.entity.intTuneId}}" title="Show The Tune" >{{row.entity.title}}</a>'

            },
            {field:'type', displayName:'Type', width:'10%'},
            {field:'lastPlayed',
                displayName:'Played',
                cellFilter: 'fromNow',
                width:'30%'
            }
        ];

    } else {
        // Desktop Device -> Display All Columns

        //alert('document: '+ $window.document.width + '/' + $window.document.height + ' window: ' + $window.screen.width + '/' + $window.screen.height );


        columnDefs = [
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
        ];
    }

    $scope.tuneList = {
        data: 'tunes',
        selectedItems: $scope.tunesSelected,
        //enableRowSelection: true,
        multiSelect: false,
        //sortInfo: { fields: ['title'], directions: ['asc'] },
        //showFilter: true,
        //showColumnMenu: true,
        /*rowHeight: 35,*/
        rowTemplate: rowTempl,
        //showFooter: true,
        //afterSelectionChange: function () {
        //    $state.transitionTo('tune', {intTuneId: $scope.tunesSelected[0].intTuneId});
        //},
        //enableRowSelection: false,
        columnDefs: columnDefs
    };

     $scope.tuneList.filterOptions = {
        filterText:'',
        useExternalFilter: false
     };

    $scope.newTune = function( ) {
        // A new Tune gets the highest TuneId, intTuneId and TuneSetId
        var newTuneSet = eTuneBookService.initializeTuneAndTuneSet();
        $state.transitionTo('tuneabc', {intTuneId: newTuneSet.tuneSetPositions[0].tune.intTuneId})
    };



    $scope.$watch('search', function(searchText) {
        if (searchText) {
            // console.log(searchText);
            var searchQuery = 'title:' + searchText + ';';
            $scope.tuneList.filterOptions.filterText = searchQuery;
            //console.log(searchQuery);
        }
    });

    // Scrolling: Default Scrolling is Top.
    // If previous state was main (Tunes-Button pressed): No change in Scrolling.
    // If previous state was tune (Back-Button pressed on Tune-View): Scroll to previously viewed tune
    // $rootScope.$previousState and $rootScope.$previousStateParams are set in the mainCtrl

    if ($rootScope.$previousState != undefined && $rootScope.$previousState.name == 'tune') {
        //$scope.tuneList.ngGrid existiert erst nach call von tunelistCtrl -> timeout

        $timeout(function() {
            var previousTune = eTuneBookService.getTune($rootScope.$previousStateParams.intTuneId);
            var grid = $scope.tuneList.ngGrid;
            var rowIndex = grid.data.indexOf(previousTune);
            grid.$viewport.scrollTop(grid.rowMap[rowIndex] * grid.config.rowHeight);
        }, 0, false);

    }
});
