#
# Illustrator's scripts folder is a 'system administered' folder
# This script tests for that, and makes it accessible if not
#

export MY_GROUP=`id -g -n`
export FILE_GROUP=`stat -f "%Sg" "$1"`
export FILE_PERMISSION=`stat -f %A "$1"`

if [ "${MY_GROUP}" != "staff" ]; then
    echo "You need to have a user account with administrative permissions"
    echo "Nothing was changed. Aborting"
    exit
fi

export NEED_PASSWORD="YES"
sudo --reset-timestamp

if [ "${FILE_GROUP}" != "staff" ]; then
    if [ "${NEED_PASSWORD}" == "YES" ]; then
        echo 'Enter your user password for this Mac:'
        export NEED_PASSWORD="NO"
    fi
    sudo chgrp -R staff "$1"
fi

if [ "${FILE_PERMISSION}" == "755" ]; then
    if [ "${NEED_PASSWORD}" == "YES" ]; then
        echo 'Enter your user password for this Mac:'
        export NEED_PASSWORD="NO"
    fi
    sudo chmod -R 775 "$1"
elif [ "${FILE_PERMISSION}" != "775" ]; then
    echo "File permissions are not 755 as expected. Nothing was changed. You'll need"
    echo "to check and change them to 775 manually"
fi
