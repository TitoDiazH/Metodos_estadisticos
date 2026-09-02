@echo off
REM ============================================================
REM  Levanta la plataforma de repaso en http://localhost:5173
REM  Uso:  serve.bat          -> puerto 5173
REM        serve.bat 5180     -> otro puerto
REM ============================================================
setlocal
cd /d "%~dp0"

if not "%~1"=="" set PORT=%~1

where py >nul 2>nul
if %errorlevel%==0 (
    py serve.py
    goto :fin
)

where python >nul 2>nul
if %errorlevel%==0 (
    python serve.py
    goto :fin
)

echo.
echo No se encontro Python en el PATH.
echo Instalalo con:   winget install Python.Python.3.12
echo o descargalo de: https://www.python.org/downloads/
echo.
pause

:fin
endlocal
