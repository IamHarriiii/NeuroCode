# 🧠 NeuroCode

**NeuroCode** is an AI-powered, full-stack code intelligence platform designed for proactive bug prediction, optimization, translation, documentation, and developer assistance. It uses two specialized fine-tuned LLMs:

* 🔍 **WizardCoder-7B**: Bug detection, code optimization, and translation
* 🧾 **CodeLlama-Instruct-7B**: Documentation generation and chatbot functionality

NeuroCode aims to empower developers with intelligent automation and project-specific insights, fully integrated into a modern web platform.

---

## 🚀 Features

✅ Proactive Bug Prediction using fine-tuned WizardCoder on BugSwarm & Defects4J
✅ Code Optimization trained on CodeXGLUE + HumanEval
✅ Code Translation using TransCoder dataset (Python ↔ Java ↔ C++)
✅ Documentation Generation using CodeSearchNet
✅ Developer Chatbot trained on GitHub Issues via API
✅ Real-time Collaborative Debugging (WebSocket enabled)
✅ Security Vulnerability Detection via custom scanner
✅ Analytics Dashboard (bug fix stats, usage logs, model trends)
✅ Fully integrated RAG module (FAISS + GitHub context)
✅ RLHF-ready feedback and simulated reward integration

---

## 🧩 File Structure

See the [Final NeuroCode Structure](canmore://681b7620546881918d7fe176f2b81c5a) for the complete project layout.

---

## ⚙️ Setup Instructions

### 🔧 Backend (Django + DRF + WebSockets)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### ⚛️ Frontend (React)

```bash
cd frontend
npm install
npm start
```

### 🤖 Inference Server (FastAPI with Dual Models)

```bash
cd model/inference
uvicorn inference_router:app --reload --port 5000
```

> Ensure `checkpoints/wizardcoder_final` and `checkpoints/codellama_final` directories exist with your trained models.

---

## 📦 Model Training

### WizardCoder-7B

Trained on:

* BugSwarm, Defects4J (Bug Prediction)
* CodeXGLUE, HumanEval (Optimization)
* TransCoder (Code Translation)

```bash
cd model
python datasets/preprocess_wizardcoder.py
python finetuning/train_wizardcoder_final.py
```

### CodeLlama-Instruct-7B

Trained on:

* CodeSearchNet (Documentation)
* GitHub Issues API (Chatbot)

```bash
python datasets/fetch_github_issues.py
python datasets/preprocess_codellama.py
python finetuning/train_codellama_final.py
```

---

## 🐳 Deployment

```bash
cd deployment
bash deploy.sh  # or use docker-compose up --build
```

### Cloud Support:

* AWS EC2 with `aws/ec2-setup.md`
* Kubernetes with `k8s/neurocode-deployment.yaml`
* CI/CD with Jenkins (`Jenkinsfile`)

---

## 🧪 Testing

```bash
pytest tests/backend_tests
pytest tests/load_tests
npm run cypress:e2e
```

---

## 📚 Documentation

* `docs/whitepaper.md`: Research insights and architecture
* `docs/paper.latex`: Publication-ready format
* `docs/presentation_outline.md`: Slide draft for demo/pitch

---

## 🔒 License

MIT License – see [LICENSE](./LICENSE)

---

## 💬 Credits

Built by a passionate team of 3 for our Advanced LLM Capstone. Dual-models, full-stack pipeline, and research-ready design.

**Mentor:** \[Your Mentor Name]
**Contributors:** \[You], \[Team Member 2], \[Team Member 3]

---

## ❤️ Acknowledgments

* [WizardCoder](https://huggingface.co/WizardLM/WizardCoder-7B-V1.0)
* [CodeLlama](https://huggingface.co/codellama/CodeLlama-7b-Instruct-hf)
* Hugging Face, PyTorch, Django, React, FastAPI, FAISS, GitHub API

