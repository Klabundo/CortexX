
# 🤖 CortexX

> A modular, locally running multi-agent AI assistant  
> **Designed for problem-solving, automation, research, and daily personal use.**

---

## 🚧 Project Status: Pre-Alpha (Early Development Phase)

This project is the foundation for a fully local, intelligent multi-agent system designed to execute and refine complex tasks by dynamically leveraging large AI models.  

Many features described below are still **planned but not yet implemented**. The current version contains a minimal working structure to build upon.

---

## 🧠 Vision

The **CortexX** is built to become a powerful personal assistant that:

- Understands the user’s intent
- Breaks tasks into subtasks
- Delegates them to specialized AIs
- Automatically builds dynamic processing pipelines
- Evaluates output quality
- Refines results through re-iteration (future feature)

This system will run **entirely on your local hardware**, using **high-quality open-source models** (e.g., Yi, Mistral, Qwen) with **modular agent logic** and persistent long-term memory.

> "Not just another chatbot — a true AI operations core."

---

## ✨ Key Principles

- 🔒 **100% Local Execution** – No cloud dependency
- 💪 **Maximum Performance** – Built for high-end systems (e.g., NVIDIA DGX Spark)
- 🧩 **Dynamic Agent Pipelines** – Specialized agents selected automatically
- 📚 **Persistent Memory** – Context retained across sessions and users
- 🧠 **Quality-First AI** – Only large, high-performing models are used (no 7B unless needed)
- ♻️ **Self-Improving Loops** – Agents may reassign tasks to improve output (future)


---

## 🧠 Planned Architecture (Simplified Flow)

```
User Input
   │
   ▼
Frontend 
   │
   ▼
Backend 
   │
   ▼
Task Analyzer
 ├─► Code Agent → Yi / DeepSeekCoder / Qwen
 ├─► Text Agent → Mistral / LLaMA3
 ├─► Image Agent → ComfyUI / SDXL
 ├─► Audio Agent → XTTS / Bark / Step
 └─► Review Agent → Reruns or improves output
```

---

## 🧪 Development Features (Planned)

| Feature | Description |
|--------|-------------|
| **Dynamic Pipelines** | System selects best agent/model pipeline for a given task |
| **Model Control** | Only one large model loaded at a time, managed efficiently |
| **Review Agent** | Validates results, can request retries or escalate |
| **Multimodal** | Future support for images, audio, video, code, documents |
| **Multi-user Support** | Access control, API keys, user roles |
| **Persistent Memory** | Cross-session context tracking per user/task |
| **Fully Modular** | Swap agents or pipelines independently |
| **App-style UI** | React frontend designed for future PWA/mobile wrapper |
| **Logging & Traceability** | Every decision/action is logged for review/training |

---

## 🚀 Getting Started (Dev Setup)



```bash
npm install
npm run dev
```

This will launch:

- http://localhost:5174/


---

## 🧠 Model Strategy

This system is designed to work with high-end LLMs:

- ✅ Up to 200B+ parameters (e.g., Yi-34B, Qwen-72B, Mistral-Medium)
- ❌ No low-quality or tiny models (7B or below) unless absolutely needed
- 🔄 Only one large model active at a time — others are loaded/unloaded dynamically
- 🎯 Model selection depends on the task type (e.g., text vs code vs image)

---

## 🌍 Target Hardware

- ✅ Runs fully on **Linux-based local servers**
- ⚙️ Optimized for systems like **NVIDIA DGX Spark**
- 🚫 No cloud dependencies, no OpenAI API

---

## 🧑‍💻 Project Collaboration

This system is developed by Jonathan and Janne as a long-term open-source initiative.

Future goals include:

- Collaborative learning agents
- Contextual reasoning memory
- Creative pipelines with self-generated multimedia
- Community plugin system for adding new tools & agents

---

## 📝 License

Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)
---

## ✅ Roadmap Snapshot

- [ ] vLLM integration for LLM serving
- [ ] Memory system (long-term, persistent)
- [ ] Review agents + scoring logic
- [ ] Frontend extensions for image/audio output
- [ ] Task decomposition logic
- [ ] Multi-user access & permissions
- [ ] Iterative self-refinement (agent loop)
- [ ] Final continuous improvement system

---

## 🙌 Thank you for supporting local & open-source AI!

> *“It’s not the power of the GPU that makes intelligence — it’s the system architecture.”*
