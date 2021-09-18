import { SimulationApi, SimulationExpandedDTO } from './../gen/api'
import { useQuery } from 'react-query'

const api = new SimulationApi()

type Error = { message: string }

export default function useSimulations() {
  return useQuery<SimulationExpandedDTO[], Error>('simulations', async () => {
    const result = await api.simulationsGet()
    return result.data
  })
}
