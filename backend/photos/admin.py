from django.contrib import admin
from .models import Photo
# Register your models here.

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('file_name', 'folder', 'created_at')
    search_fields = ('file_name', 'folder')
