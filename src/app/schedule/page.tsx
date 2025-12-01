'use client';

import { useState } from 'react';
import Calendar from '@/components/schedule/Calendar';
import ScheduleList from '@/components/schedule/ScheduleList';
import { schedules } from '@/lib/data';

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const upcomingSchedules = schedules.filter(
    (s) => new Date(s.date) >= new Date(new Date().setHours(0, 0, 0, 0))
  );

  const pastSchedules = schedules.filter(
    (s) => new Date(s.date) < new Date(new Date().setHours(0, 0, 0, 0))
  );

  return (
    <div className="pt-24 md:pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            行程日历
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            过去与未来的活动轨迹，不错过每一个精彩时刻
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white">
            <div className="text-3xl font-bold mb-1">{upcomingSchedules.length}</div>
            <div className="text-sm opacity-90">待参加活动</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
            <div className="text-3xl font-bold mb-1">{pastSchedules.length}</div>
            <div className="text-sm opacity-90">历史记录</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
            <div className="text-3xl font-bold mb-1">
              {schedules.filter((s) => s.type === 'brand').length}
            </div>
            <div className="text-sm opacity-90">品牌活动</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-4 text-white">
            <div className="text-3xl font-bold mb-1">
              {schedules.filter((s) => s.type === 'variety').length}
            </div>
            <div className="text-sm opacity-90">综艺录制</div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {viewMode === 'calendar' ? '日历视图' : '列表视图'}
          </h2>
          <div className="flex space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => {
                setViewMode('calendar');
                setSelectedDate(undefined);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'calendar'
                  ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              📅 日历
            </button>
            <button
              onClick={() => {
                setViewMode('list');
                setSelectedDate(undefined);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              📋 列表
            </button>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'calendar' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Calendar schedules={schedules} onDateClick={setSelectedDate} />
            </div>
            <div className="lg:col-span-1">
              {selectedDate ? (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      当日行程
                    </h3>
                    <button
                      onClick={() => setSelectedDate(undefined)}
                      className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
                    >
                      清除选择
                    </button>
                  </div>
                  <ScheduleList schedules={schedules} selectedDate={selectedDate} />
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    即将到来
                  </h3>
                  <ScheduleList schedules={upcomingSchedules.slice(0, 3)} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {upcomingSchedules.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="mr-2">🔜</span>
                  即将到来
                </h3>
                <ScheduleList schedules={upcomingSchedules} />
              </div>
            )}

            {pastSchedules.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="mr-2">📚</span>
                  历史记录
                </h3>
                <ScheduleList schedules={pastSchedules} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

