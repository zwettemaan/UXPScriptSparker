// Don't use `var $$SHORTCODE$$`
// By using `var` we will end up defining this in the wrong scope

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

$$SHORTCODE$$.relativeFilePathsToLoad = [

    "../api/globals.js",
    "./api/globals.js",
    "../shared/globals.js",
    "./globals.js",

    "../api/tweakableSettings.js",
    "../shared/tweakableSettings.js",

    "../api/utils.js",
    "../shared/utils.js",
    "./utils.idjs",

    "../api/path.js",
    "../shared/path.js",
    "./path.idjs",

    "../api/fileio.js",
    "./fileio.idjs",
    
    "../api/idDOM.js",
    "./idDOM.idjs",

    "../api/compat.js",
    "./compat.idjs",

    "../shared/init.js",
    "../../$$DESPACED_TARGET_NAME$$.js"
];

// require() and global.require() are different functions. I've come up with a mix-and-match
// using both. Below, I fetch $$SHORTCODE$$.fs and $$SHORTCODE$$.g_fs which are different 'fs-like'
// entities

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

if (! $$SHORTCODE$$.uxp) {
    $$SHORTCODE$$.uxp = require("uxp");
}

if (! $$SHORTCODE$$.storage) {
    $$SHORTCODE$$.storage = $$SHORTCODE$$.uxp.storage;
}

if (! $$SHORTCODE$$.fs) {
    $$SHORTCODE$$.fs = $$SHORTCODE$$.storage.localFileSystem;
}

if (! $$SHORTCODE$$.g_fs) {
    $$SHORTCODE$$.g_fs = global.require("fs");
}

$$SHORTCODE$$.initDirsScript = async function initDirsScript() {

    var retVal = false;

    do {
        try {

            if (! $$SHORTCODE$$.dirs) {
                $$SHORTCODE$$.dirs = {};
            }

            var appLocalTemp = await $$SHORTCODE$$.fs.getTemporaryFolder();
            $$SHORTCODE$$.dirs.TEMP = 
                $$SHORTCODE$$.path.addTrailingSeparator(appLocalTemp.nativePath);

            // At the moment, on Windows, the temp path seems to give us relevant data 
            // regarding the user's context. This can break at any new UXPScript
            // version!

            try {

                var splitTempPath = $$SHORTCODE$$.dirs.TEMP.split($$SHORTCODE$$.path.SEPARATOR);

                if ($$SHORTCODE$$.isWindows) {

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
                else {
                
                    // On Mac, the temp path is located in /var... - of no use to us 
                    $$SHORTCODE$$.dirs.DRIVE_PREFIX = "";

                }
            }
            catch (err) {            
            }

            // Fall back to using ExtendScript if we did not manage to get the data
            if (! $$SHORTCODE$$.dirs.HOME) {
                $$SHORTCODE$$.dirs.HOME = 
                    $$SHORTCODE$$.path.addTrailingSeparator(
                        eval(
                            $$SHORTCODE$$.G.app.doScript(
                                ES_SCRIPT_getHomeDir, 
                                ScriptLanguage.JAVASCRIPT)));
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
            const desktop = 
                $$SHORTCODE$$.fs.getFolder(
                    $$SHORTCODE$$.storage.domains.userDesktop);
            const logFile = desktop.nativePath + "/criticalErrors.log";
            logFile.write(error);            
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

exports.loadModules = async function loadModules(nameSpace, completionCallback) {

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
                    if (! testEntry()) {
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

    await $$SHORTCODE$$.initDirsScript();

    $$SHORTCODE$$.sharedInitScript();

    for (var member in $$SHORTCODE$$) {
        nameSpace[member] = $$SHORTCODE$$[member];        
    }

    if ($$SHORTCODE$$.S.RUN_TESTS) {
        verifyImplementationsAvailable($$SHORTCODE$$);
        runTests($$SHORTCODE$$.tests);
    }

    await $$SHORTCODE$$.main();
}
