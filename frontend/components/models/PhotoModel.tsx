'use client';
import { 
  X, 
  Download,  
  Facebook, 
  MessageCircle, 
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Copy
} from 'lucide-react';
import { useEffect } from 'react';
import { Photo } from '@/types/photo';

interface PhotoModalProps {
  photo: Photo;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  selectedIndex: number;
  totalPhotos: number;
  apiBaseUrl: string;
  onDownload: (photo: Photo) => void;
  onShare: (platform: 'facebook' | 'whatsapp' | 'telegram') => void;
  onCopyLink: (link: string) => void;
}

export default function PhotoModal({
  photo,
  isOpen,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  selectedIndex,
  totalPhotos,
  apiBaseUrl,
  onDownload,
  onShare,
  onCopyLink
}: PhotoModalProps) {
  
  if (!isOpen || !photo) return null;

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  const photoUrl = `${apiBaseUrl}/api/photo/${photo.id}/`;
  const shareText = `Check out this photo: ${photo.file_name}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-6xl mx-4 max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="min-w-0 flex-1 mr-4">
            <h2 className="text-xl font-semibold text-gray-800 truncate">
              {photo.file_name}
            </h2>
            {photo.created_at && (
              <p className="text-sm text-gray-500">
                {new Date(photo.created_at).toLocaleDateString()}
              </p>
            )}
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Photo Content */}
        <div className="flex flex-col md:flex-row h-[70vh]">
          {/* Photo Display */}
          <div className="flex-1 relative bg-gray-900">
            <img
              src={photoUrl}
              alt={photo.file_name}
              className="w-full h-full object-contain"
            />
            
            {/* Navigation Arrows */}
            {hasPrev && (
              <button
                onClick={onPrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            
            {hasNext && (
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Side Panel - Actions & Info */}
          <div className="w-full md:w-80 border-t md:border-t-0 md:border-l flex flex-col">
            {/* Actions Section */}
            <div className="p-6 border-b">
              <h3 className="font-medium text-gray-700 mb-4">Actions</h3>
              
              <div className="space-y-4">
                {/* Download Button */}
                <button
                  onClick={() => onDownload(photo)}
                  className="w-full flex items-center justify-center gap-3 p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow hover:shadow-lg active:scale-[0.98]"
                >
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Download Image</span>
                </button>

                {/* Share Section */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Share to:</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => onShare('facebook')}
                      className="flex flex-col items-center justify-center p-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors active:scale-[0.98]"
                      aria-label="Share to Facebook"
                    >
                      <Facebook className="w-5 h-5 mb-1" />
                      <span className="text-xs font-medium">Facebook</span>
                    </button>
                    
                    <button
                      onClick={() => onShare('whatsapp')}
                      className="flex flex-col items-center justify-center p-3 bg-[#25D366] text-white rounded-lg hover:bg-[#1DA851] transition-colors active:scale-[0.98]"
                      aria-label="Share to WhatsApp"
                    >
                      <MessageCircle className="w-5 h-5 mb-1" />
                      <span className="text-xs font-medium">WhatsApp</span>
                    </button>
                    
                    <button
                      onClick={() => onShare('telegram')}
                      className="flex flex-col items-center justify-center p-3 bg-[#0088cc] text-white rounded-lg hover:bg-[#0077B5] transition-colors active:scale-[0.98]"
                      aria-label="Share to Telegram"
                    >
                      <MessageSquare className="w-5 h-5 mb-1" />
                      <span className="text-xs font-medium">Telegram</span>
                    </button>
                  </div>
                </div>

                {/* Copy Link */}
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">Direct Link:</p>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        readOnly
                        value={photoUrl}
                        className="w-full p-2 pr-10 border rounded-lg text-sm bg-gray-50 truncate"
                        onClick={(e) => (e.target as HTMLInputElement).select()}
                      />
                      <button
                        onClick={() => onCopyLink(photoUrl)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded transition-colors"
                        aria-label="Copy link"
                      >
                        <Copy className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Info */}
            <div className="p-6 overflow-y-auto flex-1">
              <h3 className="font-medium text-gray-700 mb-4">Photo Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">File Name</p>
                  <p className="text-gray-800 font-medium break-words">{photo.file_name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Upload Date</p>
                  <p className="text-gray-800">
                    {photo.created_at ? new Date(photo.created_at).toLocaleString() : 'N/A'}
                  </p>
                </div>
                
                {photo.description && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Description</p>
                    <p className="text-gray-800">{photo.description}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Photo ID</p>
                  <p className="text-gray-800 font-mono text-sm">{photo.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-gray-600 min-w-[100px]">
            {hasPrev && (
              <button
                onClick={onPrev}
                className="flex items-center gap-2 hover:text-gray-800 transition-colors active:scale-[0.98]"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
            )}
          </div>
          
          <div className="text-sm text-gray-500 text-center">
            {selectedIndex !== -1 && `Photo ${selectedIndex + 1} of ${totalPhotos}`}
          </div>
          
          <div className="text-sm text-gray-600 min-w-[100px] text-right">
            {hasNext && (
              <button
                onClick={onNext}
                className="flex items-center gap-2 hover:text-gray-800 transition-colors active:scale-[0.98]"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}