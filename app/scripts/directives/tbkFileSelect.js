'use strict';

/**
 * If the choosen File has changed: Read the new File and import it to eTuneBook.
 */
angular.module('eTuneBookApp').directive('tbkFileSelect', function() {
  return function( scope, elem, attrs ) {
    elem.bind('change', function(evt) {
		var files = evt.target.files; // FileList object

		// files is a FileList of File objects
		for (var i = 0, f; f = files[i]; i++) {
			var fileName = escape(f.name);			
		
			//Get file extension from fileName
			var ext = fileName.replace(/^.*?\.([a-zA-Z0-9]+)$/, "$1");
		
			if (ext != "abc" && ext != "ABC" ){
				alert("eTuneBook only accepts files with extension .abc or .ABC");
			
			} else {
				// Only process abc files
				var reader = new FileReader();
				
				// Closure to capture the file information.
				reader.onload = (function(theFile) {
					return function(e) {
						// Render TuneBook
						var abc = this.result;
						
						try {
							// import tunebook
							scope.importTuneBook(abc, fileName);
						
						} catch(e) {
							
							alert("eTuneBook cannot import " + fileName + " due to: " + e.toString());
						
						} finally {
							// notify angular of the change
							scope.$apply();
						}
					};
				})(f);

				// Read the File
				reader.readAsText(f);
			}  		
		}
    });
  };
});
