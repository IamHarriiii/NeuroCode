from sentence_transformers import SentenceTransformer
import faiss
import os, json

# Load model once
embedder = SentenceTransformer("all-MiniLM-L6-v2")

# Build or load index
INDEX_FILE = "faiss_index/index.bin"
DATA_FILE = "faiss_index/documents.json"

def load_faiss_index():
    if not os.path.exists(INDEX_FILE):
        raise ValueError("FAISS index not found.")
    index = faiss.read_index(INDEX_FILE)
    with open(DATA_FILE, "r") as f:
        documents = json.load(f)
    return index, documents

def retrieve_context_from_faiss(query, top_k=3):
    index, documents = load_faiss_index()
    query_vec = embedder.encode([query])
    _, indices = index.search(query_vec, top_k)
    return "\n---\n".join(documents[i] for i in indices[0])