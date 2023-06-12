(function(){

$$SHORTCODE$$.sharedInitScript = function sharedInitScript() {

    do {
        try {

            if (! $$SHORTCODE$$.dirs.HOME) {
                $$SHORTCODE$$.criticalError("sharedInitScript needs dirs.HOME");
                break;
            }

            if (! $$SHORTCODE$$.dirs.TEMP) {
                $$SHORTCODE$$.criticalError("sharedInitScript needs dirs.TEMP");
                break;
            }

            // Do a quick check if the home directory is plausible

            if ($$SHORTCODE$$.isMac) {
                if (! $$SHORTCODE$$.path.exists($$SHORTCODE$$.dirs.HOME + "Library")) {
                    $$SHORTCODE$$.criticalError("Could not find ~/Library");
                    break;
                }
            }
            else {
                if (! $$SHORTCODE$$.path.exists($$SHORTCODE$$.dirs.HOME + "Application Data")) {
                    $$SHORTCODE$$.criticalError("Could not find ~/Application Data");
                    break;
                }
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

            $$SHORTCODE$$.dirs.ADOBE_SCRIPTS = 
                $$SHORTCODE$$.dirs.DOCUMENTS + 
                "Adobe Scripts" + 
                $$SHORTCODE$$.path.SEPARATOR;

            $$SHORTCODE$$.dirs.APP_SCRIPTS = 
                $$SHORTCODE$$.dirs.ADOBE_SCRIPTS + 
                $$SHORTCODE$$.C.APP_NAME + 
                $$SHORTCODE$$.path.SEPARATOR;

            if ($$SHORTCODE$$.checkMac()) {
                $$SHORTCODE$$.dirs.APPLICATION_SUPPORT = $$SHORTCODE$$.dirs.HOME + "Library/Application Support/"
                $$SHORTCODE$$.dirs.EXTENSIONS = $$SHORTCODE$$.dirs.APPLICATION_SUPPORT + "Adobe/CEP/extensions/";
                $$SHORTCODE$$.dirs.SYSTEM_PREFERENCES = $$SHORTCODE$$.dirs.HOME + "Library/";
                $$SHORTCODE$$.dirs.ADOBE_APPLICATION = "/Applications/Adobe " + $$SHORTCODE$$.C.APP_NAME + " " + $$SHORTCODE$$.C.VERSION_INDESIGN + "/";
            }
            else {
                $$SHORTCODE$$.dirs.APPLICATION_SUPPORT = $$SHORTCODE$$.dirs.HOME + "AppData\\Roaming\\"
                $$SHORTCODE$$.dirs.EXTENSIONS = $$SHORTCODE$$.dirs.APPLICATION_SUPPORT + "Adobe\\CEP\\extensions\\";
                $$SHORTCODE$$.dirs.SYSTEM_PREFERENCES = $$SHORTCODE$$.dirs.APPLICATION_SUPPORT;
                $$SHORTCODE$$.dirs.ADOBE_APPLICATION = "C:\\Program Files\\Adobe\\Adobe " + $$SHORTCODE$$.C.APP_NAME + " " + $$SHORTCODE$$.C.VERSION_INDESIGN + "\\";
            }

            $$SHORTCODE$$.dirs.PREFERENCES = 
                $$SHORTCODE$$.dirs.SYSTEM_PREFERENCES +
                $$SHORTCODE$$.C.DIRNAME_PREFERENCES +
                $$SHORTCODE$$.path.SEPARATOR;

        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);


}

})();