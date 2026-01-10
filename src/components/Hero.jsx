import React from 'react'

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary-900/30 to-transparent py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* 标题 */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent animate-gradient">
              发现最优秀的开源项目
            </span>
          </h1>

          {/* 副标题 */}
          <p className="text-lg md:text-xl text-gray-400 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            实时追踪 GitHub 热门项目，AI 智能推荐，助您找到心仪的开源软件
          </p>

          {/* 特性标签 */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {[
              { label: '📊 每日更新', color: 'from-blue-500/20 to-blue-600/20' },
              { label: '🤖 AI 推荐', color: 'from-purple-500/20 to-purple-600/20' },
              { label: '💰 商业价值', color: 'from-green-500/20 to-green-600/20' },
              { label: '🌍 双链访问', color: 'from-orange-500/20 to-orange-600/20' },
              { label: '⚡ 实时榜单', color: 'from-red-500/20 to-red-600/20' },
            ].map((item, index) => (
              <span
                key={index}
                className={`px-4 py-2 rounded-full bg-gradient-to-r ${item.color} border border-gray-700/50 text-gray-300 text-sm backdrop-blur-sm`}
              >
                {item.label}
              </span>
            ))}
          </div>

          {/* 数据统计 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {[
              { value: '100K+', label: '收录项目', color: 'text-primary-400' },
              { value: '12+', label: '精选分类', color: 'text-accent-400' },
              { value: '6', label: '排行榜类型', color: 'text-green-400' },
              { value: '24h', label: '更新频率', color: 'text-orange-400' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-primary-500/30 transition-all duration-300 group"
              >
                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 装饰性元素 */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
      <div className="absolute top-32 right-20 w-3 h-3 bg-accent-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-10 left-1/4 w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 right-1/3 w-4 h-4 bg-accent-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
    </div>
  )
}

export default Hero
