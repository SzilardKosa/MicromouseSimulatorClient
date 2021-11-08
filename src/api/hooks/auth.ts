import { AuthApi, AuthToken, Login, NewUser } from './../gen/api'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'

const api = new AuthApi()

export function useRegister() {
  return useMutation<AxiosResponse<void>, AxiosError, NewUser>(api.authRegisterPost)
}

export function useLogin() {
  return useMutation<AuthToken, AxiosError, Login>(async (login: Login) => {
    const result = await api.authLoginPost(login)
    return result.data
  })
}
