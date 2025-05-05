import os
import datetime
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import api
from app.routers.auth import router as auth_router
from app.database import init_db

# Load environment variables from .env file
load_dotenv()

app = FastAPI(title="Taco App API", description="Backend API for Taco App")

# Health check endpoint for Railway
@app.get("/health")
async def health_check():
    # Print debug info to logs
    print("Health check endpoint called")
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
origins = ["*"]  # Start with permissive setting for development

# Check for Railway-specific environment
if os.getenv("RAILWAY_ENVIRONMENT") or os.getenv("RAILWAY") == "true":
    print("Running in Railway environment, using permissive CORS settings")
    # The correct frontend URL based on previous memory
    frontend_url = "https://taco.up.railway.app"
    
    # In production Railway environment, we use wildcard origins for maximum compatibility
    origins = ["*"]
elif os.getenv("ENVIRONMENT") == "production":
    # For other production environments
    frontend_url = os.getenv("FRONTEND_URL", "https://taco.up.railway.app")
    origins = [
        frontend_url,
        "https://taco.up.railway.app",
    ]
else:
    # For local development - explicitly include localhost:3000
    origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*"
    ]
    frontend_url = "http://localhost:3000"

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

# Initialize MongoDB on startup
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
