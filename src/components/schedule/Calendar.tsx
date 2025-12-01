'use client';

import { useState } from 'react';
import { Schedule } from '@/lib/types';

interface CalendarProps {
  schedules: Schedule[];
  onDateClick: (date: string) => void;
}

export default function Calendar({ schedules, onDateClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const hasSchedule = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return schedules.some((s) => s.date === dateStr);
  };

  const getScheduleCount = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return schedules.filter((s) => s.date === dateStr).length;
  };

  const handleDayClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onDateClick(dateStr);
  };

  const days = [];
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  // Empty cells before first day
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const hasEvent = hasSchedule(day);
    const count = getScheduleCount(day);
    const isToday =
      day === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear();

    days.push(
      <button
        key={day}
        onClick={() => handleDayClick(day)}
        className={`aspect-square p-2 rounded-lg relative transition-all duration-200 ${
          isToday
            ? 'bg-primary-600 text-white font-bold'
            : hasEvent
            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-semibold hover:bg-primary-100 dark:hover:bg-primary-900/30'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        <span className="text-sm md:text-base">{day}</span>
        {hasEvent && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
            {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full ${
                  isToday ? 'bg-white' : 'bg-primary-600'
                }`}
              />
            ))}
          </div>
        )}
      </button>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
          {year}年{month + 1}月
        </h2>
        
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Next month"
        >
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary-600" />
          <span className="text-gray-600 dark:text-gray-400">有行程</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary-600 ring-2 ring-primary-300" />
          <span className="text-gray-600 dark:text-gray-400">今天</span>
        </div>
      </div>
    </div>
  );
}

