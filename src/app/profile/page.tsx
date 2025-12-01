'use client';

import ProfileInfo from '@/components/profile/ProfileInfo';

export default function ProfilePage() {
  return (
    <div className="pt-24 md:pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            荣誉与资料
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            完整记录个人信息与荣誉时刻
          </p>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          <ProfileInfo />
        </div>
      </div>
    </div>
  );
}

