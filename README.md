# CareerPilot AI — Intelligent Multi-Agent Career Assistant

CareerPilot AI is a comprehensive AI-powered platform designed to provide personalized placement and career guidance for students and job seekers. It leverages multiple specialized AI agents to analyze resumes, recommend career paths, simulate interviews, and detect skill gaps.

## 🚀 Key Features

- **Resume Analysis Agent**: Get an ATS compatibility score, detailed strengths/weaknesses, and actionable improvement suggestions.
- **Career Recommendation Agent**: Receive personalized domain suggestions (AI/ML, Cloud, Full Stack, etc.) and generated learning roadmaps.
- **AI Interview Simulator**: Practice with a real-time AI technical interviewer that provides feedback and follow-up questions.
- **Skill Gap Detection**: Identify missing technologies and generate improvement plans based on industry requirements.
- **Interactive Dashboard**: Track your career progress, recent activities, and learning journey in one premium interface.

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | Next.js, React, Tailwind CSS 4, TypeScript |
| **Backend** | FastAPI (Python), Pydantic, LangChain |
| **AI Layer** | OpenAI GPT-4 / Google Gemini 1.5 Pro |
| **Database** | PostgreSQL, ChromaDB (Vector Store) |
| **Deployment** | Vercel (Frontend), Render/Railway (Backend), Docker |

## 📦 Project Structure

```text
├── frontend/          # Next.js Application
├── backend/           # FastAPI Application
│   ├── agents/        # AI Agent Logic (Resume, Career, Interview)
│   ├── utils/         # PDF Processing & LLM Utilities
│   └── main.py        # API Entry Point
├── docker-compose.yml # Orchestration for local development
└── README.md          # Project Documentation
```

## 🏁 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 18+
- Docker (Optional)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ashwinvijayakumar1206/CareerPilot-AI.git
   cd CareerPilot-AI
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Variables**:
   Create a `.env` file in the root:
   ```env
   OPENAI_API_KEY=your_openai_key
   # OR
   GOOGLE_API_KEY=your_google_key
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

### Running Locally

- **Start Backend**: `cd backend && python main.py`
- **Start Frontend**: `cd frontend && npm run dev`

## ☁️ Deployment

### Frontend (Vercel)
1. Import the repository to Vercel.
2. Set **Root Directory** to `frontend`.
3. Add `NEXT_PUBLIC_API_URL` pointing to your backend URL.

### Backend (Render/Railway)
1. Create a new Web Service pointing to the repository.
2. Set **Root Directory** to `backend`.
3. Set **Start Command** to `python main.py`.

## 📄 License
This project is licensed under the MIT License.
