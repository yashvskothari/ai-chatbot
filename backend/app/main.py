from fastapi import FastAPI
from app.api.health import router as health_router
from app.api.chat import router as chat_router

app = FastAPI(
    title="AI Chatbot API",
    description="Backend API for the AI Chatbot project.",
    version="1.0.0",
)

app.include_router(health_router, prefix="/api/v1", tags=["Health"])
app.include_router(chat_router, prefix="/api/v1", tags=["chat"])


@app.get("/")
def root():
    return {"message": "Welcome to the AI Chatbot API!"}
