'use strict';

/**
 * Definition and Configuration of the eTuneBookApp module.
 *
 * @type {angular.Module}
 */

 	
//angular.module('eTuneBookApp', ['ui.state', 'ngGrid', 'ui.bootstrap']);
//ACHTUNG: ui.bootsrap bricht importFile (File-Auswahl-Schirm kommt nicht mehr hoch)!

angular.module('eTuneBookApp', ['ui.router', 'ngGrid', 'ngBootstrap', 'ngTouch', 'chieffancypants.loadingBar', 'ngAnimate', 'gapi']);

angular.module('eTuneBookApp').config(function($locationProvider) {
	$locationProvider.html5Mode(false);
});

angular.module('eTuneBookApp').config(function($sceProvider) {
    // Temporary Fix for broken Youtube-Embeds
    // check http://docs.angularjs.org/api/ng.$sce
    $sceProvider.enabled(false);
});

angular.module('eTuneBookApp').config(['$stateProvider', function ($stateProvider) {

    var main = {
        name: 'main',
        url: '',
        //abstract: true,
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
            'booktitle@main': {
                templateUrl: 'views/booktitle.html'
            }
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
            'booktitle@main': {
                templateUrl: 'views/booktitle.html'
            }
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
            'booktitle@main': {
                templateUrl: 'views/booktitle.html'
            }
        }
    };

    var filter = {
        name: 'filter',
        //parent: setlist,
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

    $stateProvider
		.state(main)
        .state(book)
        .state(sets)
        .state(tunes)
        .state(abc)
        .state(info)
        .state(bookedit)
        .state(set)
        .state(setlist)
        .state(filter)
        .state(tunelist)
        .state(tune)
        .state(tunesets)
        .state(tuneabc)
        .state(tuneinfo)
        .state(tunepractice)
        .state(tunevideos)
        .state(tunevideo)
        .state(introduction)
        .state(getstarted)
        .state(manual)
        .state(releasenotes)
        .state(feedback)
        .state(credits);
}]);

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
angular.module('eTuneBookApp').factory('debounce', function($timeout, $q) {
    return function(func, wait, immediate) {
        var timeout;
        var deferred = $q.defer();
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if(!immediate) {
                    deferred.resolve(func.apply(context, args));
                    deferred = $q.defer();
                }
            };
            var callNow = immediate && !timeout;
            if ( timeout ) {
                $timeout.cancel(timeout);
            }
            timeout = $timeout(later, wait);
            if (callNow) {
                deferred.resolve(func.apply(context,args));
                deferred = $q.defer();
            }
            return deferred.promise;
        };
    };
});

