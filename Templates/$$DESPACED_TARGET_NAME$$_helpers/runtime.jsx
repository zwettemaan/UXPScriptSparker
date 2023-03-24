var dreamweaver;
var app;

var $$SHORTCODE$$;
if (! $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

$$SHORTCODE$$.LOG_CRITICAL_ERRORS = false;

$$SHORTCODE$$.relativeFilePathsToLoad = [
    "$$DESPACED_TARGET_NAME$$_helpers/json2.jsx",
    "$$DESPACED_TARGET_NAME$$_helpers/globals.jsx",
    "$$DESPACED_TARGET_NAME$$_helpers/tweakableSettings.jsx",
    "$$DESPACED_TARGET_NAME$$_helpers/utils.jsx",
    "$$DESPACED_TARGET_NAME$$_helpers/pathUtils.jsx",
    "$$DESPACED_TARGET_NAME$$_helpers/init.jsx"
];

$$SHORTCODE$$.errorBeforeLoggingAvailable = function(error) {

    if ($$SHORTCODE$$.logError) {
        $$SHORTCODE$$.logError(error);
    }
    else if ($$SHORTCODE$$.LOG_CRITICAL_ERRORS) {

        try {

            var f = File(Folder.desktop + "/criticalErrors.log");
            f.open("a");
            f.writeln(error);
            f.close();

        }
        catch (err) {

            try {
                console.log(error);
            }
            catch (err) {   
            }

        }
    }
}

if (dreamweaver) {

    $$SHORTCODE$$.loadScript = function(extensionDir, scriptPath) {
        try {
            var fullPath = extensionDir + scriptPath;
            var script = DWfile.read(fullPath);
            eval(script);
        }
        catch (err) {           
            $$SHORTCODE$$.errorBeforeLoggingAvailable("runtime.jsx loadScript throws " + err + " for " + fullPath);  
        }
    }

}
else {

    $$SHORTCODE$$.loadScript = function(extensionDir, scriptPath) {
        try {
            var fullPath = extensionDir + scriptPath;
            var file = File(fullPath);
            file.open("r");
            var script = file.read();
            file.close();
            eval(script);
        }
        catch (err) {           
            $$SHORTCODE$$.errorBeforeLoggingAvailable("runtime.jsx loadScript throws " + err + " for " + fullPath);  
        }
    }

}

$$SHORTCODE$$.initScript = function initScript() {

    var scriptDir = File($.fileName).parent.parent + "/";

    for (var idx = 0; idx < $$SHORTCODE$$.relativeFilePathsToLoad.length; idx++) {
        var filePath = $$SHORTCODE$$.relativeFilePathsToLoad[idx];
        $$SHORTCODE$$.loadScript(scriptDir, filePath);
    }

}

