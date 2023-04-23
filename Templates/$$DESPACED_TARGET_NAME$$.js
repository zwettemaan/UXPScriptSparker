$include "infoheader.ijs"

// Do not run this code directly. 
// Instead, this code can be launched either in ExtendScript or in UXPScript,
// by running either the run_as_ES.jsx or the run_as_UXPScript.idjs 
// scripts from the Scripts Panel

$$SHORTCODE$$.main =
$if "$$STARTERCODE$$" == "HelloWorld"
$include "helloWorld.ijs"
$elif "$$STARTERCODE$$" == "ColoredTextFrames"
$include "coloredTextFrames.ijs"
$elif "$$STARTERCODE$$" == "MakeNewDoc"
$include "makeNewDoc.ijs"
$else
$include "emptyMain.ijs"
$endif
