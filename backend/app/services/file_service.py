import os
import shutil
import uuid
from pathlib import Path

from fastapi import UploadFile

from app.core.config import MAX_UPLOAD_SIZE_BYTES
from app.services.groq_service import analyze_image
from app.utils.docx_reader import extract_docx
from app.utils.image_reader import encode_image_to_data_url, is_supported_image
from app.utils.pdf_reader import extract_pdf
from app.utils.txt_reader import extract_txt

UPLOAD_FOLDER = "uploads"

Path(UPLOAD_FOLDER).mkdir(exist_ok=True)

DOCUMENT_EXTENSIONS = {".pdf", ".docx", ".txt", ".md"}


def _unique_path(filename: str) -> tuple[str, str]:
    """Returns (file_id, filesystem path) for a newly uploaded file,
    avoiding collisions between uploads that share a filename."""
    file_id = uuid.uuid4().hex
    extension = Path(filename).suffix.lower()

    safe_name = f"{file_id}{extension}"

    return file_id, os.path.join(UPLOAD_FOLDER, safe_name)


def process_file(file: UploadFile) -> dict:
    extension = Path(file.filename).suffix.lower()

    if extension not in DOCUMENT_EXTENSIONS and not is_supported_image(file.filename):
        raise ValueError(
            f"Unsupported file type '{extension}'. Supported types: "
            "PDF, DOCX, TXT, MD, PNG, JPG, JPEG, GIF, WEBP."
        )

    file_id, filepath = _unique_path(file.filename)

    size = 0
    with open(filepath, "wb") as buffer:
        while chunk := file.file.read(1024 * 1024):
            size += len(chunk)

            if size > MAX_UPLOAD_SIZE_BYTES:
                buffer.close()
                os.remove(filepath)
                raise ValueError(
                    f"File exceeds the maximum upload size of "
                    f"{MAX_UPLOAD_SIZE_BYTES // (1024 * 1024)}MB."
                )

            buffer.write(chunk)

    try:
        if is_supported_image(file.filename):
            data_url = encode_image_to_data_url(filepath)

            try:
                analysis = analyze_image(data_url, file.filename)
            except Exception as exc:  # vision call failed; still return preview
                analysis = f"(Image analysis unavailable: {exc})"

            return {
                "id": file_id,
                "filename": file.filename,
                "type": "image",
                "content": analysis,
                "preview": data_url,
                "size": size,
            }

        if extension == ".pdf":
            content = extract_pdf(filepath)
        elif extension == ".docx":
            content = extract_docx(filepath)
        else:  # .txt / .md
            content = extract_txt(filepath)

        if not content.strip():
            raise ValueError(
                "Couldn't extract any text from this file. It may be "
                "empty, scanned, or corrupted."
            )

        return {
            "id": file_id,
            "filename": file.filename,
            "type": "document",
            "content": content,
            "preview": None,
            "size": size,
        }
    except ValueError:
        os.remove(filepath)
        raise
    except Exception as exc:
        os.remove(filepath)
        raise ValueError(f"Failed to process file: {exc}") from exc
