'use strict';

/**
 * Controller for abc Template
 */
angular.module('eTuneBookApp').controller( 'abcCtrl', function ( $scope, $location, $timeout, $rootScope, $state, eTuneBookService, GAPI, Drive ) {
    $scope.fingeringAbcIncl = true;
    $scope.tuneSetAbcIncl = true;
    $scope.playDateAbcIncl = true;
    $scope.skillAbcIncl = true;
    $scope.colorAbcIncl = true;
    $scope.annotationAbcIncl = true;
    $scope.siteAbcIncl = true;
    $scope.tubeAbcIncl = true;

    $scope.tuneBook = eTuneBookService.getCurrentTuneBook();

    exportTuneBook(false);

    function exportTuneBook(startDownload){
        var date = moment(new Date());
        var tuneBookVersion = date.format("YYYY-MM-DDTHH:mm");

        $scope.exportedTuneBook = eTuneBookService.getAbc($scope.tuneBook.tuneSets, $scope.tuneBook.name, tuneBookVersion, $scope.tuneBook.description, $scope.tuneSetAbcIncl, $scope.playDateAbcIncl, $scope.skillAbcIncl, $scope.colorAbcIncl, $scope.annotationAbcIncl, $scope.siteAbcIncl, $scope.tubeAbcIncl, $scope.fingeringAbcIncl);

        // Generieren Object URL zum exportierten Tunebook (fuer Backup des Abc-Codes in File)
        saveTuneBookAsFile($scope.exportedTuneBook, startDownload);
    }


    $scope.saveTuneBookToGoogleDrive = function() {
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

    // Create and render a Picker object for selecting a folder
    function createPicker() {
        var docsView = new google.picker.DocsView(google.picker.ViewId.FOLDERS)
            .setIncludeFolders(true)
            .setMimeTypes('application/vnd.google-apps.folder')
            .setSelectFolderEnabled(true);

        var picker = new google.picker.PickerBuilder().
            addView(docsView).
            setAppId(GAPI.app.apiKey).
            setOAuthToken(GAPI.app.oauthToken.access_token).
            setCallback(pickerCallback).
            build();
        picker.setVisible(true);
    }


    function pickerCallback(data) {
        if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
            var doc = data[google.picker.Response.DOCUMENTS][0];
            insertFile($scope.exportedTuneBook, doc[google.picker.Document.ID]);
        }
    }

    function insertFile(abc, folderId, callback) {
        var boundary = '-------314159265358979323846';
        var delimiter = "\r\n--" + boundary + "\r\n";
        var close_delim = "\r\n--" + boundary + "--";

        var date = moment();
        var tuneBookVersion = date.format("YYYY-MM-DDTHH:mm");

        var fileNameToSaveAs = "TuneBook-" + tuneBookVersion;

        var contentType = 'text/plain';
        var metadata = {
            'title': fileNameToSaveAs,
            'mimeType': contentType,
            'parents':[{"id":folderId}]
        };

        //var base64Data = btoa(abc);
        var base64Data = abc;
        var multipartRequestBody =
            delimiter +
                'Content-Type: application/json\r\n\r\n' +
                JSON.stringify(metadata) +
                delimiter +
                'Content-Type: ' + contentType + '\r\n' +
                //'Content-Transfer-Encoding: base64\r\n' +
                '\r\n' +
                base64Data +
                close_delim;

        var request = gapi.client.request({
            'path': '/upload/drive/v2/files',
            'method': 'POST',
            'params': {'uploadType': 'multipart'},
            'headers': {
                'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
            },
            'body': multipartRequestBody});
        if (!callback) {
            callback = function(file) {
                console.log(file);
                alert("'"+ file.title + "' exported to Google Drive");
            };
        }
        request.execute(callback);
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
