import { SimulationDTO } from './../gen/api'
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
  return useMutation(
    async (simulation: SimulationDTO) => {
      const result = await api.simulationsIdPut(simulation.id!!, simulation)
      return result.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('simulations')
      },
    }
  )
}

export function useDeleteSimulation() {
  const queryClient = useQueryClient()
  return useMutation(api.simulationsIdDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries('simulations')
    },
  })
}
