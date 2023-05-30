//
// This is the fileio API. It is available in ExtendScript, CEP/JavaScript and UXPScript 
//

if (! $$SHORTCODE$$.fileio) {
    $$SHORTCODE$$.fileio = {};
}

// Symbolic constants for text file IO functions

$$SHORTCODE$$.fileio.FILEIO_APPEND_NEWLINE      = "APPEND_NL";
$$SHORTCODE$$.fileio.FILEIO_DONT_APPEND_NEWLINE = "DONT_APPEND_NL";

/**
* Append some text to a text file. If the file does not exist, it is created.
* This function is async in idjs, but sync in ExtendScript and Node/JS
* 
* @function $$SHORTCODE$$.fileio.appendUTF8TextFile
* 
* @param {string} filePath - location of file
* @param {string} text - data to append to file
* @param {string} handleNewLine - either $$SHORTCODE$$.fileio.FILEIO_APPEND_NEWLINE or $$SHORTCODE$$.fileio.FILEIO_DONT_APPEND_NEWLINE
*/

$$SHORTCODE$$.fileio.appendUTF8TextFile = function(filePath, text, handleNewLine) { return $$SHORTCODE$$.IMPLEMENTATION_MISSING; };

/**
* Read a text file into memory. If the file does not exist, "" is returned.
* This function is async in idjs, but sync in ExtendScript and Node/JS
* 
* @function $$SHORTCODE$$.fileio.readUTF8TextFile
* 
* @param {string} filePath - location of file
* @return {string} file contents
*/

$$SHORTCODE$$.fileio.readUTF8TextFile = function(filePath) { return $$SHORTCODE$$.IMPLEMENTATION_MISSING; };

/**
* Write out a string. 
* This function is async in idjs, but sync in ExtendScript and Node/JS
* 
* @function $$SHORTCODE$$.fileio.writeUTF8TextFile
* 
* @param {string} filePath - location of file
* @param {string} text - data to append to file
* @param {string} handleNewLine - either $$SHORTCODE$$.fileio.FILEIO_APPEND_NEWLINE or $$SHORTCODE$$.fileio.FILEIO_DONT_APPEND_NEWLINE
*/

$$SHORTCODE$$.fileio.writeUTF8TextFile = function(filePath, text, handleNewLine) { return $$SHORTCODE$$.IMPLEMENTATION_MISSING; };

//----------- Tests

if (! $$SHORTCODE$$.tests.fileio) {
    $$SHORTCODE$$.tests.fileio = {};
}
