from fastapi import APIRouter, Depends, HTTPException
from apps.api.tasks.marketing import generate_content
import structlog

logger = structlog.getLogger()
router = APIRouter()

@router.post("/content")
async def create_content(prompt: str):
    """Generate marketing content"""
    task = generate_content.delay(prompt)
    return {"task_id": task.id, "status": "processing"} 