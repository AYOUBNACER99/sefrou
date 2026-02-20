@echo off
echo ========================================
echo Starting Sefrou Project
echo ========================================

start "MongoDB" cmd /k "mongod --dbpath %CD%\data\db"
timeout /t 3 /nobreak >nul

start "Backend Server" cmd /k "npm run server:dev"
timeout /t 2 /nobreak >nul

start "React App" cmd /k "npm run dev"

echo ========================================
echo All services started!
echo MongoDB: http://localhost:27017
echo Backend: http://localhost:5000
echo React App: http://localhost:5173
echo ========================================