# backend/task_router.py

def route_task(prompt: str) -> str:
    """
    Analyzes the prompt to determine the appropriate task type.

    This simple implementation uses keyword matching. For a more robust
    system, this could be replaced with a classification model or more
    complex rule engine.

    Args:
        prompt: The user's input string.

    Returns:
        A string indicating the task type, e.g., "code" or "text".
    """
    # Keywords that suggest a code-related task
    code_keywords = [
        'code', 'python', 'javascript', 'java', 'c++', 'function', 
        'class', 'algorithm', 'script', 'debug', 'error', 'compile'
    ]

    # Convert prompt to lowercase for case-insensitive matching
    lower_prompt = prompt.lower()

    if any(keyword in lower_prompt for keyword in code_keywords):
        return "code"
    else:
        return "text"