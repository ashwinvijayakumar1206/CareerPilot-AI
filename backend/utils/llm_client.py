import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

def get_llm(model_provider="openai", model_name=None, temperature=0.7):
    """
    Returns an LLM instance based on the provider.
    """
    if model_provider == "openai":
        return ChatOpenAI(
            api_key=os.getenv("OPENAI_API_KEY"),
            model=model_name or "gpt-4-turbo-preview",
            temperature=temperature
        )
    elif model_provider == "google":
        return ChatGoogleGenerativeAI(
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            model=model_name or "gemini-1.5-pro",
            temperature=temperature
        )
    else:
        raise ValueError(f"Unsupported model provider: {model_provider}")
