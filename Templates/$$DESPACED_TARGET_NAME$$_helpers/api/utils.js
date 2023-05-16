//
// This is the utils API. It is available in ExtendScript, CEP/JavaScript and UXPScript 
//

(function(){

function declareAPI() {

    $$SHORTCODE$$.alert        = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.checkMac     = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.checkWindows = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.checkLinux   = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.deepClone    = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.dQ           = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.logError     = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.logExit      = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.logMessage   = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.logNote      = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.logTrace     = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.logWarning   = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.popLogLevel  = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.pushLogLevel = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.randomGUID   = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.shallowClone = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.sQ           = $$SHORTCODE$$.IMPLEMENTATION_MISSING;
    $$SHORTCODE$$.toHex        = $$SHORTCODE$$.IMPLEMENTATION_MISSING;

}

//--------- Tests

var GUID_REGEX = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;

$$SHORTCODE$$.tests.checkMacWindowsLinux = function tests_checkMacWindowsLinux() {

    var retVal = false;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        
        try {

            var platformCount = 0;

            if ($$SHORTCODE$$.checkMac()) {
                platformCount++;
            }

            if ($$SHORTCODE$$.checkWindows()) {
                platformCount++;
            }

            if ($$SHORTCODE$$.checkLinux()) {
                platformCount++;
            }

            if (platformCount != 1) {
                $$SHORTCODE$$.logError(arguments, "check... methods result in indeterminate platform");
                break;
            }

            platformCount = 0;

            if ($$SHORTCODE$$.isMac) {
                platformCount++;
            }

            if ($$SHORTCODE$$.isWindows) {
                platformCount++;
            }

            if ($$SHORTCODE$$.isLinux) {
                platformCount++;
            }

            if (platformCount != 1) {
                $$SHORTCODE$$.logError(arguments, "status attributes cause indeterminate platform");
                break;
            }

            retVal = true;      
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
            retVal = false;
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.tests.deepClone = function tests_deepClone() {

    var retVal = false;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        try {

            if ($$SHORTCODE$$.deepClone(null) !== null) {
                $$SHORTCODE$$.logError(arguments, "null should clone to itself")
                break;
            }

            if ($$SHORTCODE$$.deepClone(undefined) !== undefined) {
                $$SHORTCODE$$.logError(arguments, "undefined should clone to itself")
                break;
            }

            if ($$SHORTCODE$$.deepClone(false) !== false) {
                $$SHORTCODE$$.logError(arguments, "false should clone to itself")
                break;
            }

            if ($$SHORTCODE$$.deepClone(true) !== true) {
                $$SHORTCODE$$.logError(arguments, "true should clone to itself")
                break;
            }

            if ($$SHORTCODE$$.deepClone(12) !== 12) {
                $$SHORTCODE$$.logError(arguments, "12 should clone to itself")
                break;
            }

            if ($$SHORTCODE$$.deepClone(12.12) !== 12.12) {
                $$SHORTCODE$$.logError(arguments, "12.12 should clone to itself")
                break;
            }
            
            if (! isNaN($$SHORTCODE$$.deepClone(NaN))) {
                $$SHORTCODE$$.logError(arguments, "NaN should clone to itself")
                break;
            }

            var f = function f(x) {
                return x + 1;
            }

            if ($$SHORTCODE$$.deepClone(f) !== f) {
                $$SHORTCODE$$.logError(arguments, "function should clone to itself")
                retVal = false;
                break;
            }

            var obj1 = {
                a: "a", 
                b: {
                    c: 12,
                    dddd: null,
                    eee: undefined,
                    fff: "",
                    ggg: false
                },
                c: [ 1, 2, 3]
            };

            var obj2 = $$SHORTCODE$$.deepClone(obj1);

            if (obj2 == obj1) {
                $$SHORTCODE$$.logError(arguments, "objects should be different")
                break;
            }

            if (obj2.a !== obj1.a) {
                $$SHORTCODE$$.logError(arguments, "string member a should be the same")
                break;
            }

            if (obj2.b === obj1.b) {
                $$SHORTCODE$$.logError(arguments, "nested object b should be a different object")
                break;
            }

            if (obj2.b.c != obj1.b.c) {
                $$SHORTCODE$$.logError(arguments, "numeric member b.c should be the same")
                break;
            }

            if (obj2.b.dddd !== obj1.b.dddd) {
                $$SHORTCODE$$.logError(arguments, "numeric member b.dddd should be the same")
                break;
            }

            if (obj2.b.eee !== obj1.b.eee) {
                $$SHORTCODE$$.logError(arguments, "numeric member b.eee should be the same")
                break;
            }

            if (obj2.b.fff !== obj1.b.fff) {
                $$SHORTCODE$$.logError(arguments, "string member b.fff should be the same")
                break;
            }

            if (obj2.b.ggg !== obj1.b.ggg) {
                $$SHORTCODE$$.logError(arguments, "boolean member b.ggg should be the same")
                break;
            }

            if (obj2.c == obj1.c) {
                $$SHORTCODE$$.logError(arguments, "array member c should be different")
                break;
            }

            if (obj2.c.length != obj1.c.length) {
                $$SHORTCODE$$.logError(arguments, "array member c should be same length")
                break;
            }

            if (obj2.c[1] != obj1.c[1]) {
                $$SHORTCODE$$.logError(arguments, "array member c[1] should be the same")
                break;
            }

            var arr1 = [
                "a", 
                {
                    c: 12,
                    d: [ {x:1} ],
                    dddd: null,
                    eee: undefined,
                    fff: "",
                    ggg: false
                }
            ];

            var arr2 = $$SHORTCODE$$.deepClone(arr1);

            if (arr2 == arr1) {
                $$SHORTCODE$$.logError(arguments, "arrays should be different")
                break;
            }

            if (arr2[0] != arr1[0]) {
                $$SHORTCODE$$.logError(arguments, "string member [0] should be the same")
                break;
            }

            if (arr2[1] === arr2[0]) {
                $$SHORTCODE$$.logError(arguments, "nested object [1] should be a different object")
                break;
            }

            if (arr2[1].c != arr1[1].c) {
                $$SHORTCODE$$.logError(arguments, "numeric member [1].c should be the same")
                break;
            }

            if (arr2[1].d === arr1[1].d) {
                $$SHORTCODE$$.logError(arguments, "numeric member [1].d should be a different array")
                break;
            }

            if (arr2[1].d[0] === arr1[1].d[0]) {
                $$SHORTCODE$$.logError(arguments, "numeric member [1].d[0] should be a different object")
                break;
            }

            if (arr2[1].dddd !== arr1[1].dddd) {
                $$SHORTCODE$$.logError(arguments, "numeric member [1].dddd should be the same")
                break;
            }

            if (arr2[1].eee !== arr1[1].eee) {
                $$SHORTCODE$$.logError(arguments, "numeric member [1].eee should be the same")
                break;
            }

            if (arr2[1].fff !== arr1[1].fff) {
                $$SHORTCODE$$.logError(arguments, "string member [1].fff should be the same")
                break;
            }

            if (arr2[1].ggg !== arr1[1].ggg) {
                $$SHORTCODE$$.logError(arguments, "boolean member [1].ggg should be the same")
                break;
            }

            retVal = true;      

        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
            retVal = false;
        }
    } 
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.tests.randomGUID = function tests_randomGUID() {

    var retVal = false;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        
        try {

            var guid1 = $$SHORTCODE$$.randomGUID();
            var guid2 = $$SHORTCODE$$.randomGUID();
            if (guid1 == guid2) {
                $$SHORTCODE$$.logError(arguments, "guids should be different");
                break;                
            }

            if (! guid1.match(GUID_REGEX)) {
                $$SHORTCODE$$.logError(arguments, "guid1 wrong format");
                break;                
            }

            if (! guid2.match(GUID_REGEX)) {
                $$SHORTCODE$$.logError(arguments, "guid2 wrong format");
                break;                
            }

            retVal = true;      
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
            retVal = false;
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.tests.toHex = function tests_toHex() {

    var retVal = false;
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"

    $$SHORTCODE$$.logEntry(arguments);
    $endif

    do {
        
        try {

            var tests = [
                {
                    value: 0,
                    digits: 0,
                    expected: ""
                },
                {
                    value: 0,
                    digits: 1,
                    expected: "0"
                },
                {
                    value: 0,
                    digits: 2,
                    expected: "00"
                },
                {
                    value: 0,
                    digits: 3,
                    expected: "000"
                },
                {
                    value: 0,
                    digits: 4,
                    expected: "0000"
                },
                {
                    value: 0,
                    digits: 16,
                    expected: "0000000000000000"
                },
                {
                    value: 12345678,
                    digits: 0,
                    expected: ""
                },
                {
                    value: 12345678,
                    digits: 1,
                    expected: "E"
                },
                {
                    value: 12345678,
                    digits: 2,
                    expected: "4E"
                },
                {
                    value: 12345678,
                    digits: 3,
                    expected: "14E"
                },
                {
                    value: 12345678,
                    digits: 4,
                    expected: "614E"
                },
                {
                    value: 12345678,
                    digits: 16,
                    expected: "0000000000BC614E"
                },
                {
                    value: -12345678,
                    digits: 16,
                    expected: undefined
                },
                {
                    value: 0.1,
                    digits: 4,
                    expected: undefined
                },
                {
                    value: NaN,
                    digits: 4,
                    expected: undefined
                },
                {
                    value: "123",
                    digits: 4,
                    expected: undefined
                },
                {
                    value: undefined,
                    digits: 4,
                    expected: undefined
                },
                {
                    value: null,
                    digits: 4,
                    expected: undefined
                },
                {
                    value: {a:1},
                    digits: 4,
                    expected: undefined
                }
            ];


            retVal = true;      
            for (var idx = 0; idx < tests.length; idx++) {
                var test = tests[idx];
                try {
                    $$SHORTCODE$$.pushLogLevel($$SHORTCODE$$.C.LOG_NONE);
                    var calculated = $$SHORTCODE$$.toHex(test.value, test.digits);
                    $$SHORTCODE$$.popLogLevel();
                    if (calculated !== test.expected) {
                        $$SHORTCODE$$.logError(arguments, "test #" + idx + " fails");
                        retVal = false;
                        break;
                    }
                }
                catch (err) {
                    $$SHORTCODE$$.logError(arguments, "tests throw " + err);
                    retVal = false;
                }
            }
        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
            retVal = false;
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

//------------

declareAPI();

})();