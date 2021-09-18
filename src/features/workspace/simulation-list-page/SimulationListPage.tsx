import React from 'react'
import useSimulations from '../../../api/hooks/useSimulations'
import SimulationList from './SimulationList'

const SimulationListPage = () => {
  const { status, data, error } = useSimulations()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'error') {
    return <div>Error: {error?.message}</div>
  }

  return <SimulationList simulations={data ?? []} />
}

export default SimulationListPage
