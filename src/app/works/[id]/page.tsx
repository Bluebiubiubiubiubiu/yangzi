import { works } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function WorkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const work = works.find((w) => w.id === id);

  if (!work) {
    notFound();
  }

  const statusConfig = {
    aired: { label: '已播', color: 'bg-neon-blue', emoji: '🔵' },
    upcoming: { label: '待播', color: 'bg-neon-purple', emoji: '🟢' },
    filming: { label: '拍摄中', color: 'bg-neon-pink', emoji: '🟠' },
    'pre-production': { label: '待拍', color: 'bg-yellow-400', emoji: '🟣' },
  };

  const status = statusConfig[work.status];

  return (
    <div className="pt-0 pb-16 min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: `url(${work.poster})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-20 bg-repeat bg-[length:20px_20px]" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Link
              href="/works"
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors group"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-mono uppercase tracking-widest text-sm">Back to Works</span>
            </Link>
            
            <div className="flex items-center space-x-4 mb-6">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white ${status.color} bg-opacity-80 backdrop-blur-sm border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
                {status.label}
              </span>
              <span className="px-4 py-1.5 rounded-full text-xs font-bold font-mono text-white bg-white/10 backdrop-blur-sm border border-white/20">
                {work.year}
              </span>
              {work.platform && (
                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-gray-300 bg-black/40 backdrop-blur-sm border border-white/10">
                  {work.platform}
                </span>
              )}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 font-mono tracking-tight">
              {work.title}
            </h1>
            {work.titleEn && (
              <p className="text-xl md:text-2xl text-gray-400 mb-6 font-mono tracking-wider uppercase opacity-80">
                {work.titleEn}
              </p>
            )}
            {work.role && (
              <div className="flex items-center space-x-3 pt-6 border-t border-white/10 w-full md:w-1/2">
                <span className="text-sm text-gray-500 font-mono uppercase tracking-widest">Starring as</span>
                <span className="text-xl font-bold text-neon-purple font-mono">{work.role}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Info & Description */}
          <div className="lg:col-span-2 space-y-12">
            {/* Synopsis */}
            <section>
              <h2 className="flex items-center space-x-3 text-2xl font-bold text-white mb-6 font-mono uppercase tracking-widest">
                <span className="w-1 h-8 bg-neon-blue rounded-full shadow-[0_0_10px_#00f3ff]" />
                <span>Synopsis</span>
              </h2>
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {work.description || '暂无剧情简介'}
                </p>
              </div>
            </section>

            {/* Production Info Grid */}
            <section>
              <h2 className="flex items-center space-x-3 text-2xl font-bold text-white mb-6 font-mono uppercase tracking-widest">
                <span className="w-1 h-8 bg-neon-purple rounded-full shadow-[0_0_10px_#b026ff]" />
                <span>Production Info</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {work.releaseDate && (
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="text-sm text-gray-500 font-mono uppercase tracking-widest mb-2">Release Date</div>
                    <div className="text-white font-bold text-lg">{work.releaseDate}</div>
                  </div>
                )}
                {work.filmingDate && (
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="text-sm text-gray-500 font-mono uppercase tracking-widest mb-2">Filming Period</div>
                    <div className="text-white font-bold text-lg">{work.filmingDate}</div>
                  </div>
                )}
                {work.platform && (
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="text-sm text-gray-500 font-mono uppercase tracking-widest mb-2">Broadcast Platform</div>
                    <div className="text-white font-bold text-lg">{work.platform}</div>
                  </div>
                )}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="text-sm text-gray-500 font-mono uppercase tracking-widest mb-2">Genre</div>
                  <div className="text-white font-bold text-lg uppercase">{work.type}</div>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            {work.status === 'aired' && work.platform && (
              <div className="pt-4">
                <a
                  href="#"
                  className="inline-flex items-center px-8 py-4 bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue border border-neon-blue rounded-full font-bold tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,243,255,0.3)]"
                >
                  <span className="mr-2">▶</span>
                  Watch on {work.platform}
                </a>
              </div>
            )}
          </div>

          {/* Right Column - Stats & Performance */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {work.status === 'aired' && (work.rating || work.viewCount || work.peakHeat || work.dailyChampionCount) ? (
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink" />
                  
                  <h3 className="text-xl font-bold text-white mb-8 font-mono uppercase tracking-widest flex items-center">
                    <span className="text-2xl mr-2">📊</span> Performance
                  </h3>
                  
                  <div className="space-y-8">
                    {work.rating && (
                      <div className="relative group">
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-gray-400 text-sm font-mono uppercase tracking-widest">{work.ratingSource || 'DOUBAN'} RATING</span>
                          <span className="text-3xl font-bold text-yellow-400 font-mono drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]">{work.rating}</span>
                        </div>
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)] transition-all duration-1000" 
                            style={{ width: `${(work.rating / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {work.viewCount && (
                      <div className="relative group">
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-gray-400 text-sm font-mono uppercase tracking-widest">TOTAL VIEWS</span>
                        </div>
                        <div className="text-2xl font-bold text-neon-blue font-mono mb-1">{work.viewCount}</div>
                        <div className="text-[10px] text-gray-500 font-mono">ACROSS ALL PLATFORMS</div>
                      </div>
                    )}

                    {work.peakHeat && (
                      <div className="relative group">
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-gray-400 text-sm font-mono uppercase tracking-widest">PEAK HEAT</span>
                        </div>
                        <div className="text-2xl font-bold text-neon-pink font-mono mb-1">{work.peakHeat}</div>
                        <div className="text-[10px] text-gray-500 font-mono">HIGHEST POPULARITY INDEX</div>
                      </div>
                    )}

                    {work.tvRating && (
                      <div className="relative group pt-6 border-t border-white/5">
                         <div className="flex items-center mb-2">
                          <span className="text-gray-400 text-sm font-mono uppercase tracking-widest">TV RATING</span>
                        </div>
                        <p className="text-white font-medium leading-relaxed">
                          {work.tvRating}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                 <div className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center">
                    <div className="text-4xl mb-4">🎬</div>
                    <h3 className="text-white font-bold mb-2">Coming Soon</h3>
                    <p className="text-gray-400 text-sm">Performance data will be available after release.</p>
                 </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
