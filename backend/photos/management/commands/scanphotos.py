from django.core.management.base import BaseCommand
from photos.scanner import scan_photos

class Command(BaseCommand):
    help = 'Scan local photo folder and index images'

    def handle(self, *args, **options):
        scan_photos()
        self.stdout.write(self.style.SUCCESS('Successfully scanned and indexed photos.'))