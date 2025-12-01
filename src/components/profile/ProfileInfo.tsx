import { awards } from '@/lib/data';
import AwardsTimeline from './AwardsTimeline';
import Image from 'next/image';

export default function ProfileInfo() {
  const info = {
    name: '杨紫',
    nameEn: 'Yang Zi',
    birthDate: '1992-11-06',
    birthPlace: '北京市',
    height: '167cm',
    education: '北京电影学院 表演系',
    agency: '个人',
    debut: '2002年',
    debutWork: '《儿女情更长》',
  };

  return (
    <div className="space-y-12">
      {/* Basic Info Card */}
      <div className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 border border-primary-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 p-1">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-800">
                <Image
                  src="/images/profile/avatar.jpg"
                  alt="杨紫"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center md:justify-start">
              {info.name}
              <span className="ml-3 px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm md:text-base rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200 align-middle">
                女频一
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {info.nameEn}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">出生日期</div>
                <div className="font-semibold text-gray-900 dark:text-white">{info.birthDate}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">出生地</div>
                <div className="font-semibold text-gray-900 dark:text-white">{info.birthPlace}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">身高</div>
                <div className="font-semibold text-gray-900 dark:text-white">{info.height}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">毕业院校</div>
                <div className="font-semibold text-gray-900 dark:text-white">{info.education}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">经纪公司</div>
                <div className="font-semibold text-gray-900 dark:text-white">{info.agency}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">出道时间</div>
                <div className="font-semibold text-gray-900 dark:text-white">{info.debut}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Awards Section (Formerly Career Journey) */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <span className="mr-2">🏆</span>
          荣誉奖项
        </h3>
        
        <AwardsTimeline awards={awards} />
      </div>
    </div>
  );
}

