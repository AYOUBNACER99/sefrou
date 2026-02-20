@echo off
echo Starting MongoDB with data directory: %CD%\data\db
mongod --dbpath "%CD%\data\db"
pause