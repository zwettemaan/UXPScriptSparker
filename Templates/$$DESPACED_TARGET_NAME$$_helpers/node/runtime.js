(function(){

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
                $$SHORTCODE$$.path.addTrailingSeparator(process.env.HOME);

            $$SHORTCODE$$.dirs.HELPERS = 
                $$SHORTCODE$$.path.dirname($$SHORTCODE$$.dirs.PROJECT_ROOT);
                
            $$SHORTCODE$$.dirs.PROJECT_ROOT = 
                $$SHORTCODE$$.path.dirname($$SHORTCODE$$.dirs.HELPERS);
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

exports.loadModules = $$ASYNC$$function loadModules(nameSpace, completionCallback) {

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

})();