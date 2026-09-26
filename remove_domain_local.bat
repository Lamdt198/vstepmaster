@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

echo ===================================================================
echo   [VSTEP Master] Go bo Local Domain khoi file hosts
echo ===================================================================

:: Kiem tra quyen Administrator
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [THONG BAO] Dang yeu cau quyen Administrator (UAC)...
    powershell -Command "Start-Process cmd -ArgumentList '/c \"\"%~f0\"\"' -Verb RunAs"
    exit /b
)

set "HOSTS_FILE=%SystemRoot%\System32\drivers\etc\hosts"

echo [+] Dang go bo cac dong vstep.local khoi file hosts...
powershell -Command "$f = '%HOSTS_FILE%'; (Get-Content $f) | Where-Object { $_ -notmatch 'vstep\.local' } | Set-Content $f -Encoding UTF8"

ipconfig /flushdns >nul 2>&1

echo [OK] Da go bo cau hinh domain local thanh cong.
echo ===================================================================
pause
