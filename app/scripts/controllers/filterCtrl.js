'use strict';

/**
 * Controller for filter template
 */
angular.module('eTuneBookApp').controller( 'filterCtrl', function ( $scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService ) {
	// Get current tuneBook
	$scope.tuneBook =  eTuneBookService.getCurrentTuneBook();

    setFilterOptions();

    // Set which Type to Filter
    var type = $stateParams['type'];
    if (type == "" || type == null){
        type = "All Types";
    }
    setSelectedTuneSetTypeFilter(type);

    // Set which Key to Filter
    var key = $stateParams['key'];
    if (key == "" || key == null) {
        key = "All Keys";
    }
    setSelectedTuneSetKeyFilter(key);

    // Set which Color to Filter
    var color = $stateParams['color'];
    if (color == "" || color == null){
        color = "All Colors";
    }
    setSelectedTuneSetColorFilter(color);

    // Set which Skill to Filter
    var skill = $stateParams['skill'];
    if (skill == "" || skill == null){
        skill = "All Skills";
    }
    setSelectedTuneSetSkillFilter(skill);

    // Set which Target to Filter
    var target = $stateParams['targ'];
    if (target == "" || target == null) {
        target = "All Targets";
    }
    setSelectedTuneSetTargetFilter(target);

    // Set which Environment to Filter
    var env = $stateParams['env'];
    if (env == "" || env == null) {
        env = "All Environments";
    }

    setSelectedTuneSetEnvFilter(env);

    // Set which Play Range to Filter
    // Default: Launch Date of eTuneBook till now
    $scope.tuneSetPlayRangeFilter = {
        startDate: moment('05.10.2012', 'DD.MM.YYYY'),
        endDate: moment()
    };

    var playMin = $stateParams['plmin'];
    if (playMin != null && playMin != "") {
        $scope.tuneSetPlayRangeFilter.startDate = moment(playMin, 'DD.MM.YYYY');
    }
    var playMax = $stateParams['plmax'];
    if (playMax != null && playMax != "") {
        $scope.tuneSetPlayRangeFilter.endDate = moment(playMax, 'DD.MM.YYYY');
    }

    // Set which Update Range to Filter
    // Default: Launch Date of eTuneBook till now
    $scope.tuneSetUpdateRangeFilter = {
        startDate: moment('05.10.2012', 'DD.MM.YYYY'),
        endDate: moment()
    };

    var updateMin = $stateParams['updmin'];
    if (updateMin != null && updateMin != "") {
        $scope.tuneSetUpdateRangeFilter.startDate = moment(updateMin, 'DD.MM.YYYY');
    }
    var updateMax = $stateParams['plmax'];
    if (updateMax != null && updateMax != "") {
        $scope.tuneSetUpdateRangeFilter.endDate = moment(updateMax, 'DD.MM.YYYY');
    }



    $scope.ranges = {
        'Today': [moment().startOf('day'), moment().add('days', 1)],
        'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
        'Last 7 Days': [moment().subtract('days', 7), moment()],
        'Last 30 Days': [moment().subtract('days', 30), moment()],
        'This Month': [moment().startOf('month'), moment()],
        'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')],
        'Maximum Range': [moment('05.10.2012', 'DD.MM.YYYY'), moment()]

    };


    // Set which Frequency Range to Filter
    var freqComp = $stateParams['freqcomp'];
    if (freqComp == null) {
        freqComp = "";
    }
    var freq = $stateParams['freq'];
    if (freq == null) {
        freq = "";
    }

    $scope.freqencyComparator = freqComp;
    $scope.tuneSetFrequencyForFilter = freq;

    $scope.editSetFilter = function( ) {
        angular.element("#SetFilter").modal("show");
    };


    function setSelectedTuneSetTypeFilter(type) {
		for (var i = 0; i < $scope.tuneSetTypesForFilter.length; i++) {	
			if ($scope.tuneSetTypesForFilter[i].type == type){
				// Setzen neuer Filter
				$scope.tuneSetTypeForFilter = $scope.tuneSetTypesForFilter[i];
			}
		}
	}
	
	function setSelectedTuneSetKeyFilter(key) {
		for (var i = 0; i < $scope.tuneSetKeysForFilter.length; i++) {	
			if ($scope.tuneSetKeysForFilter[i].key == key){
				// Setzen neuer Filter
				$scope.tuneSetKeyForFilter = $scope.tuneSetKeysForFilter[i];
			}
		}
	}

    function setSelectedTuneSetTargetFilter(target) {
        for (var i = 0; i < $scope.tuneSetTargetsForFilter.length; i++) {
            if ($scope.tuneSetTargetsForFilter[i].target == target){
                // Setzen neuer Filter
                $scope.tuneSetTargetForFilter = $scope.tuneSetTargetsForFilter[i];
            }
        }
    }

    function setSelectedTuneSetEnvFilter(env) {
        for (var i = 0; i < $scope.tuneSetEnvsForFilter.length; i++) {
            if ($scope.tuneSetEnvsForFilter[i].env == env){
                // Setzen neuer Filter
                $scope.tuneSetEnvForFilter = $scope.tuneSetEnvsForFilter[i];
            }
        }
    }
	
	function setSelectedTuneSetColorFilter(color) {
		for (var i = 0; i < $scope.tuneSetColorsForFilter.length; i++) {	
			if ($scope.tuneSetColorsForFilter[i].color == color){
				// Setzen neuer Filter
				$scope.tuneSetColorForFilter = $scope.tuneSetColorsForFilter[i];
			}
		}
	}
	
	function setSelectedTuneSetSkillFilter(skill) {
		for (var i = 0; i < $scope.skillTypes.length; i++) {	
			if ($scope.skillTypes[i].description == skill){
				// Setzen neuer Filter
				$scope.skillType = $scope.skillTypes[i];
			}
		}
	}

	function setTuneSetTypesForFilter(){
		//Extract TuneSetTypes for TypeFilter
		var tuneSetTypeForFilter = {};
		var tuneSetTypesForFilter = [];
		var addToTypeFilter = true;
		
		if ($scope.hasOwnProperty("tuneBook")) {
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
		tuneSetTypeForFilter.type = "All Types";
		tuneSetTypesForFilter.unshift(tuneSetTypeForFilter);
				
		$scope.tuneSetTypesForFilter = tuneSetTypesForFilter;
	}
	
	function setTuneSetKeysForFilter(){
		//Extract TuneSetKeys for KeyFilter
		var tuneSetKeyForFilter = {};
		var tuneSetKeysForFilter = [];
		var addToKeyFilter = true;
		
		if ($scope.hasOwnProperty("tuneBook")) {
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
		tuneSetKeyForFilter.key = "All Keys";
		tuneSetKeyForFilter.sort = "";  // Sort, damit zum Beispiel "Ador" nicht vor "All Keys" kommt
		tuneSetKeysForFilter.unshift(tuneSetKeyForFilter);
		$scope.tuneSetKeysForFilter = tuneSetKeysForFilter;
	}

    function setTuneSetTargetsForFilter(){
        //Extract TuneSetTargets for TargetFilter
        var tuneSetTargetForFilter = {};
        var tuneSetTargetsForFilter = [];
        var addToTargetFilter = true;
        var selectedTuneSetTargetForFilter = new Array ();

        if ($scope.hasOwnProperty("tuneBook")) {

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
        tuneSetTargetForFilter.target = "All Targets";
        tuneSetTargetsForFilter.unshift(tuneSetTargetForFilter);
        $scope.tuneSetTargetsForFilter = tuneSetTargetsForFilter;
    }

    function setTuneSetEnvsForFilter(){
        //Extract TuneSetEnvironments for EnvFilter
        var tuneSetEnvForFilter = {};
        var tuneSetEnvsForFilter = [];
        var addToEnvFilter = true;

        if ($scope.hasOwnProperty("tuneBook")) {

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
        tuneSetEnvForFilter.env = "All Environments";
        tuneSetEnvsForFilter.unshift(tuneSetEnvForFilter);
        $scope.tuneSetEnvsForFilter = tuneSetEnvsForFilter;
    }
	
	function setTuneSetColorsForFilter(){
		//Extract TuneSetColors for ColorFilter
		var tuneSetColorForFilter = {};
		var tuneSetColorsForFilter = [];
		var addToColorFilter = true;
		
		if ($scope.hasOwnProperty("tuneBook")) {
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
						tuneSetColorForFilter.text = "     "; 
						tuneSetColorsForFilter.push(tuneSetColorForFilter);
					}		
				}
			}
		}
		
		tuneSetColorForFilter = {};
		tuneSetColorForFilter.color = "All Colors";
		tuneSetColorForFilter.text = "     "; 
		tuneSetColorsForFilter.unshift(tuneSetColorForFilter);
				
		$scope.tuneSetColorsForFilter = tuneSetColorsForFilter;
	}

	function setFilterOptions(){
		setTuneSetTypesForFilter();
		setTuneSetKeysForFilter();
		setTuneSetColorsForFilter();
        setSkillTypes();
        setTuneSetTargetsForFilter();
        setTuneSetEnvsForFilter();
	}

    function setSkillTypes(){
        var skillTypes = eTuneBookService.getSkillTypes();

        var skillType = {};
        skillType.skill = "";
        skillType.description = "All Skills";
        skillTypes.unshift(skillType);

        $scope.skillTypes = skillTypes;
    }

    $scope.applySetFilter = function () {

        angular.element("#SetFilter").modal("hide");

        $timeout(function(){
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

            if($scope.tuneSetTypeForFilter.type == "All Types"){
                type = "";
            }
            if($scope.tuneSetKeyForFilter.key == "All Keys"){
                key = "";
            }
            if($scope.tuneSetColorForFilter.color == "All Colors"){
                color = "";
            }
            if($scope.skillType.description == "All Skills"){
                skill = "";
            }
            if($scope.tuneSetTargetForFilter.target == "All Targets"){
                target = "";
            }
            if($scope.tuneSetEnvForFilter.env == "All Environments"){
                env = "";
            }
            if(playmin == "05.10.2012"){
                playmin = "";
                playmax = "";
            }

            if(updatemin == "05.10.2012"){
                updatemin = "";
                updatemax = "";
            }

            $state.transitionTo($state.current.name, {key: key, type: type, color: color, skill: skill, targ: target, env: env, plmin: playmin, plmax: playmax, freqcomp: freqcomp, freq: freq, updmin: updatemin, updmax: updatemax});

        },1000);

    };
});





