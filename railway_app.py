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
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
import jwt
from jwt.exceptions import InvalidTokenError
import requests
from datetime import datetime, timedelta

api_router = APIRouter(prefix="/api")
auth_router = APIRouter(prefix="/auth")

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

# Authentication models
class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: str
    name: str = None
    email: str = None

class GoogleLoginRequest(BaseModel):
    token: str

# Google login endpoint
@auth_router.post("/google-login", response_model=Token)
async def google_login(login_data: GoogleLoginRequest):
    """Login with Google OAuth token"""
    logger.info("Google login endpoint called")
    try:
        # Get the Google client ID from environment variables
        google_client_id = os.getenv("GOOGLE_CLIENT_ID")
        if not google_client_id:
            logger.error("Google client ID not found in environment variables")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Google authentication is not properly configured",
            )
            
        # Verify the token with Google
        try:
            # For demo purposes, we'll just validate the token format and return a mock response
            # In a real application, you would verify the token with Google's API
            if not login_data.token or len(login_data.token) < 20:
                raise ValueError("Invalid token format")
                
            # Mock user data - in a real app, this would come from Google's API response
            user_id = "google_user_123"
            name = "Demo User"
            email = "demo@example.com"
            
            # Create a JWT token
            access_token = jwt.encode(
                {"sub": user_id, "exp": datetime.utcnow() + timedelta(days=1)},
                "secret_key",  # In production, use a proper secret key
                algorithm="HS256"
            )
            
            logger.info(f"Google login successful for user: {email}")
            
            return {
                "access_token": access_token,
                "token_type": "bearer",
                "user_id": user_id,
                "name": name,
                "email": email
            }
        except ValueError as e:
            logger.error(f"Invalid Google token: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid Google token: {str(e)}",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except Exception as e:
        logger.error(f"Google authentication failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Google authentication failed: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )

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

# Include routers
app.include_router(api_router)
app.include_router(auth_router)

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

# Mount static files for specific directories
@app.on_event("startup")
async def mount_static_files():
    frontend_path = "/app/frontend/build"
    if os.path.exists(frontend_path):
        # Mount static directories first
        logger.info("Mounting static directories")
        static_dirs = ["static", "assets", "images"]
        for static_dir in static_dirs:
            static_path = os.path.join(frontend_path, static_dir)
            if os.path.exists(static_path) and os.path.isdir(static_path):
                logger.info(f"Mounting /{static_dir} directory")
                app.mount(f"/{static_dir}", StaticFiles(directory=static_path), name=static_dir)
        
        # Mount specific files
        for file in ["manifest.json", "favicon.ico", "logo192.png", "logo512.png", "robots.txt"]:
            file_path = os.path.join(frontend_path, file)
            if os.path.exists(file_path):
                logger.info(f"Adding route for /{file}")
                
                # Create a closure to capture file_path
                def create_file_route(file_path):
                    @app.get(f"/{os.path.basename(file_path)}")
                    async def serve_file():
                        return FileResponse(file_path)
                
                create_file_route(file_path)

# Catch-all route to serve index.html for any unmatched routes (for React routing)
@app.get("/{full_path:path}", response_class=HTMLResponse)
async def serve_index(full_path: str, request: Request):
    logger.info(f"Catch-all route accessed: {full_path}")
    frontend_path = "/app/frontend/build"
    
    # First check if the path exists as a static file
    requested_path = os.path.join(frontend_path, full_path)
    if os.path.exists(requested_path) and not os.path.isdir(requested_path):
        logger.info(f"Serving static file: {requested_path}")
        return FileResponse(requested_path)
    
    # If not a static file, serve index.html for client-side routing
    index_path = os.path.join(frontend_path, "index.html")
    if os.path.exists(index_path):
        logger.info(f"Serving index.html for client-side routing: {full_path}")
        return FileResponse(index_path)
    else:
        logger.warning(f"index.html not found at {index_path}")
        return HTMLResponse(content="<html><body><h1>Taco App</h1><p>Frontend not found</p></body></html>")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    logger.info(f"Starting server on port {port}")
    uvicorn.run("railway_app:app", host="0.0.0.0", port=port)
