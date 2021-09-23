import { SimulationApi, SimulationExpandedDTO } from '../gen/api'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const api = new SimulationApi()

type Error = { message: string }

export function useSimulations() {
  return useQuery<SimulationExpandedDTO[], Error>('simulations', async () => {
    const result = await api.simulationsGet()
    return result.data
  })
}

export function useSimulation(id: string) {
  return useQuery<SimulationExpandedDTO, Error>(['simulations', id], async () => {
    const result = await api.simulationsIdGet(id)
    return result.data
  })
}

export function useCreateSimulation() {
  const queryClient = useQueryClient()
  return useMutation(api.simulationsPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('simulations')
    },
  })
}

export function useUpdateSimulation() {
  const queryClient = useQueryClient()
  return useMutation(api.simulationsIdPut, {
    onSuccess: () => {
      queryClient.invalidateQueries('simulations')
    },
  })
}

export function useDeleteSimulation() {
  const queryClient = useQueryClient()
  return useMutation(api.simulationsIdDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries('simulations')
    },
  })
}
