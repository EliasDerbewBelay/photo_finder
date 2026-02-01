import os
from datetime import datetime
from django.conf import settings
from .models import Photo

IMAGE_EXTENSIONS = (".jpg", ".jpeg", ".png", ".webp")

def scan_photos():
    root = settings.PHOTO_ROOT

    if not os.path.exists(root):
        raise ValueError(f"PHOTO_ROOT does not exist: {root}")

    for dirpath, dirnames, filenames in os.walk(root):
        for filename in filenames:
            if not filename.lower().endswith(IMAGE_EXTENSIONS):
                continue

            full_path = os.path.join(dirpath, filename)

            # Avoid duplicates
            if Photo.objects.filter(file_path=full_path).exists():
                continue

            stat = os.stat(full_path)

            Photo.objects.create(
                file_path=full_path,
                file_name=filename,
                folder=dirpath,
                size=stat.st_size,
                created_at=datetime.fromtimestamp(stat.st_ctime),
            )
