'use strict';

/**
 * Services that persists and retrieves a TuneBook from localStorage.
 */
eTuneBook.factory( 'tbkStorage', function() {
  var eTBK_STORAGE_ID_TUNEBOOK = 'etbk-tuneBook';
  var eTBK_STORAGE_ID_SETTINGS = 'etbk-settings';
  var eTBK_VERSION = '1.0.3';
  var ABC_VERSION = '2.1';
  //var eTBK_DEFAULT_COLOR = "#E0F0F0";
  var eTBK_DEFAULT_COLOR = "#F5F5F5";
  var eTBK_DEFAULT_PLAYDATE_STRING = "1966-04-05T22:00";
  var eTBK_DEFAULT_PLAYDATE_STRING_FORMATTED = "1966-04-05 22:00";
  var eTBK_DEFAULT_PLAYDATE_DATE = moment(eTBK_DEFAULT_PLAYDATE_STRING, "YYYY-MM-DDTHH:mm").toDate();
  var eTBK_PATTERN_FINGER = /!\d!/g;		//matches !<number>! globally (every occurence)
  var eTBk_EXAMPLE_FILENAME = 'BoxPlayer_V095.abc';
  

  if (!window.eTBk) {
			window.eTBk = {};
	}
	
  (function() {
		eTBk.TuneBook = function(abc) {
			var This = this;
			
			// split the file into individual tunes.
			var book = new ABCJS.TuneBook(abc);
			
			// TuneBook-Header zwischenspeichern
			This.header = book.header;
			
			// TuneBook-Name aus Header lesen
			This.name = getAbcValue(This.header, "%%etbk:bname ", "");
			
			// eTuneBook Model					abc								description
			// tuneBook
			//		name						%%etbk:bname					Book-Name (set from File-Name on load from Server or from local File System, set 'New TuneBook' when new)
			//		header						-								ABCJS.TuneBook.header
			//		tuneSets
			//			tuneSetId				see %%etbk:tnset				Id of tuneSet
			//			type					-								tuneType of the included tunes if all tunes have the same type, otherwise: Mixed
			//			sort					-								for random sorting by system
			//			lastPlayed				-								date (Javascript Date Object) of the last played tune in the set 
			//			frequencyPlayed			-								Score calculated on the basis of playDates
			//			tuneSetPositions		
			//				intTuneId 			-								internal key managed by TuneBookEditor (tuneId in abc can be screwed up by the user)
			//				tune				-								ABCJS.TuneBook.tunes.tune[i]	
			//					pure			'from X: to next X:'			ABCJS.TuneBook.tunes.tune[i].pure
			//																	extracts from pure (for the view):							
			//					id				X:
			//					title			T:
			//					type			R:
			//					key				K:
			//																	eTuneBook-specific fields:
			//					youTube1		%%etbk:tube1					url to youTube video 1 (embeded)
			//					youTube2		%%etbk:tube2					url to youTube video 2 (embeded)
			//					youTube3		%%etbk:tube3					url to youTube video 3 (embeded)
			//					site1			%%etbk:site1					url to site 1 (extern) 
			//					site2			%%etbk:site2					url to site 2 (extern)
			//					site3			%%etbk:site3					url to site 3 (extern)
			//					annotation		%%etbk:annot					comment
			//					color			%%etbk:color					hex-color of the tune
			//					skill			%%etbk:skill					for filtering, 1= hardly know the tunes --- 6 = absolute Master
			//					lastPlayed		-								last played date (Javascript Date Object) of playDates 
			//					playDates		%%etbk:pldat					<YYYY-MM-DDTHH:mm>,<YYYY-MM-DDTHH:mm>,<YYYY-MM-DDTHH:mm>....
			//						date	
			//									%%etbk:tnset					id:<tuneSetId>,pos:<position>,repeat:<playTime>
			//				tuneSetId											reference to the current parent (needed because in javascript a child does not know it's parent out of the box)
			//				position 											index + 1
			//				repeat 												default: 3
			
			This.tuneSets = extractTuneSets(book);			
		}
		
		eTBk.DEFAULT_COLOR = eTBK_DEFAULT_COLOR;
		eTBk.DEFAULT_PLAYDATE_STRING = eTBK_DEFAULT_PLAYDATE_STRING;
		eTBk.DEFAULT_PLAYDATE_STRING_FORMATTED = eTBK_DEFAULT_PLAYDATE_STRING_FORMATTED;
		eTBk.DEFAULT_PLAYDATE_DATE = eTBK_DEFAULT_PLAYDATE_DATE;
		eTBk.PATTERN_FINGER = eTBK_PATTERN_FINGER;
		eTBk.EXAMPLE_FILENAME = eTBk_EXAMPLE_FILENAME;
		
		function extractTuneSets(book){
			// Generate TuneSets from the book.
			
			var allTuneSetPositions = new Array();
			var tunesWithoutTuneSetDirective = new Array();
			var tuneSetDirectives = new Array();
			var tuneSets = new Array();
			var today = moment();
			
			var intTuneSetId = 1;
			var intTuneId = 1;
			
			// Generate TuneSetPositions
			for (var i = 0; i < book.tunes.length; i++) {	
				var tune = book.tunes[i];
				tuneSetDirectives = new Array();
				tuneSetDirectives = getAbcValues(tune.pure, "%%etbk:tnset ");
				
				if (tuneSetDirectives.length > 0){
					// Tune that was exported from eTuneBook
					// The tune can have one or more tuneSetDirective
					extractEtbkFields(tune);
					
					for (var y = 0; y < tuneSetDirectives.length; y++) {
						// Get tuneSetId, position, repeat
						var tuneSetId = getTuneSetId(tuneSetDirectives[y]);
						var position = getTuneSetTunePosition(tuneSetDirectives[y]);	
						var repeat = getTuneSetTuneRepeat(tuneSetDirectives[y]);
						
						// Generate tuneSetPosition
						var tuneSetPosition = new Array(); 
						tuneSetPosition = newTuneSetPosition(tuneSetId, intTuneId, tune, position, repeat);
						allTuneSetPositions.push(tuneSetPosition);
					}
					
					intTuneId++;
				
				} else {
					// Zwischenspeichern und später aufgrund der dynamisch ermittelten maxTuneSetId generieren 
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
			var wTuneSetId = 0
			for (var i = 0; i < allTuneSetPositions.length; i++) {	
				
				if (wTuneSetId !== allTuneSetPositions[i].tuneSetId){
					// First TuneSetPosition of new tuneSetId
					wTuneSetId = allTuneSetPositions[i].tuneSetId;
					
					var tuneSet = new Array();
					var tuneSetType = "";
					var tuneSetLastPlayed = "";
					var frequencyPlayed = 0;
					var tuneSetPositions = new Array();
					
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
							
							frequencyPlayed = frequencyPlayed + getFrequencyPlayedPerTune(tuneSetPosition.tune.playDates, today);
							
						}
					}
					
					// Frequency Played: Durchschnitt pro Tune
					if (tuneSetPositions.length > 1) {
						frequencyPlayed = Math.round(frequencyPlayed / tuneSetPositions.length); 
					} 
					
					tuneSet = newTuneSet(wTuneSetId, tuneSetLastPlayed, frequencyPlayed, tuneSetType, tuneSetPositions);
					tuneSets.push(tuneSet);
				}
			}

			// Generate TuneSets from tunesWithoutTuneSetDirective
			// Get next free TuneSetId
			wTuneSetId++;

			for (var i = 0; i < tunesWithoutTuneSetDirective.length; i++) {		
				var tuneSet = new Array();
				var tuneSetType = "";
				var frequencyPlayed = 0;
				var tuneSetPositions = new Array();
				var tuneSetPosition = new Array();
				var tune = tunesWithoutTuneSetDirective[i];
				
				
				extractEtbkFields(tune);
				//setTuneSetDirective(tune, wTuneSetId, 1, 3);				
					
				tuneSetPosition = newTuneSetPosition(wTuneSetId, intTuneId, tune, 1, 3);	
				tuneSetPositions.push(tuneSetPosition);
				tuneSet = newTuneSet(wTuneSetId, tune.lastPlayed, frequencyPlayed, tune.type, tuneSetPositions);
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
			tune.youTube1 = "";
			tune.youTube2 = "";
			tune.youTube3 = "";
			tune.site1 = "";
			tune.site2 = "";
			tune.site3 = "";
			tune.annotation = "";
			tune.color = eTBK_DEFAULT_COLOR;
			tune.skill = "";
			tune.playDates = new Array();
			
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
					} 
				}
			
				// eTuneBook-specific
				beginOfLine = tuneSplits[i].substring(0,12);
				
				if  (beginOfLine.length > 1){
					if (beginOfLine == "%%etbk:tnset"){
						isStandardAbc = false;
					} else if (beginOfLine == "%%etbk:tube1"){
						tune.youTube1 = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:tube1 ", "");
						isStandardAbc = false;
					} else if (beginOfLine == "%%etbk:tube2"){
						tune.youTube2 = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:tube2 ", "");
						isStandardAbc = false;
					} else if (beginOfLine == "%%etbk:tube3"){
						tune.youTube3 = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:tube3 ", "");
						isStandardAbc = false;
					} else if (beginOfLine == "%%etbk:site1"){
						tune.site1 = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:site1 ", "");
						isStandardAbc = false;
					} else if (beginOfLine == "%%etbk:site2"){
						tune.site2 = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:site2 ", "");
						isStandardAbc = false;
					} else if (beginOfLine == "%%etbk:site3"){
						tune.site3 = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:site3 ", "");
						isStandardAbc = false;
					} else if (beginOfLine == "%%etbk:annot"){
						tune.annotation = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:annot ", "");
						isStandardAbc = false;
					} else if (beginOfLine == "%%etbk:color"){
						tune.color = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:color ", eTBK_DEFAULT_COLOR);
						isStandardAbc = false;
					} else if (beginOfLine == "%%etbk:skill"){
						tune.skill = getAbcValueOfTuneLine(tuneSplits[i], "%%etbk:skill ", 1);
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
			
			// PlayDate setzen, falls noch nicht definiert
			if (tune.playDates.length == 0) {
				var playDate = moment(eTBK_DEFAULT_PLAYDATE_STRING, "YYYY-MM-DDTHH:mm").toDate();
				tune.playDates.push(playDate);
			}
			
			// LastPlayed setzen auf Tune (für View)
			tune.lastPlayed = getTuneLastPlayed(tune.playDates);
			
		}
		
		function initializeTuneViewFields(tune){
			tune.type = "";
			tune.key = "";
			tune.youTube1 = "";
			tune.youTube2 = "";
			tune.youTube3 = "";
			tune.site1 = "";
			tune.site2 = "";
			tune.site3 = "";
			tune.annotation = "";
			tune.color = eTBK_DEFAULT_COLOR;
			tune.skill = "";
			tune.playDates = initializePlayDates(tune);
			tune.lastPlayed = getTuneLastPlayed(tune.playDates);
		}
		
		function getFrequencyPlayedPerTune(playDates, today){
			var frequencyPlayed = 0;
			var days = 0;
			
			for (var i = 0; i < playDates.length; i++) {		
				days = 0;
				var checkDay = moment(playDates[i]);
				days = today.diff(checkDay, 'days');
				
				if (days < 1000) {
					// Je weiter zurück, umso weniger Punkte
					frequencyPlayed = frequencyPlayed + 1000;
					frequencyPlayed = frequencyPlayed - days;
				}
			}

			if (frequencyPlayed < 0){
				frequencyPlayed = 0;
			}
			
			return frequencyPlayed;
		}
		
		function setFrequencyPlayed(tuneSet){
			var frequencyPlayed = 0;
			var today = moment();
			
			for (var i = 0; i < tuneSet.tuneSetPositions.length; i++) {
				frequencyPlayed = frequencyPlayed + getFrequencyPlayedPerTune(tuneSet.tuneSetPositions[i].tune.playDates, today);
			}
			// Durchschnitt pro Tune
			if (tuneSet.tuneSetPositions.length > 1) {
				tuneSet.frequencyPlayed = Math.round(frequencyPlayed / tuneSet.tuneSetPositions.length); 
			} else { 
				tuneSet.frequencyPlayed = frequencyPlayed;
			}
		}
		
		function newTuneSetPosition(iTuneSetId, iIntTuneId, iTune, iPosition, iRepeat){
			return {tuneSetId: iTuneSetId, intTuneId: iIntTuneId, tune: iTune, position: iPosition, repeat: iRepeat};
		}
		
		function newTuneSet(iTuneSetId, iLastPlayed, ifrequencyPlayed, iType, iTuneSetPositions){
			return {tuneSetId: iTuneSetId, lastPlayed: iLastPlayed, frequencyPlayed: ifrequencyPlayed, type: iType, sort: 0, tuneSetPositions: iTuneSetPositions};
		}
		
		function getTuneSetId(tuneSetDirective){
			var tuneSetId = 0;
			var tuneSetIdSplits = new Array();
			tuneSetIdSplits = tuneSetDirective.split("id:");
			if  (tuneSetIdSplits.length > 1){
				tuneSetIdSplits = tuneSetIdSplits[1].split(",");
				tuneSetId = tuneSetIdSplits[0].replace(/^\s+|\s+$/g, '');
			}
			
			return parseInt(tuneSetId); 
		}
		
		function getTuneSetTunePosition(tuneSetDirective){
			var tuneSetTunePosition = "undefined";
			var tuneSetTunePositionSplits = new Array();
			tuneSetTunePositionSplits = tuneSetDirective.split("pos:");
			if  (tuneSetTunePositionSplits.length > 1){
				tuneSetTunePositionSplits = tuneSetTunePositionSplits[1].split(",");
				tuneSetTunePosition = tuneSetTunePositionSplits[0].replace(/^\s+|\s+$/g, '');
			}
			return tuneSetTunePosition; 
		}
		
		
		function getTuneSetTuneRepeat(tuneSetDirective){
			var tuneSetTuneRepeat = "undefined";
			var tuneSetTuneRepeatSplits = new Array();
			tuneSetTuneRepeatSplits = tuneSetDirective.split("rep:");
			if  (tuneSetTuneRepeatSplits.length > 1){
				tuneSetTuneRepeatSplits = tuneSetTuneRepeatSplits[1].split("\n");
				tuneSetTuneRepeat = tuneSetTuneRepeatSplits[0].replace(/^\s+|\s+$/g, '');
			}
			return tuneSetTuneRepeat; 
		}
		
		
		function getAbcValue(abc, abcField, initValue){
			var value = initValue;
			var abcFieldSplits = new Array();
			abcFieldSplits = abc.split(abcField);
			if  (abcFieldSplits.length > 1){
				abcFieldSplits = abcFieldSplits[1].split("\n");
				value = abcFieldSplits[0].replace(/^\s+|\s+$/g, '');
			}
			return value; 
		}
		
		function getAbcValues(abc, abcField){
			var values = new Array();
			var value = "";
			var abcFieldSplits = new Array();
			var lineSplits = new Array();
			
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
			var abcFieldSplits = new Array();
			abcFieldSplits = tuneLine.split(abcField);
			if  (abcFieldSplits.length > 1){
				abcFieldSplits = abcFieldSplits[1].split("\n");
				value = abcFieldSplits[0].replace(/^\s+|\s+$/g, '');
			}
			return value; 
		}
		
		function setTuneSetDirective(tune, tuneSetId, position, repeat){
			var tuneSetDirective = "%%etbk:tnset id:"+tuneSetId+",pos:"+position+",rep:"+repeat;
			addDirective(tune, tuneSetDirective, "X:"); 
		}
				
		function addDirective(tune, directive, targetLine){
			var tuneSplits = new Array();
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
			var tuneSplits = new Array();
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
								directive = "%%etbk:tnset id:"+tuneSetPositions[w].tuneSetId+",pos:"+tuneSetPositions[w].position+",rep:"+tuneSetPositions[w].repeat;
								newAbc = newAbc + directive;
								newAbc = newAbc + "\n";
							}
						}
						
						if (siteAbcIncl) {
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
						}
						
						if (tubeAbcIncl) {
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
							if (!isDefaultPlayDate(tune.lastPlayed)) {
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
			return playDates[0]; 
		}
		
		
		function getPlayDates(tuneLine){
			var playDates = new Array();
			var playDate = new Date();
			var playDatesSplits = new Array();
						
			playDatesSplits = tuneLine.split(",");
				
			for (var i = 0; i < playDatesSplits.length; i++) {
				//moment kann nicht verwendet werden, weil Object mit methoden, und Object kann folglich nicht aus localStorage restored werden.
				//playDate = newPlayDate(moment(playDatesSplits[i], "YYYY-MM-DDTHH:mm"));
				playDate = moment(playDatesSplits[i], "YYYY-MM-DDTHH:mm").toDate();
				playDates.push(playDate);
			}	
						
			return playDates; 
		}
		
		
		function isDefaultPlayDate(playDate){
			var result = false;
			
			if (moment(playDate).diff(eTBK_DEFAULT_PLAYDATE_DATE) == 0){
				result = true;
			}
						
			return result; 
		}
		
		
		function initializePlayDates(tune){
			var playDates = new Array();	
			var playDate = moment(eTBK_DEFAULT_PLAYDATE_STRING, "YYYY-MM-DDTHH:mm").toDate();
			playDates.push(playDate);
			return playDates; 
		}
		
		function initializeTuneSet(tuneSets){
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
			
			initializeTuneViewFields(tune);
			
			var tuneSet = new Array();
			var tuneSetPositions = new Array();
			var tuneSetPosition = newTuneSetPosition(newTuneSetId, newIntTuneId, tune, 1, 3);
			//addNewTuneSetDirective(tuneSetPosition);
			tuneSetPositions.push(tuneSetPosition);
			tuneSet = newTuneSet(newTuneSetId, tune.lastPlayed, 0, tune.type, tuneSetPositions);
			
			return tuneSet; 
		}
		
		function changePositionOnTuneSetDirective(tuneSetPosition){
			var tuneSplits = new Array();
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

		function addNewTuneSetDirective(tuneSetPosition){
			setTuneSetDirective(tuneSetPosition.tune, tuneSetPosition.tuneSetId, tuneSetPosition.position, tuneSetPosition.repeat); 
		}
		
		function deleteTuneSetDirective(tuneSetPosition){
			var tuneSplits = new Array();
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
		
		function addPlayDate(tuneSetPosition, newDate){
			
			if (moment(tuneSetPosition.tune.lastPlayed).diff(newDate, "minutes") == 0){
				// Power-Clicker
				// Do nothing
			
			} else {
				// Set LastPlayed
				tuneSetPosition.tune.lastPlayed = newDate;
				
				// Put LastPlayed on first Position in the playDates-Array
				// Remove the Initialization Date if present	
				var cntPlayDatesToRemove = 0;
				var initDate = moment(eTBK_DEFAULT_PLAYDATE_STRING, "YYYY-MM-DDTHH:mm").toDate();
				if (tuneSetPosition.tune.playDates.length == 1 && moment(tuneSetPosition.tune.playDates[0]).diff(initDate) == 0) {
					cntPlayDatesToRemove = 1;
				}	
				tuneSetPosition.tune.playDates.splice(0,cntPlayDatesToRemove,tuneSetPosition.tune.lastPlayed); 
				
				// Save it into the playDates-Directive
				// tune.pure remains pure in tuneSet-View. playdate-directive is added to the Abc-Code of the tune only during Abc-Export.
				//savePlayDatesDirective(tuneSetPosition);
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
				playDate = moment(tune.playDates[i]);
				directive = directive + playDate.format("YYYY-MM-DDTHH:mm"); 
			}
			
			return directive;
		}
		
		function saveColorDirective(tuneSetPosition){
			var searchDirective = "%%etbk:color ";
			var newDirective = "%%etbk:color " + tuneSetPosition.tune.color;
			
			saveDirective(tuneSetPosition, searchDirective, newDirective); 
		}
		
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
			var directiveSplits = new Array();
			var directiveFound = false;
						
			directiveSplits = tuneSetPosition.tune.pure.split(directive);
			
			if  (directiveSplits.length > 1){
				//Directive found
				directiveFound = true;				
			} 
			
			return directiveFound;
		}
		
		function replaceDirective(tuneSetPosition, directiveType, directive){
			var tuneSplits = new Array();
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
				
		function getAbc(tuneSets, tuneBookName, tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl, fingeringAbcIncl){
			// Generate Abc
			
			var tuneAbc = "";
			var allTuneSetPositions = new Array();
			var wIntTuneId = 0;
			var wTune = new Array();
			var wTuneSetPositions = new Array();
			
			// Construct Header
			var tbkAbc = "%abc-";
			tbkAbc += ABC_VERSION;
			tbkAbc += "\n";
			tbkAbc += "I:abc-creator eTuneBook-";
			tbkAbc += eTBK_VERSION;
			tbkAbc += "\n";
			if (tuneSetAbcIncl || playDateAbcIncl || skillAbcIncl || colorAbcIncl || annotationAbcIncl || siteAbcIncl || tubeAbcIncl) {
				tbkAbc += "%%etbk:bname ";
				tbkAbc += tuneBookName;
				tbkAbc += "\n";
			} 
			tbkAbc += "\n";			
			

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
					wTuneSetPositions = new Array();
				}
				
				wIntTuneId = allTuneSetPositions[i].intTuneId;
				wTune = allTuneSetPositions[i].tune;
				wTuneSetPositions.push(allTuneSetPositions[i]);
			
			}
			
			// EOF: Last Tune
			tuneAbc = getTuneAbc(wTune, wTuneSetPositions, tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl, fingeringAbcIncl);
			tbkAbc += tuneAbc;
	
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
		
		
		function tuneUp(tuneSetPosition, vorzeichen){
			// Adaption of Jens Wollschläger's ABC-Transposer (http://www.8ung.at/abctransposer/)  
			var neu = escape(tuneSetPosition.tune.pure);

			var Reihe = neu.split("%0D%0A");
			Reihe = neu.split("%0A");

			for (var i = 0; i < Reihe.length; ++i){
				Reihe[i] = unescape(Reihe[i]); /* Macht die Steuerzeichen wieder weg */
				var Aktuellereihe = Reihe[i].split(""); /* nochmal bei C. Walshaw crosschecken, ob alle mögl. ausser K: erfasst. */
        
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
						/* nur für den Fall, falls korrupt */
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
									Derarray[x + mitzaehl] = ""; /* Arrays mit ' löschen */
							
								} else if (Derarray[x+mitzaehl] == ","){
									Derarray[x] = Derarray[x] + ",";
									Derarray[x + mitzaehl] = ""; /* Arrays mit ' löschen */
							
								} else {
									allefertig = true; /* wenn alle ' in dem Abschnitt fertig sind - Ende. */
								}
						  
							} while(allefertig == false);
					
						} else {
							/* wenn es kein Klumpen ist, hier erstmal nix verändern */
						}
					}
            
					for (var y=0; y < Derarray.length; ++y) { 
						/* Tonhöhe ändern */
						var Miniarray = Derarray[y].split("");
						
						if (Miniarray[0] == "B" && Miniarray[1] == ","){
							/* Ausnahmefall 1 (, löschen) */
					   
							Miniarray[0] = "C";
							Miniarray[1] = "";
					
						} else if(Miniarray[0] == "b" && Miniarray[1] == "'"){ 
							/* Ausnahmefall 2 (' hinzufügen) */
					   
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

			tuneSetPosition.tune.pure = Reihe.join("\n");
			return tuneSetPosition.tune;
		}
		
		function tuneDown(tuneSetPosition, vorzeichen){
			// Adaption of Jens Wollschläger's ABC-Transposer (http://www.8ung.at/abctransposer/)
			var neu = escape(tuneSetPosition.tune.pure);
			
			var Reihe = neu.split("%0D%0A");
			Reihe = neu.split("%0A");

			for (var i = 0; i < Reihe.length; ++i){
				Reihe[i] = unescape(Reihe[i]); /* Macht die Steuerzeichen wieder weg */
				var Aktuellereihe = Reihe[i].split(""); /* nochmal bei C. Walshaw crosschecken, ob alle mögl. ausser K: erfasst. */
        
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
						/* nur für den Fall, falls korrupt */
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
									Derarray[x + mitzaehl] = ""; /* Arrays mit ' löschen */
								
								} else if(Derarray[x+mitzaehl] == ","){
									Derarray[x] = Derarray[x] + ",";
									Derarray[x + mitzaehl] = ""; /* Arrays mit ' löschen */
								
								} else {
									allefertig = true; /* wenn alle ' in dem Abschnitt fertig sind - Ende. */
								}
								
							} while (allefertig == false);
						
						} else {
							/* wenn es kein Klumpen ist, hier erstmal nix verändern */
						}
					}
					
					for ( var y = 0; y < Derarray.length; ++y){
						/* Tonhöhe ändern */
						var Miniarray = Derarray[y].split("");
						
						if (Miniarray[0] == "C" && Miniarray[1] == ","){
							/* Ausnahmefall 1 (, hinzufügen) */
						   
							Miniarray[0] = "B";
							Miniarray[1] = ",,";
						
						} else if(Miniarray[0] == "c" && Miniarray[1] == "'"){
							/* Ausnahmefall 2 (' hinzufügen) */
						   
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

			tuneSetPosition.tune.pure = Reihe.join("\n");
			return tuneSetPosition.tune;
		}
		
		
		function getSampleAbc(tuneSetPosition, startFromBar, numberOfBars) {
			var tuneSplits = new Array();
			var barSplits = new Array();
			var barSplit = "";
			var barLength = 0;
			var dotsLineSplits = new Array();
			var newAbc = "";
			var beginOfLine = "";
			var barPattern = /\|/g;		//matches | globally (every occurence)
			var barMatches = new Array();
			var titleCount = 0;
			var totBarCount = 0;
			var isHeaderLine = false;
			var isNeeded = false;
			var isBar = false;
			var isLastBar = false;
			var isInFocus = true;
			var simulateTitle = false;
			tuneSplits = tuneSetPosition.tune.pure.split("\n");
			
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
						//-Es gibt keine Takte, die über zwei Zeilen verteilt sind.
						
						// Es braucht im Minimum einen Takt-Strich als Hinweise dafür,
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
										// -Ein Takt-Strich am Schluss der Line hätte barLength == 1, wenn der 
										// Zeilenumbruch nicht rausgenommen würde.
										// -Es gibt aber auch nach dem Rausnehmen des Zeilenumgruchs noch letzte Takt-Striche
										// mit barLength == 1. Dort sind versteckte Zeichen drin, die auch zu einem Zeilenumbruch führen. 
										// Mit obiger replace-Funktion werden diese entfernt.
										// 
									} else 	if (barLength < 4) {
										// Auftakt (Annahme: Maximum 3 Zeichen)
										// TODO: Auftakte mit Fingering, oder Triolen zählen noch als Takte, weil barLength >= 4!
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
											// Nächster Takt nicht mehr in Fokus
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
		
		
		// Static Methods for Calling from Outside
		eTBk.TuneBook.getAbc = function (tuneSets, tuneBookName, tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl, fingeringAbcIncl) {
			return getAbc(tuneSets, tuneBookName, tuneSetAbcIncl, playDateAbcIncl, skillAbcIncl, colorAbcIncl, annotationAbcIncl, siteAbcIncl, tubeAbcIncl, fingeringAbcIncl);
		}
		
		eTBk.TuneBook.getSampleAbc = function (tuneSetPosition) {
			return getSampleAbc(tuneSetPosition, 1, 4);
		}
		
		eTBk.TuneBook.tuneUp = function (tuneSetPosition) {
			return tuneUp(tuneSetPosition);
		}
		
		eTBk.TuneBook.tuneDown = function (tuneSetPosition) {
			return tuneDown(tuneSetPosition);
		}
		
		eTBk.TuneBook.initializeTuneSet = function (tuneSets) {
			return initializeTuneSet(tuneSets);
		}
		
		eTBk.TuneBook.getTuneKey = function (tune) {
			return getAbcValue(tune.pure, "K:", "undefined");
		}
		
		eTBk.TuneBook.getTuneTitle = function (tune) {
			return getAbcValue(tune.pure, "T:", "undefined");
		}
		
		eTBk.TuneBook.getTuneType = function (tune) {
			return getAbcValue(tune.pure, "R:", "undefined").toLowerCase();
		}
		
		eTBk.TuneBook.getTuneId = function (tune) {
			return getAbcValue(tune.pure, "X:", "undefined");
		}
		
		eTBk.TuneBook.getTuneSite = function (tune, siteType) {
			var siteDirective = "%%etbk:" + siteType + " ";
			return getAbcValue(tune.pure, siteDirective, "");
		}
		
		eTBk.TuneBook.changePositionOnTuneSetDirective = function (tuneSetPosition) {
			changePositionOnTuneSetDirective(tuneSetPosition);
		}
		
		eTBk.TuneBook.addNewTuneSetDirective = function (tuneSetPosition) {
			addNewTuneSetDirective(tuneSetPosition);
		}
		
		eTBk.TuneBook.deleteTuneSetDirective = function (tuneSetPosition) {
			deleteTuneSetDirective(tuneSetPosition);
		}
		
		eTBk.TuneBook.addPlayDate = function (tuneSetPosition, newDate) {
			addPlayDate(tuneSetPosition, newDate);
		}
		
		eTBk.TuneBook.setFrequencyPlayed = function (tuneSet) {
			setFrequencyPlayed(tuneSet);
		}
		
		eTBk.TuneBook.saveColorDirective = function (tuneSetPosition) {
			saveColorDirective(tuneSetPosition);
		}
		
		eTBk.TuneBook.saveSkillDirective = function (tuneSetPosition) {
			saveSkillDirective(tuneSetPosition);
		}
		
		eTBk.TuneBook.setRandomSort = function (tuneBook) {
			setRandomSort(tuneBook);
		}
		
		eTBk.TuneBook.storeAbc = function (tuneBook) {
			// Generate eTuneBook Abc from the tuneBook-Model and store it in localStorage
			localStorage.setItem(eTBK_STORAGE_ID_TUNEBOOK, JSON.stringify(getAbc(tuneBook.tuneSets, tuneBook.name, true, true, true, true, true, true, true, true)));
		}
		
		eTBk.TuneBook.storeSettings = function (settings) {
			// Store settings in localStorage
			localStorage.setItem(eTBK_STORAGE_ID_SETTINGS, JSON.stringify(settings));
		}

		
		eTBk.TuneBook.getTuneBookFromStore = function () {
			var tuneBook = new Array();
			var abc = "";
			
			// Retrieve eTuneBook Abc from localStorage
			abc = JSON.parse(localStorage.getItem(eTBK_STORAGE_ID_TUNEBOOK) || '[]');
			
			if (abc == undefined || abc == "") {
			
			} else {
				//Convert eTuneBook Abc to eTuneBook-Model
				tuneBook = new eTBk.TuneBook(abc);
			}
			
			return	tuneBook;
		}
		
		eTBk.TuneBook.getSettingsFromStore = function () {
			var settings = new Array();
			
			// Retrieve Settings from localStorage
			settings = JSON.parse(localStorage.getItem(eTBK_STORAGE_ID_SETTINGS) || '[]');
		
			return	settings;
		}

		
	})();
  
  return {
	
	getFromImportedFile: function(abc, fileName) {
		var tuneBook = new eTBk.TuneBook(abc);
		tuneBook.name = fileName;
		return	tuneBook;
	},
	
	getDefaultFromServer: function() {
	
		/*
		// Asynchron -> zu spät. Bringt aber Text.
		jQuery.get('Boxplayer.abc',function(data){
			return new eTBk.TuneBook(data);
		},'text');
		*/
		/*
		// Synchron, aber bringt HTML statt Text
		var jqxhr = jQuery.get("BoxPlayer.abc");

		jqxhr.success(function(data){
			// This will only be called once the remote content has been loaded in
			// The data will then be stored in the data param and can be used within your site
			return new eTBk.TuneBook(data);
		});

		jqxhr.error(function(data){
			// Something went wrong, never mind lets just handle it gracefully below...
			alert("Fehler beim Laden von Boxplayer.abc");
		});
		*/
		var tuneBook = new Array();
		
		var jqxhr = $.ajax({
			url: eTBk.EXAMPLE_FILENAME,
			async: false,
			dataType: "text"
		});
		
		jqxhr.success(function(data){
			// This will only be called once the remote content has been loaded in
			// The data will then be stored in the data param and can be used within your site
			tuneBook = new eTBk.TuneBook(data);
			tuneBook.name = eTBk.EXAMPLE_FILENAME;
			//tuneSets = tuneBook.tuneSets;
		});

		jqxhr.error(function(data){
			// Something went wrong, never mind lets just handle it gracefully below...
			alert("Fehler beim Laden von "+eTBk.EXAMPLE_FILENAME);
		});
		
		//return tuneSets;
		return tuneBook;
    }
  };
});
