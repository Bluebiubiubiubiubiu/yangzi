import Link from 'next/link';

interface Highlight {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface HighlightsProps {
  highlights: Highlight[];
}

export default function Highlights({ highlights }: HighlightsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 mb-20">
      <div className="flex items-end justify-between mb-12">
        <div className="relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
            HIGHLIGHTS
          </h2>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-transparent" />
        </div>
        <Link href="/works" className="hidden md:flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group">
          <span className="text-sm tracking-widest uppercase">View All</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {highlights.map((highlight, index) => (
          <Link
            key={highlight.id}
            href={highlight.link}
            className="group relative h-[400px] w-full perspective-1000"
          >
            <div className="relative w-full h-full transition-all duration-500 transform-style-3d group-hover:rotate-y-12">
              {/* Image Layer */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group-hover:shadow-neon-purple/50 transition-shadow duration-500">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${highlight.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              </div>

              {/* Content Layer */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-z-20">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl font-bold text-white mb-3 font-mono tracking-tighter group-hover:text-glow">
                    {highlight.title}
                  </h3>
                  <div className="h-[1px] w-12 bg-neon-purple mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {highlight.description}
                  </p>
                </div>
              </div>

              {/* Decorative Corners */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-neon-purple/50 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-neon-purple/50 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
