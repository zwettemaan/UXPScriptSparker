function main() {
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logEntry(arguments);
    $endif
    
    $if "$$ENABLE_LOG_ENTRY_EXIT$$" == "ON"
    $$SHORTCODE$$.logExit(arguments);
    $endif
}