(function() {

function declareAPI() {

    $$SHORTCODE$$.C.LOG_NONE             = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
    $$SHORTCODE$$.C.LOG_ERROR            = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
    $$SHORTCODE$$.C.LOG_WARN             = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
    $$SHORTCODE$$.C.LOG_NOTE             = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
    $$SHORTCODE$$.C.LOG_TRACE            = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;

}

if (! $$SHORTCODE$$.S) {
    $$SHORTCODE$$.S = {};
}

if (! $$SHORTCODE$$.C) {
    $$SHORTCODE$$.C = {};
}

if (! $$SHORTCODE$$.IMPLEMENTATION_MISSING) {
    $$SHORTCODE$$.IMPLEMENTATION_MISSING = function IMPLEMENTATION_MISSING() {
        $$SHORTCODE$$.logError("Implementation is missing");        
    };
}

if (! $$SHORTCODE$$.VALUE_NOT_INITIALIZED) {
    $$SHORTCODE$$.VALUE_NOT_INITIALIZED = { VALUE_NOT_INITIALIZED: true };
}

if (! $$SHORTCODE$$.tests) {
    $$SHORTCODE$$.tests = {};
}

if (! $$SHORTCODE$$.dirs) {
    $$SHORTCODE$$.dirs = {};
}

declareAPI();

//------------------- Tests

$$SHORTCODE$$.tests.checkGlobals = function tests_checkGlobals() {

    var retVal = false;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

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
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
            retVal = false;
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

})();


