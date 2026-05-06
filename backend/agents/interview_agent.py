from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from backend.utils.llm_client import get_llm
import json

class InterviewAgent:
    def __init__(self, provider="google"):
        self.llm = get_llm(model_provider=provider)
        self.system_prompt = """
        You are a Senior Technical Interviewer at a top-tier tech company.
        You are conducting a mock interview for a {role} position.
        The user's skills are: {skills}.
        
        Guidelines:
        1. Start by introducing yourself and asking an introductory question.
        2. Ask one question at a time.
        3. Listen to the user's answer, provide brief positive reinforcement if they did well, and then ask a follow-up or a new technical question.
        4. Focus on the skills mentioned but also test general engineering principles.
        5. After 5-6 questions, tell the user the interview is over and provide a feedback summary.
        
        When the interview is over, provide feedback in JSON format:
        {{
            "status": "completed",
            "score": (0-100),
            "feedback": "Overall performance summary",
            "strengths": ["...", "..."],
            "improvements": ["...", "..."],
            "technical_accuracy": (0-100),
            "communication_skills": (0-100)
        }}
        """

    async def get_response(self, role: str, skills: list, history: list):
        prompt = ChatPromptTemplate.from_messages([
            ("system", self.system_prompt.format(role=role, skills=", ".join(skills))),
            MessagesPlaceholder(variable_name="history")
        ])
        
        chain = prompt | self.llm
        
        messages = []
        for msg in history:
            if msg["role"] == "user":
                messages.append(HumanMessage(content=msg["content"]))
            else:
                messages.append(AIMessage(content=msg["content"]))
                
        response = await chain.ainvoke({{"history": messages}})
        return response.content
