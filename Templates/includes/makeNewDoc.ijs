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
//
// Do not run this code directly. 
// Instead, this code can be launched either in ExtendScript or in UXPScript,
// by running either the run...jsx or the run...idjs 
// scripts from the Scripts Panel
//

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