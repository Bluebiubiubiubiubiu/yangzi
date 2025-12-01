'use client';

import { useEffect } from 'react';
import { GalleryItem } from '@/lib/types';

interface ImageModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export default function ImageModal({ item, onClose }: ImageModalProps) {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [item]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!item) return null;

  const categoryConfig = {
    event: { label: '活动饭拍', icon: '📸' },
    official: { label: '官方精修', icon: '✨' },
    drama: { label: '剧照', icon: '🎬' },
    magazine: { label: '杂志扫图', icon: '📰' },
    daily: { label: '日常自拍', icon: '🤳' },
  };

  const config = categoryConfig[item.category];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 animate-fade-in"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300"
        aria-label="Close"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Content */}
      <div
        className="relative max-w-7xl max-h-[90vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative">
          <img
            src={item.image}
            alt={item.title || 'Gallery image'}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
          />
          
          {/* Image Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                {config.icon} {config.label}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full">
                {item.date}
              </span>
            </div>
            
            {item.title && (
              <h3 className="text-white text-xl font-bold mb-2">
                {item.title}
              </h3>
            )}
            
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-500/50 backdrop-blur-sm text-white text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-4 flex justify-center">
          <a
            href={item.image}
            download
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>下载原图</span>
          </a>
        </div>
      </div>
    </div>
  );
}

