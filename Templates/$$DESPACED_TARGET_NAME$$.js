$include "infoheader.ijs"

// Do not run this code directly. 
// Instead, this code can be launched either in ExtendScript or in UXPScript,
// by running either the run_as_ExtendScript.jsx or the run_as_UXPScript.idjs 
// scripts from the Scripts Panel

$$SHORTCODE$$.main = main;

// The sample codes included below all need to have a 
// function main(){...} somewhere in the code

$if "$$STARTERCODE$$" == "HelloWorld"
$include "helloWorld.ijs"
$elif "$$STARTERCODE$$" == "ColoredTextFrames"
$include "coloredTextFrames.ijs"
$elif "$$STARTERCODE$$" == "MakeNewDoc"
$include "makeNewDoc.ijs"
$elif "$$STARTERCODE$$" == "Promises"
$include "promises.ijs"
$elif "$$STARTERCODE$$" == "Mandelbrot"
$include "mandelbrot.ijs"
$else
$include "emptyMain.ijs"
$endif
