'use strict';

/**
 * Controller for tune Template
 */
angular.module('eTuneBookApp').controller( 'tuneCtrl', function ( $scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService ) {
    // Get current tune
    $scope.intTuneId = $stateParams['intTuneId'];
    $scope.tune =  eTuneBookService.getTune($scope.intTuneId);

    $scope.tunes =  eTuneBookService.getTunes();

    $scope.currentState = "Dots";

    renderAbc($scope.tune);

    $scope.showTuneSets = function(  ) {
        var sets = eTuneBookService.getTuneSetsByIntTuneId($scope.intTuneId);

        if (sets.length == 0 || sets.length > 1) {
            initActiveMenu();
            $scope.tuneSetsMenuActive = true;
            $state.transitionTo('tunesets', {intTuneId: $scope.intTuneId});
        } else {
            //Tune kommt nur in einem Set vor -> Set-View anzeigen
            $state.transitionTo('set', {tuneSetId: sets[0].tuneSetId});
        }

    };

    $scope.showTuneVideos = function(  ) {
        initActiveMenu();
        $scope.tuneVideosMenuActive = true;
        $state.transitionTo('tunevideos', {intTuneId: $scope.intTuneId});
    };

    $scope.showTuneAbc = function(  ) {
        initActiveMenu();
        $scope.tuneAbcMenuActive = true;
        $state.transitionTo('tuneabc', {intTuneId: $scope.intTuneId});
    };

    $scope.showTunePractice = function(  ) {
        initActiveMenu();
        $scope.tunePracticeMenuActive = true;
        $state.transitionTo('tunepractice', {intTuneId: $scope.intTuneId});
    };

    $scope.showTuneInfo = function(  ) {
        initActiveMenu();
        $scope.tuneInfoMenuActive = true;
        $state.transitionTo('tuneinfo', {intTuneId: $scope.intTuneId});
    };

    function initActiveMenu(){
        $scope.tuneSetsMenuActive = false;
        $scope.tuneVideosMenuActive = false;
        $scope.tuneAbcMenuActive = false;
        $scope.tunePracticeMenuActive = false;
        $scope.tuneInfoMenuActive = false;
    }

    function renderAbc(tune) {
        //Render Abc
        //Important: Has to be timed-out, otherwise fingerings won't show up
        //Compare with tbkTuneFocus: ABCJS.Editor also timed-out -> fingerings show up
        //Compare with tbkPopover: ABCJS.renderAbc is not timed-out -> fingerings dont' show (timeout in popover -> no popover is shown)

        $timeout(function() {
            var showHere = 'renderTheDotsFor' + $scope.intTuneId;
            var playHere = 'renderMidi';
            var tuneAbc = skipFingering(tune.pure);
            var dotsScale = 1.0;
            /*
             if ($scope.sessionModus) {
             dotsScale = 0.6;
             }
             */
            //ABCJS.renderAbc(showHere, tuneAbc, {print:true}, {scale:dotsScale}, {});
            ABCJS.renderAbc(showHere, tuneAbc, {}, {scale:dotsScale}, {});

            //TODO: MIDI-Button, Anzeige in separatem Window. Eventuell Einbau MIDI.js
            //siehe http://mudcu.be/midi-js/ und https://github.com/mudcube/MIDI.js
            //ABCJS.renderMidi(playHere, tuneAbc, {}, {}, {});
        }, 0, false);

    }

    function skipFingering(tuneAbc) {
        //Todo: skipFingering
        /*
        if (!$scope.fingeringAbcIncl) {
            tuneAbc = tuneAbc.replace(eTBk.PATTERN_FINGER, '');
        }
        */
        return tuneAbc
    }

    $scope.tuneUp = function() {
        // Transpose up
        eTuneBookService.tuneUp($scope.intTuneId);
        // Show Transposition
        renderAbc($scope.tune);
        eTuneBookService.storeTuneBookAbc();
    };

    $scope.tuneDown = function() {
        // Transpose down
        eTuneBookService.tuneDown($scope.intTuneId);
        // Show Transposition
        renderAbc($scope.tune);
        eTuneBookService.storeTuneBookAbc();
    };

    $scope.editTuneInfo = function( ) {
        $state.transitionTo('tuneinfo', {intTuneId: $scope.tune.intTuneId})
    };

    $scope.editTune = function( ) {
        $state.transitionTo('tuneabc', {intTuneId: $scope.tune.intTuneId})
    };

    $scope.justPlayedTheTune = function( tune) {
        var now = new Date();
        eTuneBookService.addTunePlayDate(tune, now);
        eTuneBookService.storeTuneBookAbc();
    };

    $scope.loadRandomTune = function(playDateFilter) {
        $scope.$parent.playDateFilter = playDateFilter;
        var intTuneId = eTuneBookService.getRandomIntTuneId(playDateFilter);
        $state.transitionTo('tune', {intTuneId: intTuneId});
    };


    $scope.$watch(function () { return $state.is('tune'); }, function() {
        if ($state.is('tune')){
            $scope.currentState = "Dots";
        }
    });

});
