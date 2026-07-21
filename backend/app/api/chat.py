from fastapi import APIRouter

from app.schemas.schemas import ChatRequest, ChatResponse
from app.services.groq_service import generate_response

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):

    try:
        ai_response = generate_response(request.message)
        return ChatResponse(response=ai_response)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )