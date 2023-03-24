//
// Tweakable Settings
//

// Don't use 'var $$SHORTCODE$$' - some engines call this within a non-global scope
// if using var we end up defining this in the wrong scope

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

if (! $$SHORTCODE$$.S) {
    $$SHORTCODE$$.S = {}; // stash global settings here
}

$$SHORTCODE$$.S.LOG_LEVEL                     = $$SHORTCODE$$.C.LOG_NONE;

$$SHORTCODE$$.S.LOG_TO_ESTK_CONSOLE           = false;
$$SHORTCODE$$.S.LOG_TO_FILEPATH               = undefined; // file path or undefined
$if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
$$SHORTCODE$$.S.LOG_ENTRY_EXIT                = true;
$else
$$SHORTCODE$$.S.LOG_ENTRY_EXIT                = false;
$endif

/* Add any global settings, defaults... here */
