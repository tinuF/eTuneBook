'use strict';

/**
 * Controller for tune Template
 */
angular.module('eTuneBookApp').controller( 'tuneCtrl', function ( $scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService ) {
    // Get current tune
    $scope.intTuneId = $stateParams['intTuneId'];
    $scope.tune =  eTuneBookService.getTune($scope.intTuneId);

    renderAbc($scope.tune);



    $scope.tabs = [
        { link : '#tunes/'+$scope.intTuneId+'/sets', label : 'Sets' },
        { link : '#tunes/'+$scope.intTuneId+'/videos', label : 'Videos' },
        { link : '#tunes/'+$scope.intTuneId+'/abc', label : 'Abc' },
        { link : '#tunes/'+$scope.intTuneId+'/practice', label : 'Practice' },
        { link : '#tunes/'+$scope.intTuneId+'/info', label : 'Info' }
    ];



    if ($state.is('tune')){
        $state.transitionTo('tunesets', {intTuneId: $scope.tune.intTuneId});
        $scope.selectedTab = $scope.tabs[0];
    } else if ($state.is('tuneabc')){
        //'New Tune'-Button pressed
        $scope.selectedTab = $scope.tabs[2];
    }

    $scope.setSelectedTab = function(tab) {
        $scope.selectedTab = tab;
    };

    $scope.tabClass = function(tab) {
        if ($scope.selectedTab == tab) {
            return "active";
        } else {
            return "";
        }
    };


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
            ABCJS.renderAbc(showHere, tuneAbc, {}, {}, {});

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

});
