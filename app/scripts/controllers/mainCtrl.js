'use strict';

/**
 * Main controller for eTuneBookApp. 
 */
angular.module('eTuneBookApp').controller( 'mainCtrl', function ( $scope, $window, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService, GAPI, Drive ) {
	// Test for first-time navigation to the welcome-page
	//localStorage.clear();

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

    $window.mobilecheck = function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };


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
        initActiveMenu();
        $scope.setsMenuActive = true;
        $state.transitionTo('setlist');
    };

    $scope.showTunes = function(  ) {
        initActiveMenu();
        $scope.tunesMenuActive = true;
        $state.transitionTo('tunelist');
    };

    $scope.showInfo = function(  ) {
        initActiveMenu();
        $scope.infoMenuActive = true;
        $state.transitionTo('info.introduction');
    };

    function initActiveMenu(){
        $scope.bookMenuActive = false;
        $scope.setsMenuActive = false;
        $scope.tunesMenuActive = false;
        $scope.infoMenuActive = false;
        /*
        $scope.introductionMenuActive = false;
        $scope.getStartedMenuActive = false;
        $scope.manualMenuActive = false;
        $scope.releaseNotesMenuActive = false;
        $scope.creditsMenuActive = false;
        $scope.feedbackMenuActive = false;
        */
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

    // Import TuneBook from Google Drive
    $scope.selectFileOnGoogleDrive = function() {

        // User needs to login and to authorize eTuneBook so that eTuneBook is able to access his Google Drive
        var promise = GAPI.init();

        promise.then(function(result) {
            //success
            //Load Google Drive File Picker
            loadPicker();
        }, function(error) {
            //error
            alert('Failed: ' + error);
        });
    };

    // Use the API Loader script to load google.picker.
    function loadPicker() {
        gapi.load('picker', {'callback': createPicker});
    }

    // Create and render a Picker object for searching documents
    function createPicker() {
        var docsView = new google.picker.DocsView(google.picker.ViewId.DOCUMENTS)
            .setIncludeFolders(true);

        var picker = new google.picker.PickerBuilder().
            addView(docsView).
            setAppId(GAPI.app.apiKey).
            setOAuthToken(GAPI.app.oauthToken.access_token).
            setCallback(pickerCallback).
            build();
        picker.setVisible(true);
    }

    // Back from the Picker
    function pickerCallback(data) {
        var url = 'nothing';
        if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
            var doc = data[google.picker.Response.DOCUMENTS][0];
            url = doc[google.picker.Document.URL];

            //Metadaten des ausgewählten Dokuments holen
            var promise = Drive.getFiles(doc[google.picker.Document.ID]);

            promise.then(function(file) {
                //success
                //File-Download und Übernahme in eTuneBook
                importTuneBookFromGoogleDrive(file);

            }, function(error) {
                //error
                alert('Failed: ' + error);
            });
        }
    }

    function importTuneBookFromGoogleDrive(file) {

        if (file.downloadUrl) {
            var accessToken = GAPI.app.oauthToken.access_token;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', file.downloadUrl);
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
            xhr.onload = function() {
                eTuneBookService.getTuneBookFromImportedFile(xhr.responseText, file.title);
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
            };
            xhr.onerror = function() {
                alert("Fehler beim Download des TuneBooks");
                //callback(null);
            };
            xhr.send();
        } else {
            alert("Fehler beim Laden des TuneBooks (kein Download-Link)");
            //callback(null);
        }
    };





    $scope.exportTuneBook = function(startDownload) {
        $state.transitionTo('abc');
    };


    $scope.$watch(function () { return $location.path(); }, function() {
        var path = $location.path();
        var pathSplits = path.split("/");
        var beginOfPath = pathSplits[1].substring(0,4);

        //$scope.pathSplits = pathSplits;

        initActiveMenu();
        if (beginOfPath == "sets"){
            if (pathSplits.length == 2){
                $scope.setsMenuActive = true;
            }
        } else if (beginOfPath == "tune"){
            if (pathSplits.length == 2){
                $scope.tunesMenuActive = true;
            }
        } else if (beginOfPath == "book"){
            $scope.bookMenuActive = true;
        } else if (beginOfPath == "abc"){
            $scope.bookMenuActive = true;
        } else if (beginOfPath == "info"){
            $scope.infoMenuActive = true;
            // siehe info.html
            /*
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
            */
        }
    });

    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
        $rootScope.$previousState = from;
        $rootScope.$previousStateParams = fromParams;
    });

});





