(function() {

// Don't use `var $$SHORTCODE$$`
// By using `var` we will end up defining this in the wrong scope

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

$$SHORTCODE$$.relativeFilePathsToLoad = [

    "../shared/appMapper.js",

    "../api/globals.js",
    "../shared/globals.js",
    "./api/globals.jsx",
    "./globals.jsx",

    "../api/tweakableSettings.js",
    "../shared/tweakableSettings.js",

    "../api/utils.js",
    "../shared/utils.js",
    "./utils.jsx",

    "../api/path.js",
    "../shared/path.js",
    "./path.jsx",

    "../api/fileio.js",
    "../shared/fileio.js",
    "./fileio.jsx",
    
    "../api/idDOM.js",
    "./idDOM.jsx",

    "../api/compat.js",
    "./compat.jsx",

    "./promiscuous-browser.jsx",

    "../shared/init.js",
    "../../$$DESPACED_TARGET_NAME$$.js"
];

if (! $$SHORTCODE$$.S) {
    $$SHORTCODE$$.S = {};
}

if (! $$SHORTCODE$$.C) {
    $$SHORTCODE$$.C = {};
}

if (! $$SHORTCODE$$.IMPLEMENTATION_MISSING) {
    $$SHORTCODE$$.IMPLEMENTATION_MISSING = function IMPLEMENTATION_MISSING() {
        $$SHORTCODE$$.logError("Implementation is missing");        
    };
}

if (! $$SHORTCODE$$.VALUE_NOT_INITIALIZED) {
    $$SHORTCODE$$.VALUE_NOT_INITIALIZED = { VALUE_NOT_INITIALIZED: true };
}

if (! $$SHORTCODE$$.tests) {
    $$SHORTCODE$$.tests = {};
}

$$SHORTCODE$$.initDirsScript = function initDirsScript() {

    var retVal = false;

    do {
        try {

            if (! $$SHORTCODE$$.dirs) {
                $$SHORTCODE$$.dirs = {};
            }

            $$SHORTCODE$$.dirs.HOME = $$SHORTCODE$$.path.addTrailingSeparator(Folder("~").fsName);
            $$SHORTCODE$$.dirs.DESKTOP = $$SHORTCODE$$.path.addTrailingSeparator(Folder.desktop.fsName);
            $$SHORTCODE$$.dirs.TEMP = $$SHORTCODE$$.path.addTrailingSeparator(Folder.temp.fsName);


            if ($$SHORTCODE$$.isMac) {
                $$SHORTCODE$$.dirs.DRIVE_PREFIX = "";
            }
            else {
                var splitHomePath = $$SHORTCODE$$.dirs.HOME.split($$SHORTCODE$$.path.SEPARATOR);
                if (splitHomePath.length > 0) {
                    $$SHORTCODE$$.dirs.DRIVE_PREFIX = splitHomePath[0] + $$SHORTCODE$$.path.SEPARATOR;
                }
            }

        }
        catch (err) { 
            $$SHORTCODE$$.criticalError("initScript throws " + err);
        }
    }
    while (false);
}

$$SHORTCODE$$.criticalError = function criticalError(error) {

    if ($$SHORTCODE$$.logError) {
        $$SHORTCODE$$.logError(error);
    }
    
    if ($$SHORTCODE$$.S.LOG_CRITICAL_ERRORS && $$SHORTCODE$$.S.CRITICAL_LOG_FILE_ON_DESKTOP) {

        try {
            var logFile = File(Folder.desktop.fsName + "/" + $$SHORTCODE$$.S.CRITICAL_LOG_FILE_ON_DESKTOP);
            logFile.open("a");
            logFile.encoding = "UTF8";
            logFile.writeln(error);   
            logFile.close();         
        }
        catch (err) {

            try {
                alert(error);
            }
            catch (err) {   
            }

        }
    }
}

})();

$$SHORTCODE$$.loadModules = function loadModules(nameSpace, completionCallback) {

    if ("undefined" == typeof app) {
        var id = require("indesign");
        $$SHORTCODE$$.G = id;
    }
    else if ("undefined" == typeof $ || ! $.global) {
        $$SHORTCODE$$.G = window;
    }
    else {
        $$SHORTCODE$$.G = $.global;
    }

    var failedTests = 0;
    var missingImplementations = 0;

    function verifyImplementationsAvailable(apiCollection) {
        if (apiCollection) {
            for (var entryName in apiCollection) {
                var entry = apiCollection[entryName];
                if ("function" == typeof entry && entry == $$SHORTCODE$$.IMPLEMENTATION_MISSING && entryName != "IMPLEMENTATION_MISSING") {
                    missingImplementations++;
                    $$SHORTCODE$$.criticalError("Missing implementation " + entryName);
                }
            }
        }
    }

    function runTests(testCollection) {
        if (testCollection) {
            for (var testEntryName in testCollection) {
                var testEntry = testCollection[testEntryName];
                if ("function" == typeof testEntry) {
                    if (testEntry()) {
                        $$SHORTCODE$$.logNote("Passed test " + testEntryName);
                    }
                    else {
                        $$SHORTCODE$$.criticalError("Failed test " + testEntryName);
                        failedTests++;
                    }
                }
                else if ("object" == typeof testEntry) {
                    runTests(testEntry);
                }
            }
        }
    }

    var basePath = File($.fileName).parent.fsName + "/";
    for (var pathIdx = 0; pathIdx < $$SHORTCODE$$.relativeFilePathsToLoad.length; pathIdx++) {
        var path = basePath + $$SHORTCODE$$.relativeFilePathsToLoad[pathIdx];
        $.evalFile(path);
    }

    $$SHORTCODE$$.initDirsScript();

    $$SHORTCODE$$.C.APP_NAME = $$SHORTCODE$$.mapAppId($$SHORTCODE$$.C.APP_ID);
    
    $$SHORTCODE$$.sharedInitScript();

    for (var member in $$SHORTCODE$$) {
        nameSpace[member] = $$SHORTCODE$$[member];        
    }

    if ($$SHORTCODE$$.S.RUN_TESTS) {
        verifyImplementationsAvailable($$SHORTCODE$$);
        runTests($$SHORTCODE$$.tests);
    }

    $$SHORTCODE$$.main();

}
