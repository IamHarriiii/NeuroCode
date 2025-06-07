from celery import shared_task
from .reward_model import train_reward_model
import logging

logger = logging.getLogger(__name__)

@shared_task(autoretry_for=(Exception,), retry_kwargs={'max_retries': 3})
def async_retrain_reward_model():
    try:
        logger.info("🧠 Starting async reward model training...")
        train_reward_model()
        logger.info("✅ Reward model retrained successfully.")
        return {"status": "completed"}
    except Exception as e:
        logger.error(f"❌ Error during reward model retraining: {e}")
        raise