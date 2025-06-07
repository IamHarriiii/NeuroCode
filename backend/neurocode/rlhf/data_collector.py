# backend/rlhf/data_collector.py

import json
import os
import logging
from datetime import datetime

logger = logging.getLogger(__name__)
DATASET_PATH = "rlhf_data.csv"

def add_feedback(prompt, chosen, rejected, task="bug"):
    try:
        timestamp = datetime.now().isoformat()
        entry = {
            "timestamp": timestamp,
            "prompt": prompt,
            "chosen": chosen,
            "rejected": rejected,
            "task": task
        }

        if not os.path.exists(DATASET_PATH):
            with open(DATASET_PATH, "w") as f:
                f.write("timestamp,prompt,chosen,rejected,task\n")

        with open(DATASET_PATH, "a") as f:
            f.write(f'"{timestamp}","{prompt}","{chosen}","{rejected}","{task}"\n')

        logger.info(f"✅ Feedback added ({task})")
    except Exception as e:
        logger.error(f"❌ Failed to store feedback: {e}")