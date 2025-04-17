#!/usr/bin/env python3
"""
Script to run the FastAPI backend server.
This simplifies the command to start the server.
"""
import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
