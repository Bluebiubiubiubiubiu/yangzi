'use client';

import Link from 'next/link';
import { works } from '@/lib/data';

export default function AchievementsPage() {
  const airedWorks = works.filter((w) => w.status === 'aired' && w.viewCount);

  return (
    <div className="pt-24 md:pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/works"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>返回作品列表</span>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            实绩数据看板
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            基于权威数据平台的客观统计与分析
          </p>
        </div>

        {/* Data Source Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-8">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
                数据来源说明
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-400">
                所有数据来源于云合数据、酷云EYE、豆瓣、猫眼等公开平台，力求客观公正。
              </p>
            </div>
          </div>
        </div>

        {/* Achievement Cards */}
        <div className="space-y-8">
          {airedWorks.map((work, index) => (
            <div
              key={work.id}
              className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Work Header */}
              <div className="relative h-48 bg-gradient-to-r from-primary-600 to-purple-600">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-30"
                  style={{ backgroundImage: `url(${work.poster})` }}
                />
                <div className="relative h-full flex items-end p-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {work.title}
                    </h2>
                    <div className="flex items-center space-x-4 text-white/90">
                      <span>{work.year}</span>
                      <span>•</span>
                      <span>{work.platform}</span>
                      {work.role && (
                        <>
                          <span>•</span>
                          <span>饰演 {work.role}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  核心数据
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                  {/* View Count */}
                  {work.viewCount && (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        📺 播放量
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-primary-600">
                        {work.viewCount}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        数据来源：云合数据
                      </div>
                    </div>
                  )}

                  {/* Rating */}
                  {work.rating && (
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        ⭐ {work.ratingSource || '豆瓣'}评分
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-2xl md:text-3xl font-bold text-amber-600">
                          {work.rating}
                        </span>
                        <span className="text-lg text-amber-600 ml-1">/10</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        口碑评价
                      </div>
                    </div>
                  )}

                  {/* Peak Heat */}
                  {work.peakHeat && (
                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-4 border border-pink-100 dark:border-pink-800">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        🔥 热度峰值
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-pink-600">
                        {work.peakHeat}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        站内最高热度
                      </div>
                    </div>
                  )}

                  {/* TV Rating */}
                  {work.tvRating && (
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        📊 收视率
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-green-600">
                        {work.tvRating}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        电视台收视
                      </div>
                    </div>
                  )}

                  {/* Daily Champion */}
                  {work.dailyChampionCount && (
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        🏆 日冠次数
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-purple-600">
                        {work.dailyChampionCount}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        播放日冠
                      </div>
                    </div>
                  )}
                </div>

                {/* Chart Placeholder */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    📈 播出期间热度走势
                  </h4>
                  <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📊</div>
                      <p>热度趋势图表</p>
                      <p className="text-sm mt-1">（需接入数据可视化库如 Chart.js 或 Recharts）</p>
                    </div>
                  </div>
                </div>

                {/* Achievement Badges */}
                {work.peakHeat && work.peakHeat > 9000 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      🏅 成就徽章
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {work.peakHeat > 9500 && (
                        <span className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full text-sm font-medium shadow-lg">
                          🏆 年度剧王
                        </span>
                      )}
                      {work.viewCount && parseInt(work.viewCount) > 30 && (
                        <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-lg">
                          💎 播放破30亿
                        </span>
                      )}
                      {work.rating && work.rating >= 7.5 && (
                        <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-sm font-medium shadow-lg">
                          ⭐ 高口碑作品
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {airedWorks.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              暂无实绩数据
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

