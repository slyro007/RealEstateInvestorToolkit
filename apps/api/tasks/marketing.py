from apps.api.worker import celery
import structlog
from apps.api.core.ai import AICore
import os
from apps.api.core.config import settings

logger = structlog.getLogger()

@celery.task(name="marketing.generate_content")
def generate_content(prompt: str, property_type=None, target_audience=None, **kwargs):
    """
    Generate marketing content based on the given prompt
    
    Args:
        prompt: The main prompt for content generation
        property_type: Type of property (optional)
        target_audience: Target audience (optional)
    """
    logger.info("generating_marketing_content", prompt=prompt)
    
    # Create AI Core instance
    ai_core = AICore(settings.OPENAI_API_KEY)
    
    # Set defaults
    property_type = property_type or "Real Estate Property"
    target_audience = target_audience or "Investors"
    
    # Use async task runner
    import asyncio
    
    # Define coroutine
    async def run_generation():
        try:
            result = await ai_core.generate_marketing_copy(
                property_type=property_type,
                target_audience=target_audience,
                tone=kwargs.get("tone", "Professional"),
                length=kwargs.get("length", "Medium")
            )
            return result
        except Exception as e:
            logger.error("marketing_content_generation_failed", error=str(e))
            return {"error": str(e)}
    
    # Run async function
    result = asyncio.run(run_generation())
    
    return {
        "status": "success",
        "content": result,
        "prompt": prompt
    } 