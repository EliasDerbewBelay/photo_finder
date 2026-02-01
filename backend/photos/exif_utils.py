from PIL import Image, ExifTags
from datetime import datetime

def _convert_to_degrees(value):
    d = value[0][0] / value[0][1]
    m = value[1][0] / value[1][1]
    s = value[2][0] / value[2][1]
    return d + (m / 60.0) + (s / 3600.0)

def extract_exif_data(image_path):
    exif_data = {
        "taken_at": None,
        "camera_model": "",
        "gps_latitude": None,
        "gps_longitude": None,
    }

    try:
        image = Image.open(image_path)
        info = image._getexif()

        if not info:
            return exif_data

        exif = {
            ExifTags.TAGS.get(tag, tag): value
            for tag, value in info.items()
        }

        # 📅 Date taken
        date_str = exif.get("DateTimeOriginal") or exif.get("DateTime")
        if date_str:
            try:
                exif_data["taken_at"] = datetime.strptime(
                    date_str, "%Y:%m:%d %H:%M:%S"
                )
            except ValueError:
                pass

        # 📷 Camera model
        model = exif.get("Model")
        if model:
            exif_data["camera_model"] = str(model)

        # 🌍 GPS
        gps_info = exif.get("GPSInfo")
        if gps_info:
            gps_data = {}
            for key in gps_info:
                name = ExifTags.GPSTAGS.get(key)
                gps_data[name] = gps_info[key]

            if "GPSLatitude" in gps_data and "GPSLatitudeRef" in gps_data:
                lat = _convert_to_degrees(gps_data["GPSLatitude"])
                if gps_data["GPSLatitudeRef"] != "N":
                    lat = -lat
                exif_data["gps_latitude"] = lat

            if "GPSLongitude" in gps_data and "GPSLongitudeRef" in gps_data:
                lon = _convert_to_degrees(gps_data["GPSLongitude"])
                if gps_data["GPSLongitudeRef"] != "E":
                    lon = -lon
                exif_data["gps_longitude"] = lon

    except Exception as e:
        pass

    return exif_data
