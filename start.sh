#!/bin/bash
# Simplified startup script for Railway using minimal app
echo "Starting minimal Railway application..."
echo "Current directory: $(pwd)"
echo "Python path: $PYTHONPATH"
echo "Files in current directory:"
ls -la

# Set the Python path to include the project root
export PYTHONPATH=/app

# Start the application using the correct module path
echo "Starting FastAPI server on port $PORT"
cd /app && python -m uvicorn railway_app:app --host 0.0.0.0 --port ${PORT:-8000}
