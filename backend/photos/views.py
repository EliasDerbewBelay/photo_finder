from django.http import JsonResponse, FileResponse
from django.db.models import Q
from .models import Photo


def list_photos(request):
    query = request.GET.get("q", "")

    photos = (
        Photo.objects.filter(
            Q(file_name__icontains=query) |
            Q(camera_model__icontains=query) |
            Q(folder__icontains=query)
        )
        .order_by("-taken_at", "-created_at")[:200]
    )

    data = [
        {
            "id": p.id,
            "name": p.file_name,
            "folder": p.folder,
            "camera": p.camera_model or "Unknown",
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
