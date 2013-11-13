'use strict';
angular.module('eTuneBookApp', [
  'ui.router',
  'ngGrid',
  'ngBootstrap',
  'ngTouch',
  'chieffancypants.loadingBar',
  'ngAnimate',
  'gapi'
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
        url: '?type&key&color&skill&targ&env&plmin&plmax&freqcomp&freq&updmin&updmax',
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
        url: '?type&key&color&skill&targ&env&plmin&plmax&freqcomp&freq&updmin&updmax',
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
    $stateProvider.state(main).state(book).state(sets).state(tunes).state(abc).state(info).state(bookedit).state(set).state(setlist).state(filter).state(tunelist).state(tune).state(tunesets).state(tuneabc).state(tuneinfo).state(tunepractice).state(tunevideos).state(tunevideo).state(introduction).state(getstarted).state(manual).state(releasenotes).state(feedback).state(credits);
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
    $scope.exampleFileNameWithoutAbc = eTBk.EXAMPLE_FILENAME_WITHOUTABC;
    $scope.exampleVersion = eTBk.EXAMPLE_VERSION;
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
    $scope.tuneBook = eTuneBookService.getTuneBookFromLocalStorage();
    if ($scope.tuneBook != null && $scope.tuneBook.hasOwnProperty('tuneSets')) {
    } else {
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
      $scope.setsMenuActive = false;
      $scope.tunesMenuActive = false;
      $scope.infoMenuActive = false;
    }
    $scope.putTuneBookToLocalStorage = function () {
      eTuneBookService.storeAbc($scope.tuneBook);
    };
    $scope.importTuneBook = function (abc, fileName) {
      $timeout(function () {
        try {
          $scope.tuneBook = eTuneBookService.getTuneBookFromImportedFile(abc, fileName);
        } catch (e) {
          alert('eTuneBook cannot import ' + fileName + ' due to: ' + e.toString());
        } finally {
          eTuneBookService.storeTuneBookAbc();
          if ($state.is('tunelist')) {
            $state.transitionTo('setlist');
          } else {
            $state.transitionTo('tunelist');
          }
        }
      }, 0);
    };
    $scope.selectFileOnGoogleDrive = function () {
      var promise = GAPI.init();
      promise.then(function (result) {
        loadPicker();
      }, function (error) {
        alert('Failed: ' + error);
      });
    };
    function loadPicker() {
      gapi.load('picker', { 'callback': createPicker });
    }
    function createPicker() {
      var docsView = new google.picker.DocsView(google.picker.ViewId.DOCUMENTS).setIncludeFolders(true);
      var picker = new google.picker.PickerBuilder().addView(docsView).setAppId(GAPI.app.apiKey).setOAuthToken(GAPI.app.oauthToken.access_token).setCallback(pickerCallback).build();
      picker.setVisible(true);
    }
    function pickerCallback(data) {
      var url = 'nothing';
      if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
        var doc = data[google.picker.Response.DOCUMENTS][0];
        url = doc[google.picker.Document.URL];
        var promise = Drive.getFiles(doc[google.picker.Document.ID]);
        promise.then(function (file) {
          importTuneBookFromGoogleDrive(file);
        }, function (error) {
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
          if ($state.is('tunelist')) {
            $state.transitionTo('setlist');
          } else {
            $state.transitionTo('tunelist');
          }
        };
        xhr.onerror = function () {
          alert('Fehler beim Download des TuneBooks');
        };
        xhr.send();
      } else {
        alert('Fehler beim Laden des TuneBooks (kein Download-Link)');
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
angular.module('eTuneBookApp').controller('bookCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function bookCtrl($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
    $scope.tuneBook = eTuneBookService.getCurrentTuneBook();
    $scope.edit = function () {
      $state.transitionTo('bookedit', $stateParams);
    };
  }
]);
'use strict';
angular.module('eTuneBookApp').controller('bookeditCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function bookeditCtrl($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
    $scope.tuneBook = eTuneBookService.getCurrentTuneBook();
    $scope.tuneBookName = angular.copy($scope.tuneBook.name);
    $scope.tuneBookVersion = angular.copy($scope.tuneBook.version);
    $scope.tuneBookDescription = angular.copy($scope.tuneBook.description);
    $scope.save = function () {
      $scope.tuneBook.name = angular.copy($scope.tuneBookName);
      $scope.tuneBook.version = angular.copy($scope.tuneBookVersion);
      $scope.tuneBook.description = angular.copy($scope.tuneBookDescription);
      eTuneBookService.storeAbc($scope.tuneBook);
      $state.transitionTo('book', $stateParams);
    };
    $scope.cancel = function () {
      $state.transitionTo('book', $stateParams);
    };
  }
]);
'use strict';
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
    function exportTuneBook(startDownload) {
      var date = moment(new Date());
      var tuneBookVersion = date.format('YYYY-MM-DDTHH:mm');
      $scope.exportedTuneBook = eTuneBookService.getAbc($scope.tuneBook.tuneSets, $scope.tuneBook.name, tuneBookVersion, $scope.tuneBook.description, $scope.tuneSetAbcIncl, $scope.playDateAbcIncl, $scope.skillAbcIncl, $scope.colorAbcIncl, $scope.annotationAbcIncl, $scope.siteAbcIncl, $scope.tubeAbcIncl, $scope.fingeringAbcIncl);
      saveTuneBookAsFile($scope.exportedTuneBook, startDownload);
    }
    $scope.saveTuneBookToGoogleDrive = function () {
      var promise = GAPI.init();
      promise.then(function (result) {
        loadPicker();
      }, function (error) {
        alert('Failed: ' + error);
      });
    };
    function loadPicker() {
      gapi.load('picker', { 'callback': createPicker });
    }
    function createPicker() {
      var docsView = new google.picker.DocsView().setIncludeFolders(true).setMimeTypes('application/vnd.google-apps.folder').setSelectFolderEnabled(true);
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
      var fileNameToSaveAs = 'My TuneBook - eTb-' + tuneBookVersion;
      var contentType = 'text/plain';
      var metadata = {
          'title': fileNameToSaveAs,
          'mimeType': contentType,
          'parents': [{ 'id': folderId }]
        };
      var base64Data = btoa(abc);
      var multipartRequestBody = delimiter + 'Content-Type: application/json\r\n\r\n' + JSON.stringify(metadata) + delimiter + 'Content-Type: ' + contentType + '\r\n' + 'Content-Transfer-Encoding: base64\r\n' + '\r\n' + base64Data + close_delim;
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
      var exportedTuneBookAsBlob = new Blob([exportedTuneBookAsText], { type: 'text/plain' });
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
        return window.webkitURL.createObjectURL(file);
      } else if (window.URL && window.URL.createObjectURL) {
        return window.URL.createObjectURL(file);
      } else {
        return null;
      }
    }
    $scope.toggleFingeringAbc = function () {
      $scope.fingeringAbcIncl = !$scope.fingeringAbcIncl;
      exportTuneBook(false);
    };
    $scope.toggleTuneSetAbc = function () {
      $scope.tuneSetAbcIncl = !$scope.tuneSetAbcIncl;
      exportTuneBook(false);
    };
    $scope.togglePlayDateAbc = function () {
      $scope.playDateAbcIncl = !$scope.playDateAbcIncl;
      exportTuneBook(false);
    };
    $scope.toggleSkillAbc = function () {
      $scope.skillAbcIncl = !$scope.skillAbcIncl;
      exportTuneBook(false);
    };
    $scope.toggleColorAbc = function () {
      $scope.colorAbcIncl = !$scope.colorAbcIncl;
      exportTuneBook(false);
    };
    $scope.toggleAnnotationAbc = function () {
      $scope.annotationAbcIncl = !$scope.annotationAbcIncl;
      exportTuneBook(false);
    };
    $scope.toggleSiteAbc = function () {
      $scope.siteAbcIncl = !$scope.siteAbcIncl;
      exportTuneBook(false);
    };
    $scope.toggleTubeAbc = function () {
      $scope.tubeAbcIncl = !$scope.tubeAbcIncl;
      exportTuneBook(false);
    };
  }
]);
'use strict';
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
    filterOptions.target = $stateParams['targ'];
    filterOptions.env = $stateParams['env'];
    filterOptions.plmin = $stateParams['plmin'];
    filterOptions.plmax = $stateParams['plmax'];
    filterOptions.freqcomp = $stateParams['freqcomp'];
    filterOptions.freq = $stateParams['freq'];
    filterOptions.updmin = $stateParams['updmin'];
    filterOptions.updmax = $stateParams['updmax'];
    $scope.tuneSetPositions = eTuneBookService.getTuneSetPositionsFiltered(filterOptions);
    rowTempl = '<div ng-style="{ \'cursor\': row.cursor }" ' + 'ng-repeat="col in renderedColumns" ' + 'style="background-color:{{row.entity.tune.color}}" ' + 'class="ngCell {{col.cellClass}} {{col.colIndex()}}" ng-cell></div>';
    aggregateTemplate = '<div ng-style="rowStyle(row)" class="ngAggregate"> <span class="ngAggregateText"><a href="#/sets/{{row.label}}" title="Show The Set" >{{row.label CUSTOM_FILTERS}}{{aggFC(row)}}</a></span> <div class="{{row.aggClass()}}"></div><button type="button" ng-click="justPlayedTheSet(row.label)" class="btn btn-default col-xs-offset-8 col-sm-offset-8 col-md-offset-8 col-lg-offset-8" title="Just played"><i class="glyphicon glyphicon-ok-circle"></i></button> </div>';
    $scope.tuneSetPositionsSelected = [];
    if ($window.mobilecheck()) {
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
          cellTemplate: '<a href="#/tunes/{{row.entity.intTuneId}}" title="Show The Tune" >{{row.entity.tune.title}}</a>'
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
          width: '50%',
          sortable: false,
          groupable: false,
          cellTemplate: '<a href="#/tunes/{{row.entity.intTuneId}}" title="Show The Tune" >{{row.entity.tune.title}}</a>'
        },
        {
          field: 'tune.type',
          displayName: 'Type',
          width: '8%',
          sortable: false,
          groupable: false
        },
        {
          field: 'tune.key',
          displayName: 'Key',
          width: '7%',
          sortable: false,
          groupable: false
        },
        {
          field: 'tune.lastPlayed',
          displayName: 'Played',
          cellFilter: 'fromNow',
          width: '10%',
          sortable: false,
          groupable: false
        },
        {
          field: 'tune.frequencyPlayed',
          displayName: 'Frequency',
          width: '7%',
          sortable: false,
          groupable: false
        },
        {
          field: 'tune.skill',
          displayName: 'Skill',
          width: '8%',
          sortable: false,
          groupable: false
        },
        {
          field: 'tune.lastModified',
          displayName: 'Modified',
          cellFilter: 'fromNow',
          width: '10%',
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
      $timeout(function () {
        var previousFirstSetPosition = eTuneBookService.getFirstTuneSetPositionById($rootScope.$previousStateParams.tuneSetId);
        var grid = $scope.setList.ngGrid;
        var rowIndex = grid.data.indexOf(previousFirstSetPosition);
        grid.$viewport.scrollTop(grid.rowMap[rowIndex] * grid.config.rowHeight);
      }, 0, false);
    }
    $scope.setList.filterOptions = {
      filterText: '',
      useExternalFilter: false
    };
    $scope.$watch('search', function (searchText) {
      if (searchText) {
        if (searchText != '') {
          var searchQuery = 'Set:' + searchText + ';';
          $scope.setList.filterOptions.filterText = searchQuery;
        } else {
        }
      }
    });
    $scope.justPlayedTheSet = function (tuneSetId) {
      var now = new Date();
      eTuneBookService.addTuneSetPlayDate(eTuneBookService.getTuneSet(tuneSetId), now);
      eTuneBookService.storeAbc($scope.tuneBook);
    };
  }
]);
'use strict';
angular.module('eTuneBookApp').controller('setCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function ($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
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
    $scope.doneTuneSetEditing = function () {
      angular.element('#TuneSetEditor').modal('hide');
      $scope.tuneSetToBeEdited = null;
      eTuneBookService.updateFirstTuneSetPosition($scope.tuneSet);
      eTuneBookService.storeTuneBookAbc();
    };
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
        $state.transitionTo('tune', { intTuneId: tuneSetPosition.tune.intTuneId });
      }
    };
    $scope.deleteTuneSetPosition = function (tuneSetPosition) {
      var tuneSetDeleted = false;
      tuneSetDeleted = eTuneBookService.deleteTuneSetPosition(tuneSetPosition.tuneSetId, tuneSetPosition.position);
      eTuneBookService.storeTuneBookAbc();
      if (tuneSetDeleted) {
        $state.transitionTo('tune', { intTuneId: tuneSetPosition.tune.intTuneId });
      }
    };
    $scope.doneTuneSetPositionEditing = function () {
      angular.element('#TuneSetPositionEditor').modal('hide');
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.putTuneBookToLocalStorage = function () {
      eTuneBookService.storeAbc($scope.tuneBook);
    };
    function setTargetTuneSetPositionsForMoving() {
      $scope.targetTuneSetPositionsForMoving = eTuneBookService.getTuneSetPositions();
    }
    $scope.justPlayedTheSet = function (tuneSet) {
      var now = new Date();
      eTuneBookService.addTuneSetPlayDate(tuneSet, now);
      eTuneBookService.storeAbc($scope.tuneBook);
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
angular.module('eTuneBookApp').controller('tuneCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function ($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
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
        $state.transitionTo('set', { tuneSetId: sets[0].tuneSetId });
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
      $timeout(function () {
        var showHere = 'renderTheDotsFor' + $scope.intTuneId;
        var playHere = 'renderMidi';
        var tuneAbc = skipFingering(tune.pure);
        var dotsScale = 1;
        ABCJS.renderAbc(showHere, tuneAbc, {}, { scale: dotsScale }, {});
      }, 0, false);
    }
    function skipFingering(tuneAbc) {
      return tuneAbc;
    }
    $scope.tuneUp = function () {
      eTuneBookService.tuneUp($scope.intTuneId);
      renderAbc($scope.tune);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.tuneDown = function () {
      eTuneBookService.tuneDown($scope.intTuneId);
      renderAbc($scope.tune);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.editTuneInfo = function () {
      $state.transitionTo('tuneinfo', { intTuneId: $scope.tune.intTuneId });
    };
    $scope.editTune = function () {
      $state.transitionTo('tuneabc', { intTuneId: $scope.tune.intTuneId });
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
angular.module('eTuneBookApp').controller('tunesetsCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function ($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
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
      eTuneBookService.storeAbc($scope.tuneBook);
    };
    $scope.removeTuneSetPosition = function (tuneSetPosition) {
      for (var i = 0; i < $scope.tuneBook.tuneSets.length; i++) {
        if ($scope.tuneBook.tuneSets[i].tuneSetId == tuneSetPosition.tuneSetId) {
          $scope.tuneBook.tuneSets[i].tuneSetPositions.splice($scope.tuneBook.tuneSets[i].tuneSetPositions.indexOf(tuneSetPosition), 1);
          if ($scope.tuneBook.tuneSets[i].tuneSetPositions.length == 0) {
            $scope.tuneBook.tuneSets.splice(i, 1);
          }
        }
      }
    };
  }
]);
'use strict';
angular.module('eTuneBookApp').controller('tuneabcCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function tuneabcCtrl($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
    $scope.intTuneId = $stateParams['intTuneId'];
    $scope.tune = eTuneBookService.getTune($scope.intTuneId);
    $scope.$parent.currentState = 'Abc';
    $timeout(function () {
      var editHere = 'abcEditorFor' + $scope.intTuneId;
      var showHere = 'renderTheDotsFor' + $scope.intTuneId;
      new ABCJS.Editor(editHere, { canvas_id: showHere });
    }, 0, false);
    $scope.doneEditing = function (tune) {
      if (!tune.pure) {
        eTuneBookService.deleteTuneSetPositionsAndTune(tune.intTuneId);
        $state.transitionTo('setlist');
      } else {
        tune.title = eTuneBookService.getTuneTitle(tune);
        tune.type = eTuneBookService.getTuneType(tune);
        tune.key = eTuneBookService.getTuneKey(tune);
        tune.id = eTuneBookService.getTuneId(tune);
      }
      eTuneBookService.storeTuneBookAbc();
    };
  }
]);
'use strict';
angular.module('eTuneBookApp').controller('tuneinfoCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function ($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
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
      eTuneBookService.deleteWebsite($scope.intTuneId, row.entity.url);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.storeTuneBook = function () {
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.newWebsite = function () {
      eTuneBookService.addWebsite($scope.intTuneId, '');
    };
    $scope.openWebsite = function (row) {
      window.open(row.entity.url);
    };
  }
]);
'use strict';
angular.module('eTuneBookApp').controller('tunepracticeCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function ($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
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
    var filterOptions, columnDefs, rowTempl;
    filterOptions = {};
    filterOptions.key = $stateParams['key'];
    filterOptions.type = $stateParams['type'];
    filterOptions.color = $stateParams['color'];
    filterOptions.skill = $stateParams['skill'];
    filterOptions.target = $stateParams['targ'];
    filterOptions.env = $stateParams['env'];
    filterOptions.plmin = $stateParams['plmin'];
    filterOptions.plmax = $stateParams['plmax'];
    filterOptions.freqcomp = $stateParams['freqcomp'];
    filterOptions.freq = $stateParams['freq'];
    filterOptions.updmin = $stateParams['updmin'];
    filterOptions.updmax = $stateParams['updmax'];
    $scope.tunes = eTuneBookService.getTunesFiltered(filterOptions);
    $scope.tunesSelected = [];
    rowTempl = '<div ng-style="{ \'cursor\': row.cursor }" ' + 'ng-repeat="col in renderedColumns" ' + 'style="background-color:{{row.entity.color}}" ' + 'class="ngCell {{col.cellClass}} {{col.colIndex()}}" ng-cell></div>';
    if ($window.mobilecheck()) {
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
      columnDefs = [
        {
          field: 'title',
          displayName: 'Tune',
          cellFilter: 'eliminateThe',
          width: '50%',
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
          width: '5%'
        },
        {
          field: 'lastPlayed',
          displayName: 'Played',
          cellFilter: 'fromNow',
          width: '10%'
        },
        {
          field: 'frequencyPlayed',
          displayName: 'Frequency',
          width: '7%'
        },
        {
          field: 'skill',
          displayName: 'Skill',
          width: '8%'
        },
        {
          field: 'lastModified',
          displayName: 'Modified',
          cellFilter: 'fromNow',
          width: '10%'
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
      var newTuneSet = eTuneBookService.initializeTuneAndTuneSet();
      $state.transitionTo('tuneabc', { intTuneId: newTuneSet.tuneSetPositions[0].tune.intTuneId });
    };
    $scope.$watch('search', function (searchText) {
      if (searchText) {
        var searchQuery = 'title:' + searchText + ';';
        $scope.tuneList.filterOptions.filterText = searchQuery;
      }
    });
    if ($rootScope.$previousState != undefined && $rootScope.$previousState.name == 'tune') {
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
angular.module('eTuneBookApp').controller('filterCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function ($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
    $scope.tuneBook = eTuneBookService.getCurrentTuneBook();
    setFilterOptions();
    var type = $stateParams['type'];
    if (type == '' || type == null) {
      type = 'All Types';
    }
    setSelectedTuneSetTypeFilter(type);
    var key = $stateParams['key'];
    if (key == '' || key == null) {
      key = 'All Keys';
    }
    setSelectedTuneSetKeyFilter(key);
    var color = $stateParams['color'];
    if (color == '' || color == null) {
      color = 'All Colors';
    }
    setSelectedTuneSetColorFilter(color);
    var skill = $stateParams['skill'];
    if (skill == '' || skill == null) {
      skill = 'All Skills';
    }
    setSelectedTuneSetSkillFilter(skill);
    var target = $stateParams['targ'];
    if (target == '' || target == null) {
      target = 'All Targets';
    }
    setSelectedTuneSetTargetFilter(target);
    var env = $stateParams['env'];
    if (env == '' || env == null) {
      env = 'All Environments';
    }
    setSelectedTuneSetEnvFilter(env);
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
    $scope.editSetFilter = function () {
      angular.element('#SetFilter').modal('show');
    };
    function setSelectedTuneSetTypeFilter(type) {
      for (var i = 0; i < $scope.tuneSetTypesForFilter.length; i++) {
        if ($scope.tuneSetTypesForFilter[i].type == type) {
          $scope.tuneSetTypeForFilter = $scope.tuneSetTypesForFilter[i];
        }
      }
    }
    function setSelectedTuneSetKeyFilter(key) {
      for (var i = 0; i < $scope.tuneSetKeysForFilter.length; i++) {
        if ($scope.tuneSetKeysForFilter[i].key == key) {
          $scope.tuneSetKeyForFilter = $scope.tuneSetKeysForFilter[i];
        }
      }
    }
    function setSelectedTuneSetTargetFilter(target) {
      for (var i = 0; i < $scope.tuneSetTargetsForFilter.length; i++) {
        if ($scope.tuneSetTargetsForFilter[i].target == target) {
          $scope.tuneSetTargetForFilter = $scope.tuneSetTargetsForFilter[i];
        }
      }
    }
    function setSelectedTuneSetEnvFilter(env) {
      for (var i = 0; i < $scope.tuneSetEnvsForFilter.length; i++) {
        if ($scope.tuneSetEnvsForFilter[i].env == env) {
          $scope.tuneSetEnvForFilter = $scope.tuneSetEnvsForFilter[i];
        }
      }
    }
    function setSelectedTuneSetColorFilter(color) {
      for (var i = 0; i < $scope.tuneSetColorsForFilter.length; i++) {
        if ($scope.tuneSetColorsForFilter[i].color == color) {
          $scope.tuneSetColorForFilter = $scope.tuneSetColorsForFilter[i];
        }
      }
    }
    function setSelectedTuneSetSkillFilter(skill) {
      for (var i = 0; i < $scope.skillTypes.length; i++) {
        if ($scope.skillTypes[i].description == skill) {
          $scope.skillType = $scope.skillTypes[i];
        }
      }
    }
    function setTuneSetTypesForFilter() {
      var tuneSetTypeForFilter = {};
      var tuneSetTypesForFilter = [];
      var addToTypeFilter = true;
      if ($scope.hasOwnProperty('tuneBook')) {
        for (var i = 0; i < $scope.tuneBook.tuneSets.length; i++) {
          addToTypeFilter = true;
          for (var z = 0; z < tuneSetTypesForFilter.length; z++) {
            if (tuneSetTypesForFilter[z].type == $scope.tuneBook.tuneSets[i].type) {
              addToTypeFilter = false;
            }
          }
          if (addToTypeFilter) {
            tuneSetTypeForFilter = {};
            tuneSetTypeForFilter.type = $scope.tuneBook.tuneSets[i].type;
            tuneSetTypesForFilter.push(tuneSetTypeForFilter);
          }
        }
      }
      tuneSetTypeForFilter = {};
      tuneSetTypeForFilter.type = 'All Types';
      tuneSetTypesForFilter.unshift(tuneSetTypeForFilter);
      $scope.tuneSetTypesForFilter = tuneSetTypesForFilter;
    }
    function setTuneSetKeysForFilter() {
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
      tuneSetKeysForFilter.unshift(tuneSetKeyForFilter);
      $scope.tuneSetKeysForFilter = tuneSetKeysForFilter;
    }
    function setTuneSetTargetsForFilter() {
      var tuneSetTargetForFilter = {};
      var tuneSetTargetsForFilter = [];
      var addToTargetFilter = true;
      var selectedTuneSetTargetForFilter = new Array();
      if ($scope.hasOwnProperty('tuneBook')) {
        for (var i = 0; i < $scope.tuneBook.tuneSets.length; i++) {
          addToTargetFilter = true;
          for (var z = 0; z < tuneSetTargetsForFilter.length; z++) {
            if (tuneSetTargetsForFilter[z].target == $scope.tuneBook.tuneSets[i].tuneSetTarget) {
              addToTargetFilter = false;
            }
          }
          if ($scope.tuneBook.tuneSets[i].tuneSetTarget != 'undefined' && $scope.tuneBook.tuneSets[i].tuneSetTarget != '' && addToTargetFilter) {
            tuneSetTargetForFilter = {};
            tuneSetTargetForFilter.target = $scope.tuneBook.tuneSets[i].tuneSetTarget;
            tuneSetTargetsForFilter.push(tuneSetTargetForFilter);
          }
        }
      }
      tuneSetTargetForFilter = {};
      tuneSetTargetForFilter.target = 'All Targets';
      tuneSetTargetsForFilter.unshift(tuneSetTargetForFilter);
      $scope.tuneSetTargetsForFilter = tuneSetTargetsForFilter;
    }
    function setTuneSetEnvsForFilter() {
      var tuneSetEnvForFilter = {};
      var tuneSetEnvsForFilter = [];
      var addToEnvFilter = true;
      if ($scope.hasOwnProperty('tuneBook')) {
        for (var i = 0; i < $scope.tuneBook.tuneSets.length; i++) {
          addToEnvFilter = true;
          for (var z = 0; z < tuneSetEnvsForFilter.length; z++) {
            if (tuneSetEnvsForFilter[z].env == $scope.tuneBook.tuneSets[i].tuneSetEnv) {
              addToEnvFilter = false;
            }
          }
          if ($scope.tuneBook.tuneSets[i].tuneSetEnv != 'undefined' && $scope.tuneBook.tuneSets[i].tuneSetEnv != '' && addToEnvFilter) {
            tuneSetEnvForFilter = {};
            tuneSetEnvForFilter.env = $scope.tuneBook.tuneSets[i].tuneSetEnv;
            tuneSetEnvsForFilter.push(tuneSetEnvForFilter);
          }
        }
      }
      tuneSetEnvForFilter = {};
      tuneSetEnvForFilter.env = 'All Environments';
      tuneSetEnvsForFilter.unshift(tuneSetEnvForFilter);
      $scope.tuneSetEnvsForFilter = tuneSetEnvsForFilter;
    }
    function setTuneSetColorsForFilter() {
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
      setTuneSetTargetsForFilter();
      setTuneSetEnvsForFilter();
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
      $timeout(function () {
        var key, type, color, skill, target, env, playmin, playmax, freqcomp, freq, updatemin, updatemax;
        type = $scope.tuneSetTypeForFilter.type;
        key = $scope.tuneSetKeyForFilter.key;
        color = $scope.tuneSetColorForFilter.color;
        skill = $scope.skillType.description;
        target = $scope.tuneSetTargetForFilter.target;
        env = $scope.tuneSetEnvForFilter.env;
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
        if ($scope.tuneSetTargetForFilter.target == 'All Targets') {
          target = '';
        }
        if ($scope.tuneSetEnvForFilter.env == 'All Environments') {
          env = '';
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
          targ: target,
          env: env,
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
angular.module('eTuneBookApp').controller('tunevideosCtrl', [
  '$scope',
  '$location',
  '$timeout',
  '$rootScope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function ($scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService) {
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
    $scope.deleteVideo = function (row) {
      eTuneBookService.deleteVideo($scope.intTuneId, row.entity.source, row.entity.code);
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.storeTuneBook = function () {
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.newVideo = function () {
      eTuneBookService.addVideo($scope.intTuneId, 'ytube', '', '');
    };
  }
]);
'use strict';
angular.module('eTuneBookApp').controller('tunevideoCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'eTuneBookService',
  function ($scope, $state, $stateParams, eTuneBookService) {
    $scope.intTuneId = $stateParams['intTuneId'];
    $scope.code = $stateParams['code'];
    $scope.source = $stateParams['source'];
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
        $scope.video.description = angular.copy($scope.tuneVideoDescription);
      } else {
        $scope.video = eTuneBookService.addVideo($scope.intTuneId, $scope.source, $scope.tuneVideoCode, $scope.tuneVideoDescription);
        $state.transitionTo('tunevideo', {
          intTuneId: $scope.intTuneId,
          source: $scope.source,
          code: $scope.tuneVideoCode
        });
        $scope.$parent.tuneVideosSelected = [];
        $scope.$parent.tuneVideosSelected.push($scope.video);
      }
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.delete = function () {
      eTuneBookService.deleteVideo($scope.intTuneId, $scope.source, $scope.tuneVideoCode);
      $state.transitionTo('tunevideos', { intTuneId: $scope.intTuneId });
      eTuneBookService.storeTuneBookAbc();
    };
    $scope.load = function () {
      $scope.videoUrl = '//www.youtube.com/embed/' + $scope.tuneVideoCode;
    };
  }
]);
'use strict';
angular.module('eTuneBookApp').factory('eTuneBookService', function () {
  var eTBkModule = function (eTBk) {
      var eTBK_STORAGE_ID_TUNEBOOK = 'etbk-tuneBook';
      var eTBK_STORAGE_ID_SETTINGS = 'etbk-settings';
      var eTBK_VERSION = '1.1.7';
      var ABC_VERSION = '2.1';
      var eTBK_DEFAULT_COLOR = '#F5F5F5';
      var eTBK_DEFAULT_MODIFICATIONDATE_STRING = '1966-04-05T22:00';
      var eTBK_PATTERN_FINGER = /!\d!/g;
      var eTBk_EXAMPLE_FILENAME = 'Irish Tunes - Martin Fleischmann.abc';
      var eTBk_EXAMPLE_FILENAME_WITHOUTABC = 'Irish Tunes - Martin Fleischmann';
      var eTBk_EXAMPLE_VERSION = '2013-11-12';
      var currentTuneBook;
      var TuneBook = function (abc) {
        var This = this;
        var book = new ABCJS.TuneBook(abc);
        This.header = book.header;
        This.name = getAbcValue(This.header, '%%etbk:bname ', '');
        This.version = getAbcValue(This.header, '%%etbk:bvers ', '');
        This.description = getAbcValue(This.header, '%%etbk:bdesc ', '');
        This.tuneSets = extractTuneSets(book);
      };
      function extractTuneSets(book) {
        var allTuneSetPositions = [];
        var tunesWithoutTuneSetDirective = [];
        var tuneSetDirectives = [];
        var tuneSets = [];
        var intTuneSetId = 1;
        var intTuneId = 1;
        for (var i = 0; i < book.tunes.length; i++) {
          var tune = book.tunes[i];
          tuneSetDirectives = [];
          tuneSetDirectives = getAbcValues(tune.pure, '%%etbk:tnset ');
          if (tuneSetDirectives.length > 0) {
            extractEtbkFields(tune);
            tune.intTuneId = intTuneId;
            for (var y = 0; y < tuneSetDirectives.length; y++) {
              var tuneSetId = getTuneSetId(tuneSetDirectives[y]);
              var position = getTuneSetTunePosition(tuneSetDirectives[y]);
              var repeat = getTuneSetTuneRepeat(tuneSetDirectives[y]);
              var annotation = getTuneSetTuneAnnotation(tuneSetDirectives[y]);
              var tuneSetTarget = '';
              var tuneSetEnv = '';
              var tuneSetName = '';
              if (position == '1') {
                tuneSetTarget = getTuneSetTarget(tuneSetDirectives[y]);
                tuneSetEnv = getTuneSetEnvironment(tuneSetDirectives[y]);
                tuneSetName = getTuneSetName(tuneSetDirectives[y]);
              }
              var tuneSetPosition = [];
              tuneSetPosition = newTuneSetPosition(tuneSetId, tuneSetTarget, tuneSetEnv, tuneSetName, intTuneId, tune, position, repeat, annotation);
              allTuneSetPositions.push(tuneSetPosition);
            }
            intTuneId++;
          } else {
            tunesWithoutTuneSetDirective.push(tune);
          }
        }
        allTuneSetPositions.sort(function (a, b) {
          return a.tuneSetId - b.tuneSetId;
        });
        var wTuneSetId = 0;
        for (var i = 0; i < allTuneSetPositions.length; i++) {
          if (wTuneSetId !== allTuneSetPositions[i].tuneSetId) {
            wTuneSetId = allTuneSetPositions[i].tuneSetId;
            var tuneSet = [];
            var tuneSetTarget = '';
            var tuneSetEnv = '';
            var tuneSetName = '';
            var tuneSetType = '';
            var tuneSetLastPlayed = '';
            var tuneSetLastModified = '';
            var frequencyPlayed = 0;
            var tuneSetPositions = [];
            for (var z = 0; z < allTuneSetPositions.length; z++) {
              var tuneSetPosition = allTuneSetPositions[z];
              if (wTuneSetId == tuneSetPosition.tuneSetId) {
                tuneSetPositions.push(tuneSetPosition);
                if (tuneSetType == '') {
                  tuneSetType = tuneSetPosition.tune.type;
                } else if (tuneSetType !== 'mixed' && tuneSetType !== tuneSetPosition.tune.type) {
                  tuneSetType = 'mixed';
                }
                if (tuneSetLastPlayed == '' || tuneSetPosition.tune.lastPlayed > tuneSetLastPlayed) {
                  tuneSetLastPlayed = tuneSetPosition.tune.lastPlayed;
                }
                if (tuneSetLastModified == '' || tuneSetPosition.tune.lastModified > tuneSetLastModified) {
                  tuneSetLastModified = tuneSetPosition.tune.lastModified;
                }
                if (tuneSetPosition.tuneSetTarget != '' && tuneSetPosition.tuneSetTarget != 'undefined') {
                  tuneSetTarget = tuneSetPosition.tuneSetTarget;
                }
                if (tuneSetPosition.tuneSetEnv != '' && tuneSetPosition.tuneSetEnv != 'undefined') {
                  tuneSetEnv = tuneSetPosition.tuneSetEnv;
                }
                if (tuneSetPosition.tuneSetName != '' && tuneSetPosition.tuneSetName != 'undefined') {
                  tuneSetName = tuneSetPosition.tuneSetName;
                }
                tuneSetPosition.tune.frequencyPlayed = calculateFrequencyPlayed(tuneSetPosition.tune.playDates);
                frequencyPlayed = frequencyPlayed + tuneSetPosition.tune.frequencyPlayed;
              }
            }
            if (tuneSetPositions.length > 1) {
              frequencyPlayed = Math.round(frequencyPlayed / tuneSetPositions.length);
            }
            tuneSet = newTuneSet(wTuneSetId, tuneSetTarget, tuneSetEnv, tuneSetName, tuneSetLastPlayed, tuneSetLastModified, frequencyPlayed, tuneSetType, tuneSetPositions);
            tuneSets.push(tuneSet);
          }
        }
        wTuneSetId++;
        for (var i = 0; i < tunesWithoutTuneSetDirective.length; i++) {
          var tuneSet = [];
          var tuneSetType = '';
          var frequencyPlayed = 0;
          var tuneSetPositions = [];
          var tuneSetPosition = [];
          var tune = tunesWithoutTuneSetDirective[i];
          extractEtbkFields(tune);
          tuneSetPosition = newTuneSetPosition(wTuneSetId, '', '', '', intTuneId, tune, 1, '3x');
          tuneSetPositions.push(tuneSetPosition);
          tuneSet = newTuneSet(wTuneSetId, '', '', '', tune.lastPlayed, tune.lastModified, frequencyPlayed, tune.type, tuneSetPositions);
          tuneSets.push(tuneSet);
          intTuneId++;
          wTuneSetId++;
        }
        return tuneSets;
      }
      function extractEtbkFields(tune) {
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
        tune.lastModified = null;
        for (var i = 0; i < tuneSplits.length; i++) {
          beginOfLine = '';
          isStandardAbc = true;
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
          beginOfLine = tuneSplits[i].substring(0, 12);
          if (beginOfLine.length > 1) {
            if (beginOfLine == '%%etbk:tnset') {
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:tube1') {
              tune.videos.push(newVideo('ytube', getAbcValueOfTuneLine(tuneSplits[i], '//www.youtube.com/embed/', ''), ''));
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:tube2') {
              tune.videos.push(newVideo('ytube', getAbcValueOfTuneLine(tuneSplits[i], '//www.youtube.com/embed/', ''), ''));
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:tube3') {
              tune.videos.push(newVideo('ytube', getAbcValueOfTuneLine(tuneSplits[i], '//www.youtube.com/embed/', ''), ''));
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:video') {
              tune.videos.push(getVideoFromDirective(getAbcValueOfTuneLine(tuneSplits[i], '%%etbk:video ', '')));
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:site1') {
              tune.wsites.push(newWebsite(getAbcValueOfTuneLine(tuneSplits[i], '%%etbk:site1 ', '')));
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:site2') {
              tune.wsites.push(newWebsite(getAbcValueOfTuneLine(tuneSplits[i], '%%etbk:site2 ', '')));
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:site3') {
              tune.wsites.push(newWebsite(getAbcValueOfTuneLine(tuneSplits[i], '%%etbk:site3 ', '')));
              isStandardAbc = false;
            } else if (beginOfLine == '%%etbk:wsite') {
              tune.wsites.push(newWebsite(getAbcValueOfTuneLine(tuneSplits[i], '%%etbk:wsite ', '')));
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
        tune.pure = newAbc;
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
            frequencyPlayed = frequencyPlayed + 1000;
            frequencyPlayed = frequencyPlayed - days;
          }
        }
        if (frequencyPlayed < 0) {
          frequencyPlayed = 0;
        }
        return frequencyPlayed;
      }
      function newTuneSetPosition(iTuneSetId, iTuneSetTarget, iTuneSetEnv, iTuneSetName, iIntTuneId, iTune, iPosition, iRepeat, iAnnotation) {
        return {
          tuneSetId: iTuneSetId,
          tuneSetTarget: iTuneSetTarget,
          tuneSetEnv: iTuneSetEnv,
          tuneSetName: iTuneSetName,
          intTuneId: iIntTuneId,
          tune: iTune,
          position: iPosition,
          repeat: iRepeat,
          annotation: iAnnotation
        };
      }
      function newTuneSet(iTuneSetId, iTuneSetTarget, iTuneSetEnv, iTuneSetName, iLastPlayed, iLastModified, ifrequencyPlayed, iType, iTuneSetPositions) {
        return {
          tuneSetId: iTuneSetId,
          tuneSetTarget: iTuneSetTarget,
          tuneSetEnv: iTuneSetEnv,
          tuneSetName: iTuneSetName,
          lastPlayed: iLastPlayed,
          lastModified: iLastModified,
          frequencyPlayed: ifrequencyPlayed,
          type: iType,
          sort: 0,
          tuneSetPositions: iTuneSetPositions
        };
      }
      function newVideo(iSource, iCode, iDescription) {
        return {
          source: iSource,
          code: iCode,
          description: iDescription
        };
      }
      function newWebsite(iURL) {
        return { url: iURL };
      }
      function newPlayDate(iDate) {
        return { playDate: iDate };
      }
      function deleteTuneSetPosition(currentTuneBook, tuneSetId, position) {
        var tuneSet = getTuneSetById(currentTuneBook, tuneSetId);
        var tuneSetPosition = null;
        var tuneSetDeleted = false;
        var removedPosition = 0;
        removedPosition = parseInt(position);
        for (var z = 0; z < tuneSet.tuneSetPositions.length; z++) {
          if (tuneSet.tuneSetPositions[z].position == position) {
            tuneSetPosition = tuneSet.tuneSetPositions[z];
            tuneSet.tuneSetPositions.splice(z, 1);
          }
        }
        if (getTuneSetsByIntTuneId(currentTuneBook, tuneSetPosition.tune.intTuneId).length == 0) {
          initializeTuneSet(currentTuneBook.tuneSets, tuneSetPosition.tune);
        }
        if (tuneSet.tuneSetPositions.length == 0) {
          currentTuneBook.tuneSets.splice(currentTuneBook.tuneSets.indexOf(tuneSet), 1);
          tuneSetDeleted = true;
        } else {
          var currentPosition = 0;
          for (var y = 0; y < tuneSet.tuneSetPositions.length; y++) {
            currentPosition = parseInt(tuneSet.tuneSetPositions[y].position);
            if (currentPosition > removedPosition) {
              currentPosition--;
              tuneSet.tuneSetPositions[y].position = currentPosition.toString();
            }
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
            tuneSet.tuneSetPositions.splice(z, 1);
          }
        }
        if (tuneSet.tuneSetPositions.length == 0) {
          currentTuneBook.tuneSets.splice(currentTuneBook.tuneSets.indexOf(tuneSet), 1);
        } else {
          var currentPosition = 0;
          for (var y = 0; y < tuneSet.tuneSetPositions.length; y++) {
            currentPosition = parseInt(tuneSet.tuneSetPositions[y].position);
            if (currentPosition > removedPosition) {
              currentPosition--;
              tuneSet.tuneSetPositions[y].position = currentPosition.toString();
            }
          }
        }
      }
      function moveTuneSetPosition(currentTuneBook, sourceTuneSetId, sourcePosition, targetTuneSetId, targetPosition, beforeOrAfter, moveOrCopy) {
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
          initializeTuneSet(currentTuneBook.tuneSets, sourceTuneSetPosition.tune);
        } else {
          targetTuneSet = getTuneSetById(currentTuneBook, targetTuneSetId);
        }
        if (moveOrCopy == 'move') {
          if (twoSetsInvolved) {
            for (var z = 0; z < sourceTuneSet.tuneSetPositions.length; z++) {
              if (sourceTuneSet.tuneSetPositions[z].position == sourcePosition) {
                sourceTuneSet.tuneSetPositions.splice(z, 1);
              }
            }
          }
          if (sourceTuneSet.tuneSetPositions.length == 0) {
            currentTuneBook.tuneSets.splice(currentTuneBook.tuneSets.indexOf(sourceTuneSet), 1);
            tuneSetDeleted = true;
          } else {
            var currentPosition = 0;
            for (var y = 0; y < sourceTuneSet.tuneSetPositions.length; y++) {
              currentPosition = parseInt(sourceTuneSet.tuneSetPositions[y].position);
              if (currentPosition > removedPosition) {
                currentPosition--;
                sourceTuneSet.tuneSetPositions[y].position = currentPosition.toString();
              }
            }
          }
        }
        if (targetTuneSetId != null) {
          var newPosition = 0;
          newPosition = parseInt(targetPosition);
          if (beforeOrAfter == 'after') {
            newPosition++;
          }
          var targetTuneSetPosition = {};
          if (moveOrCopy == 'move') {
            targetTuneSetPosition = sourceTuneSetPosition;
            targetTuneSetPosition.tuneSetId = targetTuneSetId;
            targetTuneSetPosition.position = newPosition.toString();
          } else if (moveOrCopy == 'copy') {
            targetTuneSetPosition = newTuneSetPosition(targetTuneSetId, sourceTuneSetPosition.tuneSetTarget, sourceTuneSetPosition.tuneSetEnv, sourceTuneSetPosition.tuneSetName, sourceTuneSetPosition.intTuneId, sourceTuneSetPosition.tune, newPosition.toString(), sourceTuneSetPosition.repeat, sourceTuneSetPosition.annotation);
          }
          if (twoSetsInvolved) {
            var insertAt = newPosition - 1;
            targetTuneSet.tuneSetPositions.splice(insertAt, 0, targetTuneSetPosition);
          }
          for (var y = 0; y < targetTuneSet.tuneSetPositions.length; y++) {
            var currentPosition = 0;
            if (targetTuneSet.tuneSetPositions[y] == targetTuneSetPosition) {
            } else {
              currentPosition = parseInt(targetTuneSet.tuneSetPositions[y].position);
              if (currentPosition >= newPosition) {
                currentPosition++;
                targetTuneSet.tuneSetPositions[y].position = currentPosition.toString();
              }
            }
          }
        }
        return tuneSetDeleted;
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
      function getTuneSetTarget(tuneSetDirective) {
        var tuneSetTarget = '';
        var tuneSetTargetSplits = [];
        tuneSetTargetSplits = tuneSetDirective.split('targ:');
        if (tuneSetTargetSplits.length > 1) {
          tuneSetTargetSplits = tuneSetTargetSplits[1].split(',');
          tuneSetTarget = tuneSetTargetSplits[0].replace(/^\s+|\s+$/g, '');
        }
        return tuneSetTarget;
      }
      function getTuneSetEnvironment(tuneSetDirective) {
        var tuneSetEnvironment = '';
        var tuneSetEnvironmentSplits = [];
        tuneSetEnvironmentSplits = tuneSetDirective.split('env:');
        if (tuneSetEnvironmentSplits.length > 1) {
          tuneSetEnvironmentSplits = tuneSetEnvironmentSplits[1].split(',');
          tuneSetEnvironment = tuneSetEnvironmentSplits[0].replace(/^\s+|\s+$/g, '');
        }
        return tuneSetEnvironment;
      }
      function getTuneSetName(tuneSetDirective) {
        var tuneSetName = '';
        var tuneSetNameSplits = [];
        tuneSetNameSplits = tuneSetDirective.split('name:');
        if (tuneSetNameSplits.length > 1) {
          tuneSetNameSplits = tuneSetNameSplits[1].split('\n');
          tuneSetName = tuneSetNameSplits[0].replace(/^\s+|\s+$/g, '');
        }
        return tuneSetName;
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
        if (!directiveAdded) {
          newAbc = newAbc + directive;
          newAbc = newAbc + '\n';
          directiveAdded = true;
        }
        tune.pure = newAbc;
      }
      function getTuneAbcWithEtbkDirectives(tune, tuneSetPositions, targetLine, tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl) {
        var tuneSplits = [];
        var newAbc = '';
        tuneSplits = tune.pure.split('\n');
        var curLineIsTargetLine = false;
        var lastLineIsTargetLine = false;
        var directivesAdded = false;
        var directive = '';
        for (var i = 0; i < tuneSplits.length; i++) {
          if (!directivesAdded) {
            if (tuneSplits[i].indexOf(targetLine) !== -1) {
              curLineIsTargetLine = true;
            } else {
              curLineIsTargetLine = false;
            }
            if (!curLineIsTargetLine && lastLineIsTargetLine) {
              if (tuneSetAbcIncl) {
                for (var w = 0; w < tuneSetPositions.length; w++) {
                  directive = '%%etbk:tnset id:' + tuneSetPositions[w].tuneSetId + ',pos:' + tuneSetPositions[w].position + ',rep:' + tuneSetPositions[w].repeat + ',ant:' + tuneSetPositions[w].annotation;
                  if (tuneSetPositions[w].tuneSetTarget != '') {
                    directive = directive + ',targ:' + tuneSetPositions[w].tuneSetTarget;
                  }
                  if (tuneSetPositions[w].tuneSetEnv != '') {
                    directive = directive + ',env:' + tuneSetPositions[w].tuneSetEnv;
                  }
                  if (tuneSetPositions[w].tuneSetName != '') {
                    directive = directive + ',name:' + tuneSetPositions[w].tuneSetName;
                  }
                  newAbc = newAbc + directive;
                  newAbc = newAbc + '\n';
                }
              }
              if (siteAbcIncl) {
                for (var z = 0; z < tune.wsites.length; z++) {
                  directive = '%%etbk:wsite ' + tune.wsites[z].url;
                  newAbc = newAbc + directive;
                  newAbc = newAbc + '\n';
                }
              }
              if (tubeAbcIncl) {
                for (var z = 0; z < tune.videos.length; z++) {
                  directive = '%%etbk:video ' + 'src:' + tune.videos[z].source + ',cde:' + tune.videos[z].code + ',desc:' + tune.videos[z].description;
                  newAbc = newAbc + directive;
                  newAbc = newAbc + '\n';
                }
              }
              if (annotationAbcIncl) {
                if (tune.annotation != '') {
                  directive = '%%etbk:annot ' + tune.annotation;
                  newAbc = newAbc + directive;
                  newAbc = newAbc + '\n';
                }
              }
              if (skillAbcIncl) {
                if (tune.skill != '') {
                  directive = '%%etbk:skill ' + tune.skill;
                  newAbc = newAbc + directive;
                  newAbc = newAbc + '\n';
                }
              }
              if (colorAbcIncl) {
                if (tune.color != eTBK_DEFAULT_COLOR) {
                  directive = '%%etbk:color ' + tune.color;
                  newAbc = newAbc + directive;
                  newAbc = newAbc + '\n';
                }
              }
              if (playDateAbcIncl) {
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
        if (!directivesAdded) {
        }
        return newAbc;
      }
      function getTuneLastPlayed(playDates) {
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
          playDate = moment(playDatesSplits[i], 'YYYY-MM-DDTHH:mm').toDate();
          playDates.push(newPlayDate(playDate));
        }
        return playDates;
      }
      function getVideoFromDirective(videoDirective) {
        return newVideo(getVideoSource(videoDirective), getVideoCode(videoDirective), getVideoDescription(videoDirective));
      }
      function initializeTuneAndTuneSet(tuneSets) {
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
            currentIntTuneId = parseInt(tuneSets[i].tuneSetPositions[z].intTuneId);
            if (currentIntTuneId > maxIntTuneId) {
              maxIntTuneId = currentIntTuneId;
            }
            currentTuneId = parseInt(tuneSets[i].tuneSetPositions[z].tune.id);
            if (currentTuneId > maxTuneId) {
              maxTuneId = currentTuneId;
            }
          }
        }
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
        var tuneSetPosition = newTuneSetPosition(newTuneSetId, '', '', '', newIntTuneId, tune, 1, '3x');
        tuneSetPositions.push(tuneSetPosition);
        tuneSet = newTuneSet(newTuneSetId, '', '', '', tune.lastPlayed, tune.lastModified, 0, tune.type, tuneSetPositions);
        tuneSets.unshift(tuneSet);
        return tuneSet;
      }
      function initializeTuneSet(tuneSets, tune) {
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
        var tuneSetPosition = newTuneSetPosition(newTuneSetId, '', '', '', tune.intTuneId, tune, 1, '3x');
        tuneSetPositions.push(tuneSetPosition);
        tuneSet = newTuneSet(newTuneSetId, '', '', '', tune.lastPlayed, tune.lastModified, 0, tune.type, tuneSetPositions);
        tuneSets.unshift(tuneSet);
        return tuneSet;
      }
      function addTunePlayDate(tune, newDate) {
        if (tune.lastPlayed != null && moment(tune.lastPlayed).diff(newDate, 'minutes') == 0) {
        } else {
          tune.lastPlayed = newDate;
          tune.playDates.unshift(newPlayDate(tune.lastPlayed));
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
        for (var i = 0; i < tune.playDates.length; i++) {
          if (i > 0) {
            directive = directive + ',';
          }
          playDate = moment(tune.playDates[i].playDate);
          directive = directive + playDate.format('YYYY-MM-DDTHH:mm');
        }
        return directive;
      }
      function saveSkillDirective(tuneSetPosition) {
        var searchDirective = '%%etbk:skill ';
        var newDirective = '%%etbk:skill ' + tuneSetPosition.tune.skill;
        saveDirective(tuneSetPosition, searchDirective, newDirective);
      }
      function saveDirective(tuneSetPosition, searchDirective, newDirective) {
        if (!abcContainesDirective(tuneSetPosition, searchDirective)) {
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
        return Math.floor(Math.random() * sets.length) + 1;
      }
      function getRandomTuneIndex(tunes) {
        return Math.floor(Math.random() * tunes.length) + 1;
      }
      function getAbc(tuneSets, tuneBookName, tuneBookVersion, tuneBookDescription, tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl, fingeringAbcIncl) {
        var tuneAbc = '';
        var allTuneSetPositions = [];
        var wIntTuneId = 0;
        var wTune = [];
        var wTuneSetPositions = [];
        var tbkAbc = '';
        var includeEtbkDirective = false;
        if (tuneSetAbcIncl || playDateAbcIncl || skillAbcIncl || colorAbcIncl || annotationAbcIncl || siteAbcIncl || tubeAbcIncl) {
          includeEtbkDirective = true;
        }
        tbkAbc = getAbcHeader(tuneBookName, tuneBookVersion, tuneBookDescription, includeEtbkDirective);
        for (var i = 0; i < tuneSets.length; i++) {
          for (var z = 0; z < tuneSets[i].tuneSetPositions.length; z++) {
            allTuneSetPositions.push(tuneSets[i].tuneSetPositions[z]);
          }
        }
        allTuneSetPositions.sort(function (a, b) {
          return a.intTuneId - b.intTuneId;
        });
        for (var i = 0; i < allTuneSetPositions.length; i++) {
          if (wIntTuneId == 0) {
            tuneAbc = '';
            wTuneSetPositions = [];
            wIntTuneId = allTuneSetPositions[i].intTuneId;
            wTune = allTuneSetPositions[i].tune;
            wTuneSetPositions.push(allTuneSetPositions[i]);
          } else if (wIntTuneId == allTuneSetPositions[i].intTuneId && wTune == allTuneSetPositions[i].tune) {
            wTuneSetPositions.push(allTuneSetPositions[i]);
          } else {
            tuneAbc = getTuneAbc(wTune, wTuneSetPositions, tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl, fingeringAbcIncl);
            tbkAbc += tuneAbc;
            tbkAbc += '\n';
            tuneAbc = '';
            wTuneSetPositions = [];
            wIntTuneId = allTuneSetPositions[i].intTuneId;
            wTune = allTuneSetPositions[i].tune;
            wTuneSetPositions.push(allTuneSetPositions[i]);
          }
        }
        tuneAbc = getTuneAbc(wTune, wTuneSetPositions, tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl, fingeringAbcIncl);
        tbkAbc += tuneAbc;
        return tbkAbc;
      }
      function getAbcHeader(tuneBookName, tuneBookVersion, tuneBookDescription, includeEtbkDirective) {
        var tbkAbc = '%abc-';
        tbkAbc += ABC_VERSION;
        tbkAbc += '\n';
        tbkAbc += 'I:abc-creator eTuneBook-';
        tbkAbc += eTBK_VERSION;
        tbkAbc += '\n';
        if (includeEtbkDirective) {
          tbkAbc += '%%etbk:bname ';
          tbkAbc += tuneBookName;
          tbkAbc += '\n';
          tbkAbc += '%%etbk:bvers ';
          tbkAbc += tuneBookVersion;
          tbkAbc += '\n';
          tbkAbc += '%%etbk:bdesc ';
          tbkAbc += tuneBookDescription;
          tbkAbc += '\n';
        }
        tbkAbc += '\n';
        return tbkAbc;
      }
      function getTuneAbc(tune, tuneSetPositions, tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl, fingeringAbcIncl) {
        var tuneAbc = '';
        if (!tuneSetAbcIncl && !playDateAbcIncl && !skillAbcIncl && !colorAbcIncl && !annotationAbcIncl && !siteAbcIncl && !tubeAbcIncl) {
          tuneAbc = tune.pure;
        } else {
          tuneAbc = getTuneAbcWithEtbkDirectives(tune, tuneSetPositions, 'X:', tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl);
        }
        if (!fingeringAbcIncl) {
          tuneAbc = tuneAbc.replace(eTBK_PATTERN_FINGER, '');
        }
        return tuneAbc;
      }
      function tuneUp(tune) {
        var neu = escape(tune.pure);
        var Reihe = neu.split('%0D%0A');
        Reihe = neu.split('%0A');
        for (var i = 0; i < Reihe.length; ++i) {
          Reihe[i] = unescape(Reihe[i]);
          var Aktuellereihe = Reihe[i].split('');
          if (Aktuellereihe[0] == 'A' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'B' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'C' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'D' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'E' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'F' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'G' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'H' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'I' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'J' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'L' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'M' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'N' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'O' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'P' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'Q' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'R' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'S' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'T' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'U' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'V' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'W' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'X' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'Y' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'Z' && Aktuellereihe[1] == ':') {
          } else if (Aktuellereihe[0] == 'K' && Aktuellereihe[1] == ':') {
            var Leerzeichenweg = Reihe[i].split(' ');
            var sindweg = Leerzeichenweg.join('');
            Aktuellereihe = sindweg.split('');
            if (Aktuellereihe[3] == '#' || Aktuellereihe[3] == 'b') {
              Aktuellereihe[3] = '';
            }
            if (Aktuellereihe[2] == 'C') {
              Aktuellereihe[2] = 'D';
              Reihe[i] = Aktuellereihe.join('');
            } else if (Aktuellereihe[2] == 'D') {
              Aktuellereihe[2] = 'E';
              Reihe[i] = Aktuellereihe.join('');
            } else if (Aktuellereihe[2] == 'E') {
              Aktuellereihe[2] = 'F';
              Reihe[i] = Aktuellereihe.join('');
            } else if (Aktuellereihe[2] == 'F') {
              Aktuellereihe[2] = 'G';
              Reihe[i] = Aktuellereihe.join('');
            } else if (Aktuellereihe[2] == 'G') {
              Aktuellereihe[2] = 'A';
              Reihe[i] = Aktuellereihe.join('');
            } else if (Aktuellereihe[2] == 'A') {
              Aktuellereihe[2] = 'B';
              Reihe[i] = Aktuellereihe.join('');
            } else if (Aktuellereihe[2] == 'B') {
              Aktuellereihe[2] = 'C';
              Reihe[i] = Aktuellereihe.join('');
            } else {
            }
          } else {
            var Derarray = Reihe[i].split('');
            for (var x = 0; x < Derarray.length; ++x) {
              var allefertig = false;
              var mitzaehl = 0;
              if (Derarray[x + 1] == '\'' || Derarray[x + 1] == ',') {
                do {
                  mitzaehl = mitzaehl + 1;
                  if (Derarray[x + mitzaehl] == '\'') {
                    Derarray[x] = Derarray[x] + '\'';
                    Derarray[x + mitzaehl] = '';
                  } else if (Derarray[x + mitzaehl] == ',') {
                    Derarray[x] = Derarray[x] + ',';
                    Derarray[x + mitzaehl] = '';
                  } else {
                    allefertig = true;
                  }
                } while (allefertig == false);
              } else {
              }
            }
            for (var y = 0; y < Derarray.length; ++y) {
              var Miniarray = Derarray[y].split('');
              if (Miniarray[0] == 'B' && Miniarray[1] == ',') {
                Miniarray[0] = 'C';
                Miniarray[1] = '';
              } else if (Miniarray[0] == 'b' && Miniarray[1] == '\'') {
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
        var neu = escape(tune.pure);
        var Reihe = neu.split('%0D%0A');
        Reihe = neu.split('%0A');
        for (var i = 0; i < Reihe.length; ++i) {
          Reihe[i] = unescape(Reihe[i]);
          var Aktuellereihe = Reihe[i].split('');
          if (Aktuellereihe[0] == 'A' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'B' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'C' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'D' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'E' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'F' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'G' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'H' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'I' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'J' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'L' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'M' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'N' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'O' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'P' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'Q' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'R' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'S' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'T' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'U' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'V' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'W' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'X' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'Y' && Aktuellereihe[1] == ':' || Aktuellereihe[0] == 'Z' && Aktuellereihe[1] == ':') {
          } else if (Aktuellereihe[0] == 'K' && Aktuellereihe[1] == ':') {
            var Leerzeichenweg = Reihe[i].split(' ');
            var sindweg = Leerzeichenweg.join('');
            Aktuellereihe = sindweg.split('');
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
            var Derarray = Reihe[i].split('');
            for (var x = 0; x < Derarray.length; ++x) {
              var allefertig = false;
              var mitzaehl = 0;
              if (Derarray[x + 1] == '\'' || Derarray[x + 1] == ',') {
                do {
                  mitzaehl = mitzaehl + 1;
                  if (Derarray[x + mitzaehl] == '\'') {
                    Derarray[x] = Derarray[x] + '\'';
                    Derarray[x + mitzaehl] = '';
                  } else if (Derarray[x + mitzaehl] == ',') {
                    Derarray[x] = Derarray[x] + ',';
                    Derarray[x + mitzaehl] = '';
                  } else {
                    allefertig = true;
                  }
                } while (allefertig == false);
              } else {
              }
            }
            for (var y = 0; y < Derarray.length; ++y) {
              var Miniarray = Derarray[y].split('');
              if (Miniarray[0] == 'C' && Miniarray[1] == ',') {
                Miniarray[0] = 'B';
                Miniarray[1] = ',,';
              } else if (Miniarray[0] == 'c' && Miniarray[1] == '\'') {
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
              if (titleCount == 0) {
                simulateTitle = true;
                isNeeded = true;
              }
              titleCount = titleCount + 1;
            } else {
              barSplits = tuneSplits[i].split('\n');
              barSplits = barSplits[0].split('|');
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
                      isNeeded = true;
                    } else {
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
                        isInFocus = false;
                      }
                    }
                    if (isNeeded) {
                      newAbc = newAbc + barSplit;
                      newAbc = newAbc + '|';
                      if (isLastBar) {
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
          video = newVideo(videoSource, videoCode, videoDescription);
          tune.videos.push(video);
        }
        return video;
      }
      function addWebsite(tuneBook, intTuneId, url) {
        var tune, wsite;
        tune = getTuneById(tuneBook, intTuneId);
        if (tune != null) {
          wsite = newWebsite(url);
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
              if (intTuneId == tuneBook.tuneSets[i].tuneSetPositions[z].intTuneId) {
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
      function extractTunes(tuneSets) {
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
        var tuneSetPositions = [];
        for (var i = 0; i < tuneSets.length; i++) {
          for (var z = 0; z < tuneSets[i].tuneSetPositions.length; z++) {
            tuneSetPositions.push(tuneSets[i].tuneSetPositions[z]);
          }
        }
        return tuneSetPositions;
      }
      function extractFirstTuneSetPositions(tuneSets) {
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
        for (var z = 0; z < tuneSet.tuneSetPositions.length; z++) {
          if (tuneSet.tuneSetPositions[z].position == '1') {
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
      function getTuneSetsAsTuneSetPositions(tuneBook, intTuneId) {
        var tuneSetIds = [];
        var tuneSetPositions = [];
        if (tuneBook != null) {
          for (var i = 0; i < tuneBook.tuneSets.length; i++) {
            for (var z = 0; z < tuneBook.tuneSets[i].tuneSetPositions.length; z++) {
              if (intTuneId == tuneBook.tuneSets[i].tuneSetPositions[z].tune.intTuneId) {
                tuneSetIds.push(tuneBook.tuneSets[i].tuneSetId);
              }
            }
          }
        }
        for (var y = 0; y < tuneSetIds.length; y++) {
          getTuneSetPositionsForTuneSetId(tuneBook, tuneSetIds[y], tuneSetPositions);
        }
        return tuneSetPositions;
      }
      function getTuneSetPositionsForTuneSetId(tuneBook, tuneSetId, tuneSetPositions) {
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
      function filterTuneSets(tuneSets, filterOptions) {
        var keyMatch = false;
        var typeMatch = false;
        var colorMatch = false;
        var skillMatch = false;
        var targetMatch = false;
        var envMatch = false;
        var playMatch = false;
        var playMin, playMax, updateMin, updateMax;
        var freqMatch = false;
        var updateMatch = false;
        var tuneSetsFiltered = [];
        for (var i = 0; i < tuneSets.length; i++) {
          keyMatch = false;
          typeMatch = false;
          colorMatch = false;
          skillMatch = false;
          targetMatch = false;
          envMatch = false;
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
          if (filterOptions.target == '' || filterOptions.target == 'All Targets' || filterOptions.target == null || filterOptions.target == tuneSets[i].tuneSetTarget) {
            targetMatch = true;
          }
          if (filterOptions.env == '' || filterOptions.env == 'All Environments' || filterOptions.env == null || filterOptions.env == tuneSets[i].tuneSetEnv) {
            envMatch = true;
          }
          if (!keyMatch || !typeMatch || !colorMatch || !skillMatch || !playMatch || !updateMatch || !freqMatch) {
            for (var z = 0; z < tuneSets[i].tuneSetPositions.length; z++) {
              if (!keyMatch && tuneSets[i].tuneSetPositions[z].tune.key == filterOptions.key) {
                keyMatch = true;
              }
              if (!typeMatch && tuneSets[i].tuneSetPositions[z].tune.type == filterOptions.type) {
                typeMatch = true;
              }
              if (!colorMatch && tuneSets[i].tuneSetPositions[z].tune.color == filterOptions.color) {
                colorMatch = true;
              }
              if (!skillMatch && tuneSets[i].tuneSetPositions[z].tune.skill == filterOptions.skill) {
                skillMatch = true;
              }
              if (!playMatch && tuneSets[i].tuneSetPositions[z].tune.lastPlayed != null) {
                var lastPlayed = moment(tuneSets[i].tuneSetPositions[z].tune.lastPlayed);
                if (!lastPlayed.isBefore(playMin) && !lastPlayed.isAfter(playMax)) {
                  playMatch = true;
                }
              }
              if (!updateMatch && tuneSets[i].tuneSetPositions[z].tune.lastModified != null) {
                var lastModified = moment(tuneSets[i].tuneSetPositions[z].tune.lastModified);
                if (!lastModified.isBefore(updateMin) && !lastModified.isAfter(updateMax)) {
                  updateMatch = true;
                }
              }
              if (!freqMatch) {
                if (filterOptions.freqcomp == 'LT' && parseInt(tuneSets[i].tuneSetPositions[z].tune.frequencyPlayed) < parseInt(filterOptions.freq) || filterOptions.freqcomp == 'GE' && parseInt(tuneSets[i].tuneSetPositions[z].tune.frequencyPlayed) >= parseInt(filterOptions.freq)) {
                  freqMatch = true;
                }
              }
            }
          }
          if (keyMatch && typeMatch && colorMatch && skillMatch && targetMatch && envMatch && playMatch && updateMatch && freqMatch) {
            tuneSetsFiltered.push(tuneSets[i]);
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
      eTBk.DEFAULT_COLOR = eTBK_DEFAULT_COLOR;
      eTBk.PATTERN_FINGER = eTBK_PATTERN_FINGER;
      eTBk.EXAMPLE_FILENAME = eTBk_EXAMPLE_FILENAME;
      eTBk.EXAMPLE_FILENAME_WITHOUTABC = eTBk_EXAMPLE_FILENAME_WITHOUTABC;
      eTBk.EXAMPLE_VERSION = eTBk_EXAMPLE_VERSION;
      eTBk.getAbc = function (tuneSets, tuneBookName, tuneBookVersion, tuneBookDescription, tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl, fingeringAbcIncl) {
        return getAbc(tuneSets, tuneBookName, tuneBookVersion, tuneBookDescription, tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl, fingeringAbcIncl);
      };
      eTBk.getSampleAbc = function (tune) {
        return getSampleAbc(tune, 1, 4);
      };
      eTBk.tuneUp = function (intTuneId) {
        var tune = eTBk.getTune(intTuneId);
        tune.key = eTBk.getTuneKey(tuneUp(tune));
      };
      eTBk.tuneDown = function (intTuneId) {
        var tune = eTBk.getTune(intTuneId);
        tune.key = eTBk.getTuneKey(tuneDown(tune));
      };
      eTBk.initializeTuneSet = function (intTuneId) {
        return initializeTuneSet(currentTuneBook.tuneSets, eTBk.getTune(intTuneId));
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
      eTBk.changePositionOnTuneSetDirective = function (tuneSetPosition) {
        changePositionOnTuneSetDirective(tuneSetPosition);
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
        localStorage.setItem(eTBK_STORAGE_ID_TUNEBOOK, JSON.stringify(getAbc(currentTuneBook.tuneSets, currentTuneBook.name, currentTuneBook.version, currentTuneBook.description, true, true, true, true, true, true, true, true)));
      };
      eTBk.storeAbc = function (tuneBook) {
        localStorage.setItem(eTBK_STORAGE_ID_TUNEBOOK, JSON.stringify(getAbc(tuneBook.tuneSets, tuneBook.name, tuneBook.version, tuneBook.description, true, true, true, true, true, true, true, true)));
      };
      eTBk.storeSettings = function (settings) {
        localStorage.setItem(eTBK_STORAGE_ID_SETTINGS, JSON.stringify(settings));
      };
      eTBk.initializeTuneBook = function () {
        var tuneBookName = 'My TuneBook';
        var tuneBookVersion = '';
        var tuneBookDescription = 'The tunes I play';
        var date = moment(new Date());
        tuneBookVersion = date.format('YYYY-MM-DDTHH:mm');
        var abc = '';
        var includeEtbkDirective = true;
        abc = getAbcHeader(tuneBookName, tuneBookVersion, tuneBookDescription, includeEtbkDirective);
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
        settings = JSON.parse(localStorage.getItem(eTBK_STORAGE_ID_SETTINGS) || '[]');
        return settings;
      };
      eTBk.newTuneSetPosition = function (iTuneSetId, iTuneSetTarget, iTuneSetEnv, iTuneSetName, iIntTuneId, iTune, iPosition, iRepeat, iAnnotation) {
        return newTuneSetPosition(iTuneSetId, iTuneSetTarget, iTuneSetEnv, iTuneSetName, iIntTuneId, iTune, iPosition, iRepeat, iAnnotation);
      };
      eTBk.moveTuneSetPosition = function (sourceTuneSetId, sourcePosition, targetTuneSetId, targetPosition, beforeOrAfter, moveOrCopy) {
        return moveTuneSetPosition(currentTuneBook, sourceTuneSetId, sourcePosition, targetTuneSetId, targetPosition, beforeOrAfter, moveOrCopy);
      };
      eTBk.deleteTuneSetPosition = function (iTuneSetId, iPosition) {
        return deleteTuneSetPosition(currentTuneBook, iTuneSetId, iPosition);
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
      eTBk.getTunesFiltered = function (filterOptions) {
        return filterTunes(extractTunes(filterTuneSets(eTBk.getCurrentTuneBook().tuneSets, filterOptions)), filterOptions);
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
        return extractTuneSetPositions(filterTuneSets(eTBk.getCurrentTuneBook().tuneSets, filterOptions));
      };
      eTBk.getTuneSetsAsTuneSetPositions = function (intTuneId) {
        return getTuneSetsAsTuneSetPositions(eTBk.getCurrentTuneBook(), intTuneId);
      };
      eTBk.getTuneSetsByIntTuneId = function (intTuneId) {
        return getTuneSetsByIntTuneId(eTBk.getCurrentTuneBook(), intTuneId);
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
      eTBk.updateFirstTuneSetPosition = function (tuneSet) {
        for (var z = 0; z < tuneSet.tuneSetPositions.length; z++) {
          if (tuneSet.tuneSetPositions[z].position == '1') {
            tuneSet.tuneSetPositions[z].tuneSetTarget = tuneSet.tuneSetTarget;
            tuneSet.tuneSetPositions[z].tuneSetEnv = tuneSet.tuneSetEnv;
            tuneSet.tuneSetPositions[z].tuneSetName = tuneSet.tuneSetName;
          }
        }
      };
      eTBk.getTuneBookFromLocalStorage = function () {
        var abc = JSON.parse(localStorage.getItem(eTBK_STORAGE_ID_TUNEBOOK) || '[]');
        if (abc == undefined || abc == '') {
          currentTuneBook = null;
        } else {
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
        var tuneBook = [];
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
          alert('Fehler beim Laden von ' + eTBk.EXAMPLE_FILENAME);
        });
        return currentTuneBook;
      };
      return eTBk;
    }(window.eTBk = window.eTBk || {});
  return eTBk;
});
angular.module('eTuneBookApp').directive('ngBlur', function () {
  return function (scope, elem, attrs) {
    elem.bind('blur', function () {
      scope.$apply(attrs.ngBlur);
    });
  };
});
'use strict';
angular.module('eTuneBookApp').directive('tbkTuneBlur', function () {
  return function (scope, elem, attrs) {
    elem.bind('blur', function () {
      scope.$apply(attrs.tbkTuneBlur);
    });
  };
});
'use strict';
angular.module('eTuneBookApp').directive('tbkFileSelect', function () {
  return function (scope, elem, attrs) {
    elem.bind('change', function (evt) {
      var files = evt.target.files;
      for (var i = 0, f; f = files[i]; i++) {
        var fileName = escape(f.name);
        var ext = fileName.replace(/^.*?\.([a-zA-Z0-9]+)$/, '$1');
        if (ext != 'abc' && ext != 'ABC') {
          alert('eTuneBook only accepts files with extension .abc or .ABC');
        } else {
          var reader = new FileReader();
          reader.onload = function (theFile) {
            return function (e) {
              var abc = this.result;
              try {
                scope.importTuneBook(abc, fileName);
              } catch (e) {
                alert('eTuneBook cannot import ' + fileName + ' due to: ' + e.toString());
              } finally {
                scope.$apply();
              }
            };
          }(f);
          reader.readAsText(f);
        }
      }
    });
  };
});
'use strict';
angular.module('eTuneBookApp').directive('tbkFileSelectDelegate', function () {
  return function (scope, elem, attrs) {
    elem.bind('click', function (evt) {
      var fileElem = document.getElementById('fileInput');
      fileElem.click();
    });
  };
});
'use strict';
angular.module('eTuneBookApp').directive('tbkColorselect', function () {
  return function (scope, element, attrs) {
    element.colorPicker({
      onColorChange: function (id, newValue) {
        var currentScope = angular.element(this).scope();
        currentScope.tune.color = newValue;
        scope.putTuneBookToLocalStorage();
        scope.$apply();
      }
    });
  };
});
'use strict';
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
angular.module('eTuneBookApp').filter('fromNow', function () {
  return function (date) {
    var result = '';
    if (date != null) {
      result = moment(date).fromNow();
    }
    return result;
  };
});
'use strict';
angular.module('eTuneBookApp').filter('eliminateThe', function () {
  return function (string) {
    var theSplits = [];
    if (string != 'undefined' && string != null) {
      theSplits = string.split(',');
    }
    return theSplits[0];
  };
});