@echo off
REM Script para abrir un servidor local en Windows

echo ========================================
echo   SPA MANAGER - Servidor Local
echo ========================================
echo.

REM Intentar usar Python primero
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Iniciando servidor Python...
    echo.
    echo Abre tu navegador en: http://localhost:8000
    echo.
    echo Presiona Ctrl+C para detener el servidor
    echo.
    python -m http.server 8000
    goto end
)

REM Si no tiene Python, probar Node.js
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Iniciando servidor Node.js...
    echo.
    echo Abre tu navegador en: http://localhost:8080
    echo.
    echo Presiona Ctrl+C para detener el servidor
    echo.
    npx http-server
    goto end
)

REM Si no tiene Python ni Node.js
echo.
echo ERROR: No se encontró Python ni Node.js instalado
echo.
echo SOLUCIONES:
echo 1. Instala Python desde: https://www.python.org/downloads/
echo 2. O instala Node.js desde: https://nodejs.org/
echo 3. O simplemente haz doble click en index.html
echo.
echo NOTA: Es más fácil solo hacer doble click en index.html
echo.
pause

:end
