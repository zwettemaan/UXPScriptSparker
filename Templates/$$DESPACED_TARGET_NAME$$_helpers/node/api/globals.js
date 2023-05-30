if (! $$SHORTCODE$$.fs) {
    $$SHORTCODE$$.fs = require("fs");
}

if (! $$SHORTCODE$$.os) {
    $$SHORTCODE$$.os = require("os");
}

const express = require('express');

if (! $$SHORTCODE$$.app) {
    $$SHORTCODE$$.app = express();
}

$$SHORTCODE$$.C.HOST                 = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;
$$SHORTCODE$$.C.PORT                 = $$SHORTCODE$$.VALUE_NOT_INITIALIZED;


