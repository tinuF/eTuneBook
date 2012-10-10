'use strict';

/**
 * Main controller for eTuneBook. 
 */
eTuneBook.controller( 'tbkCtrl', function tuneBookCtrl( $scope, $location, $timeout, $rootScope, tbkStorage ) {
	// Test for first-time navigation to the welcome-page
	//localStorage.clear();
	
	// Test whether changes in eTuneBook.appcache are detected by the browser 
	askForRefreshFromServer();
		
	// Get tuneBook from localStorage 
	var tuneBook =  eTBk.TuneBook.getTuneBookFromStore();
  
	if (tuneBook.hasOwnProperty("tuneSets")){
		// Show TuneBook from LocalStorage
		$scope.tuneBook = tuneBook;
		show("loading");
		
		$timeout(function(){
			initView("tuneSets");
			$scope.$apply();
		},1000);
  
	} else {
		// First time here -> show Welcome-Page
		initView('introduction');
	}
	
	$scope.setCurrentPage = function(page) {
		$scope.currentPage = page.number -1;	
	};

	
	function askForRefreshFromServer() {
		if (window.applicationCache) {
			applicationCache.addEventListener('updateready', function() {
				if (confirm('An eTuneBook update is available. Reload now?')) {
					window.location.reload();
				}
			});
		}
	}
	
	function setPages() {
		$timeout(function(){
			var tuneSetCount = 0;
		
			if ($scope.tuneSetsFiltered) {
				tuneSetCount = $scope.tuneSetsFiltered.length;
			} else if ($scope.tuneBook.tuneSets) {
				tuneSetCount = $scope.tuneBook.tuneSets.length;	
			}
			
			var numberOfPages = Math.ceil(tuneSetCount/$scope.pageSize);
			var pages = new Array();
			var page = new Array();
			
			for (var i = 0; i < numberOfPages; i++) {
				page = new Array();
				page.number = i+1;
				pages.push(page);
			}
			
			$scope.pages = pages	
			
			//Auf Seite 1 positionieren 
			$scope.currentPage = 0;
		
			$scope.$apply();
		},0);
	}
	
	
	
	function initView(view){
		// Set current example
		$scope.exampleFileName = eTBk.EXAMPLE_FILENAME;
		
		// Init TuneSet-View-Detail-Panels
		initTuneSetViewDetailPanels();
		
		// Init TuneSet-Detail-Lines  
		$scope.showTuneSecondLine = true;
		$scope.showTuneThirdLine = true;
		$scope.showTuneForthLine = true;
		
		// Init TuneSet Sorter
		$scope.tuneSetSortField = "tuneSetId";
		$scope.tuneSetSortReverse = true;
		
		// Init TuneSet Filter
		$scope.tuneSetColorToFilter = "All Colors";
		$scope.tuneSetSkillToFilter = 0;
		$scope.tuneSetKeyToFilter = "All Keys";
		$scope.tuneSetKeyFilter = null;
		$scope.tuneSetIdToFilter = 0;
		$scope.tuneSetTypeFilter = null;
		
		// Init Abc-Export-Settings
		$scope.tuneSetAbcIncl = true;
		$scope.playDateAbcIncl = true;
		$scope.skillAbcIncl = true;
		$scope.colorAbcIncl = true;
		$scope.annotationAbcIncl = true;
		$scope.siteAbcIncl = true;
		$scope.tubeAbcIncl = true;
		$scope.fingeringAbcIncl = true;
		
		// Init available colors
		$.fn.colorPicker.defaults.colors = ['F5F5F5', 'CCFFCC', 'EFEBD6', 'FFFF99', 'C7DAD4', 'BFE4FF', 'D8CFE6', 'FFE6E6', 'EEE6FF', 'E6FFE6', 'FFCCBF', 'FFFFFF', 'CCCCFF', 'FFFFCC', 'FF9980'];
	
		// Init Pagination
		$scope.currentPage = 0;
		$scope.pageSize = 10;
		$scope.showPageButtons = true;
		
		setSelectors();
		show(view);
	}
	
	function initTuneSetViewDetailPanels(){
		// Init TuneSet-View-Detail-Panels (Panels shown on the right side of the tuneSets)
		$scope.editedTune = null;
		$scope.infoEditedTuneSetPosition = null;
		$scope.movedTuneSetPosition = null;
		$scope.exportedTuneBook = null;
		$scope.youTubeTune = null;
		$scope.youTubeUrl = null;
		$scope.dotsViewerTune = null;
	}
	
	
	function setSelectors(){
		setFilterOptions();
		setTargetTuneSetPositionsForMoving();
	}
	
	
	function show(view){
		$scope.showTuneSets = false;
		$scope.showExport = false;
		$scope.showIntroduction = false;  
		$scope.showGettingStarted = false;
		$scope.showManual = false;
		$scope.showReleaseNotes = false;
		$scope.showCredits = false;
		$scope.showFeedback = false;
		$scope.showProgress = false;
		$scope.progress = 0;
	
		if (view == "tuneSets") {
			$scope.showTuneSets = true;
			
		} else if (view == "export") {
			$scope.showExport = true;
		
		} else if (view == "manual") {
			$scope.showManual = true;
		
		} else if (view == "credits") {
			$scope.showCredits = true;
		
		} else if (view == "introduction") {
			$scope.showIntroduction = true;  
			
		} else if (view == "gettingStarted") {
			$scope.showGettingStarted = true;
			
		} else if (view == "releaseNotes") {
			$scope.showReleaseNotes = true;
			
		} else if (view == "feedback") {
			$scope.showFeedback = true;

		} else if (view == "loading") {
			$scope.showProgress = true;
			$scope.progress = 50;
		}
	}
	
	$scope.viewTuneSets = function() {
		show("tuneSets");
	};
	
	$scope.manual = function() {
		show("manual");
	};
	
	$scope.credits = function() {
		show("credits");
	};
	
	$scope.introduction = function() {
		show("introduction");
	};
	
	$scope.gettingStarted = function() {
		show("gettingStarted");
	};
	
	$scope.releaseNotes = function() {
		show("releaseNotes");
	};
	
	$scope.feedback = function() {
		show("feedback");
	};
	
	
	$scope.filterForTuneSetType = function(tuneSetTypeForFilter) {
		if (tuneSetTypeForFilter.type == "All Types"){
			$scope.tuneSetTypeFilter = null;
		} else {
			$scope.tuneSetTypeFilter = {type: tuneSetTypeForFilter.type};
		}
		initTuneSetViewDetailPanels();
		setPages();	
		show("tuneSets");
	};
	
	$scope.filterForTuneSetKey = function(tuneSetKeyForFilter) {
		if (tuneSetKeyForFilter.key == "All Keys"){
			$scope.tuneSetKeyFilter = null;
		} else {
			$scope.tuneSetKeyFilter = tuneSetKeyForFilter.key;
		}
		initTuneSetViewDetailPanels();
		setPages();
		show("tuneSets");
	};
	
	$scope.filterForTuneSetColor = function(tuneSetColorForFilter) {
		if (tuneSetColorForFilter.color == "All Colors"){
			$scope.tuneSetColorToFilter = "All Colors";
		} else {
			$scope.tuneSetColorToFilter = tuneSetColorForFilter.color;
		}
		initTuneSetViewDetailPanels();
		setPages();
		show("tuneSets");
	};
	
	$scope.tuneSetColorFilter = function(tuneSet) {
		var match = false;
		
		if ($scope.tuneSetColorToFilter == "All Colors") {
			match = true;
		
		} else {
			for (var i = 0; i < tuneSet.tuneSetPositions.length; i++) {
				if (tuneSet.tuneSetPositions[i].tune.color == $scope.tuneSetColorToFilter) {
					match = true;
				}
			}
		}
		
		return match;
	};
	
	$scope.tuneSetKeyFilter = function(tuneSet) {
		var match = false;
		
		if ($scope.tuneSetKeyToFilter == "All Keys") {
			match = true;
		
		} else {
			for (var i = 0; i < tuneSet.tuneSetPositions.length; i++) {
				if (tuneSet.tuneSetPositions[i].tune.key == $scope.tuneSetKeyToFilter) {
					match = true;
				}
			}
		}
		
		return match;
	};
	
	
	$scope.filterForTuneSetSkill = function(skillType) {
		$scope.tuneSetSkillToFilter = skillType.skill;
		initTuneSetViewDetailPanels();
		setPages();
		show("tuneSets");
	};
	
	$scope.tuneSetSkillFilter = function(tuneSet) {
		var match = false;
		
		if ($scope.tuneSetSkillToFilter == 0) {
			match = true;
		
		} else {
			for (var i = 0; i < tuneSet.tuneSetPositions.length; i++) {
				if (tuneSet.tuneSetPositions[i].tune.skill == $scope.tuneSetSkillToFilter) {
					match = true;
				}
			}
		}
		
		return match;
	};
	
	
	$scope.tuneSetIdFilter = function(tuneSet) {
		var match = false;
		var nTuneSetId = 0;
		var nTuneSetFilterId = 0;
		
		if ($scope.tuneSetIdToFilter == 0) {
			match = true;
		
		} else {
			nTuneSetId = parseInt(tuneSet.tuneSetId);
			nTuneSetFilterId = parseInt($scope.tuneSetIdToFilter);
			
			if (nTuneSetId == nTuneSetFilterId) {
				match = true;
			}
		}
		
		return match;
	};
	
			
	$scope.orderByFrequencyPlayed = function() {
		if ($scope.tuneSetSortField == "frequencyPlayed"){
			$scope.tuneSetSortReverse = !$scope.tuneSetSortReverse;
			
		} else {
			$scope.tuneSetSortField = "frequencyPlayed";
		}
	};

	$scope.orderByLastPlayed = function() {
		if ($scope.tuneSetSortField == "lastPlayed"){
			$scope.tuneSetSortReverse = !$scope.tuneSetSortReverse;
			
		} else {
			$scope.tuneSetSortField = "lastPlayed";
		}
	};
	
	$scope.orderByRandomNumber = function() {
		if ($scope.tuneSetSortField == "sort"){
			$scope.tuneSetSortReverse = !$scope.tuneSetSortReverse;
			
		} else {
			eTBk.TuneBook.setRandomSort($scope.tuneBook);	// calculate new random numbers
			$scope.tuneSetSortField = "sort";
		}
	};
	
	$scope.orderByTuneSetId = function() {
		if ($scope.tuneSetSortField == "tuneSetId"){
			$scope.tuneSetSortReverse = !$scope.tuneSetSortReverse;
			
		} else {
			$scope.tuneSetSortField = "tuneSetId";
		}
	};
	
	$scope.filterForTuneSet = function(tuneSetPositionForFilter) {
		if (tuneSetPositionForFilter.tuneSetId == 0){
			$scope.tuneSetIdToFilter = 0;
		} else {
			$scope.tuneSetIdToFilter = tuneSetPositionForFilter.tuneSetId;
		}
		initTuneSetViewDetailPanels();
		setPages();
		show("tuneSets");
	};

	$scope.toggleTuneSecondLine = function() {
		$scope.showTuneSecondLine = !$scope.showTuneSecondLine;
	};
	
	$scope.toggleTuneThirdLine = function() {
		$scope.showTuneThirdLine = !$scope.showTuneThirdLine;
	};
	
	$scope.toggleTuneForthLine = function() {
		$scope.showTuneForthLine = !$scope.showTuneForthLine;
	};
	
	$scope.loadBxplTuneBook = function( ) {
		show("loading");
		
		// Asynchron (Job Submit): Starte in einer Sekunde (1000 ms), damit UI Zeit hat, den Progress-Bar anzuzeigen
		// Ansonsten ist das UI eingefroren (Menu bleibt solange offen, bis TuneBook geladen)
		// Asynchron heisst: 
		// 		-loadBxplTuneBook geht zu Ende, digest-cyclus läuft an ohne das neue Tunebook, nur mit dem Progress-Bar. 
		// 		-Während der Progress-Bar angezeigt wird, läuft das Laden der Daten, wenn fertig: apply -> nächster digest-cyclus macht UI-update mit Tunebook
		// Hinweis: Javascript ist nicht multithreaded. Es wird also immer nur eine Funktion ausgeführt. Mit Events und Timer (setTimeout) wird die Ausführung 
		// nur in die Warteschlange gestellt, wo sie dann abgearbeitet wird, wenn keine andere Funktion mehr löuft (blockiert). 
		
		$timeout(function(){
			try {
				tuneBook = $scope.tuneBook = tbkStorage.getDefaultFromServer();
				eTBk.TuneBook.storeAbc($scope.tuneBook);			
			} catch(e) {
				alert("eTuneBook cannot import " + eTBk.EXAMPLE_FILENAME + " due to: " + e.toString());		
			} finally {
				initView("tuneSets");
				$scope.$apply();
			}
		},1000);
		
	};
	
	$scope.newTune = function( ) {
		initializeTune( );
	};
	
	function initializeTune( ) {
		// A new Tune gets the highest TuneId, intTuneId and TuneSetId
		// Set OrderBy to -tuneSetId, so that new TuneSet appears on top
		
		var newTuneSet = eTBk.TuneBook.initializeTuneSet($scope.tuneBook.tuneSets);
		$scope.tuneBook.tuneSets.unshift(newTuneSet);
		initView("tuneSets");
		selectTuneSet(newTuneSet.tuneSetPositions[0]);
		
		//Setzen tune für Editor -> Textarea geht gleich auf
		$scope.editedTune = newTuneSet.tuneSetPositions[0].tune;
	}
	
	$scope.initializeTuneBook = function( ) {
		$scope.tuneBook.tuneSets = new Array();
		$scope.tuneBook.name = "New TuneBook";
		$scope.tuneBook.header = "";
		initializeTune( );
	};
   
	$scope.editTune = function( tuneSetPosition ) {
		// Wenn alle TuneSets angezeigt werden, reagiert der Cursor in der Textarea sehr sehr langsam. 
		//-> Sicht einschränken auf das TuneSet mit dem zu editierenden Tune
		// (Mit Pagination wird's zwar besser, aber immer noch langsamer, als wenn nur ein Set angezeigt wird.) 
		selectTuneSet(tuneSetPosition);
		
		// Only one TuneSet-View-Detail-Panel can be active -> Init
		initTuneSetViewDetailPanels();
		
		//Setzen tune für Editor
		$scope.editedTune = tuneSetPosition.tune;
	};
	
	$scope.editTuneInfo = function( tuneSetPosition ) { 
		if ($scope.infoEditedTuneSetPosition == tuneSetPosition) {
			$scope.infoEditedTuneSetPosition = null;
		
		} else {
			selectTuneSet(tuneSetPosition);
			
			// Only one TuneSet-View-Detail-Panel can be active -> Init
			initTuneSetViewDetailPanels();
		
			//Setzen tuneSetPosition für Info-Editor
			$scope.infoEditedTuneSetPosition = tuneSetPosition;
		}
		
		// Put TuneBook to localStorage
		eTBk.TuneBook.storeAbc($scope.tuneBook);
	};
	
	$scope.dotsViewer = function( tuneSetPosition ) { 
		if ($scope.dotsViewerTune == tuneSetPosition.tune) {
			$scope.dotsViewerTune = null;
		
		} else {
			selectTuneSet(tuneSetPosition);
			
			// Only one TuneSet-View-Detail-Panel can be active -> Init
			initTuneSetViewDetailPanels();
		
			//Setzen tuneSetPosition.tune für showTheDots
			$scope.dotsViewerTune = tuneSetPosition.tune;
			
			renderAbc($scope.dotsViewerTune);
		}
	};
	
	function renderAbc(tune) {
		//Render Abc
		//Important: Has to be timed-out, otherwise fingerings won't show up
		//Compare with tbkTuneFocus: ABCJS.Editor also timed-out -> fingerings show up
		//Compare with tbkPopover: ABCJS.renderAbc is not timed-out -> fingerings dont' show (timeout in popover -> no popover is shown) 
	
		$timeout(function() {
			var showHere = 'renderTheDotsFor'+tune.title;
			//var fingerPattern = /!\d!/g;		//matches !<number>! globally (every occurence)
			var tuneAbc = tune.pure;
			
			if (!$scope.fingeringAbcIncl) {
				tuneAbc = tuneAbc.replace(eTBk.PATTERN_FINGER, '');
			}
			ABCJS.renderAbc(showHere, tuneAbc);
			//new ABCJS.Editor(tune.title, { canvas_id: showHere });
		}, 0, false);
	}
		
	
	$scope.toggleFingeringAbc = function() { 
		$scope.fingeringAbcIncl = !$scope.fingeringAbcIncl;
	
		if ($scope.showExport == true) {
			$scope.exportTuneBook();
			
		} else if ($scope.dotsViewerTune != null) {
			renderAbc($scope.dotsViewerTune);
		} 
	};
	
	$scope.toggleTuneSetAbc = function() { 
		$scope.tuneSetAbcIncl = !$scope.tuneSetAbcIncl;
	
		if ($scope.showExport  == true) {
			$scope.exportTuneBook();
		}
	};
	
	$scope.togglePlayDateAbc = function() { 
		$scope.playDateAbcIncl = !$scope.playDateAbcIncl;
	
		if ($scope.showExport  == true) {
			$scope.exportTuneBook();
		}
	};
	
	$scope.toggleSkillAbc = function() { 
		$scope.skillAbcIncl = !$scope.skillAbcIncl;
	
		if ($scope.showExport  == true) {
			$scope.exportTuneBook();
		}
	};
	
	$scope.toggleColorAbc = function() { 
		$scope.colorAbcIncl = !$scope.colorAbcIncl;
	
		if ($scope.showExport  == true) {
			$scope.exportTuneBook();
		}
	};
	
	$scope.toggleAnnotationAbc = function() { 
		$scope.annotationAbcIncl = !$scope.annotationAbcIncl;
	
		if ($scope.showExport  == true) {
			$scope.exportTuneBook();
		}
	};
	
	$scope.toggleSiteAbc = function() { 
		$scope.siteAbcIncl = !$scope.siteAbcIncl;
	
		if ($scope.showExport  == true) {
			$scope.exportTuneBook();
		}
	};
	
	$scope.toggleTubeAbc = function() { 
		$scope.tubeAbcIncl = !$scope.tubeAbcIncl;
	
		if ($scope.showExport  == true) {
			$scope.exportTuneBook();
		}
	};
	
	
	
	function selectTuneSet(tuneSetPosition){
		// Setzen tune im Auswahl-Filter
		setSelectedTuneSetPositionFilter(tuneSetPosition);
		//Setzen tune für Filter
		$scope.tuneSetIdToFilter = tuneSetPosition.tuneSetId;
		
		setPages();
	}
	
	
	$scope.moveTune = function( tuneSetPosition ) {
		if ($scope.movedTuneSetPosition == tuneSetPosition) {
			$scope.movedTuneSetPosition = null;
		
		} else {
			//selectTuneSet(tuneSetPosition);
			
			// Only one TuneSet-View-Detail-Panel can be active -> Init
			initTuneSetViewDetailPanels();
			
			$scope.movedTuneSetPosition = tuneSetPosition;
		}
	};
	
	function setSelectedTuneSetPositionFilter(tuneSetPosition) {
		for (var i = 0; i < $scope.tuneSetPositionsForFilter.length; i++) {	
			if ($scope.tuneSetPositionsForFilter[i].tuneSetId == tuneSetPosition.tuneSetId  && $scope.tuneSetPositionsForFilter[i].intTuneId == tuneSetPosition.intTuneId){
				$scope.tuneSetPositionForFilter = $scope.tuneSetPositionsForFilter[i];
			}
		}
	}


	$scope.doneEditing = function( tuneSetPosition ) {
		$scope.editedTune = null;
		
		if ( !tuneSetPosition.tune.pure ) {
			$scope.removeTuneSetPosition(tuneSetPosition);
			
			$scope.tuneSetIdToFilter = 0;
		
		} else {
			// Sync Tune-Fields
			tuneSetPosition.tune.title = eTBk.TuneBook.getTuneTitle(tuneSetPosition.tune);
			tuneSetPosition.tune.type = eTBk.TuneBook.getTuneType(tuneSetPosition.tune);
			tuneSetPosition.tune.key = eTBk.TuneBook.getTuneKey(tuneSetPosition.tune);
			tuneSetPosition.tune.id = eTBk.TuneBook.getTuneId(tuneSetPosition.tune);
		}
		
		// Selectors pauschal setzen
		setSelectors();
			
		// Setzen tune im Auswahl-Filter
		setSelectedTuneSetPositionFilter(tuneSetPosition);

		// Put TuneBook to localStorage
		eTBk.TuneBook.storeAbc($scope.tuneBook);
	};
	
	$scope.doneMoving = function( tuneSetPosition, targetTuneSetPosition, beforeOrAfter ) {
		// Hinweis:	Der OrderBy-Filter auf position (siehe HTML) funktioniert natürlich nur,
		// 			wenn alle Positionen das gleiche Format haben (alles Strings oder alles Zahlen). 
		//			Beim Lesen aus der ABC-Datei sowie beim lesen aus LocalStorage ist dies der Fall (alles Strings). 
		//			Sobald aber mit position gerechnet wird, wird eine Zahl daraus, welche dann wieder 
		//			zu einem String konvertiert werden muss, damit die View (OrderBy) die geänderten 
		//			Positionen richtig sortieren kann.
	
		// View after moving
		$scope.movedTuneSetPosition = null;
		
		var twoSetsInvolved = false;
		
		if (tuneSetPosition.tuneSetId !== targetTuneSetPosition.tuneSetId){
			twoSetsInvolved = true;
		}
		
		var removedPosition = 0; 
		removedPosition = parseInt(tuneSetPosition.position);
		
		
		// Handle Sending TuneSet (only if sending tuneSet ist different from target tuneSet)
		if (twoSetsInvolved){
			for (var i = 0; i < $scope.tuneBook.tuneSets.length; i++) {
				if ($scope.tuneBook.tuneSets[i].tuneSetId == tuneSetPosition.tuneSetId){
					// Sending TuneSet
					
					// Remove TuneSetPosition from TuneSet
					for (var z = 0; z < $scope.tuneBook.tuneSets[i].tuneSetPositions.length; z++) {	
						if ($scope.tuneBook.tuneSets[i].tuneSetPositions[z].intTuneId == tuneSetPosition.intTuneId){
							// Moving TuneSetPosition
							
							// Delete TuneSetDirective from TuneSetPosition
							//eTBk.TuneBook.deleteTuneSetDirective(tuneSetPosition);
							// Delete TuneSetPosition from TuneSet
							$scope.tuneBook.tuneSets[i].tuneSetPositions.splice($scope.tuneBook.tuneSets[i].tuneSetPositions.indexOf(tuneSetPosition), 1);
						} 
					}
					
					if ($scope.tuneBook.tuneSets[i].tuneSetPositions.length == 0) {
						// Empty TuneSet
						// Remove TuneSet from the List
						$scope.tuneBook.tuneSets.splice(i,1);
					
					} else {
						// TuneSet still has TuneSetPositions
						// Adjust Positions of remaining TuneSetPositions: Only necessary for tunes that come after the removed tune
						var currentPosition = 0;		
						
						for (var y = 0; y < $scope.tuneBook.tuneSets[i].tuneSetPositions.length; y++) {	
							currentPosition = parseInt($scope.tuneBook.tuneSets[i].tuneSetPositions[y].position);
							
							if (currentPosition > removedPosition) {
								currentPosition--;
								// Change Position on TuneSetPosition
								$scope.tuneBook.tuneSets[i].tuneSetPositions[y].position = currentPosition.toString();
								// Change Position on TuneSetDirective
								//eTBk.TuneBook.changePositionOnTuneSetDirective($scope.tuneBook.tuneSets[i].tuneSetPositions[y]);
							}
						}
					}
				} 	
			}
		}

		// Handle Target TuneSet
		for (var i = 0; i < $scope.tuneBook.tuneSets.length; i++) {
			if ($scope.tuneBook.tuneSets[i].tuneSetId == targetTuneSetPosition.tuneSetId) {
				var newPosition = 0;
				newPosition = parseInt(targetTuneSetPosition.position);
				
				if (beforeOrAfter == "after"){
					newPosition++;
				
				} else {
					newPosition--;
					
					if (newPosition < 1) {
						newPosition = 1;
					}
				}
				
				// Set new TuneSetId and Position on TuneSetPosition
				tuneSetPosition.tuneSetId = targetTuneSetPosition.tuneSetId;
				tuneSetPosition.position = newPosition.toString();
				
				// Add TuneSetPosition to TuneSet (only if sending tuneSet ist different from target tuneSet)
				if (twoSetsInvolved) {
					// At index (newPosition--) insert the moving TuneSetPosition, but don't remove other TuneSetPositions
					var insertAt = newPosition - 1;
					$scope.tuneBook.tuneSets[i].tuneSetPositions.splice(insertAt,0,tuneSetPosition);
					// Add new TuneSetDirective
					//eTBk.TuneBook.addNewTuneSetDirective(tuneSetPosition);
				
				} else {
					// Change Position on TuneSetDirective
					//eTBk.TuneBook.changePositionOnTuneSetDirective(tuneSetPosition);
				}
				
				// Change Position of other TuneSetPositions in the Set: Only necessary for tunes that come after the inserted tune
				// TODO: Beachte aber Spezialfall: Nach hinten schieben im gleichen Set! Hier muss so was wie ein Delete simuliert werden (position runterzählen)
				// (ist aber nicht trivial). Die jetzige Version sortiert in einem solchen Fall die View zwar richtig, es gehen aber positions verloren.
				// Bsp: move position 2 after position 3 in the same tuneSet: before: 1,2,3,4, after: 1,3,4,5 -> position 2 ist verloren gegangen.
				for (var y = 0; y < $scope.tuneBook.tuneSets[i].tuneSetPositions.length; y++) {	
	
					var currentPosition = 0;		
					
					if ($scope.tuneBook.tuneSets[i].tuneSetPositions[y].intTuneId == tuneSetPosition.intTuneId){
						// Moving TuneSetPosition: Already Done	
					
					} else {
						// TuneSetPositions that where here before
						currentPosition = parseInt($scope.tuneBook.tuneSets[i].tuneSetPositions[y].position);
						//var positionStored = currentPosition;
						
						/*
						if (!twoSetsInvolved && currentPosition > removedPosition) {
							currentPosition--;
						}
						*/
						
						if (currentPosition >= newPosition) {
							currentPosition++;
							// Change Position on TuneSetPosition
							$scope.tuneBook.tuneSets[i].tuneSetPositions[y].position = currentPosition.toString();
							// Change Position on TuneSetDirective
							//eTBk.TuneBook.changePositionOnTuneSetDirective($scope.tuneBook.tuneSets[i].tuneSetPositions[y]);
						}
						
						/*
						if (currentPosition < 1) {
							currentPosition = 1;
						}
						*/
						
						/*
						if (currentPosition !== positionStored) {
							// Change Position on TuneSetPosition
							$scope.tuneBook.tuneSets[i].tuneSetPositions[y].position = currentPosition.toString();
							// Change Position on TuneSetDirective
							eTBk.TuneBook.changePositionOnTuneSetDirective($scope.tuneBook.tuneSets[i].tuneSetPositions[y]);
						}
						*/
					}
				}
			}	
		}
		
		eTBk.TuneBook.storeAbc($scope.tuneBook);	
	};
	
	$scope.putTuneBookToLocalStorage = function() {
		//tbkStorage.putToLocalStorage($scope.tuneBook);
		eTBk.TuneBook.storeAbc($scope.tuneBook);
	};
	
	$scope.saveColorDirective = function(tuneSetPosition) {
		// tune.pure remains pure in tuneSet-View. color-directive is added to the Abc-Code of the tune only during Abc-Export.
		//eTBk.TuneBook.saveColorDirective(tuneSetPosition);
	};
  
	$scope.removeTuneSetPosition = function( tuneSetPosition ) {
		for (var i = 0; i < $scope.tuneBook.tuneSets.length; i++) {	
			
			if ($scope.tuneBook.tuneSets[i].tuneSetId == tuneSetPosition.tuneSetId){
				// TuneSetPosition aus TuneSet rauslöschen
				$scope.tuneBook.tuneSets[i].tuneSetPositions.splice($scope.tuneBook.tuneSets[i].tuneSetPositions.indexOf(tuneSetPosition), 1);
			
				if ($scope.tuneBook.tuneSets[i].tuneSetPositions.length == 0) {
					// TuneSet löschen, wenn keine TuneSetPosition mehr dranhängt
					$scope.tuneBook.tuneSets.splice(i,1);
				}
			}
		}
	};
  
	$scope.importTuneBook = function(abc, fileName) {
		show("loading");
		
		$timeout(function(){
			try {
				$scope.tuneBook = tbkStorage.getFromImportedFile(abc, fileName);
				eTBk.TuneBook.storeAbc($scope.tuneBook);			
			} catch(e) {
				alert("eTuneBook cannot import " + fileName + " due to: " + e.toString());		
			} finally {
				initView("tuneSets");
				$scope.$apply();
			}
		},1000);
	};
	
	$scope.exportTuneBook = function() {
		var tuneSets = new Array();
		
		// Umfang des Exports bestimmen
		if ($scope.tuneSetsFiltered && $scope.tuneSetsFiltered.length > 0) {
			// Subset of the TuneBook
			tuneSets = $scope.tuneSetsFiltered;
		} else if ($scope.tuneBook.tuneSets) {
			// TuneBook
			tuneSets = $scope.tuneBook.tuneSets;	
		}
		
		// Exportieren
		$scope.exportedTuneBook = eTBk.TuneBook.getAbc(tuneSets, $scope.tuneBook.name, $scope.tuneSetAbcIncl, $scope.playDateAbcIncl, $scope.skillAbcIncl, $scope.colorAbcIncl, $scope.annotationAbcIncl, $scope.siteAbcIncl, $scope.tubeAbcIncl, $scope.fingeringAbcIncl);
		show("export");
	};
	
	function setTuneSetTypesForFilter(){
		//Extract TuneSetTypes for TypeFilter
		var tuneSetTypeForFilter = new Array();
		var tuneSetTypesForFilter = new Array();
		var addToTypeFilter = true;
		var tuneSetCount = 0;
		var tuneCount = 0;
		var tuneCountInTheSet = 0;
		
		if ($scope.hasOwnProperty("tuneBook")) {
			for (var i = 0; i < $scope.tuneBook.tuneSets.length; i++) {	
				addToTypeFilter = true;
				tuneCountInTheSet = 0;
				tuneSetCount = tuneSetCount + 1;
				tuneCountInTheSet  = $scope.tuneBook.tuneSets[i].tuneSetPositions.length;
				tuneCount = tuneCount + tuneCountInTheSet;
				
				for (var z = 0; z < tuneSetTypesForFilter.length; z++) {	
					if (tuneSetTypesForFilter[z].type == $scope.tuneBook.tuneSets[i].type) {
						addToTypeFilter = false;
						tuneSetTypesForFilter[z].setCount = tuneSetTypesForFilter[z].setCount + 1;
						tuneSetTypesForFilter[z].tuneCount = tuneSetTypesForFilter[z].tuneCount + tuneCountInTheSet;	
					}
				}
				if (addToTypeFilter) {
					tuneSetTypeForFilter = new Array();
					tuneSetTypeForFilter.type = $scope.tuneBook.tuneSets[i].type;
					tuneSetTypeForFilter.setCount = 1;
					tuneSetTypeForFilter.tuneCount = tuneCountInTheSet;
					tuneSetTypesForFilter.push(tuneSetTypeForFilter);
				}
			}
		}
		
		tuneSetTypeForFilter = new Array();
		tuneSetTypeForFilter.type = "All Types";
		tuneSetTypeForFilter.setCount = tuneSetCount;
		tuneSetTypeForFilter.tuneCount = tuneCount;
		tuneSetTypesForFilter.unshift(tuneSetTypeForFilter);
				
		$scope.tuneSetTypesForFilter = tuneSetTypesForFilter;
		$scope.tuneSetTypeForFilter = $scope.tuneSetTypesForFilter[0];	//Set "All Types" as default
	}
	
	function setTuneSetKeysForFilter(){
		//Extract TuneSetKeys for KeyFilter
		var tuneSetKeyForFilter = new Array();
		var tuneSetKeysForFilter = new Array();
		var tuneSetKeysCounted = new Array();
		var addToTuneSetCount = true;
		var addToKeyFilter = true;
		var tuneSetCount = 0;
		var tuneCount = 0;
		
		if ($scope.hasOwnProperty("tuneBook")) {
			for (var i = 0; i < $scope.tuneBook.tuneSets.length; i++) {
				tuneSetKeysCounted = new Array();
				
				for (var c = 0; c < $scope.tuneBook.tuneSets[i].tuneSetPositions.length; c++) {
					addToKeyFilter = true;
				
					for (var z = 0; z < tuneSetKeysForFilter.length; z++) {	
						if (tuneSetKeysForFilter[z].key == $scope.tuneBook.tuneSets[i].tuneSetPositions[c].tune.key) {
							addToKeyFilter = false;
							
							tuneSetKeysForFilter[z].tuneCount = tuneSetKeysForFilter[z].tuneCount + 1;
							tuneCount = tuneCount + 1;
							addToTuneSetCount = true;
							
							for (var y = 0; y < tuneSetKeysCounted.length; y++) {
								if (tuneSetKeysCounted[y] == $scope.tuneBook.tuneSets[i].tuneSetPositions[c].tune.key) {
									addToTuneSetCount = false;		
								}
							}
							
							if (addToTuneSetCount) {
								// Pro Key ein Set nur einmal zählen
								tuneSetKeysForFilter[z].setCount = tuneSetKeysForFilter[z].setCount + 1;
								tuneSetCount = tuneSetCount + 1;
								tuneSetKeysCounted.push($scope.tuneBook.tuneSets[i].tuneSetPositions[c].tune.key);
							}
						}
					}
					
					if (addToKeyFilter) {
						tuneSetKeyForFilter = new Array();
						tuneSetKeyForFilter.key = $scope.tuneBook.tuneSets[i].tuneSetPositions[c].tune.key;
						tuneSetKeyForFilter.sort = tuneSetKeyForFilter.key;
						tuneSetKeyForFilter.setCount = 1;
						tuneSetKeyForFilter.tuneCount = 1;
						tuneCount = tuneCount + 1;
						tuneSetCount = tuneSetCount + 1;
						tuneSetKeysCounted.push($scope.tuneBook.tuneSets[i].tuneSetPositions[c].tune.key);
						tuneSetKeysForFilter.push(tuneSetKeyForFilter);
					}		
				}
			}
		}
		
		tuneSetKeyForFilter = new Array();
		tuneSetKeyForFilter.key = "All Keys";
		tuneSetKeyForFilter.sort = "";  // Sort, damit zum Beispiel "Ador" nicht vor "All Keys" kommt
		tuneSetKeyForFilter.setCount = tuneSetCount;
		tuneSetKeyForFilter.tuneCount = tuneCount;
		tuneSetKeysForFilter.unshift(tuneSetKeyForFilter);
		$scope.tuneSetKeysForFilter = tuneSetKeysForFilter;
		$scope.tuneSetKeyForFilter = $scope.tuneSetKeysForFilter[0];	//Set "All Keys" as default
	}
	
	function setTuneSetColorsForFilter(){
		//Extract TuneSetColors for ColorFilter
		var tuneSetColorForFilter = new Array();
		var tuneSetColorsForFilter = new Array();
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
						tuneSetColorForFilter = new Array();
						tuneSetColorForFilter.color = $scope.tuneBook.tuneSets[i].tuneSetPositions[c].tune.color;
						tuneSetColorForFilter.text = "     "; 
						tuneSetColorsForFilter.push(tuneSetColorForFilter);
					}		
				}
			}
		}
		
		tuneSetColorForFilter = new Array();
		tuneSetColorForFilter.color = "All Colors";
		tuneSetColorForFilter.text = "     "; 
		tuneSetColorsForFilter.unshift(tuneSetColorForFilter);
				
		$scope.tuneSetColorsForFilter = tuneSetColorsForFilter;
		$scope.tuneSetColorForFilter = $scope.tuneSetColorsForFilter[0];	//Set "All Colors" as default
	}
	
	function setSkillFilter(){
		// Put Skill-Definitions to the SkillFilter
		var skillType = new Array();
		var skillTypes = new Array();
		
		for (var i = 1; i < 7; i++) {
			skillType = new Array();
			skillType.skill = i;
			if (skillType.skill == 1) {
				skillType.description = "*";
			} else if (skillType.skill == 2) {
				skillType.description = "* *";	
			} else if (skillType.skill == 3) {
				skillType.description = "* * *";
			} else if (skillType.skill == 4) {
				skillType.description = "* * * *";
			} else if (skillType.skill == 5) {
				skillType.description = "* * * * *";
			} else if (skillType.skill == 6) {
				skillType.description = "* * * * * *";
			}
			skillTypes.push(skillType);	
		}
		
		skillType = new Array();
		skillType.skill = 0;
		skillType.description = "All Skills";
		skillTypes.unshift(skillType);
		
		$scope.skillTypes = skillTypes;
	}
	
	function setFilterOptions(){
		setTuneSetTypesForFilter();
		setTuneSetKeysForFilter();
		setTuneSetColorsForFilter();
		setSkillFilter();	//Todo: skillFilterOptions only when page loads (never changes)
		setTuneSetPositionsForFilter();
		
		setPages();
	}
	
	$scope.refreshColorFilter = function( ) {
		setTuneSetColorsForFilter();
	}
	
	function setTargetTuneSetPositionsForMoving(){
		var targetTuneSetPositionsForMoving = new Array();
		var tuneSets = new Array();
		
		if ($scope.hasOwnProperty("tuneBook")) {
			tuneSets = $scope.tuneBook.tuneSets;
			
			// targetTuneSetPositionsForMoving aufbereiten
			for (var i = 0; i < tuneSets.length; i++) {	
				for (var z = 0; z < tuneSets[i].tuneSetPositions.length; z++) {	
					targetTuneSetPositionsForMoving.push(tuneSets[i].tuneSetPositions[z]);
				}
			}
		}
		
		$scope.targetTuneSetPositionsForMoving = targetTuneSetPositionsForMoving;
	}
	
	function setTuneSetPositionsForFilter(){
		var tuneSetPositionsForFilter = new Array();
		var tuneSetPositionForFilter = new Array();
		var titleSplits = new Array();
		
		// tuneSetPositionsForFilter aufbereiten		
		if ($scope.hasOwnProperty("tuneBook")) {
			for (var i = 0; i < $scope.tuneBook.tuneSets.length; i++) {	
			
				for (var z = 0; z < $scope.tuneBook.tuneSets[i].tuneSetPositions.length; z++) {	
					tuneSetPositionForFilter = new Array();
					tuneSetPositionForFilter.tuneSetId = $scope.tuneBook.tuneSets[i].tuneSetPositions[z].tuneSetId;
					tuneSetPositionForFilter.tuneType = $scope.tuneBook.tuneSets[i].tuneSetPositions[z].tune.type;
					tuneSetPositionForFilter.intTuneId = $scope.tuneBook.tuneSets[i].tuneSetPositions[z].intTuneId;
					
					titleSplits = new Array();
					titleSplits = $scope.tuneBook.tuneSets[i].tuneSetPositions[z].tune.title.split(",");
					tuneSetPositionForFilter.tuneTitle = titleSplits[0];
				
					tuneSetPositionsForFilter.push(tuneSetPositionForFilter);
				}
			}
		}
		
		// Sort by tuneTitle
		tuneSetPositionsForFilter.sort(function(a, b){
			return a.tuneTitle-b.tuneTitle;
		});
		
		tuneSetPositionForFilter = new Array();
		tuneSetPositionForFilter.tuneSetId = 0;
		tuneSetPositionForFilter.intTuneId = 0;
		tuneSetPositionForFilter.tuneTitle = "All Tunes";	
		tuneSetPositionsForFilter.unshift(tuneSetPositionForFilter);
		
		$scope.tuneSetPositionsForFilter = tuneSetPositionsForFilter;
		$scope.tuneSetPositionForFilter = $scope.tuneSetPositionsForFilter[0];	//Set "All Tunes" as default
	}
	
	$scope.toggleYouTubeVideo = function(tuneSetPosition, youTubeUrl) {
		if ($scope.youTubeTune == tuneSetPosition.tune && $scope.youTubeUrl == youTubeUrl) {
			$scope.youTubeUrl = null;
			$scope.youTubeTune = null;
		
		} else {
			selectTuneSet(tuneSetPosition);
			
			// Only one TuneSet-View-Detail-Panel can be active -> Init
			initTuneSetViewDetailPanels();
			
			$scope.youTubeUrl = youTubeUrl;
			$scope.youTubeTune = tuneSetPosition.tune;
		}
	};
		
	$scope.justPlayedTheTune = function( tuneSetPosition) {
		var now = new Date();
		eTBk.TuneBook.addPlayDate(tuneSetPosition, now);
			
		// Identify tuneSet in order to set the the new Date and calculate frequencyPlayed
		for (var i = 0; i < $scope.tuneBook.tuneSets.length; i++) {	
			
			if ($scope.tuneBook.tuneSets[i].tuneSetId == tuneSetPosition.tuneSetId){
				$scope.tuneBook.tuneSets[i].lastPlayed = tuneSetPosition.tune.lastPlayed;
				eTBk.TuneBook.setFrequencyPlayed($scope.tuneBook.tuneSets[i]);
			}
		}
		
		//tbkStorage.putToLocalStorage($scope.tuneBook);
		eTBk.TuneBook.storeAbc($scope.tuneBook);
	};
	
	$scope.changePositionOnTuneSetDirective = function( tuneSetPosition) {
		eTBk.TuneBook.changePositionOnTuneSetDirective( tuneSetPosition);
	};
	
	$scope.addNewTuneSetDirective = function( tuneSetPosition) {
		eTBk.TuneBook.addNewTuneSetDirective( tuneSetPosition);
	};
	
	$scope.deleteTuneSetDirective = function( tuneSetPosition) {
		eTBk.TuneBook.deleteTuneSetDirective( tuneSetPosition);
	};
	
	$scope.decreaseSkill = function( tuneSetPosition) {
		if (!tuneSetPosition.tune.skill){
			tuneSetPosition.tune.skill = 1;
		
		} else if (tuneSetPosition.tune.skill < 1){
			tuneSetPosition.tune.skill = 1;
		
		} else if (tuneSetPosition.tune.skill == 1){
		
		} else if (tuneSetPosition.tune.skill > 6) {
			tuneSetPosition.tune.skill = 6;
		
		} else {
			tuneSetPosition.tune.skill = tuneSetPosition.tune.skill - 1;
		}
		// tune.pure remains pure in tuneSet-View. skill-directive is added to the Abc-Code of the tune only during Abc-Export.
		//eTBk.TuneBook.saveSkillDirective(tuneSetPosition);
		//tbkStorage.putToLocalStorage($scope.tuneBook);
		eTBk.TuneBook.storeAbc($scope.tuneBook);
	};
	
	$scope.increaseSkill = function( tuneSetPosition) {
		if (!tuneSetPosition.tune.skill){
			tuneSetPosition.tune.skill = 1;
		
		} else if (tuneSetPosition.tune.skill < 1){
			tuneSetPosition.tune.skill = 1;
	
		} else if (tuneSetPosition.tune.skill >= 6) {
			tuneSetPosition.tune.skill = 6;
		
		} else {
			tuneSetPosition.tune.skill = tuneSetPosition.tune.skill + 1;
		}
		// tune.pure remains pure in tuneSet-View. skill-directive is added to the Abc-Code of the tune only during Abc-Export.
		//eTBk.TuneBook.saveSkillDirective(tuneSetPosition);
		//tbkStorage.putToLocalStorage($scope.tuneBook);
		eTBk.TuneBook.storeAbc($scope.tuneBook);
	};
});
