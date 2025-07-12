# backend/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
import os
from datetime import datetime

# Import modules
from task_router import route_task
from pipelines import code_pipeline, text_pipeline
from quality_control import assess_quality
from memory_store import save_interaction, load_history
from model_manager import load_model, unload_model, send_to_vllm

app = FastAPI()

class AskRequest(BaseModel):
    prompt: str
    session_id: str = "default_session"

@app.post("/ask")
async def ask(request: AskRequest):
    """
    Receives a prompt, routes it to the appropriate pipeline,
    gets a response, assesses its quality, and stores the interaction.
    """
    # 1. Route the task
    task_type = route_task(request.prompt)

    # 2. Load the appropriate model (placeholder)
    model_name = "yi-34b" if task_type == "code" else "deepseekcoder-33b"
    load_model(model_name)

    # 3. Execute the corresponding pipeline
    if task_type == "text":
        response = text_pipeline.process(request.prompt, model_name)
    elif task_type == "code":
        response = code_pipeline.process(request.prompt, model_name)
    else:
        unload_model() # Unload if task is unknown
        raise HTTPException(status_code=400, detail="Unknown task type")

    # 4. Unload the model
    unload_model()

    # 5. Assess the quality of the response
    quality_assessment = assess_quality(response)

    # 6. Save the interaction to memory
    save_interaction(request.session_id, request.prompt, response)

    return {
        "response": response,
        "task_type": task_type,
        "quality_assessment": quality_assessment
    }

@app.get("/history/{session_id}")
async def get_history(session_id: str):
    """
    Retrieves the chat history for a given session ID.
    """
    return load_history(session_id)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)