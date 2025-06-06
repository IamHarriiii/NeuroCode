# backend/api/management/commands/build_rag_index.py
import os
import json
import logging
from django.core.management.base import BaseCommand
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Builds or updates the FAISS index with custom documents'

    def handle(self, *args, **options):
        self.stdout.write("🧠 Building FAISS index with RAG documents...")
        logger.info("🧠 Starting FAISS index build...")

        # Define paths
        INDEX_DIR = "api/faiss_index"
        DATA_FILE = os.path.join(INDEX_DIR, "documents.json")
        INDEX_FILE = os.path.join(INDEX_DIR, "index.bin")

        # Load embedding model
        try:
            embedder = SentenceTransformer("all-MiniLM-L6-v2")
            logger.info("✅ Loaded embedding model")
        except Exception as e:
            logger.error(f"❌ Failed to load embedding model: {e}")
            raise

        # Example document set — replace with your real data
        docs = [
            "Use try-except blocks to catch ZeroDivisionError.",
            "Optimize nested loops by breaking them early.",
            "SQL Injection happens when user inputs are not sanitized.",
            "Avoid global variables; prefer encapsulation in functions/classes.",
            "Use list comprehensions for cleaner and faster Python code.",
            "Always validate input before processing.",
            "Never store sensitive info in plain text files.",
            "Python uses indentation to define scope, not curly braces.",
            "Generators are memory efficient for large datasets.",
            "Type hints improve readability and help static analysis."
        ]

        try:
            embeddings = embedder.encode(docs)
            dimension = embeddings.shape[1]
            index = faiss.IndexFlatL2(dimension)
            index.add(np.array(embeddings))
            logger.info(f"✅ Built FAISS index with {len(docs)} documents")
        except Exception as e:
            logger.error(f"❌ Error during FAISS index creation: {e}")
            raise

        try:
            os.makedirs(INDEX_DIR, exist_ok=True)

            # Save FAISS index
            faiss.write_index(index, INDEX_FILE)
            self.stdout.write(self.style.SUCCESS(f"✅ FAISS index saved to {INDEX_FILE}"))

            # Save documents
            with open(DATA_FILE, "w") as f:
                json.dump(docs, f)
            self.stdout.write(self.style.SUCCESS(f"✅ Documents saved to {DATA_FILE}"))
        except Exception as e:
            logger.error(f"❌ Error saving FAISS index or documents: {e}")
            raise