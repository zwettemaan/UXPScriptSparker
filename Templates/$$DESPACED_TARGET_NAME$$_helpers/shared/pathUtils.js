(function() {

if (! $$SHORTCODE$$.path) {
	$$SHORTCODE$$.path = {};
}

if (! $$SHORTCODE$$.tests.path) {
    $$SHORTCODE$$.tests.path = {};
}

$$SHORTCODE$$.path.addTrailingSeparator = function addTrailingSeparator(filePath, separator) {

    var retVal = filePath;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        if (! filePath) {
            break;            
        }

        var lastChar = filePath.substr(-1);        
        if (lastChar == $$SHORTCODE$$.path.SEPARATOR || lastChar == $$SHORTCODE$$.path.OTHER_PLATFORM_SEPARATOR) {
            break;
        }

        if (! separator) {
            separator = $$SHORTCODE$$.path.SEPARATOR;
        }

        retVal += separator;
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
};

$$SHORTCODE$$.path.basename = function basename(filepath, separator) {
    
    var endSegment;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    if (! separator) {
        separator = $$SHORTCODE$$.path.SEPARATOR;
    }

    // toString() handles cases where filepath is an ExtendScript File/Folder object
    var splitPath = filepath.toString().split(separator);
    do {
        endSegment = splitPath.pop();   
    }
    while (splitPath.length > 0 && endSegment == "");

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return endSegment;
}

$$SHORTCODE$$.path.dirname = function dirname(filepath, separator) {
    
    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    if (! separator) {
        separator = $$SHORTCODE$$.path.SEPARATOR;
    }

    // toString() handles cases where filepath is an ExtendScript File/Folder object
    var splitPath = filepath.toString().split(separator);
    do {
        var endSegment = splitPath.pop();   
    }
    while (splitPath.length > 0 && endSegment == "");

    retVal = splitPath.join(separator);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.path.filenameExtension = function filenameExtension(filepath) {
    
    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var splitName = $$SHORTCODE$$.path.basename(filepath).split(".");
    var extension = "";
    if (splitName.length > 1) {
        extension = splitName.pop();
    }

    retVal = extension.toLowerCase();

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

})();
