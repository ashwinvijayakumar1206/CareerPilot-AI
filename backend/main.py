from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from backend.utils.pdf_processor import extract_text_from_pdf
from backend.agents.resume_agent import ResumeAgent
from backend.agents.career_agent import CareerAgent
from backend.agents.interview_agent import InterviewAgent
from pydantic import BaseModel
from typing import List
import os

class RecommendationRequest(BaseModel):
    skills: List[str]
    interests: str

class ChatMessage(BaseModel):
    role: str
    content: str

class InterviewRequest(BaseModel):
    role: str
    skills: List[str]
    history: List[ChatMessage]

app = FastAPI(title="CareerPilot AI API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to CareerPilot AI API"}

@app.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    content = await file.read()
    resume_text = extract_text_from_pdf(content)
    
    if not resume_text:
        raise HTTPException(status_code=400, detail="Could not extract text from PDF")
    
    agent = ResumeAgent()
    analysis = await agent.analyze(resume_text)
    
    return analysis

@app.post("/recommend-career")
async def recommend_career(request: RecommendationRequest):
    agent = CareerAgent()
    recommendations = await agent.recommend(request.skills, request.interests)
    return recommendations

@app.post("/interview-chat")
async def interview_chat(request: InterviewRequest):
    agent = InterviewAgent()
    history = [msg.dict() for msg in request.history]
    response = await agent.get_response(request.role, request.skills, history)
    return {"response": response}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
