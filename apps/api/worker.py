from celery import Celery
from apps.api.core.config import settings
import structlog
import os

logger = structlog.getLogger()

# Construct Redis URL - use 'redis' hostname for Docker networking
# In Docker, we can't use localhost which is container's own loopback
# We need to use the service name defined in docker-compose
redis_host = os.environ.get('REDIS_HOST', 'redis')
redis_port = os.environ.get('REDIS_PORT', '6379')
redis_url = f"redis://{redis_host}:{redis_port}/0"

logger.info(f"Celery using Redis at {redis_url}")

# Initialize Celery
celery = Celery(
    "reia",
    broker=redis_url,
    backend=redis_url,
    include=[
        "apps.api.tasks.education",
        "apps.api.tasks.marketing",
        "apps.api.tasks.analysis",
        "apps.api.tasks.finance"
    ]
)

# Configure Celery
celery.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=3600,  # 1 hour
    worker_max_tasks_per_child=1000,
    worker_prefetch_multiplier=1,
    broker_connection_retry_on_startup=True
)

@celery.task(bind=True)
def debug_task(self):
    """
    Debug task to verify Celery is working
    """
    logger.info("debug_task_executed", task_id=self.request.id)
    return {"status": "success", "task_id": self.request.id}

# Import tasks
from apps.api.tasks import education, marketing, analysis, finance 