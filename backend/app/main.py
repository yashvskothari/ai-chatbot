from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import upload

from app.api.health import router as health_router
from app.api.chat import router as chat_router


app = FastAPI(
    title="AI Chatbot API",
    description="Backend API for the AI Chatbot project.",
    version="1.0.0",
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api/v1", tags=["Health"])
app.include_router(chat_router, prefix="/api/v1", tags=["Chat"])
app.include_router(upload.router, prefix="/api/v1", tags=["Upload"])


@app.get("/")
def root():
    return {"message": "Welcome to the AI Chatbot API!"}