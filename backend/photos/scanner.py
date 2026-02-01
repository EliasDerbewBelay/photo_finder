import os
from django.conf import settings
from .models import Photo
from .exif_utils import extract_exif_data

IMAGE_EXTENSIONS = (".jpg", ".jpeg", ".png")

def scan_photos():
    root = settings.PHOTO_ROOT
    count = 0

    for root_dir, _, files in os.walk(root):
        for file in files:
            if file.lower().endswith(IMAGE_EXTENSIONS):
                full_path = os.path.join(root_dir, file)

                exif = extract_exif_data(full_path)

                photo, created = Photo.objects.update_or_create(
                    file_path=full_path,
                    defaults={
                        "file_name": file,
                        "folder":root_dir,
                        "taken_at": exif["taken_at"],
                        "camera_model": exif["camera_model"],
                        "gps_latitude": exif["gps_latitude"],
                        "gps_longitude": exif["gps_longitude"],
                    },
                )
                count += 1

    print(f"Indexed {count} photos")
