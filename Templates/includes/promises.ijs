function main() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

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
      
    myFirstPromise.then(
        function(successMessage) {
            $$SHORTCODE$$.alert('Yay! ' + successMessage);
        }
    );

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}
