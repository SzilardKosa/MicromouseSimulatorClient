import { AuthToken } from './../../api/gen/api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import axios from 'axios'

interface AuthState {
  isAuthenticated: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthToken>) => {
      const token = action.payload.token
      state.isAuthenticated = true
      localStorage.setItem('jwtToken', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    logout: (state) => {
      state.isAuthenticated = false
      localStorage.removeItem('jwtToken')
      axios.defaults.headers.common['Authorization'] = ''
    },
    reloadToken: (state) => {
      const token = localStorage.getItem('jwtToken')
      if (token) {
        state.isAuthenticated = true
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    },
  },
})

export default authSlice.reducer

export const { login, logout, reloadToken } = authSlice.actions

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
