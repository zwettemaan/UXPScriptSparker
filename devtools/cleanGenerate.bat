@ECHO OFF

REM
REM Undo the generation step. This will remove all your hard work.
REM Do not run this unless you're absolutely sure
REM

SETLOCAL EnableDelayedExpansion

SET UXSP_DEV_TOOLS_DIR=%~dp0

PUSHD %UXSP_DEV_TOOLS_DIR%..
SET PROJECT_ROOT_DIR=%cd%\
POPD

SET UXSP_COMMANDS_DIR=%PROJECT_ROOT_DIR%Windows\

REM
REM Don't even try if the project has not been generated
REM
IF NOT EXIST "%PROJECT_ROOT_DIR%BuildSettings%" (
    ECHO.
    ECHO This project has not been configured yet - nothing to remove.
    ECHO Aborting.
    ECHO.
) ELSE (

    PUSHD "%PROJECT_ROOT_DIR%"

    CALL "%UXSP_COMMANDS_DIR%setTarget.bat"

    ECHO.
    ECHO WARNING WARNING WARNING
    ECHO.
    ECHO This will irrevokably delete all generated files.
    ECHO.
    ECHO Type 'YES' at the prompt only if you're really sure
    ECHO you want to do this.
    ECHO.

    SET /P REPLY=Delete generated files [YES/NO]?: 

    IF "!REPLY!" == "YES" (

        CALL "%UXSP_COMMANDS_DIR%clean.bat" NESTED

        ECHO.
        ECHO Removing generated files
        ECHO.

        IF EXIST "!DESPACED_TARGET_NAME!.js" (
            DEL "!DESPACED_TARGET_NAME!.js"
        )

        IF EXIST "run_as_UXPScript.!TARGET_FILENAME_EXTENSION!" (
            DEL "run_as_UXPScript.!TARGET_FILENAME_EXTENSION!"
        )

        IF EXIST "run_as_ES.jsx" (
            DEL "run_as_ES.jsx"
        )

        IF EXIST "ReadMe for !DESPACED_TARGET_NAME!.md" (
            DEL "ReadMe for !DESPACED_TARGET_NAME!.md"
        )

        IF EXIST "!DESPACED_TARGET_NAME!_helpers" (
            RD /s /q "!DESPACED_TARGET_NAME!_helpers" >NUL 2>&1
        )

        IF EXIST "BuildSettings" (
            RD /s /q BuildSettings >NUL 2>&1  
        )

        IF EXIST ".vscode" (
                RD /s /q .vscode >NUL 2>&1
        )

        IF EXIST "VSCode" (
                RD /s /q VSCode >NUL 2>&1
        )

        ECHO.
        ECHO This project has been reset to an unconfigured, blank state.
        ECHO.

    )

    POPD
)

ECHO.
SET /P REPLY=Press [Enter] to finalize 
