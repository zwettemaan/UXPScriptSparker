﻿'use strict';

global.$$SHORTCODE$$ = {};
var $$SHORTCODE$$ = global.$$SHORTCODE$$;

const express = require('express');
const runtime = require('./$$DESPACED_TARGET_NAME$$_helpers/node/runtime.js');

runtime.loadModules($$SHORTCODE$$);

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});