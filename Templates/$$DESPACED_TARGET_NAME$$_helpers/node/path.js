//
// This code is exclusively Node.js. It provides Node-specific 
// implementations of the path API.
//
// path.js depends on these functions being implemented
// When adding new functionality here, make sure to also 
// add corresponding tests to the utils_verifyDependencies()
//

$$SHORTCODE$$.path.exists = function exists(filePath) {

    var retVal = false;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif
    do {
        try {
            
            if (! filePath) {
                break;
            }

            var lastChar = filePath.charAt(filePath.length - 1);
            if (lastChar == '/' || lastChar == '\\') {
                filePath = filePath.substr(0, filePath.length - 1);
            }

            var lstat = $$SHORTCODE$$.fs.lstatSync(filePath);
            retVal = true;
        }
        catch (err) {    
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.path.isDir = function isDir(folderPath) {

    var retVal = false;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif
    try {
        var lstat = $$SHORTCODE$$.fs.lstatSync(folderPath);
        retVal = lstat.isDirectory()
    }
    catch (err) {    
    }

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.path.mkdir = function mkdir(folderPath, separator) {

    var success = false;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif
    do {
        try {
            if (! folderPath) {
                $$SHORTCODE$$.logError(arguments, "no folderPath");
                break;
            }

            if ($$SHORTCODE$$.path.exists(folderPath)) {
                success = true;
                break;
            }

            var parentFolderPath = $$SHORTCODE$$.path.dirname(folderPath, separator);
            success = $$SHORTCODE$$.path.mkdir(parentFolderPath, separator);
            if (! success) {
                $$SHORTCODE$$.logError(arguments, "cannot create parent folder");
                break;
            }

            try {
                $$SHORTCODE$$.fs.mkdirSync(folderPath);
            }
            catch (err) {                
            }

            success = $$SHORTCODE$$.path.isDir(folderPath);
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws" + err);       
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif  
    return success;
}
