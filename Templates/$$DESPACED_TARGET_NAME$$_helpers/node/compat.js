//
// This code is exclusively Node.js. It provides Node-specific 
// implementations of the utils API.
//
(function() {

$$SHORTCODE$$.clearImmediate = function _clearImmediate(taskId) {

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif

    clearImmediate(taskId);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.clearInterval = function _clearInterval(taskId) {

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif

    clearInterval(taskId);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.clearTimeout = function _clearTimeout(taskId) {

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif

    clearTimeout(taskId);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.setImmediate = function _setImmediate(taskFtn) {

    var retVal;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif

    retVal = setImmediate(taskFtn);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.setInterval = function _setInterval(taskFtn, timeoutMilliseconds) {

    var retVal;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif

    retVal = setInterval(taskFtn, timeoutMilliseconds);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.setTimeout = function _setTimeout(taskFtn, timeoutMilliseconds) {

    var retVal;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif

    retVal = setTimeout(taskFtn, timeoutMilliseconds);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

})();