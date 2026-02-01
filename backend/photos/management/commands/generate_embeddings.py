from django.core.management.base import BaseCommand
from photos.models import Photo
from photos.embedding_utils import embed_text


class Command(BaseCommand):
    help = "Generate semantic embeddings for photos"

    def handle(self, *args, **kwargs):
        photos = Photo.objects.filter(embedding__isnull=True)

        self.stdout.write(f"Generating embeddings for {photos.count()} photos...")

        for photo in photos:
            text = " ".join(filter(None, [
                photo.file_name,
                photo.camera_model,
                photo.city,
                photo.country,
                photo.folder,
                photo.taken_at.strftime("%B %Y") if photo.taken_at else None,
            ]))

            photo.embedding = embed_text(text)
            photo.save(update_fields=["embedding"])

        self.stdout.write(self.style.SUCCESS("Embeddings generated successfully"))
