import axios from 'axios'

const GITHUB_API_BASE = 'https://api.github.com'
const MIRROR_SITES = [
  'https://bgithub.xyz',
  'https://gitclone.com',
]

// 模拟数据
const MOCK_REPOS = {
  all: [
    {
      id: 1,
      name: 'React',
      full_name: 'facebook/react',
      owner: { login: 'facebook' },
      description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
      language: 'JavaScript',
      stargazers_count: 220000,
      forks_count: 45000,
      open_issues_count: 1200,
      topics: ['frontend', 'javascript', 'ui', 'library'],
      html_url: 'https://github.com/facebook/react',
      previewUrl: 'https://raw.githubusercontent.com/facebook/react/main/README.png',
      updated_at: new Date().toISOString(),
      category: 'web',
      commercialValue: 95,
      difficulty: '中等',
      mirrorUrls: ['https://bgithub.xyz/facebook/react']
    },
    {
      id: 2,
      name: 'Next.js',
      full_name: 'vercel/next.js',
      owner: { login: 'vercel' },
      description: 'The React Framework for production. Next.js gives you the best developer experience.',
      language: 'TypeScript',
      stargazers_count: 125000,
      forks_count: 25000,
      open_issues_count: 800,
      topics: ['react', 'framework', 'ssr', 'web'],
      html_url: 'https://github.com/vercel/next.js',
      previewUrl: 'https://raw.githubusercontent.com/vercel/next.js/canary/public/twitter-card.png',
      updated_at: new Date().toISOString(),
      category: 'web',
      commercialValue: 92,
      difficulty: '中等',
      mirrorUrls: ['https://bgithub.xyz/vercel/next.js']
    },
    {
      id: 3,
      name: 'TensorFlow',
      full_name: 'tensorflow/tensorflow',
      owner: { login: 'tensorflow' },
      description: 'An Open Source Machine Learning Framework for Everyone.',
      language: 'Python',
      stargazers_count: 185000,
      forks_count: 88000,
      open_issues_count: 2000,
      topics: ['ai', 'ml', 'deep-learning', 'python'],
      html_url: 'https://github.com/tensorflow/tensorflow',
      previewUrl: 'https://www.gstatic.com/devrel-devsite/prod/v1c254d35d7653dc902a6f746404016d9b8e9f2898045370d68f6b6470360468/tensorflow/images/lockup.svg',
      updated_at: new Date().toISOString(),
      category: 'ai',
      commercialValue: 98,
      difficulty: '困难',
      mirrorUrls: ['https://bgithub.xyz/tensorflow/tensorflow']
    },
    {
      id: 4,
      name: 'PyTorch',
      full_name: 'pytorch/pytorch',
      owner: { login: 'pytorch' },
      description: 'Tensors and Dynamic neural networks in Python with strong GPU acceleration.',
      language: 'Python',
      stargazers_count: 75000,
      forks_count: 20000,
      open_issues_count: 3000,
      topics: ['ai', 'ml', 'deep-learning', 'python'],
      html_url: 'https://github.com/pytorch/pytorch',
      previewUrl: 'https://pytorch.org/assets/images/pytorch-logo.png',
      updated_at: new Date().toISOString(),
      category: 'ai',
      commercialValue: 96,
      difficulty: '困难',
      mirrorUrls: ['https://bgithub.xyz/pytorch/pytorch']
    },
    {
      id: 5,
      name: 'Linux',
      full_name: 'torvalds/linux',
      owner: { login: 'torvalds' },
      description: 'Linux kernel source tree.',
      language: 'C',
      stargazers_count: 170000,
      forks_count: 52000,
      open_issues_count: 500,
      topics: ['os', 'kernel', 'linux', 'c'],
      html_url: 'https://github.com/torvalds/linux',
      previewUrl: 'https://raw.githubusercontent.com/torvalds/linux/master/Documentation/logo.gif',
      updated_at: new Date().toISOString(),
      category: 'os',
      commercialValue: 90,
      difficulty: '困难',
      mirrorUrls: ['https://bgithub.xyz/torvalds/linux']
    },
    {
      id: 6,
      name: 'VS Code',
      full_name: 'microsoft/vscode',
      owner: { login: 'microsoft' },
      description: 'Visual Studio Code - Open Source ("Code - OSS")',
      language: 'TypeScript',
      stargazers_count: 160000,
      forks_count: 28000,
      open_issues_count: 4000,
      topics: ['editor', 'ide', 'vscode', 'tools'],
      html_url: 'https://github.com/microsoft/vscode',
      previewUrl: 'https://code.visualstudio.com/assets/favicon.png',
      updated_at: new Date().toISOString(),
      category: 'tools',
      commercialValue: 94,
      difficulty: '中等',
      mirrorUrls: ['https://bgithub.xyz/microsoft/vscode']
    },
    {
      id: 7,
      name: 'Vue.js',
      full_name: 'vuejs/core',
      owner: { login: 'vuejs' },
      description: 'Vue.js - The Progressive JavaScript Framework',
      language: 'TypeScript',
      stargazers_count: 45000,
      forks_count: 7500,
      open_issues_count: 600,
      topics: ['vue', 'framework', 'frontend', 'javascript'],
      html_url: 'https://github.com/vuejs/core',
      previewUrl: 'https://vuejs.org/images/logo.png',
      updated_at: new Date().toISOString(),
      category: 'web',
      commercialValue: 88,
      difficulty: '简单',
      mirrorUrls: ['https://bgithub.xyz/vuejs/core']
    },
    {
      id: 8,
      name: 'Kubernetes',
      full_name: 'kubernetes/kubernetes',
      owner: { login: 'kubernetes' },
      description: 'Production-Grade Container Orchestration',
      language: 'Go',
      stargazers_count: 110000,
      forks_count: 38000,
      open_issues_count: 1500,
      topics: ['kubernetes', 'container', 'orchestration', 'devops'],
      html_url: 'https://github.com/kubernetes/kubernetes',
      previewUrl: 'https://raw.githubusercontent.com/kubernetes/kubernetes/master/logo/logo.png',
      updated_at: new Date().toISOString(),
      category: 'devops',
      commercialValue: 97,
      difficulty: '困难',
      mirrorUrls: ['https://bgithub.xyz/kubernetes/kubernetes']
    },
    {
      id: 9,
      name: 'Docker',
      full_name: 'docker/docker-ce',
      owner: { login: 'docker' },
      description: 'Docker - the open-source application container engine.',
      language: 'Go',
      stargazers_count: 38000,
      forks_count: 11000,
      open_issues_count: 2500,
      topics: ['docker', 'container', 'devops', 'tools'],
      html_url: 'https://github.com/docker/docker-ce',
      previewUrl: 'https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png',
      updated_at: new Date().toISOString(),
      category: 'devops',
      commercialValue: 91,
      difficulty: '中等',
      mirrorUrls: ['https://bgithub.xyz/docker/docker-ce']
    },
    {
      id: 10,
      name: 'Node.js',
      full_name: 'nodejs/node',
      owner: { login: 'nodejs' },
      description: 'Node.js JavaScript runtime built on Chrome V8 engine.',
      language: 'JavaScript',
      stargazers_count: 105000,
      forks_count: 29000,
      open_issues_count: 800,
      topics: ['nodejs', 'javascript', 'runtime', 'backend'],
      html_url: 'https://github.com/nodejs/node',
      previewUrl: 'https://nodejs.org/static/images/logo.svg',
      updated_at: new Date().toISOString(),
      category: 'web',
      commercialValue: 93,
      difficulty: '中等',
      mirrorUrls: ['https://bgithub.xyz/nodejs/node']
    },
    {
      id: 11,
      name: 'MongoDB',
      full_name: 'mongodb/mongo',
      owner: { login: 'mongodb' },
      description: 'The MongoDB Database',
      language: 'C++',
      stargazers_count: 28000,
      forks_count: 5600,
      open_issues_count: 3500,
      topics: ['database', 'mongodb', 'nosql', 'backend'],
      html_url: 'https://github.com/mongodb/mongo',
      previewUrl: 'https://www.mongodb.com/assets/images/logo/MongoDB_Logo_FullColor_Black_RGB.svg',
      updated_at: new Date().toISOString(),
      category: 'database',
      commercialValue: 89,
      difficulty: '中等',
      mirrorUrls: ['https://bgithub.xyz/mongodb/mongo']
    },
    {
      id: 12,
      name: 'Home Assistant',
      full_name: 'home-assistant/core',
      owner: { login: 'home-assistant' },
      description: 'Open source home automation that puts local control and privacy first.',
      language: 'Python',
      stargazers_count: 70000,
      forks_count: 28000,
      open_issues_count: 4500,
      topics: ['home-automation', 'iot', 'smart-home', 'python'],
      html_url: 'https://github.com/home-assistant/core',
      previewUrl: 'https://www.home-assistant.io/images/home-assistant-logo.svg',
      updated_at: new Date().toISOString(),
      category: 'other',
      commercialValue: 85,
      difficulty: '中等',
      mirrorUrls: ['https://bgithub.xyz/home-assistant/core']
    }
  ]
}

class DataService {
  constructor() {
    this.cache = new Map()
    this.cacheTimeout = 5 * 60 * 1000 // 5分钟缓存
  }

  // 获取仓库数据
  async getRepos({ category, period, sortBy }) {
    const cacheKey = `${category}-${period}-${sortBy}`

    // 检查缓存
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data
      }
    }

    try {
      // 尝试从 GitHub API 获取数据
      const data = await this.fetchFromGitHub(category, period, sortBy)
      this.cache.set(cacheKey, { data, timestamp: Date.now() })
      return data
    } catch (error) {
      console.error('从 GitHub 获取数据失败，使用模拟数据:', error)
      // 回退到模拟数据
      const mockData = this.getMockRepos(category)
      this.cache.set(cacheKey, { data: mockData, timestamp: Date.now() })
      return mockData
    }
  }

  // 从 GitHub API 获取数据
  async fetchFromGitHub(category, period, sortBy) {
    let url = `${GITHUB_API_BASE}/search/repositories?q=stars:>1000&sort=stars&order=desc&per_page=50`

    if (category !== 'all') {
      url += `+topic:${category}`
    }

    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      }
    })

    const repos = response.data.items.map(repo => ({
      ...repo,
      commercialValue: this.calculateCommercialValue(repo),
      difficulty: this.calculateDifficulty(repo),
      mirrorUrls: this.generateMirrorUrls(repo.html_url),
      previewUrl: this.generatePreviewUrl(repo)
    }))

    return this.sortRepos(repos, sortBy)
  }

  // 计算商业价值
  calculateCommercialValue(repo) {
    const stars = repo.stargazers_count || 0
    const forks = repo.forks_count || 0
    const watchers = repo.watchers_count || 0
    const openIssues = repo.open_issues_count || 0

    let score = 50

    // 星数权重
    if (stars > 100000) score += 30
    else if (stars > 50000) score += 25
    else if (stars > 20000) score += 20
    else if (stars > 10000) score += 15
    else if (stars > 5000) score += 10

    // Fork 数权重
    if (forks > 50000) score += 10
    else if (forks > 20000) score += 8
    else if (forks > 10000) score += 6
    else if (forks > 5000) score += 4

    // 活跃度（通过 open issues 间接反映）
    if (openIssues > 5000) score += 5
    else if (openIssues > 1000) score += 3

    return Math.min(Math.max(Math.round(score), 0), 100)
  }

  // 计算部署难度
  calculateDifficulty(repo) {
    const language = repo.language?.toLowerCase() || ''
    const topics = repo.topics || []

    // 简单的语言
    if (['javascript', 'python', 'ruby', 'go'].includes(language)) {
      return '简单'
    }

    // 复杂的语言
    if (['c', 'c++', 'rust', 'java'].includes(language)) {
      return '困难'
    }

    // 根据主题判断
    if (topics.some(t => ['docker', 'kubernetes', 'cloud'].includes(t))) {
      return '中等'
    }

    if (topics.some(t => ['machine-learning', 'deep-learning', 'ai'].includes(t))) {
      return '困难'
    }

    return '中等'
  }

  // 生成镜像链接
  generateMirrorUrls(githubUrl) {
    const paths = githubUrl.replace('https://github.com/', '')
    return MIRROR_SITES.map(site => `${site}/${paths}`)
  }

  // 生成预览图
  generatePreviewUrl(repo) {
    // 尝试从项目根目录获取 logo 或 screenshot
    const owner = repo.owner?.login
    const name = repo.name

    const possibleUrls = [
      `https://raw.githubusercontent.com/${owner}/${name}/main/screenshot.png`,
      `https://raw.githubusercontent.com/${owner}/${name}/master/screenshot.png`,
      `https://raw.githubusercontent.com/${owner}/${name}/main/preview.png`,
      `https://raw.githubusercontent.com/${owner}/${name}/main/logo.png`,
      `https://opengraph.githubassets.com/${owner}/${name}`,
    ]

    return possibleUrls[0]
  }

  // 排序
  sortRepos(repos, sortBy) {
    const sorted = [...repos]

    switch (sortBy) {
      case 'stars':
        sorted.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
        break
      case 'commercial':
        sorted.sort((a, b) => (b.commercialValue || 0) - (a.commercialValue || 0))
        break
      case 'forks':
        sorted.sort((a, b) => (b.forks_count || 0) - (a.forks_count || 0))
        break
      case 'updated':
        sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        break
      default:
        break
    }

    return sorted
  }

  // 搜索
  async searchRepos(query) {
    try {
      const url = `${GITHUB_API_BASE}/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=20`

      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      })

      return response.data.items.map(repo => ({
        ...repo,
        commercialValue: this.calculateCommercialValue(repo),
        difficulty: this.calculateDifficulty(repo),
        mirrorUrls: this.generateMirrorUrls(repo.html_url),
        previewUrl: this.generatePreviewUrl(repo)
      }))
    } catch (error) {
      console.error('搜索失败:', error)
      return []
    }
  }

  // 获取模拟数据
  getMockRepos(category) {
    if (category === 'all') {
      return MOCK_REPOS.all
    }

    return MOCK_REPOS.all.filter(repo => repo.category === category)
  }
}

export const dataService = new DataService()
