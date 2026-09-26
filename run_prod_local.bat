@echo off
chcp 65001 > nul
echo ===================================================================
echo   [VSTEP Master] KHOI CHAY CHE DO PRODUCTION LOCAL DOMAIN
echo   Domain: http://vstep.local
echo ===================================================================

:: Kiem tra xem vstep.local da tro ve 127.0.0.1 chua
ping -n 1 vstep.local >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [CANH BAO] Domain vstep.local chua duoc cau hinh trong file hosts!
    echo Vui long chay file 'setup_domain_local.bat' (chi can chay 1 lan duy nhat).
    echo.
)

echo.
echo [1/3] Kiem tra production build Frontend...
if not exist "%~dp0vstep-app\dist\index.html" (
    echo Chua co thu muc dist, tien hanh build...
    cd /d "%~dp0vstep-app"
    call npm run build
    if %errorlevel% neq 0 (
        echo [LOI] Build that bai!
        pause
        exit /b 1
    )
)

echo.
echo [2/3] Dang khoi chay C# ASP.NET Core Backend (Port 5000)...
start "VSTEP Backend (.NET 10)" cmd /k "cd /d "%~dp0vstep-backend" && dotnet run"

echo.
echo [3/3] Dang khoi chay Production Preview Server (Port 80)...
start "VSTEP Production (Port 80)" cmd /k "cd /d "%~dp0vstep-app" && npm run preview"

echo.
echo ===================================================================
echo [XONG] Dang tu dong mo trinh duyet toi http://vstep.local ...
echo ===================================================================

timeout /t 3 >nul 2>&1
start http://vstep.local
