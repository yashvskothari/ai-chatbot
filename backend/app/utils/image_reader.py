import base64
from pathlib import Path

MIME_TYPES = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
}


def get_mime_type(path: str) -> str:
    ext = Path(path).suffix.lower()
    return MIME_TYPES.get(ext, "application/octet-stream")


def is_supported_image(path: str) -> bool:
    return Path(path).suffix.lower() in MIME_TYPES


def encode_image_to_data_url(path: str) -> str:
    """Read an image file from disk and return it as a base64 data URL,
    suitable both for use as a browser preview and as input to a
    vision-capable model."""
    mime = get_mime_type(path)

    with open(path, "rb") as f:
        encoded = base64.b64encode(f.read()).decode("utf-8")

    return f"data:{mime};base64,{encoded}"
