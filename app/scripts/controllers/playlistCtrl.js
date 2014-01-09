'use strict';

/**
 * Controller for playlist Template
 */
angular.module('eTuneBookApp').controller( 'playlistCtrl', function ( $scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService, $window ) {
    // Get current playlist
    $scope.playlistId = $stateParams['playlistId'];
    $scope.playlist =  eTuneBookService.getPlaylist($scope.playlistId);
    $scope.tuneBook = eTuneBookService.getCurrentTuneBook();

    $scope.moveUp = function(playlistPosition) {
        $scope.playlist =  eTuneBookService.moveUpPlaylistPosition($scope.playlistId,playlistPosition.position);
        eTuneBookService.storeTuneBookAbc();
    };

    $scope.moveDown = function(playlistPosition) {
        $scope.playlist =  eTuneBookService.moveDownPlaylistPosition($scope.playlistId,playlistPosition.position);
        eTuneBookService.storeTuneBookAbc();
    };

    $scope.showSet = function(playlistPosition) {
        $state.transitionTo('set',{tuneSetId: playlistPosition.tuneSet.tuneSetId});
    };

    $scope.sortTuneSetPositionAsNumber = function(tuneSetPosition) {
        if(isNaN(tuneSetPosition.position)) {
            return tuneSetPosition.position;
        }

        return parseInt(tuneSetPosition.position);
    }

    $scope.sortPlaylistPositionAsNumber = function(playlistPosition) {
        if(isNaN(playlistPosition.position)) {
            return playlistPosition.position;
        }

        return parseInt(playlistPosition.position);
    }

    $scope.edit = function( playlistPosition ) {
        $scope.playlistPositionToBeEdited = playlistPosition;
        //Set current TuneSet for Selection
        $scope.tuneSet = playlistPosition.tuneSet;
        angular.element("#PlaylistPositionEditor").modal("show");
    };

    $scope.doneEditing = function(playlistPosition) {

        if(playlistPosition.name == ""){
            playlistPosition.name = playlistPosition.tuneSet.tuneSetName;

            //Uebertragen an $scope nicht nötig, da playlistPosition eine Kopie von der $scope-Variable ist
            /*
            for (var z = 0; z < $scope.playlist.playlistPositions.length; z++) {
                if(parseInt($scope.playlist.playlistPositions[z].position) == playlistPosition.position){
                    $scope.playlist.playlistPositions[z].name = playlistPosition.tuneSet.tuneSetName;
                }
            }
            */
        }

        eTuneBookService.storeTuneBookAbc();

        angular.element("#PlaylistPositionEditor").modal("hide");


    };

    $scope.delete = function( playlistPosition ) {
        eTuneBookService.deletePlaylistPosition($scope.playlistId, playlistPosition.position);
        eTuneBookService.storeTuneBookAbc();
    };

    $scope.newPlaylistPosition = function() {
        $scope.playlistPositionToBeEdited = eTuneBookService.addEmptyPlaylistPosition($scope.playlistId);
        angular.element("#PlaylistPositionEditor").modal("show");
    };

    $scope.justPlayedTheSet = function( tuneSet) {
        var now = new Date();
        eTuneBookService.addTuneSetPlayDate(tuneSet, now);
        eTuneBookService.storeTuneBookAbc();
    };

    $scope.justPlayedTheTune = function( tune) {
        var now = new Date();
        eTuneBookService.addTunePlayDate(tune, now);
        eTuneBookService.storeTuneBookAbc();
    };

});





