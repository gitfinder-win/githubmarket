import React, { useState, useEffect } from 'react'
import RepoCard from './RepoCard'

const RepoGrid = ({ repos, loading, categories }) => {
  const [visibleRepos, setVisibleRepos] = useState([])
  const [page, setPage] = useState(1)
  const pageSize = 12

  // 懒加载效果
  useEffect(() => {
    if (loading) {
      setVisibleRepos([])
      setPage(1)
      return
    }

    const endIndex = page * pageSize
    setVisibleRepos(repos.slice(0, endIndex))
  }, [repos, page, loading])

  const loadMore = () => {
    setPage((prev) => prev + 1)
  }

  const getCategoryIcon = (category) => {
    const cat = categories.find((c) => c.id === category)
    return cat ? cat.icon : '📦'
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-dark-800/50 border border-gray-800/50 rounded-2xl p-6 animate-pulse"
          >
            <div className="h-6 bg-gray-700/50 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-700/50 rounded w-full mb-3" />
            <div className="h-4 bg-gray-700/50 rounded w-2/3 mb-6" />
            <div className="h-20 bg-gray-700/50 rounded mb-4" />
            <div className="flex gap-4">
              <div className="h-8 bg-gray-700/50 rounded flex-1" />
              <div className="h-8 bg-gray-700/50 rounded flex-1" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (repos.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-400 mb-2">暂无数据</h3>
        <p className="text-gray-500">请尝试切换分类或搜索其他关键词</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleRepos.map((repo, index) => (
          <RepoCard
            key={repo.id || index}
            repo={repo}
            categoryIcon={getCategoryIcon(repo.category)}
            index={index}
          />
        ))}
      </div>

      {visibleRepos.length < repos.length && (
        <div className="text-center mt-12">
          <button
            onClick={loadMore}
            className="px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium rounded-xl hover:shadow-neon transition-all duration-300"
          >
            加载更多
          </button>
        </div>
      )}
    </div>
  )
}

export default RepoGrid
