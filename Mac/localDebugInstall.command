#
# Setup the script to run from the application without making a copy
# of the script
#

if [ "${UXPS_COMMANDS_DIR}" == "" -o ! -d "${UXPS_COMMANDS_DIR}" ]; then
    export UXPS_COMMANDS_DIR=`dirname "$0"`/
fi

pushd "${UXPS_COMMANDS_DIR}" > /dev/null

export UXPS_COMMANDS_DIR=`pwd`/

. setTarget.command

if [ "${TARGET_APP}" == "Premiere Pro" ]; then

    if [ ! -d "${ADOBE_SCRIPTS_DIR}" ]; then
        mkdir "${ADOBE_SCRIPTS_DIR}"
    fi

    if [ ! -d "${TARGET_APP_SCRIPT_DIR}" ]; then
        mkdir "${TARGET_APP_SCRIPT_DIR}"
    fi

fi

if [ ! -d "${TARGET_APP_SCRIPT_DIR}" ]; then

    echo ""
    echo "Cannot find ${TARGET_APP_SCRIPT_DIR}"
    echo ""
    echo "Make sure you have launched Adobe ${TARGET_APP} ${TARGET_CC_VERSION} on this computer at least once."
    echo ""

else 

    if [ "${TARGET_APP}" == "Bridge" ]; then

        cd "${PROJECT_ROOT_DIR}"

        echo ""
        echo "Double-click the ${DESPACED_TARGET_NAME}.${TARGET_FILENAME_EXTENSION} script in the Bridge window"
        echo ""
        
        "${TARGET_APP_SCRIPT_DIR}/Adobe ${TARGET_APP} ${TARGET_CC_VERSION}.app/Contents/MacOS/Adobe ${TARGET_APP} ${TARGET_CC_VERSION}" `pwd` > /dev/null 2>&1 &

    elif [ "${TARGET_APP}" == "Premiere Pro" ]; then

        echo ""
        echo "Use the Script Runner panel (Window - Extensions - Script Runner) to run the script"
        echo ""
        
        cd "${EXTENSION_DIR}"

        if [ ! -d "${SCRIPT_RUNNER_NAME}" ]; then
            rm -rf "${TEMP_SCRIPT_RUNNER_NAME}"
            mkdir "${TEMP_SCRIPT_RUNNER_NAME}"
            cd "${TEMP_SCRIPT_RUNNER_NAME}"
            unzip "${PROJECT_ROOT_DIR}devtools/RorohikoScriptRunner.*.zxp"
        fi

        echo ""
        echo "Installing ${TARGET_APP} stub script ${TARGET_APP_SCRIPT_DIR}${DESPACED_TARGET_NAME}.${TARGET_FILENAME_EXTENSION}" 
        echo "Make sure to quit and restart ${TARGET_APP} to make the script appear in the menu." 
        echo ""

        echo "//@include \"${PROJECT_ROOT_DIR}${DESPACED_TARGET_NAME}.${TARGET_FILENAME_EXTENSION}\"" > "${TARGET_APP_SCRIPT_DIR}${DESPACED_TARGET_NAME}.${TARGET_FILENAME_EXTENSION}"

    elif [ "${TARGET_APP}" == "Dreamweaver" ]; then

        # For Dreamweaver we link the .js and htm files into the Commands directory

        echo ""
        echo "Installing links to htm+js file for ${TARGET_APP}"
        echo "Make sure to quit and restart ${TARGET_APP} to make the script appear in the menu." 
        echo ""

        ln -s "${PROJECT_ROOT_DIR}${DESPACED_TARGET_NAME}.${TARGET_FILENAME_EXTENSION}" "${TARGET_APP_SCRIPT_DIR}${DESPACED_TARGET_NAME}.${TARGET_FILENAME_EXTENSION}"
        ln -s "${PROJECT_ROOT_DIR}${DESPACED_TARGET_NAME}.htm" "${TARGET_APP_SCRIPT_DIR}${DESPACED_TARGET_NAME}.htm"
        ln -s "${PROJECT_ROOT_DIR}${DESPACED_TARGET_NAME}_helpers" "${TARGET_APP_SCRIPT_DIR}${DESPACED_TARGET_NAME}_helpers"

    elif [ "${TARGET_APP}" == "Illustrator" -o "${TARGET_APP}" == "Photoshop" ]; then

        # For Illustrator and Photoshop we don't use a link; instead we use a one-line stub script


        echo ""
        echo "Installing ${TARGET_APP} stub script ${TARGET_APP_SCRIPT_DIR}${DESPACED_TARGET_NAME}.${TARGET_FILENAME_EXTENSION}" 
        echo "Make sure to quit and restart ${TARGET_APP} to make the script appear in the menu." 
        echo ""

        echo "//@include \"${PROJECT_ROOT_DIR}${DESPACED_TARGET_NAME}.${TARGET_FILENAME_EXTENSION}\"" > "${TARGET_APP_SCRIPT_DIR}${DESPACED_TARGET_NAME}.${TARGET_FILENAME_EXTENSION}"

    else 

        echo ""
        echo "Removing ${TARGET_SCRIPT_ROOT_DIR}" 
        echo ""

        rm -rf "${TARGET_SCRIPT_ROOT_DIR}"

        echo ""
        echo "Re-creating ${TARGET_SCRIPT_ROOT_DIR}" 
        echo ""

        mkdir "${TARGET_SCRIPT_ROOT_DIR}"

        echo ""
        echo "Creating temporary symbolic links to the script and its 'helpers' directory inside directory ${TARGET_SCRIPT_ROOT_DIR}"
        echo ""

        ln -s "${PROJECT_ROOT_DIR}${DESPACED_TARGET_NAME}.${TARGET_FILENAME_EXTENSION}" "${TARGET_SCRIPT_ROOT_DIR}${DESPACED_TARGET_NAME}.${TARGET_FILENAME_EXTENSION}"
        ln -s "${PROJECT_ROOT_DIR}${DESPACED_TARGET_NAME}_helpers" "${TARGET_SCRIPT_ROOT_DIR}${DESPACED_TARGET_NAME}_helpers"

    fi

fi

echo ""
echo "You can now close this Terminal window"
echo ""

popd > /dev/null
