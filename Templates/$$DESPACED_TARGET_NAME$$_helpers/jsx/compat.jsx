//
// This code is exclusively ExtendScript. It provides ExtendScript-specific 
// implementations of the utils API.
//
(function() {

var timedFunctionList = undefined;
var cancelledTaskIds = {};
var taskIdCounter = 0;

$$SHORTCODE$$.clearImmediate = function(taskId) {

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);

    $endif

    clearTimedFunction(taskId);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.clearInterval = function(taskId) {

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);

    $endif

    clearTimedFunction(taskId);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.clearTimeout = function(taskId) {

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);

    $endif

    clearTimedFunction(taskId);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

function clearTimedFunction(taskId) {

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);

    $endif

    try {
        cancelledTaskIds[taskId] = true;
    }
    catch (err) {
        $$SHORTCODE$$.logError(arguments, "throws " + err);
    }

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
}

$$SHORTCODE$$.setImmediate = function setImmediate(taskFtn) {

    var retVal;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);

    $endif

    retVal = timedFunction(taskFtn, 0, false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.setInterval = function setInterval(taskFtn, timeoutMilliseconds) {

    var retVal;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);

    $endif

    retVal = timedFunction(taskFtn, timeoutMilliseconds, true);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

$$SHORTCODE$$.setTimeout = function setTimeout(taskFtn, timeoutMilliseconds) {

    var retVal;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);

    $endif

    retVal = timedFunction(taskFtn, timeoutMilliseconds, false);

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

function timedFunction(taskFtn, timeOutMilliseconds, isRepeat) {

    var retVal;

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);

    $endif

    do {
        try {

            taskIdCounter++;

            if (! timeOutMilliseconds) {
                timeOutMilliseconds = 0;
            }

            var callAfter = (new Date()).getTime() + timeOutMilliseconds;

            var taskEntry = {
                taskFtn: taskFtn, 
                taskId: taskIdCounter,
                timeOutMilliseconds: timeOutMilliseconds,
                callAfter: callAfter
            };

            if (! timedFunctionList) 
            {          
                timedFunctionList = [];

                var timedFunctionIdleTask = app.idleTasks.add();
                timedFunctionIdleTask.addEventListener(
                    IdleTask.ON_IDLE,
                    function() {

                        var activeTaskList = timedFunctionList;
                        timedFunctionList = undefined;

                        var activeCancelledTasks = cancelledTaskIds;
                        cancelledTaskIds = {};

                        var soonestCallAfter = undefined;

                        for (var taskIdx = 0; taskIdx < activeTaskList.length; taskIdx++) {

                            var now = (new Date()).getTime();

                            var task = activeTaskList[taskIdx];
                            var taskFinished = false;

                            if (task.taskId in cancelledTaskIds) {
                                taskFinished = true;
                            }
                            else if (now < task.callAfter) {

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

                                if (! timedFunctionList) {
                                    timedFunctionList = [];
                                }

                                timedFunctionList.push(task);

                                if (soonestCallAfter == undefined || task.callAfter < soonestCallAfter) {
                                    soonestCallAfter = task.callAfter;
                                }
                            }
                        }

                        if (! timedFunctionList) {
                            timedFunctionIdleTask.sleep = 0;
                        }
                        else {
                            var sleepTime = soonestCallAfter - (new Date()).getTime();
                            if (sleepTime < 1) {
                                sleepTime = 1;
                            }
                            timedFunctionIdleTask.sleep  = sleepTime;
                        }
                    }
                );

                timedFunctionIdleTask.sleep = timeOutMilliseconds; // That's the lowest we can go
            }

            timedFunctionList.push(taskEntry);
            retVal = taskEntry.taskId;

        }
        catch (err) {
            $$SHORTCODE$$.logError(arguments, "throws " + err);
        }
    }

    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);

    $endif
    return retVal;
}

})();