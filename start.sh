#!/bin/bash
# Simple startup script for Railway
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
