//
// This is the compat API. It is available in ExtendScript, CEP/JavaScript and UXPScript 
//

/**
* Function that either maps to `clearImmediate` or, in ExtendScript, to a substitute implementation.
* Calling $$SHORTCODE$$.clearImmediate works in all environments and can be used in shared code.
* 
* @function $$SHORTCODE$$.clearImmediate
* 
* @param {any} taskId - Identifies the pending immediate to clear. This is the value returned by `$$SHORTCODE$$.setImmediate()`.
*/

$$SHORTCODE$$.clearImmediate = function(taskId) { return $$SHORTCODE$$.IMPLEMENTATION_MISSING; };

/**
* Function that either maps to `clearInterval` or, in ExtendScript, to a substitute implementation.
* Calling $$SHORTCODE$$.clearInterval works in all environments and can be used in shared code.
* 
* @function $$SHORTCODE$$.clearInterval
* 
* @param {any} taskId - Identifies the pending immediate to clear. This is the value returned by `$$SHORTCODE$$.setImmediate()`.
*/

$$SHORTCODE$$.clearInterval = function(taskId) { return $$SHORTCODE$$.IMPLEMENTATION_MISSING; };

/**
* Function that either maps to `clearTimeout` or, in ExtendScript, to a substitute implementation.
* Calling $$SHORTCODE$$.clearTimeout works in all environments and can be used in shared code.
* 
* @function $$SHORTCODE$$.clearTimeout
* 
* @param {any} taskId - Identifies the pending immediate to clear. This is the value returned by `$$SHORTCODE$$.setImmediate()`.
*/

$$SHORTCODE$$.clearTimeout = function(taskId) { return $$SHORTCODE$$.IMPLEMENTATION_MISSING; };

/**
* Function that either maps to `setImmediate` or, in ExtendScript, to a substitute implementation.
* Delay a call to a callback to the next tick of the event loop or next idle time (in ExtendScript)
* 
* @function $$SHORTCODE$$.setImmediate
* 
* @param {function} taskFtn - function to call
* @return {any} taskId - Identifies the pending immediate. This is the value passed to `$$SHORTCODE$$.clearImmediate()`.
*/

$$SHORTCODE$$.setImmediate = function(taskFtn) { return $$SHORTCODE$$.IMPLEMENTATION_MISSING; };

/**
* Function that either maps to `setInterval` or, in ExtendScript, to a substitute implementation.
* Delay a call to a callback for at least the requested amount of time. Calls the callback repeatedly,
* with a minimum delay between each call, until the `$$SHORTCODE$$.clearInterval()` method is called.
* 
* @function $$SHORTCODE$$.setInterval
* 
* @param {function} taskFtn - function to call
* @param {number} timeoutMilliseconds - minimum delay in milliseconds
* @return {any} taskId - Identifies the pending interval. This is the value passed to `$$SHORTCODE$$.clearImmediate()`.
*/

$$SHORTCODE$$.setInterval = function(taskFtn, timeoutMilliseconds) { return $$SHORTCODE$$.IMPLEMENTATION_MISSING; };

/**
* Function that either maps to `setInterval` or, in ExtendScript, to a substitute implementation.
* Delay a call to a callback for at least the requested amount of time. Can be cancelled by calling `$$SHORTCODE$$.clearTimeout()`.
* 
* @function $$SHORTCODE$$.setTimeout
* 
* @param {function} taskFtn - function to call
* @param {number} timeoutMilliseconds - minimum delay in milliseconds
* @return {any} taskId - Identifies the pending timeout. This is the value passed to `$$SHORTCODE$$.clearTimeout()`.
*/

$$SHORTCODE$$.setTimeout = function(taskFtn, timeoutMilliseconds) { return $$SHORTCODE$$.IMPLEMENTATION_MISSING; };

//----------- Tests
