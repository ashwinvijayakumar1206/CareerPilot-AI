from langchain.prompts import ChatPromptTemplate
from backend.utils.llm_client import get_llm
import json

class CareerAgent:
    def __init__(self, provider="google"):
        self.llm = get_llm(model_provider=provider)
        self.prompt = ChatPromptTemplate.from_template("""
        You are a Career Strategist and Tech Industry Expert.
        Based on the user's skills and interests, recommend the best career domains and generate a learning roadmap.
        
        User Skills: {skills}
        User Interests: {interests}
        
        Provide the recommendation in the following JSON format:
        {{
            "recommended_domains": [
                {{
                    "domain": "Domain Name",
                    "match_percentage": (0-100),
                    "reason": "Why this domain fits"
                }}
            ],
            "roadmap": [
                {{
                    "phase": "Phase Name",
                    "duration": "Estimated time",
                    "topics": ["topic1", "topic2", ...],
                    "resources_type": ["Books", "Online Courses", "Projects"]
                }}
            ],
            "top_skills_to_learn": ["skill1", "skill2", ...]
        }}
        """)

    async def recommend(self, skills: list, interests: str):
        chain = self.prompt | self.llm
        response = await chain.ainvoke({{
            "skills": ", ".join(skills),
            "interests": interests
        }})
        
        content = response.content
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].split("```")[0].strip()
            
        try:
            return json.loads(content)
        except json.JSONDecodeError:
            return {{"error": "Failed to parse AI response as JSON", "raw": content}}
