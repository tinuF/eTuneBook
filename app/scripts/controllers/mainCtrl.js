'use strict';

/**
 * Main controller for eTuneBookApp. 
 */
angular.module('eTuneBookApp').controller( 'mainCtrl', function ( $scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService ) {
	// Test for first-time navigation to the welcome-page
	//localStorage.clear();

	// Test whether changes in eTuneBook.appcache are detected by the browser
	// Todo: Chrome reagiert hier mit Confirm-Panel, Firefox macht zwar den zweiten Reload, aber ohne das Confirm-Panel anzuzeigen!
	// Todo: Check, ob AppCache wieder eingeführt werden soll
	//askForRefreshFromServer();

    $scope.exampleFileNameWithoutAbc = eTBk.EXAMPLE_FILENAME_WITHOUTABC;
    $scope.exampleVersion = eTBk.EXAMPLE_VERSION;
    // Init available colors
    $.fn.colorPicker.defaults.colors = ['F5F5F5', 'CCFFCC', 'EFEBD6', 'FFFF99', 'C7DAD4', 'BFE4FF', 'D8CFE6', 'FFE6E6', 'EEE6FF', 'E6FFE6', 'FFCCBF', 'FFFFFF', 'CCCCFF', 'FFFFCC', 'FF9980'];

    // Get tuneBook from localStorage
    $scope.tuneBook =  eTuneBookService.getTuneBookFromLocalStorage();

    if ($scope.tuneBook != null && $scope.tuneBook.hasOwnProperty("tuneSets")){
	} else {
		// Init TuneBook
		$scope.tuneBook = eTuneBookService.initializeTuneBook();
        $state.transitionTo('info.introduction');
	}

    /*
	function askForRefreshFromServer() {
		if (window.applicationCache) {
			applicationCache.addEventListener('updateready', function() {
				if (confirm('An eTuneBook update is available. Reload now?')) {
					window.location.reload();
				}
			});
		}
	}
	*/

	$scope.loadBxplTuneBook = function( ) {
		$timeout(function(){
			try {
				$scope.tuneBook = eTuneBookService.getDefaultFromServer();
			} catch(e) {
				alert("eTuneBook cannot import " + eTBk.EXAMPLE_FILENAME + " due to: " + e.toString());		
			} finally {
                eTuneBookService.storeTuneBookAbc();
                // TODO: Check for ui-router fix
                // ui-router does not refresh state, if no parameter has changed
                //(see https://github.com/angular-ui/ui-router/issues/122)
                // Umgehungsloesung: Alternativ tunelist oder setlist als Start-Page
                if ($state.is('tunelist')){
                    $state.transitionTo('setlist');
                } else {
                    $state.transitionTo('tunelist');
                }
			}
		},0);
	};
		

	$scope.initializeTuneBook = function( ) {
		$scope.tuneBook = eTuneBookService.initializeTuneBook();
        eTuneBookService.storeTuneBookAbc();
        $state.transitionTo('tuneabc', {intTuneId: $scope.tuneBook.tuneSets[0].tuneSetPositions[0].tune.intTuneId})
    };
   
	$scope.editTuneBook = function(  ) {
		$state.transitionTo('book');
	};

    $scope.showSets = function(  ) {
        $state.transitionTo('setlist');
    };

    $scope.showTunes = function(  ) {
        $state.transitionTo('tunelist');
    };

    $scope.showInfo = function(  ) {
        $state.transitionTo('info.introduction');
    };

    function initActiveMenu(){
        $scope.bookMenuActive = false;
        $scope.setsMenuActive = false;
        $scope.tunesMenuActive = false;
        $scope.infoMenuActive = false;
        $scope.introductionMenuActive = false;
        $scope.getStartedMenuActive = false;
        $scope.manualMenuActive = false;
        $scope.releaseNotesMenuActive = false;
        $scope.creditsMenuActive = false;
        $scope.feedbackMenuActive = false;
    }


	$scope.putTuneBookToLocalStorage = function() {
		//eTuneBookService.putToLocalStorage($scope.tuneBook);
		eTuneBookService.storeAbc($scope.tuneBook);
	};

  
	$scope.importTuneBook = function(abc, fileName) {
		$timeout(function(){
			try {
				$scope.tuneBook = eTuneBookService.getTuneBookFromImportedFile(abc, fileName);
			} catch(e) {
				alert("eTuneBook cannot import " + fileName + " due to: " + e.toString());		
			} finally {
                eTuneBookService.storeTuneBookAbc();
				// ui-router does not refresh state, if no parameter has changed
                //(see https://github.com/angular-ui/ui-router/issues/122)
                // Umgehungsloesung: Alternativ tunelist oder setlist als Start-Page
                if ($state.is('tunelist')){
                    $state.transitionTo('setlist');
                } else {
                    $state.transitionTo('tunelist');
                }
			}
		},0);
	};

    $scope.exportTuneBook = function(startDownload) {
        $state.transitionTo('abc');
    };


    $scope.$watch(function () { return $location.path(); }, function() {
        var path = $location.path();
        var pathSplits = path.split("/");
        var beginOfPath = pathSplits[1].substring(0,4);

        initActiveMenu();
        if (beginOfPath == "sets"){
            $scope.setsMenuActive = true;
        } else if (beginOfPath == "tune"){
            $scope.tunesMenuActive = true;
        } else if (beginOfPath == "book"){
            $scope.bookMenuActive = true;
        } else if (beginOfPath == "abc"){
            $scope.bookMenuActive = true;
        } else if (beginOfPath == "info"){
            $scope.infoMenuActive = true;
            // siehe info.html
            beginOfPath = pathSplits[2].substring(0,5);
            if (beginOfPath == "intro"){
                $scope.introductionMenuActive = true;
            } else if (beginOfPath == "getst"){
                $scope.getStartedMenuActive = true;
            } else if (beginOfPath == "manua"){
                $scope.manualMenuActive = true;
            } else if (beginOfPath == "relea"){
                $scope.releaseNotesMenuActive = true;
            } else if (beginOfPath == "credi"){
                $scope.creditsMenuActive = true;
            } else if (beginOfPath == "feedb"){
                $scope.feedbackMenuActive = true;
            }
        }
    });
});





