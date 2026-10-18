@echo off
echo === Scrcpy Studio: build .exe ===
call npm install
if errorlevel 1 goto err
call npm run dist
if errorlevel 1 goto err
echo.
echo Done. Output is in the dist folder.
start "" dist
goto end
:err
echo An error occurred. Read the messages above.
:end
pause
