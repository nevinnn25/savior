@echo off
cd /d "%~dp0"
title SAVIOUR — single server 5179
echo.
echo  Freeing port 5179 if stuck...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5179 ^| findstr LISTENING') do (
  echo  Stopping PID %%a on 5179
  taskkill /F /PID %%a >nul 2>&1
)
timeout /t 1 /nobreak >nul
echo.
echo  Starting single server:
echo    Slides + Live demo: http://127.0.0.1:5179/   ^(demo is /demo^)
echo.
echo  Keep this window open. Close it or press Ctrl+C to stop server.
echo.
npm run dev
pause
