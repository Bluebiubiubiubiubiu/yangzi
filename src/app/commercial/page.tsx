'use client';

import { useState } from 'react';
import BrandWall from '@/components/commercial/BrandWall';
import MagazineGrid from '@/components/commercial/MagazineGrid';
import { brands, magazines } from '@/lib/data';

export default function CommercialPage() {
  const [activeTab, setActiveTab] = useState<'brands' | 'magazines'>('brands');

  return (
    <div className="pt-24 md:pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            商业价值
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            品牌代言与时尚影响力的完整记录
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('brands')}
            className={`px-6 py-3 font-medium transition-all relative ${
              activeTab === 'brands'
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <span className="flex items-center space-x-2">
              <span>💼</span>
              <span>品牌代言</span>
              <span className="ml-2 px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-xs font-semibold">
                {brands.length}
              </span>
            </span>
            {activeTab === 'brands' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('magazines')}
            className={`px-6 py-3 font-medium transition-all relative ${
              activeTab === 'magazines'
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <span className="flex items-center space-x-2">
              <span>📰</span>
              <span>杂志刊物</span>
              <span className="ml-2 px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-xs font-semibold">
                {magazines.length}
              </span>
            </span>
            {activeTab === 'magazines' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {activeTab === 'brands' ? (
            <BrandWall brands={brands} />
          ) : (
            <MagazineGrid magazines={magazines} />
          )}
        </div>
      </div>
    </div>
  );
}

