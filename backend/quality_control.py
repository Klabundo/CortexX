# backend/quality_control.py

def assess_quality(result: str) -> dict:
    """
    Performs a basic quality assessment of the model's output.

    This is a placeholder for more sophisticated quality control logic.
    Future enhancements could include checks for toxicity, relevance,
    code correctness (e.g., using a linter), or factual accuracy.

    Args:
        result: The output string from the language model.

    Returns:
        A dictionary containing a quality rating and an optional suggestion.
    """
    assessment = {
        "quality": "undetermined",
        "suggestion": None
    }

    # Rule 1: Check for empty or very short responses
    if not result or len(result.strip()) < 15:
        assessment["quality"] = "low"
        assessment["suggestion"] = "The response is too short. The model may have failed to generate a proper answer. Try rephrasing the prompt."
        return assessment

    # Rule 2: Check for common model failure indicators
    failure_phrases = ["I am sorry, I cannot", "I am not able to", "As a large language model"]
    if any(phrase in result for phrase in failure_phrases):
        assessment["quality"] = "medium"
        assessment["suggestion"] = "The model seems to be unable to fulfill the request directly. Consider a different approach or prompt."
        return assessment
        
    # If no issues are found, assume good quality
    assessment["quality"] = "good"
    
    return assessment