from fastapi import APIRouter, Depends, HTTPException
from apps.api.tasks.analysis import analyze_data
import structlog

logger = structlog.getLogger()
router = APIRouter()

@router.post("/analyze")
async def analyze(data: dict):
    """Analyze data"""
    task = analyze_data.delay(data)
    return {"task_id": task.id, "status": "processing"} 