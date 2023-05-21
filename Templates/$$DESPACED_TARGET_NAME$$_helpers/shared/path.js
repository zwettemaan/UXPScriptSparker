(function() {

if ($$SHORTCODE$$.checkMac()) {
    $$SHORTCODE$$.path.SEPARATOR = "/";
    $$SHORTCODE$$.path.OTHER_SEPARATOR = "\\";
    $$SHORTCODE$$.isLinux = false;
    $$SHORTCODE$$.isMac = true;
    $$SHORTCODE$$.isWindows = false;
}
else if ($$SHORTCODE$$.checkLinux()) {
    $$SHORTCODE$$.path.SEPARATOR = "/";
    $$SHORTCODE$$.path.OTHER_SEPARATOR = "\\";
    $$SHORTCODE$$.isLinux = true;
    $$SHORTCODE$$.isMac = false;
    $$SHORTCODE$$.isWindows = false;
}
else {
    $$SHORTCODE$$.path.SEPARATOR = "\\";
    $$SHORTCODE$$.path.OTHER_SEPARATOR = "/";
    $$SHORTCODE$$.isLinux = false;
    $$SHORTCODE$$.isMac = false;
    $$SHORTCODE$$.isWindows = true;
}

$$SHORTCODE$$.path.REGEXP_KEEP_SLASH = /[^\/]*/g;
$$SHORTCODE$$.path.REGEXP_KEEP_BACKSLASH = /[^\\]*/g;
$$SHORTCODE$$.path.DRIVE_LETTER = /[a-z]:/i;
$$SHORTCODE$$.path.GUESS_SEPARATOR = "?";
$$SHORTCODE$$.path.EITHER_SEPARATOR = "*";

$$SHORTCODE$$.path.addTrailingSeparator = function addTrailingSeparator(filePath, separator) {

    var retVal = filePath;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    
    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        var separators = "";
        if (! filePath) {
            break;            
        }

        if (! separator) {
            separator = $$SHORTCODE$$.path.EITHER_SEPARATOR;
        }

        if (separator == $$SHORTCODE$$.path.EITHER_SEPARATOR) {
            separators = $$SHORTCODE$$.path.SEPARATOR + $$SHORTCODE$$.path.OTHER_SEPARATOR;
            separator = $$SHORTCODE$$.path.guessSeparator(filePath);
        }
        else if (separator == $$SHORTCODE$$.path.GUESS_SEPARATOR) {
            separator = $$SHORTCODE$$.path.guessSeparator(filePath);
            separators = separator;
        }
        else {
            separators = separator
        }

        var lastChar = filePath.substr(-1);
        if (separators.indexOf(lastChar) >= 0) {
            break;
        }

        retVal += separator;
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
};

$$SHORTCODE$$.path.basename = function basename(filePath, separator) {
    
    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        try {

            var splitPath = $$SHORTCODE$$.path.splitPath(filePath, separator);
            if (! splitPath) {
                $$SHORTCODE$$.logError(arguments, "no splitPath");
                break;
            }

            var endSegment;
            do {
                endSegment = splitPath.pop();   
            }
            while (splitPath.length > 0 && endSegment == "");
            
            if (endSegment) {
                retVal = endSegment;        
            }
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.path.dirname = function dirname(filePath, separator) {
    
    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        try {

            var joinSeparator;
            if (separator == undefined || separator == $$SHORTCODE$$.path.EITHER_SEPARATOR) {
                joinSeparator = $$SHORTCODE$$.path.guessSeparator(filePath);
            }
            else if (separator == $$SHORTCODE$$.path.GUESS_SEPARATOR) { 
                separator = $$SHORTCODE$$.path.guessSeparator(filePath);
                joinSeparator = separator;
            }
            else {
                joinSeparator = separator;
            }

            var splitPath = $$SHORTCODE$$.path.splitPath(filePath, separator);
            if (! splitPath) {
                $$SHORTCODE$$.logError(arguments, "no splitPath");
                break;
            }

            do {
                var endSegment = splitPath.pop();   
            }
            while (splitPath.length > 0 && endSegment == "");

            if (splitPath.length == 0) {
                retVal = "";
            }
            else {
                retVal = splitPath.join(joinSeparator) + joinSeparator;
            }
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.path.filenameExtension = function filenameExtension(filePath) {
    
    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    var splitName = $$SHORTCODE$$.path.basename(filePath).split(".");
    var extension = "";
    if (splitName.length > 1) {
        extension = splitName.pop();
    }

    retVal = extension.toLowerCase();

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.path.guessSeparator = function guessSeparator(filePath, likelySeparator) {

    var retVal = $$SHORTCODE$$.path.SEPARATOR;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    
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

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
};

$$SHORTCODE$$.path.reduce = function reduce(filePath, separator) {
    
    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            var joinSeparator;
            if (separator == undefined || separator == $$SHORTCODE$$.path.EITHER_SEPARATOR) {
                joinSeparator = $$SHORTCODE$$.path.guessSeparator(filePath);
            }
            else if (separator == $$SHORTCODE$$.path.GUESS_SEPARATOR) { 
                separator = $$SHORTCODE$$.path.guessSeparator(filePath);
                joinSeparator = separator;
            }
            else {
                joinSeparator = separator;
            }

            var splitPath = $$SHORTCODE$$.path.splitPath(filePath, separator);
            if (! splitPath) {
                $$SHORTCODE$$.logError(arguments, "no splitPath");
                break;
            }

            var cleanSegments = [];
            for (var idx = 0; idx < splitPath.length; idx++) {
                do {
                    var segment = splitPath[idx];

                    if (segment == "..") {
                        if (cleanSegments.length > 0) {
                            cleanSegments.pop();
                            break;
                        }

                        cleanSegments.push(segment);
                        break;
                    }

                    if (! segment) {
                        // Only allow an empty segment at the beginning
                        if (cleanSegments.length == 0) {
                            cleanSegments.push(segment);
                        }
                        break;
                    }

                    // Make relative paths always start with "./"
                    // Ignore "." in the middle of the path
                    if (segment == ".") {
                        if (cleanSegments.length == 0) {
                            cleanSegments.push(segment);
                        }
                        break;
                    }
                    
                    if (cleanSegments.length == 0) {
                        if (separator == "\\" || separator == $$SHORTCODE$$.path.EITHER_SEPARATOR) {
                            // Consider "X:" to be a drive letter prefix
                            if (segment.match($$SHORTCODE$$.path.DRIVE_LETTER)) {
                                cleanSegments.push(segment);
                                break;
                            }
                        }

                        cleanSegments.push(".");
                    }

                    cleanSegments.push(segment);
                }
                while (false);
            }
        
            retVal = cleanSegments.join(joinSeparator);
        }
        catch (err) {  
            $$SHORTCODE$$.logError(arguments, "throws " + err);          
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.path.splitPath = function splitPath(filePath, separator) {
    
    var retVal;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {

        try {

            if (! filePath) {
                $$SHORTCODE$$.logError(arguments, "no filePath");
                break;
            }

            if (! separator) {
                separator = $$SHORTCODE$$.path.EITHER_SEPARATOR;
            }
        
            // toString() handles cases where filePath is an ExtendScript File/Folder object
            var filePath = filePath.toString();
            
            var splitPath;
            if (separator == $$SHORTCODE$$.path.EITHER_SEPARATOR) {
                var splitBySeparatorPath = filePath.toString().split($$SHORTCODE$$.path.SEPARATOR);
                splitPath = [];
                for (var idx = 0; idx < splitBySeparatorPath.length; idx++) {  
                    var subPath = splitBySeparatorPath[idx];
                    if (! subPath) {
                        if (splitPath.length == 0) {
                            splitPath.push(subPath);
                        }
                    }
                    else {
                        splitPath = 
                            splitPath.concat(
                                subPath.split($$SHORTCODE$$.path.OTHER_SEPARATOR));
                    }
                }
            }
            else {
                if (separator == $$SHORTCODE$$.path.GUESS_SEPARATOR) {
                    separator = $$SHORTCODE$$.path.guessSeparator(filePath);
                }
                splitPath = filePath.toString().split(separator);
            }

            retVal = splitPath;
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

})();
