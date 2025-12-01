'use client';

import { useState } from 'react';
import { interviews } from '@/lib/interviews';

export default function InterviewsPage() {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'magazine' | 'interview'>('magazine');
  
  // Filter by type first
  const typeFilteredInterviews = interviews.filter(item => item.type === activeTab);

  // Get unique years from the type-filtered list and sort descending
  const years = Array.from(new Set(typeFilteredInterviews.map(item => item.year))).sort((a, b) => b.localeCompare(a));

  // Then filter by year
  const displayedItems = selectedYear === 'all' 
    ? typeFilteredInterviews 
    : typeFilteredInterviews.filter(item => item.year === selectedYear);

  return (
    <div className="pt-24 md:pt-32 pb-16 bg-black min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center space-x-2 mb-4">
            <span className="w-8 h-[2px] bg-neon-purple" />
            <span className="text-neon-purple font-mono text-sm tracking-widest uppercase">
              {activeTab === 'magazine' ? 'COVERS & EDITORIALS' : 'INTERVIEWS & TALKS'}
            </span>
            <span className="w-8 h-[2px] bg-neon-purple" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            {activeTab === 'magazine' ? 'MAGAZINE' : 'INTERVIEW'}
            <span className="text-neon-purple">.</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            {activeTab === 'magazine' 
              ? '定格光影瞬间，展现多面魅力。记录每一次时尚突破与风格探索。' 
              : '倾听真诚对话，见证成长思考。收录深度专访与现场精彩时刻。'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="glass-card p-1 rounded-none border border-white/10 inline-flex">
            <button
              onClick={() => {
                setActiveTab('magazine');
                setSelectedYear('all');
              }}
              className={`px-8 py-3 text-sm font-mono font-bold tracking-wider transition-all duration-300 ${
                activeTab === 'magazine'
                  ? 'bg-neon-purple text-black'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              MAGAZINE
            </button>
            <button
              onClick={() => {
                setActiveTab('interview');
                setSelectedYear('all');
              }}
              className={`px-8 py-3 text-sm font-mono font-bold tracking-wider transition-all duration-300 ${
                activeTab === 'interview'
                  ? 'bg-neon-purple text-black'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              INTERVIEW
            </button>
          </div>
        </div>

        {/* Year Filter */}
        {years.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-16 sticky top-24 z-20 py-4 -mx-4 px-4 glass-nav border-t-0 border-x-0">
            <button
              onClick={() => setSelectedYear('all')}
              className={`px-4 py-2 text-xs font-mono transition-all duration-300 border ${
                selectedYear === 'all'
                  ? 'border-neon-purple text-neon-purple bg-neon-purple/10'
                  : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
              }`}
            >
              ALL YEARS
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 text-xs font-mono transition-all duration-300 border ${
                  selectedYear === year
                    ? 'border-neon-purple text-neon-purple bg-neon-purple/10'
                    : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        )}

        {/* Timeline */}
        <div className="space-y-20">
          {years.filter(year => selectedYear === 'all' || selectedYear === year).map(year => {
            const yearItems = displayedItems.filter(item => item.year === year);
            if (yearItems.length === 0) return null;

            return (
              <div key={year} className="relative animate-fade-in">
                {/* Year Header */}
                <div className="flex items-center mb-10">
                  <div className="text-6xl font-black text-white/10 font-mono absolute -left-8 -top-6 select-none pointer-events-none">
                    {year}
                  </div>
                  <div className="text-3xl font-bold text-white font-mono pl-2 relative z-10 border-l-4 border-neon-purple ml-2">
                    {year}
                  </div>
                  <div className="flex-grow h-[1px] bg-gradient-to-r from-white/10 to-transparent ml-6"></div>
                </div>

                {/* Items */}
                <div className="grid gap-6">
                  {yearItems.map((item, index) => (
                    <div 
                      key={item.id}
                      className="glass-card p-6 md:p-8 hover:border-neon-purple/50 transition-all duration-300 group relative overflow-hidden"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-4xl">{activeTab === 'magazine' ? '📰' : '🎤'}</span>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
                        {/* Date */}
                        <div className="flex-shrink-0 md:w-32 pt-1">
                          <div className="text-xs font-mono text-neon-purple/80 border border-neon-purple/30 px-3 py-1 inline-block bg-neon-purple/5">
                            {item.date}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-white mb-4 group-hover:text-neon-purple transition-colors leading-tight">
                            {item.source}
                          </h3>
                          <div className="space-y-3">
                            {item.content.map((line, i) => (
                              <div key={i} className="flex items-start group/line">
                                <span className="mr-3 mt-2 w-1 h-1 bg-gray-600 rounded-full flex-shrink-0 group-hover/line:bg-neon-blue transition-colors"></span>
                                <p className="text-gray-400 group-hover/line:text-gray-200 transition-colors leading-relaxed">
                                  {line}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {displayedItems.length === 0 && (
          <div className="text-center py-32 border border-dashed border-gray-800 rounded-xl">
            <div className="text-6xl mb-6 opacity-20">
              {activeTab === 'magazine' ? '📰' : '🎤'}
            </div>
            <p className="text-xl text-gray-500 font-mono">
              NO RECORDS FOUND
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
