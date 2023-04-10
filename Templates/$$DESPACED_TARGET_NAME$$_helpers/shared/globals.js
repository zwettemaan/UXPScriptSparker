(function() {

// Don't use 'var $$SHORTCODE$$' 
// Using var we might end up defining this in the wrong scope

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

if (! $$SHORTCODE$$.UXP) {
    $$SHORTCODE$$.UXP = require("uxp");
}

if (! $$SHORTCODE$$.C) {
    $$SHORTCODE$$.C = {}; // stash constants here   
}

$$SHORTCODE$$.C.DIRNAME_PREFERENCES  = "$$TARGET_DIRNAME$$";
$$SHORTCODE$$.C.FILENAME_PREFERENCES = "$$PREFS_FILENAME$$";

$$SHORTCODE$$.C.LOG_NONE                      = 0;
$$SHORTCODE$$.C.LOG_ERROR                     = 1;
$$SHORTCODE$$.C.LOG_WARN                      = 2;
$$SHORTCODE$$.C.LOG_NOTE                      = 3;
$$SHORTCODE$$.C.LOG_TRACE                     = 4;

/* Add any global constants */

})();


