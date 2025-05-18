import api from '@/plugins/api'

class ResumeService {
  async analyzeResume(file) {
    try {
      const formData = new FormData()
      formData.append('resume', file)
      const response = await api.post('resumes/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return response.data
    } catch (error) {
      console.log('Error sending resume:', error)
      throw error
    }
  }
  async getResumeAnalyze() {
    try {
      const response = await api.get('resumes/')
      return response.data
    } catch (error) {
      console.log('getResumeAnalyze error:', error)
      throw error
    }
  }
  async getOneResumeAnalyze(id) {
    try {
      const response = await api.get(`resumes/${id}`)
      return response.data
    } catch (error) {
      console.log('getResumeAnalyze error:', error)
      throw error
    }
  }
}

export default new ResumeService()
