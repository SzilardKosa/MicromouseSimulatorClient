import { AlgorithmApi, AlgorithmDTO } from './../gen/api'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const api = new AlgorithmApi()

type Error = { message: string }

export function useAlgorithms() {
  return useQuery<AlgorithmDTO[], Error>('algorithms', async () => {
    const result = await api.algorithmsGet()
    return result.data
  })
}

export function useAlgorithm(id: string) {
  return useQuery<AlgorithmDTO, Error>(['algorithms', id], async () => {
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
      const result = await api.algorithmsIdPut(algorithm.id!!, algorithm)
      return result.data
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
