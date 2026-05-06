from langchain.prompts import ChatPromptTemplate
from backend.utils.llm_client import get_llm
import json

class ResumeAgent:
    def __init__(self, provider="google"):
        self.llm = get_llm(model_provider=provider)
        self.prompt = ChatPromptTemplate.from_template("""
        You are an expert Resume Reviewer and Technical Recruiter with 15+ years of experience.
        Your task is to analyze the following resume text and provide a detailed analysis.
        
        Resume Content:
        {resume_text}
        
        Provide the analysis in the following JSON format:
        {{
            "ats_score": (0-100),
            "summary": "Brief overall summary of the resume",
            "skills_detected": ["skill1", "skill2", ...],
            "missing_skills": ["skill1", "skill2", ...],
            "strengths": ["strength1", "strength2", ...],
            "weaknesses": ["weakness1", "weakness2", ...],
            "improvement_suggestions": [
                {{
                    "section": "Name of section",
                    "suggestion": "What to change",
                    "reason": "Why to change it"
                }}
            ],
            "suggested_roles": ["Role 1", "Role 2", ...]
        }}
        
        Be critical and thorough. Focus on technical skills, impact, and formatting.
        """)

    async def analyze(self, resume_text: str):
        chain = self.prompt | self.llm
        response = await chain.ainvoke({{"resume_text": resume_text}})
        
        # Clean response to ensure it's valid JSON
        content = response.content
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].split("```")[0].strip()
            
        try:
            return json.loads(content)
        except json.JSONDecodeError:
            return {{"error": "Failed to parse AI response as JSON", "raw": content}}
