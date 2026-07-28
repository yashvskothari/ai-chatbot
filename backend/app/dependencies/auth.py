from functools import lru_cache
from typing import Optional
import time
import traceback

import jwt
from jwt import PyJWKClient

from fastapi import Header, HTTPException

from app.core.config import (
    CLERK_ISSUER,
    CLERK_JWKS_URL,
)


@lru_cache
def get_jwk_client():
    return PyJWKClient(CLERK_JWKS_URL)


def get_current_user(
    authorization: str = Header(...),
):
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid authorization header.",
        )

    token = authorization.replace("Bearer ", "")

    try:

        print("=" * 80)
        print("TOKEN RECEIVED:")
        print(token)

        print("\nSERVER UNIX TIME:")
        print(int(time.time()))

        print("\nISSUER:")
        print(CLERK_ISSUER)

        print("\nJWKS:")
        print(CLERK_JWKS_URL)

        # Decode WITHOUT verification just for debugging
        decoded = jwt.decode(
            token,
            options={
                "verify_signature": False,
            },
        )

        print("\nTOKEN CONTENT:")
        print(decoded)

        signing_key = (
            get_jwk_client()
            .get_signing_key_from_jwt(token)
            .key
        )

        payload = jwt.decode(
            token,
            signing_key,
            algorithms=["RS256"],
            issuer=CLERK_ISSUER,
            leeway=60,
            options={
                "verify_aud": False,
            },
        )

        print("\nVERIFIED PAYLOAD:")
        print(payload)
        print("=" * 80)

        return payload

    except Exception as e:
        print("=" * 80)
        print("AUTH ERROR")
        traceback.print_exc()
        print("=" * 80)

        raise HTTPException(
            status_code=401,
            detail=str(e),
        )
        
def get_current_user_optional(
    authorization: Optional[str] = Header(None),
):
    """
    Guest users -> returns None
    Logged-in users -> returns verified Clerk payload
    """

    if authorization is None:
        return None

    if not authorization.startswith("Bearer "):
        return None

    token = authorization.replace("Bearer ", "")

    try:
        signing_key = (
            get_jwk_client()
            .get_signing_key_from_jwt(token)
            .key
        )

        payload = jwt.decode(
            token,
            signing_key,
            algorithms=["RS256"],
            issuer=CLERK_ISSUER,
            leeway=60,
            options={
                "verify_aud": False,
            },
        )

        return payload

    except Exception:
        # Invalid token → treat as guest
        return None
        