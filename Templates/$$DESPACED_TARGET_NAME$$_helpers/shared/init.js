(function() {

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
$$SHORTCODE$$.path.GUESS_SEPARATOR = "?";

$$SHORTCODE$$.sharedInitScript = function sharedInitScript() {

    do {
        try {

            $$SHORTCODE$$.C.APP_NAME = $$SHORTCODE$$.mapAppId($$SHORTCODE$$.C.APP_ID);

            if (! $$SHORTCODE$$.dirs.HOME) {
                $$SHORTCODE$$.criticalError("sharedInitScript needs dirs.HOME");
                break;
            }

            if (! $$SHORTCODE$$.dirs.TEMP) {
                $$SHORTCODE$$.criticalError("sharedInitScript needs dirs.TEMP");
                break;
            }

            if (! $$SHORTCODE$$.dirs.DESKTOP) {
                $$SHORTCODE$$.dirs.DESKTOP = 
                    $$SHORTCODE$$.dirs.HOME + 
                    "Desktop" + 
                    $$SHORTCODE$$.path.SEPARATOR;
            }


            if (! $$SHORTCODE$$.dirs.DOCUMENTS) {
                $$SHORTCODE$$.dirs.DOCUMENTS = 
                    $$SHORTCODE$$.dirs.HOME + 
                    "Documents" + 
                    $$SHORTCODE$$.path.SEPARATOR;
            }

            if (! $$SHORTCODE$$.dirs.ADOBE_SCRIPTS) {
                $$SHORTCODE$$.dirs.ADOBE_SCRIPTS = 
                    $$SHORTCODE$$.dirs.DOCUMENTS + 
                    "Adobe Scripts" + 
                    $$SHORTCODE$$.path.SEPARATOR;
            }

            if (! $$SHORTCODE$$.dirs.APP_SCRIPTS) {
                $$SHORTCODE$$.dirs.APP_SCRIPTS = 
                    $$SHORTCODE$$.dirs.ADOBE_SCRIPTS + 
                    $$SHORTCODE$$.C.APP_NAME + 
                    $$SHORTCODE$$.path.SEPARATOR;
            }
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);


}

})();
