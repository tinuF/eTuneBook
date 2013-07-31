'use strict';

/**
 * Controller for abc Template
 */
angular.module('eTuneBookApp').controller( 'abcCtrl', function ( $scope, $location, $timeout, $rootScope, $state, eTuneBookService ) {
    $scope.fingeringAbcIncl = true;
    $scope.tuneSetAbcIncl = true;
    $scope.playDateAbcIncl = true;
    $scope.skillAbcIncl = true;
    $scope.colorAbcIncl = true;
    $scope.annotationAbcIncl = true;
    $scope.siteAbcIncl = true;
    $scope.tubeAbcIncl = true;

    $scope.tuneBook = eTuneBookService.getCurrentTuneBook();

    exportTuneBook(true);

    function exportTuneBook(startDownload){
        var date = moment(new Date());
        var tuneBookVersion = date.format("YYYY-MM-DDTHH:mm");

        $scope.exportedTuneBook = eTuneBookService.getAbc($scope.tuneBook.tuneSets, $scope.tuneBook.name, tuneBookVersion, $scope.tuneBook.description, $scope.tuneSetAbcIncl, $scope.playDateAbcIncl, $scope.skillAbcIncl, $scope.colorAbcIncl, $scope.annotationAbcIncl, $scope.siteAbcIncl, $scope.tubeAbcIncl, $scope.fingeringAbcIncl);

        // Generieren Object URL zum exportierten Tunebook (fuer Backup des Abc-Codes in File)
        saveTuneBookAsFile($scope.exportedTuneBook, startDownload);
    }

    function saveTuneBookAsFile(exportedTuneBookAsText, startDownload){
        var exportedTuneBookAsBlob = new Blob([exportedTuneBookAsText], {type:'text/plain'});
        var fileNameToSaveAs = "My TuneBook";

        var downloadLink = document.getElementById("saveTuneBookToFile");
        downloadLink.href = createObjectURL(exportedTuneBookAsBlob);
        downloadLink.download = fileNameToSaveAs;

        if (startDownload) {
            downloadLink.click();
        }
    }

    function createObjectURL ( file ) {
        if ( window.webkitURL ) {
            // Chrome
            return window.webkitURL.createObjectURL( file );
        } else if ( window.URL && window.URL.createObjectURL ) {
            // Firefox
            return window.URL.createObjectURL( file );
        } else {
            return null;
        }
    }

    $scope.toggleFingeringAbc = function() {
        $scope.fingeringAbcIncl = !$scope.fingeringAbcIncl;
        exportTuneBook(false);
    };

    $scope.toggleTuneSetAbc = function() {
        $scope.tuneSetAbcIncl = !$scope.tuneSetAbcIncl;
        exportTuneBook(false);
    };

    $scope.togglePlayDateAbc = function() {
        $scope.playDateAbcIncl = !$scope.playDateAbcIncl;
        exportTuneBook(false);
    };


    $scope.toggleSkillAbc = function() {
        $scope.skillAbcIncl = !$scope.skillAbcIncl;
        exportTuneBook(false);
    };


    $scope.toggleColorAbc = function() {
        $scope.colorAbcIncl = !$scope.colorAbcIncl;
        exportTuneBook(false);
    };

    $scope.toggleAnnotationAbc = function() {
        $scope.annotationAbcIncl = !$scope.annotationAbcIncl;
        exportTuneBook(false);
    };

    $scope.toggleSiteAbc = function() {
        $scope.siteAbcIncl = !$scope.siteAbcIncl;
        exportTuneBook(false);
    };

    $scope.toggleTubeAbc = function() {
        $scope.tubeAbcIncl = !$scope.tubeAbcIncl;
        exportTuneBook(false);
    }
});
