import json

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from app.schemas.schemas import ChatRequest, ChatResponse
from app.services.groq_service import generate_response, stream_response

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    try:
        ai_response = generate_response(
            request.message,
            request.history,
            request.attachments,
        )
        return ChatResponse(response=ai_response)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.post("/chat/stream")
def chat_stream(request: ChatRequest):
    def event_generator():
        try:
            for token in stream_response(
                request.message,
                request.history,
                request.attachments,
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
