//
// This code can be shared between CEP/JavaScript, ExtendScript and UXPScript
//

(function(){

/**
* Make a copy of an object or array so it is equivalent, but does not share any references.
* Do this recursively on all nested objects 
* 
* @function $$SHORTCODE$$.deepClone
* 
* @param {any} obj - What we want to clone
* @return a deep clone of the object
*/

var logLevelStack = [];

$$SHORTCODE$$.deepClone = function deepClone(obj) {

    var retVal = undefined;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {
            
            if ("object" != typeof obj) {
                retVal = obj;
                break;
            }

            if (! obj) {
                retVal = obj;
                break;
            }

            var clone;
            if (obj instanceof Array) {
                clone = [];
            }
            else {
                clone = {};        
            }

            for (var x in obj) 
            {
                var val = obj[x];
                if (typeof val == "object")
                {
                    clone[x] = $$SHORTCODE$$.deepClone(val);
                }
                else
                {
                    clone[x] = val;
                }
            }

            retVal = clone;
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

/**
* Wrap a string in double quotes, so that eval($$SHORTCODE$$.dQ(x)) == x 
* 
* @function $$SHORTCODE$$.dQ
* 
* @param {string} s - string to be quoted
* @return a copy of s wrapped in quotes
*/

$$SHORTCODE$$.dQ = function(s) {
    return '"' + s.toString().replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r") + '"';
}

/**
* Call this function when entering any function. A typical usage is 
*   function myFunction()
*   {
*    var retVal = defaultValue;
*    $$SHORTCODE$$.logEntry(arguments);
* ...
*    $$SHORTCODE$$.logExit(arguments);
*    return retVal;
*   }
* 
* @function $$SHORTCODE$$.logEntry
* 
* @param {array} arguments - pass in the arguments of the calling function
*/

$$SHORTCODE$$.logEntry = function(reportingFunctionArguments) {
    if ($$SHORTCODE$$.S.LOG_ENTRY_EXIT) {
        $$SHORTCODE$$.logTrace(reportingFunctionArguments, "Entry");
    }
}

/**
* Call this function when reporting an error condition 
* ...
*    if (somethingBad) {
*      $$SHORTCODE$$.logError(arguments,"Something bad happened");
*    }
* 
* @function $$SHORTCODE$$.logError
* 
* @param {array} arguments - pass in the arguments of the calling function
* @param {string} message - an error message
*/

$$SHORTCODE$$.logError = function(reportingFunctionArguments, s) {
    if ($$SHORTCODE$$.S.LOG_LEVEL >= $$SHORTCODE$$.C.LOG_ERROR) {
        if (! s) {
            s = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        $$SHORTCODE$$.logMessage(reportingFunctionArguments, "ERROR  : " + s);
    }
}

/**
* Call this function when exiting any function. A typical usage is 
*   function myFunction()
*   {
*    var retVal = defaultValue;
*    $$SHORTCODE$$.logEntry(arguments);
* ...
*    $$SHORTCODE$$.logExit(arguments);
*    return retVal;
*   }
* 
* @function $$SHORTCODE$$.logExit
* 
* @param {array} arguments - pass in the arguments of the calling function
*/

$$SHORTCODE$$.logExit = function(reportingFunctionArguments) {
    if ($$SHORTCODE$$.S.LOG_ENTRY_EXIT) {
        $$SHORTCODE$$.logTrace(reportingFunctionArguments, "Exit");
    }
}

/**
* Call this function when reporting some interesting condition 
* ...
*    if (somethingNoteworthy) {
*      $$SHORTCODE$$.logNote(arguments,"Something bad happened");
*    }
* 
* @function $$SHORTCODE$$.logNote
* 
* @param {array} arguments - pass in the arguments of the calling function
* @param {string} message - an note
*/

$$SHORTCODE$$.logNote = function(reportingFunctionArguments, s) {
    if ($$SHORTCODE$$.S.LOG_LEVEL >= $$SHORTCODE$$.C.LOG_NOTE) {
        if (! s) {
            s = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        $$SHORTCODE$$.logMessage(reportingFunctionArguments, "NOTE   : " + s);
    }
}

/**
* Call this function when reporting some verbose, tracing info
*    
* ...
*    $$SHORTCODE$$.logTrace(arguments,"About to call some doodad");
* ...
* 
* @function $$SHORTCODE$$.logTrace
* 
* @param {array} arguments - pass in the arguments of the calling function
* @param {string} message - an trace message
*/

$$SHORTCODE$$.logTrace = function(reportingFunctionArguments, s) {
    if ($$SHORTCODE$$.S.LOG_LEVEL >= $$SHORTCODE$$.C.LOG_TRACE) {
        if (! s) {
            s = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        $$SHORTCODE$$.logMessage(reportingFunctionArguments, "TRACE  : " + s);
    }
}

/**
* Call this function when reporting an unexpected condition
*    
*    if (someStringIsUnexpectedlyEmpty) {
*      $$SHORTCODE$$.logWarning(arguments,"Did not expect to get an empty string");
*    }
* 
* @function $$SHORTCODE$$.logWarning
* 
* @param {array} arguments - pass in the arguments of the calling function
* @param {string} message - an trace message
*/

$$SHORTCODE$$.logWarning = function(reportingFunctionArguments, s) {
    if ($$SHORTCODE$$.S.LOG_LEVEL >= $$SHORTCODE$$.C.LOG_WARN) {
        if (! s) {
            s = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        $$SHORTCODE$$.logMessage(reportingFunctionArguments, "WARNING: " + s);
    }
}

/**
* Change the log level and restore what it was set to before the preceding call to pushLogLevel()
*
* @function $$SHORTCODE$$.popLogLevel
* 
* @return the previous log level before the popLogLevel()
*          
*/

$$SHORTCODE$$.popLogLevel = function popLogLevel() {

    var retVal;

    retVal = $$SHORTCODE$$.S.LOG_LEVEL;
    if (logLevelStack.length > 0) {
        $$SHORTCODE$$.S.LOG_LEVEL = logLevelStack.pop();
    }
    else {
        $$SHORTCODE$$.S.LOG_LEVEL = $$SHORTCODE$$.C.LOG_NONE;
    }
    
    return retVal;
}

/**
* Change the log level and save the previous log level on a
* stack.
*
* @function $$SHORTCODE$$.pushLogLevel
* 
* @param {integer} newLogLevel  - new log level
* @return the previous log level
*          
*/

$$SHORTCODE$$.pushLogLevel = function pushLogLevel(newLogLevel) {

    var retVal;

    retVal = $$SHORTCODE$$.S.LOG_LEVEL;
    logLevelStack.push($$SHORTCODE$$.S.LOG_LEVEL);
    $$SHORTCODE$$.S.LOG_LEVEL = newLogLevel;

    return retVal;
}

/**
* Generate some GUID. This is not really a 'proper' GUID generator, 
* but for our needs it'll do.
*
* @function $$SHORTCODE$$.randomGUID
* 
* @return a random GUID in XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX format
* XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
*           111 1111 1222 222222333333
* 01234567 9012 4567 9012 456789012345
*          
*/

$$SHORTCODE$$.randomGUID = function randomGUID() 
{
    var retVal = "";
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    for (var wordIdx = 0; wordIdx < 8; wordIdx++)
    {
        var r = Math.round(Math.random() * 65536);
        var r = $$SHORTCODE$$.toHex(r,4);
        retVal = retVal + r;
        if (wordIdx >= 1 && wordIdx <= 4)
        {
            retVal = retVal + "-";
        }
    }
    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

/**
* Make a copy of an object so it is equivalent, but does not share any references. 
* Do not apply this on any nested objects
* 
* @function $$SHORTCODE$$.shallowClone
* 
* @param {any} obj - What we want to clone
* @return a shallow clone of the object
*/

$$SHORTCODE$$.shallowClone = function shallowClone(obj) {

    var retVal = undefined;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            if ("object" != typeof obj) {
                retVal = obj;
                break;
            }

            if (! obj) {
                retVal = obj;
                break;
            }

            var clone;
            if (obj instanceof Array) {
                clone = [];
            }
            else {
                clone = {};        
            }

            for (var x in obj) 
            {
                clone[x] = obj[x];
            }

            retVal = clone;
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

/**
* Wrap a string in single quotes, so that eval($$SHORTCODE$$.sQ(x)) == x 
* 
* @function $$SHORTCODE$$.sQ
* 
* @param {string} s - string to be quoted
* @return a copy of s wrapped in quotes
*/

$$SHORTCODE$$.sQ = function(s) {
    return "'" + s.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/\n/g,"\\n").replace(/\r/g,"\\r") + "'";
}

/**
* Convert a positive integer to a fixed-length hexadecimal number
* 
* @function $$SHORTCODE$$.toHex
* 
* @param {number} value - value to be converted
* @param {number} numDigits - how many digits
* @return a hexadecimal string or undefined
*/

$$SHORTCODE$$.toHex = function toHex(value, numDigits) 
{
    var retVal = undefined;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            if ("number" != typeof(value)) {
                $$SHORTCODE$$.logError(arguments, "value is not a number");
                break;
            }

            if (isNaN(value)) {
                $$SHORTCODE$$.logError(arguments, "value is NaN");
                break;
            }

            if (value < 0) {
                $$SHORTCODE$$.logError(arguments, "negative value");
                break;
            }

            if (Math.floor(value) != value) {
                $$SHORTCODE$$.logError(arguments, "value has decimals");
                break;
            }

            var hexString = value.toString(16);
            if (hexString.length > numDigits) {
                hexString = hexString.substring(hexString.length - numDigits);
            }
            else if (hexString.length < numDigits) {
                hexString = Array(numDigits - hexString.length + 1).join("0") + hexString;
            }

            retVal = hexString.toUpperCase();
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

})();