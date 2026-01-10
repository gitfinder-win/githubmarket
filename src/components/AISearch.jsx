import React, { useState } from 'react'

const AISearch = ({ onSearch, isSearching }) => {
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const suggestions = [
    { icon: '🤖', text: '推荐一些 AI 框架' },
    { icon: '💻', text: '适合初学者的 Web 开发项目' },
    { icon: '🔒', text: '开源安全工具' },
    { icon: '🎮', text: '游戏开发引擎' },
    { icon: '📊', text: '数据分析工具' },
    { icon: '⚡', text: '高性能服务器框架' },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(query)
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.text)
    onSearch(suggestion.text)
    setShowSuggestions(false)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          {/* AI 图标 */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center text-sm">
              🤖
            </div>
          </div>

          {/* 输入框 */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="输入需求，AI 为您推荐最合适的开源项目..."
            className="w-full pl-16 pr-36 py-4 bg-dark-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 focus:shadow-neon transition-all duration-300"
          />

          {/* 搜索按钮 */}
          <button
            type="submit"
            disabled={isSearching}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-medium rounded-xl hover:shadow-neon disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isSearching ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                搜索中
              </span>
            ) : (
              'AI 推荐'
            )}
          </button>
        </div>
      </form>

      {/* 搜索建议 */}
      {showSuggestions && !query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-dark-800/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-xl z-50 animate-fade-in">
          <div className="p-3 border-b border-gray-700/50">
            <div className="text-sm text-gray-400">热门搜索</div>
          </div>
          <div className="p-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-gray-300 hover:bg-dark-700/50 hover:text-white rounded-xl transition-all duration-200 group"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">{suggestion.icon}</span>
                <span className="text-sm">{suggestion.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* AI 提示 */}
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">
          由 AI 智能分析，基于项目热度、活跃度、商业价值等多维度推荐
        </p>
      </div>
    </div>
  )
}

export default AISearch
