$include "infoheader.ijs"

// Generic launcher. Running this script will run the script in $$DESPACED_TARGET_NAME$$.js 
// in the UXPScript environment

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

await global.require("./$$DESPACED_TARGET_NAME$$_helpers/idjs/runtime.idjs").loadModules($$SHORTCODE$$);