import asyncio
import os
from dotenv import load_dotenv
from apps.api.core.ai import AICore
import structlog

# Configure logging
structlog.configure(
    processors=[
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer()
    ]
)
logger = structlog.getLogger()

async def test_ai_core():
    """Test the AI Core functionality"""
    # Load environment variables
    load_dotenv()
    
    # Get API key from environment
    api_key = os.getenv("OPENAI_API_KEY", "dummy_key")
    
    # Create AI Core instance
    ai_core = AICore(api_key)
    
    # Test generating marketing copy
    try:
        result = await ai_core.generate_marketing_copy(
            property_type="Single Family Home",
            target_audience="First-time homebuyers",
            tone="Professional",
            length="Short"
        )
        
        logger.info("marketing_copy_generated", result=result)
    except Exception as e:
        logger.error("error_generating_marketing_copy", error=str(e))
    
    # Test learning path generation
    try:
        result = await ai_core.generate_learning_path(
            level="beginner",
            goals=["Understand rental properties", "Learn about financing options"],
            weekly_hours=5
        )
        
        logger.info("learning_path_generated", result=result)
    except Exception as e:
        logger.error("error_generating_learning_path", error=str(e))

if __name__ == "__main__":
    asyncio.run(test_ai_core()) 