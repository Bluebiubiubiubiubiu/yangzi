'use client';

import { useState } from 'react';
import Link from 'next/link';
import WorkCard from '@/components/works/WorkCard';
import WorkFilters from '@/components/works/WorkFilters';
import { works } from '@/lib/data';
import { WorkStatus, WorkType, Work } from '@/lib/types';

const eraGroups = [
  { key: '2020s', title: '2020-2025', subtitle: '全能型演员 (All-round Actor)', range: [2020, 2025] },
  { key: '2016s', title: '2016-2019', subtitle: '流量与口碑双赢 (Traffic & Reputation)', range: [2016, 2019] },
  { key: '2012s', title: '2012-2015', subtitle: '实力派崛起 (Rise of Acting Power)', range: [2012, 2015] },
  { key: '2006s', title: '2006-2011', subtitle: '转型期 (Transition Period)', range: [2006, 2011] },
  { key: '2000s', title: '2000s Early', subtitle: '童星时期 (Child Star Era)', range: [0, 2005] },
];

export default function WorksPage() {
  const [selectedType, setSelectedType] = useState<WorkType | 'all'>('tv');
  const [selectedStatus, setSelectedStatus] = useState<WorkStatus | 'all'>('all');

  const filteredWorks = works.filter((work) => {
    // Exclude variety shows from main works page
    if (work.type === 'variety') return false;
    
    const typeMatch = selectedType === 'all' || work.type === selectedType;
    const statusMatch = selectedStatus === 'all' || work.status === selectedStatus;
    return typeMatch && statusMatch;
  });

  const airedWorks = works.filter((w) => w.status === 'aired' && w.type === 'tv');
  const totalWorksCount = works.filter(w => w.type === 'tv').length;
  const totalViewCount = '1200B+'; // Estimated based on available data (many works with >10B views)

  // Group works by era
  const worksByEra = eraGroups.reduce((acc, era) => {
    acc[era.key] = filteredWorks.filter(w => w.year >= era.range[0] && w.year <= era.range[1]);
    return acc;
  }, {} as Record<string, Work[]>);

  return (
    <div className="pt-24 md:pt-32 pb-16 bg-black min-h-screen">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="w-8 h-[2px] bg-neon-purple" />
                <span className="text-neon-purple font-mono text-sm tracking-widest uppercase">Filmography</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                WORKS<span className="text-neon-purple">.</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                记录每一个精彩角色，见证演技的成长与突破。从古装仙侠到现代职场，探索多面可能。
              </p>
            </div>
            <Link
              href="/works/achievements"
              className="mt-6 md:mt-0 inline-flex items-center space-x-3 px-8 py-4 bg-white/5 border border-white/10 hover:border-neon-purple hover:bg-neon-purple/10 text-white rounded-none transition-all duration-300 group"
            >
              <span className="font-mono font-bold tracking-widest">DATA BOARD</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {[
              { label: 'TV DRAMA', value: totalWorksCount, color: 'text-white' },
              { label: 'AIRED', value: airedWorks.length, color: 'text-neon-blue' },
              { label: 'TOTAL VIEWS', value: totalViewCount, color: 'text-neon-purple' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-6 hover:border-white/20 transition-colors">
                <div className={`text-3xl md:text-4xl font-bold mb-1 font-mono ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 font-mono tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <WorkFilters
          selectedType={selectedType}
          selectedStatus={selectedStatus}
          onTypeChange={setSelectedType}
          onStatusChange={setSelectedStatus}
        />

        {/* Results Count */}
        <div className="mb-12 flex items-center space-x-4">
          <div className="h-[1px] flex-1 bg-gray-800" />
          <p className="text-gray-500 font-mono text-sm">
            SHOWING <span className="text-white font-bold">{filteredWorks.length}</span> RESULTS
          </p>
        </div>

        {/* Works Grid Grouped by Era */}
        {filteredWorks.length > 0 ? (
          <div className="space-y-20">
            {eraGroups.map((era) => {
              const eraWorks = worksByEra[era.key];
              if (eraWorks.length === 0) return null;

              return (
                <div key={era.key} className="animate-fade-in">
                  <div className="flex items-end mb-8 border-b border-white/10 pb-4">
                    <h2 className="text-3xl font-bold text-white font-mono mr-4">{era.title}</h2>
                    <span className="text-sm text-gray-500 font-mono mb-1.5 uppercase tracking-wider">{era.subtitle}</span>
                    <span className="ml-auto text-xs text-gray-600 font-mono border border-gray-800 px-2 py-1 rounded">{eraWorks.length} WORKS</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {eraWorks.map((work, index) => (
                      <div
                        key={work.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <WorkCard work={work} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-32 border border-dashed border-gray-800 rounded-xl">
            <div className="text-6xl mb-4 opacity-20">📭</div>
            <p className="text-xl text-gray-500 font-mono">
              NO MATCHING WORKS FOUND
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
