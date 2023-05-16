$if "$$TARGETCONTEXT$$" != "InDesign UXPScript+ExtendScript" and "$$TARGETCONTEXT$$" != "InDesign UXPScript" and "$$TARGETCONTEXT$$" != "InDesign ExtendScript"
function main() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif 
    // Empty main() function. The makeNewDoc template is not applicable in target context $$TARGETCONTEXT$$   
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logExit(arguments);
    $endif
}
$else
function main() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif    

    var newDoc = app.documents.add();
    newDoc.save(
        $$SHORTCODE$$.dirs.DIR_DESKTOP + 
        "SampleDocumentFrom$$SHORTCODE$$.indd");
    newDoc.close(SaveOptions.NO);
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logExit(arguments);
    $endif
}
$endif