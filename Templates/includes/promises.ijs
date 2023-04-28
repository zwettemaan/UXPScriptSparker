function main() {

    var retVal;    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif
    var myFirstPromise = 
        new Promise(function(resolve, reject) {
            $$SHORTCODE$$.setTimeout(
                function() {
                    resolve("Success!"); // Yay! Everything went well!
                }, 
                250
            );
        }
    );
      
    retVal = myFirstPromise.then(
        function(successMessage) {
            $$SHORTCODE$$.alert('Yay! ' + successMessage);
        }
    );

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}
