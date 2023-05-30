//
// This is the compat API. It is available in ExtendScript, CEP/JavaScript and UXPScript 
//

function declareAPI() {

    $$SHORTCODE$$.clearImmediate         = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.clearInterval          = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.clearTimeout           = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.setImmediate           = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.setInterval            = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.setTimeout             = $$SHORTCODE$$.IMPLEMENTATION_MISSING;

}

declareAPI();

//----------- Tests
