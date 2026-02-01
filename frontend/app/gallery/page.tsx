'use client';
import { useState, useEffect, useRef } from 'react';
import { Photo } from '@/types/photo';
import { API_BASE_URL } from "@/lib/api";
import PhotoModal from '@/components/models/PhotoModel';
import { Maximize2 } from 'lucide-react';

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [search, setSearch] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout>();

  // Fetch photos from your Django backend
  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/photos/?q=${search}`);
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(fetchPhotos, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [search]);

  const openPhotoDetail = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closePhotoDetail = () => {
    setSelectedPhoto(null);
    setSelectedIndex(-1);
    document.body.style.overflow = 'auto';
  };

  const navigatePhoto = (direction: 'next' | 'prev') => {
    if (selectedIndex === -1) return;

    let newIndex;
    if (direction === 'next') {
      newIndex = (selectedIndex + 1) % photos.length;
    } else {
      newIndex = selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1;
    }

    setSelectedPhoto(photos[newIndex]);
    setSelectedIndex(newIndex);
  };

  const handleDownload = async (photo: Photo) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/photo/${photo.id}/`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = photo.file_name || `photo-${photo.id}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download the photo. Please try again.');
    }
  };

  const handleShare = (platform: 'facebook' | 'whatsapp' | 'telegram') => {
    if (!selectedPhoto) return;

    const photoUrl = `${API_BASE_URL}/api/photo/${selectedPhoto.id}/`;
    const text = `Check out this photo: ${selectedPhoto.file_name}`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(photoUrl)}&quote=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${photoUrl}`)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(photoUrl)}&text=${encodeURIComponent(text)}`
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link)
      .then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Photo Gallery</h1>
        <p className="text-gray-600 mb-6">Browse and discover amazing photos</p>
        
        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <input 
            type="text" 
            placeholder="Search photos by name, description, or date..." 
            className="w-full p-4 pl-12 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {isLoading ? (
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 rounded-xl h-48"></div>
              <div className="mt-2 h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : photos.length === 0 ? (
        <div className="max-w-7xl mx-auto text-center py-16">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No photos found</h3>
          <p className="text-gray-500">Try a different search term or check back later</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {photos.map((photo, index) => (
            <div 
              key={photo.id} 
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-white"
              onClick={() => openPhotoDetail(photo, index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openPhotoDetail(photo, index);
                }
              }}
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={`${API_BASE_URL}/api/photo/${photo.id}/`} 
                  alt={photo.file_name} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-3">
                <p className="text-sm font-medium text-gray-800 truncate">{photo.file_name}</p>
                {photo.created_at && (
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(photo.created_at).toLocaleDateString()}
                  </p>
                )}
              </div>
              
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow hover:scale-110 transition-transform"
                  aria-label="View photo details"
                >
                  <Maximize2 className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          isOpen={!!selectedPhoto}
          onClose={closePhotoDetail}
          onNext={() => navigatePhoto('next')}
          onPrev={() => navigatePhoto('prev')}
          hasNext={selectedIndex < photos.length - 1}
          hasPrev={selectedIndex > 0}
          selectedIndex={selectedIndex}
          totalPhotos={photos.length}
          apiBaseUrl={API_BASE_URL}
          onDownload={handleDownload}
          onShare={handleShare}
          onCopyLink={handleCopyLink}
        />
      )}

      {/* Copy Link Toast Notification */}
      {copiedLink && (
        <div className="fixed bottom-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-bottom-5">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
}