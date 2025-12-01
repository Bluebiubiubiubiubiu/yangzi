import { Magazine } from '@/lib/types';

interface MagazineGridProps {
  magazines: Magazine[];
}

export default function MagazineGrid({ magazines }: MagazineGridProps) {
  const sortedMagazines = [...magazines].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      <div className="mb-8">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 text-white text-center">
          <div className="text-5xl font-bold mb-2">{magazines.length}</div>
          <div className="text-lg">封面总数</div>
        </div>
      </div>

      {/* Magazine Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedMagazines.map((magazine, index) => (
          <div
            key={magazine.id}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Cover Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
              <div
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url(${magazine.coverImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Info Overlay (on hover) */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white font-bold text-lg mb-1">
                  {magazine.name}
                </h3>
                <p className="text-white/90 text-sm mb-1">
                  {magazine.issue}
                </p>
                <p className="text-white/75 text-xs">
                  {magazine.date}
                </p>
                {magazine.sales && (
                  <div className="mt-2 inline-block px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-medium">
                    💎 销量：{magazine.sales}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Info (visible by default) */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/10 backdrop-blur-sm group-hover:opacity-0 transition-opacity duration-500">
              <p className="text-white text-sm font-semibold truncate">
                {magazine.name}
              </p>
              <p className="text-white/80 text-xs truncate">
                {magazine.issue}
              </p>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>

      {magazines.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📰</div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            暂无杂志封面记录
          </p>
        </div>
      )}
    </div>
  );
}

