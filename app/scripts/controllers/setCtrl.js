'use strict';

/**
 * Controller for set Template
 */
angular.module('eTuneBookApp').controller( 'setCtrl', function ( $scope, $location, $timeout, $rootScope, $state, $stateParams,eTuneBookService ) {
    // Get current tuneSet
    $scope.tuneSetId = $stateParams['tuneSetId'];
    $scope.tuneSet =  eTuneBookService.getTuneSet($scope.tuneSetId);
    $scope.tuneBook = eTuneBookService.getCurrentTuneBook();
    $scope.firstTuneSetPositions = eTuneBookService.getFirstTuneSetPositions();
    $scope.currentFirstTuneSetPosition = eTuneBookService.getFirstTuneSetPosition($scope.tuneSet);

    setTargetTuneSetPositionsForMoving();

	$scope.editTuneSetPosition = function( tuneSetPosition ) {
        $scope.tuneSetPositionToBeEdited = tuneSetPosition;
        angular.element("#TuneSetPositionEditor").modal("show");
	};

    $scope.editTuneSet = function( tuneSet ) {
        $scope.tuneSetToBeEdited = tuneSet;
        angular.element("#TuneSetEditor").modal("show");
    };

    $scope.doneTuneSetEditing = function() {
        angular.element("#TuneSetEditor").modal("hide");
        $scope.tuneSetToBeEdited = null;
        eTuneBookService.updateFirstTuneSetPosition($scope.tuneSet);
        eTuneBookService.storeTuneBookAbc();
    };
	
	$scope.showSampleDots = function( tuneSetPosition ) { 
		$timeout(function() {
			var showHere = 'sampleDotsViewerForTune'+ tuneSetPosition.tune.id + 'Set' + tuneSetPosition.tuneSetId;
			var tuneAbc = eTuneBookService.getSampleAbc(tuneSetPosition.tune);
			var sampleDotsScale = 0.9;
			var sampleDotsStaffWidth = 960;
			
			ABCJS.renderAbc(showHere, tuneAbc, {}, {scale:sampleDotsScale, paddingtop:0, paddingbottom:0, staffwidth:sampleDotsStaffWidth}, {});	
		}, 0, false);
	};

	$scope.moveTune = function( tuneSetPosition ) {
        $scope.tuneSetPositionToBeMoved = tuneSetPosition;
        angular.element("#TuneSetPositionMover").modal("show");
	};

	$scope.doneMoving = function( tuneSetPosition, targetTuneSetPosition, beforeOrAfter, moveOrCopy ) {
		angular.element("#TuneSetPositionMover").modal("hide");
		$scope.movedTuneSetPosition = null;
        var tuneSetDeleted = false;
        var targetTuneSetId = null;
        var targetPosition = 1;

        if (targetTuneSetPosition != null && targetTuneSetPosition != undefined) {
            targetTuneSetId = targetTuneSetPosition.tuneSetId;
            targetPosition = targetTuneSetPosition.position;
        }
        tuneSetDeleted = eTuneBookService.moveTuneSetPosition(tuneSetPosition.tuneSetId, tuneSetPosition.position, targetTuneSetId, targetPosition, beforeOrAfter, moveOrCopy);
		eTuneBookService.storeTuneBookAbc();
        if(tuneSetDeleted){
            //Show Tune-Panel of Deleted Tune
            $state.transitionTo('tune',{intTuneId: tuneSetPosition.tune.intTuneId});
        }
	};

    $scope.deleteTuneSetPosition = function( tuneSetPosition ) {
        var tuneSetDeleted = false;
        tuneSetDeleted = eTuneBookService.deleteTuneSetPosition(tuneSetPosition.tuneSetId, tuneSetPosition.position);
        eTuneBookService.storeTuneBookAbc();
        if(tuneSetDeleted){
            //Show Tune-Panel of Deleted Tune
            $state.transitionTo('tune',{intTuneId: tuneSetPosition.tune.intTuneId});
        }
    };


    $scope.doneTuneSetPositionEditing = function() {
        angular.element("#TuneSetPositionEditor").modal("hide");
        eTuneBookService.storeTuneBookAbc();
    };
	
	$scope.putTuneBookToLocalStorage = function() {
		//tbkStorage.putToLocalStorage($scope.tuneBook);
		eTuneBookService.storeAbc($scope.tuneBook);
	};

	function setTargetTuneSetPositionsForMoving(){
        $scope.targetTuneSetPositionsForMoving = eTuneBookService.getTuneSetPositions();
	}

	$scope.justPlayedTheSet = function( tuneSet) {
		var now = new Date();
		eTuneBookService.addTuneSetPlayDate(tuneSet, now);
		eTuneBookService.storeAbc($scope.tuneBook);
	};

    $scope.justPlayedTheTune = function( tune) {
        var now = new Date();
        eTuneBookService.addTunePlayDate(tune, now);
        eTuneBookService.storeTuneBookAbc();
    };

    $scope.showTune = function( intTuneId ) {
        $state.transitionTo('tune', {intTuneId: intTuneId});
    };

    $scope.sortTuneSetPositionAsNumber = function(tuneSetPosition) {
        if(isNaN(tuneSetPosition.position)) {
            return tuneSetPosition.position;
        }

        return parseInt(tuneSetPosition.position);
    }

    $scope.loadRandomTuneSet = function(playDateFilter) {
        $scope.$parent.playDateFilter = playDateFilter;
        var tuneSetId = eTuneBookService.getRandomTuneSetId(playDateFilter);
        $state.transitionTo('set', {tuneSetId: tuneSetId});
    };
});





