@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

echo ===================================================================
echo   [VSTEP Master] Cai dat Local Domain (http://vstep.local)
echo ===================================================================

:: Kiem tra quyen Administrator
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [THONG BAO] Dang yeu cau quyen Administrator (UAC)...
    echo Vui long bam [Yes] khi hop thoai xac nhan Windows xuat hien.
    powershell -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
    exit /b
)

set "HOSTS_FILE=%SystemRoot%\System32\drivers\etc\hosts"

echo.
echo [+] Dang kiem tra file hosts tai: %HOSTS_FILE%

findstr /i /c:"vstep.local" "%HOSTS_FILE%" >nul 2>&1
if %errorlevel% equ 0 (
    echo [*] Domain vstep.local da ton tai trong file hosts. Khong can ghi lai.
) else (
    echo [+] Dang them domain vstep.local vao file hosts...
    echo. >> "%HOSTS_FILE%"
    echo # [VSTEP Master Local Domain Mapping] >> "%HOSTS_FILE%"
    echo 127.0.0.1 vstep.local >> "%HOSTS_FILE%"
    echo 127.0.0.1 api.vstep.local >> "%HOSTS_FILE%"
    echo [OK] Da them '127.0.0.1 vstep.local' va '127.0.0.1 api.vstep.local'.
)

echo.
echo [+] Dang lam moi DNS Cache (ipconfig /flushdns)...
ipconfig /flushdns >nul 2>&1

echo.
echo ===================================================================
echo [THANH CONG] CAI DAT DOMAIN LOCAL HOAN TAT!
echo ===================================================================
echo Ban da co the truy cap he thong tai:
echo   - Ung dung Web:   http://vstep.local
echo   - Swagger Docs:   http://vstep.local/swagger
echo   - C# API Backend: http://vstep.local/api
echo ===================================================================
echo.
echo Buoc tiep theo: Chay file 'run_dev.bat' de khoi dong he thong!
echo.
pause
