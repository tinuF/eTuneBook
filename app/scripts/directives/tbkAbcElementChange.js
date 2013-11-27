'use strict';

/**
 *
 */
angular.module('eTuneBookApp').directive('tbkAbcElementChange', function(eTuneBookService) {
    return {
        require: '?ngModel',
        link: function(scope, element, attr, ngModel) {

            scope.$on('chordChange', function(event, chordOption){
                if(scope.abcSelection.abcNoteElement.chordSymbol.startSignIndex == undefined){
                    // Generate Chord
                    // Insert Chord on abcNoteElement
                    scope.abcSelection.abcNoteElement.addChord(chordOption.abc);
                    // Insert Chord in Textarea
                    var abc = element[0].value.slice(0,scope.abcSelection.abcNoteElement.chordSymbol.startSignIndex);
                    abc = abc + '"' + chordOption.abc + '"';
                    abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.chordSymbol.startSignIndex);
                } else {
                    if(chordOption.abc == "--"){
                        // Delete Chord
                        // Delete Chord in Textarea
                        var abc = element[0].value.slice(0,scope.abcSelection.abcNoteElement.chordSymbol.startSignIndex);
                        abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.chordSymbol.endSignIndex + 1);

                        // Delete Chord on abcNoteElement
                        scope.abcSelection.abcNoteElement.deleteChord();
                    } else {
                        // Change Chord
                        // Change Chord in Textarea
                        var abc = element[0].value.slice(0,scope.abcSelection.abcNoteElement.chordSymbol.startSignIndex);
                        abc = abc + '"' + chordOption.abc + '"';
                        abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.chordSymbol.endSignIndex + 1);
                        // Change Chord on abcNoteElement
                        scope.abcSelection.abcNoteElement.changeChord(chordOption.abc);
                    }
                }
                update(abc);
            });


            scope.$on('fingerChange', function(event, fingerOption){
                if(scope.abcSelection.abcNoteElement.finger.index == undefined){
                    // Generate Fingering
                    // Insert Finger on abcNoteElement
                    scope.abcSelection.abcNoteElement.addFinger(fingerOption.abc);
                    // Insert Finger in Textarea
                    var abc = element[0].value.slice(0,scope.abcSelection.abcNoteElement.finger.startSignIndex);
                    abc = abc + "!" + fingerOption.abc + "!";
                    abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.finger.startSignIndex);
                } else {
                    if(fingerOption.abc == "--"){
                        // Delete Fingering
                        // Delete Finger in Textarea
                        var abc = element[0].value.slice(0,scope.abcSelection.abcNoteElement.finger.startSignIndex); //start-!
                        abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.finger.endSignIndex + 1); //end-!

                        // Delete Finger on abcNoteElement
                        scope.abcSelection.abcNoteElement.deleteFinger();
                    } else {
                        // Change Fingering
                        // Change Finger in Textarea
                        var abc = element[0].value.slice(0,scope.abcSelection.abcNoteElement.finger.index);
                        abc = abc + fingerOption.abc;
                        abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.finger.index + 1);
                        // Change Finger on abcNoteElement
                        scope.abcSelection.abcNoteElement.changeFinger(fingerOption.abc);
                   }
                }
                update(abc);
            });

            scope.$on('accidentalChange', function(event, accidentalOption){
                if(scope.abcSelection.abcNoteElement.accidental.startIndex == undefined){
                    // Generate Accidental
                    // Insert Accidental on abcNoteElement
                    scope.abcSelection.abcNoteElement.addAccidental(accidentalOption.abc);
                    // Insert Accidental in Textarea
                    var abc = element[0].value.slice(0,scope.abcSelection.abcNoteElement.accidental.startIndex);
                    abc = abc + accidentalOption.abc;
                    abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.accidental.startIndex);
                } else {
                    if(accidentalOption.abc == "--"){
                        // Delete Accidental
                        // Delete Accidental in Textarea
                        var abc = element[0].value.slice(0,scope.abcSelection.abcNoteElement.accidental.startIndex);
                        abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.accidental.endIndex + 1);

                        // Delete Accidental on abcNoteElement
                        scope.abcSelection.abcNoteElement.deleteAccidental();
                    } else {
                        // Change Accidental
                        // Change Accidental in Textarea
                        var abc = element[0].value.slice(0,scope.abcSelection.abcNoteElement.accidental.startIndex);
                        abc = abc + accidentalOption.abc;
                        abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.accidental.endIndex + 1);
                        // Change Accidental on abcNoteElement
                        scope.abcSelection.abcNoteElement.changeAccidental(accidentalOption.abc);
                    }
                }
                update(abc);
            });


            scope.$on('noteChange', function(event, noteOption){
                if(scope.abcSelection.abcNoteElement.note.index == undefined){
                    // Generate Note
                    // Insert Note on abcNoteElement
                    //scope.abcSelection.abcNoteElement.addNote(noteOption.abc);
                    // Insert Note in Textarea
                    //var abc = element[0].value.slice(0,scope.abcSelection.abcNoteElement.note.index);
                    //abc = abc + noteOption.abc;
                    //abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.note.index);
                } else {
                    if(noteOption.abc == "--"){
                        // Delete Note
                        // Delete Note in Textarea
                        //var abc = element[0].value.slice(0,scope.abcSelection.abcNoteElement.note.index);
                        //abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.note.index + 1);

                        // Delete Note on abcNoteElement
                        //scope.abcSelection.abcNoteElement.deleteNote();
                        alert("Note cannot be deleted!");
                        // Zurückstellen auf ursprüngliche Note
                        scope.selectNoteOptions(scope.abcSelection.abcNoteElement.note.abc);
                    } else {
                        // Change Note
                        // Change Note in Textarea
                        var abc = element[0].value.slice(0,scope.abcSelection.abcNoteElement.note.index);
                        abc = abc + noteOption.abc;
                        abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.note.index + 1);
                        // Change Note on abcNoteElement
                        scope.abcSelection.abcNoteElement.changeNote(noteOption.abc);

                        update(abc);
                    }
                }


            });

            scope.$on('octaveChange', function(event, octaveOption){
                if(scope.abcSelection.abcNoteElement.octave.startIndex == undefined){
                    // Generate Octave
                    // Insert Octave on abcNoteElement
                    scope.abcSelection.abcNoteElement.addOctave(octaveOption.abc);
                    // Insert Octave in Textarea
                    var abc = element[0].value.slice(0,scope.abcSelection.abcNoteElement.octave.startIndex);
                    abc = abc + octaveOption.abc;
                    abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.octave.startIndex);
                } else {
                    if(octaveOption.abc == "--"){
                        // Delete Octave
                        // Delete Octave in Textarea
                        var abc = element[0].value.slice(0,scope.abcSelection.abcNoteElement.octave.startIndex);
                        abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.octave.endIndex + 1);

                        // Delete Octave on abcNoteElement
                        scope.abcSelection.abcNoteElement.deleteOctave();
                    } else {
                        // Change Octave
                        // Change Octave in Textarea
                        var abc = element[0].value.slice(0,scope.abcSelection.abcNoteElement.octave.startIndex);
                        abc = abc + octaveOption.abc;
                        abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.octave.endIndex + 1);
                        // Change octave on abcNoteElement
                        scope.abcSelection.abcNoteElement.changeOctave(octaveOption.abc);
                    }
                }
                update(abc);
            });

            scope.$on('noteLengthChange', function(event, noteLengthOption){
                if(scope.abcSelection.abcNoteElement.noteLength.startIndex == undefined){
                    // Generate NoteLength
                    // Insert NoteLength on abcNoteElement
                    scope.abcSelection.abcNoteElement.addNoteLength(noteLengthOption.abc);
                    // Insert NoteLength in Textarea
                    var abc = element[0].value.slice(0,scope.abcSelection.abcNoteElement.noteLength.startIndex);
                    abc = abc + noteLengthOption.abc;
                    abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.noteLength.startIndex);
                } else {
                    if(noteLengthOption.abc == "--"){
                        // Delete NoteLength
                        // Delete NoteLength in Textarea
                        var abc = element[0].value.slice(0,scope.abcSelection.abcNoteElement.noteLength.startIndex);
                        abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.noteLength.endIndex + 1);

                        // Delete NoteLength on abcNoteElement
                        scope.abcSelection.abcNoteElement.deleteNoteLength();
                    } else {
                        // Change NoteLength
                        // Change NoteLength in Textarea
                        var abc = element[0].value.slice(0,scope.abcSelection.abcNoteElement.noteLength.startIndex);
                        abc = abc + noteLengthOption.abc;
                        abc = abc + element[0].value.slice(scope.abcSelection.abcNoteElement.noteLength.endIndex + 1);
                        // Change NoteLength on abcNoteElement
                        scope.abcSelection.abcNoteElement.changeNoteLength(noteLengthOption.abc);
                    }
                }
                update(abc);
            });



            function update(abc){
                //Trigger dots redraw
                element[0].value = abc;
                element.change();
                //Trigger model update and save
                ngModel.$setViewValue(abc);
                eTuneBookService.storeTuneBookAbc();
            }
        }
    };
});