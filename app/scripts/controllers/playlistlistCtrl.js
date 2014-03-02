'use strict';

/**
 * Controller for playlistlist Template
 */
angular.module('eTuneBookApp').controller( 'playlistlistCtrl', function playlistlistCtrl( $scope, $window, $location, $timeout, $rootScope, $state, $stateParams,eTuneBookService ) {

    var columnDefs, rowTempl, aggregateTemplate;

    $scope.playlists = eTuneBookService.getPlaylists();


    $scope.showPlaylist = function(playlist) {
        $state.transitionTo('playlist',{playlistId: playlist.id});
    };

    $scope.sortPlaylistIdAsNumber = function(playlist) {
        if(isNaN(playlist.id)) {
            return playlist.id;
        }

        return parseInt(playlist.id);
    }

    $scope.edit = function( playlist ) {
        $scope.playlistToBeEdited = playlist;
        angular.element("#PlaylistEditor").modal("show");
    };

    $scope.copy = function( playlist ) {
        eTuneBookService.copyPlaylist(playlist.id);
        eTuneBookService.storeTuneBookAbc();
    };


    $scope.doneEditing = function(playlist) {
        eTuneBookService.storeTuneBookAbc();
        angular.element("#PlaylistEditor").modal("hide");
    };

    $scope.delete = function( playlist ) {
        eTuneBookService.deletePlaylist(playlist.id);
        eTuneBookService.storeTuneBookAbc();
    };

    $scope.newPlaylist = function() {
        $scope.playlistToBeEdited = eTuneBookService.addEmptyPlaylist();
        angular.element("#PlaylistEditor").modal("show");
    };


});





