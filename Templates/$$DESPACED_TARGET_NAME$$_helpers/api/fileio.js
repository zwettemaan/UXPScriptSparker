//
// This is the fileio API. It is available in ExtendScript, CEP/JavaScript and UXPScript 
//

(function(){


function declareAPI() {

    if (! $$SHORTCODE$$.fileio) {
        $$SHORTCODE$$.fileio = {};
    }
    
    $$SHORTCODE$$.fileio.FILEIO_APPEND_NEWLINE      = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
    $$SHORTCODE$$.fileio.FILEIO_DONT_APPEND_NEWLINE = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;

    $$SHORTCODE$$.fileio.appendUTF8TextFile         = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.fileio.readUTF8TextFile           = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.fileio.writeUTF8TextFile          = $$SHORTCODE$$.IMPLEMENTATION_MISSING;

}

//----------- Tests

if (! $$SHORTCODE$$.tests.fileio) {
    $$SHORTCODE$$.tests.fileio = {};
}

//-------------------

declareAPI();

})();