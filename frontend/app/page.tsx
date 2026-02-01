"use client";

import { useState, useEffect } from "react";
import { Photo } from "@/types/photos";
import { API_BASE_URL } from "@/lib/api";

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await fetch(
        `${API_BASE_URL}/api/photos/?q=${search}`,
      );
      const data = await response.json();
      setPhotos(data);
    };
    fetchPhotos();
  }, [search]);

  return (
    <div className="p-8">
      <div className="p-8">
        <input
          type="text"
          placeholder="Search photos by name or date..."
          className="w-full p-4 border rounded-lg shadow-sm"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              <img
                src={`${API_BASE_URL}/api/photo/${photo.id}/`}
                width={400}
                height={300}
                alt={photo.file_name}
                className="object-cover w-full h-48"
              />
              <p className="p-2 text-xs truncate text-gray-500">
                {photo.file_name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
