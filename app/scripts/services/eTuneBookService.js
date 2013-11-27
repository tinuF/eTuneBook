'use strict';

/**
 * Returns eTuneBookService (=window.eTBk) which holds the current TuneBook and the eTuneBook Business Logic
 * TODO: Only Reason, why eTBk is currently stored as a global variable on window: Directives need to have access to eTBk Constants.
 */
angular.module('eTuneBookApp').factory( 'eTuneBookService', function() {
    //eTBk-Module

    // eTuneBook Model					abc								description
    // tuneBook
    //		name						%%etbk:bname					Book-Name (if directive is empty, name is taken from File-Name on load from local File System), set 'New TuneBook' when new
    //		version						%%etbk:bvers					Book-Version
    //		description					%%etbk:bdesc					Book-Description
    //		header						-								ABCJS.TuneBook.header
    //		tuneSets
    //			tuneSetId				see %%etbk:tnset
    //			tuneSetTarget			see %%etbk:tnset
    //			tuneSetEnv				see %%etbk:tnset
    //			tuneSetName				see %%etbk:tnset
    //			tuneSetPositions
    //				intTuneId 			-								todo: Remove.
    //				tune				-								ABCJS.TuneBook.tunes.tune[i]
    //				    intTuneId 		-								internal key managed by TuneBookEditor (tuneId in abc can be screwed up by the user)
    //					pure			'from X: to next X:'			ABCJS.TuneBook.tunes.tune[i].pure
    //																	extracts from pure (for the view):
    //					id				X:
    //					title			T:
    //					type			R:
    //					key				K:
    //																	eTuneBook-specific fields:
    //					videos	    	%%etbk:video					src:<source>,cde:<code>,desc:<description>
    //                     source
    //                     code
    //                     description
    //					wsites	    	%%etbk:wsite					url:<url>
    //					annotation		%%etbk:annot					comment
    //					color			%%etbk:color					hex-color of the tune
    //					skill			%%etbk:skill					for filtering, 1= hardly know the tunes --- 6 = absolute Master
    //					lastModified	H: (Modified)					last modification date (Javascript Date Object)
    //					lastPlayed		-								last played date (Javascript Date Object) of playDates
    //			        frequencyPlayed	-								Score calculated on the basis of playDates
    //					playDates		%%etbk:pldat					<YYYY-MM-DDTHH:mm>,<YYYY-MM-DDTHH:mm>,<YYYY-MM-DDTHH:mm>....
    //						playDate
    //									%%etbk:tnset					id:<tuneSetId>,pos:<position>,rep:<repeat>,ant:<annotation>,targ:<tuneSetTarget>,env:<tuneSetEnv>, name:<tuneSetName>
    //				tuneSetId											key of tuneSet
    //				position 											position within the tuneSet. (index + 1)
    //				repeat 												repetition within the tuneSet. (default: 3)
    //              annotation                                          optional comment
    //																	tuneSet-Fields defined by first tuneSetPosition (pos:1)
    //				tuneSetTarget										'Set-Dance', 'Ceili', 'Session', 'Concert', ...
    //				tuneSetEnv											'Toe for Toe', 'Steffisburg', ...
    //				tuneSetName											default: Name of first tune. Aim: Set-Dance-Name 'Clare Lancers Set', ...

	// Immediately invoked function expression in order to build the eTBk module
    // Inspired by: http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
    //noinspection JSUnusedLocalSymbols
    var eTBkModule = (function(eTBk) {
        //Private Variables
        var eTBK_STORAGE_ID_TUNEBOOK = 'etbk-tuneBook';
        var eTBK_STORAGE_ID_SETTINGS = 'etbk-settings';
        var eTBK_VERSION = '1.1.8';
        var ABC_VERSION = '2.1';
        //var eTBK_DEFAULT_COLOR = "#E0F0F0";
        var eTBK_DEFAULT_COLOR = "#F5F5F5";
        var eTBK_DEFAULT_MODIFICATIONDATE_STRING = "1966-04-05T22:00";
        var eTBK_PATTERN_FINGER = /!\d!/g;		//matches !<number>! globally (every occurence)
        var eTBk_EXAMPLE_FILENAME = 'Irish Tunes - Martin Fleischmann.abc';
        var eTBk_EXAMPLE_FILENAME_WITHOUTABC = 'Irish Tunes - Martin Fleischmann';
        var eTBk_EXAMPLE_VERSION = '2013-11-26';
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
            This.name = getAbcValue(This.header, "%%etbk:bname ", "");

            // TuneBook-Version aus Header lesen
            This.version = getAbcValue(This.header, "%%etbk:bvers ", "");

            // TuneBook-Beschreibung aus Header lesen
            This.description = getAbcValue(This.header, "%%etbk:bdesc ", "");

            This.tuneSets = extractTuneSets(book);
        };

        function extractTuneSets(book){
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
				tuneSetDirectives = getAbcValues(tune.pure, "%%etbk:tnset ");
				
				if (tuneSetDirectives.length > 0){
					// Tune that was exported from eTuneBook
					// The tune can have one or more tuneSetDirective
					extractEtbkFields(tune);
                    tune.intTuneId = intTuneId;     //Ab RE 1.0.8: intTuneId auf tune
					
					for (var y = 0; y < tuneSetDirectives.length; y++) {
						// Get tuneSetId, position, repeat
						var tuneSetId = getTuneSetId(tuneSetDirectives[y]);
						var position = getTuneSetTunePosition(tuneSetDirectives[y]);	
						var repeat = getTuneSetTuneRepeat(tuneSetDirectives[y]);
                        var annotation = getTuneSetTuneAnnotation(tuneSetDirectives[y]);
						
						var tuneSetTarget = "";
						var tuneSetEnv = "";
						var tuneSetName = "";
						
						if (position == "1") {
							tuneSetTarget = getTuneSetTarget(tuneSetDirectives[y]);
							tuneSetEnv = getTuneSetEnvironment(tuneSetDirectives[y]);
							tuneSetName = getTuneSetName(tuneSetDirectives[y]);
						}
						
						// Generate tuneSetPosition
						var tuneSetPosition = []; 
						tuneSetPosition = newTuneSetPosition(tuneSetId, tuneSetTarget, tuneSetEnv, tuneSetName, intTuneId, tune, position, repeat, annotation);
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
			allTuneSetPositions.sort(function(a, b){
				return a.tuneSetId-b.tuneSetId
			});
			
			// Generate TuneSets from Tunes with TuneSetDirectives
			var wTuneSetId = 0;
			for (var i = 0; i < allTuneSetPositions.length; i++) {	
				
				if (wTuneSetId !== allTuneSetPositions[i].tuneSetId){
					// First TuneSetPosition of new tuneSetId
					wTuneSetId = allTuneSetPositions[i].tuneSetId;
					
					var tuneSet = [];
					var tuneSetTarget = "";
					var tuneSetEnv = "";
					var tuneSetName = "";
					var tuneSetType = "";
					var tuneSetLastPlayed = "";
					var tuneSetLastModified = "";
					var frequencyPlayed = 0;
					var tuneSetPositions = [];
					
					// Get all tuneSetPositions for wTuneSetId
					for (var z = 0; z < allTuneSetPositions.length; z++) {	
						var tuneSetPosition = allTuneSetPositions[z];
				
						if (wTuneSetId == tuneSetPosition.tuneSetId){
							tuneSetPositions.push(tuneSetPosition);
							
							if (tuneSetType == ""){
								tuneSetType = tuneSetPosition.tune.type;
								
							} else if (tuneSetType !== "mixed" && tuneSetType !== tuneSetPosition.tune.type){
								tuneSetType = "mixed";
							}
							
							if (tuneSetLastPlayed == "" || tuneSetPosition.tune.lastPlayed > tuneSetLastPlayed){
								tuneSetLastPlayed = tuneSetPosition.tune.lastPlayed;
							}
							
							if (tuneSetLastModified == "" || tuneSetPosition.tune.lastModified > tuneSetLastModified){
								tuneSetLastModified = tuneSetPosition.tune.lastModified;
							}
							
							if (tuneSetPosition.tuneSetTarget != ""  && tuneSetPosition.tuneSetTarget != "undefined"){
								tuneSetTarget = tuneSetPosition.tuneSetTarget;
							}
							
							if (tuneSetPosition.tuneSetEnv != "" && tuneSetPosition.tuneSetEnv != "undefined"){
								tuneSetEnv = tuneSetPosition.tuneSetEnv;
							}
							
							if (tuneSetPosition.tuneSetName != "" && tuneSetPosition.tuneSetName != "undefined"){
								tuneSetName = tuneSetPosition.tuneSetName;
							}
                            tuneSetPosition.tune.frequencyPlayed = calculateFrequencyPlayed(tuneSetPosition.tune.playDates);
							frequencyPlayed = frequencyPlayed + tuneSetPosition.tune.frequencyPlayed;
							
						}
					}
					
					// Frequency Played: Durchschnitt pro Tune
					if (tuneSetPositions.length > 1) {
						frequencyPlayed = Math.round(frequencyPlayed / tuneSetPositions.length); 
					} 
					
					tuneSet = newTuneSet(wTuneSetId, tuneSetTarget, tuneSetEnv, tuneSetName, tuneSetLastPlayed, tuneSetLastModified, frequencyPlayed, tuneSetType, tuneSetPositions);
					tuneSets.push(tuneSet);
				}
			}

			// Generate TuneSets from tunesWithoutTuneSetDirective
			// Get next free TuneSetId
			wTuneSetId++;

			for (var i = 0; i < tunesWithoutTuneSetDirective.length; i++) {		
				var tuneSet = [];
				var tuneSetType = "";
				var frequencyPlayed = 0;
				var tuneSetPositions = [];
				var tuneSetPosition = [];
				var tune = tunesWithoutTuneSetDirective[i];
				
				
				extractEtbkFields(tune);
				//setTuneSetDirective(tune, wTuneSetId, 1, 3);				
					
				tuneSetPosition = newTuneSetPosition(wTuneSetId, "", "", "", intTuneId, tune, 1, "3x");	
				tuneSetPositions.push(tuneSetPosition);
				tuneSet = newTuneSet(wTuneSetId, "", "", "", tune.lastPlayed, tune.lastModified, frequencyPlayed, tune.type, tuneSetPositions);
				tuneSets.push(tuneSet);
				intTuneId++;
				wTuneSetId++;
			}
			
			return tuneSets;
			
		}
		
		function extractEtbkFields(tune){
			//Extract eTuneBook-specific fields and purify Abc
			var tuneSplits = tune.pure.split("\n");
			tune.pure = "";
			var newAbc = "";
			var isStandardAbc = true;
			var beginOfLine = "";
			
			tune.type = "undefined";
			tune.key = "undefined";
            tune.videos = [];
            tune.wsites = [];
			tune.annotation = "";
			tune.color = eTBK_DEFAULT_COLOR;
			tune.skill = "?";
			tune.playDates = [];
			//tune.lastModified = moment(eTBK_DEFAULT_MODIFICATIONDATE_STRING, "YYYY-MM-DDTHH:mm").toDate();
            tune.lastModified = null;
			
			for (var i = 0; i < tuneSplits.length; i++) {		
				beginOfLine = "";
				isStandardAbc = true;
				
				// Abc-Standard
				beginOfLine = tuneSplits[i].substring(0,2);
				
				if  (beginOfLine.length > 1){
					if (beginOfLine == "R:"){
						tune.type = getAbcValueOfTuneLine(tuneSplits[i], "R:", "undefined").toLowerCase();
					} else if (beginOfLine == "K:"){
						tune.key = getAbcValueOfTuneLine(tuneSplits[i], "K:", "undefined");
					} else if (beginOfLine == "H:"){
						var tuneModificationString = getAbcValueOfTuneLine(tuneSplits[i], "Modified ", "undefined");
						if (tuneModificationString != "undefined"){
							tuneModificationString = tuneModificationString + "T22:00";
							tune.lastModified = moment(tuneModificationString, "YYYY-MM-DDTHH:mm").toDate();
						} 
					} 
				}
			
				// eTuneBook-specific
				beginOfLine = tuneSplits[i].substring(0,12);
				
				if  (beginOfLine.length > 1){
					if (beginOfLine == "%%etbk:tnset"){
						isStandardAbc = false;
					} else if (beginOfLine == "%%etbk:tube1"){
						//Old youTube directive. Deprecated.
                        //tune.youTube1 = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:tube1 ", "");
                        tune.videos.push(newVideo("ytube", getAbcValueOfTuneLine(tuneSplits[i], "//www.youtube.com/embed/", ""),""));
                        isStandardAbc = false;
					} else if (beginOfLine == "%%etbk:tube2"){
                        //Old youTube directive. Deprecated.
						//tune.youTube2 = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:tube2 ", "");
                        tune.videos.push(newVideo("ytube", getAbcValueOfTuneLine(tuneSplits[i], "//www.youtube.com/embed/", ""),""));
						isStandardAbc = false;
					} else if (beginOfLine == "%%etbk:tube3"){
                        //Old youTube directive. Deprecated.
						//tune.youTube3 = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:tube3 ", "");
                        tune.videos.push(newVideo("ytube", getAbcValueOfTuneLine(tuneSplits[i], "//www.youtube.com/embed/", ""),""));
						isStandardAbc = false;
					} else if (beginOfLine == "%%etbk:video"){
                        tune.videos.push(getVideoFromDirective(getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:video ", "")));
                        isStandardAbc = false;
                    } else if (beginOfLine == "%%etbk:site1"){
                        //Old site1 directive. Deprecated.
						//tune.site1 = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:site1 ", "");
                        tune.wsites.push(newWebsite(getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:site1 ", "")));
                        isStandardAbc = false;
					} else if (beginOfLine == "%%etbk:site2"){
                        //Old site2 directive. Deprecated.
						//tune.site2 = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:site2 ", "");
                        tune.wsites.push(newWebsite(getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:site2 ", "")));
                        isStandardAbc = false;
					} else if (beginOfLine == "%%etbk:site3"){
                        //Old site3 directive. Deprecated.
						//tune.site3 = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:site3 ", "");
                        tune.wsites.push(newWebsite(getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:site3 ", "")));
                        isStandardAbc = false;
					} else if (beginOfLine == "%%etbk:wsite"){
                        tune.wsites.push(newWebsite(getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:wsite ", "")));
                        isStandardAbc = false;
                    } else if (beginOfLine == "%%etbk:annot"){
						tune.annotation = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:annot ", "");
						isStandardAbc = false;
					} else if (beginOfLine == "%%etbk:color"){
						tune.color = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:color ", eTBK_DEFAULT_COLOR);
						isStandardAbc = false;
					} else if (beginOfLine == "%%etbk:skill"){
						tune.skill = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:skill ", "");
						isStandardAbc = false;
					} else if (beginOfLine == "%%etbk:pldat"){
						var playDatesString = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:pldat ", "");
						tune.playDates = getPlayDates(playDatesString);
						isStandardAbc = false;
					}  
				}
				
				if (isStandardAbc) {
					newAbc = newAbc + tuneSplits[i];
					newAbc = newAbc + "\n";
				}
			}
			
			// Purified Abc setzen
			tune.pure = newAbc;

			// LastPlayed setzen auf Tune (f�r View)
			tune.lastPlayed = getTuneLastPlayed(tune.playDates);
			
		}
		
		function initializeTuneViewFields(tune){
			tune.type = "";
			tune.key = "";
            tune.videos = [];
            tune.wsites = [];
            tune.annotation = "";
			tune.color = eTBK_DEFAULT_COLOR;
			tune.skill = "";
			tune.playDates = [];
			tune.lastPlayed = getTuneLastPlayed(tune.playDates);
			tune.lastModified = moment(eTBK_DEFAULT_MODIFICATIONDATE_STRING, "YYYY-MM-DDTHH:mm").toDate();
		}
		
		function calculateFrequencyPlayed(playDates){
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

			if (frequencyPlayed < 0){
				frequencyPlayed = 0;
			}
			
			return frequencyPlayed;
		}
		
		function newTuneSetPosition(iTuneSetId, iTuneSetTarget, iTuneSetEnv, iTuneSetName, iIntTuneId, iTune, iPosition, iRepeat, iAnnotation){
			return {	tuneSetId: iTuneSetId, 
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
		
		function newTuneSet(iTuneSetId, iTuneSetTarget, iTuneSetEnv, iTuneSetName, iLastPlayed, iLastModified, ifrequencyPlayed, iType, iTuneSetPositions){
			return {	tuneSetId: iTuneSetId, 
						tuneSetTarget: iTuneSetTarget, 
						tuneSetEnv: iTuneSetEnv, 
						tuneSetName: iTuneSetName,
						lastPlayed: iLastPlayed, 
						lastModified: iLastModified, 
						frequencyPlayed: ifrequencyPlayed, 
						type: iType, 
						sort: 0, 
						tuneSetPositions: iTuneSetPositions};
		}

        function newVideo(iSource, iCode, iDescription){
            return {
                source: iSource,
                code: iCode,
                description: iDescription
            };
        }

        function newWebsite(iURL){
            return {
                url: iURL
            };
        }

        function newPlayDate(iDate){
            return {
                playDate: iDate
            };
        }


        function deleteTuneSetPosition(currentTuneBook, tuneSetId, position){
            // Deleting a TuneSetPosition: The Tune can end up set-less -> in this case a new set is generated.
            var tuneSet = getTuneSetById(currentTuneBook, tuneSetId);
            var tuneSetPosition = null;
            var tuneSetDeleted = false;

            var removedPosition = 0;
            removedPosition = parseInt(position);

            for (var z = 0; z < tuneSet.tuneSetPositions.length; z++) {
                if (tuneSet.tuneSetPositions[z].position == position){
                    tuneSetPosition = tuneSet.tuneSetPositions[z];
                    // Delete TuneSetPosition from TuneSet
                    tuneSet.tuneSetPositions.splice(z, 1);
                }
            }

            if(getTuneSetsByIntTuneId(currentTuneBook, tuneSetPosition.tune.intTuneId).length == 0){
                //A Tune always has to be within a set. Since the last TuneSetPosition was deleted,
                //a new Set has to be created
                initializeTuneSet(currentTuneBook.tuneSets, tuneSetPosition.tune);
            }

            if (tuneSet.tuneSetPositions.length == 0) {
                // Empty TuneSet
                // Remove TuneSet from the List
                currentTuneBook.tuneSets.splice(currentTuneBook.tuneSets.indexOf(tuneSet), 1);
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

            return tuneSetDeleted;
        }


        function deleteTuneSetPositionsAndTune(tuneSet, intTuneId){
            var tuneSetPosition = null;
            var removedPosition = 0;

            for (var z = 0; z < tuneSet.tuneSetPositions.length; z++) {
                if (tuneSet.tuneSetPositions[z].tune.intTuneId == intTuneId){
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


        function moveTuneSetPosition(currentTuneBook, sourceTuneSetId, sourcePosition, targetTuneSetId, targetPosition, beforeOrAfter, moveOrCopy){
            // Moving or Copying a TuneSetPosition
            var sourceTuneSet = getTuneSetById(currentTuneBook, sourceTuneSetId);
            var sourceTuneSetPosition = null;
            var targetTuneSet = null;
            var tuneSetDeleted = false;
            var twoSetsInvolved = false;
            var removedPosition = parseInt(sourcePosition);

            if (targetTuneSetId == null || sourceTuneSetId !== targetTuneSetId){
                twoSetsInvolved = true;
            }

            for (var z = 0; z < sourceTuneSet.tuneSetPositions.length; z++) {
                if (sourceTuneSet.tuneSetPositions[z].position == sourcePosition){
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
            if (moveOrCopy == "move"){

                if (twoSetsInvolved) {
                    // Remove TuneSetPosition from Source TuneSet
                    for (var z = 0; z < sourceTuneSet.tuneSetPositions.length; z++) {
                        if (sourceTuneSet.tuneSetPositions[z].position == sourcePosition){
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

                if (beforeOrAfter == "after"){
                    newPosition++;
                }

                var targetTuneSetPosition = {};

                // Todo: Handle TuneSet-Fields on first TuneSetPosition
                if (moveOrCopy == "move"){
                    // Set new TuneSetId and Position on TuneSetPosition
                    // copy by reference
                    targetTuneSetPosition = sourceTuneSetPosition;
                    targetTuneSetPosition.tuneSetId = targetTuneSetId;
                    targetTuneSetPosition.position = newPosition.toString();

                } else if (moveOrCopy == "copy"){
                    // Set new TuneSetId and Position on TuneSetPosition
                    // copy by value (primitive types), copy by reference (objects) -> tune is shared
                    targetTuneSetPosition = newTuneSetPosition(targetTuneSetId,
                        sourceTuneSetPosition.tuneSetTarget, sourceTuneSetPosition.tuneSetEnv,
                        sourceTuneSetPosition.tuneSetName,
                        sourceTuneSetPosition.intTuneId, sourceTuneSetPosition.tune,
                        newPosition.toString(), sourceTuneSetPosition.repeat,
                        sourceTuneSetPosition.annotation);
                }

                // Add TuneSetPosition to TuneSet (only if source tuneSet ist different from target tuneSet)
                if (twoSetsInvolved) {
                    // At index (newPosition--) insert the moving TuneSetPosition, but don't remove other TuneSetPositions
                    var insertAt = newPosition - 1;
                    targetTuneSet.tuneSetPositions.splice(insertAt,0,targetTuneSetPosition);
                }

                // Change Position of other TuneSetPositions in the Targe-Set:
                // Only necessary for tunes that come after the inserted tune
                for (var y = 0; y < targetTuneSet.tuneSetPositions.length; y++) {

                    var currentPosition = 0;

                    if (targetTuneSet.tuneSetPositions[y] == targetTuneSetPosition){
                        // TuneSetPosition which was moved: Already Done

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


        function getTuneSetId(tuneSetDirective){
			var tuneSetId = 0;
			var tuneSetIdSplits = [];
			tuneSetIdSplits = tuneSetDirective.split("id:");
			if  (tuneSetIdSplits.length > 1){
				tuneSetIdSplits = tuneSetIdSplits[1].split(",");
				tuneSetId = tuneSetIdSplits[0].replace(/^\s+|\s+$/g, '');
			}
			
			return parseInt(tuneSetId); 
		}

        function getSubDirective(directive, beginAfter, endBefore){
            var detail = "";
            var detailSplits = directive.split(beginAfter);

            if  (detailSplits.length > 1){
                detailSplits = detailSplits[1].split(endBefore);
                detail = detailSplits[0].replace(/^\s+|\s+$/g, '');
            }
            return detail;
        }

        function getVideoSource(videoDirective){
            return getSubDirective(videoDirective, "src:", ",");
        }

        function getVideoCode(videoDirective){
            return getSubDirective(videoDirective, "cde:", ",");
        }

        function getVideoDescription(videoDirective){
            return getSubDirective(videoDirective, "desc:", "\n");
        }

        function getTuneSetTunePosition(tuneSetDirective){
			var tuneSetTunePosition = "undefined";
			var tuneSetTunePositionSplits = [];
			tuneSetTunePositionSplits = tuneSetDirective.split("pos:");
			if  (tuneSetTunePositionSplits.length > 1){
				tuneSetTunePositionSplits = tuneSetTunePositionSplits[1].split(",");
				tuneSetTunePosition = tuneSetTunePositionSplits[0].replace(/^\s+|\s+$/g, '');
			}
			return tuneSetTunePosition; 
		}
		
		
		function getTuneSetTuneRepeat(tuneSetDirective){
			var tuneSetTuneRepeat = "undefined";
			var tuneSetTuneRepeatSplits = [];
			tuneSetTuneRepeatSplits = tuneSetDirective.split("rep:");
			if  (tuneSetTuneRepeatSplits.length > 1){
				tuneSetTuneRepeatSplits = tuneSetTuneRepeatSplits[1].split(",");
				tuneSetTuneRepeat = tuneSetTuneRepeatSplits[0].replace(/^\s+|\s+$/g, '');
			}
			return tuneSetTuneRepeat; 
		}

        function getTuneSetTuneAnnotation(tuneSetDirective){
            var tuneSetTuneAnnotation = "";
            var tuneSetTuneAnnotationSplits = [];
            tuneSetTuneAnnotationSplits = tuneSetDirective.split("ant:");
            if  (tuneSetTuneAnnotationSplits.length > 1){
                tuneSetTuneAnnotationSplits = tuneSetTuneAnnotationSplits[1].split(",");
                tuneSetTuneAnnotation = tuneSetTuneAnnotationSplits[0].replace(/^\s+|\s+$/g, '');
            }
            return tuneSetTuneAnnotation;
        }
		
		function getTuneSetTarget(tuneSetDirective){
			var tuneSetTarget = "";
			var tuneSetTargetSplits = [];
			tuneSetTargetSplits = tuneSetDirective.split("targ:");
			if  (tuneSetTargetSplits.length > 1){
				tuneSetTargetSplits = tuneSetTargetSplits[1].split(",");
				tuneSetTarget = tuneSetTargetSplits[0].replace(/^\s+|\s+$/g, '');
			}
			return tuneSetTarget; 
		}
		
		function getTuneSetEnvironment(tuneSetDirective){
			var tuneSetEnvironment = "";
			var tuneSetEnvironmentSplits = [];
			tuneSetEnvironmentSplits = tuneSetDirective.split("env:");
			if  (tuneSetEnvironmentSplits.length > 1){
				tuneSetEnvironmentSplits = tuneSetEnvironmentSplits[1].split(",");
				tuneSetEnvironment = tuneSetEnvironmentSplits[0].replace(/^\s+|\s+$/g, '');
			}
			return tuneSetEnvironment; 
		}
		
		function getTuneSetName(tuneSetDirective){
			var tuneSetName = "";
			var tuneSetNameSplits = [];
			tuneSetNameSplits = tuneSetDirective.split("name:");
			if  (tuneSetNameSplits.length > 1){
				tuneSetNameSplits = tuneSetNameSplits[1].split("\n");
				tuneSetName = tuneSetNameSplits[0].replace(/^\s+|\s+$/g, '');
			}
			return tuneSetName; 
		}
		
		
		function getAbcValue(abc, abcField, initValue){
			var value = initValue;
			var abcFieldSplits = [];
			abcFieldSplits = abc.split(abcField);
			if  (abcFieldSplits.length > 1){
				abcFieldSplits = abcFieldSplits[1].split("\n");
				value = abcFieldSplits[0].replace(/^\s+|\s+$/g, '');
			}
			return value; 
		}
		
		function getAbcValues(abc, abcField){
			var values = [];
			var value = "";
			var abcFieldSplits = [];
			var lineSplits = [];
			
			abcFieldSplits = abc.split(abcField);
			
			for (var i = 0; i < abcFieldSplits.length; i++) {
				if  (i > 0){
					lineSplits = abcFieldSplits[i].split("\n");
					value = lineSplits[0].replace(/^\s+|\s+$/g, '');
					values.push(value);
				}
			}	
			return values; 
		}
		
		function getAbcValueOfTuneLine(tuneLine, abcField, initValue){
			var value = initValue;
			var abcFieldSplits = [];
			abcFieldSplits = tuneLine.split(abcField);
			if  (abcFieldSplits.length > 1){
				abcFieldSplits = abcFieldSplits[1].split("\n");
				value = abcFieldSplits[0].replace(/^\s+|\s+$/g, '');
			}
			return value; 
		}
				
		function addDirective(tune, directive, targetLine){
			var tuneSplits = [];
			var newAbc = "";
			tuneSplits = tune.pure.split("\n");
			tune.pure = "";
			var curLineIsTargetLine = false;
			var lastLineIsTargetLine = false;
			var directiveAdded = false;
			
			// Add Directive after the TargetLine
			for (var i = 0; i < tuneSplits.length; i++) {	
				
				if (tuneSplits[i].indexOf(targetLine) !== -1){
					curLineIsTargetLine = true;
				} else {
					curLineIsTargetLine = false;
				}
			
				if (!curLineIsTargetLine && lastLineIsTargetLine){
					newAbc = newAbc + directive;
					newAbc = newAbc + "\n";
					directiveAdded = true;
				}
			
				newAbc = newAbc + tuneSplits[i];
				newAbc = newAbc + "\n";
				
				lastLineIsTargetLine =  curLineIsTargetLine;
			}
			
			// EOF (tune consists only of the TargetLine or no TargetLine was found)
			// Add it at the end 
			if (!directiveAdded){
				newAbc = newAbc + directive;
				newAbc = newAbc + "\n";
				directiveAdded = true;
			}
			
			tune.pure = newAbc; 
		}
		
		
		function getTuneAbcWithEtbkDirectives(tune, tuneSetPositions, targetLine, tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl){
			var tuneSplits = [];
			var newAbc = "";
			tuneSplits = tune.pure.split("\n");
			var curLineIsTargetLine = false;
			var lastLineIsTargetLine = false;
			var directivesAdded = false;
			var directive = "";
			
			// Add all directives after the TargetLine
			for (var i = 0; i < tuneSplits.length; i++) {	
				if (!directivesAdded) {
					if (tuneSplits[i].indexOf(targetLine) !== -1){
						curLineIsTargetLine = true;
					} else {
						curLineIsTargetLine = false;
					}
				
					if (!curLineIsTargetLine && lastLineIsTargetLine){			
						if (tuneSetAbcIncl) {
							for (var w = 0; w < tuneSetPositions.length; w++) {	
								directive = "%%etbk:tnset id:"+tuneSetPositions[w].tuneSetId+",pos:"+tuneSetPositions[w].position+",rep:"+tuneSetPositions[w].repeat+",ant:"+tuneSetPositions[w].annotation;
								
								if (tuneSetPositions[w].tuneSetTarget != ""){
									directive = directive+",targ:"+tuneSetPositions[w].tuneSetTarget;
								}
								
								if (tuneSetPositions[w].tuneSetEnv != ""){
									directive = directive+",env:"+tuneSetPositions[w].tuneSetEnv;
								}
								
								if (tuneSetPositions[w].tuneSetName != ""){
									directive = directive+",name:"+tuneSetPositions[w].tuneSetName;
								}
								
								newAbc = newAbc + directive;
								newAbc = newAbc + "\n";
							}
						}
						
						if (siteAbcIncl) {
							/*
                            if (tune.site1 != "") {
								directive = "%%etbk:site1 " + tune.site1;
								newAbc = newAbc + directive;
								newAbc = newAbc + "\n";
							}
							
							if (tune.site2 != "") {
								directive = "%%etbk:site2 " + tune.site2;
								newAbc = newAbc + directive;
								newAbc = newAbc + "\n";
							}
							
							if (tune.site3 != "") {
								directive = "%%etbk:site3 " + tune.site3;
								newAbc = newAbc + directive;
								newAbc = newAbc + "\n";
							}
							*/
                            for (var z = 0; z < tune.wsites.length; z++) {
                                directive = "%%etbk:wsite " + tune.wsites[z].url;
                                newAbc = newAbc + directive;
                                newAbc = newAbc + "\n";
                            }
						}
						
						if (tubeAbcIncl) {
							// tube1, tube2 and tube3: deprecated
                            /*
                            if (tune.youTube1 != "") {
								directive = "%%etbk:tube1 " + tune.youTube1;
								newAbc = newAbc + directive;
								newAbc = newAbc + "\n";
							}
							
							if (tune.youTube2 != "") {
								directive = "%%etbk:tube2 " + tune.youTube2;
								newAbc = newAbc + directive;
								newAbc = newAbc + "\n";
							}
							
							if (tune.youTube3 != "") {
								directive = "%%etbk:tube3 " + tune.youTube3;
								newAbc = newAbc + directive;
								newAbc = newAbc + "\n";
							}
							*/
                            for (var z = 0; z < tune.videos.length; z++) {
                                directive = "%%etbk:video "
                                            + "src:" + tune.videos[z].source
                                            + ",cde:" + tune.videos[z].code
                                            + ",desc:" + tune.videos[z].description ;
                                newAbc = newAbc + directive;
                                newAbc = newAbc + "\n";
                            }


						}

						if (annotationAbcIncl) {	
							if (tune.annotation != "") {
								directive = "%%etbk:annot " + tune.annotation;
								newAbc = newAbc + directive;
								newAbc = newAbc + "\n";
							}
						}
						
						if (skillAbcIncl) {
							if (tune.skill != "") {
								directive = "%%etbk:skill " + tune.skill;
								newAbc = newAbc + directive;
								newAbc = newAbc + "\n";
							}
						}
						
						if (colorAbcIncl) {
							if (tune.color != eTBK_DEFAULT_COLOR) {
								directive = "%%etbk:color " + tune.color;
								newAbc = newAbc + directive;
								newAbc = newAbc + "\n";
							}
						}
						
						if (playDateAbcIncl) {
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
                                newAbc = newAbc + "\n";
                            }
						}
						directivesAdded = true;
					}
				}
			
				newAbc = newAbc + tuneSplits[i];
				newAbc = newAbc + "\n";
				
				lastLineIsTargetLine =  curLineIsTargetLine;
			}
			
			// EOF (tune consists only of the TargetLine or no TargetLine was found)
			// Todo: Add it at the end 
			if (!directivesAdded){
				// todo
			}
			
			return newAbc; 
		}
				
		function getTuneLastPlayed(playDates){
			// TODO: Sort playDates
			//return playDates[0].playDate;
            if(playDates.length == 0){
                return null;
            } else {
                return playDates[0].playDate;
            }
		}
		
		
		function getPlayDates(tuneLine){
			var playDates = [];
			var playDate = new Date();
			var playDatesSplits = [];
						
			playDatesSplits = tuneLine.split(",");
				
			for (var i = 0; i < playDatesSplits.length; i++) {
				//moment kann nicht verwendet werden, weil Object mit methoden, und Object kann folglich nicht aus localStorage restored werden.
				//playDate = newPlayDate(moment(playDatesSplits[i], "YYYY-MM-DDTHH:mm"));
				playDate = moment(playDatesSplits[i], "YYYY-MM-DDTHH:mm").toDate();
				playDates.push(newPlayDate(playDate));
			}	
						
			return playDates; 
		}

        function getVideoFromDirective(videoDirective){
            return newVideo(getVideoSource(videoDirective), getVideoCode(videoDirective), getVideoDescription(videoDirective));
        }
		
		function initializeTuneAndTuneSet(tuneSets){
			// Get next tuneSetId, intTuneId and tuneId
			var maxTuneSetId = 0;
			var maxIntTuneId = 0;
			var maxTuneId = 0;
			var currentTuneId = 0;
			var currentIntTuneId = 0;
			var currentTuneSetId = 0;
			
			for (var i = 0; i < tuneSets.length; i++) {
				
				currentTuneSetId = parseInt(tuneSets[i].tuneSetId);
				if (currentTuneSetId > maxTuneSetId){
					maxTuneSetId = currentTuneSetId;
				}		
					
				for (var z = 0; z < tuneSets[i].tuneSetPositions.length; z++) {
					
					currentIntTuneId = parseInt(tuneSets[i].tuneSetPositions[z].intTuneId);
					if (currentIntTuneId > maxIntTuneId){
						maxIntTuneId = currentIntTuneId;
					}
						
					currentTuneId = parseInt(tuneSets[i].tuneSetPositions[z].tune.id);
					if (currentTuneId > maxTuneId){
						maxTuneId = currentTuneId;
					}
				}
			}
			
			// Create new Tune with X: maxTuneId + 1 and T: New Tune
			var newTuneId = ++maxTuneId;
			var newTuneSetId = ++maxTuneSetId;
			var newIntTuneId = ++maxIntTuneId;
			
			var abc = "X:"+newTuneId+"\n" + "T:New Tune";
			var book = new ABCJS.TuneBook(abc);
			var tune = book.tunes[0];

            tune.intTuneId =  newIntTuneId;
			
			initializeTuneViewFields(tune);
			
			var tuneSet = [];
			var tuneSetPositions = [];
			var tuneSetPosition = newTuneSetPosition(newTuneSetId, "", "", "", newIntTuneId, tune, 1, "3x");
			//addNewTuneSetDirective(tuneSetPosition);
			tuneSetPositions.push(tuneSetPosition);
			tuneSet = newTuneSet(newTuneSetId, "", "", "", tune.lastPlayed, tune.lastModified, 0, tune.type, tuneSetPositions);

            tuneSets.unshift(tuneSet);


			return tuneSet; 
		}


        function initializeTuneSet(tuneSets, tune){
            // Get next tuneSetId
            var maxTuneSetId = 0;
            var currentTuneSetId = 0;

            for (var i = 0; i < tuneSets.length; i++) {
                currentTuneSetId = parseInt(tuneSets[i].tuneSetId);
                if (currentTuneSetId > maxTuneSetId){
                    maxTuneSetId = currentTuneSetId;
                }
            }

            var tuneSet = [];
            var tuneSetPositions = [];
            var newTuneSetId = ++maxTuneSetId;
            var tuneSetPosition = newTuneSetPosition(newTuneSetId, "", "", "", tune.intTuneId, tune, 1, "3x");
            //addNewTuneSetDirective(tuneSetPosition);
            tuneSetPositions.push(tuneSetPosition);
            tuneSet = newTuneSet(newTuneSetId, "", "", "", tune.lastPlayed, tune.lastModified, 0, tune.type, tuneSetPositions);

            tuneSets.unshift(tuneSet);


            return tuneSet;
        }


		
		/*
		function changePositionOnTuneSetDirective(tuneSetPosition){
			var tuneSplits = [];
			var newAbc = "";
			tuneSplits = tuneSetPosition.tune.pure.split("\n");
			tuneSetPosition.tune.pure = "";
			
			var searchTuneSetDirective = "%%etbk:tnset id:"+tuneSetPosition.tuneSetId;
			var newTuneSetDirective = "%%etbk:tnset id:"+tuneSetPosition.tuneSetId+",pos:"+tuneSetPosition.position+",rep:"+tuneSetPosition.repeat;

			for (var i = 0; i < tuneSplits.length; i++) {	
				if (tuneSplits[i].indexOf(searchTuneSetDirective) !== -1){
					newAbc = newAbc + newTuneSetDirective;
				
				} else {
					newAbc = newAbc + tuneSplits[i];
				}
				
				newAbc = newAbc + "\n";
			}
			
			tuneSetPosition.tune.pure = newAbc; 
		}
		*/

		/*
		function addNewTuneSetDirective(tuneSetPosition){
			setTuneSetDirective(tuneSetPosition.tune, tuneSetPosition.tuneSetId, tuneSetPosition.position, tuneSetPosition.repeat); 
		}
		*/
		
		/*
		function deleteTuneSetDirective(tuneSetPosition){
			var tuneSplits = [];
			var newAbc = "";
			tuneSplits = tuneSetPosition.tune.pure.split("\n");
			tuneSetPosition.tune.pure = "";
			
			var searchTuneSetDirective = "%%etbk:tnset id:"+tuneSetPosition.tuneSetId;
			var newTuneSetDirective = "%%etbk:tnset id:"+tuneSetPosition.tuneSetId+",pos:"+tuneSetPosition.position+",rep:"+tuneSetPosition.repeat;

			for (var i = 0; i < tuneSplits.length; i++) {	
				if (tuneSplits[i].indexOf(searchTuneSetDirective) !== -1){
				
				} else {
					newAbc = newAbc + tuneSplits[i];
					newAbc = newAbc + "\n";
				}
			}
			
			tuneSetPosition.tune.pure = newAbc; 
		}
		*/
		
		function addTunePlayDate(tune, newDate){
			if (tune.lastPlayed != null && moment(tune.lastPlayed).diff(newDate, "minutes") == 0){
				// Power-Clicker
				// Do nothing
			
			} else {
				// Set LastPlayed
				tune.lastPlayed = newDate;
				
				// Put LastPlayed on first Position in the playDates-Array
                tune.playDates.unshift(newPlayDate(tune.lastPlayed));

                // Calculate Frequency Played
                tune.frequencyPlayed = calculateFrequencyPlayed(tune.playDates);
			}
		}

        function addTuneSetPlayDate(tuneSet, newDate){
            for (var i = 0; i < tuneSet.tuneSetPositions.length; i++) {
                addTunePlayDate(tuneSet.tuneSetPositions[i].tune, newDate)
            }
        }

		function savePlayDatesDirective(tuneSetPosition){
			var searchDirective = "%%etbk:pldat ";
			var newDirective = getPlayDatesDirective(tuneSetPosition.tune);
				
			saveDirective(tuneSetPosition, searchDirective, newDirective);
		}
		
		function getPlayDatesDirective(tune){
			var directive = "%%etbk:pldat ";
			var playDate = null;
			
			// Prepare PlayDatesDirective
			for (var i = 0; i < tune.playDates.length; i++) {
				if (i > 0){
					directive = directive + ",";
				}
				playDate = moment(tune.playDates[i].playDate);
				directive = directive + playDate.format("YYYY-MM-DDTHH:mm"); 
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
		
		function saveSkillDirective(tuneSetPosition){
			var searchDirective = "%%etbk:skill ";
			var newDirective = "%%etbk:skill " + tuneSetPosition.tune.skill;
			
			saveDirective(tuneSetPosition, searchDirective, newDirective); 
		}
		
		function saveDirective(tuneSetPosition, searchDirective, newDirective){			
			if (!abcContainesDirective(tuneSetPosition, searchDirective)) {
				// Add newDirective always after the X-Line
				addDirective(tuneSetPosition.tune, newDirective, "X:");
			} else {
				replaceDirective(tuneSetPosition, searchDirective, newDirective)
			}
		}
		
		function abcContainesDirective(tuneSetPosition, directive){
			var directiveSplits = [];
			var directiveFound = false;
						
			directiveSplits = tuneSetPosition.tune.pure.split(directive);
			
			if  (directiveSplits.length > 1){
				//Directive found
				directiveFound = true;				
			} 
			
			return directiveFound;
		}
		
		function replaceDirective(tuneSetPosition, directiveType, directive){
			var tuneSplits = [];
			var newAbc = "";
			
			tuneSplits = tuneSetPosition.tune.pure.split("\n");
			tuneSetPosition.tune.pure = "";
				
			for (var i = 0; i < tuneSplits.length; i++) {	
				if (tuneSplits[i].indexOf(directiveType) !== -1){
					newAbc = newAbc + directive;
					
				} else {
					newAbc = newAbc + tuneSplits[i];
				}
				
				newAbc = newAbc + "\n";
			}
				
			tuneSetPosition.tune.pure = newAbc;
		}
		
		function setRandomSort(tuneBook){
			var randomNumber = 0;
			for (var i = 0; i < tuneBook.tuneSets.length; i++) {
				randomNumber = Math.floor(Math.random()*100001);
				tuneBook.tuneSets[i].sort = randomNumber;
			}	
		}

        function getRandomTuneSetIndex(sets){
            // Get a random number between 1 and the number of TuneSets
            return Math.floor(Math.random()* sets.length) + 1;
        }

        function getRandomTuneIndex(tunes){
            // Get a random number between 1 and the number of Tunes
            return Math.floor(Math.random()* tunes.length) + 1;
        }
				
		function getAbc(tuneSets, tuneBookName, tuneBookVersion, tuneBookDescription, tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl, fingeringAbcIncl){
			// Generate Abc
			
			var tuneAbc = "";
			var allTuneSetPositions = [];
			var wIntTuneId = 0;
			var wTune = [];
			var wTuneSetPositions = [];
			
			// Construct Header
			var tbkAbc = "";
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
			
			// Sort TuneSetPositions by intTuneId
			allTuneSetPositions.sort(function(a, b){
				return a.intTuneId-b.intTuneId
			});
			
			for (var i = 0; i < allTuneSetPositions.length; i++) {	
				
				if (wIntTuneId == 0) {
					// First Record
					tuneAbc = "";
					wTuneSetPositions = [];
					wIntTuneId = allTuneSetPositions[i].intTuneId;
					wTune = allTuneSetPositions[i].tune;
					wTuneSetPositions.push(allTuneSetPositions[i]);
					
				} else if (wIntTuneId == allTuneSetPositions[i].intTuneId  && wTune == allTuneSetPositions[i].tune) {
					// Gruppenbruch intTuneId
					// Tune belongs to more than one set
					wTuneSetPositions.push(allTuneSetPositions[i]);
				
				} else {
					
					tuneAbc = getTuneAbc(wTune, wTuneSetPositions, tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl, fingeringAbcIncl);
					tbkAbc += tuneAbc;
					tbkAbc += "\n";	//empty line between tunes
					
					// Init
					tuneAbc = "";
					wTuneSetPositions = [];
					wIntTuneId = allTuneSetPositions[i].intTuneId;
					wTune = allTuneSetPositions[i].tune;
					wTuneSetPositions.push(allTuneSetPositions[i]);
				}
			}
			
			// EOF: Last Tune
			tuneAbc = getTuneAbc(wTune, wTuneSetPositions, tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl, fingeringAbcIncl);
			tbkAbc += tuneAbc;
	
			return tbkAbc; 
		}
		
		function getAbcHeader(tuneBookName, tuneBookVersion, tuneBookDescription, includeEtbkDirective){
			// Construct Header
			var tbkAbc = "%abc-";
			tbkAbc += ABC_VERSION;
			tbkAbc += "\n";
			tbkAbc += "I:abc-creator eTuneBook-";
			tbkAbc += eTBK_VERSION;
			tbkAbc += "\n";
			
			if (includeEtbkDirective) {
				tbkAbc += "%%etbk:bname ";
				tbkAbc += tuneBookName;
				tbkAbc += "\n";
				tbkAbc += "%%etbk:bvers ";
				tbkAbc += tuneBookVersion;
				tbkAbc += "\n";
				tbkAbc += "%%etbk:bdesc ";
				tbkAbc += tuneBookDescription;
				tbkAbc += "\n";
			} 
			tbkAbc += "\n";
			return tbkAbc;
		}
		
		function getTuneAbc(tune, tuneSetPositions, tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl, fingeringAbcIncl) {
			var tuneAbc = "";		
			
			if (!tuneSetAbcIncl && !playDateAbcIncl && !skillAbcIncl && !colorAbcIncl && !annotationAbcIncl && !siteAbcIncl && !tubeAbcIncl) {
				tuneAbc = tune.pure;
			} else {
				tuneAbc = getTuneAbcWithEtbkDirectives(tune, tuneSetPositions, "X:", tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl);
			}
					
			if (!fingeringAbcIncl) {
				tuneAbc = tuneAbc.replace(eTBK_PATTERN_FINGER, '');
			}
			
			return tuneAbc;
		}
		
		
		function tuneUp(tune){
			// Adaption of Jens Wollschl�ger's ABC-Transposer (http://www.8ung.at/abctransposer/)  
			var neu = escape(tune.pure);

			var Reihe = neu.split("%0D%0A");
			Reihe = neu.split("%0A");

			for (var i = 0; i < Reihe.length; ++i){
				Reihe[i] = unescape(Reihe[i]); /* Macht die Steuerzeichen wieder weg */
				var Aktuellereihe = Reihe[i].split(""); /* nochmal bei C. Walshaw crosschecken, ob alle m�gl. ausser K: erfasst. */
        
				if ((Aktuellereihe[0] == "A" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "B" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "C" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "D" && Aktuellereihe[1] == ":") ||(Aktuellereihe[0] == "E" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "F" && Aktuellereihe[1] == ":") ||(Aktuellereihe[0] == "G" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "H" && Aktuellereihe[1] == ":") ||(Aktuellereihe[0] == "I" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "J" && Aktuellereihe[1] == ":") ||(Aktuellereihe[0] == "L" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "M" && Aktuellereihe[1] == ":") ||(Aktuellereihe[0] == "N" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "O" && Aktuellereihe[1] == ":") ||(Aktuellereihe[0] == "P" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "Q" && Aktuellereihe[1] == ":") ||(Aktuellereihe[0] == "R" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "S" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "T" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "U" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "V" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "W" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "X" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "Y" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "Z" && Aktuellereihe[1] == ":")){
					/* Alle ausser K: und Melodieteile werden hier ignoriert. */
				
				} else if (Aktuellereihe[0] == "K" && Aktuellereihe[1] == ":"){ 
					/* k: Feld wird hier behandelt */
					var Leerzeichenweg = Reihe[i].split(" "); /* weil manchmal Leerzeichen nachm k */
					var sindweg = Leerzeichenweg.join("");
					Aktuellereihe = sindweg.split(""); /* den dritten ersetzen durch aktuellen Ton */
            
					if (Aktuellereihe[3] == "\#" || Aktuellereihe[3] == "b"){
						Aktuellereihe[3] = "";
					}

					if (Aktuellereihe[2] == "C"){
						Aktuellereihe[2] = "D";
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
						Reihe[i] = Aktuellereihe.join("");
					
					} else if (Aktuellereihe[2] == "D"){
						Aktuellereihe[2] = "E";
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
						Reihe[i] = Aktuellereihe.join("");
               
					} else if(Aktuellereihe[2] == "E"){
						Aktuellereihe[2] = "F";
					
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
						Reihe[i] = Aktuellereihe.join("");
               
					} else if(Aktuellereihe[2] == "F") {
						Aktuellereihe[2] = "G";
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
						Reihe[i] = Aktuellereihe.join("");
               
					} else if (Aktuellereihe[2] == "G") {
						Aktuellereihe[2] = "A";
						
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
						Reihe[i] = Aktuellereihe.join("");
               
					} else if(Aktuellereihe[2] == "A") {
						Aktuellereihe[2] = "B";
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
						Reihe[i] = Aktuellereihe.join("");
               
					} else if(Aktuellereihe[2] == "B") {
						Aktuellereihe[2] = "C";
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
						Reihe[i] = Aktuellereihe.join("");
               
					} else {
						/* nur f�r den Fall, falls korrupt */
					}
        
				} else { 
					/* hier die Melodieabschnitte bearbeiten */
					var Derarray = Reihe[i].split("");
				
					for (var x = 0; x < Derarray.length; ++x){ 
						/* zum Erstellen von a'' oder A,, -Klumpen */
						var allefertig = false;
						var mitzaehl = 0;
					
						if ((Derarray[x+1] == "'") || (Derarray[x+1] == ",")){
							do {
								mitzaehl = mitzaehl + 1;
						   
								if (Derarray[x+mitzaehl] == "'"){
									Derarray[x] = Derarray[x] + "'";
									Derarray[x + mitzaehl] = ""; /* Arrays mit ' l�schen */
							
								} else if (Derarray[x+mitzaehl] == ","){
									Derarray[x] = Derarray[x] + ",";
									Derarray[x + mitzaehl] = ""; /* Arrays mit ' l�schen */
							
								} else {
									allefertig = true; /* wenn alle ' in dem Abschnitt fertig sind - Ende. */
								}
						  
							} while(allefertig == false);
					
						} else {
							/* wenn es kein Klumpen ist, hier erstmal nix ver�ndern */
						}
					}
            
					for (var y=0; y < Derarray.length; ++y) { 
						/* Tonh�he �ndern */
						var Miniarray = Derarray[y].split("");
						
						if (Miniarray[0] == "B" && Miniarray[1] == ","){
							/* Ausnahmefall 1 (, l�schen) */
					   
							Miniarray[0] = "C";
							Miniarray[1] = "";
					
						} else if(Miniarray[0] == "b" && Miniarray[1] == "'"){ 
							/* Ausnahmefall 2 (' hinzuf�gen) */
					   
							Miniarray[0] = "c";
							Miniarray[1] = "''";
					
						} else if(Miniarray[0] == "C"){
							Miniarray[0] = "D";
						   
						} else if(Miniarray[0] == "D"){
							Miniarray[0] = "E";
						
						} else if(Miniarray[0] == "E"){
							Miniarray[0] = "F";
						
						} else if(Miniarray[0] == "F"){
							Miniarray[0] = "G";
						
						} else if(Miniarray[0] == "G"){
							Miniarray[0] = "A";
						
						} else if(Miniarray[0] == "A"){
							Miniarray[0] = "B";
						
						} else if(Miniarray[0] == "B"){
							Miniarray[0] = "c";
						
						} else if(Miniarray[0] == "c"){
							Miniarray[0] = "d";
						
						} else if(Miniarray[0] == "d"){
							Miniarray[0] = "e";
						
						} else if(Miniarray[0] == "e"){
							Miniarray[0] = "f";
						
						} else if(Miniarray[0] == "f"){
							Miniarray[0] = "g";
						
						} else if(Miniarray[0] == "g"){
							Miniarray[0] = "a";
						
						} else if(Miniarray[0] == "a"){
							Miniarray[0] = "b";
						
						} else if(Miniarray[0] == "b"){
							Miniarray[0] = "c'";   
						}
						Derarray[y] = Miniarray.join("");
					}
				var alleszusammen = Derarray.join("");
				Reihe[i] = alleszusammen;
				}
			}

			tune.pure = Reihe.join("\n");
			return tune;
		}
		
		function tuneDown(tune){
			// Adaption of Jens Wollschl�ger's ABC-Transposer (http://www.8ung.at/abctransposer/)
			var neu = escape(tune.pure);
			
			var Reihe = neu.split("%0D%0A");
			Reihe = neu.split("%0A");

			for (var i = 0; i < Reihe.length; ++i){
				Reihe[i] = unescape(Reihe[i]); /* Macht die Steuerzeichen wieder weg */
				var Aktuellereihe = Reihe[i].split(""); /* nochmal bei C. Walshaw crosschecken, ob alle m�gl. ausser K: erfasst. */
        
				if ((Aktuellereihe[0] == "A" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "B" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "C" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "D" && Aktuellereihe[1] == ":") ||(Aktuellereihe[0] == "E" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "F" && Aktuellereihe[1] == ":") ||(Aktuellereihe[0] == "G" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "H" && Aktuellereihe[1] == ":") ||(Aktuellereihe[0] == "I" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "J" && Aktuellereihe[1] == ":") ||(Aktuellereihe[0] == "L" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "M" && Aktuellereihe[1] == ":") ||(Aktuellereihe[0] == "N" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "O" && Aktuellereihe[1] == ":") ||(Aktuellereihe[0] == "P" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "Q" && Aktuellereihe[1] == ":") ||(Aktuellereihe[0] == "R" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "S" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "T" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "U" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "V" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "W" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "X" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "Y" && Aktuellereihe[1] == ":") || (Aktuellereihe[0] == "Z" && Aktuellereihe[1] == ":")){
					/* Alle ausser K: und Melodieteile werden hier ignoriert. */
				
				} else if (Aktuellereihe[0] == "K" && Aktuellereihe[1] == ":"){
					/* k: Feld wird hier behandelt */
           
					var Leerzeichenweg = Reihe[i].split(" "); /* weil manchmal Leerzeichen nachm k */
					var sindweg = Leerzeichenweg.join("");
					Aktuellereihe = sindweg.split(""); /* den dritten ersetzen durch aktuellen Ton */
				
					if (Aktuellereihe[3] == "\#" || Aktuellereihe[3] == "b"){
						Aktuellereihe[3] = "";
					}
					
					if (Aktuellereihe[2] == "C"){
						Aktuellereihe[2] = "B";
						Reihe[i] = Aktuellereihe.join("");
					
					} else if(Aktuellereihe[2] == "D"){
						Aktuellereihe[2] = "C";
						Reihe[i] = Aktuellereihe.join("");
					
					} else if(Aktuellereihe[2] == "E"){
						Aktuellereihe[2] = "D";
						Reihe[i] = Aktuellereihe.join("");
					
					} else if(Aktuellereihe[2] == "F"){
						Aktuellereihe[2] = "E";
						Reihe[i] = Aktuellereihe.join("");
					
					} else if(Aktuellereihe[2] == "G") {
						Aktuellereihe[2] = "F";
						Reihe[i] = Aktuellereihe.join("");
					
					} else if(Aktuellereihe[2] == "A"){
						Aktuellereihe[2] = "G";
						Reihe[i] = Aktuellereihe.join("");
					
					} else if(Aktuellereihe[2] == "B"){
						Aktuellereihe[2] = "A";
						Reihe[i] = Aktuellereihe.join("");
					
					} else {
						/* nur f�r den Fall, falls korrupt */
					}
				} else {
					/* hier die Melodieabschnitte bearbeiten */
           
					var Derarray = Reihe[i].split("");
					
					for (var x = 0; x < Derarray.length; ++x){ 
						/* zum Erstellen von a'' oder A,, -Klumpen */
					   
						var allefertig = false;
						var mitzaehl = 0;
						
						if ((Derarray[x+1] == "'") || (Derarray[x+1] == ",")){
							do {
								mitzaehl = mitzaehl + 1;
								if (Derarray[x+mitzaehl] == "'"){
									Derarray[x] = Derarray[x] + "'";
									Derarray[x + mitzaehl] = ""; /* Arrays mit ' l�schen */
								
								} else if(Derarray[x+mitzaehl] == ","){
									Derarray[x] = Derarray[x] + ",";
									Derarray[x + mitzaehl] = ""; /* Arrays mit ' l�schen */
								
								} else {
									allefertig = true; /* wenn alle ' in dem Abschnitt fertig sind - Ende. */
								}
								
							} while (allefertig == false);
						
						} else {
							/* wenn es kein Klumpen ist, hier erstmal nix ver�ndern */
						}
					}
					
					for ( var y = 0; y < Derarray.length; ++y){
						/* Tonh�he �ndern */
						var Miniarray = Derarray[y].split("");
						
						if (Miniarray[0] == "C" && Miniarray[1] == ","){
							/* Ausnahmefall 1 (, hinzuf�gen) */
						   
							Miniarray[0] = "B";
							Miniarray[1] = ",,";
						
						} else if(Miniarray[0] == "c" && Miniarray[1] == "'"){
							/* Ausnahmefall 2 (' hinzuf�gen) */
						   
							Miniarray[0] = "b";
							Miniarray[1] = "";
						
						} else if(Miniarray[0] == "C"){
							Miniarray[0] = "B,";
						   
						} else if(Miniarray[0] == "D"){
							Miniarray[0] = "C";
						
						} else if(Miniarray[0] == "E"){
							Miniarray[0] = "D";
						   
						} else if(Miniarray[0] == "F"){
							Miniarray[0] = "E";
						
						} else if(Miniarray[0] == "G"){
							Miniarray[0] = "F";
						
						} else if(Miniarray[0] == "A"){
							Miniarray[0] = "G";
						   
						} else if(Miniarray[0] == "B"){
							Miniarray[0] = "A";
						   
						} else if(Miniarray[0] == "c"){
							Miniarray[0] = "B";
						   
						} else if(Miniarray[0] == "d"){
							Miniarray[0] = "c";
						
						} else if(Miniarray[0] == "e"){
							Miniarray[0] = "d";
						   
						} else if(Miniarray[0] == "f"){
							Miniarray[0] = "e";
						   
						} else if(Miniarray[0] == "g"){
							Miniarray[0] = "f";
						   
						} else if(Miniarray[0] == "a"){
							Miniarray[0] = "g";
						
						} else if(Miniarray[0] == "b"){
							Miniarray[0] = "a";
						}
						Derarray[y] = Miniarray.join("");
					}
					var alleszusammen = Derarray.join("");
					Reihe[i] = alleszusammen;
				}
			}

			tune.pure = Reihe.join("\n");
            return tune;
		}
		
		
		function getSampleAbc(tune, startFromBar, numberOfBars) {
			var tuneSplits = [];
			var barSplits = [];
			var barSplit = "";
			var barLength = 0;
			var dotsLineSplits = [];
			var newAbc = "";
			var beginOfLine = "";
			var barPattern = /\|/g;		//matches | globally (every occurence)
			var barMatches = [];
			var titleCount = 0;
			var totBarCount = 0;
			var isHeaderLine = false;
			var isNeeded = false;
			var isBar = false;
			var isLastBar = false;
			var isInFocus = true;
			var simulateTitle = false;
			tuneSplits = tune.pure.split("\n");
			
			for (var i = 0; i < tuneSplits.length; i++) {	
				isHeaderLine = false;
				isBar = false;
				isNeeded = false;
				simulateTitle = false;				
			
				if (isInFocus) {				
					// Abc-Standard
					beginOfLine = tuneSplits[i].substring(0,2);
					
					if (beginOfLine == "X:"){
						isHeaderLine = true;
						isNeeded = true;
					} else if (beginOfLine == "M:"){
						isHeaderLine = true;
						isNeeded = true;
					} else if (beginOfLine == "L:"){
						isHeaderLine = true;
						isNeeded = true;
					} else if (beginOfLine == "K:"){
						isHeaderLine = true;
						isNeeded = true;
					} else if (beginOfLine == "T:"){
						isHeaderLine = true;
					
						// TODO: titles have to be included -> talk to Paul for options
						if (titleCount == 0) {
							// Only print first title
							simulateTitle = true;
							isNeeded = true;
						}
						titleCount = titleCount + 1;
						
					} else {
						
						barSplits = tuneSplits[i].split("\n");
						barSplits = barSplits[0].split("|");
						
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
										// -Takt-Strich am Beginn der Linie (es hat vorher keine anderen Zeichen), oder
										// -Takt-Strich am Ende der Linie
										// -Doppel-Taktstrich (kein Zeichen zwischen den Takt-Strichen)
										// Hinweise: 
										// -Ein Takt-Strich am Schluss der Line h�tte barLength == 1, wenn der 
										// Zeilenumbruch nicht rausgenommen w�rde.
										// -Es gibt aber auch nach dem Rausnehmen des Zeilenumgruchs noch letzte Takt-Striche
										// mit barLength == 1. Dort sind versteckte Zeichen drin, die auch zu einem Zeilenumbruch f�hren. 
										// Mit obiger replace-Funktion werden diese entfernt.
										// 
									} else 	if (barLength < 4) {
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
											
											if (totBarCount == startFromBar + numberOfBars -1) {
												isLastBar = true;
											}
										} else {
											// Erster Takt, der nicht mehr im Anzeige-Bereich ist.
											isInFocus = false;	
										}
									} 
								
									if (isNeeded) {
										newAbc = newAbc + barSplit;
										newAbc = newAbc + "|";
										
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
							newAbc = newAbc + "T: ";
							newAbc = newAbc + "\n";
						} else {
							newAbc = newAbc + tuneSplits[i];
							newAbc = newAbc + "\n";
						}
					}		
				}
			}
		
		return newAbc;
			
		}



        function addVideo(tuneBook, intTuneId, videoSource, videoCode, videoDescription){
            var tune, video;
            tune = getTuneById(tuneBook, intTuneId);
            if (tune != null) {
                //Todo: Don't add if source/code already exists.
                video = newVideo(videoSource, videoCode, videoDescription);
                tune.videos.push(video);
            }
            return video;
        }

        function addWebsite(tuneBook, intTuneId, url){
            var tune, wsite;
            tune = getTuneById(tuneBook, intTuneId);
            if (tune != null) {
                //Todo: Don't add if url already exists.
                wsite = newWebsite(url);
                tune.wsites.push(wsite);
            }
            return wsite;
        }

        function deleteVideo(tuneBook, intTuneId, videoSource, videoCode){
            var tune, video, index, remove=false;
            tune = getTuneById(tuneBook, intTuneId);
            if (tune != null) {
                for (var i = 0; i < tune.videos.length; i++) {
                    if (videoSource == tune.videos[i].source && videoCode == tune.videos[i].code) {
                        index = i;
                        remove=true;
                    }
                }
                // Video löschen
                if (remove){
                    tune.videos.splice(index,1);
                }
            }
        }

        function deleteWebsite(tuneBook, intTuneId, url){
            var tune, wsite, index, remove=false;
            tune = getTuneById(tuneBook, intTuneId);
            if (tune != null) {
                for (var i = 0; i < tune.wsites.length; i++) {
                    if (url == tune.wsites[i].url) {
                        index = i;
                        remove=true;
                    }
                }
                // Website löschen
                if (remove){
                    tune.wsites.splice(index,1);
                }
            }
        }


        function getVideoById(tuneBook, intTuneId, videoSource, videoCode){
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


        function getTuneById(tuneBook, intTuneId){
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

        function getTuneSetById(tuneBook, tuneSetId){
            if (tuneBook != null) {
                for (var i = 0; i < tuneBook.tuneSets.length; i++) {
                    if (tuneSetId == tuneBook.tuneSets[i].tuneSetId) {
                        return tuneBook.tuneSets[i];
                    }
                }
            }
            return null;
        }

        function extractTunes(tuneSets){
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

        function extractTunesWithinPlayDatePeriod(tuneBook, playDateFilter){
            // Extract Tunes form TuneSets.
            var tunes = [];
            var addToTunes = false;

            if (tuneBook != null){
                for (var i = 0; i < tuneBook.tuneSets.length; i++) {
                    for (var z = 0; z < tuneBook.tuneSets[i].tuneSetPositions.length; z++) {

                        addToTunes = true;

                        var today = moment();
                        var days = 0;

                        days = 0;

                        var playDate = tuneBook.tuneSets[i].tuneSetPositions[z].tune.lastPlayed

                        if (playDate != undefined && playDate != null) {
                            var checkDay = moment(tuneBook.tuneSets[i].tuneSetPositions[z].tune.lastPlayed);

                            if (checkDay != null && checkDay != undefined){
                                days = today.diff(checkDay, 'days');

                                if (playDateFilter == "All Tunes"){

                                } else {
                                    if (playDateFilter == "Played Last Day" &&  days > 1) {
                                        addToTunes = false;
                                    } else if (playDateFilter == "Played Last Week" &&  days > 7) {
                                        addToTunes = false;
                                    } else if (playDateFilter == "Played Last Month" &&  days > 30) {
                                        addToTunes = false;
                                    } else if (playDateFilter == "Played Last Year" &&  days > 365) {
                                        addToTunes = false;
                                    } else if (playDateFilter == "Played Never") {
                                        addToTunes = false;
                                    }
                                }
                            } else {
                                if (playDateFilter == "Played Never"){

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

        function extractSetsWithinPlayDatePeriod(tuneBook, playDateFilter){
            // Extract Tunes form TuneSets.
            var sets = [];
            var tunePlayedWithinPlayDatePeriod = true;
            var tunesPlayedWithinPlayDatePeriod = 0;

            if (tuneBook != null){
                for (var i = 0; i < tuneBook.tuneSets.length; i++) {
                    tunePlayedWithinPlayDatePeriod = true;
                    tunesPlayedWithinPlayDatePeriod = 0;

                    for (var z = 0; z < tuneBook.tuneSets[i].tuneSetPositions.length; z++) {
                        var today = moment();
                        var days = 0;

                        days = 0;

                        var playDate = tuneBook.tuneSets[i].tuneSetPositions[z].tune.lastPlayed

                        if (playDate != undefined && playDate != null) {

                            var checkDay = moment(tuneBook.tuneSets[i].tuneSetPositions[z].tune.lastPlayed);

                            if (checkDay != null && checkDay != undefined){
                                days = today.diff(checkDay, 'days');

                                if (playDateFilter == "All Sets"){

                                } else {
                                    if (playDateFilter == "Played Last Day" &&  days > 1) {
                                        tunePlayedWithinPlayDatePeriod = false;
                                    } else if (playDateFilter == "Played Last Week" &&  days > 7) {
                                        tunePlayedWithinPlayDatePeriod = false;
                                    } else if (playDateFilter == "Played Last Month" &&  days > 30) {
                                        tunePlayedWithinPlayDatePeriod = false;
                                    } else if (playDateFilter == "Played Last Year" &&  days > 365) {
                                        tunePlayedWithinPlayDatePeriod = false;
                                    } else if (playDateFilter == "Played Never") {
                                        tunePlayedWithinPlayDatePeriod = false;
                                    }
                                }
                            } else {
                                if (playDateFilter == "Played Never"){

                                } else {
                                    tunePlayedWithinPlayDatePeriod = false;
                                }
                            }

                            if (tunePlayedWithinPlayDatePeriod){
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

        function extractTuneSetPositions(tuneSets){
            // Extract TuneSetPositions from TuneSets.
            var tuneSetPositions = [];

            for (var i = 0; i < tuneSets.length; i++) {
                for (var z = 0; z < tuneSets[i].tuneSetPositions.length; z++) {
                    tuneSetPositions.push(tuneSets[i].tuneSetPositions[z]);
                }
            }

            return tuneSetPositions;
        }

        function extractFirstTuneSetPositions(tuneSets){
            // Extract First TuneSetPositions from all TuneSets.
            var tuneSetPositions = [];

            for (var i = 0; i < tuneSets.length; i++) {
                for (var z = 0; z < tuneSets[i].tuneSetPositions.length; z++) {
                    if (tuneSets[i].tuneSetPositions[z].position == "1"){
                        tuneSetPositions.push(tuneSets[i].tuneSetPositions[z]);
                    }
                }
            }

            return tuneSetPositions;
        }

        function extractFirstTuneSetPosition(tuneSet){
            // Extract First TuneSetPosition from a TuneSet.

            for (var z = 0; z < tuneSet.tuneSetPositions.length; z++) {
                if (tuneSet.tuneSetPositions[z].position == "1"){
                    return tuneSet.tuneSetPositions[z];
                }
            }
        }


        function getTuneSetsByIntTuneId(tuneBook, intTuneId){
            var tuneSets = [];

            if (tuneBook != null){
                for (var i = 0; i < tuneBook.tuneSets.length; i++) {
                    for (var z = 0; z < tuneBook.tuneSets[i].tuneSetPositions.length; z++) {
                        if(intTuneId == tuneBook.tuneSets[i].tuneSetPositions[z].tune.intTuneId){
                            tuneSets.push(tuneBook.tuneSets[i]);
                        }
                    }
                }
            }

            return tuneSets;
        }

        function getTuneSetsAsTuneSetPositions(tuneBook, intTuneId){
            // Extract TuneSetPositions from TuneSets.
            var tuneSetIds = [];
            var tuneSetPositions = [];

            //First get TuneSetIds for intTuneId
            if (tuneBook != null){
                for (var i = 0; i < tuneBook.tuneSets.length; i++) {
                    for (var z = 0; z < tuneBook.tuneSets[i].tuneSetPositions.length; z++) {
                        if(intTuneId == tuneBook.tuneSets[i].tuneSetPositions[z].tune.intTuneId){
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

        function getTuneSetPositionsForTuneSetId(tuneBook, tuneSetId, tuneSetPositions){
            // Extract TuneSetPositions from TuneSets.
            if (tuneBook != null){
                for (var i = 0; i < tuneBook.tuneSets.length; i++) {
                    for (var z = 0; z < tuneBook.tuneSets[i].tuneSetPositions.length; z++) {
                        if(tuneSetId == tuneBook.tuneSets[i].tuneSetPositions[z].tuneSetId){
                            tuneSetPositions.push(tuneBook.tuneSets[i].tuneSetPositions[z]);
                        }
                    }
                }
            }

            return tuneSetPositions;
        }

        function filterTuneSets(tuneSets, filterOptions){
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

                if (filterOptions.key == "" || filterOptions.key == "All Keys" || filterOptions.key == null) {
                    keyMatch = true;
                }

                if (filterOptions.type == "" || filterOptions.type == "All Types" || filterOptions.type == null) {
                    typeMatch = true;
                }

                if (filterOptions.color == "" || filterOptions.color == "All Colors" || filterOptions.color == null) {
                    colorMatch = true;
                }

                if (filterOptions.skill == "" || filterOptions.skill == "?" || filterOptions.skill == null) {
                    skillMatch = true;
                }

                if (filterOptions.plmin == "" || filterOptions.plmin == "05.10.2012" || filterOptions.plmin == null
                    || filterOptions.plmax == "" || filterOptions.plmax == null) {
                    playMatch = true;
                } else {
                    playMin = moment(filterOptions.plmin, 'DD.MM.YYYY').startOf('day');
                    playMax = moment(filterOptions.plmax, 'DD.MM.YYYY').endOf('day');
                }

                if (filterOptions.updmin == "" || filterOptions.updmin == "05.10.2012" || filterOptions.updmin == null
                    || filterOptions.updmax == "" || filterOptions.updmax == null) {
                    updateMatch = true;
                } else {
                    updateMin = moment(filterOptions.updmin, 'DD.MM.YYYY').startOf('day');
                    updateMax = moment(filterOptions.updmax, 'DD.MM.YYYY').endOf('day');
                }

                if (filterOptions.freqcomp == "" || filterOptions.freqcomp == null
                    || filterOptions.freq == "" || filterOptions.freq == null) {
                    freqMatch = true;
                }

                if (filterOptions.target == ""
                    || filterOptions.target == "All Targets"
                    || filterOptions.target == null
                    || filterOptions.target == tuneSets[i].tuneSetTarget) {
                    targetMatch = true;
                }

                if (filterOptions.env == ""
                    || filterOptions.env == "All Environments"
                    || filterOptions.env == null
                    || filterOptions.env == tuneSets[i].tuneSetEnv) {
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

                        if (!playMatch && tuneSets[i].tuneSetPositions[z].tune.lastPlayed != null ) {
                            var lastPlayed = moment(tuneSets[i].tuneSetPositions[z].tune.lastPlayed);
                            if(!(lastPlayed.isBefore(playMin))
                                && !(lastPlayed.isAfter(playMax))){

                                playMatch = true;
                            }
                        }

                        if (!updateMatch && tuneSets[i].tuneSetPositions[z].tune.lastModified != null ) {
                            var lastModified = moment(tuneSets[i].tuneSetPositions[z].tune.lastModified);
                            if(!(lastModified.isBefore(updateMin))
                                && !(lastModified.isAfter(updateMax))){

                                updateMatch = true;
                            }
                        }

                        if (!freqMatch) {
                            if ((filterOptions.freqcomp == "LT" && parseInt(tuneSets[i].tuneSetPositions[z].tune.frequencyPlayed) < parseInt(filterOptions.freq))
                                || (filterOptions.freqcomp == "GE" && parseInt(tuneSets[i].tuneSetPositions[z].tune.frequencyPlayed) >= parseInt(filterOptions.freq)) )  {

                                freqMatch = true;
                            }
                        }
                    }
                }

                if (keyMatch && typeMatch && colorMatch && skillMatch && targetMatch && envMatch && playMatch && updateMatch && freqMatch){
                    tuneSetsFiltered.push(tuneSets[i]);
                }
            }

            return tuneSetsFiltered;
        }

        function filterTunes(tunes, filterOptions){
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

                if (filterOptions.key == "" || filterOptions.key == "All Keys" || filterOptions.key == null) {
                    keyMatch = true;
                }

                if (filterOptions.type == "" || filterOptions.type == "All Types" || filterOptions.type == null) {
                    typeMatch = true;
                }

                if (filterOptions.color == "" || filterOptions.color == "All Colors" || filterOptions.color == null) {
                    colorMatch = true;
                }

                if (filterOptions.skill == "" || filterOptions.skill == "?" || filterOptions.skill == null) {
                    skillMatch = true;
                }

                if (filterOptions.plmin == "" || filterOptions.plmin == "05.10.2012" || filterOptions.plmin == null
                    || filterOptions.plmax == "" || filterOptions.plmax == null) {
                    playMatch = true;
                } else {
                    playMin = moment(filterOptions.plmin, 'DD.MM.YYYY').startOf('day');
                    playMax = moment(filterOptions.plmax, 'DD.MM.YYYY').endOf('day');
                }

                if (filterOptions.updmin == "" || filterOptions.updmin == "05.10.2012" || filterOptions.updmin == null
                    || filterOptions.updmax == "" || filterOptions.updmax == null) {
                    updateMatch = true;
                } else {
                    updateMin = moment(filterOptions.updmin, 'DD.MM.YYYY').startOf('day');
                    updateMax = moment(filterOptions.updmax, 'DD.MM.YYYY').endOf('day');
                }

                if (filterOptions.freqcomp == "" || filterOptions.freqcomp == null
                    || filterOptions.freq == "" || filterOptions.freq == null) {
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

                    if (!playMatch && tunes[i].lastPlayed != null ) {
                        var lastPlayed = moment(tunes[i].lastPlayed);
                        if(!(lastPlayed.isBefore(playMin))
                            && !(lastPlayed.isAfter(playMax))){

                            playMatch = true;
                        }
                    }

                    if (!updateMatch && tunes[i].lastModified != null ) {
                        var lastModified = moment(tunes[i].lastModified);
                        if(!(lastModified.isBefore(updateMin))
                            && !(lastModified.isAfter(updateMax))){

                            updateMatch = true;
                        }
                    }

                    if (!freqMatch) {
                        if ((filterOptions.freqcomp == "LT" && parseInt(tunes[i].frequencyPlayed) < parseInt(filterOptions.freq))
                            || (filterOptions.freqcomp == "GE" && parseInt(tunes[i].frequencyPlayed) >= parseInt(filterOptions.freq)) )  {

                            freqMatch = true;
                        }
                    }

                }

                if (keyMatch && typeMatch && colorMatch && skillMatch && playMatch && updateMatch && freqMatch){
                    tunesFiltered.push(tunes[i]);
                }
            }

            return tunesFiltered;
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
        eTBk.getAbc = function (tuneSets, tuneBookName, tuneBookVersion, tuneBookDescription, tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl, fingeringAbcIncl) {
            return getAbc(tuneSets, tuneBookName, tuneBookVersion, tuneBookDescription, tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl, fingeringAbcIncl);
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

        eTBk.initializeTuneAndTuneSet = function () {
            if (eTBk.getCurrentTuneBook == null) {
                currentTuneBook = eTBk.initializeTuneBook();
                return currentTuneBook.tuneSets[0];

            } else {
                return initializeTuneAndTuneSet(currentTuneBook.tuneSets);
            }

        };
		
		eTBk.getTuneKey = function (tune) {
            return getAbcValue(tune.pure, "K:", "undefined");
        };
		
		eTBk.getTuneTitle = function (tune) {
            return getAbcValue(tune.pure, "T:", "undefined");
        };
		
		eTBk.getTuneType = function (tune) {
            return getAbcValue(tune.pure, "R:", "undefined").toLowerCase();
        };
		
		eTBk.getTuneId = function (tune) {
            return getAbcValue(tune.pure, "X:", "undefined");
        };
		
		eTBk.getTuneSite = function (tune, siteType) {
            var siteDirective = "%%etbk:" + siteType + " ";
            return getAbcValue(tune.pure, siteDirective, "");
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
            // Generate TuneBook Abc from the current TuneBook and store it in localStorage
            localStorage.setItem(eTBK_STORAGE_ID_TUNEBOOK, JSON.stringify(getAbc(currentTuneBook.tuneSets, currentTuneBook.name, currentTuneBook.version, currentTuneBook.description, true, true, true, true, true, true, true, true)));
        };


		eTBk.storeAbc = function (tuneBook) {
            // Generate eTuneBook Abc from the tuneBook-Model and store it in localStorage
            localStorage.setItem(eTBK_STORAGE_ID_TUNEBOOK, JSON.stringify(getAbc(tuneBook.tuneSets, tuneBook.name, tuneBook.version, tuneBook.description, true, true, true, true, true, true, true, true)));
        };
		
		eTBk.storeSettings = function (settings) {
            // Store settings in localStorage
            localStorage.setItem(eTBK_STORAGE_ID_SETTINGS, JSON.stringify(settings));
        };
		
		eTBk.initializeTuneBook = function () {
            //TODO: Angleichen mit eTBk.initializeTuneSet und eTBk.initializeTuneAndTuneSet
            // Header
            var tuneBookName = "My TuneBook";
            var tuneBookVersion = "";
            var tuneBookDescription = "The tunes I play";

            var date = moment(new Date());
            tuneBookVersion = date.format("YYYY-MM-DDTHH:mm");

            var abc = "";
            var includeEtbkDirective = true;
            abc = getAbcHeader(tuneBookName, tuneBookVersion, tuneBookDescription, includeEtbkDirective);
            // First Tune
            abc += "X: 1";
            abc += "\n";
            abc += "T: New Tune";
            abc += "\n";

            currentTuneBook = new TuneBook(abc);
            currentTuneBook.tuneSets[0].tuneSetPositions[0].tune.intTuneId =  1;
            return currentTuneBook;
        };
		
		eTBk.getSettingsFromStore = function () {
            var settings = [];

            // Retrieve Settings from localStorage
            settings = JSON.parse(localStorage.getItem(eTBK_STORAGE_ID_SETTINGS) || '[]');

            return    settings;
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
                return getTuneBookFromLocalStorage()
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
            // filterTuneSets bringt ganze TuneSets, auch wenn nur ein Tune matched.
            // Deshalb nachgelagert die nicht matchenden Tunes erneut rausfiltern.
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
                    skillType.description = "?";
                } else if (skillType.skill == 2) {
                    skillType.description = "Ignorant";
                } else if (skillType.skill == 3) {
                    skillType.description = "Beginner";
                } else if (skillType.skill == 4) {
                    skillType.description = "Intermediate";
                } else if (skillType.skill == 5) {
                    skillType.description = "Advanced";
                } else if (skillType.skill == 6) {
                    skillType.description = "Master";
                }
                skillTypes.push(skillType);
            }

            return skillTypes;
        };

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

        eTBk.getTuneBookFromLocalStorage = function () {
            // Retrieve eTuneBook Abc from localStorage
            var abc = JSON.parse(localStorage.getItem(eTBK_STORAGE_ID_TUNEBOOK) || '[]');

            if (abc == undefined || abc == "") {
                currentTuneBook = null;
            } else {
                //Convert eTuneBook Abc to eTuneBook-Model
                currentTuneBook = new TuneBook(abc);
            }
            return currentTuneBook;
        };

        eTBk.getTuneBookFromImportedFile = function (abc, fileName) {
            currentTuneBook = new TuneBook(abc);
            if (currentTuneBook.name == "") {
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
            var tuneBook = [];

            var jqxhr = $.ajax({
                url: eTBk.EXAMPLE_FILENAME,
                async: false,
                cache: false,
                dataType: "text"
            });

            jqxhr.success(function (data) {
                // This will only be called once the remote content has been loaded in
                // The data will then be stored in the data param and can be used within your site
                currentTuneBook = new TuneBook(data);
                //tuneBook.name = eTBk.EXAMPLE_FILENAME;
                //tuneSets = tuneBook.tuneSets;
            });

            jqxhr.error(function (data) {
                // Something went wrong, never mind lets just handle it gracefully below...
                alert("Fehler beim Laden von " + eTBk.EXAMPLE_FILENAME);
            });

            return currentTuneBook;
        };

        return eTBk;
		
	})(window.eTBk = window.eTBk || {});

    return eTBk;
});