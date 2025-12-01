'use client';

import { useState } from 'react';
import Link from 'next/link';
import WorkCard from '@/components/works/WorkCard';
import { works } from '@/lib/data';
import { WorkStatus, Work } from '@/lib/types';

export default function VarietyPage() {
  const [selectedStatus, setSelectedStatus] = useState<WorkStatus | 'all'>('all');

  // Only Variety Works
  const varietyWorks = works.filter(w => w.type === 'variety');

  const filteredWorks = varietyWorks.filter((work) => {
    const statusMatch = selectedStatus === 'all' || work.status === selectedStatus;
    return statusMatch;
  });

  // Group works by year for Variety
  // Since variety shows are often spanning years or specific to a year, grouping by year makes sense.
  // But to be consistent with Works page, let's use similar era grouping or just simple year grouping.
  // Given the number of variety shows (around 30+), grouping by era like in Works page is good.
  
  const eraGroups = [
    { key: '2020s', title: '2020-2025', subtitle: 'Recent & Upcoming', range: [2020, 2025] },
    { key: '2016s', title: '2016-2019', subtitle: 'Rising Popularity', range: [2016, 2019] },
    { key: '2012s', title: '2012-2015', subtitle: 'Early Variety Appearances', range: [2012, 2015] },
    { key: '2006s', title: '2006-2011', subtitle: 'Childhood & Transition', range: [2006, 2011] },
    { key: '2000s', title: '2000s', subtitle: 'Early Career', range: [0, 2005] },
  ];

  const worksByEra = eraGroups.reduce((acc, era) => {
    acc[era.key] = filteredWorks.filter(w => w.year >= era.range[0] && w.year <= era.range[1]);
    return acc;
  }, {} as Record<string, Work[]>);

  return (
    <div className="pt-24 md:pt-32 pb-16 bg-black min-h-screen">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-pink-900/20 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="w-8 h-[2px] bg-neon-pink" />
                <span className="text-neon-pink font-mono text-sm tracking-widest uppercase">Variety Shows</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                VARIETY<span className="text-neon-pink">.</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                展现真实自我，传递快乐与温暖。从常驻嘉宾到飞行惊喜，记录每一个欢笑时刻。
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'TOTAL SHOWS', value: varietyWorks.length, color: 'text-white' },
              { label: 'REGULAR', value: varietyWorks.filter(w => w.role?.includes('常驻')).length, color: 'text-neon-pink' },
              { label: 'GUEST', value: varietyWorks.filter(w => w.role?.includes('飞行') || w.role?.includes('嘉宾')).length, color: 'text-neon-blue' },
              { label: 'LATEST', value: varietyWorks[0]?.year || '-', color: 'text-yellow-400' },
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

        {/* Status Filter */}
        <div className="mb-12 flex flex-wrap gap-4">
            <button
                onClick={() => setSelectedStatus('all')}
                className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest transition-all duration-300 border ${
                selectedStatus === 'all'
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-gray-500 border-gray-800 hover:border-gray-600'
                }`}
            >
                ALL
            </button>
            {['aired', 'upcoming'].map((status) => (
                <button
                key={status}
                onClick={() => setSelectedStatus(status as WorkStatus)}
                className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 border ${
                    selectedStatus === status
                    ? 'bg-neon-pink/20 text-neon-pink border-neon-pink'
                    : 'bg-transparent text-gray-500 border-gray-800 hover:border-gray-600'
                }`}
                >
                {status}
                </button>
            ))}
        </div>

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
                    <span className="ml-auto text-xs text-gray-600 font-mono border border-gray-800 px-2 py-1 rounded">{eraWorks.length} SHOWS</span>
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
            <div className="text-6xl mb-4 opacity-20">🎪</div>
            <p className="text-xl text-gray-500 font-mono">
              NO MATCHING SHOWS FOUND
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

