# backend/api/faiss_build.py
import os
import json
from faiss_utils import build_faiss_index

# Example dataset
docs = [
    "Use try-except blocks to handle division by zero errors.",
    "for val in arr: print(val)",
    "Adds two numbers and returns the result",
    "Avoid using eval() with untrusted input.",
    "Use list comprehensions instead of for-loops where possible.",
    "Never store sensitive info in plain text files.",
]

build_faiss_index(docs, save_path="api/faiss_index")
print("✅ FAISS index built successfully.")