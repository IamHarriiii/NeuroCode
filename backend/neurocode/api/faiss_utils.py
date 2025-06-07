# backend/api/faiss_utils.py

import os
import json
import logging
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

# Configure logging
logger = logging.getLogger(__name__)

# Define paths
INDEX_FILE = "api/faiss_index/index.bin"
DATA_FILE = "api/faiss_index/documents.json"
EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"

# Initialize embedding model (once at startup)
try:
    embedder = SentenceTransformer(EMBEDDING_MODEL_NAME)
    logger.info(f"✅ Loaded embedding model: {EMBEDDING_MODEL_NAME}")
except Exception as e:
    logger.error(f"❌ Failed to load embedding model: {e}")
    raise


def load_faiss_index():
    """
    Load FAISS index and associated documents.
    
    Returns:
        tuple: (index, documents)
    """
    if not os.path.exists(INDEX_FILE):
        logger.error("❌ FAISS index file not found.")
        raise FileNotFoundError(f"FAISS index file '{INDEX_FILE}' not found.")

    if not os.path.exists(DATA_FILE):
        logger.error("❌ Documents file not found.")
        raise FileNotFoundError(f"Documents file '{DATA_FILE}' not found.")

    try:
        index = faiss.read_index(INDEX_FILE)
        logger.info(f"✅ FAISS index loaded from {INDEX_FILE}")
    except Exception as e:
        logger.error(f"❌ Failed to read FAISS index: {e}")
        raise

    try:
        with open(DATA_FILE, "r") as f:
            documents = json.load(f)
        logger.info(f"✅ Documents loaded from {DATA_FILE}")
    except Exception as e:
        logger.error(f"❌ Failed to load documents: {e}")
        raise

    return index, documents


def build_faiss_index(documents, save_path=None):
    """
    Build FAISS index from list of documents.
    
    Args:
        documents (list): List of strings (code snippets or documentation).
        save_path (str): Path to save index and documents. Defaults to INDEX_FILE and DATA_FILE.
    """
    if not documents:
        logger.warning("⚠️ No documents provided. Skipping index building.")
        return

    save_path = save_path or os.path.dirname(INDEX_FILE)

    try:
        embeddings = embedder.encode(documents)
        dimension = embeddings.shape[1]
        index = faiss.IndexFlatL2(dimension)
        index.add(np.array(embeddings))
        logger.info(f"✅ Built FAISS index with {len(documents)} documents")
    except Exception as e:
        logger.error(f"❌ Error during FAISS index creation: {e}")
        raise

    try:
        index_file = os.path.join(save_path, "index.bin")
        data_file = os.path.join(save_path, "documents.json")

        faiss.write_index(index, index_file)
        with open(data_file, "w") as f:
            json.dump(documents, f)
        logger.info(f"✅ FAISS index saved to {index_file}")
        logger.info(f"✅ Documents saved to {data_file}")
    except Exception as e:
        logger.error(f"❌ Error saving FAISS index or documents: {e}")
        raise


def retrieve_context_from_faiss(query, task=None, top_k=3):
    """
    Retrieve top-k relevant documents from FAISS index based on query.
    
    Args:
        query (str): Query string.
        task (str, optional): Task type for filtering documents (not currently used).
        top_k (int): Number of nearest neighbors to retrieve.
        
    Returns:
        str: Concatenated context from retrieved documents.
    """
    try:
        index, documents = load_faiss_index()
    except Exception as e:
        logger.error(f"❌ Unable to load FAISS index: {e}")
        return ""

    try:
        query_vec = embedder.encode([query])
        distances, indices = index.search(query_vec, top_k)
        logger.info(f"🔍 Retrieved {top_k} documents for query: '{query[:50]}...'")
    except Exception as e:
        logger.error(f"❌ Error during FAISS search: {e}")
        return ""

    try:
        results = [documents[i] for i in indices[0]]
        context = "\n---\n".join(results)
        return context
    except IndexError as e:
        logger.error(f"❌ Index out of bounds: {e}")
        return ""