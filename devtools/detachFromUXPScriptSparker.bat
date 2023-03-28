@ECHO OFF
SETLOCAL EnableDelayedExpansion

REM
REM Remove all the UXPScriptSparker templates and generation software
REM so the project becomes stand-alone
REM

SET UXPS_DEV_TOOLS_DIR=%~dp0

PUSHD %UXPS_DEV_TOOLS_DIR%..
SET PROJECT_ROOT_DIR=%cd%\
POPD

SET UXPS_COMMANDS_DIR=%PROJECT_ROOT_DIR%Windows\

REM
REM Don't even try if the project has not been generated
REM

SET REPLY=
IF NOT EXIST "%PROJECT_ROOT_DIR%BuildSettings%" (

    ECHO.
    ECHO This is an unconfigured UXPScriptSparker project.
    ECHO Make sure to read the documentation and then run SparkerConfig as instructed.
    ECHO Aborting.
    ECHO.

) ELSE (

    ECHO.
    ECHO This project will now stand on its own, and become independent of UXPScriptSparker.
    ECHO.
    ECHO This operation will delete all template files and UXPScriptSparker configuration
    ECHO software, and if necessary also detach the project from the UXPScriptSparker git repo.
    ECHO.
    ECHO Type 'YES' at the prompt only if you're sure you want to do this.
    ECHO.

    SET /P REPLY=Remove all UXPScriptSparker templating software and any ties to the UXPScriptSparker git repository [YES/NO]?: 

    IF "!REPLY!" == "YES" (

        PUSHD "%PROJECT_ROOT_DIR%"

        RD /s /q .git >NUL 2>&1
        DEL .gitignore
        DEL ReadMe.md
        DEL LICENSE
        RD /s /q Templates >NUL 2>&1
        DEL Mac\initialSetupConfigApp.command
        RD /s /q Mac\SparkerConfig.app >NUL 2>&1
        RD /s /q "Mac\ Do not forget to de-quarantine!.txt" >NUL 2>&1
        DEL Windows\SparkerConfig.exe
        RD /s /q Windows\SparkerConfig\ Libs >NUL 2>&1
        SET UXPS_DELETE_MYSELF="YES"

        ECHO.
        ECHO All ties to the UXPScriptSparker Github project have now been broken. This
        ECHO project is now a standalone project and can be put into a git repository
        ECHO as a brand new project.
        ECHO.

        POPD
    )
)

SET /P FINALIZE=Press [Enter] to finalize

IF "!REPLY!" == "YES" (
    RD /s /q "%UXPS_DEV_TOOLS_DIR%" >NUL 2>&1
)

