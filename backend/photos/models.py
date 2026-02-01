from django.db import models

# Create your models here.

class Photo(models.Model):
    file_path = models.TextField(unique=True)
    file_name = models.CharField(max_length=255)
    folder = models.TextField()
    size = models.BigIntegerField()
    created_at = models.DateTimeField()

    def _str_(self):
        return self.file_name