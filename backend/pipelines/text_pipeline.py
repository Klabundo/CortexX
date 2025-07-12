# backend/pipelines/text_pipeline.py
from model_manager import send_to_vllm

def process(prompt: str, model_name: str) -> str:
    """
    Processes a text-based prompt using the specified text model.

    This pipeline acts as a simple pass-through to the model manager,
    which handles the actual communication with the vLLM service.

    Args:
        prompt: The user's input string.
        model_name: The name of the text model to use (e.g., 'deepseekcoder-33b').

    Returns:
        The response from the language model.
    """
    print(f"Executing text pipeline with model: {model_name}")
    response = send_to_vllm(model_name, prompt)
    return response