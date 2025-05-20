from typing import List, Optional, Dict, Any
import structlog
from opentelemetry import trace
import json
import os

logger = structlog.getLogger()
tracer = trace.get_tracer(__name__)

# Try to import the base AICore, but create a fallback if not available
try:
    from packages.ai_core import AICore as BaseAICore
    from packages.ai_core.schemas import learningPath, dealAnalysis
except ImportError:
    logger.warning("packages.ai_core module not found, using fallback implementation")
    
    # Define schemas locally
    learningPath = {
        "type": "object",
        "properties": {
            "level": {"type": "string"},
            "goals": {"type": "array", "items": {"type": "string"}},
            "weekly_hours": {"type": "integer"},
            "modules": {"type": "array", "items": {"type": "object"}}
        }
    }
    
    dealAnalysis = {
        "type": "object",
        "properties": {
            "recommendation": {"type": "string"}
        }
    }
    
    # Define a fallback base class
    class BaseAICore:
        def __init__(self, api_key):
            self.api_key = api_key
            self.schemas = type('Schemas', (), {'learningPath': learningPath, 'dealAnalysis': dealAnalysis})
            
        async def chatCompletion(self, prompt, **kwargs):
            return f"Dummy response for: {prompt[:50]}..."
            
        async def parseStructuredOutput(self, prompt, schema, **kwargs):
            if "learning" in prompt.lower():
                return {
                    "level": "beginner",
                    "goals": ["Learn real estate basics"],
                    "weekly_hours": 5,
                    "modules": [{"title": "Getting Started", "description": "Introduction to real estate"}]
                }
            return {"recommendation": "This is a dummy recommendation"}

class AICore(BaseAICore):
    """
    Extended AI Core class with additional functionality specific to the API
    """
    
    async def generate_learning_path(
        self,
        level: str,
        goals: List[str],
        weekly_hours: int
    ) -> dict:
        """
        Generate a personalized learning path
        """
        span = tracer.start_span("generate_learning_path")
        
        try:
            # Format goals as a string
            goals_str = "\n".join([f"- {goal}" for goal in goals])
            
            # Get learning path from AI
            path = await self.parseStructuredOutput(
                prompt=f"""Create a personalized learning path for a {level} investor with the following goals:
{goals_str}

The investor can dedicate {weekly_hours} hours per week to learning.""",
                schema=learningPath
            )
            
            logger.info(
                "learning_path_generated",
                level=level,
                goals_count=len(goals)
            )
            
            return path
            
        except Exception as e:
            logger.error("learning_path_generation_failed", error=str(e))
            raise
        finally:
            span.end()
    
    async def analyze_deal(
        self,
        address: str,
        purchase_price: float,
        rehab_estimate: float,
        additional_info: Optional[str] = None
    ) -> dict:
        """
        Analyze a real estate deal
        """
        span = tracer.start_span("analyze_deal")
        
        try:
            # Get deal analysis from AI
            analysis = await self.parseStructuredOutput(
                prompt=f"""Analyze this real estate deal:

Address: {address}
Purchase Price: ${purchase_price:,.2f}
Rehab Estimate: ${rehab_estimate:,.2f}

Additional Information:
{additional_info or 'None provided'}""",
                schema=dealAnalysis
            )
            
            logger.info(
                "deal_analyzed",
                address=address,
                purchase_price=purchase_price
            )
            
            return analysis
            
        except Exception as e:
            logger.error("deal_analysis_failed", error=str(e))
            raise
        finally:
            span.end()
    
    async def generate_marketing_copy(
        self,
        property_type: str,
        target_audience: str,
        tone: str,
        length: str
    ) -> dict:
        """
        Generate marketing copy for a property
        """
        span = tracer.start_span("generate_marketing_copy")
        
        try:
            # Get marketing copy from AI
            copy = await self.chatCompletion(
                f"""Generate marketing copy for a {property_type} property.
                Target audience: {target_audience}
                Tone: {tone}
                Length: {length}
                
                Include:
                1. Headline
                2. Property description
                3. Key features
                4. Call to action
                
                Format as JSON with these sections."""
            )
            
            logger.info(
                "marketing_copy_generated",
                property_type=property_type,
                target_audience=target_audience
            )
            
            return {"copy": copy}
            
        except Exception as e:
            logger.error("marketing_copy_generation_failed", error=str(e))
            raise
        finally:
            span.end() 