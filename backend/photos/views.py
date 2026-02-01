from django.http import JsonResponse, FileResponse
from django.db.models import Q
from .models import Photo
from .semantic_search import semantic_search


def list_photos(request):
    query = request.GET.get("q", "").strip()

    # No query → return recent photos
    if not query:
        photos = Photo.objects.order_by("-taken_at", "-created_at")[:200]
    else:
        all_photos = Photo.objects.exclude(embedding__isnull=True)
        photos = semantic_search(query, all_photos, top_k=200)

    data = [
        {
            "id": p.id,
            "name": p.file_name,
            "folder": p.folder,
            "camera": p.camera_model or "Unknown",
            "city": p.city or "Unknown",
            "country": p.country or "Unknown",
            "taken_at": p.taken_at.strftime("%Y-%m-%d") if p.taken_at else "Unknown",
            "created_at": p.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }
        for p in photos
    ]

    return JsonResponse(data, safe=False)


def serve_photo(request, pk):
    try:
        photo = Photo.objects.get(pk=pk)
        return FileResponse(open(photo.file_path, "rb"))
    except Photo.DoesNotExist:
        return JsonResponse({"error": "Photo not found"}, status=404)
