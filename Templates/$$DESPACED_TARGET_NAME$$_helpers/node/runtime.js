(function() {

$$SHORTCODE$$ = global.$$SHORTCODE$$;
if (! $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
    global.$$SHORTCODE$$ = $$SHORTCODE$$;
}

$$SHORTCODE$$.relativeFilePathsToLoad = [

    "../shared/appMapper.js",

    "../api/globals.js",
    "./api/globals.js",
    "../shared/globals.js",
    "./globals.js",

    "../api/tweakableSettings.js",
    "../shared/tweakableSettings.js",

    "../api/utils.js",
    "../shared/utils.js",
    "./utils.js",

    "../api/path.js",
    "../shared/path.js",
    "./path.js",

    "../api/fileio.js",
    "../shared/fileio.js",
    "./fileio.js",
    
    "../api/compat.js",
    "./compat.js",

    "../shared/init.js",
    "../../$$DESPACED_TARGET_NAME$$.js"
];

$$SHORTCODE$$.initDirsScript = function initDirsScript() {

    var retVal = false;

    do {
        try {

            if (! $$SHORTCODE$$.dirs) {
                $$SHORTCODE$$.dirs = {};
            }

            $$SHORTCODE$$.dirs.TEMP = 
                $$SHORTCODE$$.path.addTrailingSeparator($$SHORTCODE$$.os.tmpdir());

            $$SHORTCODE$$.dirs.HOME = 
                $$SHORTCODE$$.path.addTrailingSeparator($$SHORTCODE$$.os.homedir());

            $$SHORTCODE$$.dirs.DESKTOP = 
                $$SHORTCODE$$.dirs.HOME + "Desktop" + $$SHORTCODE$$.path.SEPARATOR;

            if (! $$SHORTCODE$$.isWindows) {

                $$SHORTCODE$$.dirs.DRIVE_PREFIX = "";

            }
            else {

                var splitTempPath = $$SHORTCODE$$.dirs.TEMP.split($$SHORTCODE$$.path.SEPARATOR);

                if (splitTempPath.length > 0) {
                    $$SHORTCODE$$.dirs.DRIVE_PREFIX = splitTempPath[0] + $$SHORTCODE$$.path.SEPARATOR;
                }

                if (splitTempPath.length > 1) {
                    $$SHORTCODE$$.dirs.USERS = 
                        $$SHORTCODE$$.dirs.DRIVE_PREFIX + 
                        splitTempPath[1] + $$SHORTCODE$$.path.SEPARATOR;
                }

                if (splitTempPath.length > 2) {
                    $$SHORTCODE$$.dirs.HOME = 
                        $$SHORTCODE$$.dirs.USERS + 
                        splitTempPath[2] + $$SHORTCODE$$.path.SEPARATOR;
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
    
    if ($$SHORTCODE$$.S.LOG_CRITICAL_ERRORS) {

        try {
            const desktop = process.env.HOME + "/Desktop";
            const logFile = desktop + "/criticalErrors.log";
            $$SHORTCODE$$.fs.writeSync(logFile, error + "\n");
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

})();

exports.loadModules = async function loadModules(nameSpace, completionCallback) {

    var failedTests = 0;
    var missingImplementations = 0;

    $$SHORTCODE$$.G = global;

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

    for (var pathIdx = 0; pathIdx < $$SHORTCODE$$.relativeFilePathsToLoad.length; pathIdx++) {
        var path = $$SHORTCODE$$.relativeFilePathsToLoad[pathIdx];
        require(path);
    }

    $$SHORTCODE$$.initDirsScript();

    $$SHORTCODE$$.sharedInitScript();

    for (var member in $$SHORTCODE$$) {
        nameSpace[member] = $$SHORTCODE$$[member]; 
        exports[member] = $$SHORTCODE$$[member];       
    }

    if ($$SHORTCODE$$.S.RUN_TESTS) {
        verifyImplementationsAvailable($$SHORTCODE$$);
        runTests($$SHORTCODE$$.tests);
    }

    $$SHORTCODE$$.main();
}
