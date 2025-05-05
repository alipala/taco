"""
Minimal FastAPI application for Railway deployment
This is a simplified version of our main application that will help us
debug deployment issues on Railway.
"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

# Simple root endpoint
@app.get("/")
async def root():
    return {"message": "Taco App API is running"}

# Health check endpoint for Railway
@app.get("/health")
async def health_check():
    print("Health check endpoint called")
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

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("railway_app:app", host="0.0.0.0", port=port)
