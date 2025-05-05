#!/bin/bash
# Enhanced startup script for Railway with debugging
echo "Starting application..."
echo "Current directory: $(pwd)"
echo "Python path: $PYTHONPATH"
echo "Files in current directory:"
ls -la
echo "Files in /app directory:"
ls -la /app
echo "Files in /app/backend directory:"
ls -la /app/backend

# Start the application with explicit network binding
echo "Starting uvicorn server on port 8000"
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --log-level debug
