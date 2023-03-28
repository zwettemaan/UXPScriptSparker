#
# De-quarantine the configuration app
#

if [ "${UXPS_COMMANDS_DIR}" == "" -o ! -d "${UXPS_COMMANDS_DIR}" ]; then
	export UXPS_COMMANDS_DIR=`dirname "$0"`/
fi

pushd "${UXPS_COMMANDS_DIR}" > /dev/null

export UXPS_COMMANDS_DIR=`pwd`/

xattr -dr com.apple.quarantine SparkerConfig.app
xattr -dr com.apple.quarantine *.command

cd ../devtools

xattr -dr com.apple.quarantine *.command

echo ""
echo '*.command scripts and SparkerConfig.app are now de-quarantined.'
echo ""
echo "You can now close this Terminal window"
echo ""

popd > /dev/null
