import apiClient from './apiClient'

export const authService = {
  register: (payload) => apiClient.post('/auth/register', payload),
  verifyRegisterOtp: (payload) => apiClient.post('/auth/verify-register-otp', payload),
  login: (credentials) => apiClient.post('/auth/login', credentials),
  verifyLoginOtp: (payload) => apiClient.post('/auth/verify-login-otp', payload),
  profile: () => apiClient.get('/auth/profile'),
}
