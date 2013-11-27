'use strict';

/**
 * Controller for tuneabc Template
 */
angular.module('eTuneBookApp').controller( 'tuneabcCtrl', function tuneabcCtrl( $scope, $location, $timeout, $rootScope, $state, $stateParams, eTuneBookService ) {
    // Get current tune
    $scope.intTuneId = $stateParams['intTuneId'];
    $scope.tune =  eTuneBookService.getTune($scope.intTuneId);

    $scope.$parent.currentState = "Abc";

    $timeout(function() {
        var editHere = 'abcEditorFor' + $scope.intTuneId;
        var showHere = 'renderTheDotsFor' + $scope.intTuneId;
        new ABCJS.Editor(editHere, { canvas_id: showHere });

    }, 0, false);

    setOptions();

    $scope.tuneEditModus = true;
    $scope.noteEditModus = false;
    $scope.abcEditor = "Tune Editor";

    $scope.setTuneEditModus = function(  ) {
        $scope.tuneEditModus = true;
        $scope.noteEditModus = false;
        $scope.abcEditor = "Tune Editor";
    };

    $scope.setNoteElementEditModus = function(  ) {
        $scope.tuneEditModus = false;
        $scope.noteEditModus = true;
        $scope.abcEditor = "Note Editor";
    };


    $scope.doneEditing = function( tune ) {
        if ( !tune.pure ) {
            // Delete all TuneSetPositions with that tune
            eTuneBookService.deleteTuneSetPositionsAndTune(tune.intTuneId);
            $state.transitionTo('setlist');

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

    $scope.doneSelecting = function( abc, selectionStart, selectionEnd ) {
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
            abc: "undefined",
            abcNoteElement: abcNoteElement
        };

        deselectOptions();

        abcSelection.abc = abc.slice(selectionStart, selectionEnd);

        //Get Characters
        abcChars = abcSelection.abc.split("");

        for (var i = 0; i < abcChars.length; i++) {
            abcChar = abcChars[i];


            if(abcChar == " "){
                // Ignore it

            } else if(abcChar == "!"){
                // Zwischen zwei Ausrufzeichen können verschiedene Abc-Elemente definiert werden.
                // Das Finger-Element ist das einzige Abc-Element zwischen zwei Ausfrufzeichen in Form einer Zahl,
                // alle anderen sind alphanumerisch.
                if(openingBangIndex == undefined){
                    openingBangIndex = selectionStart + i;
                } else {
                    if (abcNoteElement.finger.index != undefined){
                        abcNoteElement.finger.endSignIndex = selectionStart + i;
                    }

                    openingBangIndex = undefined;
                }

            } else if (abcNoteElement.finger.index == undefined && openingBangIndex != undefined) {

                if (!isNaN(parseInt(abcChar))) {
                    //Check for Fingers
                    for (var y = 0; y < $scope.fingerOptions.length; y++) {
                        if(abcChar == $scope.fingerOptions[y].abc){
                            abcNoteElement.finger.index = selectionStart + i;
                            abcNoteElement.finger.abc = abcChar;
                            $scope.fingerOption = $scope.fingerOptions[y];
                            abcNoteElement.finger.startSignIndex = openingBangIndex;
                        }
                    }
                }

            } else if(abcChar == '"'){
                // Zwischen zwei Apostrophs sind nur ChordSymbols möglich
                if(abcNoteElement.chordSymbol.startSignIndex  == undefined){
                    abcNoteElement.chordSymbol.startSignIndex = selectionStart + i;

                } else if (abcNoteElement.chordSymbol.endSignIndex  == undefined){
                    abcNoteElement.chordSymbol.endSignIndex = selectionStart + i;

                    //Check for Chords
                    for (var z = 0; z < $scope.chordOptions.length; z++) {
                        if(abcNoteElement.chordSymbol.abc == $scope.chordOptions[z].abc){
                            $scope.chordOption = $scope.chordOptions[z];
                        }
                    }
                }

            } else if (abcNoteElement.chordSymbol.startSignIndex  != undefined && abcNoteElement.chordSymbol.endSignIndex  == undefined) {
                if (abcNoteElement.chordSymbol.abc == undefined){
                    abcNoteElement.chordSymbol.abc = abcChar;
                } else {
                    abcNoteElement.chordSymbol.abc = abcNoteElement.chordSymbol.abc + abcChar;
                }


            } else if(abcChar == '_' || abcChar == '=' || abcChar == '^'){
                // Accidental
                if(abcNoteElement.accidental.startIndex == undefined){
                    abcNoteElement.accidental.startIndex = selectionStart + i;
                    abcNoteElement.accidental.abc = abcChar;
                } else {
                    abcNoteElement.accidental.abc = abcNoteElement.accidental.abc + abcChar;
                }

            } else if(abcNoteElement.note.index == undefined){

                if(abcNoteElement.accidental.startIndex != undefined && abcNoteElement.accidental.endIndex == undefined){
                    abcNoteElement.accidental.endIndex = selectionStart + i;
                    abcNoteElement.accidental.endIndex = abcNoteElement.accidental.endIndex - 1;

                    //Check for Accidentals
                    for (var z = 0; z < $scope.accidentalOptions.length; z++) {
                        if(abcNoteElement.accidental.abc == $scope.accidentalOptions[z].abc){
                            $scope.accidentalOption = $scope.accidentalOptions[z];
                        }
                    }
                }

                //Check for Notes
                for (var z = 0; z < $scope.noteOptions.length; z++) {
                    if(abcChar == $scope.noteOptions[z].abc){
                        abcNoteElement.note.index = selectionStart + i;
                        $scope.noteOption = $scope.noteOptions[z];
                    }
                }

            } else if(abcChar == ',' || abcChar == "'"){
                // Octave modifier

                if(abcNoteElement.octave.startIndex == undefined){
                    abcNoteElement.octave.startIndex = selectionStart + i;
                    abcNoteElement.octave.abc = abcChar;
                } else {
                    abcNoteElement.octave.abc = abcNoteElement.octave.abc + abcChar;
                }

            } else {

                if(abcNoteElement.octave.startIndex != undefined && abcNoteElement.octave.endIndex == undefined){
                    abcNoteElement.octave.endIndex = selectionStart + i;
                    abcNoteElement.octave.endIndex = abcNoteElement.octave.endIndex - 1;

                    //Check for Octaves
                    for (var z = 0; z < $scope.octaveOptions.length; z++) {
                        if(abcNoteElement.octave.abc == $scope.octaveOptions[z].abc){
                            $scope.octaveOption = $scope.octaveOptions[z];
                        }
                    }
                }


                if (!isNaN(parseInt(abcChar)) || abcChar == "/" || abcChar == ">" || abcChar == "<"){

                    if (abcNoteElement.noteLength.startIndex  == undefined) {
                        abcNoteElement.noteLength.startIndex = selectionStart + i;
                        abcNoteElement.noteLength.abc = abcChar;
                    } else {
                        abcNoteElement.noteLength.abc = abcNoteElement.noteLength.abc + abcChar;
                    }
                }
            }
        }

        //EOF: Check for Octave
        if(abcNoteElement.octave.startIndex != undefined){
            for (var z = 0; z < $scope.octaveOptions.length; z++) {
                if(abcNoteElement.octave.abc == $scope.octaveOptions[z].abc){
                    abcNoteElement.octave.endIndex = abcNoteElement.octave.startIndex + abcNoteElement.octave.abc.length -1;
                    $scope.octaveOption = $scope.octaveOptions[z];
                }
            }
        }


        //EOF: Check for NoteLength
        if(abcNoteElement.noteLength.startIndex != undefined){
            for (var z = 0; z < $scope.noteLengthOptions.length; z++) {
                if(abcNoteElement.noteLength.abc == $scope.noteLengthOptions[z].abc){
                    abcNoteElement.noteLength.endIndex = abcNoteElement.noteLength.startIndex + abcNoteElement.noteLength.abc.length - 1;
                    $scope.noteLengthOption = $scope.noteLengthOptions[z];
                }
            }
        }

        $scope.abcSelection = abcSelection;
    };


    function initAbcNoteElement(){
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
                var index = abc.length - this.abc.length
                this.abc = abc;
                this.endSignIndex = this.startSignIndex + abc.length + 1;
                return index;

            },
            moveRight: function (index) {
                if(this.startSignIndex != undefined){
                    this.startSignIndex = this.startSignIndex + index;
                    this.endSignIndex = this.endSignIndex + index;
                }
            },
            moveLeft: function (index) {
                if(this.startIndex != undefined){
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
                if(this.startSignIndex != undefined){
                    this.startSignIndex = this.startSignIndex + index;
                    this.index = this.index + index;
                    this.endSignIndex = this.endSignIndex + index;
                }
            },
            moveLeft: function (index) {
                if(this.startSignIndex != undefined){
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
                var index = abc.length - this.abc.length
                this.abc = abc;
                this.endIndex = this.startIndex + abc.length - 1;
                return index;

            },
            moveRight: function (index) {
                if(this.startIndex != undefined){
                    this.startIndex = this.startIndex + index;
                    this.endIndex = this.endIndex + index;
                }
            },
            moveLeft: function (index) {
                if(this.startIndex != undefined){
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
                if(this.index != undefined){
                    this.index = this.index + index;
                }
            },
            moveLeft: function (index) {
                if(this.index != undefined){
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
                var index = abc.length - this.abc.length
                this.abc = abc;
                this.endIndex = this.startIndex + abc.length - 1;
                return index;

            },
            moveRight: function (index) {
                if(this.startIndex != undefined){
                    this.startIndex = this.startIndex + index;
                    this.endIndex = this.endIndex + index;
                }
            },
            moveLeft: function (index) {
                if(this.startIndex != undefined){
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
                var index = abc.length - this.abc.length
                this.abc = abc;
                this.endIndex = this.startIndex + abc.length - 1;
                return index;

            },
            moveRight: function (index) {
                if(this.startIndex != undefined){
                    this.startIndex = this.startIndex + index;
                    this.endIndex = this.endIndex + index;
                }
            },
            moveLeft: function (index) {
                if(this.startIndex != undefined){
                    this.startIndex = this.startIndex - index;
                    this.endIndex = this.endIndex - index;
                }
            }
        };

        abcNoteElement = {
            chordSymbol: chordSymbol,
            finger: finger,
            //graceNote: graceNote,     //todo: Umfang der GraceNotes bestimmen
            accidental: accidental,
            note: note,
            octave: octave,
            noteLength: noteLength,

            addChord: function (abc) {
                var startSignIndex, index;

                if(this.finger.startSignIndex != undefined){
                    startSignIndex = this.finger.startSignIndex;
                } else if(this.accidental.startIndex != undefined){
                    startSignIndex = this.accidental.startIndex;
                } else if(this.note.index != undefined){
                    startSignIndex = this.note.index;
                } else {
                    // abcElement ohne Note macht keinen Sinn
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

                if(index > 0){
                    // Move Right
                    this.finger.moveRight(index);
                    this.accidental.moveRight(index);
                    this.note.moveRight(index);
                    this.octave.moveRight(index);
                    this.noteLength.moveRight(index);

                } else if (index < 0){
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

                if(this.accidental.startIndex != undefined){
                    startSignIndex = this.accidental.startIndex;
                } else if(this.note.index != undefined){
                    startSignIndex = this.note.index;
                } else {
                    // abcElement ohne Note macht keinen Sinn
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

                if(this.note.index != undefined){
                    startIndex = this.note.index;
                } else {
                    // abcElement ohne Note macht keinen Sinn
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

                if(index > 0){
                    // Move Right
                    this.note.moveRight(index);
                    this.octave.moveRight(index);
                    this.noteLength.moveRight(index);

                } else if (index < 0){
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

                if(this.note.index != undefined){
                    startIndex = this.note.index + 1;
                } else {
                    // abcElement ohne Note macht keinen Sinn
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

                if(index > 0){
                    // Move Right
                    this.noteLength.moveRight(index);

                } else if (index < 0){
                    // Move Left
                    index = index * -1;
                    this.noteLength.moveLeft(index);
                }
            },
            addNoteLength: function (abc) {
                var startIndex, index;

                if(this.octave.index != undefined){
                    startIndex = this.octave.index + 1;
                } else if(this.note.index != undefined){
                    startIndex = this.note.index + 1;
                } else {
                    // abcElement ohne Note macht keinen Sinn
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

    function extractAbcElement(){

    }



    $scope.changeChord = function( chordOption ) {
        $scope.$emit('chordChange', chordOption);
    };

    $scope.changeFinger = function( fingerOption ) {
        $scope.$emit('fingerChange', fingerOption);
    };

    $scope.changeGraceNote = function( graceNoteOption ) {
        $scope.$emit('graceNoteChange', graceNoteOption);
    };

    $scope.changeAccidental = function( accidentalOption ) {
        $scope.$emit('accidentalChange', accidentalOption);
    };

    $scope.changeNote = function( noteOption ) {
        $scope.$emit('noteChange', noteOption);
    };

    $scope.changeOctave = function( octaveOption ) {
        $scope.$emit('octaveChange', octaveOption);
    };

    $scope.changeNoteLength = function( noteLengthOption ) {
        $scope.$emit('noteLengthChange', noteLengthOption);
    };


    function setChordOptions(){
        var chordOption, chordOptions;

        chordOptions = [];

        chordOption = {};
        chordOption.abc = "bm";
        chordOption.sort = "bm";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "B";
        chordOption.sort = "B";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "a#m";
        chordOption.sort = "a#m";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "A#";
        chordOption.sort = "A#";
        chordOptions.push(chordOption);


        chordOption = {};
        chordOption.abc = "am";
        chordOption.sort = "am";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "A";
        chordOption.sort = "A";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "g#m";
        chordOption.sort = "g#m";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "G#";
        chordOption.sort = "G#";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "gm";
        chordOption.sort = "gm";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "G";
        chordOption.sort = "G";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "f#m";
        chordOption.sort = "f#m";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "F#";
        chordOption.sort = "F#";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "fm";
        chordOption.sort = "fm";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "F";
        chordOption.sort = "F";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "em";
        chordOption.sort = "em";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "E";
        chordOption.sort = "E";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "d#m";
        chordOption.sort = "d#m";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "D#";
        chordOption.sort = "D#";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "dm";
        chordOption.sort = "dm";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "D";
        chordOption.sort = "D";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "c#m";
        chordOption.sort = "c#m";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "C#";
        chordOption.sort = "C#";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "cm";
        chordOption.sort = "cm";
        chordOptions.push(chordOption);

        chordOption = {};
        chordOption.abc = "C";
        chordOption.sort = "C";
        chordOptions.push(chordOption);

        // default: no selection
        chordOption = {};
        chordOption.abc = "--";
        chordOption.sort = "--";
        chordOptions.push(chordOption);

        $scope.chordOption = chordOption; // default
        $scope.chordOptions = chordOptions;
    }

    function setFingerOptions(){
        var fingerOption, fingerOptions;

        fingerOptions = [];

        fingerOption = {};
        fingerOption.abc = "1";
        fingerOptions.push(fingerOption);

        fingerOption = {};
        fingerOption.abc = "2";
        fingerOptions.push(fingerOption);

        fingerOption = {};
        fingerOption.abc = "3";
        fingerOptions.push(fingerOption);

        fingerOption = {};
        fingerOption.abc = "4";
        fingerOptions.push(fingerOption);

        fingerOption = {};
        fingerOption.abc = "5";
        fingerOptions.push(fingerOption);

        // default: no selection
        fingerOption = {};
        fingerOption.abc = "--";
        fingerOptions.push(fingerOption);

        $scope.fingerOption = fingerOption; // default
        $scope.fingerOptions = fingerOptions;
    }

    function setAccidentalOptions(){
        var accidentalOption, accidentalOptions;

        accidentalOptions = [];

        accidentalOption = {};
        accidentalOption.abc = "^^"; // 2 Sharps
        accidentalOption.sort = "^^";
        accidentalOptions.push(accidentalOption);

        accidentalOption = {};
        accidentalOption.abc = "^"; // 1 Sharp
        accidentalOption.sort = "^";
        accidentalOptions.push(accidentalOption);

        accidentalOption = {};
        accidentalOption.abc = "="; // Aufhebung
        accidentalOption.sort = "=";
        accidentalOptions.push(accidentalOption);

        accidentalOption = {};
        accidentalOption.abc = "_"; // 1 b
        accidentalOption.sort = "_";
        accidentalOptions.push(accidentalOption);

        accidentalOption = {};
        accidentalOption.abc = "__"; // 2 b
        accidentalOption.sort = "__";
        accidentalOptions.push(accidentalOption);

        // default: no selection
        accidentalOption = {};
        accidentalOption.abc = "--";
        accidentalOption.sort = "--";
        accidentalOptions.push(accidentalOption);

        $scope.accidentalOption = accidentalOption; // default
        $scope.accidentalOptions = accidentalOptions;
    }




    function setNoteOptions(){
        var noteOption, noteOptions;

        noteOptions = [];

        noteOption = {};
        noteOption.abc = "C";
        noteOption.frequency = "261.626";
        noteOptions.push(noteOption);

        noteOption = {};
        noteOption.abc = "D";
        noteOption.frequency = "293.665";
        noteOptions.push(noteOption);

        noteOption = {};
        noteOption.abc = "E";
        noteOption.frequency = "329.628";
        noteOptions.push(noteOption);

        noteOption = {};
        noteOption.abc = "F";
        noteOption.frequency = "349.228";
        noteOptions.push(noteOption);

        noteOption = {};
        noteOption.abc = "G";
        noteOption.frequency = "391.995";
        noteOptions.push(noteOption);

        noteOption = {};
        noteOption.abc = "A";
        noteOption.frequency = "440.000";
        noteOptions.push(noteOption);

        noteOption = {};
        noteOption.abc = "B";
        noteOption.frequency = "493.883";
        noteOptions.push(noteOption);

        noteOption = {};
        noteOption.abc = "c";
        noteOption.frequency = "523.251";
        noteOptions.push(noteOption);

        noteOption = {};
        noteOption.abc = "d";
        noteOption.frequency = "587.33";
        noteOptions.push(noteOption);

        noteOption = {};
        noteOption.abc = "e";
        noteOption.frequency = "659.255";
        noteOptions.push(noteOption);

        noteOption = {};
        noteOption.abc = "f";
        noteOption.frequency = "698.456";
        noteOptions.push(noteOption);

        noteOption = {};
        noteOption.abc = "g";
        noteOption.frequency = "783.991";
        noteOptions.push(noteOption);

        noteOption = {};
        noteOption.abc = "a";
        noteOption.frequency = "880.000";
        noteOptions.push(noteOption);

        noteOption = {};
        noteOption.abc = "b";
        noteOption.frequency = "987.767";
        noteOptions.push(noteOption);

        // default: no selection
        noteOption = {};
        noteOption.abc = "--";
        noteOption.frequency = "000.000";
        noteOptions.push(noteOption);

        $scope.noteOption = noteOption; // default
        $scope.noteOptions = noteOptions;
    }


    function setOctaveOptions(){
        var octaveOption, octaveOptions;

        octaveOptions = [];

        octaveOption = {};
        octaveOption.abc = "''"; // 2 Octaves up
        octaveOption.sort = "''";
        octaveOptions.push(octaveOption);

        octaveOption = {};
        octaveOption.abc = "'"; // 1 Octave up
        octaveOption.sort = "'";
        octaveOptions.push(octaveOption);

        octaveOption = {};
        octaveOption.abc = ","; // 1 Octave down
        octaveOption.sort = ",";
        octaveOptions.push(octaveOption);

        octaveOption = {};
        octaveOption.abc = ",,"; // 2 Octaves down
        octaveOption.sort = ",,";
        octaveOptions.push(octaveOption);

        // default: no selection
        octaveOption = {};
        octaveOption.abc = "--";
        octaveOption.sort = "--";
        octaveOptions.push(octaveOption);

        $scope.octaveOption = octaveOption; // default
        $scope.octaveOptions = octaveOptions;
    }

    function setNoteLengthOptions(){
        var noteLengthOption, noteLengthOptions;

        noteLengthOptions = [];

        noteLengthOption = {};
        noteLengthOption.abc = "2";
        noteLengthOptions.push(noteLengthOption);

        noteLengthOption = {};
        noteLengthOption.abc = "/2";
        noteLengthOptions.push(noteLengthOption);

        noteLengthOption = {};
        noteLengthOption.abc = "/";                 // short for /2
        noteLengthOptions.push(noteLengthOption);

        noteLengthOption = {};
        noteLengthOption.abc = "<";                 // short for /2, next note is 3/2
        noteLengthOptions.push(noteLengthOption);

        noteLengthOption = {};
        noteLengthOption.abc = ">";                 // short for 3/2, next note is /2
        noteLengthOptions.push(noteLengthOption);

        noteLengthOption = {};
        noteLengthOption.abc = "3/2";
        noteLengthOptions.push(noteLengthOption);

        noteLengthOption = {};
        noteLengthOption.abc = "3";
        noteLengthOptions.push(noteLengthOption);

        noteLengthOption = {};
        noteLengthOption.abc = "4";
        noteLengthOptions.push(noteLengthOption);

        noteLengthOption = {};
        noteLengthOption.abc = "/4";
        noteLengthOptions.push(noteLengthOption);

        noteLengthOption = {};
        noteLengthOption.abc = "//";                 // short for /4
        noteLengthOptions.push(noteLengthOption);

        noteLengthOption = {};
        noteLengthOption.abc = "5";
        noteLengthOptions.push(noteLengthOption);

        noteLengthOption = {};
        noteLengthOption.abc = "6";
        noteLengthOptions.push(noteLengthOption);

        noteLengthOption = {};
        noteLengthOption.abc = "7";
        noteLengthOptions.push(noteLengthOption);

        noteLengthOption = {};
        noteLengthOption.abc = "8";
        noteLengthOptions.push(noteLengthOption);

        noteLengthOption = {};
        noteLengthOption.abc = "/8";
        noteLengthOptions.push(noteLengthOption);

        noteLengthOption = {};
        noteLengthOption.abc = "///";                 // short for /8
        noteLengthOptions.push(noteLengthOption);

        // default: no selection
        noteLengthOption = {};
        noteLengthOption.abc = "--";
        noteLengthOptions.push(noteLengthOption);

        $scope.noteLengthOption = noteLengthOption; // default
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
            if ($scope.chordOptions[i].abc == "--"){
                // no selection
                $scope.chordOption = $scope.chordOptions[i];
            }
        }
    }

    function deselectFingerOptions() {
        for (var i = 0; i < $scope.fingerOptions.length; i++) {
            if ($scope.fingerOptions[i].abc == "--"){
                // no selection
                $scope.fingerOption = $scope.fingerOptions[i];
            }
        }
    }

    function deselectAccidentalOptions() {
        for (var i = 0; i < $scope.accidentalOptions.length; i++) {
            if ($scope.accidentalOptions[i].abc == "--"){
                // no selection
                $scope.accidentalOption = $scope.accidentalOptions[i];
            }
        }
    }

    function deselectNoteOptions() {
        for (var i = 0; i < $scope.noteOptions.length; i++) {
            if ($scope.noteOptions[i].abc == "--"){
                // no selection
                $scope.noteOption = $scope.noteOptions[i];
            }
        }
    }

    $scope.selectNoteOptions = function( abc ) {
        for (var i = 0; i < $scope.noteOptions.length; i++) {
            if ($scope.noteOptions[i].abc == abc){
                $scope.noteOption = $scope.noteOptions[i];
            }
        }
    };

    function deselectOctaveOptions() {
        for (var i = 0; i < $scope.octaveOptions.length; i++) {
            if ($scope.octaveOptions[i].abc == "--"){
                // no selection
                $scope.octaveOption = $scope.octaveOptions[i];
            }
        }
    }


    function deselectNoteLengthOptions() {
        for (var i = 0; i < $scope.noteLengthOptions.length; i++) {
            if ($scope.noteLengthOptions[i].abc == "--"){
                // no selection
                $scope.noteLengthOption = $scope.noteLengthOptions[i];
            }
        }
    }

});
