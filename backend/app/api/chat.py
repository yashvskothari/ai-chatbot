import json

from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse
from app.dependencies.auth import get_current_user
from app.schemas.schemas import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(
    request: ChatRequest,
    current_user=Depends(get_current_user),
):
    try:
        ai_response = ChatService.generate(
            provider=request.provider,
            model=request.model,
            message=request.message,
            history=request.history,
            attachments=request.attachments,
        )

        return ChatResponse(response=ai_response)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.post("/chat/stream")
def chat_stream(
    request: ChatRequest,
    current_user=Depends(get_current_user),
):

    def event_generator():
        try:
            for token in ChatService.stream(
                provider=request.provider,
                model=request.model,
                message=request.message,
                history=request.history,
                attachments=request.attachments,
            ):
                yield f"data: {json.dumps({'token': token})}\n\n"

            yield "data: [DONE]\n\n"

        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )