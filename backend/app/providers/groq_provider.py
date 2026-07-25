from typing import Generator, Iterable

from groq import Groq

from app.providers.base import BaseProvider
from app.core.config import (
    GROQ_API_KEY,
    GROQ_TEXT_MODEL,
    GROQ_VISION_MODEL,
)
from app.schemas.schemas import AttachmentContext, ChatMessage


client = Groq(api_key=GROQ_API_KEY)


SYSTEM_PROMPT = """
You are Flux AI.

Answer naturally in plain English.

Use Markdown ONLY if needed.

Use fenced code blocks ONLY for real code.

Never wrap ordinary explanations inside
```markdown
"""


MAX_HISTORY_MESSAGES = 20
MAX_CONTEXT_CHARS_PER_DOC = 12000


class GroqProvider(BaseProvider):

    def _build_context_block(
        self,
        attachments: Iterable[AttachmentContext],
    ) -> str:

        blocks = []

        for attachment in attachments:

            content = attachment.content[:MAX_CONTEXT_CHARS_PER_DOC]

            kind = (
                "Image analysis"
                if attachment.type == "image"
                else "Document"
            )

            blocks.append(
                f"{kind}: {attachment.filename}\n\n{content}"
            )

        if not blocks:
            return ""

        return (
            "The user has shared the following attachments.\n\n"
            + "\n\n---\n\n".join(blocks)
        )

    def _build_messages(
        self,
        message: str,
        history: list[ChatMessage],
        attachments: list[AttachmentContext],
    ):

        messages = [
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            }
        ]

        context = self._build_context_block(attachments)

        if context:
            messages.append(
                {
                    "role": "system",
                    "content": context,
                }
            )

        for turn in history[-MAX_HISTORY_MESSAGES:]:

            messages.append(
                {
                    "role": turn.role,
                    "content": turn.content,
                }
            )

        messages.append(
            {
                "role": "user",
                "content": message,
            }
        )

        return messages

    def generate(
        self,
        message: str,
        history=None,
        attachments=None,
        model=None,
    ):

        messages = self._build_messages(
            message,
            history or [],
            attachments or [],
        )

        completion = client.chat.completions.create(
            model=model or GROQ_TEXT_MODEL,
            messages=messages,
        )
        

        return completion.choices[0].message.content

    def stream(
        self,
        message: str,
        history=None,
        attachments=None,
        model=None,
    ) -> Generator[str, None, None]:

        messages = self._build_messages(
            message,
            history or [],
            attachments or [],
        )

        stream = client.chat.completions.create(
            model=model or GROQ_TEXT_MODEL,
            messages=messages,
            stream=True,
        )

        for chunk in stream:

            delta = chunk.choices[0].delta.content

            if delta:
                yield delta

    def analyze_image(
        self,
        data_url: str,
        filename: str,
    ):

        completion = client.chat.completions.create(

            model=GROQ_VISION_MODEL,

            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": (
                                f"Describe this image ({filename}) "
                                "in detail."
                            ),
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": data_url,
                            },
                        },
                    ],
                }
            ],
        )

        return completion.choices[0].message.content


provider = GroqProvider()