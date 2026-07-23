from typing import Generator, Iterable

from groq import Groq

from app.core.config import GROQ_API_KEY, GROQ_TEXT_MODEL, GROQ_VISION_MODEL
from app.schemas.schemas import AttachmentContext, ChatMessage

client = Groq(api_key=GROQ_API_KEY)

SYSTEM_PROMPT = (
    "You are Flux AI, a helpful, precise AI assistant. "
    "When the user has shared documents or images, use the provided context "
    "to answer their questions accurately. If the context doesn't contain "
    "the answer, say so instead of guessing. Format responses in Markdown, "
    "and use fenced code blocks with a language tag for any code."
)

MAX_HISTORY_MESSAGES = 20
MAX_CONTEXT_CHARS_PER_DOC = 12000


def _build_context_block(attachments: Iterable[AttachmentContext]) -> str:
    blocks = []

    for attachment in attachments:
        content = attachment.content[:MAX_CONTEXT_CHARS_PER_DOC]

        kind = "Image analysis" if attachment.type == "image" else "Document"

        blocks.append(
            f"### {kind}: {attachment.filename}\n\n{content}"
        )

    if not blocks:
        return ""

    return (
        "The user has shared the following attachments in this "
        "conversation. Use them as context when relevant:\n\n"
        + "\n\n---\n\n".join(blocks)
    )


def _build_messages(
    message: str,
    history: list[ChatMessage],
    attachments: list[AttachmentContext],
) -> list[dict]:
    messages: list[dict] = [{"role": "system", "content": SYSTEM_PROMPT}]

    context_block = _build_context_block(attachments)
    if context_block:
        messages.append({"role": "system", "content": context_block})

    for turn in history[-MAX_HISTORY_MESSAGES:]:
        messages.append({"role": turn.role, "content": turn.content})

    messages.append({"role": "user", "content": message})

    return messages


def generate_response(
    message: str,
    history: list[ChatMessage] | None = None,
    attachments: list[AttachmentContext] | None = None,
) -> str:
    messages = _build_messages(message, history or [], attachments or [])

    completion = client.chat.completions.create(
        model=GROQ_TEXT_MODEL,
        messages=messages,
    )

    return completion.choices[0].message.content


def stream_response(
    message: str,
    history: list[ChatMessage] | None = None,
    attachments: list[AttachmentContext] | None = None,
) -> Generator[str, None, None]:
    messages = _build_messages(message, history or [], attachments or [])

    stream = client.chat.completions.create(
        model=GROQ_TEXT_MODEL,
        messages=messages,
        stream=True,
    )

    for chunk in stream:
        delta = chunk.choices[0].delta.content
        if delta:
            yield delta


def analyze_image(data_url: str, filename: str) -> str:
    """Ask the vision model to describe/analyze an uploaded image."""

    completion = client.chat.completions.create(
        model=GROQ_VISION_MODEL,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": (
                            f"Describe this image ('{filename}') in detail. "
                            "Mention any visible text, objects, people, "
                            "charts, or data, so the description can be "
                            "used as context for later questions about it."
                        ),
                    },
                    {
                        "type": "image_url",
                        "image_url": {"url": data_url},
                    },
                ],
            }
        ],
    )

    return completion.choices[0].message.content
