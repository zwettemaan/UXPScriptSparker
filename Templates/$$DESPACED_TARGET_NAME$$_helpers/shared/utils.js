//
// This code can be shared between CEP/JavaScript, ExtendScript and UXPScript
//

(function(){

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

$$SHORTCODE$$.dQ = function(s) {
    return '"' + s.toString().replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r") + '"';
}

$$SHORTCODE$$.leftPad = function leftPad(s, padChar, len) {

    var retVal = undefined;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            retVal = s + "";

            if (retVal.length > len) {
                retVal = retVal.substring(retVal.length - len);
                break;
            }

            var padLength = len - retVal.length;

            var padding = new Array(padLength + 1).join(padChar)
            retVal = padding + retVal;
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

$$SHORTCODE$$.logEntry = function(reportingFunctionArguments) {
    if ($$SHORTCODE$$.S.LOG_ENTRY_EXIT) {
        $$SHORTCODE$$.logTrace(reportingFunctionArguments, "Entry");
    }
}

$$SHORTCODE$$.logError = function(reportingFunctionArguments, s) {
    if ($$SHORTCODE$$.S.LOG_LEVEL >= $$SHORTCODE$$.C.LOG_ERROR) {
        if (! s) {
            s = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        $$SHORTCODE$$.logMessage(reportingFunctionArguments, "ERROR", s);
    }
}

$$SHORTCODE$$.logExit = function(reportingFunctionArguments) {
    if ($$SHORTCODE$$.S.LOG_ENTRY_EXIT) {
        $$SHORTCODE$$.logTrace(reportingFunctionArguments, "Exit");
    }
}

$$SHORTCODE$$.logNote = function(reportingFunctionArguments, s) {
    if ($$SHORTCODE$$.S.LOG_LEVEL >= $$SHORTCODE$$.C.LOG_NOTE) {
        if (! s) {
            s = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        $$SHORTCODE$$.logMessage(reportingFunctionArguments, "NOTE", s);
    }
}

$$SHORTCODE$$.logTrace = function(reportingFunctionArguments, s) {
    if ($$SHORTCODE$$.S.LOG_LEVEL >= $$SHORTCODE$$.C.LOG_TRACE) {
        if (! s) {
            s = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        $$SHORTCODE$$.logMessage(reportingFunctionArguments, "TRACE", s);
    }
}

$$SHORTCODE$$.logWarning = function(reportingFunctionArguments, s) {
    if ($$SHORTCODE$$.S.LOG_LEVEL >= $$SHORTCODE$$.C.LOG_WARN) {
        if (! s) {
            s = reportingFunctionArguments;
            reportingFunctionArguments = undefined;
        }
        $$SHORTCODE$$.logMessage(reportingFunctionArguments, "WARN", s);
    }
}

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

$$SHORTCODE$$.pushLogLevel = function pushLogLevel(newLogLevel) {

    var retVal;

    retVal = $$SHORTCODE$$.S.LOG_LEVEL;
    logLevelStack.push($$SHORTCODE$$.S.LOG_LEVEL);
    $$SHORTCODE$$.S.LOG_LEVEL = newLogLevel;

    return retVal;
}

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

$$SHORTCODE$$.rightPad = function rightPad(s, padChar, len) {

    var retVal = undefined;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            retVal = s + "";

            if (retVal.length > len) {
                retVal = retVal.substring(0,len);
                break;
            }

            var padLength = len - retVal.length;

            var padding = new Array(padLength + 1).join(padChar)
            retVal += padding;
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

$$SHORTCODE$$.sQ = function(s) {
    return "'" + s.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/\n/g,"\\n").replace(/\r/g,"\\r") + "'";
}

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