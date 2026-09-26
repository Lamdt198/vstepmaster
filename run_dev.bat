@echo off
chcp 65001 > nul
echo ===================================================================
echo   [VSTEP Master] KHOI CHAY HE THONG LOCAL (CHE DO BINH THUONG)
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5000 (Swagger: http://localhost:5000/swagger)
echo ===================================================================

echo.
echo [1/2] Dang khoi chay C# ASP.NET Core Backend (Port 5000)...
start "VSTEP Backend (.NET 10)" cmd /k "cd /d "%~dp0vstep-backend" && dotnet run"

echo.
echo [2/2] Dang khoi chay React Vite Frontend (Port 5173)...
start "VSTEP Frontend (Port 5173)" cmd /k "cd /d "%~dp0vstep-app" && npm run dev"

echo.
echo ===================================================================
echo [XONG] He thong da khoi dong trong 2 cua so Terminal rieng biet.
echo Dang tu dong mo trinh duyet toi http://localhost:5173 ...
echo ===================================================================

timeout /t 3 >nul 2>&1
start http://localhost:5173
