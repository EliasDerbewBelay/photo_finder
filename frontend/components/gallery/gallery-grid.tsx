"use client";

import { Photo } from "@/types/photo";
import { API_BASE_URL } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar } from "lucide-react";

interface GalleryGridProps {
  photos: Photo[];
  viewMode: "grid" | "list";
  onPhotoClick: (photo: Photo) => void;
}

export default function GalleryGrid({
  photos,
  viewMode,
  onPhotoClick,
}: GalleryGridProps) {
  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {photos.map((photo) => (
          <Card
            key={photo.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onPhotoClick(photo)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <img
                    src={`${API_BASE_URL}/api/photo/${photo.id}/`}
                    alt={photo.file_name}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {photo.file_name}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    {photo.metadata?.date_taken && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(
                          photo.metadata.date_taken,
                        ).toLocaleDateString()}
                      </div>
                    )}
                    {photo.metadata?.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {photo.metadata.location}
                      </div>
                    )}
                    {photo.metadata?.camera_model && (
                      <div className="hidden md:block">
                        {photo.metadata.camera_model}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {photo.metadata?.tags?.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => onPhotoClick(photo)}
        >
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img
              src={`${API_BASE_URL}/api/photo/${photo.id}/`}
              alt={photo.file_name}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="font-medium truncate">{photo.file_name}</p>
              {photo.metadata?.date_taken && (
                <p className="text-sm text-gray-200 mt-1">
                  {new Date(photo.metadata.date_taken).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          <div className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {photo.file_name}
                </p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  {photo.metadata?.location && (
                    <span className="truncate">
                      <MapPin className="h-3 w-3 inline mr-1" />
                      {photo.metadata.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
