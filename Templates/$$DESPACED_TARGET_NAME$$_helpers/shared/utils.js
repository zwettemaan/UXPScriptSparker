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

$$SHORTCODE$$.deepClone = function deepClone(obj) {

    var retVal = undefined;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

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

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
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
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

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

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
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

})();