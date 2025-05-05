"""
Minimal FastAPI application for Railway deployment
This is a simplified version of our main application that will help us
debug deployment issues on Railway.
"""
import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create a minimal FastAPI app
app = FastAPI(title="Taco App Minimal API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create API router for /api endpoints
from fastapi import APIRouter
api_router = APIRouter(prefix="/api")

# Simple root API endpoint
@api_router.get("/")
async def api_root():
    return {"message": "Taco App API is running"}

# Language selection endpoint
@api_router.get("/language-selection")
async def language_selection():
    return {
        "languages": [
            {"code": "en", "name": "English"},
            {"code": "es", "name": "Spanish"},
            {"code": "fr", "name": "French"},
            {"code": "de", "name": "German"},
            {"code": "it", "name": "Italian"}
        ]
    }

# Health check endpoint for Railway
@app.get("/health")
async def health_check():
    logger.info("Health check endpoint called")
    return {"status": "healthy"}

# Environment info endpoint
@app.get("/env")
async def env_info():
    # Get environment info (masking sensitive values)
    env_vars = {k: ("***" if "SECRET" in k or "PASSWORD" in k or "MONGODB" in k else v) 
               for k, v in os.environ.items()}
    return {
        "environment": env_vars,
        "railway": os.getenv("RAILWAY"),
        "port": os.getenv("PORT"),
    }

# Include API router
app.include_router(api_router)

# Serve static files from the frontend build directory
@app.on_event("startup")
async def startup_event():
    logger.info("Starting application...")
    logger.info(f"API endpoints registered at /api/*")
    
    # Check for frontend build directory
    frontend_path = "/app/frontend/build"
    if os.path.exists(frontend_path):
        logger.info(f"Found frontend build directory at {frontend_path}")
        # We'll handle static files in the catch-all route
    else:
        logger.warning(f"Frontend build directory not found at {frontend_path}")

# Catch-all route to serve index.html for any unmatched routes (for React routing)
@app.get("/{full_path:path}", response_class=HTMLResponse)
async def serve_index(full_path: str, request: Request):
    logger.info(f"Catch-all route accessed: {full_path}")
    frontend_path = "/app/frontend/build"
    index_path = os.path.join(frontend_path, "index.html")
    
    if os.path.exists(index_path):
        logger.info(f"Serving index.html for path: {full_path}")
        return FileResponse(index_path)
    else:
        logger.warning(f"index.html not found at {index_path}")
        return HTMLResponse(content="<html><body><h1>Taco App</h1><p>Frontend not found</p></body></html>")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    logger.info(f"Starting server on port {port}")
    uvicorn.run("railway_app:app", host="0.0.0.0", port=port)
