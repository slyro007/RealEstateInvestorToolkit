from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Literal
import structlog
from opentelemetry import trace
from apps.api.core.ai import AICore
from apps.api.core.auth import get_current_user
from apps.api.core.config import settings

router = APIRouter()
logger = structlog.getLogger()
tracer = trace.get_tracer(__name__)

class LearningPathRequest(BaseModel):
    level: Literal["beginner", "intermediate", "advanced"]
    goals: List[str]
    weekly_hours: int

class LearningPathResponse(BaseModel):
    level: str
    goals: List[str]
    weekly_hours: int
    modules: List[dict]

@router.post("/path", response_model=LearningPathResponse)
async def create_learning_path(
    request: LearningPathRequest,
    current_user = Depends(get_current_user)
):
    """
    Create a personalized learning path for real estate investment education.
    """
    span = tracer.start_span("create_learning_path")
    
    try:
        # Initialize AI Core
        ai = AICore(settings.OPENAI_API_KEY)
        
        # Format goals as a string
        goals_str = "\n".join([f"- {goal}" for goal in request.goals])
        
        # Get learning path from AI
        learning_path = await ai.parseStructuredOutput(
            prompt=f"""Create a personalized learning path for a {request.level} investor with the following goals:
{goals_str}

The investor can dedicate {request.weekly_hours} hours per week to learning.""",
            schema=ai.schemas.learningPath
        )
        
        logger.info(
            "learning_path_created",
            user_id=current_user.id,
            level=request.level,
            goals_count=len(request.goals)
        )
        
        return learning_path
        
    except Exception as e:
        logger.error(
            "learning_path_creation_failed",
            error=str(e),
            user_id=current_user.id
        )
        raise HTTPException(
            status_code=500,
            detail="Failed to create learning path"
        )
    finally:
        span.end()

@router.get("/resources")
async def get_learning_resources(
    topic: str,
    level: Literal["beginner", "intermediate", "advanced"],
    current_user = Depends(get_current_user)
):
    """
    Get curated learning resources for a specific topic and level.
    """
    span = tracer.start_span("get_learning_resources")
    
    try:
        # Initialize AI Core
        ai = AICore(settings.OPENAI_API_KEY)
        
        # Get resources from AI
        resources = await ai.chatCompletion(
            f"""Find the best learning resources for {topic} at {level} level.
            Include a mix of articles, videos, courses, and books.
            Format as a JSON array with title, url, type, and description."""
        )
        
        logger.info(
            "resources_retrieved",
            user_id=current_user.id,
            topic=topic,
            level=level
        )
        
        return {"resources": resources}
        
    except Exception as e:
        logger.error(
            "resource_retrieval_failed",
            error=str(e),
            user_id=current_user.id
        )
        raise HTTPException(
            status_code=500,
            detail="Failed to retrieve learning resources"
        )
    finally:
        span.end()

@router.get("/courses")
async def get_courses():
    """Get available courses"""
    return {"courses": []}

@router.get("/courses/{course_id}")
async def get_course(course_id: str):
    """Get course details"""
    return {"course_id": course_id, "title": "Sample Course"} 