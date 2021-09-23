import React from 'react'
import { Box } from '@chakra-ui/react'
import { useSimulations } from '../../../api/hooks/simulations'
import SimulationList from './SimulationList'

const SimulationListPage = () => {
  const { status, data, error } = useSimulations()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'error') {
    return <div>Error: {error?.message}</div>
  }

  return (
    <Box h="calc(100vh - 64px)" w="full" position="relative">
      <SimulationList simulations={data ?? []} />
    </Box>
  )
}

export default SimulationListPage
