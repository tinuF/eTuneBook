'use strict';

/**
 * Controller for video Template
 */
angular.module('eTuneBookApp').controller( 'tunevideoCtrl', function( $scope, $state, $stateParams, eTuneBookService ) {
    // Get current tune
    $scope.intTuneId = $stateParams['intTuneId'];
    $scope.code = $stateParams['code'];
    $scope.source = $stateParams['source'];

    //Editable Fields (detached copies)
    $scope.tuneVideoCode = angular.copy($scope.code);
    $scope.tuneVideoDescription = "";

    $scope.video = {};
    $scope.videoUrl = "";

    if($scope.code != ""){
        $scope.video =  eTuneBookService.getVideo($scope.intTuneId, $scope.source, $scope.code);
        $scope.tuneVideoDescription = angular.copy($scope.video.description);
        $scope.videoUrl = "//www.youtube.com/embed/" + $scope.tuneVideoCode;
    }

    $scope.save = function () {
        if($scope.tuneVideoCode == $scope.code){
            //Update Fields -> tuneBook in eTuneBookService gets updated as well (copy by reference)
            $scope.video.description = angular.copy($scope.tuneVideoDescription);
        } else {
            //Add Video
            $scope.video =  eTuneBookService.addVideo($scope.intTuneId, $scope.source, $scope.tuneVideoCode, $scope.tuneVideoDescription);
            //Update List and Url
            $state.transitionTo('tunevideo', {intTuneId: $scope.intTuneId, source: $scope.source, code: $scope.tuneVideoCode});
            //Select new Video in the List
            $scope.$parent.tuneVideosSelected = [];
            $scope.$parent.tuneVideosSelected.push($scope.video);
        }
        //Generate TuneBook-Abc and save it to localStorage
        eTuneBookService.storeTuneBookAbc();
    };


    $scope.delete = function () {
        //Delete Video
        eTuneBookService.deleteVideo($scope.intTuneId, $scope.source, $scope.tuneVideoCode);
        //Back to List
        $state.transitionTo('tunevideos', {intTuneId: $scope.intTuneId});

        //Generate TuneBook-Abc and save it to localStorage
        eTuneBookService.storeTuneBookAbc();
    };

    $scope.load = function () {
        //Achtung: Mit www beginnen, um sowohl http als auch https zu unterstuetzen
        $scope.videoUrl = "//www.youtube.com/embed/" + $scope.tuneVideoCode;
    };
});
