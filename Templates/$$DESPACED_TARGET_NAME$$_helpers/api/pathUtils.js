//
// This is the utils API. It is available in ExtendScript, CEP/JavaScript and UXPScript 
//

(function(){


function declareAPI() {


    $$SHORTCODE$$.path.addTrailingSeparator = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.path.basename             = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.path.dirname              = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.path.exists               = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.path.filenameExtension    = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.path.guessSeparator       = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.path.isDir                = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.path.mkdir                = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.path.reduce               = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
}

if (! $$SHORTCODE$$.path) {
    $$SHORTCODE$$.path = {};
}

//----------- Tests

if (! $$SHORTCODE$$.tests.path) {
    $$SHORTCODE$$.tests.path = {};
}

$$SHORTCODE$$.tests.path.basename = function tests_basename() {

    var retVal = true;

    do {

        var tests = [
            {
                filePath: "/Users/kris/Desktop",
                separator: undefined,
                basename: "Desktop",
                dirname: "/Users/kris/"
            },
            {
                filePath: "C:\\Users\\kris\\Desktop",
                separator: undefined,
                basename: "Desktop",
                dirname: "C:\\Users\\kris\\"
            },
            {
                filePath: "/Users/kris/Desktop",
                separator: $$SHORTCODE$$.path.EITHER_SEPARATOR,
                basename: "Desktop",
                dirname: "/Users/kris/"
            },
            {
                filePath: "C:\\Users\\kris\\Desktop",
                separator: $$SHORTCODE$$.path.EITHER_SEPARATOR,
                basename: "Desktop",
                dirname: "C:\\Users\\kris\\"
            },
            {
                filePath: "/Users/kris/Desktop",
                separator: $$SHORTCODE$$.path.GUESS_SEPARATOR,
                basename: "Desktop",
                dirname: "/Users/kris/"
            },
            {
                filePath: "C:\\Users\\kris\\Desktop",
                separator: $$SHORTCODE$$.path.GUESS_SEPARATOR,
                basename: "Desktop",
                dirname: "C:\\Users\\kris\\"
            },
            {
                filePath: "/Users/kris/Desktop",
                separator: "/",
                basename: "Desktop",
                dirname: "/Users/kris/"
            },
            {
                filePath: "C:\\Users\\kris\\Desktop",
                separator: "/",
                basename: "C:\\Users\\kris\\Desktop",
                dirname: ""
            },         
            {
                filePath: "/Users/kris/Desktop",
                separator: "\\",
                basename: "/Users/kris/Desktop",
                dirname: ""
            },
            {
                filePath: "C:\\Users\\kris\\Desktop",
                separator: "\\",
                basename: "Desktop",
                dirname: "C:\\Users\\kris\\"
            },
            {
                filePath: "/Users/kris/Desktop/",
                separator: undefined,
                basename: "Desktop",
                dirname: "/Users/kris/"
            },
            {
                filePath: "C:\\Users\\kris\\Desktop\\",
                separator: undefined,
                basename: "Desktop",
                dirname: "C:\\Users\\kris\\"
            },
            {
                filePath: "/Users/kris/Desktop/",
                separator: $$SHORTCODE$$.path.EITHER_SEPARATOR,
                basename: "Desktop",
                dirname: "/Users/kris/"
            },
            {
                filePath: "C:\\Users\\kris\\Desktop\\",
                separator: $$SHORTCODE$$.path.EITHER_SEPARATOR,
                basename: "Desktop",
                dirname: "C:\\Users\\kris\\"
            },
            {
                filePath: "/Users/kris/Desktop/",
                separator: $$SHORTCODE$$.path.GUESS_SEPARATOR,
                basename: "Desktop",
                dirname: "/Users/kris/"
            },
            {
                filePath: "C:\\Users\\kris\\Desktop\\",
                separator: $$SHORTCODE$$.path.GUESS_SEPARATOR,
                basename: "Desktop",
                dirname: "C:\\Users\\kris\\"
            },
            {
                filePath: "/Users/kris/Desktop/",
                separator: "/",
                basename: "Desktop",
                dirname: "/Users/kris/"
            },
            {
                filePath: "C:\\Users\\kris\\Desktop\\",
                separator: "/",
                basename: "C:\\Users\\kris\\Desktop\\",
                dirname: ""
            },         
            {
                filePath: "/Users/kris/Desktop/",
                separator: "\\",
                basename: "/Users/kris/Desktop/",
                dirname: ""
            },
            {
                filePath: "C:\\Users\\kris\\Desktop\\",
                separator: "\\",
                basename: "Desktop",
                dirname: "C:\\Users\\kris\\"
            },
            {
                filePath: "/Users\\kris/Desktop",
                separator: undefined,
                basename: "Desktop",
                macDirname: "/Users/kris/",
                winDirname: "\\Users\\kris\\"
            },
            {
                filePath: "C:\\Users/kris\\Desktop",
                separator: undefined,
                basename: "Desktop",
                dirname: "C:\\Users\\kris\\"
            },
            {
                filePath: "/Users\\kris/Desktop",
                separator: $$SHORTCODE$$.path.EITHER_SEPARATOR,
                basename: "Desktop",
                macDirname: "/Users/kris/",
                winDirname: "\\Users\\kris\\"
            },
            {
                filePath: "C:\\Users/kris\\Desktop",
                separator: $$SHORTCODE$$.path.EITHER_SEPARATOR,
                basename: "Desktop",
                dirname: "C:\\Users\\kris\\"
            },
            {
                filePath: "/Users/kris\\Desktop",
                separator: $$SHORTCODE$$.path.GUESS_SEPARATOR,
                basename: "kris\\Desktop",
                dirname: "/Users/"
            },
            {
                filePath: "C:\\Users\\kris/Desktop",
                separator: $$SHORTCODE$$.path.GUESS_SEPARATOR,
                basename: "kris/Desktop",
                dirname: "C:\\Users\\"
            },
            {
                filePath: "/Users/kris\\Desktop",
                separator: "/",
                basename: "kris\\Desktop",
                dirname: "/Users/"
            },
            {
                filePath: "C:\\Users/kris\\Desktop",
                separator: "/",
                basename: "kris\\Desktop",
                dirname: "C:\\Users/"
            },         
            {
                filePath: "/Users\\kris/Desktop",
                separator: "\\",
                basename: "kris/Desktop",
                dirname: "/Users\\"
            },
            {
                filePath: "C:\\Users\\kris/Desktop/t.txt",
                separator: $$SHORTCODE$$.path.GUESS_SEPARATOR,
                macBasename: "t.txt",
                winBasename: "kris/Desktop/t.txt",
                macDirname: "C:\\Users\\kris/Desktop/",
                winDirname: "C:\\Users\\"
            },
            {
                filePath: "/Users/kris\\Desktop\\t.txt",
                separator: $$SHORTCODE$$.path.GUESS_SEPARATOR,
                macBasename: "kris\\Desktop\\t.txt",
                winBasename: "t.txt",
                macDirname: "/Users/",
                winDirname: "/Users/kris\\Desktop\\"
            }
        ]

        for (var testIdx = 0; testIdx < tests.length; testIdx++) {
            var test = tests[testIdx];
            var basename = $$SHORTCODE$$.path.basename(test.filePath, test.separator);
            var dirname = $$SHORTCODE$$.path.dirname(test.filePath, test.separator);
            var expectedBasename;
            var expectedDirname;
            if ($$SHORTCODE$$.isMac) {
                if ("macBasename" in test) {
                    expectedBasename = test.macBasename;
                }
                else {
                    expectedBasename = test.basename;
                }
                if ("macDirname" in test) {
                    expectedDirname = test.macDirname;
                }
                else {
                    expectedDirname = test.dirname;
                }
            } 
            else if ($$SHORTCODE$$.isWindows) {
                if ("winBasename" in test) {
                    expectedBasename = test.winBasename;
                }
                else {
                    expectedBasename = test.basename;
                }
                if ("winDirname" in test) {
                    expectedDirname = test.winDirname;
                }
                else {
                    expectedDirname = test.dirname;
                }
            }
            if (expectedBasename != basename) {
                retVal = false;
                $$SHORTCODE$$.logError(arguments, "basename(" + test.filePath + "," + test.separator + ") returned '" + basename + "' but expected '" + expectedBasename + "'");
            }
            if (expectedDirname != dirname) {
                retVal = false;
                $$SHORTCODE$$.logError(arguments, "dirname(" + test.filePath + "," + test.separator + ") returned '" + dirname + "' but expected '" + expectedDirname + "'");
            }
        }
    }
    while (false);

    return retVal;
}

$$SHORTCODE$$.tests.path.checkLowLevelPathFunctions = function tests_checkLowLevelPathFunctions() {

    var retVal = false;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        
        try {

            if ($$SHORTCODE$$.isWindows) {

                // Directory
                if (! $$SHORTCODE$$.path.exists($$SHORTCODE$$.dirs.DRIVE_PREFIX + "/Users")) {
                    $$SHORTCODE$$.logError(arguments, $$SHORTCODE$$.dirs.DRIVE_PREFIX + "/Users should exist");
                    break;
                }

                // Directory with trailing separator
                if (! $$SHORTCODE$$.path.exists($$SHORTCODE$$.dirs.DRIVE_PREFIX + "/Users/")) {
                    $$SHORTCODE$$.logError(arguments, $$SHORTCODE$$.dirs.DRIVE_PREFIX + "/Users/ should exist");
                    break;
                }

                // Directory with spaces in the name
                if (! $$SHORTCODE$$.path.exists($$SHORTCODE$$.dirs.DRIVE_PREFIX + "/Program Files")) {
                    $$SHORTCODE$$.logError(arguments, "'" + $$SHORTCODE$$.dirs.DRIVE_PREFIX + "/Program Files' should exist");
                    break;
                }

                // Directory with spaces in the name and trailing slash
                if (! $$SHORTCODE$$.path.exists($$SHORTCODE$$.dirs.DRIVE_PREFIX + "/Program Files/")) {
                    $$SHORTCODE$$.logError(arguments, "'" + $$SHORTCODE$$.dirs.DRIVE_PREFIX + "/Program Files/' should exist");
                    break;
                }

                // A file
                if (! $$SHORTCODE$$.path.exists($$SHORTCODE$$.dirs.DRIVE_PREFIX + "/Windows/System32/Drivers/etc/hosts")) {
                    $$SHORTCODE$$.logError(arguments, $$SHORTCODE$$.dirs.DRIVE_PREFIX + "/Windows/System32/Drivers/etc/hosts should exist");
                    break;
                }

                // A file with a trailing slash should exist
                if (! $$SHORTCODE$$.path.exists($$SHORTCODE$$.dirs.DRIVE_PREFIX + "/Windows/System32/Drivers/etc/hosts/")) {
                    $$SHORTCODE$$.logError(arguments, $$SHORTCODE$$.dirs.DRIVE_PREFIX + "/Windows/System32/Drivers/etc/hosts/ should exist");
                    break;
                }

                // A non-existent file
                if ($$SHORTCODE$$.path.exists($$SHORTCODE$$.dirs.DRIVE_PREFIX + "/Users/file_does_not_exist_no_way.txt")) {
                    $$SHORTCODE$$.logError(arguments, $$SHORTCODE$$.dirs.DRIVE_PREFIX + "/Users/file_does_not_exist_no_way.txt should not exist");
                    break;
                }
            }

            if ($$SHORTCODE$$.isMac) {

                // Directory
                if (! $$SHORTCODE$$.path.exists("/Users")) {
                    $$SHORTCODE$$.logError(arguments, "/Users should exist");
                    break;
                }

                // Directory with trailing separator
                if (! $$SHORTCODE$$.path.exists("/Users/")) {
                    $$SHORTCODE$$.logError(arguments, "/Users/ should exist");
                    break;
                }

                // Directory with spaces in the name
                if (! $$SHORTCODE$$.path.exists("/Library/Application Support")) {
                    $$SHORTCODE$$.logError(arguments, "/Library/Application Support should exist");
                    break;
                }

                // Directory with spaces in the name and trailing slash
                if (! $$SHORTCODE$$.path.exists("/Library//Application Support/")) {
                    $$SHORTCODE$$.logError(arguments, "/Library/Application Support/ should exist");
                    break;
                }

                // A file
                if (! $$SHORTCODE$$.path.exists("/etc/hosts")) {
                    $$SHORTCODE$$.logError(arguments, "/etc/hosts should exist");
                    break;
                }

                // A file with a trailing slash should exist
                if (! $$SHORTCODE$$.path.exists("/etc/hosts/")) {
                    $$SHORTCODE$$.logError(arguments, "/etc/hosts/ should exist");
                    break;
                }

                // A non-existent file
                if ($$SHORTCODE$$.path.exists("/etc/file_does_not_exist_no_way.txt")) {
                    $$SHORTCODE$$.logError(arguments, "/etc/file_does_not_exist_no_way.txt should not exist");
                    break;
                }
            }

            retVal = true;      
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
            retVal = false;
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.tests.path.pathReduce = function tests_pathReduce() {

    var retVal = true;

    do {

        var tests = [
            {
                filePath: "./relative/path/../somewhere/",
                reduce: "./relative/somewhere",
            },
            {
                filePath: "./relative/path/../somewhere/",
                reduce: "./relative/somewhere",
                separator: "/"
            },
            {
                filePath: "./relative/path/../somewhere",
                reduce: "./relative/somewhere",
                separator: "/"
            },
            {
                filePath: "relative/path/../somewhere/",
                reduce: "./relative/somewhere",
                separator: "/"
            },
            {
                filePath: "relative/path/../somewhere",
                reduce: "./relative/somewhere",
                separator: "/"
            },
            {
                filePath: "C:\\Users\\Path\\..\\somewhere",
                reduce: "C:\\Users\\somewhere",
                separator: "\\"
            },
            {
                filePath: "C:\\Users\\Path\\..\\somewhere\\",
                reduce: "C:\\Users\\somewhere",
                separator: "\\"
            },
            {
                filePath: "C:/Users/Path/../somewhere",
                reduce: "C:/Users/Path/../somewhere",
                separator: "\\"
            },
            {
                filePath: "C:/Users/Path/../somewhere/",
                reduce: "C:/Users/Path/../somewhere/",
                separator: "\\"
            },
            {
                filePath: "./relative/path/../somewhere/",
                reduce: ".\\./relative/path/../somewhere/",
                separator: "\\"
            },
            {
                filePath: "./relative/path/../somewhere",
                reduce: ".\\./relative/path/../somewhere",
                separator: "\\"
            },
            {
                filePath: "relative/path/../somewhere/",
                reduce: ".\\relative/path/../somewhere/",
                separator: "\\"
            },
            {
                filePath: "relative/path/../somewhere",
                reduce: ".\\relative/path/../somewhere",
                separator: "\\"
            },
            {
                filePath: "C:\\Users\\Path\\..\\somewhere",
                reduce: "./C:\\Users\\Path\\..\\somewhere",
                separator: "/"
            },
            {
                filePath: "C:\\Users\\Path\\..\\somewhere\\",
                reduce: "./C:\\Users\\Path\\..\\somewhere\\",
                separator: "/"
            },
            {
                filePath: "C:/Users/Path/../somewhere",
                reduce: "C:/Users/Path/../somewhere",
                separator: "\\"
            },
            {
                filePath: "C:/Users/Path/../somewhere/",
                reduce: "./C:/Users/somewhere",
                separator: "/"
            },
            {
                filePath: "./relative/path/../somewhere/",
                reduce: "./relative/somewhere",
                separator: UXES.path.GUESS_SEPARATOR
            },
            {
                filePath: "./relative/path/../somewhere",
                reduce: "./relative/somewhere",
                separator: UXES.path.GUESS_SEPARATOR
            },
            {
                filePath: "relative/path/../somewhere/",
                reduce: "./relative/somewhere",
                separator: UXES.path.GUESS_SEPARATOR
            },
            {
                filePath: "relative/path/../somewhere",
                reduce: "./relative/somewhere",
                separator: UXES.path.GUESS_SEPARATOR
            },
            {
                filePath: "C:\\Users\\Path\\..\\somewhere",
                reduce: "C:\\Users\\somewhere",
                separator: UXES.path.GUESS_SEPARATOR
            },
            {
                filePath: "C:\\Users\\Path\\..\\somewhere\\",
                reduce: "C:\\Users\\somewhere",
                separator: UXES.path.GUESS_SEPARATOR
            },
            {
                filePath: "C:/Users/Path/../somewhere",
                reduce: "./C:/Users/somewhere",
                separator: UXES.path.GUESS_SEPARATOR
            },
            {
                filePath: "C:/Users/Path/../somewhere/",
                reduce: "./C:/Users/somewhere",
                separator: UXES.path.GUESS_SEPARATOR
            },
            {
                filePath: "./relative/path/../somewhere/",
                reduce: "./relative/somewhere",
            },
            {
                filePath: "./relative/path/../somewhere",
                reduce: "./relative/somewhere",
                separator: "/"
            },
            {
                filePath: "relative/path/../somewhere/",
                reduce: "./relative/somewhere",
                separator: "/"
            },
            {
                filePath: "relative/path/../somewhere",
                reduce: "./relative/somewhere",
                separator: "/"
            },
            {
                filePath: "C:\\Users\\Path\\..\\somewhere",
                reduce: "C:\\Users\\somewhere",
                separator: "\\"
            },
            {
                filePath: "C:\\Users\\Path\\..\\somewhere\\",
                reduce: "C:\\Users\\somewhere",
                separator: "\\"
            },
            {
                filePath: "C:/Users/Path/..\\somewhere",
                reduce: "C:/Users/Path/..\\somewhere",
                separator: "\\"
            },
            {
                filePath: "C:/Users/Path/..\\somewhere/",
                reduce: "C:/Users/Path/..\\somewhere/",
                separator: "\\"
            }
        ];

        for (var testIdx = 0; testIdx < tests.length; testIdx++) {
            var test = tests[testIdx];
            var reduce = $$SHORTCODE$$.path.reduce(test.filePath, test.separator);
            var expectedReduce;
            if ($$SHORTCODE$$.isMac) {
                if ("macReduce" in test) {
                    expectedReduce = test.macReduce;
                }
                else {
                    expectedReduce = test.reduce;
                }
            } 
            else if ($$SHORTCODE$$.isWindows) {
                if ("winBasename" in test) {
                    expectedReduce = test.winBasename;
                }
                else {
                    expectedReduce = test.basename;
                }
            }
            if (expectedReduce != reduce) {
                retVal = false;
                $$SHORTCODE$$.logError(arguments, "reduce(" + test.filePath + "," + test.separator + ") returned '" + reduce + "' but expected '" + expectedReduce + "'");
            }
        }
    }
    while (false);

    return retVal;
}

//-------------------

declareAPI();

})();