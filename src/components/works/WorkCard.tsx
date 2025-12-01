import Link from 'next/link';
import { Work } from '@/lib/types';

interface WorkCardProps {
  work: Work;
}

export default function WorkCard({ work }: WorkCardProps) {
  const statusConfig = {
    aired: { label: '已播', color: 'text-neon-blue border-neon-blue', bg: 'bg-neon-blue/10' },
    upcoming: { label: '待播', color: 'text-neon-purple border-neon-purple', bg: 'bg-neon-purple/10' },
    filming: { label: '拍摄中', color: 'text-neon-pink border-neon-pink', bg: 'bg-neon-pink/10' },
    'pre-production': { label: '待拍', color: 'text-yellow-400 border-yellow-400', bg: 'bg-yellow-400/10' },
  };

  const typeConfig = {
    tv: { label: 'TV DRAMA', icon: '📺' },
    movie: { label: 'MOVIE', icon: '🎬' },
    variety: { label: 'VARIETY', icon: '🎪' },
    music: { label: 'MUSIC', icon: '🎵' },
    short: { label: 'SHORT', icon: '🎞️' },
  };

  const status = statusConfig[work.status];
  const type = typeConfig[work.type];

  return (
    <Link href={`/works/${work.id}`} className="block h-full">
      <div className="group relative h-full bg-black/40 border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-500">
        {/* Image Container */}
        <div className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-10" />
          
          {/* Glitch Effect Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 group-hover:filter group-hover:brightness-110"
            style={{ backgroundImage: `url(${work.poster})` }}
          />
          
          {/* Tech Overlay on Hover */}
          <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-0 group-hover:opacity-20 z-10 transition-opacity duration-300 bg-repeat bg-[length:20px_20px]" />

          {/* Status Badge */}
          <div className="absolute top-4 left-4 z-20">
            <div className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md ${status.color} ${status.bg}`}>
              {status.label}
            </div>
          </div>

          {/* Year Badge */}
          <div className="absolute top-4 right-4 z-20">
            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white font-mono text-xs font-bold">
              {work.year}
            </div>
          </div>

          {/* Hover Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/80 backdrop-blur-[2px] p-6 text-center">
            {work.rating && (
              <div className="flex flex-col items-center mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                <span className="text-4xl font-bold text-yellow-400 font-mono">{work.rating}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{(work.ratingSource === '豆瓣' ? 'DOUBAN' : work.ratingSource) || 'DOUBAN'} RATING</span>
              </div>
            )}
            
            {/* Stats Grid */}
            <div className="w-full space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                {work.viewCount && (
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-white font-mono break-words max-w-full px-2">{work.viewCount}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">PLAYBACK</span>
                  </div>
                )}
                {work.tvRating && (
                  <div className="flex flex-col items-center pt-2 border-t border-white/10">
                    <span className="text-xs font-bold text-neon-blue font-mono break-words max-w-full px-2">{work.tvRating}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">TV RATING</span>
                  </div>
                )}
            </div>
            
            <div className="mt-4 text-[10px] text-gray-500 space-y-1 font-mono transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                {work.releaseDate && <div>Released: {work.releaseDate}</div>}
                {work.filmingDate && <div>Filmed: {work.filmingDate}</div>}
            </div>

            <div className="mt-4 px-6 py-2 border border-white text-white text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-colors duration-300 transform translate-y-4 group-hover:translate-y-0 delay-200">
              VIEW DETAILS
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6 bg-gradient-to-b from-black/80 to-black border-t border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase flex items-center">
              <span className="mr-1">{type.icon}</span>
              {type.label}
            </span>
            {work.platform && (
              <span className="text-[10px] text-gray-500 uppercase tracking-wider border border-gray-800 px-2 py-0.5 rounded">
                {work.platform}
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-neon-purple transition-colors truncate font-mono tracking-tight">
            {work.title}
          </h3>
          
          {work.titleEn && (
            <p className="text-xs text-gray-500 mb-3 truncate font-mono opacity-70">
              {work.titleEn}
            </p>
          )}

          {work.role && (
            <div className="flex items-center space-x-2 pt-3 border-t border-white/5">
              <div className="w-1.5 h-1.5 bg-neon-purple rounded-full animate-pulse" />
              <span className="text-xs text-gray-400">Role:</span>
              <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                {work.role}
              </span>
            </div>
          )}

          {/* Bottom Active Line */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-purple via-neon-blue to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </div>
    </Link>
  );
}
