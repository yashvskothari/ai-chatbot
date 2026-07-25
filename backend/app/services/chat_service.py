from app.providers.provider_factory import get_provider


class ChatService:

    @staticmethod
    def generate(
        provider: str,
        model: str | None,
        message,
        history,
        attachments,
    ):
        engine = get_provider(provider)

        return engine.generate(
            message=message,
            history=history,
            attachments=attachments,
            model=model,
        )

    @staticmethod
    def stream(
        provider: str,
        model: str | None,
        message,
        history,
        attachments,
    ):
        engine = get_provider(provider)

        return engine.stream(
            message=message,
            history=history,
            attachments=attachments,
            model=model,
        )