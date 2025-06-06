# backend/api/management/commands/build_rag_index.py

import os
import json
import logging
import numpy as np
from django.core.management.base import BaseCommand
from sentence_transformers import SentenceTransformer
import faiss
from api.models import UsageLog

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Builds or updates the FAISS index using stored user interactions'

    def handle(self, *args, **options):
        self.stdout.write("🧠 Starting FAISS index build for RAG...")
        logger.info("🧠 Starting FAISS index build...")

        INDEX_DIR = "faiss_index"
        INDEX_FILE = os.path.join(INDEX_DIR, "index.bin")
        DATA_FILE = os.path.join(INDEX_DIR, "documents.json")

        # Ensure directory exists
        os.makedirs(INDEX_DIR, exist_ok=True)

        try:
            # Load embedding model
            embedder = SentenceTransformer("all-MiniLM-L6-v2")
            self.stdout.write("✅ Loaded embedding model")
            logger.info("✅ Loaded embedding model")

            # Fetch data from UsageLog
            logs = UsageLog.objects.all().values_list("code", flat=True)
            if not logs.exists():
                raise ValueError("No usage logs found. Add some interactions first.")

            docs = list(logs)
            self.stdout.write(f"📊 Found {len(docs)} code samples for indexing")

            # Generate embeddings
            embeddings = embedder.encode(docs)
            dimension = embeddings.shape[1]
            index = faiss.IndexFlatL2(dimension)
            index.add(np.array(embeddings))

            # Save FAISS index and documents
            faiss.write_index(index, INDEX_FILE)
            with open(DATA_FILE, "w") as f:
                json.dump(docs, f)

            self.stdout.write(self.style.SUCCESS(f"✅ FAISS index saved to {INDEX_FILE}"))
            self.stdout.write(self.style.SUCCESS(f"✅ Documents saved to {DATA_FILE}"))

        except Exception as e:
            logger.error(f"❌ Error during index building: {e}")
            self.stdout.write(self.style.ERROR(f"❌ Error during index building: {e}"))