'use strict';

/**
 * Controller for tunesets Template
 */
angular.module('eTuneBookApp').controller( 'tunesetsCtrl', function ( $scope, $location, $timeout, $rootScope, $state, $stateParams,eTuneBookService ) {
    // Get current tune
    $scope.intTuneId = $stateParams['intTuneId'];

    $scope.$parent.currentState = "Sets";

    $scope.tuneSetPositions = eTuneBookService.getTuneSetsAsTuneSetPositions($scope.intTuneId);
    $scope.tuneSetPositionsSelected = [];

    var rowTempl = '<div ng-style="{ \'cursor\': row.cursor }" '+
        'ng-repeat="col in renderedColumns" '+
        'style="background-color:{{row.entity.tune.color}}" ' +
        'class="ngCell {{col.cellClass}} {{col.colIndex()}}" ng-cell></div>';

    var aggregateTemplate = '<div ng-click="row.toggleExpand()" ng-style="rowStyle(row)" class="ngAggregate"> <span class="ngAggregateText">{{row.label CUSTOM_FILTERS}}{{aggFC(row)}}</span> <div class="{{row.aggClass()}}"></div> </div>';


    $scope.tuneSetList = {
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
        afterSelectionChange: function () {
            $state.transitionTo('set', {tuneSetId: $scope.tuneSetPositionsSelected[0].tuneSetId});
        },

        //showFooter: true,

        //enableRowSelection: false,
        columnDefs: [
            //{field: '',
            //    cellTemplate: '<a class="btn btn-mini btn-info dotsViewerBtn" href="#/tunes/{{row.entity.intTuneId}}/dots" title="Show The Tune" ><i class="icon-music"></i></a>'
            //        + '<a class="btn btn-mini btn-info setsViewerBtn" href="#/sets?tune={{row.entity.intTuneId}}" title="Show The Sets" >Sets</a>',
            //    width:'5%'
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
                groupable:false

            },
            {field:'tune.type',
                displayName:'Type',
                width:'20%',
                sortable:false,
                groupable:false

            },
            {field:'tune.key',
                displayName:'Key',
                width:'20%',
                sortable:false,
                groupable:false
            }
        ]
    };

    $scope.aggFC = function (row) {
        var target, env, envDefined, name, theSplits, tuneSetInfo;
        tuneSetInfo = "";
        for (var i = 0; i < row.children.length; i++) {
            if (row.children[i].entity.position == 1){
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
    };


    $scope.newTuneSet = function( ) {
        eTuneBookService.initializeTuneSet($scope.intTuneId);
        $scope.tuneSetPositions = eTuneBookService.getTuneSetsAsTuneSetPositions($scope.intTuneId);
        eTuneBookService.storeTuneBookAbc();
    };

	$scope.putTuneBookToLocalStorage = function() {
		//tbkStorage.putToLocalStorage($scope.tuneBook);
		eTuneBookService.storeAbc($scope.tuneBook);
	};
  
	$scope.removeTuneSetPosition = function( tuneSetPosition ) {
		for (var i = 0; i < $scope.tuneBook.tuneSets.length; i++) {	
			
			if ($scope.tuneBook.tuneSets[i].tuneSetId == tuneSetPosition.tuneSetId){
				// TuneSetPosition aus TuneSet rausl�schen
				$scope.tuneBook.tuneSets[i].tuneSetPositions.splice($scope.tuneBook.tuneSets[i].tuneSetPositions.indexOf(tuneSetPosition), 1);
			
				if ($scope.tuneBook.tuneSets[i].tuneSetPositions.length == 0) {
					// TuneSet l�schen, wenn keine TuneSetPosition mehr dranh�ngt
					$scope.tuneBook.tuneSets.splice(i,1);
				}
			}
		}
	};
});





