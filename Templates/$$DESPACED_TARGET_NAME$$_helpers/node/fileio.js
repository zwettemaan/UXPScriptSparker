if (! $$SHORTCODE$$.fileio) {
    $$SHORTCODE$$.fileio = {};
}

// No logging in these functions - they are themselves used by the logging functions

$$SHORTCODE$$.fileio.appendUTF8TextFile = function appendUTF8TextFile(filePath, text, handleNewLine) {

    var retVal;

    try {
        retVal = $$SHORTCODE$$.fs.appendFileSync(filePath, text + (handleNewLine ? "\n" : ""), { encoding: "utf8" });
    }
    catch (err) {       
    }
}

$$SHORTCODE$$.fileio.readUTF8TextFile = function readUTF8TextFile(filePath) {

    var retVal;

    try {
        retVal = $$SHORTCODE$$.fs.readFileSync(filePath,{ encoding: "utf8" });
    }
    catch (err) {        
    }

    return retVal;
}

$$SHORTCODE$$.fileio.writeUTF8TextFile = function writeUTF8TextFile(filePath, text, handleNewLine) {

    try {
        $$SHORTCODE$$.fs.writeFileSync(filePath, text + (handleNewLine ? "\n" : ""), { encoding: "utf8" });
    }
    catch (err) {        
    }
}
