#!/bin/bash

# Start backend
echo "Starting backend..."
cd backend
source .venv/bin/activate
python app.py &

# Start frontend
echo "Starting frontend..."
cd ..
npm start &

# Keep script running
wait
