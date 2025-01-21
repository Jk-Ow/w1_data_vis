#!/bin/bash

# Check if the ./frontend/dist folder exists
if [ ! -d "./frontend/dist" ]; then
    echo "Folder ./frontend/dist does not exist. Running npm build..."
    # Navigate to the frontend folder and run npm build
    cd frontend || exit
    npm install
    npm run build
    cd ..
else
    echo "Folder ./frontend/dist already exists. Skipping npm build."
fi

# Now run the server.py script
echo "Running server.py..."
cd backend || exit
python3 server.py
