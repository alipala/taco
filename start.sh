#!/bin/bash
# Simplified startup script for Railway using minimal app
echo "Starting minimal Railway application..."
echo "Current directory: $(pwd)"
echo "Python path: $PYTHONPATH"
echo "Files in current directory:"
ls -la

# Start the minimal application
echo "Starting minimal FastAPI server on port 8000"
python /app/railway_app.py
