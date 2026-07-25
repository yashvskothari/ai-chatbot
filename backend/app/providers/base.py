from abc import ABC, abstractmethod
from typing import Generator

from app.schemas.schemas import AttachmentContext, ChatMessage


class BaseProvider(ABC):

    @abstractmethod
    def generate(
        self,
        message: str,
        history: list[ChatMessage],
        attachments: list[AttachmentContext],
    ) -> str:
        pass

    @abstractmethod
    def stream(
        self,
        message: str,
        history: list[ChatMessage],
        attachments: list[AttachmentContext],
    ) -> Generator[str, None, None]:
        pass