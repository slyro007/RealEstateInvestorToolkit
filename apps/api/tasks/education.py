from apps.api.worker import celery
from apps.api.core.ai import AICore
from apps.api.core.config import settings
from apps.api.db.session import SessionLocal
from apps.api.models.user import LearningPath
import structlog
from opentelemetry import trace
import json

logger = structlog.getLogger()
tracer = trace.get_tracer(__name__)

@celery.task
def generate_learning_path(user_id: int, level: str, goals: list, weekly_hours: int):
    """
    Generate a personalized learning path for a user
    """
    span = tracer.start_span("generate_learning_path_task")
    
    try:
        # Initialize AI Core
        ai = AICore(settings.OPENAI_API_KEY)
        
        # Generate learning path
        path = ai.generate_learning_path(level, goals, weekly_hours)
        
        # Save to database
        db = SessionLocal()
        try:
            learning_path = LearningPath(
                user_id=user_id,
                level=level,
                goals=json.dumps(goals),
                weekly_hours=weekly_hours,
                modules=json.dumps(path["modules"])
            )
            db.add(learning_path)
            db.commit()
            
            logger.info(
                "learning_path_generated",
                user_id=user_id,
                level=level
            )
            
            return {"status": "success", "path_id": learning_path.id}
            
        except Exception as e:
            db.rollback()
            logger.error(
                "learning_path_save_failed",
                error=str(e),
                user_id=user_id
            )
            raise
        finally:
            db.close()
            
    except Exception as e:
        logger.error(
            "learning_path_generation_failed",
            error=str(e),
            user_id=user_id
        )
        raise
    finally:
        span.end()

@celery.task
def send_weekly_learning_summary(user_id: int):
    """
    Send weekly learning summary email to user
    """
    span = tracer.start_span("send_weekly_learning_summary")
    
    try:
        db = SessionLocal()
        try:
            # Get user's learning path
            learning_path = db.query(LearningPath).filter(
                LearningPath.user_id == user_id
            ).first()
            
            if not learning_path:
                logger.warning(
                    "no_learning_path_found",
                    user_id=user_id
                )
                return {"status": "skipped", "reason": "no_learning_path"}
            
            # Initialize AI Core
            ai = AICore(settings.OPENAI_API_KEY)
            
            # Generate summary
            summary = ai.chatCompletion(
                f"""Generate a weekly learning summary for a {learning_path.level} real estate investor.
                Include:
                1. Progress update
                2. Key takeaways
                3. Next steps
                4. Recommended resources
                
                Format as a well-structured email."""
            )
            
            # TODO: Send email using your email service
            logger.info(
                "weekly_summary_generated",
                user_id=user_id
            )
            
            return {"status": "success"}
            
        except Exception as e:
            logger.error(
                "weekly_summary_generation_failed",
                error=str(e),
                user_id=user_id
            )
            raise
        finally:
            db.close()
            
    except Exception as e:
        logger.error(
            "weekly_summary_task_failed",
            error=str(e),
            user_id=user_id
        )
        raise
    finally:
        span.end() 