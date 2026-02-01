def build_search_text(photo):
    parts = []
    if photo.camera_model:
        parts.append(f"Taken with {photo.camera_model.lower()}")
    if photo.taken_at:
        parts.append(photo.taken_at.strftime("Taken on %B %d, %Y").lower())
    if photo.city:
        parts.append(f"Located in {photo.city.lower()}")
    if photo.country:
        parts.append(f"{photo.country.lower()}")
    parts.append(photo.file_name.lower())
    parts.append(photo.folder.lower())

    return ". ".join(parts)