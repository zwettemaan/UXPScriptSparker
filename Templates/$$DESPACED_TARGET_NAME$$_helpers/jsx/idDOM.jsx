(function() {

// Don't use `var $$SHORTCODE$$`
// By using `var` we will end up defining this in the wrong scope

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

$$SHORTCODE$$.instanceof = function _instanceof(object, domClassName) {
  
    var retVal;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif
    var esScript = "object instanceof " + domClassName;

    try {
        retVal = eval(esScript);
    }
    catch (err) {
        $$SHORTCODE$$.logError(arguments, "throws " + err);
    }

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

})();
