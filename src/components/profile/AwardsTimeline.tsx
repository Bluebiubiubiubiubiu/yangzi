import { Award } from '@/lib/types';

interface AwardsTimelineProps {
  awards: Award[];
}

export default function AwardsTimeline({ awards }: AwardsTimelineProps) {
  const typeConfig = {
    film: { label: '影视类', icon: '🎬', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
    music: { label: '音乐类', icon: '🎵', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400' },
    commercial: { label: '商业类', icon: '💼', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    official: { label: '官方认可', icon: '🏛️', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  };

  const sortedAwards = [...awards].sort((a, b) => b.year - a.year);

  const groupedByYear = sortedAwards.reduce((acc, award) => {
    if (!acc[award.year]) {
      acc[award.year] = [];
    }
    acc[award.year].push(award);
    return acc;
  }, {} as Record<number, Award[]>);

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl p-4 text-white text-center">
          <div className="text-3xl font-bold mb-1">{awards.length}</div>
          <div className="text-sm opacity-90">总获奖数</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white text-center">
          <div className="text-3xl font-bold mb-1">
            {awards.filter((a) => a.type === 'film').length}
          </div>
          <div className="text-sm opacity-90">影视奖项</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white text-center">
          <div className="text-3xl font-bold mb-1">
            {awards.filter((a) => a.type === 'commercial').length}
          </div>
          <div className="text-sm opacity-90">商业价值</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-purple-500 to-pink-500" />

        {/* Awards by Year */}
        <div className="space-y-12">
          {Object.entries(groupedByYear)
            .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
            .map(([year, yearAwards], yearIndex) => (
            <div key={year} className="relative">
              {/* Year Badge */}
              <div className="flex items-center mb-6">
                <div className="relative z-10 flex items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg md:text-xl">{year}</span>
                  </div>
                  <div className="ml-4 md:hidden">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {year}年
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {yearAwards.length} 个奖项
                    </p>
                  </div>
                </div>
                <div className="hidden md:block md:absolute md:left-1/2 md:ml-12">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {year}年
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {yearAwards.length} 个奖项
                  </p>
                </div>
              </div>

              {/* Awards Grid */}
              <div className="ml-20 md:ml-0 md:grid md:grid-cols-2 md:gap-8">
                {yearAwards.map((award, index) => {
                  const config = typeConfig[award.type];
                  const isLeft = index % 2 === 0;
                  
                  return (
                    <div
                      key={award.id}
                      className={`mb-6 md:mb-8 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:col-start-2'}`}
                    >
                      <div
                        className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 animate-fade-in"
                        style={{ animationDelay: `${(yearIndex * yearAwards.length + index) * 50}ms` }}
                      >
                        {/* Type Badge */}
                        <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium mb-3 ${config.color}`}>
                          <span>{config.icon}</span>
                          <span>{config.label}</span>
                        </div>

                        {/* Award Name */}
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {award.name}
                        </h4>

                        {/* Ceremony */}
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          {award.ceremony}
                        </p>

                        {/* Work */}
                        {award.work && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <span>🎬</span>
                            <span>《{award.work}》</span>
                          </div>
                        )}

                        {/* Decorative Element */}
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
                            <span className="text-2xl">🏆</span>
                            <span className="text-sm font-semibold">{award.category}</span>
                            {award.status && (
                              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                award.status === 'winner' 
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' 
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                              }`}>
                                {award.status === 'winner' ? '获奖' : '提名'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Connector Dot (hidden on mobile) */}
                      <div className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-gray-950 shadow-lg`}
                        style={{ top: `${(index + 1) * 200}px` }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

