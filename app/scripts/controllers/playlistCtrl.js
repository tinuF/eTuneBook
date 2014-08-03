'use strict';

/**
 * Controller for playlist Template
 */
angular.module('eTuneBookApp').controller( 'playlistCtrl', function ( $scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService, $window, $document ) {
    var filterOptions;

    filterOptions = {};
    filterOptions.position = $stateParams['pos'];
    filterOptions.intTuneId = $stateParams['tune'];

    // Get current playlist
    $scope.playlistId = $stateParams['playlistId'];
    $scope.playlist =  eTuneBookService.getPlaylist($scope.playlistId);
    $scope.playlistPositionsByIntTuneId = [];
    $scope.currentFilter = '';
    if(filterOptions.intTuneId != null && filterOptions.intTuneId != ''){
        $scope.playlistPositionsByIntTuneId =  eTuneBookService.getPlaylistPositionsByIntTuneId($scope.playlistId, filterOptions.intTuneId);
        $scope.tune = eTuneBookService.getTune(filterOptions.intTuneId);
        $scope.currentFilter = 'Filter: ' + $scope.tune.title;
    }

    $scope.tuneBook = eTuneBookService.getCurrentTuneBook();

    eTuneBookService.initializeTuneSetPositionPlayInfosForPlaylist($scope.playlistId);

    $scope.playPosition = 0;
    $scope.collapseActive = false;
    $scope.playActive = false;

    $scope.hide = function(playlistPosition) {
        var hide = false;

        if($scope.playlistPositionsByIntTuneId.length > 0){
            hide = true;
            for (var y = 0; y < $scope.playlistPositionsByIntTuneId.length; y++) {
                if($scope.playlistPositionsByIntTuneId[y] == playlistPosition){
                    hide = false;
                }
            }
        }

        return hide;
    };

    $scope.collapse = function() {
        //Toggle
        if($scope.collapseActive){
            $scope.collapseActive = false;
        } else {
            $scope.collapseActive = true;
        }

        if($scope.playActive){
            $timeout(function(){
                scrollTo($scope.playPosition);
            },100);
        } else {
            scrollTo(1);
        }
    };

    $scope.play = function() {
        //Toggle
        if($scope.playActive){
            //Stop
            $scope.playActive = false;
            $scope.playPosition = 0;
        } else {
            //Play
            $scope.playActive = true;
            $scope.playPosition = 1;
            scrollTo($scope.playPosition);
        }
    };

    $scope.forward = function() {
        if(!$scope.playActive){
            $scope.playActive = true;
            $scope.playPosition = $scope.playlist.playlistPositions.length

        } else if($scope.playPosition < $scope.playlist.playlistPositions.length){
            $scope.playPosition = $scope.playPosition + 1;
        } else if($scope.playPosition == $scope.playlist.playlistPositions.length){
            $scope.playPosition = 1;
        }

        scrollTo($scope.playPosition);

    };

    $scope.backward = function() {
        if(!$scope.playActive){
            $scope.playActive = true;
            $scope.playPosition = 1

        } else if($scope.playPosition > 1){
            $scope.playPosition = $scope.playPosition - 1;

        } else if($scope.playPosition == 1){
            $scope.playPosition = $scope.playlist.playlistPositions.length;

        }else if($scope.playPosition == 0){
            $scope.playPosition = 1;
        }
        scrollTo($scope.playPosition);
    };

    $scope.getPlayColor = function(position) {
        var color = "#F5F5F5";
        if($scope.playActive && position == $scope.playPosition){
            color = "#FFFFFF";
        }
        return color;
    };

    function scrollTo(position){
        var elem = angular.element(document.getElementById(position));
        $document.scrollTo(elem, 65, 1000);
    }



    $scope.moveUp = function(playlistPosition) {
        $scope.playlist =  eTuneBookService.moveUpPlaylistPosition($scope.playlistId,playlistPosition.position);
        eTuneBookService.storeTuneBookAbc();
    };

    $scope.moveDown = function(playlistPosition) {
        $scope.playlist =  eTuneBookService.moveDownPlaylistPosition($scope.playlistId,playlistPosition.position);
        eTuneBookService.storeTuneBookAbc();
    };

    $scope.removeFilter = function() {
        $state.transitionTo('playlist',{playlistId: $scope.playlistId});
    };

    $scope.showSet = function(playlistPosition) {
        $state.transitionTo('set',{tuneSetId: playlistPosition.tuneSet.tuneSetId});
    };

    $scope.showTune = function(intTuneId) {
        $state.transitionTo('tune', {intTuneId: intTuneId});
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

    $scope.editPlaylistPosition = function( playlistPosition ) {
        $scope.playlistPositionToBeEdited = playlistPosition;
        //Set current TuneSet for Selection
        $scope.tuneSet = playlistPosition.tuneSet;
        angular.element("#PlaylistPositionEditor").modal("show");
    };

    $scope.copyPlaylistPosition = function( playlistPosition ) {
        $scope.playlistPositionToBeCopied = playlistPosition;
        $scope.targetPlaylists = eTuneBookService.getPlaylists();
        angular.element("#PlaylistPositionCopier").modal("show");
    };

    $scope.editPlaylistTuneSetPosition = function( playlistPosition, tuneSetPosition ) {
        $scope.playlistTuneSetPositionToBeEdited = tuneSetPosition;
        $scope.partPlayInfo = eTuneBookService.initializePartPlayInfo();
        angular.element("#PlaylistTuneSetPositionEditor").modal("show");
    };

    $scope.doneEditingPlaylistPosition = function(playlistPosition) {
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

    $scope.doneCopyingPlaylistPosition = function(playlistPositionToBeCopied, targetPlaylist) {
        eTuneBookService.copyPlaylistPositionToOtherPlaylist(playlistPositionToBeCopied.playlistId, playlistPositionToBeCopied.position , targetPlaylist.id);
        eTuneBookService.storeTuneBookAbc();

        angular.element("#PlaylistPositionCopier").modal("hide");

        $timeout(function(){
            $state.transitionTo('playlist',{playlistId: targetPlaylist.id});
        },1000);
    };


    $scope.doneEditingPlaylistTuneSetPosition = function(tuneSetPosition) {
        eTuneBookService.storeTuneBookAbc();
        angular.element("#PlaylistTuneSetPositionEditor").modal("hide");

        //todo: problem: partPlayInfo bleibt in Modal hängen. Wird Modal für ein anderes Tune aufgerufen, dann wird partPlayInfo vom vorherigen Tune editiert.
    };

    $scope.deletePlaylistPosition = function( playlistPosition ) {
        eTuneBookService.deletePlaylistPosition($scope.playlistId, playlistPosition.position);
        eTuneBookService.storeTuneBookAbc();
    };


    $scope.addPartPlayInfo = function(tuneSetPositionPlayInfo, partPlayInfo) {
        tuneSetPositionPlayInfo.addPartPlayInfo(partPlayInfo);
        eTuneBookService.storeTuneBookAbc();
        $scope.partPlayInfo = eTuneBookService.initializePartPlayInfo();
    }

    $scope.editPartPlayInfo = function(partPlayInfo) {
        $scope.partPlayInfo = partPlayInfo;
    }

    $scope.deletePartPlayInfo = function(tuneSetPositionPlayInfo, partPlayInfo) {
        tuneSetPositionPlayInfo.deletePartPlayInfo(partPlayInfo);
        eTuneBookService.storeTuneBookAbc();
    }

    $scope.moveUpPartPlayInfo = function(tuneSetPositionPlayInfo, partPlayInfo) {
        tuneSetPositionPlayInfo.moveUpPartPlayInfo(partPlayInfo);
        eTuneBookService.storeTuneBookAbc();
    }

    $scope.moveDownPartPlayInfo = function(tuneSetPositionPlayInfo, partPlayInfo) {
        tuneSetPositionPlayInfo.moveDownPartPlayInfo(partPlayInfo);
        eTuneBookService.storeTuneBookAbc();
    }

    $scope.loadDefaulAnnotation = function(tuneSetPosition) {
        tuneSetPosition.currentTuneSetPositionPlayInfo.annotation = tuneSetPosition.annotation;
        eTuneBookService.storeTuneBookAbc();
    }

    $scope.loadDefaulRepeat = function(tuneSetPosition) {
        tuneSetPosition.currentTuneSetPositionPlayInfo.repeat = tuneSetPosition.repeat;
        eTuneBookService.storeTuneBookAbc();
    }

    $scope.newPlaylistPosition = function() {
        $scope.playlistPositionToBeEdited = eTuneBookService.addEmptyPlaylistPosition($scope.playlistId);
        //todo: add empty play info
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





