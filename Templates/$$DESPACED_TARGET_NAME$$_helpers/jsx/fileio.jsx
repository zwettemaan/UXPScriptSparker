(function() {

if (! $$SHORTCODE$$.fileio) {
    $$SHORTCODE$$.fileio = {};
}

$$SHORTCODE$$.fileio.appendUTF8TextFile = function appendUTF8TextFile(filePath, str, isAddNewLine) {

    try {
        var textFile = File(filePath);
        textFile.open('a');
        textFile.encoding = 'UTF8';
        if (isAddNewLine) {
            textFile.writeln(str);
        }
        else {
            textFile.write(str);
        }
        textFile.close();
    }
    catch (err) {       
    }
}

$$SHORTCODE$$.fileio.readUTF8TextFile = function readUTF8TextFile(filePath) {

	var retVal = "";

    try {
        var textFile = File(filePath);
        textFile.open('r');
        textFile.encoding = 'UTF8';
        retVal = textFile.read();
        textFile.close();
    }
    catch (err) {        
    }

    return retVal;
}

$$SHORTCODE$$.fileio.writeUTF8TextFile = function writeUTF8TextFile(filePath, text, isAddNewLine) {

    try {
        var textFile = File(filePath);
        textFile.open('w');
        textFile.encoding = 'UTF8';
        if (isAddNewLine) {
            textFile.writeln(str);
        }
        else {
            textFile.write(str);
        }
        textFile.close();
    }
    catch (err) {        
    }
}

})();
