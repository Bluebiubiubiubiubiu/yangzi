interface News {
  id: string;
  date: string;
  content: string;
  type: string;
}

interface NewsTickerProps {
  news: News[];
}

export default function NewsTicker({ news }: NewsTickerProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'text-neon-purple border-neon-purple';
      case 'schedule': return 'text-neon-blue border-neon-blue';
      case 'brand': return 'text-neon-pink border-neon-pink';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <div className="flex items-end justify-between mb-8">
        <div className="relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
            LATEST NEWS
          </h2>
          <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-neon-purple to-transparent" />
        </div>
        <span className="text-gray-500 font-mono text-sm hidden md:block">
          /// UPDATES & EVENTS
        </span>
      </div>

      <div className="space-y-4">
        {news.map((item, index) => (
          <div
            key={item.id}
            className="group relative bg-black/40 border border-white/5 rounded-lg p-4 md:p-6 hover:bg-white/5 transition-all duration-300 overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Hover Glow Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-purple transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center space-x-6">
                <div className="hidden md:flex flex-col items-center justify-center w-16 h-16 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-xl font-bold text-white font-mono">
                    {item.date.split('-')[2]}
                  </span>
                  <span className="text-xs text-gray-500 uppercase">
                    {item.date.split('-')[1]}月
                  </span>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase border rounded tracking-wider ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                    <span className="text-sm text-gray-500 font-mono md:hidden">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-lg text-gray-200 group-hover:text-white group-hover:text-glow transition-all">
                    {item.content}
                  </p>
                </div>
              </div>

              <div className="transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <svg className="w-6 h-6 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
