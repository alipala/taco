#!/bin/bash

# Script to prepare the frontend build for Railway deployment
# This script replaces the standard authService.js with a Railway-specific version

echo "Preparing frontend for Railway deployment..."

# Check if we're running in the Railway environment
if [ "$RAILWAY" = "true" ] || [ "$RAILWAY_ENVIRONMENT" = "production" ]; then
  echo "Running in Railway environment, applying Railway-specific changes"
  
  # Replace the authService.js with the Railway-specific version
  if [ -f "frontend/src/services/authService.railway.js" ]; then
    echo "Replacing authService.js with Railway-specific version"
    cp frontend/src/services/authService.railway.js frontend/src/services/authService.js
    echo "Replacement complete"
  else
    echo "ERROR: Railway-specific authService.railway.js not found!"
    exit 1
  fi
else
  echo "Not running in Railway environment, skipping Railway-specific changes"
fi

echo "Frontend preparation complete"
