from groq import Groq
from app.core.config import GROQ_API_KEY


client = Groq(
    api_key=GROQ_API_KEY
)


def generate_response(user_message: str) -> str:

    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[
            {
                "role": "system",
                "content": "You are a helpful AI assistant."
            },
            {
                "role": "user",
                "content": user_message
            }
        ]
    )

    return completion.choices[0].message.content