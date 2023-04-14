(function() {

function declareAPI() {

    $$SHORTCODE$$.C.APP_ID               = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
    $$SHORTCODE$$.C.APP_NAME             = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
    $$SHORTCODE$$.C.DIRNAME_PREFERENCES  = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
    $$SHORTCODE$$.C.FILENAME_PREFERENCES = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
    $$SHORTCODE$$.C.LOG_NONE             = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
    $$SHORTCODE$$.C.LOG_ERROR            = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
    $$SHORTCODE$$.C.LOG_WARN             = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
    $$SHORTCODE$$.C.LOG_NOTE             = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
    $$SHORTCODE$$.C.LOG_TRACE            = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;

}

//------------------- Tests

$$SHORTCODE$$.tests.checkGlobals = function checkGlobals() {

    var retVal = false;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        
        try {

            if (! $$SHORTCODE$$.C) {
                $$SHORTCODE$$.logError(arguments, "$$SHORTCODE$$.C should exist");
                break;
            }

            retVal = true;  
            for (var constantName in $$SHORTCODE$$.C) {
                if ($$SHORTCODE$$.C[constantName] == $$SHORTCODE$$.VALUE_NOT_INITIALIZED) {
                    $$SHORTCODE$$.logError(arguments, "$$SHORTCODE$$.C." + constantName + " should exist");
                    retVal = false;                    
                }
            }

            if (! retVal) {
                break;
            }

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

if (! $$SHORTCODE$$.C) {
    $$SHORTCODE$$.C = {}; // stash constants here   
}

if (! $$SHORTCODE$$.IMPLEMENTATION_MISSING) {
    $$SHORTCODE$$.IMPLEMENTATION_MISSING = function IMPLEMENTATION_MISSING() {
        $$SHORTCODE$$.logError("Implementation is missing");        
    };
}

if (! $$SHORTCODE$$.VALUE_NOT_INITIALIZED) {
    $$SHORTCODE$$.VALUE_NOT_INITIALIZED = { VALUE_NOT_INITIALIZED: true };
}

declareAPI();

})();


