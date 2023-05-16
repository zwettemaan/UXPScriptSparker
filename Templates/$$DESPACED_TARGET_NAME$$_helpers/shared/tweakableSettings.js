//
// Tweakable Settings
//

(function() {

$if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON_ENABLED"
$$SHORTCODE$$.S.LOG_LEVEL                     = $$SHORTCODE$$.C.LOG_TRACE;
$else
$$SHORTCODE$$.S.LOG_LEVEL                     = $$SHORTCODE$$.C.LOG_$$STARTUP_LOG_LEVEL$$;
$endif

$if $$LOG_TO_FILE_ON_DESKTOP$$ == "0"
$$SHORTCODE$$.S.LOG_TO_FILEPATH               = undefined; // file path or undefined
$else
$$SHORTCODE$$.S.LOG_TO_FILEPATH               = "~/Desktop/$$SHORTCODE$$_ScriptRun.log"; // undefined; // file path or undefined
$endif

$if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON_ENABLED"
$$SHORTCODE$$.S.LOG_ENTRY_EXIT                = true;
$else
$$SHORTCODE$$.S.LOG_ENTRY_EXIT                = false;
$endif

$$SHORTCODE$$.S.CRITICAL_LOG_FILE_ON_DESKTOP  = "criticalErrors.log";
$$SHORTCODE$$.S.LOG_TO_NODE_CONSOLE           = false; // Only useful in Node.js
$$SHORTCODE$$.S.LOG_TO_CHROME_CONSOLE         = false; // Only useful in CEP/ExtendScript
$$SHORTCODE$$.S.LOG_TO_ESTK_CONSOLE           = false; // Only useful in CEP/ExtendScript
$$SHORTCODE$$.S.LOG_TO_UXPDEVTOOL_CONSOLE     = false; // Only useful in UXPScript

$$SHORTCODE$$.S.LOG_CRITICAL_ERRORS           = false;

$if "$$RUN_TESTS$$" == "1"
$$SHORTCODE$$.S.RUN_TESTS                     = true;
$else
$$SHORTCODE$$.S.RUN_TESTS                     = false;
$endif

/* Add any global settings, defaults... here */

/* ... */

})();


