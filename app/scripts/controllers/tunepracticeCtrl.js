'use strict';

/**
 * Controller for tunepractice Template
 */
angular.module('eTuneBookApp').controller( 'tunepracticeCtrl', function( $scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService ) {
    // Get current tune
    $scope.intTuneId = $stateParams['intTuneId'];
    $scope.tune =  eTuneBookService.getTune($scope.intTuneId);
    $scope.tunePlayDates = $scope.tune.playDates;
    $scope.tunePlayDatesSelected = [];

    $scope.$parent.currentState = "Practice";

    $scope.tunePlayDateList = {
        data: 'tunePlayDates',
        selectedItems: $scope.tunePlayDatesSelected,
        multiSelect: false,
        columnDefs: [
            {field: 'playDate',
                displayName:'Played',
                cellFilter: 'date: \'yyyy-MM-dd HH:mm\'',
                width:'50%'
            },
            {field: 'playDate',
                displayName:'',
                cellFilter: 'fromNow',
                width:'50%'
            }
        ]
    };

    setSkillTypes();

    function setSkillTypes(){
        $scope.skillTypes = eTuneBookService.getSkillTypes();

        for (var i = 0; i < $scope.skillTypes.length; i++) {
            if($scope.skillTypes[i].description == $scope.tune.skill){
                //Select current SkillType
                $scope.skillType = $scope.skillTypes[i];
            }
        }
    }

    $scope.setSkill = function (skillType) {
        $scope.tune.skill = skillType.description;
        eTuneBookService.storeTuneBookAbc();
    };
});
