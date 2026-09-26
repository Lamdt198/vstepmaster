@echo off
chcp 65001 > nul
echo ===================================================
echo [VSTEP Master] Build toan bo ung dung (Backend + Frontend)
echo ===================================================

echo.
echo [1/2] Build C# ASP.NET Core Backend...
cd /d "%~dp0vstep-backend"
dotnet build
if %ERRORLEVEL% neq 0 (
    echo [LOI] Build Backend that bai!
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/2] Build React + Vite Frontend...
cd /d "%~dp0vstep-app"
call npm run build
if %ERRORLEVEL% neq 0 (
    echo [LOI] Build Frontend that bai!
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ===================================================
echo [THANH CONG] Toan bo du an da duoc build thanh cong!
echo Frontend production build: vstep-app\dist
echo Backend build: vstep-backend\bin\Debug\net10.0
echo ===================================================
pause
