import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import CategoryNav from './components/CategoryNav'
import RankTabs from './components/RankTabs'
import RepoGrid from './components/RepoGrid'
import AISearch from './components/AISearch'
import { dataService } from './services/dataService'
import { aiService } from './services/aiService'

function App() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentCategory, setCurrentCategory] = useState('all')
  const [currentPeriod, setCurrentPeriod] = useState('daily')
  const [sortBy, setSortBy] = useState('stars')
  const [searchResults, setSearchResults] = useState(null)
  const [isSearching, setIsSearching] = useState(false)

  // 分类配置
  const categories = [
    { id: 'all', name: '全部', icon: '🌟' },
    { id: 'os', name: '操作系统', icon: '💻' },
    { id: 'ai', name: 'AI/大模型', icon: '🤖' },
    { id: 'ml', name: '机器学习', icon: '🧠' },
    { id: 'web', name: 'Web开发', icon: '🌐' },
    { id: 'mobile', name: '移动开发', icon: '📱' },
    { id: 'devops', name: 'DevOps', icon: '⚙️' },
    { id: 'database', name: '数据库', icon: '🗄️' },
    { id: 'security', name: '安全', icon: '🔒' },
    { id: 'game', name: '游戏开发', icon: '🎮' },
    { id: 'tools', name: '开发工具', icon: '🛠️' },
    { id: 'other', name: '其他', icon: '📦' }
  ]

  // 排行榜周期
  const periods = [
    { id: 'daily', name: '日榜', label: '今日热门' },
    { id: 'weekly', name: '周榜', label: '本周热门' },
    { id: 'monthly', name: '月榜', label: '本月热门' },
    { id: 'yearly', name: '年榜', label: '年度热门' },
    { id: 'total', name: '总榜', label: '历史热门' },
    { id: 'trending', name: '趋势榜', label: '上升最快' }
  ]

  // 排序方式
  const sortOptions = [
    { id: 'stars', name: '热度排行' },
    { id: 'commercial', name: '商业价值' },
    { id: 'forks', name: 'Fork 数量' },
    { id: 'updated', name: '最近更新' }
  ]

  // 加载数据
  useEffect(() => {
    loadRepos()
  }, [currentCategory, currentPeriod, sortBy])

  const loadRepos = async () => {
    try {
      setLoading(true)
      let data = []

      if (searchResults) {
        data = searchResults
      } else {
        data = await dataService.getRepos({
          category: currentCategory,
          period: currentPeriod,
          sortBy
        })
      }

      setRepos(data)
    } catch (error) {
      console.error('加载数据失败:', error)
      // 使用模拟数据
      const mockData = dataService.getMockRepos(currentCategory)
      setRepos(mockData)
    } finally {
      setLoading(false)
    }
  }

  // AI 搜索
  const handleAISearch = async (query) => {
    if (!query.trim()) {
      setSearchResults(null)
      loadRepos()
      return
    }

    try {
      setIsSearching(true)
      const results = await aiService.searchRepos(query)
      setSearchResults(results)
      setRepos(results)
    } catch (error) {
      console.error('AI 搜索失败:', error)
      // 回退到普通搜索
      const results = await dataService.searchRepos(query)
      setSearchResults(results)
      setRepos(results)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* 背景粒子效果 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-dark-900/50 to-dark-900" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10">
        <Header />

        <Hero />

        <div className="container mx-auto px-4 py-8">
          {/* AI 搜索 */}
          <div className="mb-8">
            <AISearch
              onSearch={handleAISearch}
              isSearching={isSearching}
            />
          </div>

          {/* 分类导航 */}
          <CategoryNav
            categories={categories}
            currentCategory={currentCategory}
            onSelect={setCurrentCategory}
          />

          {/* 排行榜选项 */}
          <RankTabs
            periods={periods}
            currentPeriod={currentPeriod}
            sortOptions={sortOptions}
            sortBy={sortBy}
            onPeriodChange={setCurrentPeriod}
            onSortChange={setSortBy}
          />

          {/* 仓库列表 */}
          <RepoGrid
            repos={repos}
            loading={loading}
            categories={categories}
          />
        </div>

        {/* 页脚 */}
        <footer className="mt-20 border-t border-gray-800 bg-dark-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">⚡</span> GitHub Market
                </h3>
                <p className="text-gray-400 text-sm">
                  专业的开源软件发现与推荐平台，每日更新，智能推荐
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">功能特性</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>📊 多维度排行榜</li>
                  <li>🤖 AI 智能搜索</li>
                  <li>💰 商业价值评分</li>
                  <li>🌍 全球/国内双链</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">数据来源</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>GitHub Trending</li>
                  <li>GitHub Rank Action</li>
                  <li>GitStar Ranking</li>
                  <li>自动每日更新</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">关于</h4>
                <p className="text-gray-400 text-sm mb-2">
                  本项目基于 GitHub Actions 实现自动更新，为您提供最新、最全的开源软件信息。
                </p>
                <p className="text-gray-500 text-xs">
                  数据每日自动更新 | 由 AI 辅助维护
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
              <p>© 2024 GitHub Market. Powered by GitHub API & AI Technology</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
