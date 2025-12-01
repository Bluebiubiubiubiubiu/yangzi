'use client';

import { useState } from 'react';
import { GalleryItem } from '@/lib/types';

interface ImageCardProps {
  item: GalleryItem;
  onClick: () => void;
}

export default function ImageCard({ item, onClick }: ImageCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const categoryConfig = {
    event: { label: '活动饭拍', icon: '📸', color: 'bg-purple-500' },
    official: { label: '官方精修', icon: '✨', color: 'bg-blue-500' },
    drama: { label: '剧照', icon: '🎬', color: 'bg-pink-500' },
    magazine: { label: '杂志扫图', icon: '📰', color: 'bg-amber-500' },
    daily: { label: '日常自拍', icon: '🤳', color: 'bg-green-500' },
  };

  const config = categoryConfig[item.category];

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-2xl transition-all duration-500"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        {/* Skeleton Loader */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
        )}
        
        {/* Actual Image */}
        <div
          className={`absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${item.thumbnail || item.image})` }}
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className={`${config.color} text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg`}>
            {config.icon} {config.label}
          </span>
        </div>

        {/* Date Badge */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
          {item.date}
        </div>

        {/* Info (Visible on Hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          {item.title && (
            <h3 className="text-white font-semibold mb-2 line-clamp-2">
              {item.title}
            </h3>
          )}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Zoom Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

