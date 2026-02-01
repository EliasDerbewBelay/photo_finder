from django.http import JsonResponse, FileResponse
from django.db.models import Q
from .models import Photo


def list_photos(request):
    query = request.GET.get("q", "")
    year = request.GET.get("year")
    month = request.GET.get("month")
    camera = request.GET.get("camera")
    city = request.GET.get("city")
    country = request.GET.get("country")

    photos = Photo.objects.all()

    # keyword search

    if query:
        photos = photos.filter(
            Q(file_name__icontains=query) |
            Q(camera_model__icontains=query) |
            Q(folder__icontains=query)
        )
        
    if year:
        photos = photos.filter(taken_at__year=year)

    if month:
        photos = photos.filter(taken_at__month=month)

    if camera:
        photos = photos.filter(camera_model=camera)

    if city:
        photos = photos.filter(city__icontains=city)

    if country:
        photos = photos.filter(country__icontains=country)

    photos = photos.order_by("-taken_at", "-created_at")[:200]


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
