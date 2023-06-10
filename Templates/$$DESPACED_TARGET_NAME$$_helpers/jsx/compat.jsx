//
// This code is exclusively ExtendScript. It provides ExtendScript-specific 
// implementations of the utils API.
//

(function(){

var timedFunctionList = undefined;
var nextIdleAfter = undefined;
var cancelledTaskIds = {};
var taskIdCounter = 0;

$$SHORTCODE$$.clearImmediate = function _clearImmediate(taskId) {

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif
    clearTimedFunction(taskId);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.clearInterval = function _clearInterval(taskId) {

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif
    clearTimedFunction(taskId);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.clearTimeout = function _clearTimeout(taskId) {

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif
    clearTimedFunction(taskId);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

function clearTimedFunction(taskId) {

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif
    try {
        cancelledTaskIds[taskId] = true;
    }
    catch (err) {
        $$SHORTCODE$$.logError(arguments, "throws " + err);
    }

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.setImmediate = function _setImmediate(taskFtn) {

    var retVal;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif
    retVal = timedFunction(taskFtn, 0, false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.setInterval = function _setInterval(taskFtn, timeoutMilliseconds) {

    var retVal;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif
    retVal = timedFunction(taskFtn, timeoutMilliseconds, true);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.setTimeout = function _setTimeout(taskFtn, timeoutMilliseconds) {

    var retVal;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif
    retVal = timedFunction(taskFtn, timeoutMilliseconds, false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

function timedFunction(taskFtn, timeOutMilliseconds, isRepeat) {

    var retVal;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logEntry(arguments);

    $endif
    do {
        try {

            taskIdCounter++;

            if (! timeOutMilliseconds) {
                timeOutMilliseconds = 0;
            }

            var now = (new Date()).getTime();
            var callAfter = now + timeOutMilliseconds;

            var taskEntry = {
                taskFtn: taskFtn, 
                taskId: taskIdCounter,
                timeOutMilliseconds: timeOutMilliseconds,
                callAfter: callAfter
            };

            if (! timedFunctionList) 
            {          
                timedFunctionList = [];

                timedFunctionIdleTask = $$SHORTCODE$$.G.app.idleTasks.add();
                timedFunctionIdleTask.addEventListener(
                    IdleTask.ON_IDLE,
                    function() {

                        var activeTaskList = timedFunctionList ? timedFunctionList : [];
                        timedFunctionList = [];
                        nextIdleAfter = undefined;

                        var activeCancelledTasks = cancelledTaskIds;
                        cancelledTaskIds = {};

                        for (var taskIdx = 0; taskIdx < activeTaskList.length; taskIdx++) {

                            var now = (new Date()).getTime();

                            var task = activeTaskList[taskIdx];
                            var taskFinished = false;

                            if (task.taskId in activeCancelledTasks) {
                                taskFinished = true;
                            }
                            else if (task.callAfter < now) {

                                task.taskFtn();

                                taskFinished = ! isRepeat;
                                if (! isRepeat) {
                                    taskFinished = true;
                                }
                                else {
                                    now = (new Date()).getTime();
                                    task.callAfter = now + task.timeOutMilliseconds;
                                }
                            }

                            if (! taskFinished) {
                                timedFunctionList.push(task);
                            }
                        }

                        if (timedFunctionList.length == 0) {
                            timedFunctionList = undefined;
                            if (timedFunctionIdleTask) {
                                timedFunctionIdleTask.sleep = 0;
                            }
                            timedFunctionIdleTask = undefined;
                        }
                        else if (nextIdleAfter === undefined || nextIdleAfter > soonestCallAfter) {

                            var soonestCallAfter = undefined;
                            for (var taskIdx = 0; taskIdx < timedFunctionList.length; taskIdx++) {
                                if (soonestCallAfter === undefined || soonestCallAfter > task.callAfter) {
                                    soonestCallAfter = task.callAfter;
                                }
                            }

                            var now = (new Date()).getTime();
                            var sleepTime = soonestCallAfter - now;
                            if (sleepTime < 1) {
                                sleepTime = 1;
                            }
                            timedFunctionIdleTask.sleep  = sleepTime;
                            nextIdleAfter = now + sleepTime;
                        }
                    }
                );

            }

            timedFunctionList.push(taskEntry);
            retVal = taskEntry.taskId;

            if (nextIdleAfter !== undefined && (nextIdleAfter < callAfter)) {
                break;
            }

            var sleepTime = timeOutMilliseconds;
            if (sleepTime < 1) {
                sleepTime = 1; // That's the lowest we can go
            }

            timedFunctionIdleTask.sleep = sleepTime; 
            nextIdleAfter = now + sleepTime;

        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }
    while (false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" != "OFF"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

})();