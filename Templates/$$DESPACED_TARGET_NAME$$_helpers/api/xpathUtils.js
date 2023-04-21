//
// This is the utils API. It is available in ExtendScript, CEP/JavaScript and UXPScript 
//

(function(){


function declareAPI() {

    if (! $$SHORTCODE$$.path) {
        $$SHORTCODE$$.path = {};
    }

    $$SHORTCODE$$.path.addTrailingSeparator = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.path.basename             = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.path.dirname              = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.path.exists               = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.path.filenameExtension    = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.path.isDir                = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.path.mkdir                = $$SHORTCODE$$.IMPLEMENTATION_MISSING;

}

//----------- Tests

if (! $$SHORTCODE$$.tests.path) {
    $$SHORTCODE$$.tests.path = {};
}

$$SHORTCODE$$.tests.path.basename = function test_basename() {

    var retVal = true;

    do {
        var expected;
        var filePath;

        expected = "kris";
        filePath = "/Users/kris";
        if (expected != $$SHORTCODE$$.path.basename(filePath)) {
            retVal = false;
        }

        expected = "kris";
        filePath = "/Users/kris/";
        if (expected != $$SHORTCODE$$.path.basename(filePath)) {
            retVal = false;
        }


    }
    while (false);

    return retVal;
}

$$SHORTCODE$$.tests.path.checkLowLevelPathFunctions = function checkLowLevelPathFunctions() {

    var retVal = false;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        
        try {

            if ($$SHORTCODE$$.isWindows) {

                // Directory
                if (! $$SHORTCODE$$.path.exists("/Users")) {
                    $$SHORTCODE$$.logError(arguments, "/Users should exist");
                    break;
                }

                // Directory with trailing separator
                if (! $$SHORTCODE$$.path.exists("/Users/")) {
                    $$SHORTCODE$$.logError(arguments, "/Users/ should exist");
                    break;
                }

                // Directory with spaces in the name
                if (! $$SHORTCODE$$.path.exists("/Application Support")) {
                    $$SHORTCODE$$.logError(arguments, "/Application Support should exist");
                    break;
                }

                // Directory with spaces in the name and trailing slash
                if (! $$SHORTCODE$$.path.exists("/Application Support/")) {
                    $$SHORTCODE$$.logError(arguments, "/Application Support/ should exist");
                    break;
                }

                // A file
                if (! $$SHORTCODE$$.path.exists("/etc/hosts")) {
                    $$SHORTCODE$$.logError(arguments, "/etc/hosts should exist");
                    break;
                }

                // A file with a trailing slash should not exist
                if ($$SHORTCODE$$.path.exists("/etc/hosts/")) {
                    $$SHORTCODE$$.logError(arguments, "/etc/hosts/ should not exist");
                    break;
                }

                // A non-existent file
                if ($$SHORTCODE$$.path.exists("/etc/file_does_not_exist_no_way.txt")) {
                    $$SHORTCODE$$.logError(arguments, "/etc/file_does_not_exist_no_way.txt should not exist");
                    break;
                }
            }

            if ($$SHORTCODE$$.isMac) {

                // Directory
                if (! $$SHORTCODE$$.path.exists("/Users")) {
                    $$SHORTCODE$$.logError(arguments, "/Users should exist");
                    break;
                }

                // Directory with trailing separator
                if (! $$SHORTCODE$$.path.exists("/Users/")) {
                    $$SHORTCODE$$.logError(arguments, "/Users/ should exist");
                    break;
                }

                // Directory with spaces in the name
                if (! $$SHORTCODE$$.path.exists("/Application Support")) {
                    $$SHORTCODE$$.logError(arguments, "/Application Support should exist");
                    break;
                }

                // Directory with spaces in the name and trailing slash
                if (! $$SHORTCODE$$.path.exists("/Application Support/")) {
                    $$SHORTCODE$$.logError(arguments, "/Application Support/ should exist");
                    break;
                }

                // A file
                if (! $$SHORTCODE$$.path.exists("/etc/hosts")) {
                    $$SHORTCODE$$.logError(arguments, "/etc/hosts should exist");
                    break;
                }

                // A file with a trailing slash should not exist
                if ($$SHORTCODE$$.path.exists("/etc/hosts/")) {
                    $$SHORTCODE$$.logError(arguments, "/etc/hosts/ should not exist");
                    break;
                }

                // A non-existent file
                if ($$SHORTCODE$$.path.exists("/etc/file_does_not_exist_no_way.txt")) {
                    $$SHORTCODE$$.logError(arguments, "/etc/file_does_not_exist_no_way.txt should not exist");
                    break;
                }
            }

            retVal = true;      
            $$SHORTCODE$$.logNote(arguments, "test passed");
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
            retVal = false;
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

//-------------------

declareAPI();

})();