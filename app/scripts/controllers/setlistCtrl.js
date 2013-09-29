'use strict';

/**
 * Controller for sets Template
 */
angular.module('eTuneBookApp').controller( 'setlistCtrl', function setlistCtrl( $scope, $location, $timeout, $rootScope, $state, $stateParams,eTuneBookService ) {
    var filterOptions = {};

    filterOptions.key = $stateParams['key'];
    filterOptions.type = $stateParams['type'];
    filterOptions.color = $stateParams['color'];
    filterOptions.tuneId = $stateParams['tune'];    //currently not used
    filterOptions.skill = $stateParams['skill'];
    filterOptions.target = $stateParams['targ'];
    filterOptions.env = $stateParams['env'];


    $scope.tuneSetPositions = eTuneBookService.getTuneSetPositionsFiltered(filterOptions);


    var rowTempl = '<div ng-style="{ \'cursor\': row.cursor }" '+
        'ng-repeat="col in renderedColumns" '+
        'style="background-color:{{row.entity.tune.color}}" ' +
        'class="ngCell {{col.cellClass}} {{col.colIndex()}}" ng-cell></div>';

    var aggregateTemplate = '<div ng-click="row.toggleExpand()" ng-style="rowStyle(row)" class="ngAggregate"> <span class="ngAggregateText"><a href="#/sets/{{row.label}}" title="Show The Set" >{{row.label CUSTOM_FILTERS}}{{aggFC(row)}}</a></span> <div class="{{row.aggClass()}}"></div> </div>';


        //$scope.tuneSetPositions = eTuneBookService.getTuneSetPositions();
    $scope.tuneSetPositionsSelected = [];
    $scope.setList = {
        data: 'tuneSetPositions',
        selectedItems: $scope.tuneSetPositionsSelected,
        multiSelect: false,
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
        columnDefs: [
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
        ]
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
});





