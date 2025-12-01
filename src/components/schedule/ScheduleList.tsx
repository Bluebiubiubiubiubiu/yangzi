import { Schedule } from '@/lib/types';

interface ScheduleListProps {
  schedules: Schedule[];
  selectedDate?: string;
}

export default function ScheduleList({ schedules, selectedDate }: ScheduleListProps) {
  const typeConfig = {
    variety: { label: '综艺录制', icon: '🎪', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
    brand: { label: '品牌活动', icon: '💼', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400' },
    filming: { label: '进组拍摄', icon: '🎬', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    event: { label: '活动出席', icon: '✨', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
    other: { label: '其他', icon: '📅', color: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400' },
  };

  const filteredSchedules = selectedDate
    ? schedules.filter((s) => s.date === selectedDate)
    : schedules;

  const sortedSchedules = [...filteredSchedules].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()],
    };
  };

  const isUpcoming = (dateStr: string) => {
    return new Date(dateStr) >= new Date(new Date().setHours(0, 0, 0, 0));
  };

  return (
    <div className="space-y-4">
      {selectedDate && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {(() => {
              const date = formatDate(selectedDate);
              return `${date.year}年${date.month}月${date.day}日 ${date.weekday}`;
            })()}
          </h3>
        </div>
      )}

      {sortedSchedules.length > 0 ? (
        sortedSchedules.map((schedule, index) => {
          const date = formatDate(schedule.date);
          const config = typeConfig[schedule.type];
          const upcoming = isUpcoming(schedule.date);

          return (
            <div
              key={schedule.id}
              className={`bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 shadow-md border transition-all duration-300 hover:shadow-xl ${
                upcoming
                  ? 'border-primary-300 dark:border-primary-700'
                  : 'border-gray-200 dark:border-gray-700'
              } animate-fade-in`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start space-x-4">
                {/* Date Badge */}
                <div className={`flex-shrink-0 w-16 md:w-20 text-center rounded-lg p-3 ${
                  upcoming
                    ? 'bg-gradient-to-br from-primary-500 to-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}>
                  <div className="text-2xl md:text-3xl font-bold">{date.day}</div>
                  <div className="text-xs">{date.month}月</div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
                      {config.icon} {config.label}
                    </span>
                    {upcoming && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        即将到来
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {schedule.title}
                  </h4>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <div className="flex items-center space-x-1">
                      <span>📍</span>
                      <span>{schedule.city}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>📅</span>
                      <span>{date.weekday}</span>
                    </div>
                  </div>

                  {schedule.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {schedule.description}
                    </p>
                  )}
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">📅</div>
          <p className="text-gray-600 dark:text-gray-400">
            {selectedDate ? '当日暂无行程' : '暂无行程记录'}
          </p>
        </div>
      )}
    </div>
  );
}

