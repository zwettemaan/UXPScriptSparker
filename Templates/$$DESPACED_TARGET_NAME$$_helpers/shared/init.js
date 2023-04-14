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

$$SHORTCODE$$.sharedInitScript = function sharedInitScript() {

    do {
        try {

            $$SHORTCODE$$.C.APP_NAME = $$SHORTCODE$$.mapAppId($$SHORTCODE$$.C.APP_ID);

            $$SHORTCODE$$.dirs.DIR_HOME = 
                $$SHORTCODE$$.path.addTrailingSeparator($$SHORTCODE$$.dirs.RAW_HOME);

            $$SHORTCODE$$.dirs.DIR_TEMP = 
                $$SHORTCODE$$.path.addTrailingSeparator($$SHORTCODE$$.dirs.RAW_TEMP);

            $$SHORTCODE$$.dirs.DIR_DOCUMENTS = 
                $$SHORTCODE$$.dirs.DIR_HOME + 
                "Documents" + 
                $$SHORTCODE$$.path.SEPARATOR;

            $$SHORTCODE$$.dirs.DIR_ADOBE_SCRIPTS = 
                $$SHORTCODE$$.dirs.DIR_DOCUMENTS + 
                "Adobe Scripts" + 
                $$SHORTCODE$$.path.SEPARATOR;

            $$SHORTCODE$$.dirs.DIR_APP_SCRIPTS = 
                $$SHORTCODE$$.dirs.DIR_ADOBE_SCRIPTS + 
                $$SHORTCODE$$.C.APP_NAME + 
                $$SHORTCODE$$.path.SEPARATOR;
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);


}

})();
