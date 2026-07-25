from app.providers.groq_provider import GroqProvider

PROVIDERS = {
    "groq": GroqProvider(),
}


def get_provider(name: str = "groq"):

    provider = PROVIDERS.get(name.lower())

    if provider is None:
        raise ValueError(f"Unsupported provider: {name}")

    return provider