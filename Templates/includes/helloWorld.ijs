$if "$$TARGETCONTEXT$$" != "Node Express Server"

.vscode/launch.jsonfunction main() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif
    $$SHORTCODE$$.alert("Hello World");
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logExit(arguments);
    $endif
}

$else

function main() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif

    $$SHORTCODE$$.app.listen($$SHORTCODE$$.C.PORT, $$SHORTCODE$$.C.HOST, () => {
        console.log("Running on http://" + $$SHORTCODE$$.C.HOST + ":" + $$SHORTCODE$$.C.PORT);
    });

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logExit(arguments);
    $endif
}

$$SHORTCODE$$.app.get('/', (req, res) => {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif
    res.send('Hello World');
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logExit(arguments);
    $endif
});

$endif
