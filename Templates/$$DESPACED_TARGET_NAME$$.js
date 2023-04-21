$include "infoheader.iidjs"

// Do not run this code directly. 
// Instead, this code can be launched either in ExtendScript or in UXPScript,
// by running either the run_as_ES.jsx or the run_as_UXPScript.idjs 
// scripts from the Scripts Panel

$$SHORTCODE$$.main = function main() {

$if "$$STARTERCODE$$" == "HelloWorld"
    $$SHORTCODE$$.alert("Hello World");
$elif "$$STARTERCODE$$" == "MakeDoc"
    var newDoc = app.documents.add();
    newDoc.save($$SHORTCODE$$.dirs.DIR_DESKTOP + "SampleDocumentFrom$$SHORTCODE$$.indd");
    newDoc.close(SaveOptions.NO);
$endif

}
