import subprocess
import os

def start_vllm_server(model_path: str, port: int = 8000):
    """
    Starts the vLLM OpenAI-compatible API server with the specified model.

    Args:
        model_path: Path to the local model directory.
        port: Port to run the API server on (default: 8000).
    """
    print(f"Starting vLLM with model at {model_path} on port {port}...")

    # Build the command
    command = [
        "python3", "-m", "vllm.entrypoints.openai.api_server",
        "--model", model_path,
        "--tokenizer", model_path,
        "--port", str(port)
    ]

    # Optional: Add performance settings
    # command += ["--max-num-seqs", "64", "--dtype", "float16"]

    # Start the subprocess
    process = subprocess.Popen(command)
    print(f"vLLM server started with PID {process.pid}")

if __name__ == "__main__":
    model_dir = os.path.abspath("./models/Qwen2-7B-Instruct")
    start_vllm_server(model_dir)
