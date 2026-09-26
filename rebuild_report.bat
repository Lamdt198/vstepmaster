@echo off
chcp 65001 >nul
echo ========================================================
echo DANG RE-RENDER ANH TU FILE PLANTUML (.puml) VA CAP NHAT WORD DOCX...
echo ========================================================

python render_diagrams.py
if %ERRORLEVEL% NEQ 0 (
    echo [LOI] Render anh that bai. Kiem tra ket noi mang.
    pause
    exit /b 1
)

python create_ui_mockups.py
if %ERRORLEVEL% NEQ 0 (
    echo [LOI] Sinh anh UI mockups that bai.
    pause
    exit /b 1
)

python build_full_report.py
if %ERRORLEVEL% NEQ 0 (
    echo [LOI] Tao file Word that bai. Dong file Word neu dang mo va thu lai.
    pause
    exit /b 1
)

echo.
echo ========================================================
echo THANH CONG! TEP WORD DA DUOC CAP NHAT SAN SANG:
echo Bao_Cao_BTL_Thiet_Ke_Nang_Cao_VSTEP.docx
echo ========================================================
pause
