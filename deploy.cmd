@echo off
setlocal
cd /d "%~dp0"

echo ==============================================
echo   GolonganDarah - Deploy ke GitHub
echo ==============================================
echo.
echo Remote: 
git remote get-url origin
echo.

set STATUS_FILE=%TEMP%\goldarah_status.txt
git status --porcelain > "%STATUS_FILE%"

for /f "tokens=*" %%L in ('type "%STATUS_FILE%"') do goto ada_perubahan

echo Tidak ada perubahan lokal. Melakukan sinkronisasi saja.
goto sinkron

:ada_perubahan
set /p MSG=Pesan commit: 
if "%MSG%"=="" set MSG=Update pada %DATE% %TIME%

echo.
echo Menambahkan semua perubahan...
git add -A

echo.
echo Membuat commit...
git commit -m "%MSG%"
if errorlevel 1 goto gagal

:sinkron
echo.
echo Mengambil perubahan terbaru dari GitHub...
git pull --rebase origin master
if errorlevel 1 goto gagal

echo.
echo Mengirim ke GitHub...
git push origin master
if errorlevel 1 goto gagal

echo.
echo ==============================================
echo   Selesai. Repository sudah sinkron.
echo ==============================================
goto selesai

:gagal
echo.
echo ==============================================
echo   GAGAL. Periksa pesan di atas.
echo ==============================================

:selesai
del "%STATUS_FILE%" >nul 2>&1
echo.
pause
endlocal