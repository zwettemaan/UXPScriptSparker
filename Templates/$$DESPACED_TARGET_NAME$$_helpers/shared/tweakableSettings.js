//
// Tweakable Settings
//

(function() {

$$SHORTCODE$$.S.LOG_LEVEL                     = $$SHORTCODE$$.C.LOG_NONE;

$$SHORTCODE$$.S.LOG_TO_FILEPATH               = undefined; // file path or undefined
$if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
$$SHORTCODE$$.S.LOG_ENTRY_EXIT                = true;
$else
$$SHORTCODE$$.S.LOG_ENTRY_EXIT                = false;
$endif

$$SHORTCODE$$.S.LOG_TO_CHROME_CONSOLE         = false; // Only useful in CEP/ExtendScript
$$SHORTCODE$$.S.LOG_TO_ESTK_CONSOLE           = false; // Only useful in CEP/ExtendScript
$$SHORTCODE$$.S.LOG_TO_UXPDEVTOOL_CONSOLE     = false; // Only useful in UXPScript

$$SHORTCODE$$.S.LOG_CRITICAL_ERRORS           = false;

$$SHORTCODE$$.S.RUN_TESTS                     = true;

/* Add any global settings, defaults... here */

/* ... */

})();


