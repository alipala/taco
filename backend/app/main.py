import os
import datetime
import logging
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
from app.routers import api
from app.routers.auth import router as auth_router
from app.database import init_db

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

app = FastAPI(title="Taco App API", description="Backend API for Taco App")

# Ultra simple health check endpoint for Railway
@app.get("/health")
async def health_check():
    # Print debug info to logs
    print("Health check endpoint called")
    return {"status": "healthy"}

# Detailed health check endpoint for debugging
@app.get("/healthz")
async def detailed_health_check():
    # Print debug info to logs
    print("Detailed health check endpoint called")
    try:
        # Check database connection
        db_status = "connected" if init_db() else "disconnected"
    except Exception as e:
        db_status = f"error: {str(e)}"
    
    # Get environment info
    env_info = {
        "RAILWAY": os.getenv("RAILWAY"),
        "PORT": os.getenv("PORT"),
        "MONGODB_URL": "***" if os.getenv("MONGODB_URL") else None,
        "DATABASE_NAME": os.getenv("DATABASE_NAME"),
        "PYTHON_PATH": os.getenv("PYTHONPATH")
    }
    
    return {
        "status": "healthy",
        "timestamp": str(datetime.datetime.now()),
        "database": db_status,
        "environment": env_info
    }

# Configure CORS to allow requests from the frontend
origins = ["*"]  # Use permissive setting for all environments

# Print environment information
print(f"Running with environment variables:")
print(f"RAILWAY: {os.getenv('RAILWAY')}")
print(f"RAILWAY_ENVIRONMENT: {os.getenv('RAILWAY_ENVIRONMENT')}")
print(f"ENVIRONMENT: {os.getenv('ENVIRONMENT')}")
print(f"PORT: {os.getenv('PORT')}")

print(f"Configured CORS with origins: {origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(api.router)
app.include_router(auth_router)

# Serve frontend static files
@app.on_event("startup")
async def serve_frontend():
    logger.info("Checking for frontend build directory...")
    frontend_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "frontend", "build")
    
    if os.path.exists(frontend_path):
        logger.info(f"Found frontend build directory at {frontend_path}")
        
        # Mount static directories
        static_path = os.path.join(frontend_path, "static")
        if os.path.exists(static_path):
            logger.info(f"Mounting /static directory from {static_path}")
            app.mount("/static", StaticFiles(directory=static_path), name="static")
        
        # Add routes for specific files
        for file in ["manifest.json", "favicon.ico", "logo192.png", "logo512.png", "robots.txt"]:
            file_path = os.path.join(frontend_path, file)
            if os.path.exists(file_path):
                logger.info(f"Adding route for /{file}")
                
                # Create a closure to capture file_path
                def create_file_route(file_path):
                    path = f"/{os.path.basename(file_path)}"
                    @app.get(path)
                    async def serve_file():
                        return FileResponse(file_path)
                
                create_file_route(file_path)
    else:
        logger.warning(f"Frontend build directory not found at {frontend_path}")

# Catch-all route to serve index.html for client-side routing
@app.get("/{full_path:path}")
async def serve_index(full_path: str, request: Request):
    # Skip API routes
    if full_path.startswith("api/") or full_path == "health" or full_path == "healthz":
        return {"detail": "Not Found"}
        
    logger.info(f"Catch-all route accessed: {full_path}")
    frontend_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "frontend", "build")
    
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

# Initialize database
@app.on_event("startup")
async def startup_db_client():
    try:
        # Check if we're in Railway environment
        if os.getenv("RAILWAY_ENVIRONMENT"):
            print(f"Starting in Railway environment")
            # Print available environment variables for MongoDB (with sensitive info masked)
            mongo_vars = {
                k: ("*****" if "PASSWORD" in k else v) 
                for k, v in os.environ.items() 
                if "MONGO" in k
            }
            print(f"Available MongoDB environment variables: {mongo_vars}")
        
        # Initialize database
        await init_db()
        print("MongoDB initialized successfully")
        
    except Exception as e:
        print(f"ERROR initializing MongoDB: {str(e)}")
        print("The application will continue, but database functionality may be limited")

@app.get("/")
async def root():
    return {"message": "Welcome to Taco App API"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
