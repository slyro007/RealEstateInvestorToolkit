from fastapi import APIRouter, Depends, HTTPException
from apps.api.tasks.finance import analyze_financials
import structlog

logger = structlog.getLogger()
router = APIRouter()

@router.post("/analyze")
async def analyze_financial_data(data: dict):
    """Analyze financial data"""
    task = analyze_financials.delay(data)
    return {"task_id": task.id, "status": "processing"} 