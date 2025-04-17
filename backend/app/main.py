from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import api

app = FastAPI(title="Taco App API", description="Backend API for Taco App")

# Configure CORS to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(api.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Taco App API"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
