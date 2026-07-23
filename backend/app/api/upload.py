from fastapi import APIRouter
from fastapi import File
from fastapi import UploadFile
from fastapi import HTTPException

from app.services.file_service import process_file

router = APIRouter()


@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...)
):
    try:
        return process_file(file)

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )
        from fastapi import APIRouter, File, HTTPException, UploadFile

from app.schemas.schemas import UploadResponse
from app.services.file_service import process_file

router = APIRouter()


@router.post("/upload", response_model=UploadResponse)
async def upload_file(file: UploadFile = File(...)):
    try:
        return process_file(file)

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Upload failed: {e}",
        )
