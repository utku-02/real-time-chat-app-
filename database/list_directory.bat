@echo off
setlocal enabledelayedexpansion

rem Prompt the user to enter the directory path
set /p "directory=Enter the directory path: "

rem Check if the directory exists
if not exist "%directory%" (
    echo Directory does not exist.
    pause
    exit /b
)

rem Function to list contents of files excluding package-lock.json
:ListFilesAndContents
for /f "tokens=*" %%f in ('dir /b /s /a:-d "%~1"') do (
    if not "%%~nxf"=="package-lock.json" (
        echo File: %%f
        echo -------------------------------------------------------------------------------
        rem Read and display the content of each file
        for /f "delims=" %%a in ('type "%%f" 2^>nul') do (
            set "line=%%a"
            echo    !line!
        )
        echo.
    )
)
exit /b

rem List folders and their contents
echo Root Directory: %directory%
call :ListFilesAndContents "%directory%"

rem Query for input at the end to keep the window open
echo.
echo Press Enter to exit...
set /p end=
