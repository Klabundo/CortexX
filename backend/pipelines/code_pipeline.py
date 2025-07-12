# backend/pipelines/code_pipeline.py
from model_manager import send_to_vllm

def process(prompt: str, model_name: str) -> str:
    """
    Processes a code-related prompt using the specified code model.

    This pipeline could be extended with pre-processing steps (e.g.,
    adding context or formatting instructions) or post-processing
    steps (e.g., extracting and validating code blocks from the response).

    Args:
        prompt: The user's input string, likely containing a coding question.
        model_name: The name of the code model to use (e.g., 'yi-34b').

    Returns:
        The response from the language model.
    """
    print(f"Executing code pipeline with model: {model_name}")
    
    # Optional: Add specific instructions for the code model
    # formatted_prompt = f"""You are a coding expert. Please solve the following problem:

# {prompt}"""
    
    response = send_to_vllm(model_name, prompt) # or formatted_prompt
    
    # Optional: Post-process to clean up the output
    # response = extract_code_block(response)
    
    return response