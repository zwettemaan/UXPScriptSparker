#
# Remove all the JSXSparker templates and generation software
# so the project becomes stand-alone
#

export JSXP_DEV_TOOLS_DIR=`dirname "$0"`/

pushd "$JSXP_DEV_TOOLS_DIR" > /dev/null

export JSXP_DEV_TOOLS_DIR=`pwd`/

export PROJECT_ROOT_DIR=`dirname "$JSXP_DEV_TOOLS_DIR"`/

cd "$PROJECT_ROOT_DIR"

export JSX_DELETE_MYSELF=0

#
# Don't even try if the project has not been generated
#
if [ ! -d "./BuildSettings" ]; then

    echo ""
    echo "This is an unconfigured JSXSparker project."
    echo "Make sure to read the documentation and then run SparkerConfig as instructed."
    echo "Aborting."
    echo ""

else

    echo ""
    echo "This project will now stand on its own, and become independent of JSXSparker"
    echo "This operation will delete all templates files and JSXSparker configuration"
    echo "software, and (if necessary) detach the project from the JSXSparker git repo."
    echo ""
    echo "Type 'YES' at the prompt only if you're sure you want to do this."

    read reply

    if [ "$reply" == "YES" ]; then

        rm -rf .git  
        rm -f .gitignore
        rm -f ReadMe.md
        rm -f LICENSE
        rm -rf Templates
        rm -f Mac/initialSetupConfigApp.command
        rm -rf Mac/SparkerConfig.app
        rm -rf "Mac/ Do not forget to de-quarantine!.txt"
        rm -f Windows/SparkerConfig.exe
        rm -rf Windows/SparkerConfig\ Libs
        export JSX_DELETE_MYSELF=1

        echo ""
        echo "All ties to the JSXSparker Github project have now been broken. This"
        echo "project is now a standalone project and can be put into a git repository"
        echo "as a brand new project."
        echo ""

    fi

fi

echo ""
echo "You can now close this Terminal window"
echo ""

popd > /dev/null

if [ "$JSX_DELETE_MYSELF" == "1" ]; then
    rm -rf "$JSXP_DEV_TOOLS_DIR"
fi