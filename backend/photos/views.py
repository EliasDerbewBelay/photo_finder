from django.http import JsonResponse, FileResponse
from .models import Photo

# List / search photos
def list_photos(request):
    query = request.GET.get("q", "")
    photos = Photo.objects.filter(file_name__icontains=query).order_by("-created_at")[:200]

    data = [
        {
            "id": p.id,
            "name": p.file_name,
            "folder": p.folder,
            "created_at": p.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }
        for p in photos
    ]
    return JsonResponse(data, safe=False)

# Serve actual image file
def serve_photo(request, pk):
    try:
        photo = Photo.objects.get(pk=pk)
        return FileResponse(open(photo.file_path, "rb"))
    except Photo.DoesNotExist:
        return JsonResponse({"error": "Photo not found"}, status=404)
