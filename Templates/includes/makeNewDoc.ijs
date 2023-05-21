$if "$$TARGETCONTEXT$$" != "InDesign UXPScript+ExtendScript" and "$$TARGETCONTEXT$$" != "InDesign UXPScript" and "$$TARGETCONTEXT$$" != "InDesign ExtendScript"

// Empty main() function. The makeNewDoc template is not applicable in target context $$TARGETCONTEXT$$   
$include "emptyMain.ijs"

$else

function main() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif    

    var newDoc = $$SHORTCODE$$.G.app.documents.add();
    newDoc.save(
        $$SHORTCODE$$.dirs.DIR_DESKTOP + 
        "SampleDocumentFrom$$SHORTCODE$$.indd");
    newDoc.close(SaveOptions.NO);
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logExit(arguments);
    $endif
}

$endif