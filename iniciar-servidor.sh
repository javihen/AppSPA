#!/bin/bash

echo "========================================"
echo "  SPA MANAGER - Servidor Local"
echo "========================================"
echo ""

# Intentar usar Python primero
if command -v python3 &> /dev/null; then
    echo "Iniciando servidor Python..."
    echo ""
    echo "Abre tu navegador en: http://localhost:8000"
    echo ""
    echo "Presiona Ctrl+C para detener el servidor"
    echo ""
    python3 -m http.server 8000
    exit 0
fi

# Si no tiene Python, probar Node.js
if command -v node &> /dev/null; then
    echo "Iniciando servidor Node.js..."
    echo ""
    echo "Abre tu navegador en: http://localhost:8080"
    echo ""
    echo "Presiona Ctrl+C para detener el servidor"
    echo ""
    npx http-server
    exit 0
fi

# Si no tiene Python ni Node.js
echo ""
echo "ERROR: No se encontró Python ni Node.js instalado"
echo ""
echo "SOLUCIONES:"
echo "1. Instala Python: brew install python3"
echo "2. O instala Node.js: brew install node"
echo "3. O simplemente abre index.html en tu navegador"
echo ""
echo "NOTA: Es más fácil solo abrir index.html directamente"
echo ""
