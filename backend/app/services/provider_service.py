from app.providers.groq_provider import provider as groq_provider


PROVIDERS = {
    "groq": groq_provider,
}


def get_provider(name: str):

    try:
        return PROVIDERS[name.lower()]
    except KeyError:
        raise ValueError(f"Unknown provider: {name}")


def generate(
    provider: str,
    message: str,
    history=None,
    attachments=None,
    model=None,
):

    return get_provider(provider).generate(
        message=message,
        history=history,
        attachments=attachments,
        model=model,
    )


def stream(
    provider: str,
    message: str,
    history=None,
    attachments=None,
    model=None,
):

    return get_provider(provider).stream(
        message=message,
        history=history,
        attachments=attachments,
        model=model,
    )


def analyze_image(
    provider: str,
    data_url: str,
    filename: str,
    model=None,
):

    return get_provider(provider).analyze_image(
        data_url=data_url,
        filename=filename,
    )