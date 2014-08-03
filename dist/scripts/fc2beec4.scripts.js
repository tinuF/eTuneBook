'use strict';
/**
 * Definition and Configuration of the eTuneBookApp module.
 *
 * @type {angular.Module}
 */
//angular.module('eTuneBookApp', ['ui.state', 'ngGrid', 'ui.bootstrap']);
//ACHTUNG: ui.bootsrap bricht importFile (File-Auswahl-Schirm kommt nicht mehr hoch)!
//angular.module('eTuneBookApp', ['ui.router', 'ngGrid', 'ngBootstrap', 'ngTouch', 'angular-loading-bar', 'ngAnimate', 'gapi']);
// TODO: Resolve Problems with angular-animate and anguluar-loading-bar
// Achtung: ngBootstrap wird vom Date-Range-Picker gebraucht!
angular.module('eTuneBookApp', [
  'ui.router',
  'ngGrid',
  'ngBootstrap',
  'ngTouch',
  'angular-loading-bar',
  'gapi',
  'duScroll'
]);
angular.module('eTuneBookApp').config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.html5Mode(false);
  }
]);
angular.module('eTuneBookApp').config([
  '$sceProvider',
  function ($sceProvider) {
    // Temporary Fix for broken Youtube-Embeds
    // check http://docs.angularjs.org/api/ng.$sce
    $sceProvider.enabled(false);
  }
]);
angular.module('eTuneBookApp').config([
  '$stateProvider',
  function ($stateProvider) {
    var main = {
        name: 'main',
        url: '',
        view: 'main',
        templateUrl: 'views/main.html',
        controller: 'mainCtrl'
      };
    var book = {
        name: 'book',
        parent: main,
        url: '/book',
        views: {
          '@main': {
            templateUrl: 'views/book.html',
            controller: 'bookCtrl'
          }
        }
      };
    var bookedit = {
        name: 'bookedit',
        parent: book,
        url: '',
        views: {
          '@main': {
            templateUrl: 'views/bookedit.html',
            controller: 'bookeditCtrl'
          }
        }
      };
    var playlists = {
        name: 'playlists',
        abstract: true,
        parent: main,
        url: '/playlists',
        views: {
          '@main': {
            templateUrl: 'views/playlists.html',
            controller: 'playlistsCtrl'
          },
          'booktitle@main': { templateUrl: 'views/booktitle.html' }
        }
      };
    var playlistlist = {
        name: 'playlistlist',
        parent: playlists,
        url: '',
        views: {
          '@playlists': {
            templateUrl: 'views/playlistlist.html',
            controller: 'playlistlistCtrl'
          }
        }
      };
    var playlist = {
        name: 'playlist',
        parent: playlists,
        url: '/{playlistId}?pos&tune',
        templateUrl: 'views/playlist.html',
        controller: 'playlistCtrl'
      };
    var sets = {
        name: 'sets',
        abstract: true,
        parent: main,
        url: '/sets',
        views: {
          '@main': {
            templateUrl: 'views/sets.html',
            controller: 'setsCtrl'
          },
          'booktitle@main': { templateUrl: 'views/booktitle.html' }
        }
      };
    var setlist = {
        name: 'setlist',
        parent: sets,
        url: '?type&key&color&skill&evt&band&plmin&plmax&freqcomp&freq&updmin&updmax',
        views: {
          '@sets': {
            templateUrl: 'views/setlist.html',
            controller: 'setlistCtrl'
          },
          'filter@setlist': {
            templateUrl: 'views/filter.html',
            controller: 'filterCtrl'
          }
        }
      };
    var set = {
        name: 'set',
        parent: sets,
        url: '/{tuneSetId}',
        templateUrl: 'views/set.html',
        controller: 'setCtrl'
      };
    var tunes = {
        name: 'tunes',
        abstract: true,
        parent: main,
        url: '/tunes',
        views: {
          '@main': {
            templateUrl: 'views/tunes.html',
            controller: 'tunesCtrl'
          },
          'booktitle@main': { templateUrl: 'views/booktitle.html' }
        }
      };
    var tunelist = {
        name: 'tunelist',
        parent: tunes,
        url: '?type&key&color&skill&evt&band&plmin&plmax&freqcomp&freq&updmin&updmax',
        views: {
          '@tunes': {
            templateUrl: 'views/tunelist.html',
            controller: 'tunelistCtrl'
          },
          'filter@tunelist': {
            templateUrl: 'views/filter.html',
            controller: 'filterCtrl'
          }
        }
      };
    var tune = {
        name: 'tune',
        abctract: true,
        parent: tunes,
        url: '/{intTuneId}',
        templateUrl: 'views/tune.html',
        controller: 'tuneCtrl'
      };
    var tunesets = {
        name: 'tunesets',
        parent: tune,
        url: '/sets',
        templateUrl: 'views/tunesets.html',
        controller: 'tunesetsCtrl'
      };
    var tuneplaylists = {
        name: 'tuneplaylists',
        parent: tune,
        url: '/playlists',
        templateUrl: 'views/tuneplaylists.html',
        controller: 'tuneplaylistsCtrl'
      };
    var tunevideos = {
        name: 'tunevideos',
        parent: tune,
        url: '/videos',
        templateUrl: 'views/tunevideos.html',
        controller: 'tunevideosCtrl'
      };
    var tunevideo = {
        name: 'tunevideo',
        parent: tunevideos,
        url: '/{source}/{code}',
        templateUrl: 'views/tunevideo.html',
        controller: 'tunevideoCtrl'
      };
    var tuneabc = {
        name: 'tuneabc',
        parent: tune,
        url: '/abc',
        templateUrl: 'views/tuneabc.html',
        controller: 'tuneabcCtrl'
      };
    var tunepractice = {
        name: 'tunepractice',
        parent: tune,
        url: '/practice',
        templateUrl: 'views/tunepractice.html',
        controller: 'tunepracticeCtrl'
      };
    var tuneinfo = {
        name: 'tuneinfo',
        parent: tune,
        url: '/info',
        templateUrl: 'views/tuneinfo.html',
        controller: 'tuneinfoCtrl'
      };
    var abc = {
        name: 'abc',
        parent: main,
        url: '/abc',
        views: {
          '@main': {
            templateUrl: 'views/abc.html',
            controller: 'abcCtrl'
          },
          'booktitle@main': { templateUrl: 'views/booktitle.html' }
        }
      };
    var filter = {
        name: 'filter',
        url: '',
        templateUrl: 'views/filter.html',
        controller: 'filterCtrl'
      };
    var info = {
        name: 'info',
        parent: main,
        url: '/info',
        templateUrl: 'views/info.html',
        controller: 'infoCtrl'
      };
    var introduction = {
        name: 'info.introduction',
        parent: info,
        url: '/introduction',
        templateUrl: 'views/introduction.html'
      };
    var getstarted = {
        name: 'info.getstarted',
        parent: info,
        url: '/getstarted',
        templateUrl: 'views/getstarted.html'
      };
    var manual = {
        name: 'info.manual',
        parent: info,
        url: '/manual',
        templateUrl: 'views/manual.html'
      };
    var releasenotes = {
        name: 'info.releasenotes',
        parent: info,
        url: '/releasenotes',
        templateUrl: 'views/releasenotes.html'
      };
    var feedback = {
        name: 'info.feedback',
        parent: info,
        url: '/feedback',
        templateUrl: 'views/feedback.html'
      };
    var credits = {
        name: 'info.credits',
        parent: info,
        url: '/credits',
        templateUrl: 'views/credits.html'
      };
    $stateProvider.state(main).state(book).state(playlists).state(sets).state(tunes).state(abc).state(info).state(bookedit).state(playlist).state(playlistlist).state(set).state(setlist).state(filter).state(tunelist).state(tune).state(tunesets).state(tuneplaylists).state(tuneabc).state(tuneinfo).state(tunepractice).state(tunevideos).state(tunevideo).state(introduction).state(getstarted).state(manual).state(releasenotes).state(feedback).state(credits);
  }
]);
angular.module('eTuneBookApp').value('GoogleApp', {
  apiKey: 'AIzaSyDz8AxR3gRMYpVQs4HUw879ZsFeKYTJoWk',
  clientId: '344379596022.apps.googleusercontent.com',
  scopes: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/youtube',
    'https://www.googleapis.com/auth/userinfo.profile'
  ]
});
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// http://stackoverflow.com/questions/13320015/how-to-write-a-debounce-service-in-angularjs
// http://plnkr.co/edit/fJwRER?p=preview
angular.module('eTuneBookApp').factory('debounce', [
  '$timeout',
  '$q',
  function ($timeout, $q) {
    return function (func, wait, immediate) {
      var timeout;
      var deferred = $q.defer();
      return function () {
        var context = this, args = arguments;
        var later = function () {
          timeout = null;
          if (!immediate) {
            deferred.resolve(func.apply(context, args));
            deferred = $q.defer();
          }
        };
        var callNow = immediate && !timeout;
        if (timeout) {
          $timeout.cancel(timeout);
        }
        timeout = $timeout(later, wait);
        if (callNow) {
          deferred.resolve(func.apply(context, args));
          deferred = $q.defer();
        }
        return deferred.promise;
      };
    };
  }
]);
'use strict';
/**
 * Controller for abc Template
 */
angular.module('eTuneBookApp').controller('abcCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  'eTuneBookService',
  'GAPI',
  'Drive',
  function ($scope, $location, $timeout, $rootScope, $state, eTuneBookService, GAPI, Drive) {
    $scope.abcOption = eTuneBookService.createDefaultAbcOption();
    $scope.tuneBook = eTuneBookService.getCurrentTuneBook();
    exportTuneBook(false);
    function exportTuneBook(startDownload) {
      var date = moment(new Date());
      $scope.tuneBook.version = date.format('YYYY-MM-DDTHH:mm');
      $scope.exportedTuneBook = eTuneBookService.writeAbc($scope.abcOption);
      // Generieren Object URL zum exportierten Tunebook (fuer Backup des Abc-Codes in File)
      saveTuneBookAsFile($scope.exportedTuneBook, startDownload);
    }
    $scope.saveTuneBookToGoogleDrive = function () {
      var promise = GAPI.init();
      promise.then(function (result) {
        //success
        //Load Google Drive File Picker
        loadPicker();
      }, function (error) {
        //error
        alert('Failed: ' + error);
      });
    };
    // Use the API Loader script to load google.picker.
    function loadPicker() {
      gapi.load('picker', { 'callback': createPicker });
    }
    // Create and render a Picker object for selecting a folder
    function createPicker() {
      var docsView = new google.picker.DocsView(google.picker.ViewId.FOLDERS).setIncludeFolders(true).setMimeTypes('application/vnd.google-apps.folder').setSelectFolderEnabled(true);
      var picker = new google.picker.PickerBuilder().addView(docsView).setAppId(GAPI.app.apiKey).setOAuthToken(GAPI.app.oauthToken.access_token).setCallback(pickerCallback).build();
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
      var delimiter = '\r\n--' + boundary + '\r\n';
      var close_delim = '\r\n--' + boundary + '--';
      var date = moment();
      var tuneBookVersion = date.format('YYYY-MM-DDTHH:mm');
      var fileNameToSaveAs = 'TuneBook-' + tuneBookVersion;
      var contentType = 'text/plain';
      var metadata = {
          'title': fileNameToSaveAs,
          'mimeType': contentType,
          'parents': [{ 'id': folderId }]
        };
      //var base64Data = btoa(abc);
      var base64Data = abc;
      var multipartRequestBody = delimiter + 'Content-Type: application/json\r\n\r\n' + JSON.stringify(metadata) + delimiter + 'Content-Type: ' + contentType + '\r\n' + '\r\n' + base64Data + close_delim;
      var request = gapi.client.request({
          'path': '/upload/drive/v2/files',
          'method': 'POST',
          'params': { 'uploadType': 'multipart' },
          'headers': { 'Content-Type': 'multipart/mixed; boundary="' + boundary + '"' },
          'body': multipartRequestBody
        });
      if (!callback) {
        callback = function (file) {
          console.log(file);
          alert('\'' + file.title + '\' exported to Google Drive');
        };
      }
      request.execute(callback);
    }
    function saveTuneBookAsFile(exportedTuneBookAsText, startDownload) {
      //var exportedTuneBookAsBlob = new Blob([exportedTuneBookAsText], {type:'text/plain'});
      //var exportedTuneBookAsBlob = new Blob([exportedTuneBookAsText], {type:'text/plain;charset=ISO-8859-1'});
      //var exportedTuneBookAsBlob = new Blob([exportedTuneBookAsText], {encoding:"UTF-8", type:'text/plain;charset=UTF-8'});
      //var exportedTuneBookAsBlob = new Blob([exportedTuneBookAsText], {encoding:"ISO-8859-1", type:'text/plain;charset=ISO-8859-1'});
      var BOM = '\ufeff';
      var data = BOM + exportedTuneBookAsText;
      var exportedTuneBookAsBlob = new Blob([data], { type: 'text/plain;charset=UTF-8' });
      var fileNameToSaveAs = 'My TuneBook';
      var downloadLink = document.getElementById('saveTuneBookToFile');
      downloadLink.href = createObjectURL(exportedTuneBookAsBlob);
      downloadLink.download = fileNameToSaveAs;
      if (startDownload) {
        downloadLink.click();
      }
    }
    function createObjectURL(file) {
      if (window.webkitURL) {
        // Chrome
        return window.webkitURL.createObjectURL(file);
      } else if (window.URL && window.URL.createObjectURL) {
        // Firefox
        return window.URL.createObjectURL(file);
      } else {
        return null;
      }
    }
    $scope.toggleFingeringAbc = function () {
      $scope.abcOption.fingering = !$scope.abcOption.fingering;
      exportTuneBook(false);
    };
    $scope.toggleTuneSetAbc = function () {
      $scope.abcOption.tuneSet = !$scope.abcOption.tuneSet;
      exportTuneBook(false);
    };
    $scope.togglePlaylistAbc = function () {
      $scope.abcOption.playlist = !$scope.abcOption.playlist;
      exportTuneBook(false);
    };
    $scope.togglePlayDateAbc = function () {
      $scope.abcOption.playDate = !$scope.abcOption.playDate;
      exportTuneBook(false);
    };
    $scope.toggleSkillAbc = function () {
      $scope.abcOption.skill = !$scope.abcOption.skill;
      exportTuneBook(false);
    };
    $scope.toggleColorAbc = function () {
      $scope.abcOption.color = !$scope.abcOption.color;
      exportTuneBook(false);
    };
    $scope.toggleAnnotationAbc = function () {
      $scope.abcOption.annotation = !$scope.abcOption.annotation;
      exportTuneBook(false);
    };
    $scope.toggleSiteAbc = function () {
      $scope.abcOption.website = !$scope.abcOption.website;
      exportTuneBook(false);
    };
    $scope.toggleTubeAbc = function () {
      $scope.abcOption.video = !$scope.abcOption.video;
      exportTuneBook(false);
    };
  }
]);
'use strict';
/**
 * Controller for book Template
 */
angular.module('eTuneBookApp').controller('bookCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function bookCtrl($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
    // Get current tuneBook
    $scope.tuneBook = eTuneBookService.getCurrentTuneBook();
    $scope.edit = function () {
      $state.transitionTo('bookedit', $stateParams);
    };
  }
]);
'use strict';
/**
 * Controller for bookedit Template
 */
angular.module('eTuneBookApp').controller('bookeditCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function bookeditCtrl($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
    //Current TuneBook
    $scope.tuneBook = eTuneBookService.getCurrentTuneBook();
    //Editable Fields (detached copies)
    $scope.tuneBookName = angular.copy($scope.tuneBook.name);
    $scope.tuneBookVersion = angular.copy($scope.tuneBook.version);
    $scope.tuneBookDescription = angular.copy($scope.tuneBook.description);
    $scope.save = function () {
      //Update Fields -> tuneBook in eTuneBookService gets updated as well (copy by reference)
      $scope.tuneBook.name = angular.copy($scope.tuneBookName);
      $scope.tuneBook.version = angular.copy($scope.tuneBookVersion);
      $scope.tuneBook.description = angular.copy($scope.tuneBookDescription);
      //Generate TuneBook-Abc and save it to localStorage
      eTuneBookService.storeTuneBookAbc();
      $state.transitionTo('book', $stateParams);
    };
    $scope.cancel = function () {
      $state.transitionTo('book', $stateParams);
    };
  }
]);
'use strict';
/**
 * Controller for filter template
 */
angular.module('eTuneBookApp').controller('filterCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function ($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
    // Get current tuneBook
    $scope.tuneBook = eTuneBookService.getCurrentTuneBook();
    setFilterOptions();
    // Set which Type to Filter
    var type = $stateParams['type'];
    if (type == '' || type == null) {
      type = 'All Types';
    }
    setSelectedTuneSetTypeFilter(type);
    // Set which Key to Filter
    var key = $stateParams['key'];
    if (key == '' || key == null) {
      key = 'All Keys';
    }
    setSelectedTuneSetKeyFilter(key);
    // Set which Color to Filter
    var color = $stateParams['color'];
    if (color == '' || color == null) {
      color = 'All Colors';
    }
    setSelectedTuneSetColorFilter(color);
    // Set which Skill to Filter
    var skill = $stateParams['skill'];
    if (skill == '' || skill == null) {
      skill = 'All Skills';
    }
    setSelectedTuneSetSkillFilter(skill);
    // Set which Event to Filter
    var event = $stateParams['evt'];
    if (event == '' || event == null) {
      event = 'All Events';
    }
    setSelectedTuneSetEventFilter(event);
    // Set which Band to Filter
    var band = $stateParams['band'];
    if (band == '' || band == null) {
      band = 'All Bands';
    }
    setSelectedTuneSetBandFilter(band);
    // Set which Play Range to Filter
    // Default: Launch Date of eTuneBook till now
    $scope.tuneSetPlayRangeFilter = {
      startDate: moment('05.10.2012', 'DD.MM.YYYY'),
      endDate: moment()
    };
    var playMin = $stateParams['plmin'];
    if (playMin != null && playMin != '') {
      $scope.tuneSetPlayRangeFilter.startDate = moment(playMin, 'DD.MM.YYYY');
    }
    var playMax = $stateParams['plmax'];
    if (playMax != null && playMax != '') {
      $scope.tuneSetPlayRangeFilter.endDate = moment(playMax, 'DD.MM.YYYY');
    }
    // Set which Update Range to Filter
    // Default: Launch Date of eTuneBook till now
    $scope.tuneSetUpdateRangeFilter = {
      startDate: moment('05.10.2012', 'DD.MM.YYYY'),
      endDate: moment()
    };
    var updateMin = $stateParams['updmin'];
    if (updateMin != null && updateMin != '') {
      $scope.tuneSetUpdateRangeFilter.startDate = moment(updateMin, 'DD.MM.YYYY');
    }
    var updateMax = $stateParams['plmax'];
    if (updateMax != null && updateMax != '') {
      $scope.tuneSetUpdateRangeFilter.endDate = moment(updateMax, 'DD.MM.YYYY');
    }
    $scope.ranges = {
      'Today': [
        moment().startOf('day'),
        moment().add('days', 1)
      ],
      'Yesterday': [
        moment().subtract('days', 1),
        moment().subtract('days', 1)
      ],
      'Last 7 Days': [
        moment().subtract('days', 7),
        moment()
      ],
      'Last 30 Days': [
        moment().subtract('days', 30),
        moment()
      ],
      'This Month': [
        moment().startOf('month'),
        moment()
      ],
      'Last Month': [
        moment().subtract('month', 1).startOf('month'),
        moment().subtract('month', 1).endOf('month')
      ],
      'Maximum Range': [
        moment('05.10.2012', 'DD.MM.YYYY'),
        moment()
      ]
    };
    // Set which Frequency Range to Filter
    var freqComp = $stateParams['freqcomp'];
    if (freqComp == null) {
      freqComp = '';
    }
    var freq = $stateParams['freq'];
    if (freq == null) {
      freq = '';
    }
    $scope.freqencyComparator = freqComp;
    $scope.tuneSetFrequencyForFilter = freq;
    setCurrentFilter();
    $scope.editSetFilter = function () {
      angular.element('#SetFilter').modal('show');
    };
    function setCurrentFilter() {
      $scope.currentFilter = '';
      $scope.filterActive = false;
      if ($scope.tuneSetTypeForFilter.type != '' && $scope.tuneSetTypeForFilter.type != 'All Types') {
        $scope.currentFilter = $scope.currentFilter + $scope.tuneSetTypeForFilter.type;
      }
      if ($scope.tuneSetKeyForFilter.key != '' && $scope.tuneSetKeyForFilter.key != 'All Keys') {
        if ($scope.currentFilter != '') {
          $scope.currentFilter = $scope.currentFilter + ', ';
        }
        $scope.currentFilter = $scope.currentFilter + $scope.tuneSetKeyForFilter.key;
      }
      if ($scope.tuneSetEventForFilter.event != '' && $scope.tuneSetEventForFilter.event != 'All Events') {
        if ($scope.currentFilter != '') {
          $scope.currentFilter = $scope.currentFilter + ', ';
        }
        $scope.currentFilter = $scope.currentFilter + $scope.tuneSetEventForFilter.event;
      }
      if ($scope.tuneSetBandForFilter.band != '' && $scope.tuneSetBandForFilter.band != 'All Bands') {
        if ($scope.currentFilter != '') {
          $scope.currentFilter = $scope.currentFilter + ', ';
        }
        $scope.currentFilter = $scope.currentFilter + $scope.tuneSetBandForFilter.band;
      }
      if (playMin != null && playMin != '') {
        if ($scope.currentFilter != '') {
          $scope.currentFilter = $scope.currentFilter + ', ';
        }
        $scope.currentFilter = $scope.currentFilter + 'played ';
        if (playMax != null && playMax != '') {
        } else {
          $scope.currentFilter = $scope.currentFilter + 'from ';
        }
        $scope.currentFilter = $scope.currentFilter + playMin;
      }
      if (playMax != null && playMax != '') {
        if (playMin != null && playMin != '') {
          $scope.currentFilter = $scope.currentFilter + '-';
        } else if ($scope.currentFilter != '') {
          $scope.currentFilter = $scope.currentFilter + ',played to ';
        }
        $scope.currentFilter = $scope.currentFilter + playMax;
      }
      if ($scope.currentFilter != '') {
        $scope.filterActive = true;
      }
    }
    function setSelectedTuneSetTypeFilter(type) {
      for (var i = 0; i < $scope.tuneSetTypesForFilter.length; i++) {
        if ($scope.tuneSetTypesForFilter[i].type == type) {
          // Setzen neuer Filter
          $scope.tuneSetTypeForFilter = $scope.tuneSetTypesForFilter[i];
        }
      }
    }
    function setSelectedTuneSetKeyFilter(key) {
      for (var i = 0; i < $scope.tuneSetKeysForFilter.length; i++) {
        if ($scope.tuneSetKeysForFilter[i].key == key) {
          // Setzen neuer Filter
          $scope.tuneSetKeyForFilter = $scope.tuneSetKeysForFilter[i];
        }
      }
    }
    function setSelectedTuneSetEventFilter(event) {
      for (var i = 0; i < $scope.tuneSetEventsForFilter.length; i++) {
        if ($scope.tuneSetEventsForFilter[i].event == event) {
          // Setzen neuer Filter
          $scope.tuneSetEventForFilter = $scope.tuneSetEventsForFilter[i];
        }
      }
    }
    function setSelectedTuneSetBandFilter(band) {
      for (var i = 0; i < $scope.tuneSetBandsForFilter.length; i++) {
        if ($scope.tuneSetBandsForFilter[i].band == band) {
          // Setzen neuer Filter
          $scope.tuneSetBandForFilter = $scope.tuneSetBandsForFilter[i];
        }
      }
    }
    function setSelectedTuneSetColorFilter(color) {
      for (var i = 0; i < $scope.tuneSetColorsForFilter.length; i++) {
        if ($scope.tuneSetColorsForFilter[i].color == color) {
          // Setzen neuer Filter
          $scope.tuneSetColorForFilter = $scope.tuneSetColorsForFilter[i];
        }
      }
    }
    function setSelectedTuneSetSkillFilter(skill) {
      for (var i = 0; i < $scope.skillTypes.length; i++) {
        if ($scope.skillTypes[i].description == skill) {
          // Setzen neuer Filter
          $scope.skillType = $scope.skillTypes[i];
        }
      }
    }
    function setTuneSetTypesForFilter() {
      //Extract TuneSetTypes for TypeFilter
      var tuneSetTypeForFilter = {};
      var tuneSetTypesForFilter = [];
      var addToTypeFilter = true;
      if ($scope.hasOwnProperty('tuneBook')) {
        for (var i = 0; i < $scope.tuneBook.tuneSets.length; i++) {
          for (var c = 0; c < $scope.tuneBook.tuneSets[i].tuneSetPositions.length; c++) {
            addToTypeFilter = true;
            for (var z = 0; z < tuneSetTypesForFilter.length; z++) {
              if (tuneSetTypesForFilter[z].type == $scope.tuneBook.tuneSets[i].tuneSetPositions[c].tune.type) {
                addToTypeFilter = false;
              }
            }
            if (addToTypeFilter) {
              tuneSetTypeForFilter = {};
              tuneSetTypeForFilter.type = $scope.tuneBook.tuneSets[i].tuneSetPositions[c].tune.type;
              tuneSetTypesForFilter.push(tuneSetTypeForFilter);
            }
          }
        }
      }
      tuneSetTypeForFilter = {};
      tuneSetTypeForFilter.type = 'All Types';
      tuneSetTypesForFilter.unshift(tuneSetTypeForFilter);
      $scope.tuneSetTypesForFilter = tuneSetTypesForFilter;
    }
    function setTuneSetKeysForFilter() {
      //Extract TuneSetKeys for KeyFilter
      var tuneSetKeyForFilter = {};
      var tuneSetKeysForFilter = [];
      var addToKeyFilter = true;
      if ($scope.hasOwnProperty('tuneBook')) {
        for (var i = 0; i < $scope.tuneBook.tuneSets.length; i++) {
          for (var c = 0; c < $scope.tuneBook.tuneSets[i].tuneSetPositions.length; c++) {
            addToKeyFilter = true;
            for (var z = 0; z < tuneSetKeysForFilter.length; z++) {
              if (tuneSetKeysForFilter[z].key == $scope.tuneBook.tuneSets[i].tuneSetPositions[c].tune.key) {
                addToKeyFilter = false;
              }
            }
            if (addToKeyFilter) {
              tuneSetKeyForFilter = {};
              tuneSetKeyForFilter.key = $scope.tuneBook.tuneSets[i].tuneSetPositions[c].tune.key;
              tuneSetKeyForFilter.sort = tuneSetKeyForFilter.key;
              tuneSetKeysForFilter.push(tuneSetKeyForFilter);
            }
          }
        }
      }
      tuneSetKeyForFilter = {};
      tuneSetKeyForFilter.key = 'All Keys';
      tuneSetKeyForFilter.sort = '';
      // Sort, damit zum Beispiel "Ador" nicht vor "All Keys" kommt
      tuneSetKeysForFilter.unshift(tuneSetKeyForFilter);
      $scope.tuneSetKeysForFilter = tuneSetKeysForFilter;
    }
    function setTuneSetEventsForFilter() {
      //Extract TuneSetEvents for EventFilter
      var tuneSetEventForFilter = {};
      var tuneSetEventsForFilter = [];
      var addToEventFilter = true;
      var selectedTuneSetEventForFilter = new Array();
      if ($scope.hasOwnProperty('tuneBook')) {
        for (var i = 0; i < $scope.tuneBook.playlists.length; i++) {
          addToEventFilter = true;
          for (var z = 0; z < tuneSetEventsForFilter.length; z++) {
            if (tuneSetEventsForFilter[z].event == $scope.tuneBook.playlists[i].event) {
              addToEventFilter = false;
            }
          }
          if ($scope.tuneBook.playlists[i].event != 'undefined' && $scope.tuneBook.playlists[i].event != '' && addToEventFilter) {
            tuneSetEventForFilter = {};
            tuneSetEventForFilter.event = $scope.tuneBook.playlists[i].event;
            tuneSetEventsForFilter.push(tuneSetEventForFilter);
          }
        }
      }
      tuneSetEventForFilter = {};
      tuneSetEventForFilter.event = 'All Events';
      tuneSetEventsForFilter.unshift(tuneSetEventForFilter);
      $scope.tuneSetEventsForFilter = tuneSetEventsForFilter;
    }
    function setTuneSetBandsForFilter() {
      //Extract TuneSetBands for BandFilter
      var tuneSetBandForFilter = {};
      var tuneSetBandsForFilter = [];
      var addToBandFilter = true;
      if ($scope.hasOwnProperty('tuneBook')) {
        for (var i = 0; i < $scope.tuneBook.playlists.length; i++) {
          addToBandFilter = true;
          for (var z = 0; z < tuneSetBandsForFilter.length; z++) {
            if (tuneSetBandsForFilter[z].band == $scope.tuneBook.playlists[i].band) {
              addToBandFilter = false;
            }
          }
          if ($scope.tuneBook.playlists[i].band != 'undefined' && $scope.tuneBook.playlists[i].band != '' && addToBandFilter) {
            tuneSetBandForFilter = {};
            tuneSetBandForFilter.band = $scope.tuneBook.playlists[i].band;
            tuneSetBandsForFilter.push(tuneSetBandForFilter);
          }
        }
      }
      tuneSetBandForFilter = {};
      tuneSetBandForFilter.band = 'All Bands';
      tuneSetBandsForFilter.unshift(tuneSetBandForFilter);
      $scope.tuneSetBandsForFilter = tuneSetBandsForFilter;
    }
    function setTuneSetColorsForFilter() {
      //Extract TuneSetColors for ColorFilter
      var tuneSetColorForFilter = {};
      var tuneSetColorsForFilter = [];
      var addToColorFilter = true;
      if ($scope.hasOwnProperty('tuneBook')) {
        for (var i = 0; i < $scope.tuneBook.tuneSets.length; i++) {
          for (var c = 0; c < $scope.tuneBook.tuneSets[i].tuneSetPositions.length; c++) {
            addToColorFilter = true;
            for (var z = 0; z < tuneSetColorsForFilter.length; z++) {
              if (tuneSetColorsForFilter[z].color == $scope.tuneBook.tuneSets[i].tuneSetPositions[c].tune.color) {
                addToColorFilter = false;
              }
            }
            if (addToColorFilter) {
              tuneSetColorForFilter = {};
              tuneSetColorForFilter.color = $scope.tuneBook.tuneSets[i].tuneSetPositions[c].tune.color;
              tuneSetColorForFilter.text = '     ';
              tuneSetColorsForFilter.push(tuneSetColorForFilter);
            }
          }
        }
      }
      tuneSetColorForFilter = {};
      tuneSetColorForFilter.color = 'All Colors';
      tuneSetColorForFilter.text = '     ';
      tuneSetColorsForFilter.unshift(tuneSetColorForFilter);
      $scope.tuneSetColorsForFilter = tuneSetColorsForFilter;
    }
    function setFilterOptions() {
      setTuneSetTypesForFilter();
      setTuneSetKeysForFilter();
      setTuneSetColorsForFilter();
      setSkillTypes();
      setTuneSetEventsForFilter();
      setTuneSetBandsForFilter();
    }
    function setSkillTypes() {
      var skillTypes = eTuneBookService.getSkillTypes();
      var skillType = {};
      skillType.skill = '';
      skillType.description = 'All Skills';
      skillTypes.unshift(skillType);
      $scope.skillTypes = skillTypes;
    }
    $scope.applySetFilter = function () {
      angular.element('#SetFilter').modal('hide');
      /*
        $scope.currentFilter = "";
        if($scope.tuneSetTypeForFilter.type != ""){
            $scope.currentFilter = $scope.currentFilter + $scope.tuneSetTypeForFilter.type;
        }
        if($scope.tuneSetKeyForFilter.key != ""){
            if($scope.currentFilter != ""){
                $scope.currentFilter = $scope.currentFilter + ", ";
            }
            $scope.currentFilter = $scope.currentFilter + $scope.tuneSetKeyForFilter.key;
        }
        */
      $timeout(function () {
        var key, type, color, skill, event, band, playmin, playmax, freqcomp, freq, updatemin, updatemax;
        type = $scope.tuneSetTypeForFilter.type;
        key = $scope.tuneSetKeyForFilter.key;
        color = $scope.tuneSetColorForFilter.color;
        skill = $scope.skillType.description;
        event = $scope.tuneSetEventForFilter.event;
        band = $scope.tuneSetBandForFilter.band;
        playmin = $scope.tuneSetPlayRangeFilter.startDate.format('DD.MM.YYYY');
        playmax = $scope.tuneSetPlayRangeFilter.endDate.format('DD.MM.YYYY');
        updatemin = $scope.tuneSetUpdateRangeFilter.startDate.format('DD.MM.YYYY');
        updatemax = $scope.tuneSetUpdateRangeFilter.endDate.format('DD.MM.YYYY');
        freqcomp = $scope.freqencyComparator;
        freq = $scope.tuneSetFrequencyForFilter;
        if ($scope.tuneSetTypeForFilter.type == 'All Types') {
          type = '';
        }
        if ($scope.tuneSetKeyForFilter.key == 'All Keys') {
          key = '';
        }
        if ($scope.tuneSetColorForFilter.color == 'All Colors') {
          color = '';
        }
        if ($scope.skillType.description == 'All Skills') {
          skill = '';
        }
        if ($scope.tuneSetEventForFilter.event == 'All Events') {
          event = '';
        }
        if ($scope.tuneSetBandForFilter.band == 'All Bands') {
          band = '';
        }
        if (playmin == '05.10.2012') {
          playmin = '';
          playmax = '';
        }
        if (updatemin == '05.10.2012') {
          updatemin = '';
          updatemax = '';
        }
        $state.transitionTo($state.current.name, {
          key: key,
          type: type,
          color: color,
          skill: skill,
          evt: event,
          band: band,
          plmin: playmin,
          plmax: playmax,
          freqcomp: freqcomp,
          freq: freq,
          updmin: updatemin,
          updmax: updatemax
        });
      }, 1000);
    };
  }
]);
'use strict';
/**
 * Controller for info Templates
 */
angular.module('eTuneBookApp').controller('infoCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  'eTuneBookService',
  function infoCtrl($scope, $location, $timeout, $rootScope, $state, eTuneBookService) {
  }
]);
'use strict';
/**
 * Main controller for eTuneBookApp. 
 */
angular.module('eTuneBookApp').controller('mainCtrl', [
  '$scope',
  '$window',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  'GAPI',
  'Drive',
  function ($scope, $window, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService, GAPI, Drive) {
    // Test for first-time navigation to the welcome-page
    //localStorage.clear();
    $scope.exampleFileNameWithoutAbc = eTBk.EXAMPLE_FILENAME_WITHOUTABC;
    $scope.exampleVersion = eTBk.EXAMPLE_VERSION;
    // Init available colors
    $.fn.colorPicker.defaults.colors = [
      'F5F5F5',
      'CCFFCC',
      'EFEBD6',
      'FFFF99',
      'C7DAD4',
      'BFE4FF',
      'D8CFE6',
      'FFE6E6',
      'EEE6FF',
      'E6FFE6',
      'FFCCBF',
      'FFFFFF',
      'CCCCFF',
      'FFFFCC',
      'FF9980'
    ];
    // Get tuneBook from localStorage
    $scope.tuneBook = eTuneBookService.getTuneBookFromLocalStorage();
    if ($scope.tuneBook != null && $scope.tuneBook.hasOwnProperty('tuneSets')) {
    } else {
      // Init TuneBook
      $scope.tuneBook = eTuneBookService.initializeTuneBook();
      $state.transitionTo('info.introduction');
    }
    $window.mobilecheck = function () {
      var check = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
          check = true;
      }(navigator.userAgent || navigator.vendor || window.opera));
      return check;
    };
    $scope.loadBxplTuneBook = function () {
      $timeout(function () {
        try {
          $scope.tuneBook = eTuneBookService.getDefaultFromServer();
        } catch (e) {
          alert('eTuneBook cannot import ' + eTBk.EXAMPLE_FILENAME + ' due to: ' + e.toString());
        } finally {
          eTuneBookService.storeTuneBookAbc();
          // TODO: Check for ui-router fix
          // ui-router does not refresh state, if no parameter has changed
          //(see https://github.com/angular-ui/ui-router/issues/122)
          // Umgehungsloesung: Alternativ tunelist oder setlist als Start-Page
          if ($state.is('tunelist')) {
            $state.transitionTo('setlist');
          } else {
            $state.transitionTo('tunelist');
          }
        }
      }, 0);
    };
    $scope.initializeTuneBook = function () {
      $scope.tuneBook = eTuneBookService.initializeTuneBook();
      eTuneBookService.storeTuneBookAbc();
      $state.transitionTo('tuneabc', { intTuneId: $scope.tuneBook.tuneSets[0].tuneSetPositions[0].tune.intTuneId });
    };
    $scope.editTuneBook = function () {
      $state.transitionTo('book');
    };
    $scope.showPlaylists = function () {
      initActiveMenu();
      $scope.playlistsMenuActive = true;
      $state.transitionTo('playlistlist');
    };
    $scope.showSets = function () {
      initActiveMenu();
      $scope.setsMenuActive = true;
      $state.transitionTo('setlist');
    };
    $scope.showTunes = function () {
      initActiveMenu();
      $scope.tunesMenuActive = true;
      $state.transitionTo('tunelist');
    };
    $scope.showInfo = function () {
      initActiveMenu();
      $scope.infoMenuActive = true;
      $state.transitionTo('info.introduction');
    };
    function initActiveMenu() {
      $scope.bookMenuActive = false;
      $scope.playlistsMenuActive = false;
      $scope.setsMenuActive = false;
      $scope.tunesMenuActive = false;
      $scope.infoMenuActive = false;
    }
    $scope.putTuneBookToLocalStorage = function () {
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.importTuneBook = function (abc, fileName) {
      $timeout(function () {
        try {
          $scope.tuneBook = eTuneBookService.getTuneBookFromImportedFile(abc, fileName);
        } catch (e) {
          alert('eTuneBook cannot import ' + fileName + ' due to: ' + e.toString());
        } finally {
          eTuneBookService.storeTuneBookAbc();
          // ui-router does not refresh state, if no parameter has changed
          //(see https://github.com/angular-ui/ui-router/issues/122)
          // Umgehungsloesung: Alternativ tunelist oder setlist als Start-Page
          if ($state.is('tunelist')) {
            $state.transitionTo('setlist');
          } else {
            $state.transitionTo('tunelist');
          }
        }
      }, 0);
    };
    // Import TuneBook from Google Drive
    $scope.selectFileOnGoogleDrive = function () {
      // User needs to login and to authorize eTuneBook so that eTuneBook is able to access his Google Drive
      var promise = GAPI.init();
      promise.then(function (result) {
        //success
        //Load Google Drive File Picker
        loadPicker();
      }, function (error) {
        //error
        alert('Failed: ' + error);
      });
    };
    // Use the API Loader script to load google.picker.
    function loadPicker() {
      gapi.load('picker', { 'callback': createPicker });
    }
    // Create and render a Picker object for searching documents
    function createPicker() {
      var docsView = new google.picker.DocsView(google.picker.ViewId.DOCUMENTS).setIncludeFolders(true);
      var picker = new google.picker.PickerBuilder().addView(docsView).setAppId(GAPI.app.apiKey).setOAuthToken(GAPI.app.oauthToken.access_token).setCallback(pickerCallback).build();
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
        promise.then(function (file) {
          //success
          //File-Download und Übernahme in eTuneBook
          importTuneBookFromGoogleDrive(file);
        }, function (error) {
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
        xhr.onload = function () {
          eTuneBookService.getTuneBookFromImportedFile(xhr.responseText, file.title);
          eTuneBookService.storeTuneBookAbc();
          // TODO: Check for ui-router fix
          // ui-router does not refresh state, if no parameter has changed
          //(see https://github.com/angular-ui/ui-router/issues/122)
          // Umgehungsloesung: Alternativ tunelist oder setlist als Start-Page
          if ($state.is('tunelist')) {
            $state.transitionTo('setlist');
          } else {
            $state.transitionTo('tunelist');
          }
        };
        xhr.onerror = function () {
          alert('Fehler beim Download des TuneBooks');  //callback(null);
        };
        xhr.send();
      } else {
        alert('Fehler beim Laden des TuneBooks (kein Download-Link)');  //callback(null);
      }
    }
    ;
    $scope.exportTuneBook = function (startDownload) {
      $state.transitionTo('abc');
    };
    $scope.$watch(function () {
      return $location.path();
    }, function () {
      var path = $location.path();
      var pathSplits = path.split('/');
      var beginOfPath = pathSplits[1].substring(0, 4);
      //$scope.pathSplits = pathSplits;
      initActiveMenu();
      if (beginOfPath == 'sets') {
        if (pathSplits.length == 2) {
          $scope.setsMenuActive = true;
        }
      } else if (beginOfPath == 'tune') {
        if (pathSplits.length == 2) {
          $scope.tunesMenuActive = true;
        }
      } else if (beginOfPath == 'book') {
        $scope.bookMenuActive = true;
      } else if (beginOfPath == 'play') {
        if (pathSplits.length == 2) {
          $scope.playlistsMenuActive = true;
        }
      } else if (beginOfPath == 'abc') {
        $scope.bookMenuActive = true;
      } else if (beginOfPath == 'info') {
        $scope.infoMenuActive = true;
      }
    });
    $rootScope.$on('$stateChangeSuccess', function (event, to, toParams, from, fromParams) {
      $rootScope.$previousState = from;
      $rootScope.$previousStateParams = fromParams;
    });
  }
]);
'use strict';
/**
 * Controller for playlist Template
 */
angular.module('eTuneBookApp').controller('playlistCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  '$window',
  '$document',
  function ($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService, $window, $document) {
    var filterOptions;
    filterOptions = {};
    filterOptions.position = $stateParams['pos'];
    filterOptions.intTuneId = $stateParams['tune'];
    // Get current playlist
    $scope.playlistId = $stateParams['playlistId'];
    $scope.playlist = eTuneBookService.getPlaylist($scope.playlistId);
    $scope.playlistPositionsByIntTuneId = [];
    $scope.currentFilter = '';
    if (filterOptions.intTuneId != null && filterOptions.intTuneId != '') {
      $scope.playlistPositionsByIntTuneId = eTuneBookService.getPlaylistPositionsByIntTuneId($scope.playlistId, filterOptions.intTuneId);
      $scope.tune = eTuneBookService.getTune(filterOptions.intTuneId);
      $scope.currentFilter = 'Filter: ' + $scope.tune.title;
    }
    $scope.tuneBook = eTuneBookService.getCurrentTuneBook();
    eTuneBookService.initializeTuneSetPositionPlayInfosForPlaylist($scope.playlistId);
    $scope.playPosition = 0;
    $scope.collapseActive = false;
    $scope.playActive = false;
    $scope.hide = function (playlistPosition) {
      var hide = false;
      if ($scope.playlistPositionsByIntTuneId.length > 0) {
        hide = true;
        for (var y = 0; y < $scope.playlistPositionsByIntTuneId.length; y++) {
          if ($scope.playlistPositionsByIntTuneId[y] == playlistPosition) {
            hide = false;
          }
        }
      }
      return hide;
    };
    $scope.collapse = function () {
      //Toggle
      if ($scope.collapseActive) {
        $scope.collapseActive = false;
      } else {
        $scope.collapseActive = true;
      }
      if ($scope.playActive) {
        $timeout(function () {
          scrollTo($scope.playPosition);
        }, 100);
      } else {
        scrollTo(1);
      }
    };
    $scope.play = function () {
      //Toggle
      if ($scope.playActive) {
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
    $scope.forward = function () {
      if (!$scope.playActive) {
        $scope.playActive = true;
        $scope.playPosition = $scope.playlist.playlistPositions.length;
      } else if ($scope.playPosition < $scope.playlist.playlistPositions.length) {
        $scope.playPosition = $scope.playPosition + 1;
      } else if ($scope.playPosition == $scope.playlist.playlistPositions.length) {
        $scope.playPosition = 1;
      }
      scrollTo($scope.playPosition);
    };
    $scope.backward = function () {
      if (!$scope.playActive) {
        $scope.playActive = true;
        $scope.playPosition = 1;
      } else if ($scope.playPosition > 1) {
        $scope.playPosition = $scope.playPosition - 1;
      } else if ($scope.playPosition == 1) {
        $scope.playPosition = $scope.playlist.playlistPositions.length;
      } else if ($scope.playPosition == 0) {
        $scope.playPosition = 1;
      }
      scrollTo($scope.playPosition);
    };
    $scope.getPlayColor = function (position) {
      var color = '#F5F5F5';
      if ($scope.playActive && position == $scope.playPosition) {
        color = '#FFFFFF';
      }
      return color;
    };
    function scrollTo(position) {
      var elem = angular.element(document.getElementById(position));
      $document.scrollTo(elem, 65, 1000);
    }
    $scope.moveUp = function (playlistPosition) {
      $scope.playlist = eTuneBookService.moveUpPlaylistPosition($scope.playlistId, playlistPosition.position);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.moveDown = function (playlistPosition) {
      $scope.playlist = eTuneBookService.moveDownPlaylistPosition($scope.playlistId, playlistPosition.position);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.removeFilter = function () {
      $state.transitionTo('playlist', { playlistId: $scope.playlistId });
    };
    $scope.showSet = function (playlistPosition) {
      $state.transitionTo('set', { tuneSetId: playlistPosition.tuneSet.tuneSetId });
    };
    $scope.showTune = function (intTuneId) {
      $state.transitionTo('tune', { intTuneId: intTuneId });
    };
    $scope.sortTuneSetPositionAsNumber = function (tuneSetPosition) {
      if (isNaN(tuneSetPosition.position)) {
        return tuneSetPosition.position;
      }
      return parseInt(tuneSetPosition.position);
    };
    $scope.sortPlaylistPositionAsNumber = function (playlistPosition) {
      if (isNaN(playlistPosition.position)) {
        return playlistPosition.position;
      }
      return parseInt(playlistPosition.position);
    };
    $scope.editPlaylistPosition = function (playlistPosition) {
      $scope.playlistPositionToBeEdited = playlistPosition;
      //Set current TuneSet for Selection
      $scope.tuneSet = playlistPosition.tuneSet;
      angular.element('#PlaylistPositionEditor').modal('show');
    };
    $scope.copyPlaylistPosition = function (playlistPosition) {
      $scope.playlistPositionToBeCopied = playlistPosition;
      $scope.targetPlaylists = eTuneBookService.getPlaylists();
      angular.element('#PlaylistPositionCopier').modal('show');
    };
    $scope.editPlaylistTuneSetPosition = function (playlistPosition, tuneSetPosition) {
      $scope.playlistTuneSetPositionToBeEdited = tuneSetPosition;
      $scope.partPlayInfo = eTuneBookService.initializePartPlayInfo();
      angular.element('#PlaylistTuneSetPositionEditor').modal('show');
    };
    $scope.doneEditingPlaylistPosition = function (playlistPosition) {
      if (playlistPosition.name == '') {
        playlistPosition.name = playlistPosition.tuneSet.tuneSetName;  //Uebertragen an $scope nicht nötig, da playlistPosition eine Kopie von der $scope-Variable ist
                                                                       /*
            for (var z = 0; z < $scope.playlist.playlistPositions.length; z++) {
                if(parseInt($scope.playlist.playlistPositions[z].position) == playlistPosition.position){
                    $scope.playlist.playlistPositions[z].name = playlistPosition.tuneSet.tuneSetName;
                }
            }
            */
      }
      eTuneBookService.storeTuneBookAbc();
      angular.element('#PlaylistPositionEditor').modal('hide');
    };
    $scope.doneCopyingPlaylistPosition = function (playlistPositionToBeCopied, targetPlaylist) {
      eTuneBookService.copyPlaylistPositionToOtherPlaylist(playlistPositionToBeCopied.playlistId, playlistPositionToBeCopied.position, targetPlaylist.id);
      eTuneBookService.storeTuneBookAbc();
      angular.element('#PlaylistPositionCopier').modal('hide');
      $timeout(function () {
        $state.transitionTo('playlist', { playlistId: targetPlaylist.id });
      }, 1000);
    };
    $scope.doneEditingPlaylistTuneSetPosition = function (tuneSetPosition) {
      eTuneBookService.storeTuneBookAbc();
      angular.element('#PlaylistTuneSetPositionEditor').modal('hide');  //todo: problem: partPlayInfo bleibt in Modal hängen. Wird Modal für ein anderes Tune aufgerufen, dann wird partPlayInfo vom vorherigen Tune editiert.
    };
    $scope.deletePlaylistPosition = function (playlistPosition) {
      eTuneBookService.deletePlaylistPosition($scope.playlistId, playlistPosition.position);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.addPartPlayInfo = function (tuneSetPositionPlayInfo, partPlayInfo) {
      tuneSetPositionPlayInfo.addPartPlayInfo(partPlayInfo);
      eTuneBookService.storeTuneBookAbc();
      $scope.partPlayInfo = eTuneBookService.initializePartPlayInfo();
    };
    $scope.editPartPlayInfo = function (partPlayInfo) {
      $scope.partPlayInfo = partPlayInfo;
    };
    $scope.deletePartPlayInfo = function (tuneSetPositionPlayInfo, partPlayInfo) {
      tuneSetPositionPlayInfo.deletePartPlayInfo(partPlayInfo);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.moveUpPartPlayInfo = function (tuneSetPositionPlayInfo, partPlayInfo) {
      tuneSetPositionPlayInfo.moveUpPartPlayInfo(partPlayInfo);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.moveDownPartPlayInfo = function (tuneSetPositionPlayInfo, partPlayInfo) {
      tuneSetPositionPlayInfo.moveDownPartPlayInfo(partPlayInfo);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.loadDefaulAnnotation = function (tuneSetPosition) {
      tuneSetPosition.currentTuneSetPositionPlayInfo.annotation = tuneSetPosition.annotation;
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.loadDefaulRepeat = function (tuneSetPosition) {
      tuneSetPosition.currentTuneSetPositionPlayInfo.repeat = tuneSetPosition.repeat;
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.newPlaylistPosition = function () {
      $scope.playlistPositionToBeEdited = eTuneBookService.addEmptyPlaylistPosition($scope.playlistId);
      //todo: add empty play info
      angular.element('#PlaylistPositionEditor').modal('show');
    };
    $scope.justPlayedTheSet = function (tuneSet) {
      var now = new Date();
      eTuneBookService.addTuneSetPlayDate(tuneSet, now);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.justPlayedTheTune = function (tune) {
      var now = new Date();
      eTuneBookService.addTunePlayDate(tune, now);
      eTuneBookService.storeTuneBookAbc();
    };
  }
]);
'use strict';
/**
 * Controller for playlistlist Template
 */
angular.module('eTuneBookApp').controller('playlistlistCtrl', [
  '$scope',
  '$window',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function playlistlistCtrl($scope, $window, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
    var columnDefs, rowTempl, aggregateTemplate;
    $scope.playlists = eTuneBookService.getPlaylists();
    $scope.showPlaylist = function (playlist) {
      $state.transitionTo('playlist', { playlistId: playlist.id });
    };
    $scope.sortPlaylistIdAsNumber = function (playlist) {
      if (isNaN(playlist.id)) {
        return playlist.id;
      }
      return parseInt(playlist.id);
    };
    $scope.edit = function (playlist) {
      $scope.playlistToBeEdited = playlist;
      angular.element('#PlaylistEditor').modal('show');
    };
    $scope.copy = function (playlist) {
      eTuneBookService.copyPlaylist(playlist.id);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.doneEditing = function (playlist) {
      eTuneBookService.storeTuneBookAbc();
      angular.element('#PlaylistEditor').modal('hide');
    };
    $scope.delete = function (playlist) {
      eTuneBookService.deletePlaylist(playlist.id);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.newPlaylist = function () {
      $scope.playlistToBeEdited = eTuneBookService.addEmptyPlaylist();
      angular.element('#PlaylistEditor').modal('show');
    };
  }
]);
'use strict';
/**
 * Controller for playLists Template
 */
angular.module('eTuneBookApp').controller('playlistsCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function ($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
  }
]);
'use strict';
/**
 * Controller for set Template
 */
angular.module('eTuneBookApp').controller('setCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function ($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
    // Get current tuneSet
    $scope.tuneSetId = $stateParams['tuneSetId'];
    $scope.tuneSet = eTuneBookService.getTuneSet($scope.tuneSetId);
    $scope.tuneBook = eTuneBookService.getCurrentTuneBook();
    $scope.firstTuneSetPositions = eTuneBookService.getFirstTuneSetPositions();
    $scope.currentFirstTuneSetPosition = eTuneBookService.getFirstTuneSetPosition($scope.tuneSet);
    setTargetTuneSetPositionsForMoving();
    $scope.editTuneSetPosition = function (tuneSetPosition) {
      $scope.tuneSetPositionToBeEdited = tuneSetPosition;
      angular.element('#TuneSetPositionEditor').modal('show');
    };
    $scope.editTuneSet = function (tuneSet) {
      $scope.tuneSetToBeEdited = tuneSet;
      angular.element('#TuneSetEditor').modal('show');
    };
    /*
    $scope.doneTuneSetEditing = function() {
        angular.element("#TuneSetEditor").modal("hide");
        $scope.tuneSetToBeEdited = null;
        //eTuneBookService.updateFirstTuneSetPosition($scope.tuneSet);
        eTuneBookService.storeTuneBookAbc();
    };
    */
    $scope.showSampleDots = function (tuneSetPosition) {
      $timeout(function () {
        var showHere = 'sampleDotsViewerForTune' + tuneSetPosition.tune.id + 'Set' + tuneSetPosition.tuneSetId;
        var tuneAbc = eTuneBookService.getSampleAbc(tuneSetPosition.tune);
        var sampleDotsScale = 0.9;
        var sampleDotsStaffWidth = 960;
        ABCJS.renderAbc(showHere, tuneAbc, {}, {
          scale: sampleDotsScale,
          paddingtop: 0,
          paddingbottom: 0,
          staffwidth: sampleDotsStaffWidth
        }, {});
      }, 0, false);
    };
    $scope.moveTune = function (tuneSetPosition) {
      $scope.tuneSetPositionToBeMoved = tuneSetPosition;
      angular.element('#TuneSetPositionMover').modal('show');
    };
    $scope.doneMoving = function (tuneSetPosition, targetTuneSetPosition, beforeOrAfter, moveOrCopy) {
      angular.element('#TuneSetPositionMover').modal('hide');
      $scope.movedTuneSetPosition = null;
      var tuneSetDeleted = false;
      var targetTuneSetId = null;
      var targetPosition = 1;
      if (targetTuneSetPosition != null && targetTuneSetPosition != undefined) {
        targetTuneSetId = targetTuneSetPosition.tuneSetId;
        targetPosition = targetTuneSetPosition.position;
      }
      tuneSetDeleted = eTuneBookService.moveTuneSetPosition(tuneSetPosition.tuneSetId, tuneSetPosition.position, targetTuneSetId, targetPosition, beforeOrAfter, moveOrCopy);
      eTuneBookService.storeTuneBookAbc();
      if (tuneSetDeleted) {
        $timeout(function () {
          //Show Tune-Panel of Deleted Tune
          $state.transitionTo('tune', { intTuneId: tuneSetPosition.tune.intTuneId });
        }, 1000);
      }
    };
    $scope.deleteTuneSetPosition = function (tuneSetPosition) {
      var tuneSetDeleted = false;
      tuneSetDeleted = eTuneBookService.deleteTuneSetPosition(tuneSetPosition.tuneSetId, tuneSetPosition.position);
      eTuneBookService.storeTuneBookAbc();
      if (tuneSetDeleted) {
        //Show Tune-Panel of Deleted Tune
        $state.transitionTo('tune', { intTuneId: tuneSetPosition.tune.intTuneId });
      }
    };
    $scope.doneTuneSetPositionEditing = function () {
      angular.element('#TuneSetPositionEditor').modal('hide');
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.putTuneBookToLocalStorage = function () {
      //tbkStorage.putToLocalStorage($scope.tuneBook);
      eTuneBookService.storeTuneBookAbc();
    };
    function setTargetTuneSetPositionsForMoving() {
      $scope.targetTuneSetPositionsForMoving = eTuneBookService.getTuneSetPositions();
    }
    $scope.justPlayedTheSet = function (tuneSet) {
      var now = new Date();
      eTuneBookService.addTuneSetPlayDate(tuneSet, now);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.justPlayedTheTune = function (tune) {
      var now = new Date();
      eTuneBookService.addTunePlayDate(tune, now);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.showTune = function (intTuneId) {
      $state.transitionTo('tune', { intTuneId: intTuneId });
    };
    $scope.sortTuneSetPositionAsNumber = function (tuneSetPosition) {
      if (isNaN(tuneSetPosition.position)) {
        return tuneSetPosition.position;
      }
      return parseInt(tuneSetPosition.position);
    };
    $scope.loadRandomTuneSet = function (playDateFilter) {
      $scope.$parent.playDateFilter = playDateFilter;
      var tuneSetId = eTuneBookService.getRandomTuneSetId(playDateFilter);
      $state.transitionTo('set', { tuneSetId: tuneSetId });
    };
  }
]);
'use strict';
/**
 * Controller for sets Template
 */
angular.module('eTuneBookApp').controller('setlistCtrl', [
  '$scope',
  '$window',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function setlistCtrl($scope, $window, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
    var filterOptions, columnDefs, rowTempl, aggregateTemplate;
    filterOptions = {};
    filterOptions.key = $stateParams['key'];
    filterOptions.type = $stateParams['type'];
    filterOptions.color = $stateParams['color'];
    filterOptions.skill = $stateParams['skill'];
    filterOptions.event = $stateParams['evt'];
    filterOptions.band = $stateParams['band'];
    filterOptions.plmin = $stateParams['plmin'];
    filterOptions.plmax = $stateParams['plmax'];
    filterOptions.freqcomp = $stateParams['freqcomp'];
    filterOptions.freq = $stateParams['freq'];
    filterOptions.updmin = $stateParams['updmin'];
    filterOptions.updmax = $stateParams['updmax'];
    $scope.tuneSetPositions = eTuneBookService.getTuneSetPositionsFiltered(filterOptions);
    rowTempl = '<div ng-style="{ \'cursor\': row.cursor }" ' + 'ng-repeat="col in renderedColumns" ' + 'style="background-color:{{row.entity.tune.color}}" ' + 'class="ngCell {{col.cellClass}} {{col.colIndex()}}" ng-cell></div>';
    //aggregateTemplate = '<div ng-click="row.toggleExpand()" ng-style="rowStyle(row)" class="ngAggregate"> <span class="ngAggregateText"><a href="#/sets/{{row.label}}" title="Show The Set" >{{row.label CUSTOM_FILTERS}}{{aggFC(row)}}</a></span> <div class="{{row.aggClass()}}"></div> </div>';
    //ohne Collapse-Funktionalität
    //aggregateTemplate = '<div ng-style="rowStyle(row)" class="ngAggregate"> <span class="ngAggregateText"><a href="#/sets/{{row.label}}" title="Show The Set" >{{row.label CUSTOM_FILTERS}}{{aggFC(row)}}</a></span> <div class="{{row.aggClass()}}"></div> </div>';
    //mit justplayed-Button
    aggregateTemplate = '<div ng-style="rowStyle(row)" class="ngAggregate"> <span class="ngAggregateText"><a href="#/sets/{{row.label}}" title="Show The Set" >{{row.label CUSTOM_FILTERS}}{{aggFC(row)}}</a></span> <div class="{{row.aggClass()}}"></div><button type="button" ng-click="justPlayedTheSet(row.label)" class="btn btn-default col-xs-offset-8 col-sm-offset-8 col-md-offset-8 col-lg-offset-8" title="Just played"><i class="glyphicon glyphicon-ok-circle"></i></button> </div>';
    $scope.tuneSetPositionsSelected = [];
    if ($window.mobilecheck()) {
      // Small Device -> Display Less Columns
      /*
        columnDefs = [
            {field:'title',
                displayName:'Tune',
                cellFilter: 'eliminateThe',
                width:'60%',
                cellTemplate: '<a href="#/tunes/{{row.entity.intTuneId}}" title="Show The Tune" >{{row.entity.title}}</a>'

            },
            {field:'type', displayName:'Type', width:'10%'},
            {field:'lastPlayed',
                displayName:'Played',
                cellFilter: 'fromNow',
                width:'30%'
            }
        ];
        */
      columnDefs = [
        {
          field: 'tuneSetId',
          displayName: '',
          width: '0%',
          sortable: false,
          groupable: false
        },
        {
          field: 'position',
          displayName: '',
          width: '0%',
          sortable: false,
          groupable: false
        },
        {
          field: 'tune.title',
          displayName: 'Set',
          cellFilter: 'eliminateThe',
          width: '60%',
          sortable: false,
          groupable: false,
          cellTemplate: '<a href="#/tunes/{{row.entity.tune.intTuneId}}" title="Show The Tune" >{{row.entity.tune.title}}</a>'
        },
        {
          field: 'tune.lastPlayed',
          displayName: 'Played',
          cellFilter: 'fromNow',
          width: '30%',
          sortable: false,
          groupable: false
        }
      ];
    } else {
      // Desktop Device -> Display All Columns
      //alert('document: '+ $window.document.width + '/' + $window.document.height + ' window: ' + $window.screen.width + '/' + $window.screen.height );
      columnDefs = [
        {
          field: 'tuneSetId',
          displayName: '',
          width: '0%',
          sortable: false,
          groupable: false
        },
        {
          field: 'position',
          displayName: '',
          width: '0%',
          sortable: false,
          groupable: false
        },
        {
          field: 'tune.title',
          displayName: 'Set',
          cellFilter: 'eliminateThe',
          width: '40%',
          sortable: false,
          groupable: false,
          cellTemplate: '<a href="#/tunes/{{row.entity.tune.intTuneId}}" title="Show The Tune" >{{row.entity.tune.title}}</a>'
        },
        {
          field: 'tune.type',
          displayName: 'Type',
          width: '10%',
          sortable: false,
          groupable: false
        },
        {
          field: 'tune.key',
          displayName: 'Key',
          width: '8%',
          sortable: false,
          groupable: false
        },
        {
          field: 'tune.lastPlayed',
          displayName: 'Played',
          cellFilter: 'fromNow',
          width: '15%',
          sortable: false,
          groupable: false
        },
        {
          field: 'tune.frequencyPlayed',
          displayName: 'Frequency',
          width: '8%',
          sortable: false,
          groupable: false
        },
        {
          field: 'tune.lastModified',
          displayName: 'Modified',
          cellFilter: 'fromNow',
          width: '15%',
          sortable: false,
          groupable: false
        }
      ];
    }
    $scope.setList = {
      data: 'tuneSetPositions',
      selectedItems: $scope.tuneSetPositionsSelected,
      multiSelect: false,
      sortInfo: {
        fields: ['position'],
        directions: ['asc']
      },
      groups: ['tuneSetId'],
      groupsCollapsedByDefault: false,
      aggregateTemplate: aggregateTemplate,
      rowTemplate: rowTempl,
      columnDefs: columnDefs
    };
    $scope.aggFC = function (row) {
      var target, env, envDefined, name, theSplits, tuneSetInfo;
      tuneSetInfo = '';
      for (var i = 0; i < row.children.length; i++) {
        if (row.children[i].entity.position == '1') {
          target = row.children[i].entity.tuneSetTarget;
          env = row.children[i].entity.tuneSetEnv;
          name = row.children[i].entity.tuneSetName;
          if (name != null && name != 'undefined' && name != '') {
          } else {
            name = row.children[i].entity.tune.title;
          }
          //Cut away ,The at the end of the String
          theSplits = [];
          theSplits = name.split(',');
          name = theSplits[0];
          tuneSetInfo = tuneSetInfo + ' ' + name;
        }
      }
      envDefined = false;
      if (env != null && env != 'undefined' && env != '') {
        tuneSetInfo = tuneSetInfo + ' (' + env;
        envDefined = true;
      }
      if (target != null && target != 'undefined' && target != '') {
        if (!envDefined) {
          tuneSetInfo = tuneSetInfo + '(' + target;
        } else {
          tuneSetInfo = tuneSetInfo + ': ' + target;
        }
        tuneSetInfo = tuneSetInfo + ')';
      }
      return tuneSetInfo;
    };
    if ($rootScope.$previousState != undefined && $rootScope.$previousState.name == 'set') {
      //$scope.setList.ngGrid existiert erst nach call von setlistCtrl -> timeout
      $timeout(function () {
        var previousFirstSetPosition = eTuneBookService.getFirstTuneSetPositionById($rootScope.$previousStateParams.tuneSetId);
        var grid = $scope.setList.ngGrid;
        var rowIndex = grid.data.indexOf(previousFirstSetPosition);
        //TODO: rowIndex funktioniert nicht bei Gruppierung (die Gruppen-Header sind auch rows).
        grid.$viewport.scrollTop(grid.rowMap[rowIndex] * grid.config.rowHeight);  /* prevScrollTop immer 0, weil grid immer neu aufgebaut wird (setlistCtrl wird immer wieder initialisiert)
            var grid = $scope.setList.ngGrid;
            grid.$viewport.scrollTop(grid.prevScrollTop);
            */
      }, 0, false);
    }
    $scope.setList.filterOptions = {
      filterText: '',
      useExternalFilter: false
    };
    $scope.$watch('search', function (searchText) {
      if (searchText) {
        if (searchText != '') {
          // console.log(searchText);
          // 'Set:' works but is buggy, 'tune.title' does not work
          var searchQuery = 'Set:' + searchText + ';';
          $scope.setList.filterOptions.filterText = searchQuery;  //console.log(searchQuery);
        } else {
        }
      }
    });
    $scope.justPlayedTheSet = function (tuneSetId) {
      var now = new Date();
      eTuneBookService.addTuneSetPlayDate(eTuneBookService.getTuneSet(tuneSetId), now);
      eTuneBookService.storeTuneBookAbc();
    };
  }
]);
'use strict';
/**
 * Controller for sets Template
 */
angular.module('eTuneBookApp').controller('setsCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function ($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
    $scope.playDateFilter = 'All Sets';
  }
]);
'use strict';
/**
 * Controller for tune Template
 */
angular.module('eTuneBookApp').controller('tuneCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function ($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
    // Get current tune
    $scope.intTuneId = $stateParams['intTuneId'];
    $scope.tune = eTuneBookService.getTune($scope.intTuneId);
    $scope.tunes = eTuneBookService.getTunes();
    $scope.currentState = 'Dots';
    renderAbc($scope.tune);
    $scope.showTuneSets = function () {
      var sets = eTuneBookService.getTuneSetsByIntTuneId($scope.intTuneId);
      if (sets.length == 0 || sets.length > 1) {
        initActiveMenu();
        $scope.tuneSetsMenuActive = true;
        $state.transitionTo('tunesets', { intTuneId: $scope.intTuneId });
      } else {
        //Tune kommt nur in einem Set vor -> Set-View anzeigen
        $state.transitionTo('set', { tuneSetId: sets[0].tuneSetId });
      }
    };
    $scope.showPlaylists = function () {
      var playlists = eTuneBookService.getPlaylistsByIntTuneId($scope.intTuneId);
      if (playlists.length == 0 || playlists.length > 1) {
        initActiveMenu();
        $scope.playlistsMenuActive = true;
        $state.transitionTo('tuneplaylists', { intTuneId: $scope.intTuneId });
      } else {
        //Tune kommt nur in einer Playlist vor -> Playlist-View anzeigen
        $state.transitionTo('playlist', {
          playlistId: playlists[0].id,
          tune: $scope.intTuneId
        });
      }
    };
    $scope.showTuneVideos = function () {
      initActiveMenu();
      $scope.tuneVideosMenuActive = true;
      $state.transitionTo('tunevideos', { intTuneId: $scope.intTuneId });
    };
    $scope.showTuneAbc = function () {
      initActiveMenu();
      $scope.tuneAbcMenuActive = true;
      $state.transitionTo('tuneabc', { intTuneId: $scope.intTuneId });
    };
    $scope.showTunePractice = function () {
      initActiveMenu();
      $scope.tunePracticeMenuActive = true;
      $state.transitionTo('tunepractice', { intTuneId: $scope.intTuneId });
    };
    $scope.showTuneInfo = function () {
      initActiveMenu();
      $scope.tuneInfoMenuActive = true;
      $state.transitionTo('tuneinfo', { intTuneId: $scope.intTuneId });
    };
    function initActiveMenu() {
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
      $timeout(function () {
        var showHere = 'renderTheDotsFor' + $scope.intTuneId;
        var playHere = 'renderMidi';
        var tuneAbc = skipFingering(tune.pure);
        var dotsScale = 1;
        /*
             if ($scope.sessionModus) {
             dotsScale = 0.6;
             }
             */
        //ABCJS.renderAbc(showHere, tuneAbc, {print:true}, {scale:dotsScale}, {});
        ABCJS.renderAbc(showHere, tuneAbc, {}, { scale: dotsScale }, {});  //TODO: MIDI-Button, Anzeige in separatem Window. Eventuell Einbau MIDI.js
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
      return tuneAbc;
    }
    $scope.tuneUp = function () {
      // Transpose up
      eTuneBookService.tuneUp($scope.intTuneId);
      // Show Transposition
      renderAbc($scope.tune);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.tuneDown = function () {
      // Transpose down
      eTuneBookService.tuneDown($scope.intTuneId);
      // Show Transposition
      renderAbc($scope.tune);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.editTuneInfo = function () {
      $state.transitionTo('tuneinfo', { intTuneId: $scope.tune.intTuneId });
    };
    $scope.editTune = function () {
      $state.transitionTo('tuneabc', { intTuneId: $scope.tune.intTuneId });
    };
    $scope.deleteTune = function () {
      // Delete all TuneSetPositions with that tune
      eTuneBookService.deleteTuneSetPositionsAndTune($scope.tune.intTuneId);
      $state.transitionTo('tunelist');
      //Ein state zurück geht nur, wenn der Delete-Button im State 'tune' gedrückt wurde
      //Der Delete-Button wird aber auch auf den Sub-States von tune angeboten
      //$state.transitionTo($rootScope.$previousState, $rootScope.$previousStateParams);
      // Put TuneBook to localStorage
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.justPlayedTheTune = function (tune) {
      var now = new Date();
      eTuneBookService.addTunePlayDate(tune, now);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.loadRandomTune = function (playDateFilter) {
      $scope.$parent.playDateFilter = playDateFilter;
      var intTuneId = eTuneBookService.getRandomIntTuneId(playDateFilter);
      $state.transitionTo('tune', { intTuneId: intTuneId });
    };
    $scope.$watch(function () {
      return $state.is('tune');
    }, function () {
      if ($state.is('tune')) {
        $scope.currentState = 'Dots';
      }
    });
  }
]);
'use strict';
/**
 * Controller for tuneabc Template
 */
angular.module('eTuneBookApp').controller('tuneabcCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function tuneabcCtrl($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
    // Get current tune
    $scope.intTuneId = $stateParams['intTuneId'];
    $scope.tune = eTuneBookService.getTune($scope.intTuneId);
    $scope.$parent.currentState = 'Abc';
    $timeout(function () {
      var editHere = 'abcEditorFor' + $scope.intTuneId;
      var showHere = 'renderTheDotsFor' + $scope.intTuneId;
      new ABCJS.Editor(editHere, { canvas_id: showHere });
    }, 0, false);
    setOptions();
    $scope.tuneEditModus = true;
    $scope.noteEditModus = false;
    $scope.abcEditor = 'Tune Editor';
    $scope.setTuneEditModus = function () {
      $scope.tuneEditModus = true;
      $scope.noteEditModus = false;
      $scope.abcEditor = 'Tune Editor';
    };
    $scope.setNoteElementEditModus = function () {
      $scope.tuneEditModus = false;
      $scope.noteEditModus = true;
      $scope.abcEditor = 'Note Editor';
    };
    $scope.doneEditing = function (tune) {
      if (!tune.pure) {
        // Delete all TuneSetPositions with that tune
        eTuneBookService.deleteTuneSetPositionsAndTune(tune.intTuneId);
        $state.transitionTo('tunelist');  //Ein State zurück funktioniert hier nicht (tune ist nächst früherer state)
                                          //$state.transitionTo($rootScope.$previousState, $rootScope.$previousStateParams);
      } else {
        // Sync Tune-Fields
        tune.title = eTuneBookService.getTuneTitle(tune);
        tune.type = eTuneBookService.getTuneType(tune);
        tune.key = eTuneBookService.getTuneKey(tune);
        tune.id = eTuneBookService.getTuneId(tune);
      }
      // Put TuneBook to localStorage
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.doneSelecting = function (abc, selectionStart, selectionEnd) {
      //Hinweis: abc ist der Inhalt der Textarea.
      //Dies ist weder identisch mit $scope.tune.abc (beinhaltet keine eTbk-Directives),
      //noch mit $scope.tune.pure (beinhaltet keine Header-Directives und keine eTbk-Directives)
      //Supported abc-Element:
      // "<chord>"!<finger>!{<gracenote>}<noteAccidental><note><noteOctave><noteLength>
      var abcSelection, abcNoteElement, abcChars, abcChar, openingBangIndex;
      abcNoteElement = initAbcNoteElement();
      abcSelection = {
        abcBase: abc,
        startIndex: selectionStart,
        endIndex: selectionEnd,
        abc: 'undefined',
        abcNoteElement: abcNoteElement
      };
      deselectOptions();
      abcSelection.abc = abc.slice(selectionStart, selectionEnd);
      //Get Characters
      abcChars = abcSelection.abc.split('');
      for (var i = 0; i < abcChars.length; i++) {
        abcChar = abcChars[i];
        if (abcChar == ' ') {
        } else if (abcChar == '!') {
          // Zwischen zwei Ausrufzeichen können verschiedene Abc-Elemente definiert werden.
          // Das Finger-Element ist das einzige Abc-Element zwischen zwei Ausfrufzeichen in Form einer Zahl,
          // alle anderen sind alphanumerisch.
          if (openingBangIndex == undefined) {
            openingBangIndex = selectionStart + i;
          } else {
            if (abcNoteElement.finger.index != undefined) {
              abcNoteElement.finger.endSignIndex = selectionStart + i;
            }
            openingBangIndex = undefined;
          }
        } else if (abcNoteElement.finger.index == undefined && openingBangIndex != undefined) {
          if (!isNaN(parseInt(abcChar))) {
            //Check for Fingers
            for (var y = 0; y < $scope.fingerOptions.length; y++) {
              if (abcChar == $scope.fingerOptions[y].abc) {
                abcNoteElement.finger.index = selectionStart + i;
                abcNoteElement.finger.abc = abcChar;
                $scope.fingerOption = $scope.fingerOptions[y];
                abcNoteElement.finger.startSignIndex = openingBangIndex;
              }
            }
          }
        } else if (abcChar == '"') {
          // Zwischen zwei Apostrophs sind nur ChordSymbols möglich
          if (abcNoteElement.chordSymbol.startSignIndex == undefined) {
            abcNoteElement.chordSymbol.startSignIndex = selectionStart + i;
          } else if (abcNoteElement.chordSymbol.endSignIndex == undefined) {
            abcNoteElement.chordSymbol.endSignIndex = selectionStart + i;
            //Check for Chords
            for (var z = 0; z < $scope.chordOptions.length; z++) {
              if (abcNoteElement.chordSymbol.abc == $scope.chordOptions[z].abc) {
                $scope.chordOption = $scope.chordOptions[z];
              }
            }
          }
        } else if (abcNoteElement.chordSymbol.startSignIndex != undefined && abcNoteElement.chordSymbol.endSignIndex == undefined) {
          if (abcNoteElement.chordSymbol.abc == undefined) {
            abcNoteElement.chordSymbol.abc = abcChar;
          } else {
            abcNoteElement.chordSymbol.abc = abcNoteElement.chordSymbol.abc + abcChar;
          }
        } else if (abcChar == '_' || abcChar == '=' || abcChar == '^') {
          // Accidental
          if (abcNoteElement.accidental.startIndex == undefined) {
            abcNoteElement.accidental.startIndex = selectionStart + i;
            abcNoteElement.accidental.abc = abcChar;
          } else {
            abcNoteElement.accidental.abc = abcNoteElement.accidental.abc + abcChar;
          }
        } else if (abcNoteElement.note.index == undefined) {
          if (abcNoteElement.accidental.startIndex != undefined && abcNoteElement.accidental.endIndex == undefined) {
            abcNoteElement.accidental.endIndex = selectionStart + i;
            abcNoteElement.accidental.endIndex = abcNoteElement.accidental.endIndex - 1;
            //Check for Accidentals
            for (var z = 0; z < $scope.accidentalOptions.length; z++) {
              if (abcNoteElement.accidental.abc == $scope.accidentalOptions[z].abc) {
                $scope.accidentalOption = $scope.accidentalOptions[z];
              }
            }
          }
          //Check for Notes
          for (var z = 0; z < $scope.noteOptions.length; z++) {
            if (abcChar == $scope.noteOptions[z].abc) {
              abcNoteElement.note.index = selectionStart + i;
              $scope.noteOption = $scope.noteOptions[z];
            }
          }
        } else if (abcChar == ',' || abcChar == '\'') {
          // Octave modifier
          if (abcNoteElement.octave.startIndex == undefined) {
            abcNoteElement.octave.startIndex = selectionStart + i;
            abcNoteElement.octave.abc = abcChar;
          } else {
            abcNoteElement.octave.abc = abcNoteElement.octave.abc + abcChar;
          }
        } else {
          if (abcNoteElement.octave.startIndex != undefined && abcNoteElement.octave.endIndex == undefined) {
            abcNoteElement.octave.endIndex = selectionStart + i;
            abcNoteElement.octave.endIndex = abcNoteElement.octave.endIndex - 1;
            //Check for Octaves
            for (var z = 0; z < $scope.octaveOptions.length; z++) {
              if (abcNoteElement.octave.abc == $scope.octaveOptions[z].abc) {
                $scope.octaveOption = $scope.octaveOptions[z];
              }
            }
          }
          if (!isNaN(parseInt(abcChar)) || abcChar == '/' || abcChar == '>' || abcChar == '<') {
            if (abcNoteElement.noteLength.startIndex == undefined) {
              abcNoteElement.noteLength.startIndex = selectionStart + i;
              abcNoteElement.noteLength.abc = abcChar;
            } else {
              abcNoteElement.noteLength.abc = abcNoteElement.noteLength.abc + abcChar;
            }
          }
        }
      }
      //EOF: Check for Octave
      if (abcNoteElement.octave.startIndex != undefined) {
        for (var z = 0; z < $scope.octaveOptions.length; z++) {
          if (abcNoteElement.octave.abc == $scope.octaveOptions[z].abc) {
            abcNoteElement.octave.endIndex = abcNoteElement.octave.startIndex + abcNoteElement.octave.abc.length - 1;
            $scope.octaveOption = $scope.octaveOptions[z];
          }
        }
      }
      //EOF: Check for NoteLength
      if (abcNoteElement.noteLength.startIndex != undefined) {
        for (var z = 0; z < $scope.noteLengthOptions.length; z++) {
          if (abcNoteElement.noteLength.abc == $scope.noteLengthOptions[z].abc) {
            abcNoteElement.noteLength.endIndex = abcNoteElement.noteLength.startIndex + abcNoteElement.noteLength.abc.length - 1;
            $scope.noteLengthOption = $scope.noteLengthOptions[z];
          }
        }
      }
      $scope.abcSelection = abcSelection;
    };
    function initAbcNoteElement() {
      var abcNoteElement, chordSymbol, finger, graceNote, accidental, note, octave, noteLength;
      chordSymbol = {
        startSignIndex: undefined,
        abc: undefined,
        endSignIndex: undefined,
        add: function (abc, startSignIndex) {
          this.abc = abc;
          this.startSignIndex = startSignIndex;
          this.endSignIndex = this.startSignIndex + abc.length + 1;
          return this.endSignIndex - this.startSignIndex + 1;
        },
        delete: function () {
          var index = this.endSignIndex - this.startSignIndex + 1;
          this.abc = undefined;
          this.startSignIndex = undefined;
          this.endSignIndex = undefined;
          return index;
        },
        change: function (abc) {
          var index = abc.length - this.abc.length;
          this.abc = abc;
          this.endSignIndex = this.startSignIndex + abc.length + 1;
          return index;
        },
        moveRight: function (index) {
          if (this.startSignIndex != undefined) {
            this.startSignIndex = this.startSignIndex + index;
            this.endSignIndex = this.endSignIndex + index;
          }
        },
        moveLeft: function (index) {
          if (this.startIndex != undefined) {
            this.startSignIndex = this.startSignIndex - index;
            this.endSignIndex = this.endSignIndex - index;
          }
        }
      };
      finger = {
        startSignIndex: undefined,
        index: undefined,
        abc: undefined,
        endSignIndex: undefined,
        add: function (abc, startSignIndex) {
          this.abc = abc;
          this.startSignIndex = startSignIndex;
          this.index = this.startSignIndex + 1;
          this.endSignIndex = this.index + 1;
          return this.endSignIndex - this.startSignIndex + 1;
        },
        delete: function () {
          var index = this.endSignIndex - this.startSignIndex + 1;
          this.abc = undefined;
          this.startSignIndex = undefined;
          this.index = undefined;
          this.endSignIndex = undefined;
          return index;
        },
        change: function (abc) {
          this.abc = abc;
        },
        moveRight: function (index) {
          if (this.startSignIndex != undefined) {
            this.startSignIndex = this.startSignIndex + index;
            this.index = this.index + index;
            this.endSignIndex = this.endSignIndex + index;
          }
        },
        moveLeft: function (index) {
          if (this.startSignIndex != undefined) {
            this.startSignIndex = this.startSignIndex - index;
            this.index = this.index - index;
            this.endSignIndex = this.endSignIndex - index;
          }
        }
      };
      accidental = {
        startIndex: undefined,
        abc: undefined,
        endIndex: undefined,
        add: function (abc, startIndex) {
          this.abc = abc;
          this.startIndex = startIndex;
          this.endIndex = this.startIndex + abc.length - 1;
          return this.endIndex - this.startIndex + 1;
        },
        delete: function () {
          var index = this.endIndex - this.startIndex + 1;
          this.abc = undefined;
          this.startIndex = undefined;
          this.endIndex = undefined;
          return index;
        },
        change: function (abc) {
          var index = abc.length - this.abc.length;
          this.abc = abc;
          this.endIndex = this.startIndex + abc.length - 1;
          return index;
        },
        moveRight: function (index) {
          if (this.startIndex != undefined) {
            this.startIndex = this.startIndex + index;
            this.endIndex = this.endIndex + index;
          }
        },
        moveLeft: function (index) {
          if (this.startIndex != undefined) {
            this.startIndex = this.startIndex - index;
            this.endIndex = this.endIndex - index;
          }
        }
      };
      note = {
        index: undefined,
        abc: undefined,
        change: function (abc) {
          this.abc = abc;
        },
        moveRight: function (index) {
          if (this.index != undefined) {
            this.index = this.index + index;
          }
        },
        moveLeft: function (index) {
          if (this.index != undefined) {
            this.index = this.index - index;
          }
        }
      };
      octave = {
        startIndex: undefined,
        abc: undefined,
        endIndex: undefined,
        add: function (abc, startIndex) {
          this.abc = abc;
          this.startIndex = startIndex;
          this.endIndex = this.startIndex + abc.length - 1;
          return this.endIndex - this.startIndex + 1;
        },
        delete: function () {
          var index = this.endIndex - this.startIndex + 1;
          this.abc = undefined;
          this.startIndex = undefined;
          this.endIndex = undefined;
          return index;
        },
        change: function (abc) {
          var index = abc.length - this.abc.length;
          this.abc = abc;
          this.endIndex = this.startIndex + abc.length - 1;
          return index;
        },
        moveRight: function (index) {
          if (this.startIndex != undefined) {
            this.startIndex = this.startIndex + index;
            this.endIndex = this.endIndex + index;
          }
        },
        moveLeft: function (index) {
          if (this.startIndex != undefined) {
            this.startIndex = this.startIndex - index;
            this.endIndex = this.endIndex - index;
          }
        }
      };
      noteLength = {
        startIndex: undefined,
        abc: undefined,
        endIndex: undefined,
        add: function (abc, startIndex) {
          this.abc = abc;
          this.startIndex = startIndex;
          this.endIndex = this.startIndex + abc.length - 1;
          return this.endIndex - this.startIndex + 1;
        },
        delete: function () {
          var index = this.endIndex - this.startIndex + 1;
          this.abc = undefined;
          this.startIndex = undefined;
          this.endIndex = undefined;
          return index;
        },
        change: function (abc) {
          var index = abc.length - this.abc.length;
          this.abc = abc;
          this.endIndex = this.startIndex + abc.length - 1;
          return index;
        },
        moveRight: function (index) {
          if (this.startIndex != undefined) {
            this.startIndex = this.startIndex + index;
            this.endIndex = this.endIndex + index;
          }
        },
        moveLeft: function (index) {
          if (this.startIndex != undefined) {
            this.startIndex = this.startIndex - index;
            this.endIndex = this.endIndex - index;
          }
        }
      };
      abcNoteElement = {
        chordSymbol: chordSymbol,
        finger: finger,
        accidental: accidental,
        note: note,
        octave: octave,
        noteLength: noteLength,
        addChord: function (abc) {
          var startSignIndex, index;
          if (this.finger.startSignIndex != undefined) {
            startSignIndex = this.finger.startSignIndex;
          } else if (this.accidental.startIndex != undefined) {
            startSignIndex = this.accidental.startIndex;
          } else if (this.note.index != undefined) {
            startSignIndex = this.note.index;
          } else {
          }
          index = this.chordSymbol.add(abc, startSignIndex);
          this.finger.moveRight(index);
          this.accidental.moveRight(index);
          this.note.moveRight(index);
          this.octave.moveRight(index);
          this.noteLength.moveRight(index);
        },
        deleteChord: function () {
          var index;
          index = this.chordSymbol.delete();
          this.finger.moveLeft(index);
          this.accidental.moveLeft(index);
          this.note.moveLeft(index);
          this.octave.moveLeft(index);
          this.noteLength.moveLeft(index);
        },
        changeChord: function (abc) {
          var index;
          index = this.chordSymbol.change(abc);
          if (index > 0) {
            // Move Right
            this.finger.moveRight(index);
            this.accidental.moveRight(index);
            this.note.moveRight(index);
            this.octave.moveRight(index);
            this.noteLength.moveRight(index);
          } else if (index < 0) {
            // Move Left
            index = index * -1;
            this.finger.moveLeft(index);
            this.accidental.moveLeft(index);
            this.note.moveLeft(index);
            this.octave.moveLeft(index);
            this.noteLength.moveLeft(index);
          }
        },
        addFinger: function (abc) {
          var startSignIndex, index;
          if (this.accidental.startIndex != undefined) {
            startSignIndex = this.accidental.startIndex;
          } else if (this.note.index != undefined) {
            startSignIndex = this.note.index;
          } else {
          }
          index = this.finger.add(abc, startSignIndex);
          this.accidental.moveRight(index);
          this.note.moveRight(index);
          this.octave.moveRight(index);
          this.noteLength.moveRight(index);
        },
        deleteFinger: function () {
          var index;
          index = this.finger.delete();
          this.accidental.moveLeft(index);
          this.note.moveLeft(index);
          this.octave.moveLeft(index);
          this.noteLength.moveLeft(index);
        },
        changeFinger: function (abc) {
          this.finger.change(abc);
        },
        addAccidental: function (abc) {
          var startIndex, index;
          if (this.note.index != undefined) {
            startIndex = this.note.index;
          } else {
          }
          index = this.accidental.add(abc, startIndex);
          this.note.moveRight(index);
          this.octave.moveRight(index);
          this.noteLength.moveRight(index);
        },
        deleteAccidental: function () {
          var index;
          index = this.accidental.delete();
          this.note.moveLeft(index);
          this.octave.moveLeft(index);
          this.noteLength.moveLeft(index);
        },
        changeAccidental: function (abc) {
          var index;
          index = this.accidental.change(abc);
          if (index > 0) {
            // Move Right
            this.note.moveRight(index);
            this.octave.moveRight(index);
            this.noteLength.moveRight(index);
          } else if (index < 0) {
            // Move Left
            index = index * -1;
            this.note.moveLeft(index);
            this.octave.moveLeft(index);
            this.noteLength.moveLeft(index);
          }
        },
        changeNote: function (abc) {
          this.note.change(abc);
        },
        addOctave: function (abc) {
          var startIndex, index;
          if (this.note.index != undefined) {
            startIndex = this.note.index + 1;
          } else {
          }
          index = this.octave.add(abc, startIndex);
          this.noteLength.moveRight(index);
        },
        deleteOctave: function () {
          var index;
          index = this.octave.delete();
          this.noteLength.moveLeft(index);
        },
        changeOctave: function (abc) {
          var index;
          index = this.octave.change(abc);
          if (index > 0) {
            // Move Right
            this.noteLength.moveRight(index);
          } else if (index < 0) {
            // Move Left
            index = index * -1;
            this.noteLength.moveLeft(index);
          }
        },
        addNoteLength: function (abc) {
          var startIndex, index;
          if (this.octave.index != undefined) {
            startIndex = this.octave.index + 1;
          } else if (this.note.index != undefined) {
            startIndex = this.note.index + 1;
          } else {
          }
          index = this.noteLength.add(abc, startIndex);
        },
        deleteNoteLength: function () {
          var index;
          index = this.noteLength.delete();
        },
        changeNoteLength: function (abc) {
          var index;
          index = this.noteLength.change(abc);
        }
      };
      return abcNoteElement;
    }
    function extractAbcElement() {
    }
    $scope.changeChord = function (chordOption) {
      $scope.$emit('chordChange', chordOption);
    };
    $scope.changeFinger = function (fingerOption) {
      $scope.$emit('fingerChange', fingerOption);
    };
    $scope.changeGraceNote = function (graceNoteOption) {
      $scope.$emit('graceNoteChange', graceNoteOption);
    };
    $scope.changeAccidental = function (accidentalOption) {
      $scope.$emit('accidentalChange', accidentalOption);
    };
    $scope.changeNote = function (noteOption) {
      $scope.$emit('noteChange', noteOption);
    };
    $scope.changeOctave = function (octaveOption) {
      $scope.$emit('octaveChange', octaveOption);
    };
    $scope.changeNoteLength = function (noteLengthOption) {
      $scope.$emit('noteLengthChange', noteLengthOption);
    };
    function setChordOptions() {
      var chordOption, chordOptions;
      chordOptions = [];
      chordOption = {};
      chordOption.abc = 'bm';
      chordOption.sort = 'bm';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'B';
      chordOption.sort = 'B';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'a#m';
      chordOption.sort = 'a#m';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'A#';
      chordOption.sort = 'A#';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'am';
      chordOption.sort = 'am';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'A';
      chordOption.sort = 'A';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'g#m';
      chordOption.sort = 'g#m';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'G#';
      chordOption.sort = 'G#';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'gm';
      chordOption.sort = 'gm';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'G';
      chordOption.sort = 'G';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'f#m';
      chordOption.sort = 'f#m';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'F#';
      chordOption.sort = 'F#';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'fm';
      chordOption.sort = 'fm';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'F';
      chordOption.sort = 'F';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'em';
      chordOption.sort = 'em';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'E';
      chordOption.sort = 'E';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'd#m';
      chordOption.sort = 'd#m';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'D#';
      chordOption.sort = 'D#';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'dm';
      chordOption.sort = 'dm';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'D';
      chordOption.sort = 'D';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'c#m';
      chordOption.sort = 'c#m';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'C#';
      chordOption.sort = 'C#';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'cm';
      chordOption.sort = 'cm';
      chordOptions.push(chordOption);
      chordOption = {};
      chordOption.abc = 'C';
      chordOption.sort = 'C';
      chordOptions.push(chordOption);
      // default: no selection
      chordOption = {};
      chordOption.abc = '--';
      chordOption.sort = '--';
      chordOptions.push(chordOption);
      $scope.chordOption = chordOption;
      // default
      $scope.chordOptions = chordOptions;
    }
    function setFingerOptions() {
      var fingerOption, fingerOptions;
      fingerOptions = [];
      fingerOption = {};
      fingerOption.abc = '1';
      fingerOptions.push(fingerOption);
      fingerOption = {};
      fingerOption.abc = '2';
      fingerOptions.push(fingerOption);
      fingerOption = {};
      fingerOption.abc = '3';
      fingerOptions.push(fingerOption);
      fingerOption = {};
      fingerOption.abc = '4';
      fingerOptions.push(fingerOption);
      fingerOption = {};
      fingerOption.abc = '5';
      fingerOptions.push(fingerOption);
      // default: no selection
      fingerOption = {};
      fingerOption.abc = '--';
      fingerOptions.push(fingerOption);
      $scope.fingerOption = fingerOption;
      // default
      $scope.fingerOptions = fingerOptions;
    }
    function setAccidentalOptions() {
      var accidentalOption, accidentalOptions;
      accidentalOptions = [];
      accidentalOption = {};
      accidentalOption.abc = '^^';
      // 2 Sharps
      accidentalOption.sort = '^^';
      accidentalOptions.push(accidentalOption);
      accidentalOption = {};
      accidentalOption.abc = '^';
      // 1 Sharp
      accidentalOption.sort = '^';
      accidentalOptions.push(accidentalOption);
      accidentalOption = {};
      accidentalOption.abc = '=';
      // Aufhebung
      accidentalOption.sort = '=';
      accidentalOptions.push(accidentalOption);
      accidentalOption = {};
      accidentalOption.abc = '_';
      // 1 b
      accidentalOption.sort = '_';
      accidentalOptions.push(accidentalOption);
      accidentalOption = {};
      accidentalOption.abc = '__';
      // 2 b
      accidentalOption.sort = '__';
      accidentalOptions.push(accidentalOption);
      // default: no selection
      accidentalOption = {};
      accidentalOption.abc = '--';
      accidentalOption.sort = '--';
      accidentalOptions.push(accidentalOption);
      $scope.accidentalOption = accidentalOption;
      // default
      $scope.accidentalOptions = accidentalOptions;
    }
    function setNoteOptions() {
      var noteOption, noteOptions;
      noteOptions = [];
      noteOption = {};
      noteOption.abc = 'C';
      noteOption.frequency = '261.626';
      noteOptions.push(noteOption);
      noteOption = {};
      noteOption.abc = 'D';
      noteOption.frequency = '293.665';
      noteOptions.push(noteOption);
      noteOption = {};
      noteOption.abc = 'E';
      noteOption.frequency = '329.628';
      noteOptions.push(noteOption);
      noteOption = {};
      noteOption.abc = 'F';
      noteOption.frequency = '349.228';
      noteOptions.push(noteOption);
      noteOption = {};
      noteOption.abc = 'G';
      noteOption.frequency = '391.995';
      noteOptions.push(noteOption);
      noteOption = {};
      noteOption.abc = 'A';
      noteOption.frequency = '440.000';
      noteOptions.push(noteOption);
      noteOption = {};
      noteOption.abc = 'B';
      noteOption.frequency = '493.883';
      noteOptions.push(noteOption);
      noteOption = {};
      noteOption.abc = 'c';
      noteOption.frequency = '523.251';
      noteOptions.push(noteOption);
      noteOption = {};
      noteOption.abc = 'd';
      noteOption.frequency = '587.33';
      noteOptions.push(noteOption);
      noteOption = {};
      noteOption.abc = 'e';
      noteOption.frequency = '659.255';
      noteOptions.push(noteOption);
      noteOption = {};
      noteOption.abc = 'f';
      noteOption.frequency = '698.456';
      noteOptions.push(noteOption);
      noteOption = {};
      noteOption.abc = 'g';
      noteOption.frequency = '783.991';
      noteOptions.push(noteOption);
      noteOption = {};
      noteOption.abc = 'a';
      noteOption.frequency = '880.000';
      noteOptions.push(noteOption);
      noteOption = {};
      noteOption.abc = 'b';
      noteOption.frequency = '987.767';
      noteOptions.push(noteOption);
      // default: no selection
      noteOption = {};
      noteOption.abc = '--';
      noteOption.frequency = '000.000';
      noteOptions.push(noteOption);
      $scope.noteOption = noteOption;
      // default
      $scope.noteOptions = noteOptions;
    }
    function setOctaveOptions() {
      var octaveOption, octaveOptions;
      octaveOptions = [];
      octaveOption = {};
      octaveOption.abc = '\'\'';
      // 2 Octaves up
      octaveOption.sort = '\'\'';
      octaveOptions.push(octaveOption);
      octaveOption = {};
      octaveOption.abc = '\'';
      // 1 Octave up
      octaveOption.sort = '\'';
      octaveOptions.push(octaveOption);
      octaveOption = {};
      octaveOption.abc = ',';
      // 1 Octave down
      octaveOption.sort = ',';
      octaveOptions.push(octaveOption);
      octaveOption = {};
      octaveOption.abc = ',,';
      // 2 Octaves down
      octaveOption.sort = ',,';
      octaveOptions.push(octaveOption);
      // default: no selection
      octaveOption = {};
      octaveOption.abc = '--';
      octaveOption.sort = '--';
      octaveOptions.push(octaveOption);
      $scope.octaveOption = octaveOption;
      // default
      $scope.octaveOptions = octaveOptions;
    }
    function setNoteLengthOptions() {
      var noteLengthOption, noteLengthOptions;
      noteLengthOptions = [];
      noteLengthOption = {};
      noteLengthOption.abc = '2';
      noteLengthOptions.push(noteLengthOption);
      noteLengthOption = {};
      noteLengthOption.abc = '/2';
      noteLengthOptions.push(noteLengthOption);
      noteLengthOption = {};
      noteLengthOption.abc = '/';
      // short for /2
      noteLengthOptions.push(noteLengthOption);
      noteLengthOption = {};
      noteLengthOption.abc = '<';
      // short for /2, next note is 3/2
      noteLengthOptions.push(noteLengthOption);
      noteLengthOption = {};
      noteLengthOption.abc = '>';
      // short for 3/2, next note is /2
      noteLengthOptions.push(noteLengthOption);
      noteLengthOption = {};
      noteLengthOption.abc = '3/2';
      noteLengthOptions.push(noteLengthOption);
      noteLengthOption = {};
      noteLengthOption.abc = '3';
      noteLengthOptions.push(noteLengthOption);
      noteLengthOption = {};
      noteLengthOption.abc = '4';
      noteLengthOptions.push(noteLengthOption);
      noteLengthOption = {};
      noteLengthOption.abc = '/4';
      noteLengthOptions.push(noteLengthOption);
      noteLengthOption = {};
      noteLengthOption.abc = '//';
      // short for /4
      noteLengthOptions.push(noteLengthOption);
      noteLengthOption = {};
      noteLengthOption.abc = '5';
      noteLengthOptions.push(noteLengthOption);
      noteLengthOption = {};
      noteLengthOption.abc = '6';
      noteLengthOptions.push(noteLengthOption);
      noteLengthOption = {};
      noteLengthOption.abc = '7';
      noteLengthOptions.push(noteLengthOption);
      noteLengthOption = {};
      noteLengthOption.abc = '8';
      noteLengthOptions.push(noteLengthOption);
      noteLengthOption = {};
      noteLengthOption.abc = '/8';
      noteLengthOptions.push(noteLengthOption);
      noteLengthOption = {};
      noteLengthOption.abc = '///';
      // short for /8
      noteLengthOptions.push(noteLengthOption);
      // default: no selection
      noteLengthOption = {};
      noteLengthOption.abc = '--';
      noteLengthOptions.push(noteLengthOption);
      $scope.noteLengthOption = noteLengthOption;
      // default
      $scope.noteLengthOptions = noteLengthOptions;
    }
    function setOptions() {
      setChordOptions();
      setFingerOptions();
      setAccidentalOptions();
      setNoteOptions();
      setOctaveOptions();
      setNoteLengthOptions();
    }
    function deselectOptions() {
      deselectChordOptions();
      deselectFingerOptions();
      deselectAccidentalOptions();
      deselectNoteOptions();
      deselectOctaveOptions();
      deselectNoteLengthOptions();
    }
    function deselectChordOptions() {
      for (var i = 0; i < $scope.chordOptions.length; i++) {
        if ($scope.chordOptions[i].abc == '--') {
          // no selection
          $scope.chordOption = $scope.chordOptions[i];
        }
      }
    }
    function deselectFingerOptions() {
      for (var i = 0; i < $scope.fingerOptions.length; i++) {
        if ($scope.fingerOptions[i].abc == '--') {
          // no selection
          $scope.fingerOption = $scope.fingerOptions[i];
        }
      }
    }
    function deselectAccidentalOptions() {
      for (var i = 0; i < $scope.accidentalOptions.length; i++) {
        if ($scope.accidentalOptions[i].abc == '--') {
          // no selection
          $scope.accidentalOption = $scope.accidentalOptions[i];
        }
      }
    }
    function deselectNoteOptions() {
      for (var i = 0; i < $scope.noteOptions.length; i++) {
        if ($scope.noteOptions[i].abc == '--') {
          // no selection
          $scope.noteOption = $scope.noteOptions[i];
        }
      }
    }
    $scope.selectNoteOptions = function (abc) {
      for (var i = 0; i < $scope.noteOptions.length; i++) {
        if ($scope.noteOptions[i].abc == abc) {
          $scope.noteOption = $scope.noteOptions[i];
        }
      }
    };
    function deselectOctaveOptions() {
      for (var i = 0; i < $scope.octaveOptions.length; i++) {
        if ($scope.octaveOptions[i].abc == '--') {
          // no selection
          $scope.octaveOption = $scope.octaveOptions[i];
        }
      }
    }
    function deselectNoteLengthOptions() {
      for (var i = 0; i < $scope.noteLengthOptions.length; i++) {
        if ($scope.noteLengthOptions[i].abc == '--') {
          // no selection
          $scope.noteLengthOption = $scope.noteLengthOptions[i];
        }
      }
    }
  }
]);
'use strict';
/**
 * Controller for tuneinfo Template
 */
angular.module('eTuneBookApp').controller('tuneinfoCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function ($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
    // Get current tune
    $scope.intTuneId = $stateParams['intTuneId'];
    $scope.tune = eTuneBookService.getTune($scope.intTuneId);
    $scope.$parent.currentState = 'Info';
    $scope.tuneWebsites = $scope.tune.wsites;
    $scope.tuneWebsitesSelected = [];
    $scope.tuneWebsiteList = {
      data: 'tuneWebsites',
      selectedItems: $scope.tuneWebsitesSelected,
      multiSelect: false,
      enableCellSelection: true,
      enableRowSelection: true,
      enableCellEditOnFocus: true,
      columnDefs: [
        {
          field: '',
          cellTemplate: '<button class="btn btn-xs btn-default" ng-click="openWebsite(row)"><i class="glyphicon glyphicon-play" title="Jump to"></i></button>',
          enableCellEdit: false,
          width: '10%'
        },
        {
          field: 'url',
          displayName: 'URL',
          enableCellEdit: true,
          editableCellTemplate: '<input style="width: 100%" ng-model="COL_FIELD" ng-blur="storeTuneBook()"/>',
          width: '75%'
        },
        {
          field: '',
          cellTemplate: '<button class="btn btn-xs btn-default" ng-click="deleteWebsite(row)"><i class="glyphicon glyphicon-trash" title="Delete Website"></i></button>',
          enableCellEdit: false,
          width: '10%'
        }
      ]
    };
    $scope.deleteWebsite = function (row) {
      //Delete Video
      eTuneBookService.deleteWebsite($scope.intTuneId, row.entity.url);
      //Generate TuneBook-Abc and save it to localStorage
      eTuneBookService.storeTuneBookAbc();
    };
    //TODO:
    //editableCellTemplate wird gebraucht um mit ng-blur in storeTuneBook zu verzweigen.
    //editableCellTemplate bewirkt aber, dass mit ng-blur das Input-Feld nicht korrekt zurückgesetzt wird.
    //ng-grid Problem?
    $scope.storeTuneBook = function () {
      //Generate TuneBook-Abc and save it to localStorage
      // (jedesmal wenn ein Feld verlassen wird, egal ob was geändert hat oder nicht)
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.newWebsite = function () {
      eTuneBookService.addWebsite($scope.intTuneId, '');  //gespeichert (localStorage) wird erst nach erster Eingabe
    };
    $scope.openWebsite = function (row) {
      window.open(row.entity.url);
    };
  }
]);
'use strict';
/**
 * Controller for tunlist Template
 */
angular.module('eTuneBookApp').controller('tunelistCtrl', [
  '$scope',
  '$window',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function tunelistCtrl($scope, $window, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
    var filterOptions, columnDefs, rowTempl, footerTempl;
    filterOptions = {};
    filterOptions.key = $stateParams['key'];
    filterOptions.type = $stateParams['type'];
    filterOptions.color = $stateParams['color'];
    filterOptions.skill = $stateParams['skill'];
    filterOptions.event = $stateParams['evt'];
    filterOptions.band = $stateParams['band'];
    filterOptions.plmin = $stateParams['plmin'];
    filterOptions.plmax = $stateParams['plmax'];
    filterOptions.freqcomp = $stateParams['freqcomp'];
    filterOptions.freq = $stateParams['freq'];
    filterOptions.updmin = $stateParams['updmin'];
    filterOptions.updmax = $stateParams['updmax'];
    /*
    $scope.currentFilter = "";
    if(filterOptions.type != ""){
        $scope.currentFilter = $scope.currentFilter + filterOptions.type;
    }
    if(filterOptions.key != ""){
        if($scope.currentFilter != ""){
            $scope.currentFilter = $scope.currentFilter + ", ";
        }
        $scope.currentFilter = $scope.currentFilter + filterOptions.key;
    }
    */
    $scope.tunes = eTuneBookService.getTunesFiltered(filterOptions);
    $scope.tunesSelected = [];
    rowTempl = '<div ng-style="{ \'cursor\': row.cursor }" ' + 'ng-repeat="col in renderedColumns" ' + 'style="background-color:{{row.entity.color}}" ' + 'class="ngCell {{col.cellClass}} {{col.colIndex()}}" ng-cell></div>';
    //footerTempl = '<button class="btn btn-default" ng-click="newTune()" title="New Tune">New</button>';
    if ($window.mobilecheck()) {
      // Small Device -> Display Less Columns
      columnDefs = [
        {
          field: 'title',
          displayName: 'Tune',
          cellFilter: 'eliminateThe',
          width: '60%',
          cellTemplate: '<a href="#/tunes/{{row.entity.intTuneId}}" title="Show The Tune" >{{row.entity.title}}</a>'
        },
        {
          field: 'type',
          displayName: 'Type',
          width: '10%'
        },
        {
          field: 'lastPlayed',
          displayName: 'Played',
          cellFilter: 'fromNow',
          width: '30%'
        }
      ];
    } else {
      // Desktop Device -> Display All Columns
      //alert('document: '+ $window.document.width + '/' + $window.document.height + ' window: ' + $window.screen.width + '/' + $window.screen.height );
      columnDefs = [
        {
          field: 'title',
          displayName: 'Tune',
          cellFilter: 'eliminateThe',
          width: '40%',
          cellTemplate: '<a href="#/tunes/{{row.entity.intTuneId}}" title="Show The Tune" >{{row.entity.title}}</a>'
        },
        {
          field: 'type',
          displayName: 'Type',
          width: '10%'
        },
        {
          field: 'key',
          displayName: 'Key',
          width: '8%'
        },
        {
          field: 'lastPlayed',
          displayName: 'Played',
          cellFilter: 'fromNow',
          width: '15%'
        },
        {
          field: 'frequencyPlayed',
          displayName: 'Frequency',
          width: '10%'
        },
        {
          field: 'lastModified',
          displayName: 'Modified',
          cellFilter: 'fromNow',
          width: '15%'
        }
      ];
    }
    $scope.tuneList = {
      data: 'tunes',
      selectedItems: $scope.tunesSelected,
      multiSelect: false,
      rowTemplate: rowTempl,
      columnDefs: columnDefs
    };
    $scope.tuneList.filterOptions = {
      filterText: '',
      useExternalFilter: false
    };
    $scope.newTune = function () {
      // A new Tune gets the highest TuneId, intTuneId and TuneSetId
      var newTuneSet = eTuneBookService.initializeTuneAndTuneSet();
      $state.transitionTo('tuneabc', { intTuneId: newTuneSet.tuneSetPositions[0].tune.intTuneId });
    };
    $scope.$watch('search', function (searchText) {
      if (searchText) {
        // console.log(searchText);
        var searchQuery = 'title:' + searchText + ';';
        $scope.tuneList.filterOptions.filterText = searchQuery;  //console.log(searchQuery);
      }
    });
    // Scrolling: Default Scrolling is Top.
    // If previous state was main (Tunes-Button pressed): No change in Scrolling.
    // If previous state was tune (Back-Button pressed on Tune-View): Scroll to previously viewed tune
    // $rootScope.$previousState and $rootScope.$previousStateParams are set in the mainCtrl
    if ($rootScope.$previousState != undefined && $rootScope.$previousState.name == 'tune') {
      //$scope.tuneList.ngGrid existiert erst nach call von tunelistCtrl -> timeout
      $timeout(function () {
        var previousTune = eTuneBookService.getTune($rootScope.$previousStateParams.intTuneId);
        var grid = $scope.tuneList.ngGrid;
        var rowIndex = grid.data.indexOf(previousTune);
        grid.$viewport.scrollTop(grid.rowMap[rowIndex] * grid.config.rowHeight);
      }, 0, false);
    }
  }
]);
'use strict';
/**
 * Controller for tuneplaylists Template
 */
angular.module('eTuneBookApp').controller('tuneplaylistsCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function ($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
    // Get current tune
    $scope.intTuneId = $stateParams['intTuneId'];
    $scope.$parent.currentState = 'Playlists';
    $scope.playlists = eTuneBookService.getPlaylistsByIntTuneId($scope.intTuneId);
    $scope.playlistsSelected = [];
    var rowTempl = '<div ng-style="{ \'cursor\': row.cursor }" ' + 'ng-repeat="col in renderedColumns" ' + 'style="background-color:{{row.entity.tune.color}}" ' + 'class="ngCell {{col.cellClass}} {{col.colIndex()}}" ng-cell></div>';
    $scope.tunePlaylistList = {
      data: 'playlists',
      selectedItems: $scope.playlistsSelected,
      multiSelect: false,
      sortInfo: {
        fields: ['id'],
        directions: ['asc']
      },
      rowTemplate: rowTempl,
      afterSelectionChange: function () {
        $state.transitionTo('playlist', {
          playlistId: $scope.playlistsSelected[0].id,
          tune: $scope.intTuneId
        });
      },
      columnDefs: [
        {
          field: 'id',
          displayName: '',
          width: '0%',
          sortable: false,
          groupable: false
        },
        {
          field: 'name',
          displayName: 'Playlist',
          cellFilter: 'eliminateThe',
          width: '70%',
          sortable: false,
          groupable: false
        },
        {
          field: 'band',
          displayName: 'Band',
          width: '30%',
          sortable: false,
          groupable: false
        }
      ]
    };
  }
]);
'use strict';
/**
 * Controller for tunepractice Template
 */
angular.module('eTuneBookApp').controller('tunepracticeCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function ($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
    // Get current tune
    $scope.intTuneId = $stateParams['intTuneId'];
    $scope.tune = eTuneBookService.getTune($scope.intTuneId);
    $scope.tunePlayDates = $scope.tune.playDates;
    $scope.tunePlayDatesSelected = [];
    $scope.$parent.currentState = 'Practice';
    $scope.tunePlayDateList = {
      data: 'tunePlayDates',
      selectedItems: $scope.tunePlayDatesSelected,
      multiSelect: false,
      columnDefs: [
        {
          field: 'playDate',
          displayName: 'Played',
          cellFilter: 'date: \'yyyy-MM-dd HH:mm\'',
          width: '50%'
        },
        {
          field: 'playDate',
          displayName: '',
          cellFilter: 'fromNow',
          width: '50%'
        }
      ]
    };
    setSkillTypes();
    function setSkillTypes() {
      $scope.skillTypes = eTuneBookService.getSkillTypes();
      for (var i = 0; i < $scope.skillTypes.length; i++) {
        if ($scope.skillTypes[i].description == $scope.tune.skill) {
          //Select current SkillType
          $scope.skillType = $scope.skillTypes[i];
        }
      }
    }
    $scope.setSkill = function (skillType) {
      $scope.tune.skill = skillType.description;
      eTuneBookService.storeTuneBookAbc();
    };
  }
]);
'use strict';
/**
 * Controller for info Templates
 */
angular.module('eTuneBookApp').controller('tunesCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  'eTuneBookService',
  function ($scope, $location, $timeout, $rootScope, $state, eTuneBookService) {
    $scope.playDateFilter = 'All Tunes';
  }
]);
'use strict';
/**
 * Controller for tunesets Template
 */
angular.module('eTuneBookApp').controller('tunesetsCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function ($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
    // Get current tune
    $scope.intTuneId = $stateParams['intTuneId'];
    $scope.$parent.currentState = 'Sets';
    $scope.tuneSetPositions = eTuneBookService.getTuneSetsAsTuneSetPositions($scope.intTuneId);
    $scope.tuneSetPositionsSelected = [];
    var rowTempl = '<div ng-style="{ \'cursor\': row.cursor }" ' + 'ng-repeat="col in renderedColumns" ' + 'style="background-color:{{row.entity.tune.color}}" ' + 'class="ngCell {{col.cellClass}} {{col.colIndex()}}" ng-cell></div>';
    var aggregateTemplate = '<div ng-click="row.toggleExpand()" ng-style="rowStyle(row)" class="ngAggregate"> <span class="ngAggregateText">{{row.label CUSTOM_FILTERS}}{{aggFC(row)}}</span> <div class="{{row.aggClass()}}"></div> </div>';
    $scope.tuneSetList = {
      data: 'tuneSetPositions',
      selectedItems: $scope.tuneSetPositionsSelected,
      multiSelect: false,
      sortInfo: {
        fields: ['position'],
        directions: ['asc']
      },
      groups: ['tuneSetId'],
      groupsCollapsedByDefault: false,
      aggregateTemplate: aggregateTemplate,
      rowTemplate: rowTempl,
      afterSelectionChange: function () {
        $state.transitionTo('set', { tuneSetId: $scope.tuneSetPositionsSelected[0].tuneSetId });
      },
      columnDefs: [
        {
          field: 'tuneSetId',
          displayName: '',
          width: '0%',
          sortable: false,
          groupable: false
        },
        {
          field: 'position',
          displayName: '',
          width: '0%',
          sortable: false,
          groupable: false
        },
        {
          field: 'tune.title',
          displayName: 'Set',
          cellFilter: 'eliminateThe',
          width: '50%',
          sortable: false,
          groupable: false
        },
        {
          field: 'tune.type',
          displayName: 'Type',
          width: '20%',
          sortable: false,
          groupable: false
        },
        {
          field: 'tune.key',
          displayName: 'Key',
          width: '20%',
          sortable: false,
          groupable: false
        }
      ]
    };
    $scope.aggFC = function (row) {
      var target, env, envDefined, name, theSplits, tuneSetInfo;
      tuneSetInfo = '';
      for (var i = 0; i < row.children.length; i++) {
        if (row.children[i].entity.position == 1) {
          target = row.children[i].entity.tuneSetTarget;
          env = row.children[i].entity.tuneSetEnv;
          name = row.children[i].entity.tuneSetName;
          if (name != null && name != 'undefined' && name != '') {
          } else {
            name = row.children[i].entity.tune.title;
          }
          //Cut away ,The at the end of the String
          theSplits = [];
          theSplits = name.split(',');
          name = theSplits[0];
          tuneSetInfo = tuneSetInfo + ' ' + name;
        }
      }
      envDefined = false;
      if (env != null && env != 'undefined' && env != '') {
        tuneSetInfo = tuneSetInfo + ' (' + env;
        envDefined = true;
      }
      if (target != null && target != 'undefined' && target != '') {
        if (!envDefined) {
          tuneSetInfo = tuneSetInfo + '(' + target;
        } else {
          tuneSetInfo = tuneSetInfo + ': ' + target;
        }
        tuneSetInfo = tuneSetInfo + ')';
      }
      return tuneSetInfo;
    };
    $scope.newTuneSet = function () {
      eTuneBookService.initializeTuneSet($scope.intTuneId);
      $scope.tuneSetPositions = eTuneBookService.getTuneSetsAsTuneSetPositions($scope.intTuneId);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.putTuneBookToLocalStorage = function () {
      //tbkStorage.putToLocalStorage($scope.tuneBook);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.removeTuneSetPosition = function (tuneSetPosition) {
      for (var i = 0; i < $scope.tuneBook.tuneSets.length; i++) {
        if ($scope.tuneBook.tuneSets[i].tuneSetId == tuneSetPosition.tuneSetId) {
          // TuneSetPosition aus TuneSet rausl�schen
          $scope.tuneBook.tuneSets[i].tuneSetPositions.splice($scope.tuneBook.tuneSets[i].tuneSetPositions.indexOf(tuneSetPosition), 1);
          if ($scope.tuneBook.tuneSets[i].tuneSetPositions.length == 0) {
            // TuneSet l�schen, wenn keine TuneSetPosition mehr dranh�ngt
            $scope.tuneBook.tuneSets.splice(i, 1);
          }
        }
      }
    };
  }
]);
'use strict';
/**
 * Controller for video Template
 */
angular.module('eTuneBookApp').controller('tunevideoCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function ($scope, $state, $stateParams, eTuneBookService) {
    // Get current tune
    $scope.intTuneId = $stateParams['intTuneId'];
    $scope.code = $stateParams['code'];
    $scope.source = $stateParams['source'];
    //Editable Fields (detached copies)
    $scope.tuneVideoCode = angular.copy($scope.code);
    $scope.tuneVideoDescription = '';
    $scope.video = {};
    $scope.videoUrl = '';
    if ($scope.code != '') {
      $scope.video = eTuneBookService.getVideo($scope.intTuneId, $scope.source, $scope.code);
      $scope.tuneVideoDescription = angular.copy($scope.video.description);
      $scope.videoUrl = '//www.youtube.com/embed/' + $scope.tuneVideoCode;
    }
    $scope.save = function () {
      if ($scope.tuneVideoCode == $scope.code) {
        //Update Fields -> tuneBook in eTuneBookService gets updated as well (copy by reference)
        $scope.video.description = angular.copy($scope.tuneVideoDescription);
      } else {
        //Add Video
        $scope.video = eTuneBookService.addVideo($scope.intTuneId, $scope.source, $scope.tuneVideoCode, $scope.tuneVideoDescription);
        //Update List and Url
        $state.transitionTo('tunevideo', {
          intTuneId: $scope.intTuneId,
          source: $scope.source,
          code: $scope.tuneVideoCode
        });
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
      $state.transitionTo('tunevideos', { intTuneId: $scope.intTuneId });
      //Generate TuneBook-Abc and save it to localStorage
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.load = function () {
      //Achtung: Mit www beginnen, um sowohl http als auch https zu unterstuetzen
      $scope.videoUrl = '//www.youtube.com/embed/' + $scope.tuneVideoCode;
    };
  }
]);
'use strict';
/**
 * Controller for tunevideos Template
 */
angular.module('eTuneBookApp').controller('tunevideosCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function ($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
    // Get current tune
    $scope.intTuneId = $stateParams['intTuneId'];
    $scope.tune = eTuneBookService.getTune($scope.intTuneId);
    $scope.$parent.currentState = 'Videos';
    $scope.tuneVideos = $scope.tune.videos;
    $scope.tuneVideosSelected = [];
    $scope.tuneVideoList = {
      data: 'tuneVideos',
      selectedItems: $scope.tuneVideosSelected,
      multiSelect: false,
      afterSelectionChange: function () {
        if ($scope.tuneVideosSelected.length > 0) {
          $state.transitionTo('tunevideo', {
            intTuneId: $scope.intTuneId,
            source: $scope.tuneVideosSelected[0].source,
            code: $scope.tuneVideosSelected[0].code
          });
        }
      },
      enableCellSelection: true,
      enableRowSelection: true,
      enableCellEditOnFocus: true,
      columnDefs: [
        {
          field: 'code',
          displayName: 'Code',
          enableCellEdit: true,
          editableCellTemplate: '<input ng-model="COL_FIELD" ng-blur="storeTuneBook()"/>',
          width: '25%'
        },
        {
          field: 'description',
          displayName: 'Description',
          enableCellEdit: true,
          editableCellTemplate: '<input ng-model="COL_FIELD" ng-blur="storeTuneBook()"/>',
          width: '60%'
        },
        {
          field: '',
          cellTemplate: '<button class="btn btn-xs btn-default" ng-click="deleteVideo(row)"><i class="glyphicon glyphicon-trash" title="Delete Video"></i></button>',
          enableCellEdit: false,
          width: '10%'
        }
      ]
    };
    /*
    if($scope.tuneVideos.length == 0){
        $state.transitionTo('tunevideo', {intTuneId: $scope.intTuneId, source: "ytube", code: ""});
    } else {
        $scope.tuneVideosSelected.push($scope.tuneVideos[0]);
        $state.transitionTo('tunevideo', {intTuneId: $scope.intTuneId, source: $scope.tuneVideosSelected[0].source, code: $scope.tuneVideosSelected[0].code});
    }
    */
    $scope.deleteVideo = function (row) {
      //Delete Video
      eTuneBookService.deleteVideo($scope.intTuneId, row.entity.source, row.entity.code);
      //Generate TuneBook-Abc and save it to localStorage
      eTuneBookService.storeTuneBookAbc();
    };
    //TODO:
    //editableCellTemplate wird gebraucht um mit ng-blur in storeTuneBook zu verzweigen.
    //editableCellTemplate bewirkt aber, dass mit ng-blur das Input-Feld nicht korrekt zurückgesetzt wird.
    //ng-grid Problem?
    $scope.storeTuneBook = function () {
      //Generate TuneBook-Abc and save it to localStorage
      // (jedesmal wenn ein Feld verlassen wird, egal ob was geändert hat oder nicht)
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.newVideo = function () {
      eTuneBookService.addVideo($scope.intTuneId, 'ytube', '', '');  //gespeichert (localStorage) wird erst nach erster Eingabe
    };
  }
]);
angular.module('eTuneBookApp').directive('ngBlur', function () {
  return function (scope, elem, attrs) {
    elem.bind('blur', function () {
      scope.$apply(attrs.ngBlur);
    });
  };
});
/**
 * A generic confirmation for risky actions.
 * Usage: Add attributes: ng-really-message="Are you sure"? ng-really-click="takeAction()" function
 * Source: https://gist.github.com/asafge/7430497 and http://stackoverflow.com/questions/15420935/create-a-confirmation-alert-for-delete-button-in-angular-using-js
 */
angular.module('eTuneBookApp').directive('ngReallyClick', [function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('click', function () {
          var message = attrs.ngReallyMessage;
          if (message && confirm(message)) {
            scope.$apply(attrs.ngReallyClick);
          }
        });
      }
    };
  }]);
'use strict';
/**
 * Directive that renders sample Abc (first few bars) when the expression it binds to evaluates to true. 
 */
angular.module('eTuneBookApp').directive('renderSampleAbc', [
  '$timeout',
  function ($timeout) {
    return function (scope, elem, attrs) {
      var currentScope = angular.element(elem).scope();
      scope.showSampleDots(currentScope.tune);
    };
  }
]);
'use strict';
/**
 * Directive that executes resizing of the element it is applied to.
 */
angular.module('eTuneBookApp').directive('resize', [
  '$window',
  function ($window) {
    return function (scope, element) {
      var w = angular.element($window);
      scope.getWindowDimensions = function () {
        return {
          'h': w.height(),
          'w': w.width()
        };
      };
      scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
        scope.windowHeight = newValue.h;
        scope.windowWidth = newValue.w;
        scope.style = function () {
          return {
            'height': newValue.h - 100 + 'px',
            'width': newValue.w - 100 + 'px'
          };
        };
      }, true);
      w.bind('resize', function () {
        scope.$apply();
      });
    };
  }
]);
'use strict';
/**
 *
 */
angular.module('eTuneBookApp').directive('tbkAbcElementChange', [
  'eTuneBookService',
  function (eTuneBookService) {
    return {
      require: '?ngModel',
      link: function (scope, element, attr, ngModel) {
        scope.$on('chordChange', function (event, chordOption) {
          if (scope.abcSelection.abcNoteElement.chordSymbol.startSignIndex == undefined) {
            // Generate Chord
            // Insert Chord on abcNoteElement
            scope.abcSelection.abcNoteElement.addChord(chordOption.abc);
            // Insert Chord in Textarea
            var abc = element[0].value.slice(0, scope.abcSelection.abcNoteElement.chordSymbol.startSignIndex);
            abc = abc + '"' + chordOption.abc + '"';
            abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.chordSymbol.startSignIndex);
          } else {
            if (chordOption.abc == '--') {
              // Delete Chord
              // Delete Chord in Textarea
              var abc = element[0].value.slice(0, scope.abcSelection.abcNoteElement.chordSymbol.startSignIndex);
              abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.chordSymbol.endSignIndex + 1);
              // Delete Chord on abcNoteElement
              scope.abcSelection.abcNoteElement.deleteChord();
            } else {
              // Change Chord
              // Change Chord in Textarea
              var abc = element[0].value.slice(0, scope.abcSelection.abcNoteElement.chordSymbol.startSignIndex);
              abc = abc + '"' + chordOption.abc + '"';
              abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.chordSymbol.endSignIndex + 1);
              // Change Chord on abcNoteElement
              scope.abcSelection.abcNoteElement.changeChord(chordOption.abc);
            }
          }
          update(abc);
        });
        scope.$on('fingerChange', function (event, fingerOption) {
          if (scope.abcSelection.abcNoteElement.finger.index == undefined) {
            // Generate Fingering
            // Insert Finger on abcNoteElement
            scope.abcSelection.abcNoteElement.addFinger(fingerOption.abc);
            // Insert Finger in Textarea
            var abc = element[0].value.slice(0, scope.abcSelection.abcNoteElement.finger.startSignIndex);
            abc = abc + '!' + fingerOption.abc + '!';
            abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.finger.startSignIndex);
          } else {
            if (fingerOption.abc == '--') {
              // Delete Fingering
              // Delete Finger in Textarea
              var abc = element[0].value.slice(0, scope.abcSelection.abcNoteElement.finger.startSignIndex);
              //start-!
              abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.finger.endSignIndex + 1);
              //end-!
              // Delete Finger on abcNoteElement
              scope.abcSelection.abcNoteElement.deleteFinger();
            } else {
              // Change Fingering
              // Change Finger in Textarea
              var abc = element[0].value.slice(0, scope.abcSelection.abcNoteElement.finger.index);
              abc = abc + fingerOption.abc;
              abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.finger.index + 1);
              // Change Finger on abcNoteElement
              scope.abcSelection.abcNoteElement.changeFinger(fingerOption.abc);
            }
          }
          update(abc);
        });
        scope.$on('accidentalChange', function (event, accidentalOption) {
          if (scope.abcSelection.abcNoteElement.accidental.startIndex == undefined) {
            // Generate Accidental
            // Insert Accidental on abcNoteElement
            scope.abcSelection.abcNoteElement.addAccidental(accidentalOption.abc);
            // Insert Accidental in Textarea
            var abc = element[0].value.slice(0, scope.abcSelection.abcNoteElement.accidental.startIndex);
            abc = abc + accidentalOption.abc;
            abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.accidental.startIndex);
          } else {
            if (accidentalOption.abc == '--') {
              // Delete Accidental
              // Delete Accidental in Textarea
              var abc = element[0].value.slice(0, scope.abcSelection.abcNoteElement.accidental.startIndex);
              abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.accidental.endIndex + 1);
              // Delete Accidental on abcNoteElement
              scope.abcSelection.abcNoteElement.deleteAccidental();
            } else {
              // Change Accidental
              // Change Accidental in Textarea
              var abc = element[0].value.slice(0, scope.abcSelection.abcNoteElement.accidental.startIndex);
              abc = abc + accidentalOption.abc;
              abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.accidental.endIndex + 1);
              // Change Accidental on abcNoteElement
              scope.abcSelection.abcNoteElement.changeAccidental(accidentalOption.abc);
            }
          }
          update(abc);
        });
        scope.$on('noteChange', function (event, noteOption) {
          if (scope.abcSelection.abcNoteElement.note.index == undefined) {
          } else {
            if (noteOption.abc == '--') {
              // Delete Note
              // Delete Note in Textarea
              //var abc = element[0].value.slice(0,scope.abcSelection.abcNoteElement.note.index);
              //abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.note.index + 1);
              // Delete Note on abcNoteElement
              //scope.abcSelection.abcNoteElement.deleteNote();
              alert('Note cannot be deleted!');
              // Zurückstellen auf ursprüngliche Note
              scope.selectNoteOptions(scope.abcSelection.abcNoteElement.note.abc);
            } else {
              // Change Note
              // Change Note in Textarea
              var abc = element[0].value.slice(0, scope.abcSelection.abcNoteElement.note.index);
              abc = abc + noteOption.abc;
              abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.note.index + 1);
              // Change Note on abcNoteElement
              scope.abcSelection.abcNoteElement.changeNote(noteOption.abc);
              update(abc);
            }
          }
        });
        scope.$on('octaveChange', function (event, octaveOption) {
          if (scope.abcSelection.abcNoteElement.octave.startIndex == undefined) {
            // Generate Octave
            // Insert Octave on abcNoteElement
            scope.abcSelection.abcNoteElement.addOctave(octaveOption.abc);
            // Insert Octave in Textarea
            var abc = element[0].value.slice(0, scope.abcSelection.abcNoteElement.octave.startIndex);
            abc = abc + octaveOption.abc;
            abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.octave.startIndex);
          } else {
            if (octaveOption.abc == '--') {
              // Delete Octave
              // Delete Octave in Textarea
              var abc = element[0].value.slice(0, scope.abcSelection.abcNoteElement.octave.startIndex);
              abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.octave.endIndex + 1);
              // Delete Octave on abcNoteElement
              scope.abcSelection.abcNoteElement.deleteOctave();
            } else {
              // Change Octave
              // Change Octave in Textarea
              var abc = element[0].value.slice(0, scope.abcSelection.abcNoteElement.octave.startIndex);
              abc = abc + octaveOption.abc;
              abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.octave.endIndex + 1);
              // Change octave on abcNoteElement
              scope.abcSelection.abcNoteElement.changeOctave(octaveOption.abc);
            }
          }
          update(abc);
        });
        scope.$on('noteLengthChange', function (event, noteLengthOption) {
          if (scope.abcSelection.abcNoteElement.noteLength.startIndex == undefined) {
            // Generate NoteLength
            // Insert NoteLength on abcNoteElement
            scope.abcSelection.abcNoteElement.addNoteLength(noteLengthOption.abc);
            // Insert NoteLength in Textarea
            var abc = element[0].value.slice(0, scope.abcSelection.abcNoteElement.noteLength.startIndex);
            abc = abc + noteLengthOption.abc;
            abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.noteLength.startIndex);
          } else {
            if (noteLengthOption.abc == '--') {
              // Delete NoteLength
              // Delete NoteLength in Textarea
              var abc = element[0].value.slice(0, scope.abcSelection.abcNoteElement.noteLength.startIndex);
              abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.noteLength.endIndex + 1);
              // Delete NoteLength on abcNoteElement
              scope.abcSelection.abcNoteElement.deleteNoteLength();
            } else {
              // Change NoteLength
              // Change NoteLength in Textarea
              var abc = element[0].value.slice(0, scope.abcSelection.abcNoteElement.noteLength.startIndex);
              abc = abc + noteLengthOption.abc;
              abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.noteLength.endIndex + 1);
              // Change NoteLength on abcNoteElement
              scope.abcSelection.abcNoteElement.changeNoteLength(noteLengthOption.abc);
            }
          }
          update(abc);
        });
        function update(abc) {
          //Trigger dots redraw
          element[0].value = abc;
          element.change();
          //Trigger model update and save
          ngModel.$setViewValue(abc);
          eTuneBookService.storeTuneBookAbc();
        }
      }
    };
  }
]);
'use strict';
/**
 * Directive that executes an expression when whithin the textarae it is applied to has emitted a text selection event.
 */
angular.module('eTuneBookApp').directive('tbkAbcElementSelect', function () {
  return function (scope, elem, attrs) {
    elem.bind('select selectionchange focus', function (evt) {
      // Abc-Element was highlighted by script (see window.ABCJS.Editor.prototype.highlight) or by user (possible only in Tune-Edit-Modus)
      // Chrome on Windows 7 gets here first due to 'focus' and then due to 'select'.
      // Firefox on Windows 7, Chrome on iPad, Safari on iPad do not get here due 'select'.
      // Firefox on Windows 7 gets here due to 'focus'
      // 'selectionchange' is for IE
      if (scope.noteEditModus) {
        //Todo: Chrome on Windows 7 kommt hier zweimal durch (focus und select) -> rausfiltern.
        scope.doneSelecting(evt.target.value, evt.target.selectionStart, evt.target.selectionEnd);
        elem.blur();
        // needed for Chrome, Safari on iOS7 to update options after clicking a new note
        scope.$apply();
      }
    });
  };
});
'use strict';
/**
 * Directive that attaches jquery.colorpicker.js to the element (text-input). The element itself gets hidden and replaced by the div with class colorPicker-picker.
 */
angular.module('eTuneBookApp').directive('tbkColorselect', function () {
  return function (scope, element, attrs) {
    element.colorPicker({
      onColorChange: function (id, newValue) {
        var currentScope = angular.element(this).scope();
        currentScope.tune.color = newValue;
        scope.putTuneBookToLocalStorage();
        //scope.refreshColorFilter();
        // notify angular of the change
        scope.$apply();
      }
    });
  };
});
'use strict';
/**
 * If the choosen File has changed: Read the new File and import it to eTuneBook.
 */
angular.module('eTuneBookApp').directive('tbkFileSelect', function () {
  return function (scope, elem, attrs) {
    elem.bind('change', function (evt) {
      var files = evt.target.files;
      // FileList object
      // files is a FileList of File objects
      for (var i = 0, f; f = files[i]; i++) {
        var fileName = escape(f.name);
        //Get file extension from fileName
        var ext = fileName.replace(/^.*?\.([a-zA-Z0-9]+)$/, '$1');
        if (ext != 'abc' && ext != 'ABC') {
          alert('eTuneBook only accepts files with extension .abc or .ABC');
        } else {
          // Only process abc files
          var reader = new FileReader();
          // Closure to capture the file information.
          reader.onload = function (theFile) {
            return function (e) {
              // Render TuneBook
              var abc = this.result;
              try {
                // import tunebook
                scope.importTuneBook(abc, fileName);
              } catch (e) {
                alert('eTuneBook cannot import ' + fileName + ' due to: ' + e.toString());
              } finally {
                // notify angular of the change
                scope.$apply();
              }
            };
          }(f);
          // Read the File
          reader.readAsText(f, 'ISO-8859-1');
        }
      }
    });
  };
});
'use strict';
/**
 * Delegation of a click-Event to the fileInput-Element. Clicking on the fileInput-Element opens the Explorer for choosing a file.
 */
angular.module('eTuneBookApp').directive('tbkFileSelectDelegate', function () {
  return function (scope, elem, attrs) {
    elem.bind('click', function (evt) {
      var fileElem = document.getElementById('fileInput');
      fileElem.click();
    });
  };
});
'use strict';
/**
 * Directive that renders sample Abc (first few bars) when the expression it binds to evaluates to true. 
 */
angular.module('eTuneBookApp').directive('tbkShowSampleAbc', [
  '$timeout',
  function ($timeout) {
    return function (scope, elem, attrs) {
      scope.$watch(attrs.tbkShowSampleAbc, function (editing) {
        if (!editing) {
          var currentScope = angular.element(elem).scope();
          scope.showSampleDots(currentScope.tuneSetPosition);
        }
      });
    };
  }
]);
'use strict';
/**
 * Directive that executes an expression when the element it is applied to loses focus.
 */
angular.module('eTuneBookApp').directive('tbkTuneBlur', function () {
  return function (scope, elem, attrs) {
    elem.bind('blur', function () {
      scope.$apply(attrs.tbkTuneBlur);
    });
  };
});
'use strict';
/**
 * Cut away ,The at the end of the String
 */
angular.module('eTuneBookApp').filter('eliminateThe', function () {
  return function (string) {
    var theSplits = [];
    if (string != 'undefined' && string != null) {
      theSplits = string.split(',');
    }
    return theSplits[0];
  };
});
'use strict';
/**
 * Filter that calculates how old a date is.
 */
angular.module('eTuneBookApp').filter('fromNow', function () {
  return function (date) {
    var result = '';
    //var initDate = moment("1966-04-05T22:00", "YYYY-MM-DDTHH:mm").toDate();
    // if (moment(date).diff(initDate) != 0) {
    // result = moment(date).fromNow();
    // }
    if (date != null) {
      result = moment(date).fromNow();
    }
    return result;
  };
});
'use strict';
/**
 * Returns eTuneBookService (=window.eTBk) which holds the current TuneBook and the eTuneBook Business Logic
 * TODO: Only Reason, why eTBk is currently stored as a global variable on window: Directives need to have access to eTBk Constants.
 */
angular.module('eTuneBookApp').factory('eTuneBookService', function () {
  //eTBk-Module
  // eTuneBook Model					abc								        description
  // tuneBook
  //		name						%%etbk:bname					        Book-Name (if directive is empty, name is taken from File-Name on load from local File System), set 'New TuneBook' when new
  //		version						%%etbk:bvers					        Book-Version
  //		description					%%etbk:bdesc					        Book-Description
  //		header						-								        ABCJS.TuneBook.header
  //		tuneSets
  //			tuneSetId				see %%etbk:tnset
  //			tuneSetName				see %%etbk:tnset                        name of first tune
  //			tuneSetPositions
  //				tune				-								        ABCJS.TuneBook.tunes.tune[i]
  //				    intTuneId 		-								        internal key managed by TuneBookEditor (tuneId in abc can be screwed up by the user)
  //					pure			'from X: to next X:'			        ABCJS.TuneBook.tunes.tune[i].pure
  //																	        extracts from pure (for the view):
  //					id				X:
  //					title			T:
  //					type			R:
  //					key				K:
  //																	        eTuneBook-specific fields:
  //					videos	    	%%etbk:video					        src:<source>,cde:<code>,desc:<description>
  //                     source
  //                     code
  //                     description
  //					wsites	    	%%etbk:wsite					        url:<url>
  //					annotation		%%etbk:annot					        comment
  //					color			%%etbk:color					        hex-color of the tune
  //					skill			%%etbk:skill					        for filtering, 1= hardly know the tunes --- 6 = absolute Master
  //					lastModified	H: (Modified)					        last modification date (Javascript Date Object)
  //					lastPlayed		-								        last played date (Javascript Date Object) of playDates
  //			        frequencyPlayed	-								        Score calculated on the basis of playDates
  //					playDates		%%etbk:pldat					        <YYYY-MM-DDTHH:mm>,<YYYY-MM-DDTHH:mm>,<YYYY-MM-DDTHH:mm>....
  //						playDate
  //									%%etbk:tnset					        id:<tuneSetId>,pos:<position>,rep:<repeat>,ant:<annotation>
  //
  //				tuneSetId											        key of tuneSet
  //				position 											        position within the tuneSet. (index + 1)
  //				repeat 												        repetition within the tuneSet. (default: 3)
  //              annotation                                                  optional comment
  //
  //          playlists                                                       Playlist Definition. Since 1.2.0. Im Header
  //              playlist            %%etbk:plldf                            id:<playListId>,name:<playListName>,evt:<playListEvent>,band:<playListBand>,vnue:<playListVenue>
  //			        id           		see %%etbk:plldf
  //			        name               	see %%etbk:plldf                    'Schmitte Steffisburg', 'Bären Biglen', 'Thunfest',...
  //			        event           	see %%etbk:plldf                    'Set-Dance', 'Ceili', 'Session', 'Concert', 'Wedding', 'Christmas Party', 'Birth Day Party'
  //			        band        	  	see %%etbk:plldf                    'Toe for Toe', 'Scealta', 'Hibernia', 'Solo', ...
  //			        playlistPositions 	                                    Playlist Position. Since 1.2.0. Im Header
  //                      playlistPosition    %%etbk:pllps                    id:<playListId>,pos:<position>,tnset:<tuneSetId>,name:<name>,ant:<annotation>
  //			                playlistId 	 	see %%etbk:pllps
  //			                tuneSet 	 	see %%etbk:pllps
  //			                name 	 	    see %%etbk:pllps                rename TuneSet
  //			                position 	 	see %%etbk:pllps
  //			                annotation 	 	see %%etbk:pllps
  //
  //			 tunesetPositionPlayInfos 	                                    TunesetPosition Play Infos. Since 1.2.1. Im Header
  //                                                                          Optional (not every TunesetPosition needs to have a tunePlayInfo)
  //			    tunesetPositionPlayInfo                 %%etbk:plltp        pll:<playListId>,pllpos:<position>,tnset:<tuneSetId>,tnsetpos:<position>,rep:<repeat>,arr:{<part(n)>:<info(n)>,<part(n+1)>:<info(n+1)>;...},ant:<annotation>
  //                  playlistPosition                    see %%etbk:plltp    (pll:<playListId>,pllpos:<position>)
  //                  tuneSetPosition                     see %%etbk:plltp    (tnset:<tuneSetId>,tnsetpos:<position>)
  //				    repeat 				                see %%etbk:plltp	overrides repeat of tunesetPosition
  //                  partPlayInfos                       see %%etbk:plltp
  //                      part                                                'Intro' oder '1A' or '1A1' , ...
  //                      playInfo                                            'All' oder '+Gui' oder 'Acc + Fid', ....
  //                  annotation                          see %%etbk:plltp    overrides annotation of tunesetPosition
  // Immediately invoked function expression in order to build the eTBk module
  // Inspired by: http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
  //noinspection JSUnusedLocalSymbols
  var eTBkModule = function (eTBk) {
      //Private Variables
      var eTBK_STORAGE_ID_TUNEBOOK = 'etbk-tuneBook';
      var eTBK_STORAGE_ID_SETTINGS = 'etbk-settings';
      var eTBK_VERSION = '1.2.3';
      var ABC_VERSION = '2.1';
      //var eTBK_DEFAULT_COLOR = "#E0F0F0";
      var eTBK_DEFAULT_COLOR = '#F5F5F5';
      var eTBK_DEFAULT_MODIFICATIONDATE_STRING = '1966-04-05T22:00';
      var eTBK_PATTERN_FINGER = /!\d!/g;
      //matches !<number>! globally (every occurence)
      var eTBk_EXAMPLE_FILENAME = 'Irish Tunes - Martin Fleischmann.abc';
      var eTBk_EXAMPLE_FILENAME_WITHOUTABC = 'Irish Tunes - Martin Fleischmann';
      var eTBk_EXAMPLE_VERSION = '2014-08-03';
      var currentTuneBook;
      //Private Methods
      // TuneBook Constructor
      var TuneBook = function (abc) {
        var This = this;
        // split the file into individual tunes.
        var book = new ABCJS.TuneBook(abc);
        // TuneBook-Header zwischenspeichern
        This.header = book.header;
        // TuneBook-Name aus Header lesen
        This.name = getAbcValue(This.header, '%%etbk:bname ', '');
        // TuneBook-Version aus Header lesen
        This.version = getAbcValue(This.header, '%%etbk:bvers ', '');
        // TuneBook-Beschreibung aus Header lesen
        This.description = getAbcValue(This.header, '%%etbk:bdesc ', '');
        This.tuneSets = extractTuneSets(book);
        //TuneSets zuerst, weil Playlists auf TuneSets referenzieren
        This.playlists = extractPlaylists(This);
        extractPlaylistPositions(This);
        This.tuneSetPositionPlayInfos = extractTuneSetPositionPlayInfos(This);
      };
      function extractPlaylists(tuneBook) {
        // Generate Playlists from the book.
        var playlists, playlistDefinitionDirectives;
        playlists = [];
        playlistDefinitionDirectives = getAbcValues(tuneBook.header, '%%etbk:plldf ');
        if (playlistDefinitionDirectives.length > 0) {
          for (var y = 0; y < playlistDefinitionDirectives.length; y++) {
            // Get Playlist Definition
            var playlistId = getPlaylistId(playlistDefinitionDirectives[y]);
            var playlistName = getPlaylistName(playlistDefinitionDirectives[y]);
            var playlistEvent = getPlaylistEvent(playlistDefinitionDirectives[y]);
            var playlistBand = getPlaylistBand(playlistDefinitionDirectives[y]);
            // Generate Playlist
            var playlist = [];
            playlist = createPlaylist(playlistId, playlistName, playlistEvent, playlistBand);
            playlists.push(playlist);
          }
        }
        return playlists;
      }
      function extractPlaylistPositions(tuneBook) {
        // Generate PlaylistPositions from the book.
        var playlistPositionDirectives;
        playlistPositionDirectives = getAbcValues(tuneBook.header, '%%etbk:pllps ');
        if (playlistPositionDirectives.length > 0) {
          for (var z = 0; z < playlistPositionDirectives.length; z++) {
            // Get Playlist Positions
            var playlistId = getPlaylistId(playlistPositionDirectives[z]);
            var position = getPlaylistPositionPosition(playlistPositionDirectives[z]);
            var tuneSetId = getPlaylistPositionTuneSetId(playlistPositionDirectives[z]);
            var name = getPlaylistPositionName(playlistPositionDirectives[z]);
            var annotation = getPlaylistPositionAnnotation(playlistPositionDirectives[z]);
            var tuneSet = getTuneSetById(tuneBook, tuneSetId);
            if (name == '') {
              //Default-Name of PlaylistPosition = Name of TuneSet = Name of first tune
              name = eliminateThe(tuneSet.tuneSetName);
              name += ' Set';
            }
            // Generate PlaylistPosition
            var playlistPosition = createPlaylistPosition(playlistId, position, tuneSet, name, annotation);
            // Add PlaylistPosition to Playlist
            var playlist = getPlaylistById(tuneBook, playlistId);
            playlist.addPlaylistPosition(playlistPosition);
          }
        }
      }
      function extractTuneSetPositionPlayInfos(tuneBook) {
        // Generate TuneSetPositionPlayInfos from the book.
        var tuneSetPositionPlayInfoDirectives, playlistId, playlistPositionNr, tuneSetId, tuneSetPositionNr, repeat, partPlayInfoDirective, annotation, partPlayInfos, tuneSetPositionPlayInfo, playlistPosition, tuneSetPosition, tuneSetPositionPlayInfos;
        tuneSetPositionPlayInfoDirectives = getAbcValues(tuneBook.header, '%%etbk:plltp ');
        tuneSetPositionPlayInfos = [];
        if (tuneSetPositionPlayInfoDirectives.length > 0) {
          for (var z = 0; z < tuneSetPositionPlayInfoDirectives.length; z++) {
            // Get TuneSetSetPositionPlayInfo
            playlistId = getSubDirective(tuneSetPositionPlayInfoDirectives[z], 'pll:', ',');
            playlistPositionNr = getSubDirective(tuneSetPositionPlayInfoDirectives[z], 'pllpos:', ',');
            tuneSetId = getSubDirective(tuneSetPositionPlayInfoDirectives[z], 'tnset:', ',');
            tuneSetPositionNr = getSubDirective(tuneSetPositionPlayInfoDirectives[z], 'tnsetpos:', ',');
            repeat = getSubDirective(tuneSetPositionPlayInfoDirectives[z], 'rep:', ',');
            partPlayInfoDirective = getSubDirective(tuneSetPositionPlayInfoDirectives[z], 'arr:{', '}');
            partPlayInfos = extractPartPlayInfos(partPlayInfoDirective);
            annotation = getSubDirective(tuneSetPositionPlayInfoDirectives[z], 'ant:', ',');
            playlistPosition = getPlaylistPosition(tuneBook, playlistId, playlistPositionNr);
            tuneSetPosition = getTuneSetPositionByPosition(playlistPosition.tuneSet, tuneSetPositionNr);
            // Generate tuneSetPositionPlayInfo
            tuneSetPositionPlayInfo = createTuneSetPositionPlayInfo(playlistPosition, tuneSetPosition, repeat, partPlayInfos, annotation);
            tuneSetPositionPlayInfos.push(tuneSetPositionPlayInfo);
          }
        }
        return tuneSetPositionPlayInfos;
      }
      function extractPartPlayInfos(partPlayInfoDirective) {
        var partPlayInfosSplits, partPlayInfoSplits, part, playInfo, partPlayInfos, partPlayInfo;
        partPlayInfosSplits = partPlayInfoDirective.split(',');
        partPlayInfos = [];
        if (partPlayInfosSplits.length > 0) {
          for (var z = 0; z < partPlayInfosSplits.length; z++) {
            // Get PartPlayInfo
            partPlayInfoSplits = partPlayInfosSplits[z].split(':');
            if (partPlayInfoSplits.length == 2) {
              part = partPlayInfoSplits[0];
              playInfo = partPlayInfoSplits[1];
              // Generate partPlayInfo
              partPlayInfo = createPartPlayInfo(part, playInfo);
              partPlayInfos.push(partPlayInfo);
            }
          }
        }
        return partPlayInfos;
      }
      function extractTuneSets(book) {
        // Generate TuneSets from the book.
        var allTuneSetPositions = [];
        var tunesWithoutTuneSetDirective = [];
        var tuneSetDirectives = [];
        var tuneSets = [];
        var intTuneSetId = 1;
        var intTuneId = 1;
        // Generate TuneSetPositions
        for (var i = 0; i < book.tunes.length; i++) {
          var tune = book.tunes[i];
          tuneSetDirectives = [];
          tuneSetDirectives = getAbcValues(tune.pure, '%%etbk:tnset ');
          if (tuneSetDirectives.length > 0) {
            // Tune that was exported from eTuneBook
            // The tune can have one or more tuneSetDirective
            extractEtbkFields(tune);
            tune.intTuneId = intTuneId;
            for (var y = 0; y < tuneSetDirectives.length; y++) {
              // Get tuneSetId, position, repeat
              var tuneSetId = getTuneSetId(tuneSetDirectives[y]);
              var position = getTuneSetTunePosition(tuneSetDirectives[y]);
              var repeat = getTuneSetTuneRepeat(tuneSetDirectives[y]);
              var annotation = getTuneSetTuneAnnotation(tuneSetDirectives[y]);
              // Generate tuneSetPosition
              var tuneSetPosition = [];
              tuneSetPosition = createTuneSetPosition(tuneSetId, tune, position, repeat, annotation);
              allTuneSetPositions.push(tuneSetPosition);
            }
            intTuneId++;
          } else {
            // Zwischenspeichern und sp�ter aufgrund der dynamisch ermittelten maxTuneSetId generieren 
            // Entweder Fehlerfall (wenn eTuneBook, dann muss in jedem Tune ein TuneSet-Directive stehen)
            // Oder TuneBook, dass noch nie durch eTuneBook gespeichert wurde.
            tunesWithoutTuneSetDirective.push(tune);
          }
        }
        // Sort TuneSetPositions by TuneSetId
        allTuneSetPositions.sort(function (a, b) {
          return a.tuneSetId - b.tuneSetId;
        });
        // Generate TuneSets from Tunes with TuneSetDirectives
        var wTuneSetId = 0;
        for (var i = 0; i < allTuneSetPositions.length; i++) {
          if (wTuneSetId !== allTuneSetPositions[i].tuneSetId) {
            // First TuneSetPosition of new tuneSetId
            wTuneSetId = allTuneSetPositions[i].tuneSetId;
            var tuneSet = [];
            var tuneSetName = '';
            var tuneSetPositions = [];
            // Get all tuneSetPositions for wTuneSetId
            for (var z = 0; z < allTuneSetPositions.length; z++) {
              var tuneSetPosition = allTuneSetPositions[z];
              if (wTuneSetId == tuneSetPosition.tuneSetId) {
                tuneSetPositions.push(tuneSetPosition);
                if (tuneSetPosition.position == '1') {
                  //Name of TuneSet = Name of first tune
                  tuneSetName = eliminateThe(tuneSetPosition.tune.title);
                  tuneSetName += ' Set';
                }
                tuneSetPosition.tune.frequencyPlayed = calculateFrequencyPlayed(tuneSetPosition.tune.playDates);
              }
            }
            tuneSet = createTuneSet(wTuneSetId, tuneSetName, tuneSetPositions);
            tuneSets.push(tuneSet);
          }
        }
        // Generate TuneSets from tunesWithoutTuneSetDirective
        // Get next free TuneSetId
        wTuneSetId++;
        for (var i = 0; i < tunesWithoutTuneSetDirective.length; i++) {
          var tuneSet = [];
          var tuneSetType = '';
          var frequencyPlayed = 0;
          var tuneSetPositions = [];
          var tuneSetPosition = [];
          var tune = tunesWithoutTuneSetDirective[i];
          extractEtbkFields(tune);
          tune.intTuneId = intTuneId;
          //setTuneSetDirective(tune, wTuneSetId, 1, 3);				
          tuneSetPosition = createTuneSetPosition(wTuneSetId, tune, 1, '3x', '');
          tuneSetPositions.push(tuneSetPosition);
          tuneSet = createTuneSet(wTuneSetId, tune.title, tuneSetPositions);
          tuneSets.push(tuneSet);
          intTuneId++;
          wTuneSetId++;
        }
        return tuneSets;
      }
      function extractEtbkFields(tune) {
        //Extract eTuneBook-specific fields and purify Abc
        var tuneSplits = tune.pure.split('\n');
        tune.pure = '';
        var newAbc = '';
        var isStandardAbc = true;
        var beginOfLine = '';
        tune.type = 'undefined';
        tune.key = 'undefined';
        tune.videos = [];
        tune.wsites = [];
        tune.annotation = '';
        tune.color = eTBK_DEFAULT_COLOR;
        tune.skill = '?';
        tune.playDates = [];
        //tune.lastModified = moment(eTBK_DEFAULT_MODIFICATIONDATE_STRING, "YYYY-MM-DDTHH:mm").toDate();
        tune.lastModified = null;
        for (var i = 0; i < tuneSplits.length; i++) {
          beginOfLine = '';
          isStandardAbc = true;
          // Abc-Standard
          beginOfLine = tuneSplits[i].substring(0, 2);
          if (beginOfLine.length > 1) {
            if (beginOfLine == 'R:') {
              tune.type = getAbcValueOfTuneLine(tuneSplits[i], 'R:', 'undefined').toLowerCase();
            } else if (beginOfLine == 'K:') {
              tune.key = getAbcValueOfTuneLine(tuneSplits[i], 'K:', 'undefined');
            } else if (beginOfLine == 'H:') {
              var tuneModificationString = getAbcValueOfTuneLine(tuneSplits[i], 'Modified ', 'undefined');
              if (tuneModificationString != 'undefined') {
                tuneModificationString = tuneModificationString + 'T22:00';
                tune.lastModified = moment(tuneModificationString, 'YYYY-MM-DDTHH:mm').toDate();
              }
            }
          }
          // eTuneBook-specific
          beginOfLine = tuneSplits[i].substring(0, 12);
          if (beginOfLine.length > 1) {
            if (beginOfLine == '%%etbk:tnset') {
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:tube1') {
              //Old youTube directive. Deprecated.
              //tune.youTube1 = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:tube1 ", "");
              tune.videos.push(createVideo('ytube', getAbcValueOfTuneLine(tuneSplits[i], '//www.youtube.com/embed/', ''), ''));
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:tube2') {
              //Old youTube directive. Deprecated.
              //tune.youTube2 = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:tube2 ", "");
              tune.videos.push(createVideo('ytube', getAbcValueOfTuneLine(tuneSplits[i], '//www.youtube.com/embed/', ''), ''));
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:tube3') {
              //Old youTube directive. Deprecated.
              //tune.youTube3 = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:tube3 ", "");
              tune.videos.push(createVideo('ytube', getAbcValueOfTuneLine(tuneSplits[i], '//www.youtube.com/embed/', ''), ''));
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:video') {
              tune.videos.push(getVideoFromDirective(getAbcValueOfTuneLine(tuneSplits[i], '%%etbk:video ', '')));
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:site1') {
              //Old site1 directive. Deprecated.
              //tune.site1 = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:site1 ", "");
              tune.wsites.push(createWebsite(getAbcValueOfTuneLine(tuneSplits[i], '%%etbk:site1 ', '')));
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:site2') {
              //Old site2 directive. Deprecated.
              //tune.site2 = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:site2 ", "");
              tune.wsites.push(createWebsite(getAbcValueOfTuneLine(tuneSplits[i], '%%etbk:site2 ', '')));
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:site3') {
              //Old site3 directive. Deprecated.
              //tune.site3 = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:site3 ", "");
              tune.wsites.push(createWebsite(getAbcValueOfTuneLine(tuneSplits[i], '%%etbk:site3 ', '')));
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:wsite') {
              tune.wsites.push(createWebsite(getAbcValueOfTuneLine(tuneSplits[i], '%%etbk:wsite ', '')));
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:annot') {
              tune.annotation = getAbcValueOfTuneLine(tuneSplits[i], '%%etbk:annot ', '');
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:color') {
              tune.color = getAbcValueOfTuneLine(tuneSplits[i], '%%etbk:color ', eTBK_DEFAULT_COLOR);
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:skill') {
              tune.skill = getAbcValueOfTuneLine(tuneSplits[i], '%%etbk:skill ', '');
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:pldat') {
              var playDatesString = getAbcValueOfTuneLine(tuneSplits[i], '%%etbk:pldat ', '');
              tune.playDates = getPlayDates(playDatesString);
              isStandardAbc = false;
            }
          }
          if (isStandardAbc) {
            newAbc = newAbc + tuneSplits[i];
            newAbc = newAbc + '\n';
          }
        }
        // Purified Abc setzen
        tune.pure = newAbc;
        // LastPlayed setzen auf Tune (f�r View)
        tune.lastPlayed = getTuneLastPlayed(tune.playDates);
      }
      function initializeTuneViewFields(tune) {
        tune.type = '';
        tune.key = '';
        tune.videos = [];
        tune.wsites = [];
        tune.annotation = '';
        tune.color = eTBK_DEFAULT_COLOR;
        tune.skill = '';
        tune.playDates = [];
        tune.lastPlayed = getTuneLastPlayed(tune.playDates);
        tune.lastModified = moment(eTBK_DEFAULT_MODIFICATIONDATE_STRING, 'YYYY-MM-DDTHH:mm').toDate();
      }
      function calculateFrequencyPlayed(playDates) {
        var today = moment();
        var frequencyPlayed = 0;
        var days = 0;
        for (var i = 0; i < playDates.length; i++) {
          days = 0;
          var checkDay = moment(playDates[i].playDate);
          days = today.diff(checkDay, 'days');
          if (days < 1000) {
            // Je weiter zurueck, umso weniger Punkte
            frequencyPlayed = frequencyPlayed + 1000;
            frequencyPlayed = frequencyPlayed - days;
          }
        }
        if (frequencyPlayed < 0) {
          frequencyPlayed = 0;
        }
        return frequencyPlayed;
      }
      function getTuneSetPositionPlayInfosForPlaylistPosition(tuneBook, playlistPosition) {
        var tuneSetPositionPlayInfos, tuneSetPositionPlayInfo;
        tuneSetPositionPlayInfos = [];
        for (var z = 0; z < tuneBook.tuneSetPositionPlayInfos.length; z++) {
          if (tuneBook.tuneSetPositionPlayInfos[z].playlistPosition == playlistPosition) {
            tuneSetPositionPlayInfo = tuneBook.tuneSetPositionPlayInfos[z];
            tuneSetPositionPlayInfos.push(tuneSetPositionPlayInfo);
          }
        }
        return tuneSetPositionPlayInfos;
      }
      function getTuneSetPositionPlayInfo(tuneBook, playlistPosition, tuneSetPosition) {
        var tuneSetPositionPlayInfo;
        tuneSetPositionPlayInfo = undefined;
        for (var z = 0; z < tuneBook.tuneSetPositionPlayInfos.length; z++) {
          if (tuneBook.tuneSetPositionPlayInfos[z].playlistPosition == playlistPosition && tuneBook.tuneSetPositionPlayInfos[z].tuneSetPosition == tuneSetPosition) {
            tuneSetPositionPlayInfo = tuneBook.tuneSetPositionPlayInfos[z];
          }
        }
        return tuneSetPositionPlayInfo;
      }
      //AbcOption-Factory
      function createAbcOption(tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl, playlistAbcIncl, fingeringAbcIncl) {
        return {
          tuneSet: tuneSetAbcIncl,
          playDate: playDateAbcIncl,
          skill: skillAbcIncl,
          color: colorAbcIncl,
          annotation: annotationAbcIncl,
          website: siteAbcIncl,
          video: tubeAbcIncl,
          playlist: playlistAbcIncl,
          fingering: fingeringAbcIncl,
          includeAtLeastOneEtbkDirective: function () {
            if (this.tuneSet || this.playDate || this.skill || this.color || this.annotation || this.website || this.video || this.playlist) {
              return true;
            } else {
              return false;
            }
          }
        };
      }
      //Create Default AbcOption
      function createDefaultAbcOption() {
        return createAbcOption(true, true, true, true, true, true, true, true, true);
      }
      //TuneSetPositionPlayInfo-Factory
      function createTuneSetPositionPlayInfo(playlistPosition, tuneSetPosition, repeat, partPlayInfos, annotation) {
        return {
          playlistPosition: playlistPosition,
          tuneSetPosition: tuneSetPosition,
          repeat: repeat,
          partPlayInfos: partPlayInfos,
          annotation: annotation,
          addPartPlayInfo: function (partPlayInfo) {
            this.partPlayInfos.push(partPlayInfo);
          },
          deletePartPlayInfo: function (partPlayInfo) {
            this.partPlayInfos.splice(this.partPlayInfos.indexOf(partPlayInfo), 1);
          },
          moveUpPartPlayInfo: function (partPlayInfo) {
            var index = this.partPlayInfos.indexOf(partPlayInfo);
            if (index == 0) {
            } else {
              // Remove PartPlayInfo from old place
              this.partPlayInfos.splice(index, 1);
              // Insert PartPlayInfo into new place
              this.partPlayInfos.splice(index - 1, 0, partPlayInfo);
            }
          },
          moveDownPartPlayInfo: function (partPlayInfo) {
            var index = this.partPlayInfos.indexOf(partPlayInfo);
            if (index == this.partPlayInfos.length) {
            } else {
              // Remove PartPlayInfo from old place
              this.partPlayInfos.splice(index, 1);
              // Insert PartPlayInfo into new place
              this.partPlayInfos.splice(index + 1, 0, partPlayInfo);
            }
          },
          isDefault: function () {
            var isDefault = true;
            if (this.repeat != this.tuneSetPosition.repeat || this.annotation != this.tuneSetPosition.annotation || this.partPlayInfos.length > 0) {
              isDefault = false;
            }
            return isDefault;
          }
        };
      }
      //PartPlayInfo-Factory
      function createPartPlayInfo(part, playInfo) {
        return {
          part: part,
          playInfo: playInfo
        };
      }
      //Playlist-Factory
      function createPlaylist(playlistId, playlistName, playlistEvent, playlistBand) {
        return {
          id: playlistId,
          name: playlistName,
          event: playlistEvent,
          band: playlistBand,
          playlistPositions: [],
          addPlaylistPosition: function (playlistPosition) {
            this.playlistPositions.push(playlistPosition);
          }
        };
      }
      //PlaylistPosition-Factory
      function createPlaylistPosition(playlistId, position, tuneSet, name, annotation) {
        return {
          playlistId: playlistId,
          position: position,
          tuneSet: tuneSet,
          name: name,
          annotation: annotation
        };
      }
      //TuneSetPosition-Factory
      function createTuneSetPosition(iTuneSetId, iTune, iPosition, iRepeat, iAnnotation) {
        return {
          tuneSetId: iTuneSetId,
          tune: iTune,
          position: iPosition,
          repeat: iRepeat,
          annotation: iAnnotation
        };
      }
      //TuneSet-Factory
      function createTuneSet(iTuneSetId, iTuneSetName, iTuneSetPositions) {
        return {
          tuneSetId: iTuneSetId,
          tuneSetName: iTuneSetName,
          sort: 0,
          tuneSetPositions: iTuneSetPositions
        };
      }
      //Video-Factory
      function createVideo(iSource, iCode, iDescription) {
        return {
          source: iSource,
          code: iCode,
          description: iDescription
        };
      }
      //Website-Factory
      function createWebsite(iURL) {
        return { url: iURL };
      }
      //PlayDate-Factory
      function createPlayDate(iDate) {
        return { playDate: iDate };
      }
      function deleteTuneSetPosition(tuneBook, tuneSetId, position) {
        // Deleting a TuneSetPosition: The Tune can end up set-less -> in this case a new set is generated.
        var tuneSet, tuneSetPosition, playlistPositions, tuneSetPositionPlayInfo, tuneSetDeleted, removedPosition;
        tuneSet = getTuneSetById(tuneBook, tuneSetId);
        tuneSetPosition = null;
        playlistPositions = [];
        tuneSetDeleted = false;
        removedPosition = 0;
        removedPosition = parseInt(position);
        for (var z = 0; z < tuneSet.tuneSetPositions.length; z++) {
          if (tuneSet.tuneSetPositions[z].position == position) {
            tuneSetPosition = tuneSet.tuneSetPositions[z];
            // Delete TuneSetPosition from TuneSet
            tuneSet.tuneSetPositions.splice(z, 1);
          }
        }
        if (getTuneSetsByIntTuneId(tuneBook, tuneSetPosition.tune.intTuneId).length == 0) {
          //A Tune always has to be within a set. Since the last TuneSetPosition was deleted,
          //a new Set has to be created
          initializeTuneSet(tuneBook.tuneSets, tuneSetPosition.tune);
        }
        if (tuneSet.tuneSetPositions.length == 0) {
          // Empty TuneSet
          // Remove TuneSet from the List
          tuneBook.tuneSets.splice(tuneBook.tuneSets.indexOf(tuneSet), 1);
          tuneSetDeleted = true;
        } else {
          // TuneSet still has TuneSetPositions
          // Adjust Positions of remaining TuneSetPositions: Only necessary for tunes that come after the removed tune
          var currentPosition = 0;
          for (var y = 0; y < tuneSet.tuneSetPositions.length; y++) {
            currentPosition = parseInt(tuneSet.tuneSetPositions[y].position);
            if (currentPosition > removedPosition) {
              currentPosition--;
              // Change Position on TuneSetPosition
              tuneSet.tuneSetPositions[y].position = currentPosition.toString();
            }
          }
        }
        // Get all PlaylistPositions for this TuneSet
        playlistPositions = getPlaylistPositionsByTuneSetId(tuneBook, tuneSet.tuneSetId);
        for (var w = 0; w < playlistPositions.length; w++) {
          tuneSetPositionPlayInfo = getTuneSetPositionPlayInfo(tuneBook, playlistPositions[w], tuneSetPosition);
          // Remove TuneSetPositionPlayInfo from the List
          tuneBook.tuneSetPositionPlayInfos.splice(tuneBook.tuneSetPositionPlayInfos.indexOf(tuneSetPositionPlayInfo), 1);
          if (tuneSetDeleted) {
            // Delete PlaylistPositions
            deletePlaylistPosition(tuneBook, playlistPositions[w].playlistId, playlistPositions[w].position);
          }
        }
        return tuneSetDeleted;
      }
      function deleteTuneSetPositionsAndTune(tuneSet, intTuneId) {
        var tuneSetPosition = null;
        var removedPosition = 0;
        for (var z = 0; z < tuneSet.tuneSetPositions.length; z++) {
          if (tuneSet.tuneSetPositions[z].tune.intTuneId == intTuneId) {
            removedPosition = parseInt(tuneSet.tuneSetPositions[z].position);
            tuneSetPosition = tuneSet.tuneSetPositions[z];
            // Delete TuneSetPosition from TuneSet
            tuneSet.tuneSetPositions.splice(z, 1);
          }
        }
        if (tuneSet.tuneSetPositions.length == 0) {
          // Empty TuneSet
          // Remove TuneSet from the List
          currentTuneBook.tuneSets.splice(currentTuneBook.tuneSets.indexOf(tuneSet), 1);
        } else {
          // TuneSet still has TuneSetPositions
          // Adjust Positions of remaining TuneSetPositions: Only necessary for tunes that come after the removed tune
          var currentPosition = 0;
          for (var y = 0; y < tuneSet.tuneSetPositions.length; y++) {
            currentPosition = parseInt(tuneSet.tuneSetPositions[y].position);
            if (currentPosition > removedPosition) {
              currentPosition--;
              // Change Position on TuneSetPosition
              tuneSet.tuneSetPositions[y].position = currentPosition.toString();
            }
          }
        }
      }
      function moveTuneSetPosition(currentTuneBook, sourceTuneSetId, sourcePosition, targetTuneSetId, targetPosition, beforeOrAfter, moveOrCopy) {
        // Moving or Copying a TuneSetPosition
        var sourceTuneSet = getTuneSetById(currentTuneBook, sourceTuneSetId);
        var sourceTuneSetPosition = null;
        var targetTuneSet = null;
        var tuneSetDeleted = false;
        var twoSetsInvolved = false;
        var removedPosition = parseInt(sourcePosition);
        if (targetTuneSetId == null || sourceTuneSetId !== targetTuneSetId) {
          twoSetsInvolved = true;
        }
        for (var z = 0; z < sourceTuneSet.tuneSetPositions.length; z++) {
          if (sourceTuneSet.tuneSetPositions[z].position == sourcePosition) {
            sourceTuneSetPosition = sourceTuneSet.tuneSetPositions[z];
          }
        }
        if (targetTuneSetId == null) {
          // Copy or Move TuneSetPosition to a new Set
          initializeTuneSet(currentTuneBook.tuneSets, sourceTuneSetPosition.tune);
        } else {
          targetTuneSet = getTuneSetById(currentTuneBook, targetTuneSetId);
        }
        // Handle Source TuneSet
        if (moveOrCopy == 'move') {
          if (twoSetsInvolved) {
            // Remove TuneSetPosition from Source TuneSet
            for (var z = 0; z < sourceTuneSet.tuneSetPositions.length; z++) {
              if (sourceTuneSet.tuneSetPositions[z].position == sourcePosition) {
                // Delete TuneSetPosition from TuneSet
                sourceTuneSet.tuneSetPositions.splice(z, 1);
              }
            }
          }
          if (sourceTuneSet.tuneSetPositions.length == 0) {
            // Empty TuneSet
            // Remove TuneSet from the List
            currentTuneBook.tuneSets.splice(currentTuneBook.tuneSets.indexOf(sourceTuneSet), 1);
            tuneSetDeleted = true;
          } else {
            // TuneSet still has TuneSetPositions
            // Adjust Positions of remaining TuneSetPositions:
            // Only necessary for tunes that come after the removed tune
            var currentPosition = 0;
            for (var y = 0; y < sourceTuneSet.tuneSetPositions.length; y++) {
              currentPosition = parseInt(sourceTuneSet.tuneSetPositions[y].position);
              if (currentPosition > removedPosition) {
                currentPosition--;
                // Change Position on TuneSetPosition
                sourceTuneSet.tuneSetPositions[y].position = currentPosition.toString();
              }
            }
          }
        }
        // Handle Target TuneSet
        if (targetTuneSetId != null) {
          var newPosition = 0;
          newPosition = parseInt(targetPosition);
          if (beforeOrAfter == 'after') {
            newPosition++;
          }
          var targetTuneSetPosition = {};
          if (moveOrCopy == 'move') {
            // Set new TuneSetId and Position on TuneSetPosition
            // copy by reference
            targetTuneSetPosition = sourceTuneSetPosition;
            targetTuneSetPosition.tuneSetId = targetTuneSetId;
            targetTuneSetPosition.position = newPosition.toString();
          } else if (moveOrCopy == 'copy') {
            // Set new TuneSetId and Position on TuneSetPosition
            // copy by value (primitive types), copy by reference (objects) -> tune is shared
            targetTuneSetPosition = createTuneSetPosition(targetTuneSetId, sourceTuneSetPosition.tune, newPosition.toString(), sourceTuneSetPosition.repeat, sourceTuneSetPosition.annotation);
          }
          // Add TuneSetPosition to TuneSet (only if source tuneSet ist different from target tuneSet)
          if (twoSetsInvolved) {
            // At index (newPosition--) insert the moving TuneSetPosition, but don't remove other TuneSetPositions
            var insertAt = newPosition - 1;
            targetTuneSet.tuneSetPositions.splice(insertAt, 0, targetTuneSetPosition);
          }
          // Change Position of other TuneSetPositions in the Targe-Set:
          // Only necessary for tunes that come after the inserted tune
          for (var y = 0; y < targetTuneSet.tuneSetPositions.length; y++) {
            var currentPosition = 0;
            if (targetTuneSet.tuneSetPositions[y] == targetTuneSetPosition) {
            } else {
              // TuneSetPositions which were not moved
              currentPosition = parseInt(targetTuneSet.tuneSetPositions[y].position);
              if (currentPosition >= newPosition) {
                currentPosition++;
                // Change Position on TuneSetPosition
                targetTuneSet.tuneSetPositions[y].position = currentPosition.toString();
              }
            }
          }
        }
        return tuneSetDeleted;
      }
      function moveUpPlaylistPosition(currentTuneBook, playlistId, position) {
        var playlist, oldPosition, newPosition, movingPlaylistPosition;
        oldPosition = parseInt(position);
        newPosition = oldPosition - 1;
        if (newPosition < 1) {
          newPosition = 1;
        }
        playlist = getPlaylistById(currentTuneBook, playlistId);
        //Change moving Playlist-Position
        for (var z = 0; z < playlist.playlistPositions.length; z++) {
          if (parseInt(playlist.playlistPositions[z].position) == oldPosition) {
            playlist.playlistPositions[z].position = newPosition.toString();
            movingPlaylistPosition = playlist.playlistPositions[z];
          }
        }
        //Change overlapping Playlist-Position
        for (var y = 0; y < playlist.playlistPositions.length; y++) {
          if (parseInt(playlist.playlistPositions[y].position) == newPosition) {
            if (playlist.playlistPositions[y] != movingPlaylistPosition) {
              playlist.playlistPositions[y].position = oldPosition.toString();
            }
          }
        }
        // Sort PlaylistPositions by position
        playlist.playlistPositions.sort(function (a, b) {
          return a.position - b.position;
        });
        return playlist;
      }
      function moveDownPlaylistPosition(currentTuneBook, playlistId, position) {
        var playlist, oldPosition, newPosition, movingPlaylistPosition;
        oldPosition = parseInt(position);
        newPosition = oldPosition + 1;
        playlist = getPlaylistById(currentTuneBook, playlistId);
        if (playlist.playlistPositions.length < newPosition) {
          newPosition = oldPosition;
        } else {
          //Change moving Playlist-Position
          for (var z = 0; z < playlist.playlistPositions.length; z++) {
            if (parseInt(playlist.playlistPositions[z].position) == oldPosition) {
              playlist.playlistPositions[z].position = newPosition.toString();
              movingPlaylistPosition = playlist.playlistPositions[z];
            }
          }
          //Change overlapping Playlist-Position
          for (var y = 0; y < playlist.playlistPositions.length; y++) {
            if (parseInt(playlist.playlistPositions[y].position) == newPosition) {
              if (playlist.playlistPositions[y] != movingPlaylistPosition) {
                playlist.playlistPositions[y].position = oldPosition.toString();
              }
            }
          }
          // Sort PlaylistPositions by position
          playlist.playlistPositions.sort(function (a, b) {
            return a.position - b.position;
          });
        }
        return playlist;
      }
      function addEmptyPlaylistPosition(tuneBook, playlistId) {
        var playlist, emptyPlaylistPosition;
        playlist = getPlaylistById(tuneBook, playlistId);
        emptyPlaylistPosition = createPlaylistPosition(playlist.id, playlist.playlistPositions.length + 1, null, '', '');
        playlist.playlistPositions.push(emptyPlaylistPosition);
        return emptyPlaylistPosition;
      }
      function getNextPlaylistId(tuneBook) {
        var nextPlaylistId, currentPlaylistId, maxPlaylistId;
        maxPlaylistId = 0;
        for (var i = 0; i < tuneBook.playlists.length; i++) {
          currentPlaylistId = parseInt(tuneBook.playlists[i].id);
          if (currentPlaylistId > maxPlaylistId) {
            maxPlaylistId = currentPlaylistId;
          }
        }
        nextPlaylistId = maxPlaylistId + 1;
        return nextPlaylistId;
      }
      function addEmptyPlaylist(tuneBook) {
        var playlistId, currentPlaylistId, maxPlaylistId, emptyPlaylist;
        emptyPlaylist = createPlaylist(getNextPlaylistId(tuneBook), '', '', '');
        tuneBook.playlists.push(emptyPlaylist);
        return emptyPlaylist;
      }
      function deletePlaylistPosition(tuneBook, playlistId, position) {
        var playlist = getPlaylistById(tuneBook, playlistId);
        var playlistPosition = null;
        var removedPosition = 0;
        removedPosition = parseInt(position);
        for (var z = 0; z < playlist.playlistPositions.length; z++) {
          if (playlist.playlistPositions[z].position == position) {
            playlistPosition = playlist.playlistPositions[z];
            // Delete playlistPosition from playlist
            playlist.playlistPositions.splice(z, 1);  //Falls eine tuneSetPositionPlayInfo zur gelöschten playlistPosition vorhanden wäre_
                                                      //Löschen nicht nötig, da bei writeAbcHeader die playlistPosition nicht mehr geschrieben wird,
                                                      //und somit die tuneSetPositionPlayInfo auch nicht.
          }
        }
        if (playlist.playlistPositions.length == 0) {
        } else {
          // playlist still has playlistPositions
          // Adjust Positions of remaining playlistPositions: Only necessary for playlistPositions that come after the removed playlistPosition
          var currentPosition = 0;
          for (var y = 0; y < playlist.playlistPositions.length; y++) {
            currentPosition = parseInt(playlist.playlistPositions[y].position);
            if (currentPosition > removedPosition) {
              currentPosition--;
              // Change Position on TuneSetPosition
              playlist.playlistPositions[y].position = currentPosition.toString();
            }
          }
        }
      }
      function deletePlaylist(tuneBook, playlistId) {
        var playlist = getPlaylistById(tuneBook, playlistId);
        for (var z = 0; z < tuneBook.playlists.length; z++) {
          if (tuneBook.playlists[z].id == playlistId) {
            // Delete all playlistPositions
            // nicht nötig, da beim Export die Playlist der Trigger ist
            // Delete playlist
            tuneBook.playlists.splice(z, 1);
          }
        }
      }
      function copyPlaylist(tuneBook, playlistId) {
        var playlistId, playlistName, playlistOriginal, playlistCopy;
        playlistOriginal = getPlaylistById(tuneBook, playlistId);
        playlistId = getNextPlaylistId(tuneBook);
        playlistName = 'Copy of ' + playlistOriginal.name;
        playlistCopy = createPlaylist(playlistId, playlistName, playlistOriginal.event, playlistOriginal.band);
        tuneBook.playlists.push(playlistCopy);
        copyPlaylistPositions(tuneBook, playlistOriginal, playlistCopy);
      }
      function copyPlaylistPositionToOtherPlaylist(tuneBook, sourcePlaylistId, sourcePlaylistPositionNr, targetPlaylistId) {
        var playlistPosition, targetPlaylist, targetPlaylistPositionNr;
        playlistPosition = getPlaylistPosition(tuneBook, sourcePlaylistId, sourcePlaylistPositionNr);
        targetPlaylist = getPlaylistById(tuneBook, targetPlaylistId);
        // Am Schluss einfügen
        targetPlaylistPositionNr = targetPlaylist.playlistPositions.length + 1;
        copyPlaylistPositionAndTuneSetPlayInfos(tuneBook, playlistPosition, targetPlaylist, targetPlaylistPositionNr);
      }
      function copyPlaylistPositions(tuneBook, playlistOriginal, playlistCopy) {
        var playlistPositionOriginal, playlistPositionCopy;
        for (var y = 0; y < playlistOriginal.playlistPositions.length; y++) {
          playlistPositionOriginal = playlistOriginal.playlistPositions[y];
          copyPlaylistPositionAndTuneSetPlayInfos(tuneBook, playlistPositionOriginal, playlistCopy, playlistPositionOriginal.position);
        }
      }
      function copyPlaylistPositionAndTuneSetPlayInfos(tuneBook, playlistPositionOriginal, targetPlaylist, targetPlaylistPositionNr) {
        var playlistPositionCopy;
        // Generate PlaylistPosition
        playlistPositionCopy = createPlaylistPosition(targetPlaylist.id, targetPlaylistPositionNr, playlistPositionOriginal.tuneSet, playlistPositionOriginal.name, playlistPositionOriginal.annotation);
        // Add PlaylistPosition to Playlist
        targetPlaylist.addPlaylistPosition(playlistPositionCopy);
        // Copy TuneSetPositionPlayInfos
        copyTuneSetPositionPlayInfos(tuneBook, playlistPositionOriginal, playlistPositionCopy);
      }
      function copyTuneSetPositionPlayInfos(tuneBook, playlistPositionOriginal, playlistPositionCopy) {
        var tuneSetPositionPlayInfosOriginal, tuneSetPositionPlayInfosCopy, tuneSetPositionPlayInfoOriginal, tuneSetPositionPlayInfoCopy, partPlayInfosCopy;
        tuneSetPositionPlayInfosOriginal = getTuneSetPositionPlayInfosForPlaylistPosition(tuneBook, playlistPositionOriginal);
        for (var y = 0; y < tuneSetPositionPlayInfosOriginal.length; y++) {
          tuneSetPositionPlayInfoOriginal = tuneSetPositionPlayInfosOriginal[y];
          // Copy partPlayInfos
          partPlayInfosCopy = copyPartPlayInfos(tuneSetPositionPlayInfoOriginal);
          // Generate tuneSetPositionPlayInfo
          tuneSetPositionPlayInfoCopy = createTuneSetPositionPlayInfo(playlistPositionCopy, tuneSetPositionPlayInfoOriginal.tuneSetPosition, tuneSetPositionPlayInfoOriginal.repeat, partPlayInfosCopy, tuneSetPositionPlayInfoOriginal.annotation);
          tuneBook.tuneSetPositionPlayInfos.push(tuneSetPositionPlayInfoCopy);
        }
      }
      function copyPartPlayInfos(tuneSetPositionPlayInfoOriginal) {
        var partPlayInfosOriginal, partPlayInfosCopy, partPlayInfoOriginal, partPlayInfoCopy;
        partPlayInfosCopy = [];
        for (var y = 0; y < tuneSetPositionPlayInfoOriginal.partPlayInfos.length; y++) {
          partPlayInfoOriginal = tuneSetPositionPlayInfoOriginal.partPlayInfos[y];
          // Generate partPlayInfo
          partPlayInfoCopy = createPartPlayInfo(partPlayInfoOriginal.part, partPlayInfoOriginal.playInfo);
          partPlayInfosCopy.push(partPlayInfoCopy);
        }
        return partPlayInfosCopy;
      }
      function getTuneSetId(tuneSetDirective) {
        var tuneSetId = 0;
        var tuneSetIdSplits = [];
        tuneSetIdSplits = tuneSetDirective.split('id:');
        if (tuneSetIdSplits.length > 1) {
          tuneSetIdSplits = tuneSetIdSplits[1].split(',');
          tuneSetId = tuneSetIdSplits[0].replace(/^\s+|\s+$/g, '');
        }
        return parseInt(tuneSetId);
      }
      function getSubDirective(directive, beginAfter, endBefore) {
        var detail = '';
        var detailSplits = directive.split(beginAfter);
        if (detailSplits.length > 1) {
          detailSplits = detailSplits[1].split(endBefore);
          detail = detailSplits[0].replace(/^\s+|\s+$/g, '');
        }
        return detail;
      }
      function getPlaylistId(playlistDirective) {
        return getSubDirective(playlistDirective, 'id:', ',');
      }
      function getPlaylistName(playlistDirective) {
        return getSubDirective(playlistDirective, 'name:', ',');
      }
      function getPlaylistEvent(playlistDirective) {
        return getSubDirective(playlistDirective, 'evt:', ',');
      }
      function getPlaylistBand(playlistDirective) {
        return getSubDirective(playlistDirective, 'band:', ',');
      }
      function getPlaylistPositionPosition(playlistDirective) {
        return getSubDirective(playlistDirective, 'pos:', ',');
      }
      function getPlaylistPositionTuneSetId(playlistDirective) {
        return getSubDirective(playlistDirective, 'tnset:', ',');
      }
      function getPlaylistPositionName(playlistDirective) {
        return getSubDirective(playlistDirective, 'name:', ',');
      }
      function getPlaylistPositionAnnotation(playlistDirective) {
        return getSubDirective(playlistDirective, 'ant:', ',');
      }
      function getVideoSource(videoDirective) {
        return getSubDirective(videoDirective, 'src:', ',');
      }
      function getVideoCode(videoDirective) {
        return getSubDirective(videoDirective, 'cde:', ',');
      }
      function getVideoDescription(videoDirective) {
        return getSubDirective(videoDirective, 'desc:', '\n');
      }
      function getTuneSetTunePosition(tuneSetDirective) {
        var tuneSetTunePosition = 'undefined';
        var tuneSetTunePositionSplits = [];
        tuneSetTunePositionSplits = tuneSetDirective.split('pos:');
        if (tuneSetTunePositionSplits.length > 1) {
          tuneSetTunePositionSplits = tuneSetTunePositionSplits[1].split(',');
          tuneSetTunePosition = tuneSetTunePositionSplits[0].replace(/^\s+|\s+$/g, '');
        }
        return tuneSetTunePosition;
      }
      function getTuneSetTuneRepeat(tuneSetDirective) {
        var tuneSetTuneRepeat = 'undefined';
        var tuneSetTuneRepeatSplits = [];
        tuneSetTuneRepeatSplits = tuneSetDirective.split('rep:');
        if (tuneSetTuneRepeatSplits.length > 1) {
          tuneSetTuneRepeatSplits = tuneSetTuneRepeatSplits[1].split(',');
          tuneSetTuneRepeat = tuneSetTuneRepeatSplits[0].replace(/^\s+|\s+$/g, '');
        }
        return tuneSetTuneRepeat;
      }
      function getTuneSetTuneAnnotation(tuneSetDirective) {
        var tuneSetTuneAnnotation = '';
        var tuneSetTuneAnnotationSplits = [];
        tuneSetTuneAnnotationSplits = tuneSetDirective.split('ant:');
        if (tuneSetTuneAnnotationSplits.length > 1) {
          tuneSetTuneAnnotationSplits = tuneSetTuneAnnotationSplits[1].split(',');
          tuneSetTuneAnnotation = tuneSetTuneAnnotationSplits[0].replace(/^\s+|\s+$/g, '');
        }
        return tuneSetTuneAnnotation;
      }
      function getAbcValue(abc, abcField, initValue) {
        var value = initValue;
        var abcFieldSplits = [];
        abcFieldSplits = abc.split(abcField);
        if (abcFieldSplits.length > 1) {
          abcFieldSplits = abcFieldSplits[1].split('\n');
          value = abcFieldSplits[0].replace(/^\s+|\s+$/g, '');
        }
        return value;
      }
      function getAbcValues(abc, abcField) {
        var values = [];
        var value = '';
        var abcFieldSplits = [];
        var lineSplits = [];
        abcFieldSplits = abc.split(abcField);
        for (var i = 0; i < abcFieldSplits.length; i++) {
          if (i > 0) {
            lineSplits = abcFieldSplits[i].split('\n');
            value = lineSplits[0].replace(/^\s+|\s+$/g, '');
            values.push(value);
          }
        }
        return values;
      }
      function getAbcValueOfTuneLine(tuneLine, abcField, initValue) {
        var value = initValue;
        var abcFieldSplits = [];
        abcFieldSplits = tuneLine.split(abcField);
        if (abcFieldSplits.length > 1) {
          abcFieldSplits = abcFieldSplits[1].split('\n');
          value = abcFieldSplits[0].replace(/^\s+|\s+$/g, '');
        }
        return value;
      }
      function addDirective(tune, directive, targetLine) {
        var tuneSplits = [];
        var newAbc = '';
        tuneSplits = tune.pure.split('\n');
        tune.pure = '';
        var curLineIsTargetLine = false;
        var lastLineIsTargetLine = false;
        var directiveAdded = false;
        // Add Directive after the TargetLine
        for (var i = 0; i < tuneSplits.length; i++) {
          if (tuneSplits[i].indexOf(targetLine) !== -1) {
            curLineIsTargetLine = true;
          } else {
            curLineIsTargetLine = false;
          }
          if (!curLineIsTargetLine && lastLineIsTargetLine) {
            newAbc = newAbc + directive;
            newAbc = newAbc + '\n';
            directiveAdded = true;
          }
          newAbc = newAbc + tuneSplits[i];
          newAbc = newAbc + '\n';
          lastLineIsTargetLine = curLineIsTargetLine;
        }
        // EOF (tune consists only of the TargetLine or no TargetLine was found)
        // Add it at the end 
        if (!directiveAdded) {
          newAbc = newAbc + directive;
          newAbc = newAbc + '\n';
          directiveAdded = true;
        }
        tune.pure = newAbc;
      }
      function writeTuneAbcWithEtbkDirectives(tune, tuneSetPositions, targetLine, abcOption) {
        var tuneSplits = [];
        var newAbc = '';
        tuneSplits = tune.pure.split('\n');
        var curLineIsTargetLine = false;
        var lastLineIsTargetLine = false;
        var directivesAdded = false;
        var directive = '';
        // Add all directives after the TargetLine
        for (var i = 0; i < tuneSplits.length; i++) {
          if (!directivesAdded) {
            if (tuneSplits[i].indexOf(targetLine) !== -1) {
              curLineIsTargetLine = true;
            } else {
              curLineIsTargetLine = false;
            }
            if (!curLineIsTargetLine && lastLineIsTargetLine) {
              if (abcOption.tuneSet) {
                for (var w = 0; w < tuneSetPositions.length; w++) {
                  directive = '%%etbk:tnset id:' + tuneSetPositions[w].tuneSetId + ',pos:' + tuneSetPositions[w].position + ',rep:' + tuneSetPositions[w].repeat + ',ant:' + tuneSetPositions[w].annotation;
                  newAbc = newAbc + directive;
                  newAbc = newAbc + '\n';
                }
              }
              if (abcOption.website) {
                for (var z = 0; z < tune.wsites.length; z++) {
                  directive = '%%etbk:wsite ' + tune.wsites[z].url;
                  newAbc = newAbc + directive;
                  newAbc = newAbc + '\n';
                }
              }
              if (abcOption.video) {
                for (var z = 0; z < tune.videos.length; z++) {
                  directive = '%%etbk:video ' + 'src:' + tune.videos[z].source + ',cde:' + tune.videos[z].code + ',desc:' + tune.videos[z].description;
                  newAbc = newAbc + directive;
                  newAbc = newAbc + '\n';
                }
              }
              if (abcOption.annotation) {
                if (tune.annotation != '') {
                  directive = '%%etbk:annot ' + tune.annotation;
                  newAbc = newAbc + directive;
                  newAbc = newAbc + '\n';
                }
              }
              if (abcOption.skill) {
                if (tune.skill != '') {
                  directive = '%%etbk:skill ' + tune.skill;
                  newAbc = newAbc + directive;
                  newAbc = newAbc + '\n';
                }
              }
              if (abcOption.color) {
                if (tune.color != eTBK_DEFAULT_COLOR) {
                  directive = '%%etbk:color ' + tune.color;
                  newAbc = newAbc + directive;
                  newAbc = newAbc + '\n';
                }
              }
              if (abcOption.playDate) {
                /*
                            if (!isDefaultPlayDate(tune.lastPlayed)) {
								directive = getPlayDatesDirective(tune);
								newAbc = newAbc + directive;
								newAbc = newAbc + "\n";
							}
							*/
                if (tune.lastPlayed != null) {
                  directive = getPlayDatesDirective(tune);
                  newAbc = newAbc + directive;
                  newAbc = newAbc + '\n';
                }
              }
              directivesAdded = true;
            }
          }
          newAbc = newAbc + tuneSplits[i];
          newAbc = newAbc + '\n';
          lastLineIsTargetLine = curLineIsTargetLine;
        }
        // EOF (tune consists only of the TargetLine or no TargetLine was found)
        // Todo: Add it at the end 
        if (!directivesAdded) {
        }
        return newAbc;
      }
      function getTuneLastPlayed(playDates) {
        // TODO: Sort playDates
        //return playDates[0].playDate;
        if (playDates.length == 0) {
          return null;
        } else {
          return playDates[0].playDate;
        }
      }
      function getPlayDates(tuneLine) {
        var playDates = [];
        var playDate = new Date();
        var playDatesSplits = [];
        playDatesSplits = tuneLine.split(',');
        for (var i = 0; i < playDatesSplits.length; i++) {
          //moment kann nicht verwendet werden, weil Object mit methoden, und Object kann folglich nicht aus localStorage restored werden.
          //playDate = newPlayDate(moment(playDatesSplits[i], "YYYY-MM-DDTHH:mm"));
          playDate = moment(playDatesSplits[i], 'YYYY-MM-DDTHH:mm').toDate();
          playDates.push(createPlayDate(playDate));
        }
        return playDates;
      }
      function getVideoFromDirective(videoDirective) {
        return createVideo(getVideoSource(videoDirective), getVideoCode(videoDirective), getVideoDescription(videoDirective));
      }
      function initializeTuneAndTuneSet(tuneSets) {
        // Get next tuneSetId, intTuneId and tuneId
        var maxTuneSetId = 0;
        var maxIntTuneId = 0;
        var maxTuneId = 0;
        var currentTuneId = 0;
        var currentIntTuneId = 0;
        var currentTuneSetId = 0;
        for (var i = 0; i < tuneSets.length; i++) {
          currentTuneSetId = parseInt(tuneSets[i].tuneSetId);
          if (currentTuneSetId > maxTuneSetId) {
            maxTuneSetId = currentTuneSetId;
          }
          for (var z = 0; z < tuneSets[i].tuneSetPositions.length; z++) {
            currentIntTuneId = parseInt(tuneSets[i].tuneSetPositions[z].tune.intTuneId);
            if (currentIntTuneId > maxIntTuneId) {
              maxIntTuneId = currentIntTuneId;
            }
            currentTuneId = parseInt(tuneSets[i].tuneSetPositions[z].tune.id);
            if (currentTuneId > maxTuneId) {
              maxTuneId = currentTuneId;
            }
          }
        }
        // Create new Tune with X: maxTuneId + 1 and T: New Tune
        var newTuneId = ++maxTuneId;
        var newTuneSetId = ++maxTuneSetId;
        var newIntTuneId = ++maxIntTuneId;
        var abc = 'X:' + newTuneId + '\n' + 'T:New Tune';
        var book = new ABCJS.TuneBook(abc);
        var tune = book.tunes[0];
        tune.intTuneId = newIntTuneId;
        initializeTuneViewFields(tune);
        var tuneSet = [];
        var tuneSetPositions = [];
        var tuneSetPosition = createTuneSetPosition(newTuneSetId, tune, 1, '3x', '');
        tuneSetPositions.push(tuneSetPosition);
        tuneSet = createTuneSet(newTuneSetId, tune.title, tuneSetPositions);
        tuneSets.unshift(tuneSet);
        return tuneSet;
      }
      function initializeTuneSet(tuneSets, tune) {
        // Get next tuneSetId
        var maxTuneSetId = 0;
        var currentTuneSetId = 0;
        for (var i = 0; i < tuneSets.length; i++) {
          currentTuneSetId = parseInt(tuneSets[i].tuneSetId);
          if (currentTuneSetId > maxTuneSetId) {
            maxTuneSetId = currentTuneSetId;
          }
        }
        var tuneSet = [];
        var tuneSetPositions = [];
        var newTuneSetId = ++maxTuneSetId;
        var tuneSetPosition = createTuneSetPosition(newTuneSetId, tune, 1, '3x', '');
        //addNewTuneSetDirective(tuneSetPosition);
        tuneSetPositions.push(tuneSetPosition);
        tuneSet = createTuneSet(newTuneSetId, tune.title, tuneSetPositions);
        tuneSets.unshift(tuneSet);
        return tuneSet;
      }
      function addTunePlayDate(tune, newDate) {
        if (tune.lastPlayed != null && moment(tune.lastPlayed).diff(newDate, 'minutes') == 0) {
        } else {
          // Set LastPlayed
          tune.lastPlayed = newDate;
          // Put LastPlayed on first Position in the playDates-Array
          tune.playDates.unshift(createPlayDate(tune.lastPlayed));
          // Calculate Frequency Played
          tune.frequencyPlayed = calculateFrequencyPlayed(tune.playDates);
        }
      }
      function addTuneSetPlayDate(tuneSet, newDate) {
        for (var i = 0; i < tuneSet.tuneSetPositions.length; i++) {
          addTunePlayDate(tuneSet.tuneSetPositions[i].tune, newDate);
        }
      }
      function savePlayDatesDirective(tuneSetPosition) {
        var searchDirective = '%%etbk:pldat ';
        var newDirective = getPlayDatesDirective(tuneSetPosition.tune);
        saveDirective(tuneSetPosition, searchDirective, newDirective);
      }
      function getPlayDatesDirective(tune) {
        var directive = '%%etbk:pldat ';
        var playDate = null;
        // Prepare PlayDatesDirective
        for (var i = 0; i < tune.playDates.length; i++) {
          if (i > 0) {
            directive = directive + ',';
          }
          playDate = moment(tune.playDates[i].playDate);
          directive = directive + playDate.format('YYYY-MM-DDTHH:mm');
        }
        return directive;
      }
      /*
		function saveColorDirective(tuneSetPosition){
			var searchDirective = "%%etbk:color ";
			var newDirective = "%%etbk:color " + tuneSetPosition.tune.color;

			saveDirective(tuneSetPosition, searchDirective, newDirective);
		}
		*/
      function saveSkillDirective(tuneSetPosition) {
        var searchDirective = '%%etbk:skill ';
        var newDirective = '%%etbk:skill ' + tuneSetPosition.tune.skill;
        saveDirective(tuneSetPosition, searchDirective, newDirective);
      }
      function saveDirective(tuneSetPosition, searchDirective, newDirective) {
        if (!abcContainesDirective(tuneSetPosition, searchDirective)) {
          // Add newDirective always after the X-Line
          addDirective(tuneSetPosition.tune, newDirective, 'X:');
        } else {
          replaceDirective(tuneSetPosition, searchDirective, newDirective);
        }
      }
      function abcContainesDirective(tuneSetPosition, directive) {
        var directiveSplits = [];
        var directiveFound = false;
        directiveSplits = tuneSetPosition.tune.pure.split(directive);
        if (directiveSplits.length > 1) {
          //Directive found
          directiveFound = true;
        }
        return directiveFound;
      }
      function replaceDirective(tuneSetPosition, directiveType, directive) {
        var tuneSplits = [];
        var newAbc = '';
        tuneSplits = tuneSetPosition.tune.pure.split('\n');
        tuneSetPosition.tune.pure = '';
        for (var i = 0; i < tuneSplits.length; i++) {
          if (tuneSplits[i].indexOf(directiveType) !== -1) {
            newAbc = newAbc + directive;
          } else {
            newAbc = newAbc + tuneSplits[i];
          }
          newAbc = newAbc + '\n';
        }
        tuneSetPosition.tune.pure = newAbc;
      }
      function setRandomSort(tuneBook) {
        var randomNumber = 0;
        for (var i = 0; i < tuneBook.tuneSets.length; i++) {
          randomNumber = Math.floor(Math.random() * 100001);
          tuneBook.tuneSets[i].sort = randomNumber;
        }
      }
      function getRandomTuneSetIndex(sets) {
        // Get a random number between 1 and the number of TuneSets
        return Math.floor(Math.random() * sets.length) + 1;
      }
      function getRandomTuneIndex(tunes) {
        // Get a random number between 1 and the number of Tunes
        return Math.floor(Math.random() * tunes.length) + 1;
      }
      function writeAbc(tuneBook, abcOption) {
        // Generate Abc
        var tbkAbc, tuneAbc, tunes;
        tunes = [];
        tuneAbc = '';
        tbkAbc = '';
        // Construct Header
        tbkAbc = writeAbcHeader(tuneBook, abcOption);
        // Get Tunes
        tunes = extractTunes(tuneBook.tuneSets);
        // Sort Tunes by intTuneId
        tunes.sort(function (a, b) {
          return a.intTuneId - b.intTuneId;
        });
        for (var i = 0; i < tunes.length; i++) {
          tuneAbc = writeTuneAbc(tunes[i], getTuneSetPositionsByIntTuneId(tuneBook, tunes[i].intTuneId), abcOption);
          tbkAbc += tuneAbc;
          tbkAbc += '\n';  //empty line between tunes
        }
        return tbkAbc;
      }
      function initializeAbcHeader() {
        var tuneBookName = 'My TuneBook';
        var tuneBookDescription = 'The tunes I play';
        var date = moment(new Date());
        var tuneBookVersion = date.format('YYYY-MM-DDTHH:mm');
        // Construct Header
        var tbkAbc = '%abc-';
        tbkAbc += ABC_VERSION;
        tbkAbc += '\n';
        tbkAbc += 'I:abc-creator eTuneBook-';
        tbkAbc += eTBK_VERSION;
        tbkAbc += '\n';
        tbkAbc += '%%etbk:bname ';
        tbkAbc += tuneBookName;
        tbkAbc += '\n';
        tbkAbc += '%%etbk:bvers ';
        tbkAbc += tuneBookVersion;
        tbkAbc += '\n';
        tbkAbc += '%%etbk:bdesc ';
        tbkAbc += tuneBookDescription;
        tbkAbc += '\n';
        return tbkAbc;
      }
      function writeAbcHeader(tuneBook, abcOption) {
        // Construct Header
        var tbkAbc, playlist, playlistPosition, tuneSetPositionPlayInfos, tuneSetPositionPlayInfo;
        tbkAbc = '%abc-';
        tbkAbc += ABC_VERSION;
        tbkAbc += '\n';
        tbkAbc += 'I:abc-creator eTuneBook-';
        tbkAbc += eTBK_VERSION;
        tbkAbc += '\n';
        if (abcOption.includeAtLeastOneEtbkDirective()) {
          tbkAbc += '%%etbk:bname ';
          tbkAbc += tuneBook.name;
          tbkAbc += '\n';
          tbkAbc += '%%etbk:bvers ';
          tbkAbc += tuneBook.version;
          tbkAbc += '\n';
          tbkAbc += '%%etbk:bdesc ';
          tbkAbc += tuneBook.description;
          tbkAbc += '\n';
        }
        if (abcOption.playlist) {
          for (var i = 0; i < tuneBook.playlists.length; i++) {
            //Playlist-Definition
            playlist = tuneBook.playlists[i];
            tbkAbc += '%%etbk:plldf id:';
            tbkAbc += playlist.id;
            tbkAbc += ',name:';
            tbkAbc += playlist.name;
            tbkAbc += ',evt:';
            tbkAbc += playlist.event;
            tbkAbc += ',band:';
            tbkAbc += playlist.band;
            tbkAbc += ',ant:';
            tbkAbc += playlist.annotation;
            tbkAbc += '\n';
            for (var z = 0; z < playlist.playlistPositions.length; z++) {
              //Playlist-Positions
              playlistPosition = playlist.playlistPositions[z];
              tbkAbc += '%%etbk:pllps id:';
              tbkAbc += playlist.id;
              tbkAbc += ',pos:';
              tbkAbc += playlistPosition.position;
              tbkAbc += ',tnset:';
              tbkAbc += playlistPosition.tuneSet.tuneSetId;
              tbkAbc += ',name:';
              tbkAbc += playlistPosition.name;
              tbkAbc += ',ant:';
              tbkAbc += playlistPosition.annotation;
              tbkAbc += '\n';
              tuneSetPositionPlayInfos = getTuneSetPositionPlayInfosForPlaylistPosition(tuneBook, tuneBook.playlists[i].playlistPositions[z]);
              for (var y = 0; y < tuneSetPositionPlayInfos.length; y++) {
                //TuneSetPositionPlayInfos
                tuneSetPositionPlayInfo = tuneSetPositionPlayInfos[y];
                if (!tuneSetPositionPlayInfo.isDefault()) {
                  tbkAbc += '%%etbk:plltp pll:';
                  tbkAbc += tuneSetPositionPlayInfo.playlistPosition.playlistId;
                  tbkAbc += ',pllpos:';
                  tbkAbc += tuneSetPositionPlayInfo.playlistPosition.position;
                  tbkAbc += ',tnset:';
                  tbkAbc += tuneSetPositionPlayInfo.tuneSetPosition.tuneSetId;
                  tbkAbc += ',tnsetpos:';
                  tbkAbc += tuneSetPositionPlayInfo.tuneSetPosition.position;
                  tbkAbc += ',rep:';
                  tbkAbc += tuneSetPositionPlayInfo.repeat;
                  tbkAbc += ',arr:{';
                  var firstPart = true;
                  for (var w = 0; w < tuneSetPositionPlayInfo.partPlayInfos.length; w++) {
                    //PartPlayInfos
                    if (firstPart) {
                      firstPart = false;
                    } else {
                      tbkAbc += ',';
                    }
                    tbkAbc += tuneSetPositionPlayInfo.partPlayInfos[w].part;
                    tbkAbc += ':';
                    tbkAbc += tuneSetPositionPlayInfo.partPlayInfos[w].playInfo;
                  }
                  tbkAbc += '},ant:';
                  tbkAbc += tuneSetPositionPlayInfo.annotation;
                  tbkAbc += '\n';
                }
              }
            }
          }
        }
        tbkAbc += '\n';
        return tbkAbc;
      }
      function writeTuneAbc(tune, tuneSetPositions, abcOption) {
        var tuneAbc = '';
        if (!abcOption.tuneSet && !abcOption.playDate && !abcOption.skill && !abcOption.color && !abcOption.annotation && !abcOption.website && !abcOption.video) {
          tuneAbc = tune.pure;
        } else {
          tuneAbc = writeTuneAbcWithEtbkDirectives(tune, tuneSetPositions, 'X:', abcOption);
        }
        if (!abcOption.fingering) {
          tuneAbc = tuneAbc.replace(eTBK_PATTERN_FINGER, '');
        }
        return tuneAbc;
      }
      function tuneUp(tune) {
        // Adaption of Jens Wollschl�ger's ABC-Transposer (http://www.8ung.at/abctransposer/)  
        var neu = escape(tune.pure);
        var Reihe = neu.split('%0D%0A');
        Reihe = neu.split('%0A');
        for (var i = 0; i < Reihe.length; ++i) {
          Reihe[i] = unescape(Reihe[i]);
          /* Macht die Steuerzeichen wieder weg */
          var Aktuellereihe = Reihe[i].split('');
          /* nochmal bei C. Walshaw crosschecken, ob alle m�gl. ausser K: erfasst. */
          if (Aktuellereihe[0] == 'A' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'B' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'C' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'D' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'E' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'F' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'G' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'H' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'I' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'J' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'L' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'M' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'N' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'O' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'P' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'Q' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'R' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'S' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'T' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'U' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'V' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'W' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'X' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'Y' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'Z' && Aktuellereihe[1] == ':') {
          } else if (Aktuellereihe[0] == 'K' && Aktuellereihe[1] == ':') {
            /* k: Feld wird hier behandelt */
            var Leerzeichenweg = Reihe[i].split(' ');
            /* weil manchmal Leerzeichen nachm k */
            var sindweg = Leerzeichenweg.join('');
            Aktuellereihe = sindweg.split('');
            /* den dritten ersetzen durch aktuellen Ton */
            if (Aktuellereihe[3] == '#' || Aktuellereihe[3] == 'b') {
              Aktuellereihe[3] = '';
            }
            if (Aktuellereihe[2] == 'C') {
              Aktuellereihe[2] = 'D';
              /*
						if (vorzeichen == "raute"){                    
							Aktuellereihe[2] = Aktuellereihe[2] + "\#";
						}
					
						if (vorzeichen == "b"){
							Aktuellereihe[2] = Aktuellereihe[2] + "b";
						}
					
						if (vorzeichen == undefined){
							Aktuellereihe[3] = "";
						}
						*/
              Reihe[i] = Aktuellereihe.join('');
            } else if (Aktuellereihe[2] == 'D') {
              Aktuellereihe[2] = 'E';
              /*
						if (vorzeichen == "raute"){                    
							Aktuellereihe[2] = Aktuellereihe[2] + "\#";
						}
					
						if (vorzeichen == "b"){
							Aktuellereihe[2] = Aktuellereihe[2] + "b";
						}
					
						if (vorzeichen == undefined){
							Aktuellereihe[3] = "";
						}
						*/
              Reihe[i] = Aktuellereihe.join('');
            } else if (Aktuellereihe[2] == 'E') {
              Aktuellereihe[2] = 'F';
              /*
						if (vorzeichen == "raute") {                    
							Aktuellereihe[2] = Aktuellereihe[2] + "\#";
						}
					
						if (vorzeichen == "b"){
							Aktuellereihe[2] = Aktuellereihe[2] + "b";
						}
						
						if (vorzeichen == undefined){
							Aktuellereihe[3] = "";
						}
						*/
              Reihe[i] = Aktuellereihe.join('');
            } else if (Aktuellereihe[2] == 'F') {
              Aktuellereihe[2] = 'G';
              /*
						if(vorzeichen == "raute"){                    
							Aktuellereihe[2] = Aktuellereihe[2] + "\#";
						}
					
						if (vorzeichen == "b"){
							Aktuellereihe[2] = Aktuellereihe[2] + "b";
						}
					
						if (vorzeichen == undefined){
							Aktuellereihe[3] = "";
						}
						*/
              Reihe[i] = Aktuellereihe.join('');
            } else if (Aktuellereihe[2] == 'G') {
              Aktuellereihe[2] = 'A';
              /*
						if (vorzeichen == "raute" && (Aktuellereihe[3] != "\#" || Aktuellereihe[3] == "b")) {
							Aktuellereihe[2] = Aktuellereihe[2] + "\#";
						}	
					
						if (vorzeichen == "raute"){                    
							Aktuellereihe[2] = Aktuellereihe[2] + "\#";
						}
					
						if (vorzeichen == "b"){
							Aktuellereihe[2] = Aktuellereihe[2] + "b";
						}
						*/
              Reihe[i] = Aktuellereihe.join('');
            } else if (Aktuellereihe[2] == 'A') {
              Aktuellereihe[2] = 'B';
              /*
						if (vorzeichen == "raute" && (Aktuellereihe[3] != "\#" || Aktuellereihe[3] == "b")) {
							Aktuellereihe[2] = Aktuellereihe[2] + "\#";
						}
					
						if (vorzeichen == "raute"){                    
							Aktuellereihe[2] = Aktuellereihe[2] + "\#";
						}
					
						if (vorzeichen == "b"){
							Aktuellereihe[2] = Aktuellereihe[2] + "b";
						}
						*/
              Reihe[i] = Aktuellereihe.join('');
            } else if (Aktuellereihe[2] == 'B') {
              Aktuellereihe[2] = 'C';
              /*
						if(vorzeichen == "raute" && (Aktuellereihe[3] != "\#" || Aktuellereihe[3] == "b")){
							Aktuellereihe[2] = Aktuellereihe[2] + "\#";
						}
					
						if (vorzeichen == "raute") {                    
							Aktuellereihe[2] = Aktuellereihe[2] + "\#";
						}
					
						if( vorzeichen == "b"){
							Aktuellereihe[2] = Aktuellereihe[2] + "b";
						}
						*/
              Reihe[i] = Aktuellereihe.join('');
            } else {
            }
          } else {
            /* hier die Melodieabschnitte bearbeiten */
            var Derarray = Reihe[i].split('');
            for (var x = 0; x < Derarray.length; ++x) {
              /* zum Erstellen von a'' oder A,, -Klumpen */
              var allefertig = false;
              var mitzaehl = 0;
              if (Derarray[x + 1] == '\'' || Derarray[x + 1] == ',') {
                do {
                  mitzaehl = mitzaehl + 1;
                  if (Derarray[x + mitzaehl] == '\'') {
                    Derarray[x] = Derarray[x] + '\'';
                    Derarray[x + mitzaehl] = '';  /* Arrays mit ' l�schen */
                  } else if (Derarray[x + mitzaehl] == ',') {
                    Derarray[x] = Derarray[x] + ',';
                    Derarray[x + mitzaehl] = '';  /* Arrays mit ' l�schen */
                  } else {
                    allefertig = true;  /* wenn alle ' in dem Abschnitt fertig sind - Ende. */
                  }
                } while (allefertig == false);
              } else {
              }
            }
            for (var y = 0; y < Derarray.length; ++y) {
              /* Tonh�he �ndern */
              var Miniarray = Derarray[y].split('');
              if (Miniarray[0] == 'B' && Miniarray[1] == ',') {
                /* Ausnahmefall 1 (, l�schen) */
                Miniarray[0] = 'C';
                Miniarray[1] = '';
              } else if (Miniarray[0] == 'b' && Miniarray[1] == '\'') {
                /* Ausnahmefall 2 (' hinzuf�gen) */
                Miniarray[0] = 'c';
                Miniarray[1] = '\'\'';
              } else if (Miniarray[0] == 'C') {
                Miniarray[0] = 'D';
              } else if (Miniarray[0] == 'D') {
                Miniarray[0] = 'E';
              } else if (Miniarray[0] == 'E') {
                Miniarray[0] = 'F';
              } else if (Miniarray[0] == 'F') {
                Miniarray[0] = 'G';
              } else if (Miniarray[0] == 'G') {
                Miniarray[0] = 'A';
              } else if (Miniarray[0] == 'A') {
                Miniarray[0] = 'B';
              } else if (Miniarray[0] == 'B') {
                Miniarray[0] = 'c';
              } else if (Miniarray[0] == 'c') {
                Miniarray[0] = 'd';
              } else if (Miniarray[0] == 'd') {
                Miniarray[0] = 'e';
              } else if (Miniarray[0] == 'e') {
                Miniarray[0] = 'f';
              } else if (Miniarray[0] == 'f') {
                Miniarray[0] = 'g';
              } else if (Miniarray[0] == 'g') {
                Miniarray[0] = 'a';
              } else if (Miniarray[0] == 'a') {
                Miniarray[0] = 'b';
              } else if (Miniarray[0] == 'b') {
                Miniarray[0] = 'c\'';
              }
              Derarray[y] = Miniarray.join('');
            }
            var alleszusammen = Derarray.join('');
            Reihe[i] = alleszusammen;
          }
        }
        tune.pure = Reihe.join('\n');
        return tune;
      }
      function tuneDown(tune) {
        // Adaption of Jens Wollschl�ger's ABC-Transposer (http://www.8ung.at/abctransposer/)
        var neu = escape(tune.pure);
        var Reihe = neu.split('%0D%0A');
        Reihe = neu.split('%0A');
        for (var i = 0; i < Reihe.length; ++i) {
          Reihe[i] = unescape(Reihe[i]);
          /* Macht die Steuerzeichen wieder weg */
          var Aktuellereihe = Reihe[i].split('');
          /* nochmal bei C. Walshaw crosschecken, ob alle m�gl. ausser K: erfasst. */
          if (Aktuellereihe[0] == 'A' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'B' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'C' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'D' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'E' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'F' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'G' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'H' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'I' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'J' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'L' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'M' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'N' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'O' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'P' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'Q' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'R' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'S' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'T' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'U' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'V' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'W' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'X' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'Y' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'Z' && Aktuellereihe[1] == ':') {
          } else if (Aktuellereihe[0] == 'K' && Aktuellereihe[1] == ':') {
            /* k: Feld wird hier behandelt */
            var Leerzeichenweg = Reihe[i].split(' ');
            /* weil manchmal Leerzeichen nachm k */
            var sindweg = Leerzeichenweg.join('');
            Aktuellereihe = sindweg.split('');
            /* den dritten ersetzen durch aktuellen Ton */
            if (Aktuellereihe[3] == '#' || Aktuellereihe[3] == 'b') {
              Aktuellereihe[3] = '';
            }
            if (Aktuellereihe[2] == 'C') {
              Aktuellereihe[2] = 'B';
              Reihe[i] = Aktuellereihe.join('');
            } else if (Aktuellereihe[2] == 'D') {
              Aktuellereihe[2] = 'C';
              Reihe[i] = Aktuellereihe.join('');
            } else if (Aktuellereihe[2] == 'E') {
              Aktuellereihe[2] = 'D';
              Reihe[i] = Aktuellereihe.join('');
            } else if (Aktuellereihe[2] == 'F') {
              Aktuellereihe[2] = 'E';
              Reihe[i] = Aktuellereihe.join('');
            } else if (Aktuellereihe[2] == 'G') {
              Aktuellereihe[2] = 'F';
              Reihe[i] = Aktuellereihe.join('');
            } else if (Aktuellereihe[2] == 'A') {
              Aktuellereihe[2] = 'G';
              Reihe[i] = Aktuellereihe.join('');
            } else if (Aktuellereihe[2] == 'B') {
              Aktuellereihe[2] = 'A';
              Reihe[i] = Aktuellereihe.join('');
            } else {
            }
          } else {
            /* hier die Melodieabschnitte bearbeiten */
            var Derarray = Reihe[i].split('');
            for (var x = 0; x < Derarray.length; ++x) {
              /* zum Erstellen von a'' oder A,, -Klumpen */
              var allefertig = false;
              var mitzaehl = 0;
              if (Derarray[x + 1] == '\'' || Derarray[x + 1] == ',') {
                do {
                  mitzaehl = mitzaehl + 1;
                  if (Derarray[x + mitzaehl] == '\'') {
                    Derarray[x] = Derarray[x] + '\'';
                    Derarray[x + mitzaehl] = '';  /* Arrays mit ' l�schen */
                  } else if (Derarray[x + mitzaehl] == ',') {
                    Derarray[x] = Derarray[x] + ',';
                    Derarray[x + mitzaehl] = '';  /* Arrays mit ' l�schen */
                  } else {
                    allefertig = true;  /* wenn alle ' in dem Abschnitt fertig sind - Ende. */
                  }
                } while (allefertig == false);
              } else {
              }
            }
            for (var y = 0; y < Derarray.length; ++y) {
              /* Tonh�he �ndern */
              var Miniarray = Derarray[y].split('');
              if (Miniarray[0] == 'C' && Miniarray[1] == ',') {
                /* Ausnahmefall 1 (, hinzuf�gen) */
                Miniarray[0] = 'B';
                Miniarray[1] = ',,';
              } else if (Miniarray[0] == 'c' && Miniarray[1] == '\'') {
                /* Ausnahmefall 2 (' hinzuf�gen) */
                Miniarray[0] = 'b';
                Miniarray[1] = '';
              } else if (Miniarray[0] == 'C') {
                Miniarray[0] = 'B,';
              } else if (Miniarray[0] == 'D') {
                Miniarray[0] = 'C';
              } else if (Miniarray[0] == 'E') {
                Miniarray[0] = 'D';
              } else if (Miniarray[0] == 'F') {
                Miniarray[0] = 'E';
              } else if (Miniarray[0] == 'G') {
                Miniarray[0] = 'F';
              } else if (Miniarray[0] == 'A') {
                Miniarray[0] = 'G';
              } else if (Miniarray[0] == 'B') {
                Miniarray[0] = 'A';
              } else if (Miniarray[0] == 'c') {
                Miniarray[0] = 'B';
              } else if (Miniarray[0] == 'd') {
                Miniarray[0] = 'c';
              } else if (Miniarray[0] == 'e') {
                Miniarray[0] = 'd';
              } else if (Miniarray[0] == 'f') {
                Miniarray[0] = 'e';
              } else if (Miniarray[0] == 'g') {
                Miniarray[0] = 'f';
              } else if (Miniarray[0] == 'a') {
                Miniarray[0] = 'g';
              } else if (Miniarray[0] == 'b') {
                Miniarray[0] = 'a';
              }
              Derarray[y] = Miniarray.join('');
            }
            var alleszusammen = Derarray.join('');
            Reihe[i] = alleszusammen;
          }
        }
        tune.pure = Reihe.join('\n');
        return tune;
      }
      function getSampleAbc(tune, startFromBar, numberOfBars) {
        var tuneSplits = [];
        var barSplits = [];
        var barSplit = '';
        var barLength = 0;
        var dotsLineSplits = [];
        var newAbc = '';
        var beginOfLine = '';
        var barPattern = /\|/g;
        //matches | globally (every occurence)
        var barMatches = [];
        var titleCount = 0;
        var totBarCount = 0;
        var isHeaderLine = false;
        var isNeeded = false;
        var isBar = false;
        var isLastBar = false;
        var isInFocus = true;
        var simulateTitle = false;
        tuneSplits = tune.pure.split('\n');
        for (var i = 0; i < tuneSplits.length; i++) {
          isHeaderLine = false;
          isBar = false;
          isNeeded = false;
          simulateTitle = false;
          if (isInFocus) {
            // Abc-Standard
            beginOfLine = tuneSplits[i].substring(0, 2);
            if (beginOfLine == 'X:') {
              isHeaderLine = true;
              isNeeded = true;
            } else if (beginOfLine == 'M:') {
              isHeaderLine = true;
              isNeeded = true;
            } else if (beginOfLine == 'L:') {
              isHeaderLine = true;
              isNeeded = true;
            } else if (beginOfLine == 'K:') {
              isHeaderLine = true;
              isNeeded = true;
            } else if (beginOfLine == 'T:') {
              isHeaderLine = true;
              // TODO: titles have to be included -> talk to Paul for options
              if (titleCount == 0) {
                // Only print first title
                simulateTitle = true;
                isNeeded = true;
              }
              titleCount = titleCount + 1;
            } else {
              barSplits = tuneSplits[i].split('\n');
              barSplits = barSplits[0].split('|');
              // Annahmen: 
              //-Es gibt keine Takte, die �ber zwei Zeilen verteilt sind.
              // Es braucht im Minimum einen Takt-Strich als Hinweise daf�r,
              // dass es sich um eine Dots-Line handelt 
              // Erster Takt-Strich am Beginn der Line gibt ein String mit 0 Zeichen
              if (barSplits.length <= 1) {
                isHeaderLine = true;
                isNeeded = false;
              } else {
                for (var z = 0; z < barSplits.length; z++) {
                  barSplit = barSplits[z].replace(/^\s+|\s+$/g, '');
                  if (isInFocus) {
                    isBar = false;
                    isNeeded = false;
                    barLength = barSplit.length;
                    if (barLength == 0) {
                    } else if (barLength < 4) {
                      // Auftakt (Annahme: Maximum 3 Zeichen)
                      // TODO: Auftakte mit Fingering, oder Triolen z�hlen noch als Takte, weil barLength >= 4!
                      isNeeded = true;
                    } else {
                      // Minimum 4 Zeichen
                      isBar = true;
                      totBarCount = totBarCount + 1;
                    }
                    if (isBar) {
                      if (startFromBar <= totBarCount && totBarCount < startFromBar + numberOfBars) {
                        isNeeded = true;
                        if (totBarCount == startFromBar + numberOfBars - 1) {
                          isLastBar = true;
                        }
                      } else {
                        // Erster Takt, der nicht mehr im Anzeige-Bereich ist.
                        isInFocus = false;
                      }
                    }
                    if (isNeeded) {
                      newAbc = newAbc + barSplit;
                      newAbc = newAbc + '|';
                      if (isLastBar) {
                        // N�chster Takt nicht mehr in Fokus
                        isInFocus = false;
                      }
                    }
                  }
                }
              }
            }
            if (isHeaderLine && isNeeded) {
              if (simulateTitle) {
                newAbc = newAbc + 'T: ';
                newAbc = newAbc + '\n';
              } else {
                newAbc = newAbc + tuneSplits[i];
                newAbc = newAbc + '\n';
              }
            }
          }
        }
        return newAbc;
      }
      function addVideo(tuneBook, intTuneId, videoSource, videoCode, videoDescription) {
        var tune, video;
        tune = getTuneById(tuneBook, intTuneId);
        if (tune != null) {
          //Todo: Don't add if source/code already exists.
          video = createVideo(videoSource, videoCode, videoDescription);
          tune.videos.push(video);
        }
        return video;
      }
      function addWebsite(tuneBook, intTuneId, url) {
        var tune, wsite;
        tune = getTuneById(tuneBook, intTuneId);
        if (tune != null) {
          //Todo: Don't add if url already exists.
          wsite = createWebsite(url);
          tune.wsites.push(wsite);
        }
        return wsite;
      }
      function deleteVideo(tuneBook, intTuneId, videoSource, videoCode) {
        var tune, video, index, remove = false;
        tune = getTuneById(tuneBook, intTuneId);
        if (tune != null) {
          for (var i = 0; i < tune.videos.length; i++) {
            if (videoSource == tune.videos[i].source && videoCode == tune.videos[i].code) {
              index = i;
              remove = true;
            }
          }
          // Video löschen
          if (remove) {
            tune.videos.splice(index, 1);
          }
        }
      }
      function deleteWebsite(tuneBook, intTuneId, url) {
        var tune, wsite, index, remove = false;
        tune = getTuneById(tuneBook, intTuneId);
        if (tune != null) {
          for (var i = 0; i < tune.wsites.length; i++) {
            if (url == tune.wsites[i].url) {
              index = i;
              remove = true;
            }
          }
          // Website löschen
          if (remove) {
            tune.wsites.splice(index, 1);
          }
        }
      }
      function getVideoById(tuneBook, intTuneId, videoSource, videoCode) {
        var tune = getTuneById(tuneBook, intTuneId);
        if (tune != null) {
          for (var i = 0; i < tune.videos.length; i++) {
            if (videoSource == tune.videos[i].source && videoCode == tune.videos[i].code) {
              return tune.videos[i];
            }
          }
        }
        return null;
      }
      function getTuneById(tuneBook, intTuneId) {
        if (tuneBook != null) {
          for (var i = 0; i < tuneBook.tuneSets.length; i++) {
            for (var z = 0; z < tuneBook.tuneSets[i].tuneSetPositions.length; z++) {
              if (intTuneId == tuneBook.tuneSets[i].tuneSetPositions[z].tune.intTuneId) {
                return tuneBook.tuneSets[i].tuneSetPositions[z].tune;
              }
            }
          }
        }
        return null;
      }
      function getTuneSetById(tuneBook, tuneSetId) {
        if (tuneBook != null) {
          for (var i = 0; i < tuneBook.tuneSets.length; i++) {
            if (tuneSetId == tuneBook.tuneSets[i].tuneSetId) {
              return tuneBook.tuneSets[i];
            }
          }
        }
        return null;
      }
      function getPlaylistById(tuneBook, playlistId) {
        if (tuneBook != null) {
          for (var i = 0; i < tuneBook.playlists.length; i++) {
            if (playlistId == tuneBook.playlists[i].id) {
              return tuneBook.playlists[i];
            }
          }
        }
        return null;
      }
      function getPlaylistPosition(playlist, position) {
        if (playlist != null) {
          for (var i = 0; i < playlist.playlistPositions.length; i++) {
            if (position == playlist.playlistPositions[i].position) {
              return playlist.playlistPositions[i];
            }
          }
        }
        return null;
      }
      function extractTunes(tuneSets) {
        // Extract Tunes form TuneSets.
        var tunes = [];
        var addToTunes = false;
        for (var i = 0; i < tuneSets.length; i++) {
          for (var z = 0; z < tuneSets[i].tuneSetPositions.length; z++) {
            addToTunes = true;
            for (var y = 0; y < tunes.length; y++) {
              if (tunes[y].intTuneId == tuneSets[i].tuneSetPositions[z].tune.intTuneId) {
                addToTunes = false;
              }
            }
            if (addToTunes) {
              tunes.push(tuneSets[i].tuneSetPositions[z].tune);
            }
          }
        }
        return tunes;
      }
      function extractTunesWithinPlayDatePeriod(tuneBook, playDateFilter) {
        // Extract Tunes form TuneSets.
        var tunes = [];
        var addToTunes = false;
        if (tuneBook != null) {
          for (var i = 0; i < tuneBook.tuneSets.length; i++) {
            for (var z = 0; z < tuneBook.tuneSets[i].tuneSetPositions.length; z++) {
              addToTunes = true;
              var today = moment();
              var days = 0;
              days = 0;
              var playDate = tuneBook.tuneSets[i].tuneSetPositions[z].tune.lastPlayed;
              if (playDate != undefined && playDate != null) {
                var checkDay = moment(tuneBook.tuneSets[i].tuneSetPositions[z].tune.lastPlayed);
                if (checkDay != null && checkDay != undefined) {
                  days = today.diff(checkDay, 'days');
                  if (playDateFilter == 'All Tunes') {
                  } else {
                    if (playDateFilter == 'Played Last Day' && days > 1) {
                      addToTunes = false;
                    } else if (playDateFilter == 'Played Last Week' && days > 7) {
                      addToTunes = false;
                    } else if (playDateFilter == 'Played Last Month' && days > 30) {
                      addToTunes = false;
                    } else if (playDateFilter == 'Played Last Year' && days > 365) {
                      addToTunes = false;
                    } else if (playDateFilter == 'Played Never') {
                      addToTunes = false;
                    }
                  }
                } else {
                  if (playDateFilter == 'Played Never') {
                  } else {
                    addToTunes = false;
                  }
                }
                for (var y = 0; y < tunes.length; y++) {
                  if (tunes[y].intTuneId == tuneBook.tuneSets[i].tuneSetPositions[z].tune.intTuneId) {
                    addToTunes = false;
                  }
                }
                if (addToTunes) {
                  tunes.push(tuneBook.tuneSets[i].tuneSetPositions[z].tune);
                }
              }
            }
          }
        }
        return tunes;
      }
      function extractSetsWithinPlayDatePeriod(tuneBook, playDateFilter) {
        // Extract Tunes form TuneSets.
        var sets = [];
        var tunePlayedWithinPlayDatePeriod = true;
        var tunesPlayedWithinPlayDatePeriod = 0;
        if (tuneBook != null) {
          for (var i = 0; i < tuneBook.tuneSets.length; i++) {
            tunePlayedWithinPlayDatePeriod = true;
            tunesPlayedWithinPlayDatePeriod = 0;
            for (var z = 0; z < tuneBook.tuneSets[i].tuneSetPositions.length; z++) {
              var today = moment();
              var days = 0;
              days = 0;
              var playDate = tuneBook.tuneSets[i].tuneSetPositions[z].tune.lastPlayed;
              if (playDate != undefined && playDate != null) {
                var checkDay = moment(tuneBook.tuneSets[i].tuneSetPositions[z].tune.lastPlayed);
                if (checkDay != null && checkDay != undefined) {
                  days = today.diff(checkDay, 'days');
                  if (playDateFilter == 'All Sets') {
                  } else {
                    if (playDateFilter == 'Played Last Day' && days > 1) {
                      tunePlayedWithinPlayDatePeriod = false;
                    } else if (playDateFilter == 'Played Last Week' && days > 7) {
                      tunePlayedWithinPlayDatePeriod = false;
                    } else if (playDateFilter == 'Played Last Month' && days > 30) {
                      tunePlayedWithinPlayDatePeriod = false;
                    } else if (playDateFilter == 'Played Last Year' && days > 365) {
                      tunePlayedWithinPlayDatePeriod = false;
                    } else if (playDateFilter == 'Played Never') {
                      tunePlayedWithinPlayDatePeriod = false;
                    }
                  }
                } else {
                  if (playDateFilter == 'Played Never') {
                  } else {
                    tunePlayedWithinPlayDatePeriod = false;
                  }
                }
                if (tunePlayedWithinPlayDatePeriod) {
                  tunesPlayedWithinPlayDatePeriod = tunesPlayedWithinPlayDatePeriod + 1;
                }
              }
            }
            if (tunesPlayedWithinPlayDatePeriod > 0) {
              sets.push(tuneBook.tuneSets[i]);
            }
          }
        }
        return sets;
      }
      function extractTuneSetPositions(tuneSets) {
        // Extract TuneSetPositions from TuneSets.
        var tuneSetPositions = [];
        for (var i = 0; i < tuneSets.length; i++) {
          for (var z = 0; z < tuneSets[i].tuneSetPositions.length; z++) {
            tuneSetPositions.push(tuneSets[i].tuneSetPositions[z]);
          }
        }
        return tuneSetPositions;
      }
      function extractFirstTuneSetPositions(tuneSets) {
        // Extract First TuneSetPositions from all TuneSets.
        var tuneSetPositions = [];
        for (var i = 0; i < tuneSets.length; i++) {
          for (var z = 0; z < tuneSets[i].tuneSetPositions.length; z++) {
            if (tuneSets[i].tuneSetPositions[z].position == '1') {
              tuneSetPositions.push(tuneSets[i].tuneSetPositions[z]);
            }
          }
        }
        return tuneSetPositions;
      }
      function extractFirstTuneSetPosition(tuneSet) {
        // Extract First TuneSetPosition from a TuneSet.
        for (var z = 0; z < tuneSet.tuneSetPositions.length; z++) {
          if (tuneSet.tuneSetPositions[z].position == '1') {
            return tuneSet.tuneSetPositions[z];
          }
        }
      }
      function getTuneSetPositionByPosition(tuneSet, position) {
        // Get TuneSetPosition from a TuneSet by position
        for (var z = 0; z < tuneSet.tuneSetPositions.length; z++) {
          if (tuneSet.tuneSetPositions[z].position == position) {
            return tuneSet.tuneSetPositions[z];
          }
        }
      }
      function getTuneSetsByIntTuneId(tuneBook, intTuneId) {
        var tuneSets = [];
        if (tuneBook != null) {
          for (var i = 0; i < tuneBook.tuneSets.length; i++) {
            for (var z = 0; z < tuneBook.tuneSets[i].tuneSetPositions.length; z++) {
              if (intTuneId == tuneBook.tuneSets[i].tuneSetPositions[z].tune.intTuneId) {
                tuneSets.push(tuneBook.tuneSets[i]);
              }
            }
          }
        }
        return tuneSets;
      }
      function getPlaylistsByIntTuneId(tuneBook, intTuneId) {
        var tuneSets = getTuneSetsByIntTuneId(tuneBook, intTuneId);
        var playlists = [];
        var playlistSelected = false;
        if (tuneBook != null) {
          for (var i = 0; i < tuneSets.length; i++) {
            for (var z = 0; z < tuneBook.playlists.length; z++) {
              for (var y = 0; y < tuneBook.playlists[z].playlistPositions.length; y++) {
                if (tuneBook.playlists[z].playlistPositions[y].tuneSet == tuneSets[i]) {
                  playlistSelected = false;
                  for (var w = 0; w < playlists.length; w++) {
                    if (playlists[w] == tuneBook.playlists[z]) {
                      playlistSelected = true;
                    }
                  }
                  if (!playlistSelected) {
                    playlists.push(tuneBook.playlists[z]);
                  }
                }
              }
            }
          }
        }
        return playlists;
      }
      function getTuneSetPositionsByIntTuneId(tuneBook, intTuneId) {
        var tuneSetPositions = [];
        if (tuneBook != null) {
          for (var i = 0; i < tuneBook.tuneSets.length; i++) {
            for (var z = 0; z < tuneBook.tuneSets[i].tuneSetPositions.length; z++) {
              if (intTuneId == tuneBook.tuneSets[i].tuneSetPositions[z].tune.intTuneId) {
                tuneSetPositions.push(tuneBook.tuneSets[i].tuneSetPositions[z]);
              }
            }
          }
        }
        return tuneSetPositions;
      }
      function getTuneSetsAsTuneSetPositions(tuneBook, intTuneId) {
        // Extract TuneSetPositions from TuneSets.
        var tuneSetIds = [];
        var tuneSetPositions = [];
        //First get TuneSetIds for intTuneId
        if (tuneBook != null) {
          for (var i = 0; i < tuneBook.tuneSets.length; i++) {
            for (var z = 0; z < tuneBook.tuneSets[i].tuneSetPositions.length; z++) {
              if (intTuneId == tuneBook.tuneSets[i].tuneSetPositions[z].tune.intTuneId) {
                tuneSetIds.push(tuneBook.tuneSets[i].tuneSetId);
              }
            }
          }
        }
        //Then get TuneSetPositions for the tuneSetIds
        for (var y = 0; y < tuneSetIds.length; y++) {
          getTuneSetPositionsForTuneSetId(tuneBook, tuneSetIds[y], tuneSetPositions);
        }
        return tuneSetPositions;
      }
      function getTuneSetPositionsForTuneSetId(tuneBook, tuneSetId, tuneSetPositions) {
        // Extract TuneSetPositions from TuneSets.
        if (tuneBook != null) {
          for (var i = 0; i < tuneBook.tuneSets.length; i++) {
            for (var z = 0; z < tuneBook.tuneSets[i].tuneSetPositions.length; z++) {
              if (tuneSetId == tuneBook.tuneSets[i].tuneSetPositions[z].tuneSetId) {
                tuneSetPositions.push(tuneBook.tuneSets[i].tuneSetPositions[z]);
              }
            }
          }
        }
        return tuneSetPositions;
      }
      function eliminateThe(string) {
        var theSplits = [];
        if (string != 'undefined' && string != null) {
          theSplits = string.split(',');
        }
        return theSplits[0];
      }
      ;
      function getPlaylistPositionsByTuneSetId(tuneBook, tuneSetId) {
        var playlist, playlistPositions;
        playlistPositions = [];
        for (var i = 0; i < tuneBook.playlists.length; i++) {
          playlist = tuneBook.playlists[i];
          for (var z = 0; z < playlist.playlistPositions.length; z++) {
            if (playlist.playlistPositions[z].tuneSet.tuneSetId == tuneSetId) {
              playlistPositions.push(playlist.playlistPositions[z]);
            }
          }
        }
        return playlistPositions;
      }
      function getPlaylistPosition(tuneBook, playlistId, playlistPositionNr) {
        var playlist, playlistPosition;
        playlist = getPlaylistById(tuneBook, playlistId);
        for (var z = 0; z < playlist.playlistPositions.length; z++) {
          if (playlist.playlistPositions[z].position == playlistPositionNr) {
            playlistPosition = playlist.playlistPositions[z];
          }
        }
        return playlistPosition;
      }
      function getPlaylistsByTuneSetId(tuneBook, tuneSetId) {
        var playlist, playlists, playlistAdded;
        playlists = [];
        for (var i = 0; i < tuneBook.playlists.length; i++) {
          playlist = tuneBook.playlists[i];
          playlistAdded = false;
          for (var z = 0; z < playlist.playlistPositions.length && !playlistAdded; z++) {
            if (playlist.playlistPositions[z].tuneSet.tuneSetId == tuneSetId) {
              playlists.push(playlist);
              playlistAdded = true;
            }
          }
        }
        return playlists;
      }
      function filterTuneSets(tuneBook, filterOptions) {
        var keyMatch = false;
        var typeMatch = false;
        var colorMatch = false;
        var skillMatch = false;
        var eventMatch = false;
        var bandMatch = false;
        var playMatch = false;
        var playMin, playMax, updateMin, updateMax;
        var freqMatch = false;
        var updateMatch = false;
        var tuneSetsFiltered = [];
        var playlists;
        for (var i = 0; i < tuneBook.tuneSets.length; i++) {
          keyMatch = false;
          typeMatch = false;
          colorMatch = false;
          skillMatch = false;
          eventMatch = false;
          bandMatch = false;
          playMatch = false;
          freqMatch = false;
          updateMatch = false;
          if (filterOptions.key == '' || filterOptions.key == 'All Keys' || filterOptions.key == null) {
            keyMatch = true;
          }
          if (filterOptions.type == '' || filterOptions.type == 'All Types' || filterOptions.type == null) {
            typeMatch = true;
          }
          if (filterOptions.color == '' || filterOptions.color == 'All Colors' || filterOptions.color == null) {
            colorMatch = true;
          }
          if (filterOptions.skill == '' || filterOptions.skill == '?' || filterOptions.skill == null) {
            skillMatch = true;
          }
          if (filterOptions.plmin == '' || filterOptions.plmin == '05.10.2012' || filterOptions.plmin == null || filterOptions.plmax == '' || filterOptions.plmax == null) {
            playMatch = true;
          } else {
            playMin = moment(filterOptions.plmin, 'DD.MM.YYYY').startOf('day');
            playMax = moment(filterOptions.plmax, 'DD.MM.YYYY').endOf('day');
          }
          if (filterOptions.updmin == '' || filterOptions.updmin == '05.10.2012' || filterOptions.updmin == null || filterOptions.updmax == '' || filterOptions.updmax == null) {
            updateMatch = true;
          } else {
            updateMin = moment(filterOptions.updmin, 'DD.MM.YYYY').startOf('day');
            updateMax = moment(filterOptions.updmax, 'DD.MM.YYYY').endOf('day');
          }
          if (filterOptions.freqcomp == '' || filterOptions.freqcomp == null || filterOptions.freq == '' || filterOptions.freq == null) {
            freqMatch = true;
          }
          if (filterOptions.event == '' || filterOptions.event == 'All Events' || filterOptions.event == null) {
            eventMatch = true;
          }
          if (filterOptions.band == '' || filterOptions.band == 'All Bands' || filterOptions.band == null) {
            bandMatch = true;
          }
          if (!eventMatch || !bandMatch) {
            playlists = getPlaylistsByTuneSetId(tuneBook, tuneBook.tuneSets[i].tuneSetId);
            for (var y = 0; y < playlists.length; y++) {
              if (filterOptions.event == playlists[y].event) {
                eventMatch = true;
              }
              if (filterOptions.band == playlists[y].band) {
                bandMatch = true;
              }
            }
          }
          if (!keyMatch || !typeMatch || !colorMatch || !skillMatch || !playMatch || !updateMatch || !freqMatch) {
            for (var z = 0; z < tuneBook.tuneSets[i].tuneSetPositions.length; z++) {
              if (!keyMatch && tuneBook.tuneSets[i].tuneSetPositions[z].tune.key == filterOptions.key) {
                keyMatch = true;
              }
              if (!typeMatch && tuneBook.tuneSets[i].tuneSetPositions[z].tune.type == filterOptions.type) {
                typeMatch = true;
              }
              if (!colorMatch && tuneBook.tuneSets[i].tuneSetPositions[z].tune.color == filterOptions.color) {
                colorMatch = true;
              }
              if (!skillMatch && tuneBook.tuneSets[i].tuneSetPositions[z].tune.skill == filterOptions.skill) {
                skillMatch = true;
              }
              if (!playMatch && tuneBook.tuneSets[i].tuneSetPositions[z].tune.lastPlayed != null) {
                var lastPlayed = moment(tuneBook.tuneSets[i].tuneSetPositions[z].tune.lastPlayed);
                if (!lastPlayed.isBefore(playMin) && !lastPlayed.isAfter(playMax)) {
                  playMatch = true;
                }
              }
              if (!updateMatch && tuneBook.tuneSets[i].tuneSetPositions[z].tune.lastModified != null) {
                var lastModified = moment(tuneBook.tuneSets[i].tuneSetPositions[z].tune.lastModified);
                if (!lastModified.isBefore(updateMin) && !lastModified.isAfter(updateMax)) {
                  updateMatch = true;
                }
              }
              if (!freqMatch) {
                if (filterOptions.freqcomp == 'LT' && parseInt(tuneBook.tuneSets[i].tuneSetPositions[z].tune.frequencyPlayed) < parseInt(filterOptions.freq) || filterOptions.freqcomp == 'GE' && parseInt(tuneBook.tuneSets[i].tuneSetPositions[z].tune.frequencyPlayed) >= parseInt(filterOptions.freq)) {
                  freqMatch = true;
                }
              }
            }
          }
          if (keyMatch && typeMatch && colorMatch && skillMatch && eventMatch && bandMatch && playMatch && updateMatch && freqMatch) {
            tuneSetsFiltered.push(tuneBook.tuneSets[i]);
          }
        }
        return tuneSetsFiltered;
      }
      function filterTunes(tunes, filterOptions) {
        var keyMatch = false;
        var typeMatch = false;
        var colorMatch = false;
        var skillMatch = false;
        var playMatch = false;
        var playMin, playMax, updateMin, updateMax;
        var freqMatch = false;
        var updateMatch = false;
        var tunesFiltered = [];
        for (var i = 0; i < tunes.length; i++) {
          keyMatch = false;
          typeMatch = false;
          colorMatch = false;
          skillMatch = false;
          playMatch = false;
          freqMatch = false;
          updateMatch = false;
          if (filterOptions.key == '' || filterOptions.key == 'All Keys' || filterOptions.key == null) {
            keyMatch = true;
          }
          if (filterOptions.type == '' || filterOptions.type == 'All Types' || filterOptions.type == null) {
            typeMatch = true;
          }
          if (filterOptions.color == '' || filterOptions.color == 'All Colors' || filterOptions.color == null) {
            colorMatch = true;
          }
          if (filterOptions.skill == '' || filterOptions.skill == '?' || filterOptions.skill == null) {
            skillMatch = true;
          }
          if (filterOptions.plmin == '' || filterOptions.plmin == '05.10.2012' || filterOptions.plmin == null || filterOptions.plmax == '' || filterOptions.plmax == null) {
            playMatch = true;
          } else {
            playMin = moment(filterOptions.plmin, 'DD.MM.YYYY').startOf('day');
            playMax = moment(filterOptions.plmax, 'DD.MM.YYYY').endOf('day');
          }
          if (filterOptions.updmin == '' || filterOptions.updmin == '05.10.2012' || filterOptions.updmin == null || filterOptions.updmax == '' || filterOptions.updmax == null) {
            updateMatch = true;
          } else {
            updateMin = moment(filterOptions.updmin, 'DD.MM.YYYY').startOf('day');
            updateMax = moment(filterOptions.updmax, 'DD.MM.YYYY').endOf('day');
          }
          if (filterOptions.freqcomp == '' || filterOptions.freqcomp == null || filterOptions.freq == '' || filterOptions.freq == null) {
            freqMatch = true;
          }
          if (!keyMatch || !typeMatch || !colorMatch || !skillMatch || !playMatch || !updateMatch || !freqMatch) {
            if (!keyMatch && tunes[i].key == filterOptions.key) {
              keyMatch = true;
            }
            if (!typeMatch && tunes[i].type == filterOptions.type) {
              typeMatch = true;
            }
            if (!colorMatch && tunes[i].color == filterOptions.color) {
              colorMatch = true;
            }
            if (!skillMatch && tunes[i].skill == filterOptions.skill) {
              skillMatch = true;
            }
            if (!playMatch && tunes[i].lastPlayed != null) {
              var lastPlayed = moment(tunes[i].lastPlayed);
              if (!lastPlayed.isBefore(playMin) && !lastPlayed.isAfter(playMax)) {
                playMatch = true;
              }
            }
            if (!updateMatch && tunes[i].lastModified != null) {
              var lastModified = moment(tunes[i].lastModified);
              if (!lastModified.isBefore(updateMin) && !lastModified.isAfter(updateMax)) {
                updateMatch = true;
              }
            }
            if (!freqMatch) {
              if (filterOptions.freqcomp == 'LT' && parseInt(tunes[i].frequencyPlayed) < parseInt(filterOptions.freq) || filterOptions.freqcomp == 'GE' && parseInt(tunes[i].frequencyPlayed) >= parseInt(filterOptions.freq)) {
                freqMatch = true;
              }
            }
          }
          if (keyMatch && typeMatch && colorMatch && skillMatch && playMatch && updateMatch && freqMatch) {
            tunesFiltered.push(tunes[i]);
          }
        }
        return tunesFiltered;
      }
      function getPlaylistPositionsByIntTuneId(playlist, tuneBook, intTuneId) {
        var playlistPositions = [];
        var tuneSets = getTuneSetsByIntTuneId(tuneBook, intTuneId);
        for (var i = 0; i < tuneSets.length; i++) {
          for (var y = 0; y < playlist.playlistPositions.length; y++) {
            if (playlist.playlistPositions[y].tuneSet == tuneSets[i]) {
              playlistPositions.push(playlist.playlistPositions[y]);
            }
          }
        }
        return playlistPositions;
      }
      function initializeTuneSetPositionPlayInfosForPlaylist(tuneBook, playlistId) {
        var playlist, playlistPosition, tuneSet, tuneSetPosition, tuneSetPositionPlayInfo, partPlayInfos;
        playlist = getPlaylistById(tuneBook, playlistId);
        for (var i = 0; i < playlist.playlistPositions.length; i++) {
          playlistPosition = playlist.playlistPositions[i];
          tuneSet = playlistPosition.tuneSet;
          for (var z = 0; z < tuneSet.tuneSetPositions.length; z++) {
            tuneSetPositionPlayInfo = undefined;
            tuneSetPosition = tuneSet.tuneSetPositions[z];
            tuneSetPositionPlayInfo = getTuneSetPositionPlayInfo(tuneBook, playlistPosition, tuneSetPosition);
            if (tuneSetPositionPlayInfo == undefined) {
              partPlayInfos = [];
              tuneSetPositionPlayInfo = createTuneSetPositionPlayInfo(playlistPosition, tuneSetPosition, tuneSetPosition.repeat, partPlayInfos, tuneSetPosition.annotation);
              tuneBook.tuneSetPositionPlayInfos.push(tuneSetPositionPlayInfo);
            }
            // Setzen der aktuellen für die Playlist relevanten Play Infos (nötig für Bildschirm)
            // Hinweis: Ist eine TuneSetPosition zweimal in einer Playlist vorhanden,
            // dann wird die PlayInfo der letzten PlaylistPosition auf currentTuneSetPositionPLayInfo gesetzt.
            // -> es ist momentan nicht möglich ein TuneSet unter verschiedenen PlaylistPositions und mit
            // verschiedenen PlayInfos zu führen.
            tuneSetPosition.currentTuneSetPositionPlayInfo = tuneSetPositionPlayInfo;
          }
        }
      }
      // eTBk-API
      // eTBk is global (window.eTBk)
      // Public Constants
      eTBk.DEFAULT_COLOR = eTBK_DEFAULT_COLOR;
      eTBk.PATTERN_FINGER = eTBK_PATTERN_FINGER;
      eTBk.EXAMPLE_FILENAME = eTBk_EXAMPLE_FILENAME;
      eTBk.EXAMPLE_FILENAME_WITHOUTABC = eTBk_EXAMPLE_FILENAME_WITHOUTABC;
      eTBk.EXAMPLE_VERSION = eTBk_EXAMPLE_VERSION;
      // Public Methods
      eTBk.writeAbc = function (abcOption) {
        return writeAbc(currentTuneBook, abcOption);
      };
      eTBk.eliminateThe = function (string) {
        return eliminateThe(string);
      };
      eTBk.createDefaultAbcOption = function () {
        return createDefaultAbcOption();
      };
      eTBk.getSampleAbc = function (tune) {
        return getSampleAbc(tune, 1, 4);
      };
      eTBk.tuneUp = function (intTuneId) {
        var tune = eTBk.getTune(intTuneId);
        // Transpose up and Sync Tune-Key
        tune.key = eTBk.getTuneKey(tuneUp(tune));
      };
      eTBk.tuneDown = function (intTuneId) {
        var tune = eTBk.getTune(intTuneId);
        // Transpose down and Sync Tune-Key
        tune.key = eTBk.getTuneKey(tuneDown(tune));
      };
      eTBk.initializeTuneSet = function (intTuneId) {
        return initializeTuneSet(currentTuneBook.tuneSets, eTBk.getTune(intTuneId));
      };
      eTBk.initializePartPlayInfo = function () {
        return createPartPlayInfo('', '');
      };
      eTBk.initializeTuneSetPositionPlayInfosForPlaylist = function (playlistId) {
        initializeTuneSetPositionPlayInfosForPlaylist(currentTuneBook, playlistId);
      };
      eTBk.initializeTuneAndTuneSet = function () {
        if (eTBk.getCurrentTuneBook == null) {
          currentTuneBook = eTBk.initializeTuneBook();
          return currentTuneBook.tuneSets[0];
        } else {
          return initializeTuneAndTuneSet(currentTuneBook.tuneSets);
        }
      };
      eTBk.getTuneKey = function (tune) {
        return getAbcValue(tune.pure, 'K:', 'undefined');
      };
      eTBk.getTuneTitle = function (tune) {
        return getAbcValue(tune.pure, 'T:', 'undefined');
      };
      eTBk.getTuneType = function (tune) {
        return getAbcValue(tune.pure, 'R:', 'undefined').toLowerCase();
      };
      eTBk.getTuneId = function (tune) {
        return getAbcValue(tune.pure, 'X:', 'undefined');
      };
      eTBk.getTuneSite = function (tune, siteType) {
        var siteDirective = '%%etbk:' + siteType + ' ';
        return getAbcValue(tune.pure, siteDirective, '');
      };
      eTBk.addTunePlayDate = function (tune, newDate) {
        addTunePlayDate(tune, newDate);
      };
      eTBk.addTuneSetPlayDate = function (tuneSet, newDate) {
        addTuneSetPlayDate(tuneSet, newDate);
      };
      eTBk.setFrequencyPlayed = function (tuneSet) {
        setFrequencyPlayed(tuneSet);
      };
      eTBk.saveColorDirective = function (tuneSetPosition) {
        saveColorDirective(tuneSetPosition);
      };
      eTBk.saveSkillDirective = function (tuneSetPosition) {
        saveSkillDirective(tuneSetPosition);
      };
      eTBk.setRandomSort = function (tuneBook) {
        setRandomSort(tuneBook);
      };
      eTBk.storeTuneBookAbc = function () {
        // Generate TuneBook Abc from the current TuneBook and store it in localStorage
        localStorage.setItem(eTBK_STORAGE_ID_TUNEBOOK, JSON.stringify(writeAbc(currentTuneBook, createDefaultAbcOption())));
      };
      eTBk.storeSettings = function (settings) {
        // Store settings in localStorage
        localStorage.setItem(eTBK_STORAGE_ID_SETTINGS, JSON.stringify(settings));
      };
      eTBk.initializeTuneBook = function () {
        //TODO: Angleichen mit eTBk.initializeTuneSet und eTBk.initializeTuneAndTuneSet
        var abc = '';
        var includeEtbkDirective = true;
        abc = initializeAbcHeader();
        // First Tune
        abc += 'X: 1';
        abc += '\n';
        abc += 'T: New Tune';
        abc += '\n';
        currentTuneBook = new TuneBook(abc);
        currentTuneBook.tuneSets[0].tuneSetPositions[0].tune.intTuneId = 1;
        return currentTuneBook;
      };
      eTBk.getSettingsFromStore = function () {
        var settings = [];
        // Retrieve Settings from localStorage
        settings = JSON.parse(localStorage.getItem(eTBK_STORAGE_ID_SETTINGS) || '[]');
        return settings;
      };
      eTBk.moveTuneSetPosition = function (sourceTuneSetId, sourcePosition, targetTuneSetId, targetPosition, beforeOrAfter, moveOrCopy) {
        return moveTuneSetPosition(currentTuneBook, sourceTuneSetId, sourcePosition, targetTuneSetId, targetPosition, beforeOrAfter, moveOrCopy);
      };
      eTBk.moveUpPlaylistPosition = function (playlistId, position) {
        return moveUpPlaylistPosition(currentTuneBook, playlistId, position);
      };
      eTBk.moveDownPlaylistPosition = function (playlistId, position) {
        return moveDownPlaylistPosition(currentTuneBook, playlistId, position);
      };
      eTBk.addEmptyPlaylistPosition = function (playlistId) {
        return addEmptyPlaylistPosition(currentTuneBook, playlistId);
      };
      eTBk.addEmptyPlaylist = function () {
        return addEmptyPlaylist(currentTuneBook);
      };
      eTBk.deleteTuneSetPosition = function (iTuneSetId, iPosition) {
        return deleteTuneSetPosition(currentTuneBook, iTuneSetId, iPosition);
      };
      eTBk.deletePlaylistPosition = function (playlistId, position) {
        deletePlaylistPosition(currentTuneBook, playlistId, position);
      };
      eTBk.deletePlaylist = function (playlistId) {
        deletePlaylist(currentTuneBook, playlistId);
      };
      eTBk.copyPlaylist = function (playlistId) {
        copyPlaylist(currentTuneBook, playlistId);
      };
      eTBk.copyPlaylistPositionToOtherPlaylist = function (sourcePlaylistId, sourcePlaylistPositionNr, targetPlaylistId) {
        copyPlaylistPositionToOtherPlaylist(currentTuneBook, sourcePlaylistId, sourcePlaylistPositionNr, targetPlaylistId);
      };
      eTBk.getCurrentTuneBook = function () {
        if (currentTuneBook == null) {
          return getTuneBookFromLocalStorage();
        }
        return currentTuneBook;
      };
      eTBk.getTuneSet = function (tuneSetId) {
        return getTuneSetById(currentTuneBook, tuneSetId);
      };
      eTBk.getRandomTuneSetId = function (playDateFilter) {
        var sets = extractSetsWithinPlayDatePeriod(currentTuneBook, playDateFilter);
        var tuneSetIndex = getRandomTuneSetIndex(sets);
        return sets[tuneSetIndex].tuneSetId;
      };
      eTBk.getRandomIntTuneId = function (playDateFilter) {
        var tunes = extractTunesWithinPlayDatePeriod(currentTuneBook, playDateFilter);
        var tuneIndex = getRandomTuneIndex(tunes);
        return tunes[tuneIndex].intTuneId;
      };
      eTBk.getTune = function (intTuneId) {
        return getTuneById(currentTuneBook, intTuneId);
      };
      eTBk.deleteTuneSetPositionsAndTune = function (intTuneId) {
        var tuneSets = [];
        tuneSets = getTuneSetsByIntTuneId(eTBk.getCurrentTuneBook(), intTuneId);
        for (var i = 0; i < tuneSets.length; i++) {
          deleteTuneSetPositionsAndTune(tuneSets[i], intTuneId);
        }
      };
      eTBk.getTunes = function () {
        return extractTunes(eTBk.getCurrentTuneBook().tuneSets);
      };
      eTBk.getPlaylists = function () {
        return eTBk.getCurrentTuneBook().playlists;
      };
      eTBk.getPlaylist = function (playlistId) {
        return getPlaylistById(currentTuneBook, playlistId);
      };
      eTBk.getPlaylistPositionsByIntTuneId = function (playlistId, intTuneId) {
        return getPlaylistPositionsByIntTuneId(getPlaylistById(currentTuneBook, playlistId), currentTuneBook, intTuneId);
      };
      eTBk.getPlaylistPosition = function (playlistId, position) {
        return getPlaylistPosition(getPlaylistById(currentTuneBook, playlistId), position);
      };
      eTBk.getTunesFiltered = function (filterOptions) {
        // filterTuneSets bringt ganze TuneSets, auch wenn nur ein Tune matched.
        // Deshalb nachgelagert die nicht matchenden Tunes erneut rausfiltern.
        return filterTunes(extractTunes(filterTuneSets(currentTuneBook, filterOptions)), filterOptions);
      };
      eTBk.getFirstTuneSetPositions = function () {
        return extractFirstTuneSetPositions(eTBk.getCurrentTuneBook().tuneSets);
      };
      eTBk.getFirstTuneSetPosition = function (tuneSet) {
        return extractFirstTuneSetPosition(tuneSet);
      };
      eTBk.getFirstTuneSetPositionById = function (tuneSetId) {
        return extractFirstTuneSetPosition(getTuneSetById(currentTuneBook, tuneSetId));
      };
      eTBk.getTuneSetPositions = function () {
        return extractTuneSetPositions(eTBk.getCurrentTuneBook().tuneSets);
      };
      eTBk.getTuneSetPositionsFiltered = function (filterOptions) {
        return extractTuneSetPositions(filterTuneSets(currentTuneBook, filterOptions));
      };
      eTBk.getTuneSetsAsTuneSetPositions = function (intTuneId) {
        return getTuneSetsAsTuneSetPositions(eTBk.getCurrentTuneBook(), intTuneId);
      };
      eTBk.getTuneSetsByIntTuneId = function (intTuneId) {
        return getTuneSetsByIntTuneId(eTBk.getCurrentTuneBook(), intTuneId);
      };
      eTBk.getPlaylistsByIntTuneId = function (intTuneId) {
        return getPlaylistsByIntTuneId(eTBk.getCurrentTuneBook(), intTuneId);
      };
      eTBk.getVideo = function (intTuneId, videoSource, videoCode) {
        return getVideoById(currentTuneBook, intTuneId, videoSource, videoCode);
      };
      eTBk.addVideo = function (intTuneId, videoSource, videoCode, videoDescription) {
        return addVideo(currentTuneBook, intTuneId, videoSource, videoCode, videoDescription);
      };
      eTBk.deleteVideo = function (intTuneId, videoSource, videoCode) {
        deleteVideo(currentTuneBook, intTuneId, videoSource, videoCode);
      };
      eTBk.addWebsite = function (intTuneId, url) {
        return addWebsite(currentTuneBook, intTuneId, url);
      };
      eTBk.deleteWebsite = function (intTuneId, url) {
        deleteWebsite(currentTuneBook, intTuneId, url);
      };
      eTBk.getSkillTypes = function () {
        var skillType = {};
        var skillTypes = [];
        for (var i = 1; i < 7; i++) {
          skillType = {};
          skillType.skill = i;
          if (skillType.skill == 1) {
            skillType.description = '?';
          } else if (skillType.skill == 2) {
            skillType.description = 'Ignorant';
          } else if (skillType.skill == 3) {
            skillType.description = 'Beginner';
          } else if (skillType.skill == 4) {
            skillType.description = 'Intermediate';
          } else if (skillType.skill == 5) {
            skillType.description = 'Advanced';
          } else if (skillType.skill == 6) {
            skillType.description = 'Master';
          }
          skillTypes.push(skillType);
        }
        return skillTypes;
      };
      /*
        eTBk.updateFirstTuneSetPosition = function (tuneSet) {
            // Uebertragen TuneSet-Infos auf erste TuneSetPosition
            for (var z = 0; z < tuneSet.tuneSetPositions.length; z++) {
                if (tuneSet.tuneSetPositions[z].position == "1"){
                    tuneSet.tuneSetPositions[z].tuneSetTarget = tuneSet.tuneSetTarget;
                    tuneSet.tuneSetPositions[z].tuneSetEnv = tuneSet.tuneSetEnv;
                    tuneSet.tuneSetPositions[z].tuneSetName = tuneSet.tuneSetName;
                }
            }
        };
        */
      eTBk.getTuneBookFromLocalStorage = function () {
        // Retrieve eTuneBook Abc from localStorage
        var abc = JSON.parse(localStorage.getItem(eTBK_STORAGE_ID_TUNEBOOK) || '[]');
        if (abc == undefined || abc == '') {
          currentTuneBook = null;
        } else {
          //Convert eTuneBook Abc to eTuneBook-Model
          currentTuneBook = new TuneBook(abc);
        }
        return currentTuneBook;
      };
      eTBk.getTuneBookFromImportedFile = function (abc, fileName) {
        currentTuneBook = new TuneBook(abc);
        if (currentTuneBook.name == '') {
          currentTuneBook.name = fileName;
        }
        return currentTuneBook;
      };
      eTBk.getDefaultFromServer = function () {
        /*
             // Asynchron -> zu sp?t. Bringt aber Text.
             jQuery.get('Boxplayer.abc',function(data){
             return new TuneBook(data);
             },'text');
             */
        /*
             // Synchron, aber bringt HTML statt Text
             var jqxhr = jQuery.get("BoxPlayer.abc");

             jqxhr.success(function(data){
             // This will only be called once the remote content has been loaded in
             // The data will then be stored in the data param and can be used within your site
             return new TuneBook(data);
             });

             jqxhr.error(function(data){
             // Something went wrong, never mind lets just handle it gracefully below...
             alert("Fehler beim Laden von Boxplayer.abc");
             });
             */
        var jqxhr = $.ajax({
            url: eTBk.EXAMPLE_FILENAME,
            async: false,
            cache: false,
            dataType: 'text'
          });
        jqxhr.success(function (data) {
          currentTuneBook = new TuneBook(data);
        });
        jqxhr.error(function (data) {
          // Something went wrong, never mind lets just handle it gracefully below...
          alert('Fehler beim Laden von ' + eTBk.EXAMPLE_FILENAME);
        });
        return currentTuneBook;
      };
      return eTBk;
    }(window.eTBk = window.eTBk || {});
  return eTBk;
});