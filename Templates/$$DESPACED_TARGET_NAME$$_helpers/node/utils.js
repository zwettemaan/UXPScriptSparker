//
// This code is exclusively Node.js. It provides Node-specific 
// implementations of the utils API.
//
// utils.js depends on these functions being implemented
// When adding new functionality here, make sure to also 
// add corresponding tests to the utils_verifyDependencies()
//

(function() {

$$SHORTCODE$$.alert = function alert(msg) {    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    process.stderr.write(msg + "\n")

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.checkLinux = function checkLinux() {    

    var retVal = undefined;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    retVal = $$SHORTCODE$$.os.platform() === 'linux';

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.checkMac = function checkMac() {    

    var retVal = undefined;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    retVal = $$SHORTCODE$$.os.platform() === 'darwin';

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.checkWindows = function checkWindows() {    

    var retVal = undefined;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    retVal = $$SHORTCODE$$.os.platform() === 'win32';

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.checkLinux = function checkLinux() {    

    var retVal = undefined;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    retVal = $$SHORTCODE$$.os.platform() === 'linux';

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.logMessage = function(reportingFunctionArguments, levelPrefix, message) {

    var savedInLogger = $$SHORTCODE$$.inLogger;

    do {
        try {

            if ($$SHORTCODE$$.inLogger) {
                break;
            }
            
            $$SHORTCODE$$.inLogger = true;
            
            var functionPrefix = "";

            if (! message) {

                  message = reportingFunctionArguments;
                  reportingFunctionArguments = undefined;

            }
            else if (reportingFunctionArguments) {

                if ("string" == typeof reportingFunctionArguments) {

                    functionPrefix += reportingFunctionArguments + ": ";
                    
                }
                else {

                    var reportingFunctionName;
                    try {
                        reportingFunctionName = reportingFunctionArguments.callee.toString().match(/function ([^\(]+)/)[1];
                    }
                    catch (err) {
                        reportingFunctionName = "[anonymous function]";
                    }
                    functionPrefix += reportingFunctionName + ": ";

                }
            }
            
            var now = new Date();
            var timePrefix = 
                $$SHORTCODE$$.leftPad(now.getUTCDate(), "0", 2) + 
                "-" + 
                $$SHORTCODE$$.leftPad(now.getUTCMonth() + 1, "0", 2) + 
                "-" + 
                $$SHORTCODE$$.leftPad(now.getUTCFullYear(), "0", 4) + 
                " " + 
                $$SHORTCODE$$.leftPad(now.getUTCHours(), "0", 2) + 
                ":" + 
                $$SHORTCODE$$.leftPad(now.getUTCMinutes(), "0", 2) + 
                ":" + 
                $$SHORTCODE$$.leftPad(now.getUTCSeconds(), "0", 2) + 
                "+00 ";

            var platformPrefix = "U ";
            
            var logLine = platformPrefix + timePrefix + "- " + levelPrefix + ": " + functionPrefix + message;
                    
            if ($$SHORTCODE$$.S.LOG_TO_FILEPATH) {
                $$SHORTCODE$$.fileio.appendUTF8TextFile(
                    $$SHORTCODE$$.S.LOG_TO_FILEPATH, 
                    logLine, 
                    $$SHORTCODE$$.fileio.FILEIO_APPEND_NEWLINE);
            }

            if ($$SHORTCODE$$.S.LOG_TO_NODE_CONSOLE) {
                console.log(logLine); 
            }
        }
        catch (err) {
        }
    }
    while (false);

    $$SHORTCODE$$.inLogger = savedInLogger;
}

})();
