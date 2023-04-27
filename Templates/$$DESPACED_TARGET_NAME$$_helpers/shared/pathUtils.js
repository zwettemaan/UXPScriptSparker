(function() {

if (! $$SHORTCODE$$.path) {
	$$SHORTCODE$$.path = {};
}

if (! $$SHORTCODE$$.tests.path) {
    $$SHORTCODE$$.tests.path = {};
}

$$SHORTCODE$$.path.REGEXP_KEEP_SLASH = /[^\/]*/g;
$$SHORTCODE$$.path.REGEXP_KEEP_BACKSLASH = /[^\\]*/g;

$$SHORTCODE$$.path.addTrailingSeparator = function addTrailingSeparator(filePath, separator) {

    var retVal = filePath;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        if (! filePath) {
            break;            
        }

        if (! separator) {
            separator = $$SHORTCODE$$.path.SEPARATOR;
        }

        if (separator == $$SHORTCODE$$.path.GUESS_SEPARATOR) {
            separator = $$SHORTCODE$$.path.guessSeparator(filePath);
        }

        var lastChar = filePath.substr(-1);        
        if (lastChar == separator) {
            break;
        }

        retVal += separator;
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
};

$$SHORTCODE$$.path.basename = function basename(filePath, separator) {
    
    var endSegment;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    if (! separator) {
        separator = $$SHORTCODE$$.path.SEPARATOR;
    }

    if (separator == $$SHORTCODE$$.path.GUESS_SEPARATOR) {
        separator = $$SHORTCODE$$.path.guessSeparator(filePath);
    }

    // toString() handles cases where filePath is an ExtendScript File/Folder object
    var splitPath = filePath.toString().split(separator);
    do {
        endSegment = splitPath.pop();   
    }
    while (splitPath.length > 0 && endSegment == "");

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return endSegment;
}

$$SHORTCODE$$.path.dirname = function dirname(filePath, separator) {
    
    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    if (! separator) {
        separator = $$SHORTCODE$$.path.SEPARATOR;
    }

    if (separator == $$SHORTCODE$$.path.GUESS_SEPARATOR) {
        separator = $$SHORTCODE$$.path.guessSeparator(filePath);
    }

    // toString() handles cases where filePath is an ExtendScript File/Folder object
    var splitPath = filePath.toString().split(separator);
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

$$SHORTCODE$$.path.filenameExtension = function filenameExtension(filePath) {
    
    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var splitName = $$SHORTCODE$$.path.basename(filePath).split(".");
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

$$SHORTCODE$$.path.guessSeparator = function addTrailingSeparator(filePath, likelySeparator) {

    var retVal = $$SHORTCODE$$.path.SEPARATOR;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        if (! filePath) {
            break;            
        }

        if (! likelySeparator) {
            likelySeparator = $$SHORTCODE$$.path.SEPARATOR;
        }

        var lastChar = filePath.substr(-1);        
        if (lastChar == $$SHORTCODE$$.path.SEPARATOR || lastChar == $$SHORTCODE$$.path.OTHER_PLATFORM_SEPARATOR) {
            retVal = lastChar;
            break;
        }

        var slashCount = filePath.replace($$SHORTCODE$$.path.REGEXP_KEEP_SLASH, "").length;
        var backSlashCount = filePath.replace($$SHORTCODE$$.path.REGEXP_KEEP_BACKSLASH, "").length;
        if (backSlashCount < slashCount) {
            retVal = "/";
        }
        else if (backSlashCount > slashCount) {
            retVal = "\\";
        }
        else if (likelySeparator != $$SHORTCODE$$.path.GUESS_SEPARATOR) {
            retVal = likelySeparator;
        }
        else {
            retVal = $$SHORTCODE$$.path.SEPARATOR;
        }

    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
};

})();
