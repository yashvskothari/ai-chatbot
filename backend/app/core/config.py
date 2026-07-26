from dotenv import load_dotenv
from pathlib import Path
import os

# Resolve .env relative to this file (backend/app/core/config.py -> backend/.env),
# so it loads correctly no matter what directory uvicorn is launched from.
BASE_DIR = Path(__file__).resolve().parent.parent.parent
ENV_PATH = BASE_DIR / ".env"

loaded = load_dotenv(dotenv_path=ENV_PATH)

if not loaded:
    print(f"[config] WARNING: no .env file found at {ENV_PATH}")

# =========================
# API KEYS
# =========================

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# =========================
# DEFAULT MODELS
# =========================

# Groq
GROQ_TEXT_MODEL = os.getenv(
    "GROQ_TEXT_MODEL",
    "llama-3.3-70b-versatile",
)

GROQ_VISION_MODEL = os.getenv(
    "GROQ_VISION_MODEL",
    "meta-llama/llama-4-scout-17b-16e-instruct",
)


# =========================
# Upload Limits
# =========================

MAX_UPLOAD_SIZE_MB = int(
    os.getenv("MAX_UPLOAD_SIZE_MB", "10")
)

MAX_UPLOAD_SIZE_BYTES = (
    MAX_UPLOAD_SIZE_MB * 1024 * 1024
)

# =========================
# Clerk Authentication
# =========================

CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")

CLERK_JWKS_URL = os.getenv(
    "CLERK_JWKS_URL",
    "https://settled-sponge-64.clerk.accounts.dev/.well-known/jwks.json",
)

CLERK_ISSUER = os.getenv(
    "CLERK_ISSUER",
    "https://settled-sponge-64.clerk.accounts.dev",
)