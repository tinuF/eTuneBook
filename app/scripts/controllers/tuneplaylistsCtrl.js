'use strict';

/**
 * Controller for tuneplaylists Template
 */
angular.module('eTuneBookApp').controller( 'tuneplaylistsCtrl', function ( $scope, $location, $timeout, $rootScope, $state, $stateParams,eTuneBookService ) {
    // Get current tune
    $scope.intTuneId = $stateParams['intTuneId'];

    $scope.$parent.currentState = "Playlists";

    $scope.playlists = eTuneBookService.getPlaylistsByIntTuneId($scope.intTuneId);
    $scope.playlistsSelected = [];

    var rowTempl = '<div ng-style="{ \'cursor\': row.cursor }" '+
        'ng-repeat="col in renderedColumns" '+
        'style="background-color:{{row.entity.tune.color}}" ' +
        'class="ngCell {{col.cellClass}} {{col.colIndex()}}" ng-cell></div>';

    $scope.tunePlaylistList = {
        data: 'playlists',
        selectedItems: $scope.playlistsSelected,
        multiSelect: false,
        //showFilter: true,
        //showColumnMenu: true,
        sortInfo: { fields: ['id'], directions: ['asc'] },
        rowTemplate: rowTempl,
        afterSelectionChange: function () {
            $state.transitionTo('playlist', {playlistId: $scope.playlistsSelected[0].id, tune:$scope.intTuneId});
        },

        //showFooter: true,

        //enableRowSelection: false,
        columnDefs: [
            //{field: '',
            //    cellTemplate: '<a class="btn btn-mini btn-info dotsViewerBtn" href="#/tunes/{{row.entity.intTuneId}}/dots" title="Show The Tune" ><i class="icon-music"></i></a>'
            //        + '<a class="btn btn-mini btn-info setsViewerBtn" href="#/sets?tune={{row.entity.intTuneId}}" title="Show The Sets" >Sets</a>',
            //    width:'5%'
            //},


            {field:'id',
                displayName:'',
                width:'0%',
                sortable:false,
                groupable:false
            },

            {field:'name',
                displayName:'Playlist',
                cellFilter: 'eliminateThe',
                width:'70%',
                sortable:false,
                groupable:false

            },
            {field:'band',
                displayName:'Band',
                width:'30%',
                sortable:false,
                groupable:false

            }
        ]
    };
});





