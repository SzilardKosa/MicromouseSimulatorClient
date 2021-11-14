import { ChangePassword, UserApi } from './../gen/api'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'

const api = new UserApi()

export function useChangePassword() {
  return useMutation<AxiosResponse<void>, AxiosError, ChangePassword>(api.usersChangePasswordPost)
}
