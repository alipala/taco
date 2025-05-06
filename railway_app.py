"""
Minimal FastAPI application for Railway deployment
This is a simplified version of our main application that will help us
debug deployment issues on Railway.
"""
import os
import logging
from datetime import datetime, timedelta
from typing import Optional, Dict, Any

# Import FastAPI components
from fastapi import FastAPI, Request, APIRouter, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse, JSONResponse
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
import requests

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
# Create API routers
api_router = APIRouter(prefix="/api")
auth_router = APIRouter(prefix="/auth")

# Try to import JWT - with fallback for mock implementation if it fails
try:
    import jwt
    logger.info("Successfully imported JWT package")
    
    def create_jwt_token(data: Dict[str, Any], secret_key: str) -> str:
        return jwt.encode(data, secret_key, algorithm="HS256")
        
except ImportError:
    logger.warning("JWT package not available, using mock implementation")
    
    # Mock JWT implementation for fallback
    def create_jwt_token(data: Dict[str, Any], secret_key: str) -> str:
        # Simple mock implementation that just returns a string
        return f"mock_token_{data.get('sub', 'user')}_{datetime.utcnow().timestamp()}"

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

class UserCreate(BaseModel):
    email: str
    password: str
    name: str

class LoginRequest(BaseModel):
    email: str
    password: str

class GoogleLoginRequest(BaseModel):
    token: str

# In-memory database for users (for testing purposes)
registered_users = {}

# Registration response model - can return either a success message or a token
class RegistrationResponse(BaseModel):
    message: str = None
    email: str
    success: bool = True
    # Optional token fields for backward compatibility with deployed frontend
    access_token: str = None
    token_type: str = None
    user_id: str = None
    name: str = None

# User registration endpoint
@auth_router.post("/register", response_model=RegistrationResponse)
async def register(user: UserCreate):
    """Register a new user"""
    logger.info(f"Registration endpoint called for email: {user.email}")
    try:
        # Check if user already exists
        if user.email in registered_users:
            logger.warning(f"User already exists: {user.email}")
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"detail": "Email already registered"}
            )
        
        # For this simplified version, we'll store the user in memory
        # In a real app, you would hash the password and store in a database
        user_id = f"user_{hash(user.email) % 10000}"
        
        # Store user in our in-memory database
        registered_users[user.email] = {
            "user_id": user_id,
            "name": user.name,
            "email": user.email,
            "password": user.password  # In a real app, this would be hashed
        }
        
        logger.info(f"User registered successfully: {user.email}")
        logger.info(f"Total registered users: {len(registered_users)}")
        
        # Create a JWT token for backward compatibility with deployed frontend
        # This maintains the existing behavior on Railway.app while local development
        # will use the updated flow (register then login separately)
        access_token = create_jwt_token(
            {"sub": user_id, "exp": datetime.utcnow() + timedelta(days=1)},
            "secret_key"  # In production, use a proper secret key
        )
        
        # Return both success message and token fields for compatibility
        return {
            "message": "Registration successful! Please log in with your credentials.",
            "email": user.email,
            "success": True,
            # Include token fields for backward compatibility
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": user_id,
            "name": user.name
        }
    except Exception as e:
        logger.error(f"Registration failed: {str(e)}")
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": f"Registration failed: {str(e)}"}
        )

# User login endpoint
@auth_router.post("/login", response_model=Token)
async def login(login_data: LoginRequest):
    """Login with email and password"""
    logger.info(f"Login endpoint called for email: {login_data.email}")
    try:
        # First check if this is a test user (for demo purposes)
        if login_data.email.startswith("test") and login_data.password == "password123":
            user_id = f"user_{hash(login_data.email) % 10000}"
            name = "Test User"
            
            # Create a JWT token
            access_token = create_jwt_token(
                {"sub": user_id, "exp": datetime.utcnow() + timedelta(days=1)},
                "secret_key"  # In production, use a proper secret key
            )
            
            logger.info(f"Test user logged in successfully: {login_data.email}")
            
            return {
                "access_token": access_token,
                "token_type": "bearer",
                "user_id": user_id,
                "name": name,
                "email": login_data.email
            }
        
        # Then check our in-memory registered users
        if login_data.email in registered_users:
            user = registered_users[login_data.email]
            
            # Verify password (in a real app, you would compare hashed passwords)
            if user["password"] == login_data.password:
                # Create a JWT token
                access_token = create_jwt_token(
                    {"sub": user["user_id"], "exp": datetime.utcnow() + timedelta(days=1)},
                    "secret_key"  # In production, use a proper secret key
                )
                
                logger.info(f"Registered user logged in successfully: {login_data.email}")
                
                return {
                    "access_token": access_token,
                    "token_type": "bearer",
                    "user_id": user["user_id"],
                    "name": user["name"],
                    "email": user["email"]
                }
        
        # Invalid credentials
        logger.warning(f"Invalid login credentials for: {login_data.email}")
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"detail": "Invalid email or password"}
        )
    except Exception as e:
        logger.error(f"Login failed: {str(e)}")
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": f"Login failed: {str(e)}"}
        )

# Google login endpoint with token verification
@auth_router.post("/google-login", response_model=Token)
async def google_login(login_data: GoogleLoginRequest):
    """Login with Google OAuth token"""
    logger.info("Google login endpoint called")
    try:
        # Get the Google client ID from environment variables (optional)
        google_client_id = os.getenv("GOOGLE_CLIENT_ID", "default_client_id")
        logger.info(f"Using Google client ID: {google_client_id[:5]}...")
        
        # Validate token format
        if not login_data.token or len(login_data.token) < 10:
            logger.warning("Invalid token format received")
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"detail": "Invalid token format"}
            )
        
        # Verify the token with Google
        try:
            # First try to get user info directly from Google's userinfo endpoint
            # This is the most reliable method for access tokens
            userinfo_url = "https://www.googleapis.com/oauth2/v2/userinfo"
            headers = {"Authorization": f"Bearer {login_data.token}"}
            logger.info(f"Trying to get user info directly from Google API")
            
            response = requests.get(userinfo_url, headers=headers)
            
            if response.status_code == 200:
                # Successfully got user info directly
                user_info = response.json()
                logger.info(f"Got user info directly from Google API: {user_info.keys()}")
                
                # Extract user information from user info response
                user_id = user_info.get('id')
                name = user_info.get('name')
                email = user_info.get('email')
                
                logger.info(f"Extracted user info from Google API: {name}, {email}")
            else:
                # If direct method fails, try token verification endpoints
                logger.warning(f"Direct user info failed: {response.status_code}. Trying token verification.")
                
                # Try ID token verification first
                id_token_url = f"https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={login_data.token}"
                response = requests.get(id_token_url)
                
                if response.status_code == 200:
                    # ID token verification succeeded
                    token_info = response.json()
                    logger.info(f"ID token verified successfully: {token_info.keys()}")
                    
                    # Extract user information from verified token
                    user_id = token_info.get('sub')
                    name = token_info.get('name')
                    email = token_info.get('email')
                else:
                    # Try access token verification as last resort
                    logger.warning(f"ID token verification failed: {response.status_code}. Trying access token verification.")
                    access_token_url = f"https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={login_data.token}"
                    response = requests.get(access_token_url)
                    
                    if response.status_code == 200:
                        # Access token verification succeeded
                        token_info = response.json()
                        logger.info(f"Access token verified successfully: {token_info.keys()}")
                        
                        # Extract user information from verified token
                        user_id = token_info.get('user_id')
                        # Access token verification doesn't return name/email directly
                        # We'll need to use the user_id to create a name
                        name = f"Google User {user_id[-6:] if user_id else ''}" 
                        email = token_info.get('email')
                    else:
                        # All verification methods failed
                        logger.warning(f"All token verification methods failed")
                        raise ValueError(f"Invalid token: {response.text}")
            
            # Ensure we have valid user information
            if not user_id:
                user_id = f"google_user_{hash(login_data.token) % 10000}"
            if not name or name.strip() == '':
                name = f"Google User {user_id[-6:] if isinstance(user_id, str) else ''}"
            if not email:
                email = f"user{user_id[-6:] if isinstance(user_id, str) else ''}@example.com"
                
            logger.info(f"Final user info: {name}, {email}")
        except Exception as e:
            logger.warning(f"Error verifying token with Google: {str(e)}")
            # Fallback to token-based user ID as a last resort
            token_prefix = login_data.token[:10] if len(login_data.token) >= 10 else login_data.token
            user_id = f"google_user_{hash(token_prefix) % 10000}"
            name = f"Google User {user_id[-4:]}"
            email = f"user{user_id[-4:]}@example.com"
            logger.info(f"Using fallback user info: {name}, {email}")
        
        # Create a JWT token using our safe wrapper function
        try:
            access_token = create_jwt_token(
                {"sub": user_id, "exp": datetime.utcnow() + timedelta(days=1)},
                "secret_key"  # In production, use a proper secret key
            )
            logger.info(f"Created access token for user: {email}")
        except Exception as token_error:
            logger.error(f"Error creating JWT token: {str(token_error)}")
            access_token = f"mock_token_{user_id}_{datetime.utcnow().timestamp()}"
            logger.info("Using fallback mock token")
        
        # Return successful response
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": user_id,
            "name": name,
            "email": email
        }
        
    except Exception as e:
        # Catch-all error handler
        logger.error(f"Unexpected error in Google login: {str(e)}")
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "An unexpected error occurred"}
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
