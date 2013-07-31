'use strict';

/**
 * Controller for tuneabc Template
 */
angular.module('eTuneBookApp').controller( 'tuneabcCtrl', function tuneabcCtrl( $scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService ) {
    // Get current tune
    $scope.intTuneId = $stateParams['intTuneId'];
    $scope.tune =  eTuneBookService.getTune($scope.intTuneId);

    $timeout(function() {
        var editHere = 'abcEditorFor' + $scope.intTuneId;
        var showHere = 'renderTheDotsFor' + $scope.intTuneId;
        new ABCJS.Editor(editHere, { canvas_id: showHere });
    }, 0, false);

    $scope.doneEditing = function( tune ) {
        if ( !tune.pure ) {
            // Delete all TuneSetPositions with that tune
            eTuneBookService.deleteTuneSetPositionsAndTune(tune.intTuneId);
            $state.transitionTo('setlist');

        } else {
            // Sync Tune-Fields
            tune.title = eTuneBookService.getTuneTitle(tune);
            tune.type = eTuneBookService.getTuneType(tune);
            tune.key = eTuneBookService.getTuneKey(tune);
            tune.id = eTuneBookService.getTuneId(tune);
        }

        // Put TuneBook to localStorage
        eTuneBookService.storeTuneBookAbc();
    };
});
