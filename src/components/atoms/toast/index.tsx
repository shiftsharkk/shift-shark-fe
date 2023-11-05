import {toast as notification} from 'react-toastify'

export const toast = {
  success: (message: string) => notification.success(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
  }),
  error: (message: string) => notification.error(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
  }),
}