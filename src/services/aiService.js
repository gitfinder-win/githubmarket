import axios from 'axios'

class AIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || ''
    this.apiUrl = 'https://openrouter.ai/api/v1/chat/completions'
    this.model = 'z-ai/glm-4.5-air:free'
  }

  // AI 搜索推荐
  async searchRepos(query) {
    if (!this.apiKey) {
      console.warn('未配置 API Key，使用普通搜索')
      throw new Error('AI service not configured')
    }

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: this.model,
          messages: [
            {
              role: 'system',
              content: `你是一个专业的开源软件推荐助手。根据用户的需求，推荐最合适的关键词用于搜索 GitHub 项目。

请返回 JSON 格式，包含以下字段：
- keywords: 搜索关键词数组（2-5个）
- explanation: 简短说明为什么推荐这些关键词

只返回 JSON，不要包含其他文本。`
            },
            {
              role: 'user',
              content: `用户需求：${query}\n\n请推荐搜索关键词`
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.href,
            'X-Title': 'GitHub Market'
          }
        }
      )

      const content = response.data.choices[0]?.message?.content || ''
      const result = this.parseAIResponse(content)

      // 如果成功解析，返回建议的关键词
      if (result.keywords && result.keywords.length > 0) {
        console.log('AI 推荐:', result)
        return { aiSuggestion: result, query }
      }

      throw new Error('AI response parsing failed')
    } catch (error) {
      console.error('AI 搜索失败:', error)
      throw error
    }
  }

  // 解析 AI 响应
  parseAIResponse(content) {
    try {
      // 尝试提取 JSON
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }

      // 如果没有 JSON，尝试解析文本
      const lines = content.split('\n').filter(line => line.trim())
      const keywords = lines
        .map(line => line.replace(/^[-*]\s*/, '').trim())
        .filter(line => line.length > 0)
        .slice(0, 5)

      return {
        keywords: keywords.length > 0 ? keywords : ['开源'],
        explanation: content
      }
    } catch (error) {
      console.error('解析 AI 响应失败:', error)
      return {
        keywords: ['开源'],
        explanation: content
      }
    }
  }
}

export const aiService = new AIService()
