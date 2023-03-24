// Don't use 'var $$SHORTCODE$$' - some engines call this within a non-global scope
// if using var we end up defining this in the wrong scope

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

if ($$SHORTCODE$$.checkMac()) {
    $$SHORTCODE$$.path.SEPARATOR = "/";
    $$SHORTCODE$$.isMac = true;
    $$SHORTCODE$$.isWindows = false;
}
else {
    $$SHORTCODE$$.path.SEPARATOR = "\\";
    $$SHORTCODE$$.isMac = false;
    $$SHORTCODE$$.isWindows = true;
}

if (! $$SHORTCODE$$.dirs) {
    $$SHORTCODE$$.dirs = {};
}

