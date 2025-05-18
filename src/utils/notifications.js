import { toast } from 'vue3-toastify'

export const notify = {
  success(message) {
    toast.success(message, {
      icon: '✅'
    })
  },

  error(message, error) {
    let errorMessage = message

    if (error?.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error?.message) {
      errorMessage = error.message
    }

    toast.error(errorMessage, {
      icon: '❌'
    })
  },

  warning(message) {
    toast.warning(message, {
      icon: '⚠️'
    })
  },

  info(message) {
    toast.info(message, {
      icon: 'ℹ️'
    })
  }
}
