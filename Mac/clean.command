#
# Remove locally created or derived data and attempt to 
# bring the project back to a 'clean slate'.
#

if [ "${UXPS_COMMANDS_DIR}" == "" -o ! -d "${UXPS_COMMANDS_DIR}" ]; then
    export UXPS_COMMANDS_DIR=`dirname "$0"`/
fi

pushd "${UXPS_COMMANDS_DIR}" > /dev/null

export UXPS_COMMANDS_DIR=`pwd`/

. setTarget.command

if [ "${TARGET_APP}" == "Illustrator" -o "${TARGET_APP}" == "Photoshop" -o "${TARGET_APP}" == "Premiere Pro" ]; then

    # For Illustrator, Photoshop and Premiere Pro we don't use a link; instead we use a one-line stub script
    
    if [ -e "${TARGET_APP_SCRIPT_DIR}${DESPACED_TARGET_NAME}.${TARGET_FILENAME_EXTENSION}" ]; then

        echo ""
        echo "Removing ${TARGET_APP} stub script ${TARGET_APP_SCRIPT_DIR}${DESPACED_TARGET_NAME}.${TARGET_FILENAME_EXTENSION}" 
        echo ""

        rm -f "${TARGET_APP_SCRIPT_DIR}${DESPACED_TARGET_NAME}.${TARGET_FILENAME_EXTENSION}"
    fi

elif [ "${TARGET_APP}" == "Dreamweaver" ]; then

    if [ -e "${TARGET_APP_SCRIPT_DIR}${DESPACED_TARGET_NAME}.${TARGET_FILENAME_EXTENSION}" ]; then

        echo ""
        echo "Removing links from ${TARGET_APP_SCRIPT_DIR}" 
        echo ""

        rm -f "${TARGET_APP_SCRIPT_DIR}${DESPACED_TARGET_NAME}.${TARGET_FILENAME_EXTENSION}"
        rm -f "${TARGET_APP_SCRIPT_DIR}${DESPACED_TARGET_NAME}.htm"
        rm -rf "${TARGET_APP_SCRIPT_DIR}${DESPACED_TARGET_NAME}_helpers"
    fi

else

    if [ -d "${TARGET_SCRIPT_ROOT_DIR}" ]; then

        echo ""
        echo "Removing directory ${TARGET_SCRIPT_ROOT_DIR}"
        echo ""

        rm -rf "${TARGET_SCRIPT_ROOT_DIR}"
    fi

fi

if [ "${BUILD_DIR}" != "" -a -d "${BUILD_DIR}" ]; then

    echo ""
    echo "Removing directory ${BUILD_DIR}"
    echo ""

    rm -rf "${BUILD_DIR}"
fi

if [ -d "${EXTENSION_DIR}" ]; then

    cd "${EXTENSION_DIR}"
    if [ -d "${TEMP_SCRIPT_RUNNER_NAME}" ]; then
        
        echo ""
        echo "Removing temporary script runner extension"
        echo ""

        rm -rf "${TEMP_SCRIPT_RUNNER_NAME}"
    fi
    
fi

if [ "${NESTED}" == "" ]; then
    echo ""
    echo "Project is now clean"
    echo ""
    echo "You can now close this Terminal window"
    echo ""
fi

popd > /dev/null
