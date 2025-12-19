import { defineStore } from 'pinia'
import { api } from '../boot/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async register(userData) {
      try {
        const response = await api.post('/register', userData)
        this.token = response.data.token
        this.user = response.data.user
        // Tidak simpan token di localStorage
        return response.data
      } catch (error) {
        throw error.response?.data || error.message
      }
    },

    async login(credentials) {
      try {
        const response = await api.post('/login', credentials)
        this.token = response.data.token
        this.user = response.data.user
        // Tidak simpan token di localStorage
        return response.data
      } catch (error) {
        throw error.response?.data || error.message
      }
    },

    logout() {
      this.user = null
      this.token = null
      // Tidak hapus localStorage karena tidak dipakai
    },

    initializeAuth() {
      // Tidak ambil token dari localStorage
      // Token hanya aktif selama sesi berjalan
    },
  },
})
