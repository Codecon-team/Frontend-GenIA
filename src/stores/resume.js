import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import ResumeService from '@/services/resume'

const resumeService = ResumeService

export const useResumeStore = defineStore('resume', () => {
  const state = reactive({
    loading: false,
    analyzedData: null,
    error: null,
  })

  const isLoading = computed(() => state.loading)
  const resumeAnalysis = computed(() => state.analyzedData)
  const resumeError = computed(() => state.error)

  const analyzeResume = async (file) => {
    state.loading = true
    state.error = null
    try {
      const response = await resumeService.analyzeResume(file)
      state.analyzedData = response
      return response
    } catch (error) {
      console.error('Erro ao analisar resume:', error)
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const getResumeAnalyze = async () =>{
    state.loading = true
    state.error = null
    try{
        const response = await resumeService.getResumeAnalyze()
        return response 
    }catch (error) {
      console.error('Erro ao get resume:', error)
      state.error = error
    } finally {
      state.loading = false
    }
  }
  
  const getOneResumeAnalyze = async (id) =>{
    state.loading = true
    state.error = null
    try{
        const response = await resumeService.getOneResumeAnalyze(id)
        return response 
    }catch (error) {
      console.error('Erro ao get one resume:', error)
      state.error = error
    } finally {
      state.loading = false
    }
  }

  return {
    analyzeResume,
    getResumeAnalyze,
    getOneResumeAnalyze,
    isLoading,
    resumeAnalysis,
    resumeError,
  }
})

// const resumes = ref([])

// const fetchAllResumes = async () => {
//   const response = await resumeStore.getResumeAnalyze()
//   if (response) {
//     resumes.value = response.resumes
//   }
// }

// const resumeStore = useResumeStore()
// const file = ref(null)

// const handleFileChange = (event) => {
//   file.value = event.target.files[0]
// }

// const handleUpload = async () => {
//   if (!file.value) return
//   await resumeStore.analyzeResume(file.value)
// }
// const oneResume = ref(null)
// const resumeId = ref('')

// const handleGetOneResumeAnalyze = async () => {
//   if (!resumeId.value) {
//     alert('Digite um ID válido.')
//     return
//   }

//   try {
//     const response = await resumeStore.getOneResumeAnalyze(resumeId.value)
//     if (response) {
//       oneResume.value = response
//     }
//   } catch (error) {
//     console.error('Erro ao buscar currículo:', error)
//     alert('Erro ao buscar o currículo. Verifique o ID e tente novamente.')
//   }
// }