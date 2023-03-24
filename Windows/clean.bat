@ECHO OFF

REM
REM Remove locally created, compiled or derived data and attempt to 
REM bring the project back to a 'clean slate'.
REM

SETLOCAL EnableDelayedExpansion

IF "%JSXP_COMMANDS_DIR%" == "" (
    SET JSXP_COMMANDS_DIR=%~dp0
)

PUSHD "%JSXP_COMMANDS_DIR%.."
SET PROJECT_ROOT_DIR=%cd%\
POPD

CALL "%JSXP_COMMANDS_DIR%setTarget.bat"

PUSHD "%PROJECT_ROOT_DIR%"
IF NOT "%TARGET_SCRIPT_ROOT_DIR%" == "" (   

    SET REMOVE_STUB=
    IF "%TARGET_APP%" == "Illustrator" (
        
        SET REMOVE_STUB=1

    ) ELSE IF "%TARGET_APP%" == "Photoshop" (

        SET REMOVE_STUB=1

    ) ELSE IF "%TARGET_APP%" == "Premiere Pro" (

        SET REMOVE_STUB=1

    ) ELSE IF "%TARGET_APP%" == "Dreamweaver" (

        ECHO.
        ECHO Removing links from "%TARGET_APP_SCRIPT_DIR%"
        ECHO.

        IF EXIST "%TARGET_APP_SCRIPT_DIR%%DESPACED_TARGET_NAME%.%TARGET_FILENAME_EXTENSION%" (
            DEL "%TARGET_APP_SCRIPT_DIR%%DESPACED_TARGET_NAME%.%TARGET_FILENAME_EXTENSION%" >NUL 2>&1
        )
        IF EXIST "%TARGET_APP_SCRIPT_DIR%%DESPACED_TARGET_NAME%.htm" (
            DEL "%TARGET_APP_SCRIPT_DIR%%DESPACED_TARGET_NAME%.htm" >NUL 2>&1
        )
        IF EXIST "%TARGET_APP_SCRIPT_DIR%%DESPACED_TARGET_NAME%_helpers" (
            RD "%TARGET_APP_SCRIPT_DIR%%DESPACED_TARGET_NAME%_helpers" >NUL 2>&1
        )

    ) ELSE (

        IF EXIST "%TARGET_SCRIPT_ROOT_DIR%" (

            ECHO.
            ECHO Removing directory "%TARGET_SCRIPT_ROOT_DIR%"
            ECHO.

            RD /s /q "%TARGET_SCRIPT_ROOT_DIR%" >NUL 2>&1
        )
    )

    IF "!REMOVE_STUB!" == "1" (

        REM For Illustrator and Photoshop we don't use a link; instead we use a one-line stub script

        IF EXIST "%TARGET_APP_SCRIPT_DIR%%DESPACED_TARGET_NAME%.%TARGET_FILENAME_EXTENSION%" (

            ECHO.
            ECHO Removing %TARGET_APP% stub script "%TARGET_APP_SCRIPT_DIR%%DESPACED_TARGET_NAME%.%TARGET_FILENAME_EXTENSION%" 
            ECHO.

            DEL "%TARGET_APP_SCRIPT_DIR%%DESPACED_TARGET_NAME%.%TARGET_FILENAME_EXTENSION%"
        )
    )
)

IF NOT "%BUILD_DIR%" == "" (    
    
    IF EXIST "%BUILD_DIR%" (
        
        ECHO.
        ECHO Removing directory "%BUILD_DIR%"
        ECHO.

        RD /s /q "%BUILD_DIR%" >NUL 2>&1
    )
)

REM
REM Get rid of temporary extension
REM

IF EXIST "%EXTENSION_DIR%" (
    CD "%EXTENSION_DIR%"
    IF EXIST "%TEMP_SCRIPT_RUNNER_NAME%" (

        ECHO.
        ECHO Removing temporary script runner extension
        ECHO.

        RD /s /q "%TEMP_SCRIPT_RUNNER_NAME%" >NUL 2>&1
    )
)

POPD

IF NOT "%1" == "NESTED" (
    
    ECHO.
    ECHO Project is now clean
    ECHO.

    SET /P REPLY=Press [Enter] to finalize 
)
