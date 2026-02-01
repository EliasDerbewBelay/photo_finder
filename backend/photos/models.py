from django.db import models

# Create your models here.

class Photo(models.Model):
    file_path = models.TextField(unique=True)
    file_name = models.CharField(max_length=255)
    folder = models.TextField()
    size = models.BigIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    #  ---New EXIF fields---
    taken_at = models.DateTimeField(null=True, blank=True)
    camera_model = models.CharField(max_length=255, blank=True)

    gps_latitude = models.FloatField(null=True, blank=True)
    gps_longitude = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.file_name