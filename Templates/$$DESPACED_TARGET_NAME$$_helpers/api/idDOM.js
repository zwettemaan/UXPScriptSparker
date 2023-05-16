//
// This is the idDOM API. It is available in ExtendScript, CEP/JavaScript and UXPScript 
//

(function(){

function declareAPI() {

    $$SHORTCODE$$.instanceof = $$SHORTCODE$$.IMPLEMENTATION_MISSING;

}

//----------- Tests

$$SHORTCODE$$.tests.instanceof = function tests_instanceof() {

    var retVal = true;

    var tempDoc;

    do {
        try {

            if (! $$SHORTCODE$$.instanceof(app, "Application")) {
                retVal = false;
            }

            var tempDoc = app.documents.add(false);
            if (! $$SHORTCODE$$.instanceof(tempDoc, "Document")) {
                retVal = false;
            }

            var tf = tempDoc.textFrames.add();
            if (! $$SHORTCODE$$.instanceof(tf, "TextFrame")) {
                retVal = false;
            }

            var pi = tempDoc.pageItems.firstItem();
            if (! $$SHORTCODE$$.instanceof(pi, "PageItem")) {
                retVal = false;
            }

            // PageItem is not a JavaScript subclass, but it is an InDesign subclass 
            // of TextFrame
            if ($$SHORTCODE$$.instanceof(pi, "TextFrame")) {
                retVal = false;
            }

            if (! $$SHORTCODE$$.instanceof(pi.getElements()[0], "TextFrame")) {
                retVal = false;
            }
        }
        catch (err) {            
            retVal = false;
        }

    }
    while (false);

    if (tempDoc) {
        tempDoc.close(SaveOptions.NO);
    }
    
    return retVal;
}

//-------------------

declareAPI();

})();