@echo off
set "ORPHAN=%~dp0saviour"
echo This removes the leftover folder: %ORPHAN%
echo.
echo 1) Save your work and FULLY EXIT Cursor ^(File - Exit^).
echo 2) Optional: close other apps using Node ^(VS Code terminals, etc.^).
echo.
pause
taskkill /F /IM node.exe 2>nul
timeout /t 3 /nobreak >nul
if exist "%ORPHAN%" (
  rmdir /s /q "%ORPHAN%"
) else (
  echo Folder already gone.
)
if exist "%ORPHAN%" (
  echo.
  echo Still locked. Restart Windows, then double-click this file again.
) else (
  echo.
  echo Done. Open Cursor on: %~dp0
)
pause
