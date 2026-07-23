from typing import Literal, Optional

from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    """A single turn of prior conversation history sent by the client."""

    role: Literal["user", "assistant"]
    content: str


class AttachmentContext(BaseModel):
    """
    Extracted content for a document or image the user has uploaded.
    For documents this is the extracted text; for images it is the
    AI-generated description/analysis of the image.
    """

    filename: str
    type: Literal["document", "image"] = "document"
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = Field(default_factory=list)
    attachments: list[AttachmentContext] = Field(default_factory=list)


class ChatResponse(BaseModel):
    response: str


class UploadResponse(BaseModel):
    id: str
    filename: str
    type: Literal["document", "image"]
    content: str
    preview: Optional[str] = None
    size: int
