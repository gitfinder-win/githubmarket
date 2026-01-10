import React, { useState } from 'react'

const RepoCard = ({ repo, categoryIcon, index }) => {
  const [imageError, setImageError] = useState(false)

  const commercialValue = repo.commercialValue || Math.floor(Math.random() * 100)
  const difficulty = repo.difficulty || '中等'

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case '简单':
        return 'text-green-400 bg-green-400/10 border-green-400/20'
      case '中等':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case '困难':
        return 'text-red-400 bg-red-400/10 border-red-400/20'
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const getCommercialValueColor = (value) => {
    if (value >= 80) return 'text-green-400'
    if (value >= 60) return 'text-yellow-400'
    return 'text-orange-400'
  }

  return (
    <div
      className="group bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-primary-500/50 transition-all duration-300 hover:shadow-card hover:-translate-y-1 animate-slide-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* 头部信息 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-2xl">
            {categoryIcon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-lg mb-1 truncate group-hover:text-primary-400 transition-colors">
              {repo.name || repo.full_name}
            </h3>
            <p className="text-gray-400 text-sm truncate">
              {repo.owner?.login || repo.description?.substring(0, 50)}
            </p>
          </div>
        </div>
      </div>

      {/* 描述 */}
      <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
        {repo.description || '暂无描述'}
      </p>

      {/* 预览图 */}
      {!imageError && repo.previewUrl && (
        <div className="relative mb-4 rounded-xl overflow-hidden bg-dark-900/50 border border-gray-800/50 group-hover:border-primary-500/30 transition-all duration-300">
          <img
            src={repo.previewUrl}
            alt={repo.name}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
        </div>
      )}

      {/* 技术栈标签 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(repo.topics || repo.language ? [repo.language] : []).slice(0, 3).map((topic, i) => (
          topic && (
            <span
              key={i}
              className="px-2.5 py-1 bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs rounded-md"
            >
              {topic}
            </span>
          )
        ))}
      </div>

      {/* 统计数据 */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1.5 text-gray-400">
          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>{(repo.stargazers_count || 0).toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400">
          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
          <span>{(repo.forks_count || 0).toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400">
          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
          <span>{repo.open_issues_count || 0}</span>
        </div>
      </div>

      {/* 商业价值和难度 */}
      <div className="flex items-center justify-between mb-4 p-3 bg-dark-900/50 rounded-xl border border-gray-800/50">
        <div>
          <div className="text-gray-500 text-xs mb-1">商业价值</div>
          <div className={`text-lg font-bold ${getCommercialValueColor(commercialValue)}`}>
            {commercialValue}
            <span className="text-sm font-normal text-gray-400">/100</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-gray-500 text-xs mb-1">部署难度</div>
          <span className={`px-2.5 py-1 text-xs rounded-md font-medium ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
        </div>
      </div>

      {/* 访问链接 */}
      <div className="space-y-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-medium rounded-xl hover:shadow-neon transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          全球访问
        </a>
        {repo.mirrorUrls && repo.mirrorUrls.length > 0 && (
          <a
            href={repo.mirrorUrls[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-dark-700/50 text-gray-300 text-sm font-medium rounded-xl hover:bg-dark-700 border border-gray-700/50 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            国内镜像
          </a>
        )}
      </div>

      {/* 最后更新 */}
      <div className="mt-4 text-center text-xs text-gray-500">
        更新于 {repo.updated_at ? new Date(repo.updated_at).toLocaleDateString('zh-CN') : '未知'}
      </div>
    </div>
  )
}

export default RepoCard
