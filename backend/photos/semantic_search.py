import numpy as np
from photos.embedding_utils import embed_text

def cosine_similarity(a,b):
    a = np.array(a)
    b = np.array(b)
    return np.dot(a,b) /(np.linalg.norm(a) * np.linalg.norm(b))

def semantic_search(query, photos, top_k=50):
    query_vec = embed_text(query)

    scored = []
    for photo in photos:
        if photo.embedding:
            score = cosine_similarity(query_vec, photo.embedding)
            scored.append((score, photo))

    scored.sort(reverse=True, key=lambda x: x[0])
    return [p for _, p in scored[:top_k]]