'use strict';

/**
 * Controller for sets Template
 */
angular.module('eTuneBookApp').controller( 'setlistCtrl', function setlistCtrl( $scope, $window, $location, $timeout, $rootScope, $state, $stateParams,eTuneBookService ) {
    var filterOptions, columnDefs, rowTempl, aggregateTemplate;

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

    $scope.tuneSetPositions = eTuneBookService.getTuneSetPositionsFiltered(filterOptions);

    rowTempl = '<div ng-style="{ \'cursor\': row.cursor }" '+
        'ng-repeat="col in renderedColumns" '+
        'style="background-color:{{row.entity.tune.color}}" ' +
        'class="ngCell {{col.cellClass}} {{col.colIndex()}}" ng-cell></div>';

    //aggregateTemplate = '<div ng-click="row.toggleExpand()" ng-style="rowStyle(row)" class="ngAggregate"> <span class="ngAggregateText"><a href="#/sets/{{row.label}}" title="Show The Set" >{{row.label CUSTOM_FILTERS}}{{aggFC(row)}}</a></span> <div class="{{row.aggClass()}}"></div> </div>';
    //ohne Collapse-Funktionalität
    //aggregateTemplate = '<div ng-style="rowStyle(row)" class="ngAggregate"> <span class="ngAggregateText"><a href="#/sets/{{row.label}}" title="Show The Set" >{{row.label CUSTOM_FILTERS}}{{aggFC(row)}}</a></span> <div class="{{row.aggClass()}}"></div> </div>';

    //mit justplayed-Button
    aggregateTemplate = '<div ng-style="rowStyle(row)" class="ngAggregate"> <span class="ngAggregateText"><a href="#/sets/{{row.label}}" title="Show The Set" >{{row.label CUSTOM_FILTERS}}{{aggFC(row)}}</a></span> <div class="{{row.aggClass()}}"></div><button type="button" ng-click="justPlayedTheSet(row.label)" class="btn btn-default col-xs-offset-8 col-sm-offset-8 col-md-offset-8 col-lg-offset-8" title="Just played"><i class="glyphicon glyphicon-ok-circle"></i></button> </div>';

    $scope.tuneSetPositionsSelected = [];

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


        columnDefs = [
            //{field: '',
            //    cellTemplate: '<a href="#/tunes/{{row.entity.intTuneId}}" title="Show The Tune" >Tune</a>'
            //        + '<a href="#/sets/{{row.entity.tuneSetId}}" title="Show The Set" >Set</a>',
            //    width:'10%'
            //},


            {field:'tuneSetId',
                displayName:'',
                width:'0%',
                sortable:false,
                groupable:false
            },

            {field:'position',
                displayName:'',
                width:'0%',
                sortable:false,
                groupable:false

            },

            {field:'tune.title',
                displayName:'Set',
                cellFilter: 'eliminateThe',
                width:'60%',
                sortable:false,
                groupable:false,
                cellTemplate: '<a href="#/tunes/{{row.entity.intTuneId}}" title="Show The Tune" >{{row.entity.tune.title}}</a>'

            },
            {field:'tune.lastPlayed',
                displayName:'Played',
                cellFilter: 'fromNow',
                width:'30%',
                sortable:false,
                groupable:false

            }
        ];

    } else {
        // Desktop Device -> Display All Columns

        //alert('document: '+ $window.document.width + '/' + $window.document.height + ' window: ' + $window.screen.width + '/' + $window.screen.height );


        columnDefs = [
            //{field: '',
            //    cellTemplate: '<a href="#/tunes/{{row.entity.intTuneId}}" title="Show The Tune" >Tune</a>'
            //        + '<a href="#/sets/{{row.entity.tuneSetId}}" title="Show The Set" >Set</a>',
            //    width:'10%'
            //},


            {field:'tuneSetId',
                displayName:'',
                width:'0%',
                sortable:false,
                groupable:false
            },

            {field:'position',
                displayName:'',
                width:'0%',
                sortable:false,
                groupable:false

            },

            {field:'tune.title',
                displayName:'Set',
                cellFilter: 'eliminateThe',
                width:'50%',
                sortable:false,
                groupable:false,
                cellTemplate: '<a href="#/tunes/{{row.entity.intTuneId}}" title="Show The Tune" >{{row.entity.tune.title}}</a>'

            },
            {field:'tune.type',
                displayName:'Type',
                width:'8%',
                sortable:false,
                groupable:false
            },
            {field:'tune.key',
                displayName:'Key',
                width:'7%',
                sortable:false,
                groupable:false
            },
            {field:'tune.lastPlayed',
                displayName:'Played',
                cellFilter: 'fromNow',
                width:'10%',
                sortable:false,
                groupable:false

            },
            {field:'tune.frequencyPlayed',
                displayName:'Frequency',
                width:'7%',
                sortable:false,
                groupable:false
            },
            {field:'tune.skill',
                displayName:'Skill',
                width:'8%',
                sortable:false,
                groupable:false
            },
            {field:'tune.lastModified',
                displayName:'Modified',
                cellFilter: 'fromNow',
                width:'10%',
                sortable:false,
                groupable:false
            }
        ];
    }

    $scope.setList = {
        data: 'tuneSetPositions',
        selectedItems: $scope.tuneSetPositionsSelected,
        multiSelect: false,
        //showSelectionCheckbox: true,
        //showFilter: true,
        //showColumnMenu: true,
        sortInfo: { fields: ['position'], directions: ['asc'] },
        groups: ['tuneSetId'],
        groupsCollapsedByDefault:false,
        aggregateTemplate: aggregateTemplate,
        rowTemplate: rowTempl,
        //afterSelectionChange: function () {
        //    $state.transitionTo('set', {tuneSetId: $scope.tuneSetPositionsSelected[0].tuneSetId});
        //},

        //showFooter: true,

        //enableRowSelection: false,
        columnDefs: columnDefs
    };

    $scope.aggFC = function (row) {
        var target, env, envDefined, name, theSplits, tuneSetInfo;
        tuneSetInfo = "";
        for (var i = 0; i < row.children.length; i++) {
            if (row.children[i].entity.position == "1"){
                target = row.children[i].entity.tuneSetTarget;
                env = row.children[i].entity.tuneSetEnv;
                name = row.children[i].entity.tuneSetName;
                if(name != null && name != 'undefined' && name != ""){

                } else {
                    name = row.children[i].entity.tune.title;
                }
                //Cut away ,The at the end of the String
                theSplits = [];
                theSplits = name.split(",");
                name = theSplits[0];

                tuneSetInfo = tuneSetInfo + " " + name;
            }
        }

        envDefined = false;
        if (env != null && env != 'undefined' && env != ""){
            tuneSetInfo = tuneSetInfo + " (" + env;
            envDefined = true;
        }

        if (target != null && target != 'undefined' && target != ""){
            if (!envDefined){
                tuneSetInfo = tuneSetInfo + "(" + target;
            } else {
                tuneSetInfo = tuneSetInfo + ": " + target;
            }
            tuneSetInfo = tuneSetInfo + ")";
        }

        return tuneSetInfo;
    }

    if ($rootScope.$previousState != undefined && $rootScope.$previousState.name == 'set') {
        //$scope.setList.ngGrid existiert erst nach call von setlistCtrl -> timeout

        $timeout(function() {

            var previousFirstSetPosition = eTuneBookService.getFirstTuneSetPositionById($rootScope.$previousStateParams.tuneSetId);
            var grid = $scope.setList.ngGrid;
            var rowIndex = grid.data.indexOf(previousFirstSetPosition);
            //TODO: rowIndex funktioniert nicht bei Gruppierung (die Gruppen-Header sind auch rows).
            grid.$viewport.scrollTop(grid.rowMap[rowIndex] * grid.config.rowHeight);

            /* prevScrollTop immer 0, weil grid immer neu aufgebaut wird (setlistCtrl wird immer wieder initialisiert)
            var grid = $scope.setList.ngGrid;
            grid.$viewport.scrollTop(grid.prevScrollTop);
            */

        }, 0, false);

    }

    $scope.setList.filterOptions = {
        filterText:'',
        useExternalFilter: false
    };

    $scope.$watch('search', function(searchText) {
        if (searchText) {
            if (searchText != ''){
                // console.log(searchText);
                // 'Set:' works but is buggy, 'tune.title' does not work
                var searchQuery = 'Set:' + searchText + ';';
                $scope.setList.filterOptions.filterText = searchQuery;
                //console.log(searchQuery);
            } else {
                //bringt nichts
                //$scope.setList.filterOptions.filterText = '';
            }

        }
    });

    $scope.justPlayedTheSet = function( tuneSetId) {
        var now = new Date();
        eTuneBookService.addTuneSetPlayDate(eTuneBookService.getTuneSet(tuneSetId), now);
        eTuneBookService.storeAbc($scope.tuneBook);
    };
});





