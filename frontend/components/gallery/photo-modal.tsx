"use client";

import { Photo } from "@/types/photo";
import { API_BASE_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  X,
  MapPin,
  Calendar,
  Camera,
  Tag,
  Download,
  FileText,
} from "lucide-react";

interface PhotoModalProps {
  photo: Photo;
  isOpen: boolean;
  onClose: () => void;
}

export default function PhotoModal({
  photo,
  isOpen,
  onClose,
}: PhotoModalProps) {
  const handleDownload = () => {
    window.open(`${API_BASE_URL}/api/photo/${photo.id}/download/`, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="truncate">{photo.file_name}</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 overflow-hidden">
          {/* Image Preview */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={`${API_BASE_URL}/api/photo/${photo.id}/`}
              alt={photo.file_name}
              className="object-contain w-full h-full max-h-[60vh]"
            />
          </div>

          {/* Metadata Panel */}
          <div className="space-y-6 overflow-y-auto max-h-[60vh]">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Photo Information</h3>

              <div className="space-y-3">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">File Name</p>
                    <p className="font-medium">{photo.file_name}</p>
                  </div>
                </div>

                {photo.metadata?.date_taken && (
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Date Taken</p>
                      <p className="font-medium">
                        {new Date(photo.metadata.date_taken).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {photo.metadata?.location && (
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{photo.metadata.location}</p>
                    </div>
                  </div>
                )}

                {photo.metadata?.camera_model && (
                  <div className="flex items-center">
                    <Camera className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Camera</p>
                      <p className="font-medium">
                        {photo.metadata.camera_model}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {photo.metadata?.tags && photo.metadata.tags.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center">
                  <Tag className="h-5 w-5 text-gray-400 mr-2" />
                  <h4 className="font-medium">Tags</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {photo.metadata.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* File Details */}
            <div className="space-y-3">
              <h4 className="font-medium">File Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">File Size</p>
                  <p className="font-medium">
                    {(photo.file_size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Created</p>
                  <p className="font-medium">
                    {new Date(photo.created_at).toLocaleDateString()}
                  </p>
                </div>
                {photo.metadata?.width && photo.metadata?.height && (
                  <>
                    <div>
                      <p className="text-gray-500">Dimensions</p>
                      <p className="font-medium">
                        {photo.metadata.width} × {photo.metadata.height}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t">
              <Button
                onClick={handleDownload}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Original
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
