$if "$$USE_ASYNC$$" == "0"
$define ASYNC ""
$define AWAIT ""
$else
$define ASYNC "async "
$define AWAIT "await "
$endif