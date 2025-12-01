import { Brand } from '@/lib/types';

interface BrandWallProps {
  brands: Brand[];
}

export default function BrandWall({ brands }: BrandWallProps) {
  const categories = [
    { id: 'luxury', title: '高奢品牌', icon: '💎', color: 'from-amber-500 to-yellow-500' },
    { id: 'beauty', title: '美妆护肤类', icon: '💄', color: 'from-pink-500 to-rose-500' },
    { id: 'food', title: '食品饮料类', icon: '🥤', color: 'from-green-500 to-emerald-500' },
    { id: 'fashion', title: '服饰穿戴类', icon: '👗', color: 'from-purple-500 to-indigo-500' },
    { id: 'auto', title: '汽车类', icon: '🚗', color: 'from-blue-500 to-cyan-500' },
    { id: 'lifestyle', title: '生活服务类', icon: '🏠', color: 'from-orange-500 to-red-500' },
  ];

  const activeBrands = brands.filter((b) => b.status === 'active');
  const pastBrands = brands.filter((b) => b.status === 'past');

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold mb-1">{activeBrands.length}</div>
          <div className="text-sm opacity-90">在约品牌</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold mb-1">
            {categories.length}
          </div>
          <div className="text-sm opacity-90">覆盖领域</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold mb-1">{brands.length}</div>
          <div className="text-sm opacity-90">合作总数</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold mb-1">{pastBrands.length}</div>
          <div className="text-sm opacity-90">历史合作</div>
        </div>
      </div>

      {/* Active Brands by Category */}
      {categories.map((category, catIndex) => {
        const categoryBrands = activeBrands.filter(b => b.category === category.id);
        if (categoryBrands.length === 0) return null;

        return (
          <div key={category.id} className="mb-12 animate-fade-in" style={{ animationDelay: `${catIndex * 100}ms` }}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center border-b pb-2 border-gray-200 dark:border-gray-800">
              <span className="mr-3 text-3xl">{category.icon}</span>
              {category.title}
              <span className="ml-3 text-sm font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                {categoryBrands.length}
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryBrands.map((brand, index) => (
                <div
                  key={brand.id}
                  className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800"
                >
                  {/* Brand Image Area */}
                  <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${category.color} opacity-90`}>
                    {/* We use a gradient background if no specific image, or overlay if image exists */}
                     <div
                      className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40 group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url(${brand.image})` }}
                    />
                    
                    {/* Logo Centered */}
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="bg-white p-4 rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                         {/* If logo is placeholder, maybe show text? Assuming logo exists */}
                         <div
                          className="w-32 h-16 bg-contain bg-center bg-no-repeat"
                          style={{ backgroundImage: `url(${brand.logo})` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {brand.name}
                        </h3>
                        {brand.nameEn && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {brand.nameEn}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                       <div className={`inline-block px-3 py-1 rounded-lg text-sm font-medium bg-gradient-to-r ${category.color} text-white shadow-md`}>
                        {brand.title}
                      </div>
                      {brand.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex items-start">
                          <span className="mr-1 opacity-70">ℹ️</span>
                          {brand.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Decorative Line */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${category.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Past Brands */}
      {pastBrands.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="mr-2">📚</span>
            历史合作
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pastBrands.map((brand, index) => (
              <div
                key={brand.id}
                className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300"
              >
                <div
                  className="w-full h-24 bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${brand.logo})` }}
                />
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                  {brand.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {brand.startDate ? `${brand.startDate} - ` : ''}{brand.endDate || '未知'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
