
# INFOVAR (Information Verification & Risk Analysis)

INFOVAR is an **AI-powered system** that analyzes text and video content to verify information credibility and assess potential risk or harm. Unlike simple true/false classifiers, INFOVAR generates a **harmfulness score** (0–100) based on multiple risk signals, such as misinformation likelihood, emotional manipulation, and societal impact.

---
<img width="1914" height="1025" alt="Screenshot 2026-02-07 165801" src="https://github.com/user-attachments/assets/1632b832-21c6-44db-a551-edf8c43320ca" />

<img width="1913" height="979" alt="Screenshot 2026-02-07 170154" src="https://github.com/user-attachments/assets/104157f6-0ca0-47d2-8101-b08d46322537" />

<img width="1910" height="973" alt="Screenshot 2026-02-07 170052" src="https://github.com/user-attachments/assets/ac7c0c51-6d24-4c20-abab-43c0f153c091" />

## 🛠 Features

- Unified analysis for **text and video** content
- Converts video speech to text for NLP-based evaluation
- Computes a **harmfulness score** with risk categories:
  - **Low Risk (0–30):** Informational or opinion-based content
  - **Medium Risk (31–60):** Misleading framing or unverifiable claims
  - **High Risk (61–100):** Strong misinformation with potential societal harm
- Provides short summaries and visual indicators for easy interpretation
- Modular, scalable, and built for **responsible AI deployment**
- Detects multiple risk signals:
  - Claim verifiability
  - Source reliability
  - Emotional intensity
  - Biased framing
  - Potential social or psychological impact

---

## 📂 System Architecture

### Frontend
- **React (TypeScript)** – Component-based user interface
- **Vite** – Fast development and build tool
- **HTML5 & CSS3** – UI structure and styling

### Service Layer
- **TypeScript APIs** – Handles frontend-backend communication
- **RESTful architecture** – Structured client-server interaction

### Backend & AI
- **Python + FastAPI** – Scalable backend services
- **Transformer-based NLP models** – Semantic and contextual reasoning
- **Speech-to-Text tools** – Convert audio from videos to text
- **Prompt-based reasoning** – Aggregates multiple risk signals into harmfulness scores

### Security & Configuration
- Environment-based configuration for sensitive data
- HTTPS communication for secure data transmission

---

## ⚡ Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/INFOVAR.git
cd INFOVAR

# Create Python virtual environment
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
.venv\Scripts\activate     # Windows

# Install Python dependencies
pip install -r requirements.txt

# Install frontend dependencies
cd frontend
npm install
npm run dev
