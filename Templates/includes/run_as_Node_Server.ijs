'use strict';

// Generic launcher. Running this script will run the script in $$DESPACED_TARGET_NAME$$.js 
// in the Node Express Server environment

if (! global.$$SHORTCODE$$) {
    global.$$SHORTCODE$$ = {};
}

var $$SHORTCODE$$ = global.$$SHORTCODE$$;

const runtime = require('./$$DESPACED_TARGET_NAME$$_helpers/node/runtime.js');

runtime.loadModules($$SHORTCODE$$);
