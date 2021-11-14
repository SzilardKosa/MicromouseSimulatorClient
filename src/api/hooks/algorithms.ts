import { AlgorithmApi, AlgorithmDTO } from './../gen/api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'

const api = new AlgorithmApi()

export function useAlgorithms() {
  return useQuery<AlgorithmDTO[], AxiosError>('algorithms', async () => {
    const result = await api.algorithmsGet()
    return result.data
  })
}

export function useAlgorithm(id: string) {
  return useQuery<AlgorithmDTO, AxiosError>(['algorithms', id], async () => {
    const result = await api.algorithmsIdGet(id)
    return result.data
  })
}

export function useCreateAlgorithm() {
  const queryClient = useQueryClient()
  return useMutation(api.algorithmsPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('algorithms')
    },
  })
}

export function useUpdateAlgorithm() {
  const queryClient = useQueryClient()
  return useMutation(
    async (algorithm: AlgorithmDTO) => {
      await api.algorithmsIdPut(algorithm.id, algorithm)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('algorithms')
      },
    }
  )
}

export function useDeleteAlgorithm() {
  const queryClient = useQueryClient()
  return useMutation(api.algorithmsIdDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries('algorithms')
    },
  })
}
