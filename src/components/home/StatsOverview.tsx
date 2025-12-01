'use client';

import { useEffect, useRef, useState } from 'react';
import { Stats } from '@/lib/types';

interface StatsOverviewProps {
  stats: Stats;
}

function AnimatedNumber({ value }: { value: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {value}
    </div>
  );
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  const statsData = [
    {
      label: '全网粉丝',
      value: stats.totalFans,
      icon: '👥',
      color: 'text-neon-purple',
      bg: 'from-purple-500/20 to-blue-500/5',
    },
    {
      label: '作品总数',
      value: stats.totalWorks.toString(),
      icon: '🎬',
      color: 'text-neon-blue',
      bg: 'from-blue-500/20 to-purple-500/5',
    },
    {
      label: '代言品牌',
      value: stats.totalBrands.toString(),
      icon: '💼',
      color: 'text-neon-pink',
      bg: 'from-pink-500/20 to-red-500/5',
    },
    {
      label: '荣誉奖项',
      value: stats.totalAwards.toString(),
      icon: '🏆',
      color: 'text-yellow-400',
      bg: 'from-yellow-500/20 to-orange-500/5',
    },
  ];

  return (
    <div className="relative -mt-24 z-30 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statsData.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl glass-card p-6 hover-glow"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl md:text-4xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    {stat.icon}
                  </span>
                </div>
                <div className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-2 font-mono tracking-tighter ${stat.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
                  <AnimatedNumber value={stat.value} />
                </div>
                <div className="text-sm md:text-base text-gray-400 font-medium tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>

              {/* Border Flow Animation */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
