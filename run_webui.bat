@echo off
REM Check if the ./frontend/dist folder exists
if not exist .\frontend\dist (
    echo Folder ./frontend/dist does not exist. Running npm build...
    REM Navigate to the frontend folder and run npm build
    cd frontend
    npm install
    npm run build
    cd ..
) else (
    echo Folder ./frontend/dist already exists. Skipping npm build.
)

REM Now run the server.py script
echo Running server.py...
cd backend
python server.py

pause
