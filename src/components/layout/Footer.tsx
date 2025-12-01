export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              关于本站
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              本站是杨紫粉丝自发建立的非官方个人档案网站，旨在记录和展示杨紫的演艺历程、商业成就与荣誉时刻。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              快速链接
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://weibo.com/u/1239246050"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  官方微博
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  工作室微博
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  官方后援会
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              法律声明
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              本站所有图片、视频等内容版权归原作者所有，仅作非商业分享使用。
              如有侵权，请联系我们删除。
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
              数据来源：云合数据、酷云EYE、豆瓣、微博等公开平台
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 杨紫星际档案. All rights reserved. 本站非官方网站。
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span>记录光芒，见证成长</span>
              <span className="text-primary-600">💜</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

