import os
from django.conf import settings
from .models import Photo
from .exif_utils import extract_exif_data
from .location_utils import get_city_country

IMAGE_EXTENSIONS = (".jpg", ".jpeg", ".png")

def scan_photos():
    root = settings.PHOTO_ROOT
    count = 0

    for root_dir, _, files in os.walk(root):
        for file in files:
            if file.lower().endswith(IMAGE_EXTENSIONS):
                full_path = os.path.join(root_dir, file)

                # Extract EXIF data for this specific photo
                exif = extract_exif_data(full_path)

                # Initialize city/country as None
                city = ""
                country = ""

                # Only get location if GPS data exists
                if exif.get("gps_latitude") and exif.get("gps_longitude"):
                    city, country = get_city_country(
                        exif["gps_latitude"], 
                        exif["gps_longitude"]
                    )

                # Create or update the photo record
                photo, created = Photo.objects.update_or_create(
                    file_path=full_path,
                    defaults={
                        "file_name": file,
                        "folder": root_dir,
                        "taken_at": exif.get("taken_at"),  # Use .get() for safety
                        "camera_model": exif.get("camera_model"),
                        "gps_latitude": exif.get("gps_latitude"),
                        "gps_longitude": exif.get("gps_longitude"),
                        "city": city,  # Will be None if no GPS
                        "country": country,  # Will be None if no GPS
                    },
                )
                count += 1

    print(f"Indexed {count} photos")