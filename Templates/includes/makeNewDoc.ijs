function main() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);

    $endif    
    var newDoc = app.documents.add();
    newDoc.save(
        $$SHORTCODE$$.dirs.DIR_DESKTOP + 
        "SampleDocumentFrom$$SHORTCODE$$.indd");
    newDoc.close(SaveOptions.NO);
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"

    $$SHORTCODE$$.logExit(arguments);
    $endif
}