//@targetengine $$SHORTCODE$$.extendScriptEngine

$include "infoheader.ijs"

// Generic launcher. Running this script will run the script in $$DESPACED_TARGET_NAME$$.js 
// in the ExtendScript environment

if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

//@include "$$DESPACED_TARGET_NAME$$_helpers/jsx/runtime.jsx"
$$SHORTCODE$$.loadModules($$SHORTCODE$$);

