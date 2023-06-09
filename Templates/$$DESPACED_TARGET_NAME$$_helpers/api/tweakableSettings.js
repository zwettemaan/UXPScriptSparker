﻿$$SHORTCODE$$.S.LOG_ENTRY_EXIT                = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
$$SHORTCODE$$.S.LOG_CRITICAL_ERRORS           = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
$$SHORTCODE$$.S.LOG_LEVEL                     = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
$$SHORTCODE$$.S.LOG_TO_NODE_CONSOLE           = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
$$SHORTCODE$$.S.LOG_TO_CHROME_CONSOLE         = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
$$SHORTCODE$$.S.LOG_TO_ESTK_CONSOLE           = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
$$SHORTCODE$$.S.LOG_TO_UXPDEVTOOL_CONSOLE     = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
$$SHORTCODE$$.S.RUN_TESTS                     = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;

//--------------- Tests

$$SHORTCODE$$.tests.checkTweakableSettings = function test_checkTweakableSettings() {

    var retVal = false;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        
        try {

            if (! $$SHORTCODE$$.S) {
                $$SHORTCODE$$.logError(arguments, "$$SHORTCODE$$.S should exist");
                break;
            }

            retVal = true;  
            for (var settingName in $$SHORTCODE$$.S) {
                if ($$SHORTCODE$$.S[settingName] == $$SHORTCODE$$.VALUE_NOT_INITIALIZED) {
                    $$SHORTCODE$$.logError(arguments, "$$SHORTCODE$$.S." + settingName + " should exist");
                    retVal = false;                    
                }
            }

            if (! retVal) {
                break;
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
