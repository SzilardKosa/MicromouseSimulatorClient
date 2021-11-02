import { SimulationApi, SimulationExpandedDTO, SimulationDTO } from './../gen/api'
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
      await api.simulationsIdPut(simulation.id, simulation)
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

export function useRunSimulation() {
  return useMutation(async (id: string) => {
    const result = await api.simulationsIdRunGet(id)
    return result.data
  })
}
